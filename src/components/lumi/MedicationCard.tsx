import { Check, Clock, AlertCircle, Pill } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Medication } from "@/types/lumi";

interface MedicationCardProps {
  medication: Medication;
  onMarkTaken?: (id: string) => void;
}

export function MedicationCard({ medication, onMarkTaken }: MedicationCardProps) {
  const statusConfig = {
    taken: {
      icon: Check,
      bg: "bg-success-soft",
      border: "border-success/30",
      text: "text-success",
      label: "Taken",
    },
    pending: {
      icon: Clock,
      bg: "bg-warning-soft",
      border: "border-warning/30",
      text: "text-warning-foreground",
      label: "Pending",
    },
    missed: {
      icon: AlertCircle,
      bg: "bg-emergency-soft",
      border: "border-emergency/30",
      text: "text-emergency",
      label: "Missed",
    },
  };

  const status = statusConfig[medication.status];
  const StatusIcon = status.icon;

  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-2xl border-2 p-4 transition-all hover:shadow-soft",
        status.bg,
        status.border
      )}
    >
      {/* Pill icon */}
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-card shadow-soft">
        <Pill className="h-7 w-7 text-primary" />
      </div>

      {/* Medication info */}
      <div className="flex-1 min-w-0">
        <h4 className="text-lg font-semibold text-foreground truncate">
          {medication.name}
        </h4>
        <p className="text-sm text-muted-foreground">{medication.dosage}</p>
        <p className="text-sm font-medium text-muted-foreground">
          {medication.scheduledTime}
        </p>
      </div>

      {/* Status badge */}
      <div
        className={cn(
          "flex items-center gap-2 rounded-full px-4 py-2",
          status.bg,
          status.text
        )}
      >
        <StatusIcon className="h-5 w-5" />
        <span className="text-sm font-semibold">{status.label}</span>
      </div>

      {/* Mark as taken button (only for pending) */}
      {medication.status === "pending" && (
        <button
          onClick={() => onMarkTaken?.(medication.id)}
          className="flex h-12 w-12 items-center justify-center rounded-xl bg-success text-success-foreground shadow-soft hover:bg-success/90 transition-all active:scale-95"
        >
          <Check className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}
