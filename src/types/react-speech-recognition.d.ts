declare module 'react-speech-recognition' {
  export interface SpeechRecognitionOptions {
    continuous?: boolean;
    language?: string;
    interimResults?: boolean;
  }

  export interface SpeechRecognitionResult {
    transcript: string;
    isFinal: boolean;
  }

  export interface SpeechRecognitionHook {
    transcript: string;
    interimTranscript: string;
    finalTranscript: string;
    listening: boolean;
    resetTranscript: () => void;
    browserSupportsSpeechRecognition: boolean;
    isMicrophoneAvailable: boolean;
  }

  const SpeechRecognition: {
    startListening: (options?: SpeechRecognitionOptions) => Promise<void>;
    stopListening: () => void;
    abortListening: () => void;
    getRecognition: () => any | null;
  };

  export default SpeechRecognition;

  export function useSpeechRecognition(options?: {
    transcribing?: boolean;
    clearTranscriptOnListen?: boolean;
    commands?: Array<{
      command: string | RegExp;
      callback: (...args: any[]) => void;
      matchInterim?: boolean;
      isFuzzyMatch?: boolean;
      fuzzyMatchingThreshold?: number;
      bestMatchOnly?: boolean;
    }>;
  }): SpeechRecognitionHook;
} 