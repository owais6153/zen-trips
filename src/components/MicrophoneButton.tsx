"use client";

import React, { useState, useEffect, memo } from "react";
import useSpeechRecognition from "@/hooks/useSpeechRecognition";
import { Mic, AudioLines } from "lucide-react";

interface MicrophoneButtonProps {
  onTranscriptChange?: (transcript: string) => void;
  onListeningChange?: (isListening: boolean) => void;
}

// Using memo to prevent unnecessary re-renders
const MicrophoneButton: React.FC<MicrophoneButtonProps> = memo(
  ({ onTranscriptChange, onListeningChange }) => {
    // Use a ref instead of state for mount detection
    const [ready, setReady] = useState(false);

    const {
      transcript,
      listening,
      browserSupportsSpeechRecognition,
      startListening,
      stopListening,
      resetTranscript,
    } = useSpeechRecognition();

    // Simplified mounting logic
    useEffect(() => {
      // Small timeout to ensure hydration is complete
      const timer = setTimeout(() => {
        setReady(true);
      }, 10);

      return () => clearTimeout(timer);
    }, []);

    // Only update the parent component when transcript changes
    useEffect(() => {
      if (onTranscriptChange && transcript) {
        onTranscriptChange(transcript);
      }
    }, [transcript, onTranscriptChange]);

    // Notify parent component when listening state changes
    useEffect(() => {
      if (onListeningChange) {
        onListeningChange(listening);
      }
    }, [listening, onListeningChange]);

    const toggleListening = async () => {
      if (!ready) return;

      if (listening) {
        stopListening();
      } else {
        resetTranscript();
        await startListening();
      }
    };

    // Common button styles to reduce layout shifts
    const buttonClasses =
      "rounded-full px-2 py-4 flex items-center justify-center shadow-lg min-w-[80px] min-h-[44px]";
    const iconClasses = "w-6 h-6 text-white";

    // During initial render or non-ready state, show a simple placeholder
    if (!ready) {
      return (
        <button
          className={`bg-blue-600 ${buttonClasses}`}
          aria-label="Initializing..."
        >
          <Mic className={iconClasses} />
        </button>
      );
    }

    // After ready, show appropriate button based on browser support
    if (!browserSupportsSpeechRecognition) {
      return (
        <button
          className={`bg-gray-300 ${buttonClasses} cursor-not-allowed`}
          disabled
          title="Your browser does not support speech recognition"
        >
          <Mic className={iconClasses} />
        </button>
      );
    }

    return (
      <button
        onClick={toggleListening}
        className={`bg-blue-600 ${buttonClasses} transition-all duration-300 ${
          listening ? "animate-pulse" : ""
        }`}
        aria-label={listening ? "Stop listening" : "Start listening"}
      >
        {listening ? (
          <AudioLines className={iconClasses} />
        ) : (
          <Mic className={iconClasses} />
        )}
      </button>
    );
  }
);

// Add display name for debugging
MicrophoneButton.displayName = "MicrophoneButton";

export default MicrophoneButton;
