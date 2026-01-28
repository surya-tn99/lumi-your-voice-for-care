import { Phone, MessageCircle, Video, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Nominee } from "@/types/lumi";

interface NomineeCardProps {
  nominee: Nominee;
  onCall?: (phone: string) => void;
  onMessage?: (phone: string) => void;
}

export function NomineeCard({ nominee, onCall, onMessage }: NomineeCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border-2 border-border bg-card p-4 shadow-soft transition-all hover:shadow-card">
      {/* Avatar */}
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-soft">
        <User className="h-7 w-7 text-primary" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="text-lg font-semibold text-foreground truncate">
          {nominee.name}
        </h4>
        <p className="text-sm text-muted-foreground">{nominee.relationship}</p>
        <p className="text-sm font-medium text-primary">{nominee.phone}</p>
      </div>

      {/* Quick actions */}
      <div className="flex gap-2">
        <Button
          variant="soft"
          size="icon"
          onClick={() => onCall?.(nominee.phone)}
          className="rounded-xl"
        >
          <Phone className="h-5 w-5" />
        </Button>
        <Button
          variant="soft-secondary"
          size="icon"
          onClick={() => onMessage?.(nominee.phone)}
          className="rounded-xl"
        >
          <MessageCircle className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
