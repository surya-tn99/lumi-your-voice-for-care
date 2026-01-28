import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Mic, Shield, Users, ArrowRight, Phone, Pill } from "lucide-react";

export default function Index() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Mic,
      title: "Voice-First",
      description: "Just speak naturally. No typing, no complex menus.",
      color: "bg-primary-soft text-primary",
    },
    {
      icon: Pill,
      title: "Medication Tracking",
      description: "Never miss a dose with smart voice reminders.",
      color: "bg-secondary-soft text-secondary",
    },
    {
      icon: Shield,
      title: "Emergency Care",
      description: "Automatic help, even when you can't respond.",
      color: "bg-emergency-soft text-emergency",
    },
    {
      icon: Users,
      title: "Family Connected",
      description: "Your loved ones stay informed in real-time.",
      color: "bg-success-soft text-success",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-secondary/5 blur-3xl" />
        </div>

        <div className="relative container px-4 py-12 sm:py-20">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary shadow-glow animate-gentle-float">
                <Heart className="h-8 w-8 text-primary-foreground" />
              </div>
              <span className="text-3xl font-bold text-foreground font-display">LUMI</span>
            </div>
          </div>

          {/* Hero content */}
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground font-display leading-tight mb-6">
              Your Voice-First
              <span className="block text-primary">Care Companion</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-lg mx-auto">
              Safe, independent aging made simple. Just speak, and LUMI takes care of the rest.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="xl"
                onClick={() => navigate("/register")}
                className="shadow-glow"
              >
                Get Started
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button
                size="xl"
                variant="outline"
                onClick={() => navigate("/login")}
              >
                <Phone className="h-5 w-5 mr-2" />
                Sign In
              </Button>
            </div>
          </div>

          {/* Voice button preview */}
          <div className="mt-12 flex justify-center">
            <div className="relative">
              <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-primary shadow-glow animate-voice-pulse">
                <Mic className="h-14 w-14 text-primary-foreground" />
              </div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className="text-sm font-medium text-muted-foreground">
                  Tap to speak
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground font-display mb-4">
              Designed for Seniors
            </h2>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              Simple, intuitive, and always there when you need it most.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-3xl bg-card p-6 shadow-card hover:shadow-elevated transition-all hover:-translate-y-1 animate-fade-in"
              >
                <div
                  className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${feature.color} mb-4`}
                >
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground font-display mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 sm:py-24 bg-card/50">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground font-display mb-4">
              How LUMI Works
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              {[
                { step: "1", title: "Speak Naturally", desc: "\"I took my morning medicine\" or \"I feel dizzy\"" },
                { step: "2", title: "LUMI Responds", desc: "Updates your records and checks on your wellbeing" },
                { step: "3", title: "Family Stays Informed", desc: "Your loved ones receive real-time updates" },
              ].map((item, index) => (
                <div
                  key={item.step}
                  className="flex gap-6 items-start animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
                    {item.step}
                  </div>
                  <div className="pt-2">
                    <h3 className="text-xl font-bold text-foreground font-display mb-1">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24">
        <div className="container px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="rounded-3xl bg-gradient-primary p-8 sm:p-12 shadow-glow">
              <Heart className="h-12 w-12 text-primary-foreground mx-auto mb-4" />
              <h2 className="text-2xl sm:text-3xl font-bold text-primary-foreground font-display mb-4">
                Start Your Journey Today
              </h2>
              <p className="text-primary-foreground/80 mb-6">
                Join thousands of seniors living safely and independently with LUMI.
              </p>
              <Button
                size="xl"
                variant="secondary"
                onClick={() => navigate("/register")}
                className="bg-white text-primary hover:bg-white/90"
              >
                Create Free Account
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Heart className="h-5 w-5 text-primary" />
            <span className="font-bold text-foreground font-display">LUMI</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Safe • Secure • Always with you
          </p>
        </div>
      </footer>
    </div>
  );
}
