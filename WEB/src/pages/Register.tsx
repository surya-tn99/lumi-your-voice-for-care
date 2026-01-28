import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, User, Phone, MapPin, Stethoscope, Users, ArrowRight, ArrowLeft, Check } from "lucide-react";
import { toast } from "sonner";
import { auth, data } from "@/lib/api";

type Step = "personal" | "health" | "nominees" | "complete";

interface FormData {
  name: string;
  phone: string;
  dob: string;
  bloodGroup: string;
  address: string;
  healthIssues: string;
  nominee1Name: string;
  nominee1Phone: string;
  nominee1Relationship: string;
  nominee2Name: string;
  nominee2Phone: string;
  nominee2Relationship: string;
}

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("personal");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    dob: "",
    bloodGroup: "",
    address: "",
    healthIssues: "",
    nominee1Name: "",
    nominee1Phone: "",
    nominee1Relationship: "",
    nominee2Name: "",
    nominee2Phone: "",
    nominee2Relationship: "",
  });

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const steps: { key: Step; label: string; icon: React.ElementType }[] = [
    { key: "personal", label: "Personal", icon: User },
    { key: "health", label: "Health", icon: Stethoscope },
    { key: "nominees", label: "Family", icon: Users },
    { key: "complete", label: "Done", icon: Check },
  ];

  const currentStepIndex = steps.findIndex((s) => s.key === step);

  const handleNext = () => {
    const stepOrder: Step[] = ["personal", "health", "nominees", "complete"];
    const currentIndex = stepOrder.indexOf(step);

    // Validation
    if (step === "personal") {
      if (!formData.name || !formData.phone || !formData.dob) {
        toast.error("Please fill in all required fields");
        return;
      }
    }

    if (currentIndex < stepOrder.length - 1) {
      setStep(stepOrder[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const stepOrder: Step[] = ["personal", "health", "nominees", "complete"];
    const currentIndex = stepOrder.indexOf(step);
    if (currentIndex > 0) {
      setStep(stepOrder[currentIndex - 1]);
    }
  };

  const handleComplete = async () => {
    setIsLoading(true);
    try {
      // 1. Register User
      const { data: authData } = await auth.register({
        fullname: formData.name,
        phone: formData.phone,
        dob: formData.dob,
        blood_group: formData.bloodGroup,
        address: formData.address
      });

      localStorage.setItem("token", authData.access_token);

      // 2. Add Nominees
      if (formData.nominee1Name) {
        await data.createNominee({
          name: formData.nominee1Name,
          relationship: formData.nominee1Relationship,
          phone: formData.nominee1Phone
        });
      }

      if (formData.nominee2Name) {
        await data.createNominee({
          name: formData.nominee2Name,
          relationship: formData.nominee2Relationship,
          phone: formData.nominee2Phone
        });
      }

      toast.success("Registration Successful!");
      navigate("/dashboard");

    } catch (error: any) {
      toast.error("Registration Failed", {
        description: error.response?.data?.detail || "Please check your details and try again"
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-warm flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-center py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary shadow-glow">
            <Heart className="h-7 w-7 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground font-display">LUMI</h1>
            <p className="text-sm text-muted-foreground">Create Your Account</p>
          </div>
        </div>
      </header>

      {/* Progress steps */}
      <div className="px-4 mb-6">
        <div className="max-w-md mx-auto flex items-center justify-between">
          {steps.map((s, index) => (
            <div key={s.key} className="flex items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full transition-all ${index <= currentStepIndex
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                  }`}
              >
                <s.icon className="h-5 w-5" />
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-1 w-12 sm:w-16 mx-2 rounded-full transition-all ${index < currentStepIndex ? "bg-primary" : "bg-muted"
                    }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 flex items-start justify-center px-4 pb-8">
        <div className="w-full max-w-md">
          <div className="rounded-3xl bg-card p-6 sm:p-8 shadow-elevated animate-fade-in">
            {step === "personal" && (
              <>
                <div className="text-center mb-6">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-soft mb-3">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground font-display">
                    Personal Information
                  </h2>
                  <p className="text-muted-foreground text-sm mt-1">
                    Tell us about yourself
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">Full Name *</label>
                    <Input
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      className="h-14 rounded-xl border-2"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">Phone Number *</label>
                    <Input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      className="h-14 rounded-xl border-2"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">Date of Birth *</label>
                      <Input
                        type="date"
                        value={formData.dob}
                        onChange={(e) => updateField("dob", e.target.value)}
                        className="h-14 rounded-xl border-2"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">Blood Group</label>
                      <Input
                        placeholder="A+"
                        value={formData.bloodGroup}
                        onChange={(e) => updateField("bloodGroup", e.target.value)}
                        className="h-14 rounded-xl border-2"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">Address</label>
                    <Input
                      placeholder="Your home address"
                      value={formData.address}
                      onChange={(e) => updateField("address", e.target.value)}
                      className="h-14 rounded-xl border-2"
                    />
                  </div>
                </div>
              </>
            )}

            {step === "health" && (
              <>
                <div className="text-center mb-6">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-secondary-soft mb-3">
                    <Stethoscope className="h-8 w-8 text-secondary" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground font-display">
                    Health Information
                  </h2>
                  <p className="text-muted-foreground text-sm mt-1">
                    This helps us care for you better
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">
                      Current Health Issues
                    </label>
                    <textarea
                      placeholder="E.g., High blood pressure, Diabetes, Arthritis..."
                      value={formData.healthIssues}
                      onChange={(e) => updateField("healthIssues", e.target.value)}
                      className="w-full h-32 px-4 py-3 rounded-xl border-2 border-input bg-background text-foreground resize-none focus:border-primary focus:outline-none"
                    />
                    <p className="text-xs text-muted-foreground">
                      Separate multiple conditions with commas
                    </p>
                  </div>

                  <div className="rounded-xl bg-primary-soft p-4">
                    <p className="text-sm text-primary">
                      <strong>Why we ask:</strong> Your health information helps us provide better voice responses and emergency care.
                    </p>
                  </div>
                </div>
              </>
            )}

            {step === "nominees" && (
              <>
                <div className="text-center mb-6">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-success-soft mb-3">
                    <Users className="h-8 w-8 text-success" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground font-display">
                    Emergency Contacts
                  </h2>
                  <p className="text-muted-foreground text-sm mt-1">
                    Who should we call in an emergency?
                  </p>
                </div>

                <div className="space-y-6">
                  {/* First nominee */}
                  <div className="space-y-3 p-4 rounded-xl bg-muted/50">
                    <h3 className="font-semibold text-foreground">Primary Contact</h3>
                    <Input
                      placeholder="Name"
                      value={formData.nominee1Name}
                      onChange={(e) => updateField("nominee1Name", e.target.value)}
                      className="h-12 rounded-xl border-2"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        placeholder="Relationship"
                        value={formData.nominee1Relationship}
                        onChange={(e) => updateField("nominee1Relationship", e.target.value)}
                        className="h-12 rounded-xl border-2"
                      />
                      <Input
                        type="tel"
                        placeholder="Phone"
                        value={formData.nominee1Phone}
                        onChange={(e) => updateField("nominee1Phone", e.target.value)}
                        className="h-12 rounded-xl border-2"
                      />
                    </div>
                  </div>

                  {/* Second nominee */}
                  <div className="space-y-3 p-4 rounded-xl bg-muted/50">
                    <h3 className="font-semibold text-foreground">Secondary Contact</h3>
                    <Input
                      placeholder="Name"
                      value={formData.nominee2Name}
                      onChange={(e) => updateField("nominee2Name", e.target.value)}
                      className="h-12 rounded-xl border-2"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        placeholder="Relationship"
                        value={formData.nominee2Relationship}
                        onChange={(e) => updateField("nominee2Relationship", e.target.value)}
                        className="h-12 rounded-xl border-2"
                      />
                      <Input
                        type="tel"
                        placeholder="Phone"
                        value={formData.nominee2Phone}
                        onChange={(e) => updateField("nominee2Phone", e.target.value)}
                        className="h-12 rounded-xl border-2"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {step === "complete" && (
              <>
                <div className="text-center py-8">
                  <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-success-soft mb-4 animate-scale-in">
                    <Check className="h-12 w-12 text-success" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground font-display">
                    You're almost there!
                  </h2>
                  <p className="text-muted-foreground mt-2 max-w-xs mx-auto">
                    Click below to create your account and start using LUMI.
                  </p>
                </div>

                <Button
                  onClick={handleComplete}
                  className="w-full"
                  size="xl"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </>
            )}

            {/* Navigation buttons */}
            {step !== "complete" && (
              <div className="flex gap-3 mt-6">
                {step !== "personal" && (
                  <Button variant="outline" onClick={handleBack} className="flex-1">
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    Back
                  </Button>
                )}
                <Button onClick={handleNext} className="flex-1">
                  Continue
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </div>
            )}
          </div>

          {/* Login link */}
          {step === "personal" && (
            <div className="text-center mt-6">
              <p className="text-muted-foreground">
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="text-primary font-semibold hover:underline"
                >
                  Sign In
                </button>
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
