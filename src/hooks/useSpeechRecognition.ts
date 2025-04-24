'use client'

import { useState, useEffect, useCallback, useRef } from 'react';
import SpeechRecognition, { useSpeechRecognition as useSR } from 'react-speech-recognition';

interface UseSpeechRecognitionReturn {
  transcript: string;
  listening: boolean;
  browserSupportsSpeechRecognition: boolean;
  startListening: () => Promise<void>;
  stopListening: () => void;
  resetTranscript: () => void;
}

// Create a simpler version that doesn't rely on so many states
export const useSpeechRecognition = (): UseSpeechRecognitionReturn => {
  const initialized = useRef(false);
  const [listening, setListening] = useState(false);
  
  // We can safely use the hook without conditions now because we'll
  // only access its values on the client side
  const {
    transcript = '',
    listening: srListening = false,
    browserSupportsSpeechRecognition = false,
    resetTranscript = () => {},
  } = typeof window !== 'undefined' ? useSR() : {};

  // Sync the internal state with SpeechRecognition's state when needed
  useEffect(() => {
    if (typeof window !== 'undefined') {
      initialized.current = true;
      setListening(srListening);
    }
  }, [srListening]);

  const startListening = useCallback(async () => {
    if (typeof window === 'undefined') return;
    
    if (!browserSupportsSpeechRecognition) {
      console.error('This browser does not support speech recognition.');
      return;
    }
    
    try {
      await SpeechRecognition.startListening({ continuous: true });
      setListening(true);
    } catch (error) {
      console.error('Error starting speech recognition:', error);
    }
  }, [browserSupportsSpeechRecognition]);

  const stopListening = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    SpeechRecognition.stopListening();
    setListening(false);
  }, []);

  return {
    transcript,
    listening,
    browserSupportsSpeechRecognition: initialized.current && browserSupportsSpeechRecognition,
    startListening,
    stopListening,
    resetTranscript,
  };
};

export default useSpeechRecognition; 