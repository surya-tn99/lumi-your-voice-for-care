import { User, Pill, AlertTriangle, Smartphone, Bell, ChevronRight, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SettingsItem {
  icon: React.ElementType;
  label: string;
  description: string;
  onClick?: () => void;
}

interface SettingsPanelProps {
  onNavigate?: (section: string) => void;
  onLogout?: () => void;
}

export function SettingsPanel({ onNavigate, onLogout }: SettingsPanelProps) {
  const settingsItems: SettingsItem[] = [
    {
      icon: User,
      label: "Personal Details",
      description: "Edit your profile and health info",
      onClick: () => onNavigate?.("personal"),
    },
    {
      icon: Pill,
      label: "Medication Settings",
      description: "Add or update medicines",
      onClick: () => onNavigate?.("medications"),
    },
    {
      icon: AlertTriangle,
      label: "Emergency Settings",
      description: "Manage contacts and response time",
      onClick: () => onNavigate?.("emergency"),
    },
    {
      icon: Smartphone,
      label: "Device Preferences",
      description: "Volume, speed, and language",
      onClick: () => onNavigate?.("device"),
    },
    {
      icon: Bell,
      label: "Alert Preferences",
      description: "Notification and voice settings",
      onClick: () => onNavigate?.("alerts"),
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-foreground font-display">Settings</h3>
      
      <div className="space-y-2">
        {settingsItems.map((item) => (
          <button
            key={item.label}
            onClick={item.onClick}
            className="flex w-full items-center gap-4 rounded-2xl border-2 border-border bg-card p-4 transition-all hover:border-primary/30 hover:shadow-soft active:scale-[0.98]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft">
              <item.icon className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1 text-left">
              <h4 className="text-base font-semibold text-foreground">
                {item.label}
              </h4>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </button>
        ))}
      </div>

      {/* Logout button */}
      <Button
        variant="ghost"
        className="w-full mt-6 text-muted-foreground hover:text-emergency hover:bg-emergency-soft"
        onClick={onLogout}
      >
        <LogOut className="h-5 w-5" />
        Sign Out
      </Button>
    </div>
  );
}
