
import { useState, useRef, useCallback, useEffect } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality, Blob } from '@google/genai';

function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

interface UseVoiceChatProps {
    onLiveTranscriptUpdate: (transcript: string) => void;
    onModelTranscriptUpdate: (transcript: string) => void;
    onTurnComplete: (transcripts: { userTranscript: string; modelTranscript: string }) => void;
    onError: (error: string) => void;
    onAudioDataUpdate: (data: Uint8Array) => void;
}

export const useVoiceChat = (props: UseVoiceChatProps) => {
  const propsRef = useRef(props);
  useEffect(() => { propsRef.current = props; });

  const [isRecording, setIsRecording] = useState(false);
  const [voiceMode, setVoiceMode] = useState<'idle' | 'listening' | 'speaking'>('idle');

  const sessionPromiseRef = useRef<Promise<any> | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const audioSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const micStreamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const retryCountRef = useRef(0);
  const MAX_RETRIES = 3;

  const stopRecording = useCallback(() => {
    setIsRecording(false);
    setVoiceMode('idle');
    retryCountRef.current = 0;
    
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach(track => track.stop());
      micStreamRef.current = null;
    }
    
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }

    const currentPromise = sessionPromiseRef.current;
    if (currentPromise) {
        currentPromise.then((s: any) => {
            if (s && typeof s.close === 'function') {
                try { s.close(); } catch (e) {}
            }
        }).catch(() => {});
        sessionPromiseRef.current = null;
    }

    audioSourcesRef.current.forEach(s => {
        try { s.stop(); } catch (e) {}
    });
    audioSourcesRef.current.clear();
    nextStartTimeRef.current = 0;
  }, []);

  const startRecording = useCallback(async () => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      propsRef.current.onError("API Key missing.");
      return;
    }

    setIsRecording(true);
    setVoiceMode('listening');
    let userTranscript = '';
    let modelTranscript = '';

    const connectToLive = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            micStreamRef.current = stream;
            
            const ai = new GoogleGenAI({ apiKey });
            
            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
            }
            if (!outputAudioContextRef.current) {
                outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
            }
            
            const currentSessionPromise = ai.live.connect({
                model: 'gemini-2.5-flash-native-audio-preview-12-2025',
                callbacks: {
                    onopen: () => {
                        retryCountRef.current = 0;
                        if (!audioContextRef.current) return;
                        const source = audioContextRef.current.createMediaStreamSource(stream);
                        const processor = audioContextRef.current.createScriptProcessor(2048, 1, 1);
                        processorRef.current = processor;
                        
                        processor.onaudioprocess = (e) => {
                            const input = e.inputBuffer.getChannelData(0);
                            const visualData = new Uint8Array(input.length);
                            for (let i = 0; i < input.length; i++) {
                                visualData[i] = Math.max(0, Math.min(255, (input[i] + 1) * 128));
                            }
                            propsRef.current.onAudioDataUpdate(visualData);

                            const int16 = new Int16Array(input.length);
                            for (let i = 0; i < input.length; i++) {
                                int16[i] = input[i] * 32768;
                            }
                            
                            const pcmBlob: Blob = { 
                                data: encode(new Uint8Array(int16.buffer)), 
                                mimeType: 'audio/pcm;rate=16000' 
                            };
                            
                            currentSessionPromise.then((session) => {
                                if (session && typeof session.sendRealtimeInput === 'function') {
                                    session.sendRealtimeInput({ media: pcmBlob });
                                }
                            }).catch(() => {});
                        };
                        
                        source.connect(processor);
                        processor.connect(audioContextRef.current.destination);
                    },
                    onmessage: async (msg: LiveServerMessage) => {
                        if (msg.serverContent?.outputTranscription) {
                            setVoiceMode('speaking');
                            modelTranscript += msg.serverContent.outputTranscription.text;
                            propsRef.current.onModelTranscriptUpdate(modelTranscript);
                        }

                        if (msg.serverContent?.inputTranscription) {
                            userTranscript += msg.serverContent.inputTranscription.text;
                            propsRef.current.onLiveTranscriptUpdate(userTranscript);
                        }
                        
                        if (msg.serverContent?.turnComplete) {
                            propsRef.current.onTurnComplete({ userTranscript, modelTranscript });
                            userTranscript = ''; modelTranscript = '';
                        }
                        
                        const audioBase64 = msg.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
                        if (audioBase64 && outputAudioContextRef.current) {
                            const buffer = await decodeAudioData(decode(audioBase64), outputAudioContextRef.current, 24000, 1);
                            nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputAudioContextRef.current.currentTime);
                            const source = outputAudioContextRef.current.createBufferSource();
                            source.buffer = buffer;
                            source.connect(outputAudioContextRef.current.destination);
                            source.start(nextStartTimeRef.current);
                            nextStartTimeRef.current += buffer.duration;
                            audioSourcesRef.current.add(source);
                            
                            source.onended = () => {
                                audioSourcesRef.current.delete(source);
                                if (audioSourcesRef.current.size === 0) {
                                    setVoiceMode('listening');
                                }
                            };
                        }

                        if (msg.serverContent?.interrupted) {
                          audioSourcesRef.current.forEach(s => { try { s.stop(); } catch(e){} });
                          audioSourcesRef.current.clear();
                          nextStartTimeRef.current = 0;
                        }
                    },
                    onerror: (e: any) => { 
                        console.error("Live API Error:", e);
                        if (retryCountRef.current < MAX_RETRIES) {
                            retryCountRef.current++;
                            setTimeout(connectToLive, 1000 * retryCountRef.current);
                        } else {
                            propsRef.current.onError("Network connection unstable. Please try again later.");
                            stopRecording();
                        }
                    },
                    onclose: (e: any) => {
                        console.log("Live API Closed:", e);
                        if (!e.wasClean && retryCountRef.current < MAX_RETRIES) {
                            retryCountRef.current++;
                            setTimeout(connectToLive, 1000);
                        } else {
                            stopRecording();
                        }
                    },
                },
                config: {
                    responseModalities: [Modality.AUDIO],
                    systemInstruction: "You are Dhara, a pharmaceutical researcher. Be concise, professional, and helpful. Use a natural tone.",
                    speechConfig: { 
                      voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } 
                    },
                    outputAudioTranscription: {},
                }
            });

            sessionPromiseRef.current = currentSessionPromise;

        } catch (err) {
            console.error("Mic/Connection Error:", err);
            propsRef.current.onError("Speech link initialization failed.");
            stopRecording();
        }
    };

    await connectToLive();
  }, [stopRecording]);

  return { isRecording, startRecording, stopRecording, voiceMode };
};
