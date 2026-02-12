
import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
// Fix: Import MicIcon from constants.tsx
import { MicIcon, LoaderIcon } from '../constants';

type VoiceMode = 'idle' | 'listening' | 'speaking';

interface VoiceVisualizerProps {
  audioData: Uint8Array | null;
  mode: VoiceMode;
  onClick: () => void;
}

const NUM_BARS = 64;

const VoiceVisualizer: React.FC<VoiceVisualizerProps> = ({ audioData, mode, onClick }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const parent = canvas.parentElement;
    if (!parent) return;

    const resizeCanvas = () => {
        canvas.width = parent.clientWidth * window.devicePixelRatio;
        canvas.height = parent.clientHeight * window.devicePixelRatio;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const render = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      const radius = Math.min(width, height) * 0.4;
      const centerX = width / 2;
      const centerY = height / 2;

      // Draw background glow
      const time = Date.now() * 0.001;
      const pulse = (Math.sin(time * 2) + 1) / 2;
      
      ctx.beginPath();
      const grad = ctx.createRadialGradient(centerX, centerY, radius * 0.5, centerX, centerY, radius * 1.5);
      const color = mode === 'listening' ? '16, 185, 129' : mode === 'speaking' ? '20, 184, 166' : '100, 116, 139';
      grad.addColorStop(0, `rgba(${color}, ${0.1 + pulse * 0.1})`);
      grad.addColorStop(1, `rgba(${color}, 0)`);
      ctx.fillStyle = grad;
      ctx.arc(centerX, centerY, radius * 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Draw bars
      const barWidth = (Math.PI * 2) / NUM_BARS;
      for (let i = 0; i < NUM_BARS; i++) {
        const angle = i * barWidth - Math.PI / 2;
        let value = 0;
        
        if (audioData && audioData.length > 0) {
          const idx = Math.floor(i * (audioData.length / NUM_BARS));
          value = audioData[idx] / 255;
        } else {
          // Subtle idle animation
          value = 0.1 + Math.sin(time * 3 + i * 0.5) * 0.05;
        }

        const barHeight = mode === 'idle' ? value * radius * 0.2 : value * radius * 1.2;
        const x1 = centerX + Math.cos(angle) * radius;
        const y1 = centerY + Math.sin(angle) * radius;
        const x2 = centerX + Math.cos(angle) * (radius + barHeight);
        const y2 = centerY + Math.sin(angle) * (radius + barHeight);

        ctx.beginPath();
        ctx.strokeStyle = mode === 'listening' ? '#10b981' : mode === 'speaking' ? '#14b8a6' : '#94a3b8';
        ctx.lineWidth = 2 * window.devicePixelRatio;
        ctx.lineCap = 'round';
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [audioData, mode]);

  return (
    <div className="w-full h-full flex items-center justify-center relative cursor-pointer group" onClick={onClick}>
        <canvas ref={canvasRef} className="w-full h-full absolute inset-0 pointer-events-none" />
        <motion.div 
            animate={mode !== 'idle' ? { scale: [1, 1.05, 1] } : {}}
            transition={{ repeat: Infinity, duration: 2 }}
            className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl z-10 transition-all duration-500
                ${mode === 'listening' ? 'bg-emerald-500 ring-8 ring-emerald-500/20' : 
                  mode === 'speaking' ? 'bg-teal-500 ring-8 ring-teal-500/20' : 
                  'bg-white ring-8 ring-slate-100'}`}
        >
            <AnimatePresence mode="wait">
                {mode === 'speaking' ? (
                    <motion.div key="speaking" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}>
                        <Logo className="w-8 h-8 filter brightness-0 invert" />
                    </motion.div>
                ) : (
                    <motion.div key="mic" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}>
                        <MicIcon className={`w-6 h-6 ${mode === 'listening' ? 'text-white' : 'text-slate-400'}`} />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    </div>
  );
};

export default VoiceVisualizer;
