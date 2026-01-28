import { AlertTriangle, Phone, Shield, Ambulance } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { EmergencyStatus as EmergencyStatusType } from "@/types/lumi";

interface EmergencyStatusProps {
  status: EmergencyStatusType;
  onTriggerEmergency?: () => void;
  onCancelEmergency?: () => void;
}

const stageConfig = {
  none: {
    icon: Shield,
    label: "All Clear",
    description: "No active emergencies",
    color: "text-success",
    bg: "bg-success-soft",
  },
  voice_alert: {
    icon: AlertTriangle,
    label: "Voice Alert Sent",
    description: "Waiting for your response...",
    color: "text-warning-foreground",
    bg: "bg-warning-soft",
  },
  waiting_response: {
    icon: Phone,
    label: "Checking on You",
    description: "Please respond or press cancel",
    color: "text-warning-foreground",
    bg: "bg-warning-soft",
  },
  notifying_relatives: {
    icon: Phone,
    label: "Contacting Family",
    description: "Your relatives are being notified",
    color: "text-secondary",
    bg: "bg-secondary-soft",
  },
  calling_ambulance: {
    icon: Ambulance,
    label: "Help is Coming",
    description: "Emergency services contacted",
    color: "text-emergency",
    bg: "bg-emergency-soft",
  },
};

export function EmergencyStatus({
  status,
  onTriggerEmergency,
  onCancelEmergency,
}: EmergencyStatusProps) {
  const config = stageConfig[status.stage];
  const Icon = config.icon;

  return (
    <div className="space-y-4">
      {/* Current status */}
      <div
        className={cn(
          "flex items-center gap-4 rounded-2xl p-4 transition-all",
          config.bg,
          status.isActive && "animate-emergency-pulse"
        )}
      >
        <div
          className={cn(
            "flex h-14 w-14 items-center justify-center rounded-xl bg-card shadow-soft",
            status.isActive && "animate-pulse"
          )}
        >
          <Icon className={cn("h-7 w-7", config.color)} />
        </div>
        <div className="flex-1">
          <h4 className={cn("text-lg font-semibold", config.color)}>
            {config.label}
          </h4>
          <p className="text-sm text-muted-foreground">{config.description}</p>
        </div>
      </div>

      {/* Last emergency time */}
      {status.lastEmergencyTime && (
        <p className="text-sm text-muted-foreground text-center">
          Last emergency: {status.lastEmergencyTime}
        </p>
      )}

      {/* Emergency actions */}
      <div className="flex gap-3">
        {!status.isActive ? (
          <Button
            variant="emergency"
            size="lg"
            className="flex-1"
            onClick={onTriggerEmergency}
          >
            <AlertTriangle className="h-5 w-5" />
            Emergency Help
          </Button>
        ) : (
          <Button
            variant="outline"
            size="lg"
            className="flex-1"
            onClick={onCancelEmergency}
          >
            I'm Okay - Cancel
          </Button>
        )}
      </div>
    </div>
  );
}
