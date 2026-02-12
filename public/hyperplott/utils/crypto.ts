// --- ArrayBuffer to Base64 and vice-versa ---
// These helpers are needed because the Crypto API works with ArrayBuffers,
// but we need to store keys and ciphertext as strings (e.g., in localStorage).

export const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

export const base64ToArrayBuffer = (base64: string): ArrayBuffer => {
  const binary_string = window.atob(base64);
  const len = binary_string.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
};


// --- Web Crypto API Functions ---

const ALGORITHM = 'AES-GCM';

/**
 * Generates a new AES-GCM CryptoKey for encryption and decryption.
 */
export const generateKey = async (): Promise<CryptoKey> => {
  return await window.crypto.subtle.generateKey(
    { name: ALGORITHM, length: 256 },
    true, // extractable
    ['encrypt', 'decrypt']
  );
};

/**
 * Exports a CryptoKey into a base64 string for easy storage.
 */
export const exportKey = async (key: CryptoKey): Promise<string> => {
  const exportedKey = await window.crypto.subtle.exportKey('raw', key);
  return arrayBufferToBase64(exportedKey);
};

/**
 * Imports a base64 string key back into a CryptoKey object.
 */
export const importKey = async (keyData: string): Promise<CryptoKey> => {
  const buffer = base64ToArrayBuffer(keyData);
  return await window.crypto.subtle.importKey(
    'raw',
    buffer,
    { name: ALGORITHM },
    true,
    ['encrypt', 'decrypt']
  );
};

/**
 * Encrypts a string of data using a CryptoKey.
 * Returns the ciphertext and the initialization vector (iv), both as base64 strings.
 */
export const encrypt = async (data: string, key: CryptoKey): Promise<{ ciphertext: string; iv: string }> => {
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const encodedData = new TextEncoder().encode(data);

  const ciphertext = await window.crypto.subtle.encrypt(
    { name: ALGORITHM, iv },
    key,
    encodedData
  );

  return {
    ciphertext: arrayBufferToBase64(ciphertext),
    iv: arrayBufferToBase64(iv),
  };
};

/**
 * Decrypts a base64 ciphertext string using a CryptoKey and a base64 iv string.
 * Returns the original plaintext data.
 */
export const decrypt = async (ciphertext: string, iv: string, key: CryptoKey): Promise<string> => {
  const ivBuffer = base64ToArrayBuffer(iv);
  const ciphertextBuffer = base64ToArrayBuffer(ciphertext);

  const decrypted = await window.crypto.subtle.decrypt(
    { name: ALGORITHM, iv: ivBuffer },
    key,
    ciphertextBuffer
  );

  return new TextDecoder().decode(decrypted);
};
