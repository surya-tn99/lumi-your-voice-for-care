import { useState, useEffect } from "react";
import { VoiceButton } from "@/components/lumi/VoiceButton";
import { MedicationCard } from "@/components/lumi/MedicationCard";
import { MedicationStats } from "@/components/lumi/MedicationStats";
import { EmergencyStatus } from "@/components/lumi/EmergencyStatus";
import { NomineeCard } from "@/components/lumi/NomineeCard";
import { SettingsPanel } from "@/components/lumi/SettingsPanel";
import { Heart, Sun } from "lucide-react";
import type { Medication, EmergencyStatus as EmergencyStatusType, Nominee } from "@/types/lumi";
import { data, emergency } from "@/lib/api";
import { toast } from "sonner";
import { format } from "date-fns";

export default function Dashboard() {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [nominees, setNominees] = useState<Nominee[]>([]);
  const [emergencyStatus, setEmergencyStatus] = useState<EmergencyStatusType>({
    isActive: false,
    stage: "none",
    lastEmergencyTime: "No active alerts",
  });
  const [alertId, setAlertId] = useState<number | null>(null);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    loadDashboardData();
    checkEmergencyStatus();
  }, []);

  const loadDashboardData = async () => {
    try {
      const today = format(new Date(), 'yyyy-MM-dd');

      const [medsRes, logsRes, nomineesRes] = await Promise.all([
        data.getMedications(),
        data.getMedicationLogs(today, today),
        data.getNominees()
      ]);

      // Map backend data to frontend types
      const mappedMeds: Medication[] = medsRes.data.map(m => {
        const log = logsRes.data.find(l => l.medication_id === m.id);
        return {
          id: m.id.toString(),
          name: m.name,
          dosage: m.dosage,
          scheduledTime: m.scheduled_time, // Backend snake_case
          status: log ? (log.status as any) : 'pending',
          takenAt: log?.taken_at
        };
      });

      const mappedNominees: Nominee[] = nomineesRes.data.map(n => ({
        id: n.id.toString(),
        name: n.name,
        relationship: n.relationship,
        phone: n.phone
      }));

      setMedications(mappedMeds);
      setNominees(mappedNominees);

    } catch (error) {
      console.error("Failed to load dashboard data", error);
      toast.error("Could not load data");
    }
  };

  const checkEmergencyStatus = async () => {
    try {
      const { data } = await emergency.getActive();
      if (data && data.is_active) {
        setEmergencyStatus({
          isActive: true,
          stage: data.stage as any,
          lastEmergencyTime: new Date(data.created_at).toLocaleTimeString()
        });
        setAlertId(data.id);
      }
    } catch (e) {
      // No active emergency, logic relies on 404 or empty
    }
  };

  const handleMarkTaken = async (id: string) => {
    try {
      // Optimistic update
      setMedications((meds) =>
        meds.map((med) =>
          med.id === id
            ? { ...med, status: "taken" as const, takenAt: new Date().toLocaleTimeString() }
            : med
        )
      );

      const medId = parseInt(id);
      const today = format(new Date(), 'yyyy-MM-dd');
      await data.recordCompliance(medId, today, 'taken', new Date().toISOString());
      toast.success("Medication recorded");

    } catch (error) {
      toast.error("Failed to update status");
      loadDashboardData(); // Revert on error
    }
  };

  const handleTriggerEmergency = async () => {
    try {
      setEmergencyStatus({
        isActive: true,
        stage: "voice_alert",
      });
      const { data } = await emergency.trigger("voice_alert");
      setAlertId(data.id);
      toast.error("Emergency Alert Triggered!");
    } catch (error) {
      toast.error("Failed to trigger emergency");
    }
  };

  const handleCancelEmergency = async () => {
    if (!alertId) {
      // Local only fallback
      setEmergencyStatus({
        isActive: false,
        stage: "none",
        lastEmergencyTime: "Just now",
      });
      return;
    }

    try {
      await emergency.resolve(alertId);
      setEmergencyStatus({
        isActive: false,
        stage: "none",
        lastEmergencyTime: "Resolved just now",
      });
      setAlertId(null);
      toast.success("Emergency Cancelled");
    } catch (error) {
      toast.error("Failed to resolve emergency");
    }
  };

  const stats = {
    taken: medications.filter((m) => m.status === "taken").length,
    pending: medications.filter((m) => m.status === "pending").length,
    missed: medications.filter((m) => m.status === "missed").length,
  };

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border/50">
        <div className="container flex h-20 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
              <Heart className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground font-display">LUMI</h1>
              <p className="text-sm text-muted-foreground">Your Care Companion</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Sun className="h-5 w-5 text-warning" />
            <span className="text-sm font-medium">{greeting()}</span>
          </div>
        </div>
      </header>

      {/* Main content - Three panel layout */}
      <main className="container px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto_1fr]">
          {/* LEFT PANEL - Health & Status */}
          <div className="space-y-6 order-2 lg:order-1">
            {/* Today's Medications */}
            <section className="rounded-3xl bg-card p-6 shadow-card animate-fade-in">
              <h2 className="text-xl font-bold text-foreground font-display mb-4">
                Today's Medications
              </h2>
              {medications.length === 0 ? (
                <p className="text-muted-foreground">No medications for today.</p>
              ) : (
                <div className="space-y-3">
                  {medications.map((medication) => (
                    <MedicationCard
                      key={medication.id}
                      medication={medication}
                      onMarkTaken={handleMarkTaken}
                    />
                  ))}
                </div>
              )}
            </section>

            {/* Medication Stats */}
            <section className="rounded-3xl bg-card p-6 shadow-card animate-fade-in">
              <h2 className="text-xl font-bold text-foreground font-display mb-4">
                Daily Progress
              </h2>
              <MedicationStats {...stats} />
            </section>

            {/* Emergency Status */}
            <section className="rounded-3xl bg-card p-6 shadow-card animate-fade-in">
              <h2 className="text-xl font-bold text-foreground font-display mb-4">
                Emergency Status
              </h2>
              <EmergencyStatus
                status={emergencyStatus}
                onTriggerEmergency={handleTriggerEmergency}
                onCancelEmergency={handleCancelEmergency}
              />
            </section>

            {/* Relatives / Nominees */}
            <section className="rounded-3xl bg-card p-6 shadow-card animate-fade-in">
              <h2 className="text-xl font-bold text-foreground font-display mb-4">
                Your Family
              </h2>
              {nominees.length === 0 ? (
                <p className="text-muted-foreground">No family members added.</p>
              ) : (
                <div className="space-y-3">
                  {nominees.map((nominee) => (
                    <NomineeCard key={nominee.id} nominee={nominee} />
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* CENTER PANEL - Voice Interaction */}
          <div className="flex flex-col items-center justify-start py-8 order-1 lg:order-2 lg:sticky lg:top-28 lg:h-[calc(100vh-8rem)]">
            <div className="rounded-3xl bg-card p-8 shadow-elevated animate-scale-in">
              <VoiceButton
                isListening={isListening}
                onVoiceStart={() => setIsListening(true)}
                onVoiceEnd={() => setIsListening(false)}
              />
            </div>

            {/* Quick voice response display */}
            {isListening && (
              <div className="mt-6 max-w-sm rounded-2xl bg-primary-soft p-4 animate-fade-in">
                <p className="text-center text-sm text-primary font-medium">
                  "I'm listening to you. How can I help?"
                </p>
              </div>
            )}
          </div>

          {/* RIGHT PANEL - Settings */}
          <div className="order-3">
            <div className="rounded-3xl bg-card p-6 shadow-card animate-fade-in lg:sticky lg:top-28">
              <SettingsPanel />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
