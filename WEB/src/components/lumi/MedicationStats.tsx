import { TrendingUp, CheckCircle, XCircle } from "lucide-react";

interface MedicationStatsProps {
  taken: number;
  pending: number;
  missed: number;
}

export function MedicationStats({ taken, pending, missed }: MedicationStatsProps) {
  const total = taken + pending + missed;
  const adherenceRate = total > 0 ? Math.round((taken / total) * 100) : 100;

  return (
    <div className="space-y-4">
      {/* Adherence rate */}
      <div className="flex items-center justify-between rounded-2xl bg-primary-soft p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <TrendingUp className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Today's Adherence</p>
            <p className="text-2xl font-bold text-primary">{adherenceRate}%</p>
          </div>
        </div>
        {/* Progress bar */}
        <div className="h-16 w-16">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              className="text-muted"
            />
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeDasharray={`${adherenceRate}, 100`}
              className="text-primary"
            />
          </svg>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className="flex flex-col items-center rounded-xl bg-success-soft p-3">
          <CheckCircle className="h-6 w-6 text-success mb-1" />
          <span className="text-2xl font-bold text-success">{taken}</span>
          <span className="text-xs text-muted-foreground">Taken</span>
        </div>
        <div className="flex flex-col items-center rounded-xl bg-warning-soft p-3">
          <div className="h-6 w-6 rounded-full border-2 border-warning-foreground mb-1" />
          <span className="text-2xl font-bold text-warning-foreground">{pending}</span>
          <span className="text-xs text-muted-foreground">Pending</span>
        </div>
        <div className="flex flex-col items-center rounded-xl bg-emergency-soft p-3">
          <XCircle className="h-6 w-6 text-emergency mb-1" />
          <span className="text-2xl font-bold text-emergency">{missed}</span>
          <span className="text-xs text-muted-foreground">Missed</span>
        </div>
      </div>
    </div>
  );
}
