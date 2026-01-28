import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Phone, ArrowRight, Shield } from "lucide-react";
import { toast } from "sonner";
import { auth } from "@/lib/api";

export default function Login() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = async () => {
    if (phone.length < 10) return;
    setIsLoading(true);
    try {
      // Check if user exists first
      const { data } = await auth.checkUser(phone);

      if (!data.exists) {
        toast.info("User not found. Please register.", {
          description: "Redirecting you to registration..."
        });
        setTimeout(() => navigate("/register", { state: { phone } }), 1500);
        return;
      }

      // If user exists, simulate OTP send (in real app, backend would send it)
      toast.success("OTP Sent", { description: "Use 1234 for testing" });
      setStep("otp");
    } catch (error) {
      toast.error("Error", { description: "Could not verify phone number" });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length < 4) return;
    setIsLoading(true);
    try {
      const { data } = await auth.login(phone, otp);
      localStorage.setItem("token", data.access_token);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Login Failed", { description: "Invalid OTP or error logging in" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-warm flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-center py-8">
        <div className="flex items-center gap-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary shadow-glow animate-gentle-float">
            <Heart className="h-8 w-8 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground font-display">LUMI</h1>
            <p className="text-muted-foreground">Your Care Companion</p>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-4 pb-8">
        <div className="w-full max-w-md">
          <div className="rounded-3xl bg-card p-8 shadow-elevated animate-fade-in">
            {step === "phone" ? (
              <>
                <div className="text-center mb-8">
                  <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary-soft mb-4">
                    <Phone className="h-10 w-10 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground font-display">
                    Welcome Back
                  </h2>
                  <p className="text-muted-foreground mt-2">
                    Enter your phone number to continue
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      placeholder="Enter phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="h-16 text-xl text-center rounded-2xl border-2 focus:border-primary"
                    />
                  </div>

                  <Button
                    onClick={handleSendOtp}
                    disabled={phone.length < 10 || isLoading}
                    className="w-full"
                    size="xl"
                  >
                    {isLoading ? "Checking..." : "Continue"}
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="text-center mb-8">
                  <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-success-soft mb-4">
                    <Shield className="h-10 w-10 text-success" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground font-display">
                    Enter Code
                  </h2>
                  <p className="text-muted-foreground mt-2">
                    We sent a code to {phone}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Verification Code
                    </label>
                    <Input
                      type="text"
                      placeholder="0000"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      className="h-16 text-3xl text-center tracking-[0.5em] rounded-2xl border-2 focus:border-primary font-mono"
                      maxLength={6}
                    />
                  </div>

                  <Button
                    onClick={handleVerifyOtp}
                    disabled={otp.length < 4 || isLoading}
                    className="w-full"
                    size="xl"
                  >
                    {isLoading ? "Verifying..." : "Continue"}
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>

                  <button
                    onClick={() => setStep("phone")}
                    className="w-full text-center text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Use a different number
                  </button>
                </div>
              </>
            )}
          </div>

          {/* New user link */}
          <div className="text-center mt-6">
            <p className="text-muted-foreground">
              New to LUMI?{" "}
              <button
                onClick={() => navigate("/register")}
                className="text-primary font-semibold hover:underline"
              >
                Create Account
              </button>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-sm text-muted-foreground">
        <p>Safe • Secure • Always with you</p>
      </footer>
    </div>
  );
}
