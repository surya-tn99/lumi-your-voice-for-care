import { useState } from "react";
import { Mic, MicOff, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VoiceButtonProps {
  onVoiceStart?: () => void;
  onVoiceEnd?: () => void;
  isListening?: boolean;
  className?: string;
}

export function VoiceButton({
  onVoiceStart,
  onVoiceEnd,
  isListening = false,
  className,
}: VoiceButtonProps) {
  const [isActive, setIsActive] = useState(isListening);

  const handlePress = () => {
    if (isActive) {
      setIsActive(false);
      onVoiceEnd?.();
    } else {
      setIsActive(true);
      onVoiceStart?.();
    }
  };

  return (
    <div className={cn("flex flex-col items-center gap-6", className)}>
      {/* Status indicator */}
      <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 shadow-soft">
        <div
          className={cn(
            "h-3 w-3 rounded-full transition-colors",
            isActive ? "bg-success animate-pulse" : "bg-muted"
          )}
        />
        <span className="text-sm font-medium text-muted-foreground">
          {isActive ? "Listening..." : "Tap to speak"}
        </span>
      </div>

      {/* Main voice button */}
      <button
        onClick={handlePress}
        className={cn(
          "relative flex h-40 w-40 items-center justify-center rounded-full transition-all duration-300",
          isActive
            ? "bg-gradient-primary shadow-glow scale-105"
            : "bg-gradient-primary shadow-elevated hover:scale-105 animate-voice-pulse hover:animate-none"
        )}
      >
        {/* Ripple effect when active */}
        {isActive && (
          <>
            <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
            <span className="absolute inset-4 rounded-full bg-primary/20 animate-ping animation-delay-150" />
          </>
        )}

        {/* Icon */}
        <div className="relative z-10">
          {isActive ? (
            <Volume2 className="h-16 w-16 text-primary-foreground animate-pulse" />
          ) : (
            <Mic className="h-16 w-16 text-primary-foreground" />
          )}
        </div>
      </button>

      {/* Voice hints */}
      <div className="text-center space-y-2 max-w-xs">
        <p className="text-lg font-medium text-foreground">
          {isActive ? "I'm listening..." : "Press and speak"}
        </p>
        <p className="text-sm text-muted-foreground">
          {isActive
            ? 'Say "I took my medicine" or "Help me"'
            : "Example: \"I feel dizzy\" or \"Call my daughter\""}
        </p>
      </div>
    </div>
  );
}
