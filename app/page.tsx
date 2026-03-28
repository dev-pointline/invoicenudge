"use client";

import { useState, useEffect, useRef } from "react";
import {
  Mail,
  Sparkles,
  ArrowUpRight,
  Eye,
  CreditCard,
  BarChart3,
  Send,
  Bot,
  CheckCircle,
  Palette,
  Briefcase,
  TrendingUp,
  Clock,
  Heart,
  TrendingDown,
  Menu,
  X,
  ChevronRight,
  Twitter,
  ExternalLink,
  Check,
  Shield,
  Zap,
} from "lucide-react";

// Intersection Observer hook for scroll animations
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
}

// Animated section wrapper
function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, isInView } = useInView();

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-out ${
        isInView
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timelineStep, setTimelineStep] = useState(0);

  // Hero timeline animation
  useEffect(() => {
    const interval = setInterval(() => {
      setTimelineStep((prev) => (prev + 1) % 5);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSubmitStatus("success");
        setEmail("");
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const timelineSteps = [
    { label: "Invoice Forwarded", icon: Mail },
    { label: "Day 0: Friendly Reminder", icon: Send },
    { label: "Day 7: Check-in", icon: Clock },
    { label: "Day 14: Follow-up", icon: ArrowUpRight },
    { label: "Paid!", icon: CheckCircle },
  ];

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#FF6B6B] flex items-center justify-center">
                <Mail className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-slate-900">InvoiceNudge</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                Features
              </a>
              <a href="#pricing" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                Pricing
              </a>
              <a href="#faq" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                FAQ
              </a>
              <a
                href="#waitlist"
                className="px-4 py-2 bg-[#FF6B6B] text-white text-sm font-medium rounded-lg hover:bg-[#E55A5A] transition-colors"
              >
                Join Waitlist
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-slate-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200">
            <div className="px-4 py-4 space-y-3">
              <a href="#features" className="block text-slate-600 hover:text-slate-900" onClick={() => setMobileMenuOpen(false)}>
                Features
              </a>
              <a href="#pricing" className="block text-slate-600 hover:text-slate-900" onClick={() => setMobileMenuOpen(false)}>
                Pricing
              </a>
              <a href="#faq" className="block text-slate-600 hover:text-slate-900" onClick={() => setMobileMenuOpen(false)}>
                FAQ
              </a>
              <a
                href="#waitlist"
                className="block w-full text-center px-4 py-2 bg-[#FF6B6B] text-white font-medium rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Join Waitlist
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 noise-overlay overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-red-50/30" />
        
        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Copy */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FF6B6B]/10 text-[#FF6B6B] text-sm font-medium rounded-full animate-fade-in"
                >
                  <Sparkles className="w-4 h-4" />
                  Launching Q2 2026
                </div>
                <h1
                  className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.1] animate-fade-in-up"
                >
                  Stop Chasing<br />
                  <span className="text-[#FF6B6B]">Late Payments</span>
                </h1>
                <p
                  className="text-xl text-slate-600 max-w-lg animate-fade-in-up delay-100"
                >
                  AI-powered reminders that sound like you, not a robot. Forward your invoice, we handle the follow-ups.{" "}
                  <strong className="text-slate-900">You approve every email before it sends.</strong>
                </p>
              </div>

              {/* Waitlist Form */}
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 animate-fade-in-up delay-200"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@freelancer.com"
                  required
                  className="flex-1 px-4 py-3 rounded-lg border border-slate-300 focus:border-[#FF6B6B] focus:ring-2 focus:ring-[#FF6B6B]/20 outline-none transition-all text-slate-900 placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-[#FF6B6B] text-white font-semibold rounded-lg hover:bg-[#E55A5A] disabled:opacity-50 transition-all animate-pulse-glow whitespace-nowrap"
                >
                  {isSubmitting ? "Joining..." : "Join Waitlist"}
                </button>
              </form>

              {submitStatus === "success" && (
                <p className="text-green-600 text-sm flex items-center gap-2">
                  <Check className="w-4 h-4" /> You&apos;re on the waitlist! We&apos;ll email you when we launch.
                </p>
              )}
              {submitStatus === "error" && (
                <p className="text-red-600 text-sm">Something went wrong. Please try again.</p>
              )}

              <p className="text-sm text-slate-500 animate-fade-in-up delay-300">
                Free 7-day trial. No credit card required. Founding members lock in $19/month forever.
              </p>
            </div>

            {/* Right: Animated Timeline Mockup */}
            <div className="relative animate-fade-in-up delay-300">
              <div className="bg-slate-900 rounded-2xl p-6 shadow-2xl grain-dark">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="ml-4 text-slate-400 text-sm font-mono">InvoiceNudge Timeline</span>
                </div>

                <div className="space-y-4">
                  {timelineSteps.map((step, index) => {
                    const Icon = step.icon;
                    const isActive = index <= timelineStep;
                    const isCurrent = index === timelineStep;

                    return (
                      <div
                        key={step.label}
                        className={`flex items-center gap-4 p-3 rounded-lg transition-all duration-500 ${
                          isActive
                            ? isCurrent
                              ? "bg-[#FF6B6B]/20 border border-[#FF6B6B]/50"
                              : "bg-slate-800"
                            : "bg-slate-800/50 opacity-50"
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                            isActive ? "bg-[#FF6B6B]" : "bg-slate-700"
                          }`}
                        >
                          <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-slate-500"}`} />
                        </div>
                        <span
                          className={`font-medium transition-all ${
                            isActive ? "text-white" : "text-slate-500"
                          }`}
                        >
                          {step.label}
                        </span>
                        {isCurrent && index < 4 && (
                          <div className="ml-auto">
                            <div className="w-2 h-2 bg-[#FF6B6B] rounded-full animate-pulse" />
                          </div>
                        )}
                        {index === 4 && isActive && (
                          <div className="ml-auto text-green-400 text-sm font-semibold">
                            Collected!
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-700">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Invoice: Logo Design</span>
                    <span className="text-[#FF6B6B] font-semibold font-mono">$2,400</span>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#FF6B6B]/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Credibility Bar */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-slate-100 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-center">
              <p className="text-slate-600">
                <span className="font-semibold text-slate-900">85% of freelancers</span> experience late payments
              </p>
              <div className="hidden md:block w-px h-8 bg-slate-300" />
              <p className="text-slate-600">
                Works with <span className="font-semibold text-slate-900">Zelle, Venmo, PayPal, Check, Wire</span>
              </p>
              <div className="hidden md:block w-px h-8 bg-slate-300" />
              <p className="text-slate-600">
                <span className="font-semibold text-slate-900">No accounting software</span> required
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 noise-overlay">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              The Hidden Costs of Late Payments
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              It&apos;s not just about the money. It&apos;s the time, the anxiety, and the relationships you&apos;re afraid to damage.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                title: "Time Theft",
                description:
                  "You spend 8-12 hours every month drafting 'just checking in' emails, agonizing over wording, waiting for responses that never come. That's 120+ hours a year you'll never get back.",
                stat: "8-12 hrs/month",
              },
              {
                icon: Heart,
                title: "The Awkwardness Tax",
                description:
                  "You hate asking for money. Every follow-up feels like you're being pushy, even when you're owed $5,000. So you wait, and wait, and miss rent.",
                stat: "85% feel awkward",
              },
              {
                icon: TrendingDown,
                title: "Cash Flow Chaos",
                description:
                  "40% of freelancers have missed personal bill payments because clients pay late. Your invoices pile up while you stress about whether you can afford groceries.",
                stat: "40% miss bills",
              },
            ].map((problem, index) => (
              <AnimatedSection key={problem.title} delay={index * 100}>
                <div className="bg-white rounded-2xl p-8 border border-slate-200 hover:border-[#FF6B6B]/50 hover:shadow-lg transition-all h-full">
                  <div className="w-12 h-12 rounded-xl bg-[#FF6B6B]/10 flex items-center justify-center mb-6">
                    <problem.icon className="w-6 h-6 text-[#FF6B6B]" />
                  </div>
                  <div className="text-sm font-semibold text-[#FF6B6B] mb-2">{problem.stat}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{problem.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{problem.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Before/After */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900 grain-dark text-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              From Chaos to <span className="text-[#FF6B6B]">Confidence</span>
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              What if you never had to write another awkward payment follow-up?
            </p>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Before */}
            <AnimatedSection>
              <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="text-red-400 font-semibold">Before InvoiceNudge</span>
                </div>
                <div className="space-y-4">
                  {[
                    "Draft email, agonize over tone",
                    "Wait 3 days... nothing",
                    "Draft another email, feel desperate",
                    "Client finally pays (44 days late)",
                    "Repeat for every single invoice",
                  ].map((step, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <X className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300">{step}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-slate-700">
                  <p className="text-slate-400 text-sm">
                    Result: <span className="text-red-400 font-semibold">120 hours/year wasted, constant anxiety</span>
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* After */}
            <AnimatedSection delay={100}>
              <div className="bg-slate-800 rounded-2xl p-8 border border-[#FF6B6B]/30">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-green-400 font-semibold">After InvoiceNudge</span>
                </div>
                <div className="space-y-4">
                  {[
                    "Forward invoice (10 seconds)",
                    "AI sends Day 0 reminder (sounds like you)",
                    "Day 7: Automatic check-in",
                    "Day 14: Firm follow-up",
                    "Client pays (faster with consistent follow-up)",
                  ].map((step, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300">{step}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-slate-700">
                  <p className="text-slate-400 text-sm">
                    Result: <span className="text-green-400 font-semibold">10 seconds/invoice, zero anxiety</span>
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 noise-overlay">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Everything You Need to Get Paid
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              One tool that does one thing exceptionally well.
            </p>
          </AnimatedSection>

          {/* Bento Grid Layout */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Large feature card */}
            <AnimatedSection className="md:col-span-2 lg:col-span-2">
              <div className="bg-gradient-to-br from-[#FF6B6B] to-[#E55A5A] rounded-2xl p-8 text-white h-full">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Eye className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">Preview Mode: You&apos;re Always in Control</h3>
                    <p className="text-white/90 text-lg leading-relaxed mb-4">
                      Approve every single email before it sends. See exactly what your clients will receive.
                      After 5 approvals, unlock Autopilot Mode — or stay in Preview forever. Your choice, always.
                    </p>
                    <div className="flex items-center gap-2 text-white/80">
                      <Shield className="w-4 h-4" />
                      <span className="text-sm">100% control over your brand voice</span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Email Forward */}
            <AnimatedSection delay={100}>
              <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-[#FF6B6B]/50 hover:shadow-lg transition-all h-full">
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center mb-4">
                  <Mail className="w-5 h-5 text-slate-700" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Email-Forward Workflow</h3>
                <p className="text-slate-600 text-sm">
                  No complex setup. Forward your invoice to followup@invoicenudge.com. We extract everything automatically.
                </p>
              </div>
            </AnimatedSection>

            {/* AI Tone */}
            <AnimatedSection delay={200}>
              <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-[#FF6B6B]/50 hover:shadow-lg transition-all h-full">
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center mb-4">
                  <Sparkles className="w-5 h-5 text-slate-700" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">AI That Matches Your Voice</h3>
                <p className="text-slate-600 text-sm">
                  Casual or formal? Emoji-friendly or buttoned-up? Our AI mirrors your tone in every reminder.
                </p>
              </div>
            </AnimatedSection>

            {/* Escalation */}
            <AnimatedSection delay={300}>
              <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-[#FF6B6B]/50 hover:shadow-lg transition-all h-full">
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center mb-4">
                  <ArrowUpRight className="w-5 h-5 text-slate-700" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Escalating Politeness</h3>
                <p className="text-slate-600 text-sm">
                  Day 0: Friendly. Day 7: Check-in. Day 14: Firm. Day 21: Final notice. Professionally persistent.
                </p>
              </div>
            </AnimatedSection>

            {/* Payment Methods */}
            <AnimatedSection delay={400}>
              <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-[#FF6B6B]/50 hover:shadow-lg transition-all h-full">
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center mb-4">
                  <CreditCard className="w-5 h-5 text-slate-700" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Works With Any Payment</h3>
                <p className="text-slate-600 text-sm">
                  Zelle, Venmo, PayPal, check, wire — we don&apos;t care how you get paid. We just track and nudge.
                </p>
              </div>
            </AnimatedSection>

            {/* Dashboard */}
            <AnimatedSection delay={500}>
              <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-[#FF6B6B]/50 hover:shadow-lg transition-all h-full">
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center mb-4">
                  <BarChart3 className="w-5 h-5 text-slate-700" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Simple Dashboard</h3>
                <p className="text-slate-600 text-sm">
                  See payment timing trending down. Track reminders sent. Know which clients need extra attention.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-100">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Three steps. Under 60 seconds. That&apos;s it.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: Send,
                title: "Forward Your Invoice",
                description:
                  "Send any invoice email to followup@invoicenudge.com. Our AI extracts client name, amount, and due date in under 30 seconds.",
              },
              {
                step: "02",
                icon: Bot,
                title: "AI Drafts Reminders",
                description:
                  "We generate a personalized reminder sequence that matches your communication style. You see every email before it sends.",
              },
              {
                step: "03",
                icon: CheckCircle,
                title: "Clients Pay, You Relax",
                description:
                  "Consistent, professional follow-ups mean fewer forgotten invoices. You focus on billable work, not collections.",
              },
            ].map((item, index) => (
              <AnimatedSection key={item.step} delay={index * 100}>
                <div className="relative">
                  {index < 2 && (
                    <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-slate-300 -ml-4 z-0">
                      <ChevronRight className="absolute right-0 -top-2 text-slate-400" />
                    </div>
                  )}
                  <div className="relative z-10 bg-white rounded-2xl p-8 border border-slate-200">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="text-4xl font-bold text-slate-200">{item.step}</div>
                      <div className="w-12 h-12 rounded-xl bg-[#FF6B6B]/10 flex items-center justify-center">
                        <item.icon className="w-6 h-6 text-[#FF6B6B]" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                    <p className="text-slate-600">{item.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 noise-overlay">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Built for Every Freelancer
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Whether you&apos;re just starting out or scaling to an agency, InvoiceNudge grows with you.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Palette,
                title: "The Solo Designer",
                description:
                  "Running a one-person design studio means wearing every hat — including collections. Forward the logo project invoice, let AI handle the follow-ups while you focus on the next client pitch.",
              },
              {
                icon: Briefcase,
                title: "The Busy Consultant",
                description:
                  "With 5 active retainers, tracking who owes what becomes a spreadsheet nightmare. Forward each monthly retainer invoice once, let automated reminders run while you focus on strategy work.",
              },
              {
                icon: TrendingUp,
                title: "The Growing Freelancer",
                description:
                  "Scaling from side-hustle to full-time means more invoices, more follow-ups, more chaos. Automate the payment reminders that used to eat Sunday afternoons.",
              },
            ].map((useCase, index) => (
              <AnimatedSection key={useCase.title} delay={index * 100}>
                <div className="bg-white rounded-2xl p-8 border border-slate-200 hover:border-[#FF6B6B]/50 hover:shadow-lg transition-all h-full">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-6">
                    <useCase.icon className="w-6 h-6 text-slate-700" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{useCase.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{useCase.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900 grain-dark text-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FF6B6B]/20 text-[#FF6B6B] text-sm font-medium rounded-full mb-4">
              <Zap className="w-4 h-4" />
              Planned Launch Pricing
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Simple, Honest Pricing
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Pay for itself with one invoice collected faster.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Starter",
                price: "$19",
                period: "/month",
                annual: "$199/year (save $29)",
                description: "Perfect for solo freelancers",
                features: [
                  "10 invoices/month",
                  "AI reminders (Day 0/7/14/21)",
                  "Preview Mode",
                  "Email-forward workflow",
                  "Basic dashboard",
                ],
                highlighted: false,
              },
              {
                name: "Pro",
                price: "$49",
                period: "/month",
                annual: "$499/year (save $89)",
                description: "For established freelancers",
                features: [
                  "50 invoices/month",
                  "Everything in Starter",
                  "Autopilot Mode",
                  "Client reply detection",
                  "Custom reminder schedules",
                  "Priority support (4hr)",
                  "Zapier integration",
                ],
                highlighted: true,
              },
              {
                name: "Agency",
                price: "$149",
                period: "/month",
                annual: "$1,499/year (save $289)",
                description: "For teams and agencies",
                features: [
                  "Unlimited invoices",
                  "Everything in Pro",
                  "3 team seats",
                  "White-label emails",
                  "API access",
                  "Dedicated account manager",
                ],
                highlighted: false,
              },
            ].map((tier, index) => (
              <AnimatedSection key={tier.name} delay={index * 100}>
                <div
                  className={`rounded-2xl p-8 h-full flex flex-col ${
                    tier.highlighted
                      ? "bg-gradient-to-b from-[#FF6B6B] to-[#E55A5A] text-white"
                      : "bg-slate-800 text-white"
                  }`}
                >
                  {tier.highlighted && (
                    <div className="text-sm font-semibold text-white/90 mb-4">Best Value</div>
                  )}
                  <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                  <p className={`text-sm mb-4 ${tier.highlighted ? "text-white/80" : "text-slate-400"}`}>
                    {tier.description}
                  </p>
                  <div className="mb-2">
                    <span className="text-4xl font-bold">{tier.price}</span>
                    <span className={tier.highlighted ? "text-white/80" : "text-slate-400"}>
                      {tier.period}
                    </span>
                  </div>
                  <p className={`text-sm mb-6 ${tier.highlighted ? "text-white/70" : "text-slate-500"}`}>
                    {tier.annual}
                  </p>
                  <ul className="space-y-3 mb-8 flex-1">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check
                          className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                            tier.highlighted ? "text-white" : "text-[#FF6B6B]"
                          }`}
                        />
                        <span className={tier.highlighted ? "text-white/90" : "text-slate-300"}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#waitlist"
                    className={`block w-full text-center py-3 rounded-lg font-semibold transition-all ${
                      tier.highlighted
                        ? "bg-white text-[#FF6B6B] hover:bg-slate-100"
                        : "bg-[#FF6B6B] text-white hover:bg-[#E55A5A]"
                    }`}
                  >
                    Join Waitlist
                  </a>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Pricing FAQ */}
          <AnimatedSection className="mt-16 max-w-2xl mx-auto">
            <div className="bg-slate-800 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-6 text-center">Pricing FAQ</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">When will InvoiceNudge launch?</h4>
                  <p className="text-slate-400 text-sm">
                    We&apos;re targeting Q2 2026. Join the waitlist to lock in founding member pricing ($19/month forever).
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Will there be a free trial?</h4>
                  <p className="text-slate-400 text-sm">
                    Yes. 7 days free, no credit card required. Forward your first invoice and see if the AI matches your tone.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Can I cancel anytime?</h4>
                  <p className="text-slate-400 text-sm">
                    Absolutely. No contracts, no commitments. Cancel in 2 clicks. 60-day money-back guarantee.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 noise-overlay">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
          </AnimatedSection>

          <div className="space-y-4">
            {[
              {
                q: "How does InvoiceNudge learn my tone?",
                a: "We analyze your original invoice email: sentence length, formality level, emoji usage, greeting style. If you write 'Hey Sarah! 😊' we won't send 'Dear Ms. Smith, Please remit payment immediately.'",
              },
              {
                q: "What if the AI writes something I hate?",
                a: "Preview Mode shows you every email before it sends. You can edit, reject, or approve. You're never locked into autopilot — stay in Preview forever if you prefer. You're always in control.",
              },
              {
                q: "Will my clients know I'm using automation?",
                a: "No. Emails come from your email address via our servers. There's no 'Sent via InvoiceNudge' footer unless you want one. To your clients, it looks like you wrote the email yourself.",
              },
              {
                q: "What if my emails go to spam?",
                a: "We use Resend (same infrastructure as Linear and Vercel) with SPF/DKIM/DMARC configured automatically. Industry-leading deliverability. If there are issues, our 60-day money-back guarantee has you covered.",
              },
              {
                q: "Do I need QuickBooks or FreshBooks?",
                a: "No. InvoiceNudge is standalone. Just forward invoice emails — no accounting software integration required. Works with any invoicing tool or even hand-written invoices.",
              },
              {
                q: "How is this different from FreshBooks reminders?",
                a: "FreshBooks sends generic templates ('Your invoice is overdue'). InvoiceNudge sends AI-personalized messages that match YOUR voice. Plus, we're $19/month for reminders only — not $33/month for features you don't use.",
              },
              {
                q: "What's your refund policy?",
                a: "60-day money-back guarantee. If you don't love it — for any reason — email us for a full refund. No questions asked, no hoops to jump through.",
              },
              {
                q: "When does InvoiceNudge launch?",
                a: "We're targeting Q2 2026. Join the waitlist to be first in line and lock in founding member pricing ($19/month forever, even when prices increase).",
              },
            ].map((faq, index) => (
              <AnimatedSection key={index} delay={index * 50}>
                <details className="group bg-white rounded-xl border border-slate-200 overflow-hidden">
                  <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 transition-colors">
                    <span className="font-semibold text-slate-900 pr-4">{faq.q}</span>
                    <ChevronRight className="w-5 h-5 text-slate-400 group-open:rotate-90 transition-transform flex-shrink-0" />
                  </summary>
                  <div className="px-6 pb-6 text-slate-600">{faq.a}</div>
                </details>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="waitlist" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#FF6B6B] to-[#E55A5A] text-white">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Join 500 Founding Members
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-xl mx-auto">
              Lock in $19/month pricing forever. When we raise prices after launch, you&apos;re grandfathered in.
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@freelancer.com"
                required
                className="flex-1 px-4 py-3 rounded-lg text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-white/50 outline-none"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-white text-[#FF6B6B] font-semibold rounded-lg hover:bg-slate-100 disabled:opacity-50 transition-all whitespace-nowrap"
              >
                {isSubmitting ? "Joining..." : "Get Early Access"}
              </button>
            </form>

            {submitStatus === "success" && (
              <p className="mt-4 text-white/90 flex items-center justify-center gap-2">
                <Check className="w-4 h-4" /> You&apos;re on the waitlist!
              </p>
            )}

            <p className="mt-6 text-white/70 text-sm">
              We&apos;ll email you when we launch. No spam, just updates.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[#FF6B6B] flex items-center justify-center">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold">InvoiceNudge</span>
              </div>
              <p className="text-slate-400 text-sm max-w-sm">
                AI-powered payment reminders for freelancers. Stop chasing late payments, start getting paid.
              </p>
              <p className="text-slate-500 text-sm mt-4">Built by Dor Tagger</p>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <a href="#features" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex gap-4">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="https://producthunt.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              © 2026 InvoiceNudge. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-slate-400">
              <a href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile floating CTA */}
      <div className="md:hidden floating-cta">
        <a
          href="#waitlist"
          className="block w-full text-center py-3 bg-[#FF6B6B] text-white font-semibold rounded-lg"
        >
          Join Waitlist — Lock in $19/month
        </a>
      </div>
    </main>
  );
}