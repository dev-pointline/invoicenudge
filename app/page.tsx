"use client";

import { useState, useEffect, useRef } from "react";
import {
  Mail,
  Clock,
  Wallet,
  UserX,
  Upload,
  Bot,
  CheckCircle,
  Target,
  TrendingUp,
  Eye,
  BarChart3,
  CreditCard,
  ArrowRight,
  Check,
  X,
  Menu,
  ChevronDown,
  Sparkles,
  Zap,
  Shield,
  Send,
  Twitter,
} from "lucide-react";

// Intersection Observer hook for scroll animations
function useIntersectionObserver(options = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1, ...options });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

// Navigation Component
function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
              <Send className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-lg">InvoiceNudge</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-slate-600 hover:text-slate-900 transition-colors text-sm">Features</a>
            <a href="#how-it-works" className="text-slate-600 hover:text-slate-900 transition-colors text-sm">How It Works</a>
            <a href="#pricing" className="text-slate-600 hover:text-slate-900 transition-colors text-sm">Pricing</a>
            <a href="#faq" className="text-slate-600 hover:text-slate-900 transition-colors text-sm">FAQ</a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="#waitlist"
              className="px-5 py-2.5 bg-emerald-500 text-white rounded-full text-sm font-medium hover:bg-emerald-600 transition-all hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25"
            >
              Join Waitlist
            </a>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass border-t border-slate-200">
          <div className="px-4 py-4 space-y-3">
            <a href="#features" className="block py-2 text-slate-600" onClick={() => setIsMobileMenuOpen(false)}>Features</a>
            <a href="#how-it-works" className="block py-2 text-slate-600" onClick={() => setIsMobileMenuOpen(false)}>How It Works</a>
            <a href="#pricing" className="block py-2 text-slate-600" onClick={() => setIsMobileMenuOpen(false)}>Pricing</a>
            <a href="#faq" className="block py-2 text-slate-600" onClick={() => setIsMobileMenuOpen(false)}>FAQ</a>
            <a
              href="#waitlist"
              className="block w-full py-3 bg-emerald-500 text-white rounded-full text-center font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Join Waitlist
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

// Hero Section with Animated Invoice Mockup
function HeroSection() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen pt-24 lg:pt-32 pb-16 lg:pb-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-mesh noise-texture" />
      
      {/* Floating elements */}
      <div className="absolute top-32 left-10 w-16 h-16 bg-emerald-200/30 rounded-full blur-xl animate-float" />
      <div className="absolute top-48 right-20 w-24 h-24 bg-emerald-300/20 rounded-full blur-2xl animate-float delay-200" />
      <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-emerald-100/40 rounded-full blur-xl animate-float delay-400" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Copy */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-6 animate-fade-in-up">
              <Sparkles className="w-4 h-4" />
              <span>Launching Q2 2026 — Join 500 Founding Members</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-slate-900 mb-6 animate-fade-in-up delay-100">
              Stop Chasing<br />
              <span className="text-emerald-600">Late Payments</span>
            </h1>

            <p className="text-lg lg:text-xl text-slate-600 max-w-xl mx-auto lg:mx-0 mb-8 animate-fade-in-up delay-200">
              AI-powered reminders that sound like you — not a robot. Forward your invoice, we handle the follow-ups. Get paid 14 days faster without awkward client conversations.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start animate-fade-in-up delay-300">
              <a
                href="#waitlist"
                className="w-full sm:w-auto px-8 py-4 bg-emerald-500 text-white rounded-full text-lg font-medium hover:bg-emerald-600 transition-all hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/25 flex items-center justify-center gap-2"
              >
                Join the Waitlist
                <ArrowRight className="w-5 h-5" />
              </a>
              <p className="text-sm text-slate-500">
                No credit card required
              </p>
            </div>

            <div className="mt-8 flex items-center gap-6 justify-center lg:justify-start animate-fade-in-up delay-400">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                  <Check className="w-3 h-3 text-emerald-600" />
                </div>
                <span className="text-sm text-slate-600">60-second setup</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                  <Check className="w-3 h-3 text-emerald-600" />
                </div>
                <span className="text-sm text-slate-600">60-day guarantee</span>
              </div>
            </div>
          </div>

          {/* Right Column - Animated Invoice Mockup */}
          <div className="relative animate-fade-in-up delay-300">
            <div className="relative bg-white rounded-2xl shadow-2xl p-6 lg:p-8 border border-slate-200">
              {/* Invoice Card */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-slate-500">Invoice to</p>
                    <p className="font-semibold text-slate-900">Sarah Chen</p>
                    <p className="text-sm text-slate-500">Design Agency Inc.</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-500">Amount</p>
                    <p className="text-2xl font-bold text-slate-900">$2,400</p>
                  </div>
                </div>
                <div className="h-px bg-slate-200 my-4" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Invoice #INV-2026-042</span>
                  <span className="text-slate-500">Due: Jan 15, 2026</span>
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-3">
                <p className="text-sm font-medium text-slate-700 mb-3">Reminder Timeline</p>
                
                {[
                  { day: "Day 0", text: "Friendly reminder sent", delay: 0 },
                  { day: "Day 7", text: "Follow-up sent", delay: 1 },
                  { day: "Day 14", text: "Status check sent", delay: 2 },
                  { day: "Day 18", text: "Payment received!", delay: 3, success: true },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-500 ${
                      currentStep >= index
                        ? item.success
                          ? "bg-emerald-50 border border-emerald-200"
                          : "bg-slate-50 border border-slate-200"
                        : "bg-slate-50/50 border border-slate-100 opacity-50"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                        currentStep >= index
                          ? item.success
                            ? "bg-emerald-500 text-white"
                            : "bg-emerald-500 text-white"
                          : "bg-slate-200 text-slate-400"
                      }`}
                    >
                      {currentStep >= index ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <span className="text-xs font-medium">{index + 1}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">{item.day}</p>
                      <p className="text-xs text-slate-500">{item.text}</p>
                    </div>
                    {item.success && currentStep >= index && (
                      <span className="px-2 py-1 bg-emerald-500 text-white text-xs font-medium rounded-full animate-pulse-glow">
                        Paid!
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 px-3 py-1.5 bg-emerald-500 text-white text-sm font-medium rounded-full shadow-lg animate-pulse-glow">
                14 days faster
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-emerald-100 rounded-2xl -z-10 rotate-6" />
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-emerald-50 rounded-2xl -z-10 -rotate-6" />
          </div>
        </div>
      </div>
    </section>
  );
}

// Credibility Bar
function CredibilityBar() {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section ref={ref} className="relative py-12 lg:py-16 bg-slate-900 noise-texture">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="text-center mb-8">
          <p className="text-emerald-400 font-medium text-sm uppercase tracking-wider mb-2">
            Built for freelancers tired of awkward payment conversations
          </p>
          <p className="text-slate-300 text-lg">
            85% of freelancers experience late payments. You&apos;re not alone.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Works with</p>
              <p className="text-white font-medium">Gmail, Outlook, Any Email</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center">
              <Send className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Sends from</p>
              <p className="text-white font-medium">Your Email Address</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Accepts</p>
              <p className="text-white font-medium">Any Payment Method</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Problem Section
function ProblemSection() {
  const { ref, isVisible } = useIntersectionObserver();

  const problems = [
    {
      icon: Clock,
      title: "Hours Lost to Follow-Up Emails",
      description: "You spend 8-12 hours every month drafting 'just checking in' emails, agonizing over wording, and waiting anxiously for responses. That's 120 hours a year — three full work weeks — wasted on something that should be automatic.",
      stat: "8-12 hrs/month",
      color: "amber",
    },
    {
      icon: Wallet,
      title: "Rent Due, Invoice Unpaid",
      description: "40% of freelancers have missed personal bill payments because clients pay late. When your $3,000 invoice sits unpaid for 45 days, you're the one paying late fees and stressing about making rent.",
      stat: "40% miss bills",
      color: "rose",
    },
    {
      icon: UserX,
      title: "Fear of Seeming 'Pushy'",
      description: "You hesitate to follow up because you don't want to damage the relationship. So invoices slip from 30 days to 60 days while you hope the client 'remembers.' Meanwhile, they've just forgotten it was in their inbox.",
      stat: "39 day average",
      color: "purple",
    },
  ];

  return (
    <section ref={ref} className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-50" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6">
            Sound Familiar?
          </h2>
          <p className="text-lg text-slate-600">
            Late payments aren&apos;t just annoying — they&apos;re costing you time, money, and peace of mind.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {problems.map((problem, index) => (
            <div
              key={index}
              className={`group relative bg-white rounded-2xl p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className={`w-14 h-14 rounded-xl mb-6 flex items-center justify-center ${
                problem.color === "amber" ? "bg-amber-100 text-amber-600" :
                problem.color === "rose" ? "bg-rose-100 text-rose-600" :
                "bg-purple-100 text-purple-600"
              }`}>
                <problem.icon className="w-7 h-7" />
              </div>
              
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${
                problem.color === "amber" ? "bg-amber-100 text-amber-700" :
                problem.color === "rose" ? "bg-rose-100 text-rose-700" :
                "bg-purple-100 text-purple-700"
              }`}>
                {problem.stat}
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {problem.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Before/After Solution Section
function SolutionSection() {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-slate-900 noise-texture relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            There&apos;s a Better Way
          </h2>
          <p className="text-lg text-slate-300">
            What if you could get paid faster without the awkward follow-ups?
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Before */}
          <div className={`transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
            <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-rose-500/20 flex items-center justify-center">
                  <X className="w-5 h-5 text-rose-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Before InvoiceNudge</h3>
              </div>
              
              <div className="space-y-4">
                {[
                  "Send invoice → Wait → Check bank → Nothing → Draft awkward email",
                  "8-12 hours/month manually chasing payments",
                  "Constant anxiety about which invoices are overdue",
                  "Damaged relationships from 'too many' follow-ups",
                  "Getting paid in 45+ days (if at all)",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-rose-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X className="w-3 h-3 text-rose-400" />
                    </div>
                    <p className="text-slate-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* After */}
          <div className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
            <div className="bg-emerald-900/30 rounded-2xl p-8 border border-emerald-700/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <Check className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-white">After InvoiceNudge</h3>
              </div>
              
              <div className="space-y-4">
                {[
                  "Forward invoice → AI handles everything → Get paid in 24 days",
                  "10 seconds/month forwarding emails (seriously)",
                  "Dashboard shows exactly what's outstanding",
                  "Professional, consistent follow-ups clients expect",
                  "Average payment time drops from 39 days to 25 days",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-emerald-400" />
                    </div>
                    <p className="text-slate-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Features Section (Bento Grid)
function FeaturesSection() {
  const { ref, isVisible } = useIntersectionObserver();

  const features = [
    {
      icon: Mail,
      title: "60-Second Setup",
      description: "No complex integrations required. Forward your invoice to InvoiceNudge, and our AI extracts client name, amount, and due date automatically.",
      benefit: "Start getting paid faster today, not after a 2-hour setup session.",
      size: "large",
    },
    {
      icon: Target,
      title: "Sounds Like You",
      description: "Our AI learns from your original invoice email — casual, formal, or somewhere in between.",
      benefit: "Clients never suspect you're using automation.",
      size: "medium",
    },
    {
      icon: TrendingUp,
      title: "Escalating Politeness",
      description: "Day 0: Friendly. Day 7: Check-in. Day 14: Firm. Day 21: Final notice. Calibrated for results.",
      benefit: "Never decide when to escalate.",
      size: "medium",
    },
    {
      icon: Eye,
      title: "Preview Mode",
      description: "See every email before it sends. Approve, edit, or reject with one click. Unlock Autopilot after 5 approvals.",
      benefit: "Stay in complete control.",
      size: "small",
    },
    {
      icon: BarChart3,
      title: "Payment Dashboard",
      description: "Track average days-to-payment and see ROI proof.",
      benefit: "Justify keeping the subscription.",
      size: "small",
    },
    {
      icon: CreditCard,
      title: "Any Payment Method",
      description: "Zelle, Venmo, checks, wire — we track due dates regardless of how clients pay.",
      benefit: "Keep your existing workflows.",
      size: "small",
    },
  ];

  return (
    <section id="features" ref={ref} className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6">
            Everything You Need to Get Paid Faster
          </h2>
          <p className="text-lg text-slate-600">
            No accounting software required. No complex workflows. Just results.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Large Feature */}
          <div className={`md:col-span-2 lg:col-span-2 bg-white rounded-2xl p-8 lg:p-10 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
              <div className="flex-1">
                <div className="w-14 h-14 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6">
                  <features[0].icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{features[0].title}</h3>
                <p className="text-slate-600 mb-4">{features[0].description}</p>
                <p className="text-emerald-600 font-medium">{features[0].benefit}</p>
              </div>
              <div className="lg:w-1/2">
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 font-mono text-sm">
                  <div className="flex items-center gap-2 text-slate-400 mb-3">
                    <Mail className="w-4 h-4" />
                    <span>Forward to:</span>
                  </div>
                  <p className="text-emerald-600 font-medium">followup@invoicenudge.com</p>
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <p className="text-slate-500">✓ Client: Sarah Chen</p>
                    <p className="text-slate-500">✓ Amount: $2,400</p>
                    <p className="text-slate-500">✓ Due: Jan 15, 2026</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Medium Features */}
          {features.slice(1, 3).map((feature, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-5">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-slate-600 mb-3">{feature.description}</p>
              <p className="text-emerald-600 font-medium text-sm">{feature.benefit}</p>
            </div>
          ))}

          {/* Small Features */}
          {features.slice(3).map((feature, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${(index + 3) * 100}ms` }}
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                <feature.icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-slate-600 text-sm mb-2">{feature.description}</p>
              <p className="text-emerald-600 font-medium text-sm">{feature.benefit}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// How It Works Section
function HowItWorksSection() {
  const { ref, isVisible } = useIntersectionObserver();

  const steps = [
    {
      icon: Upload,
      title: "Forward Your Invoice",
      description: "Forward any invoice email to followup@invoicenudge.com. Our AI extracts the details in under 30 seconds.",
    },
    {
      icon: Bot,
      title: "We Handle Follow-Ups",
      description: "InvoiceNudge sends personalized reminders on Day 0, 7, 14, and 21 — each one sounding like you wrote it yourself.",
    },
    {
      icon: CheckCircle,
      title: "Get Paid Faster",
      description: "Clients respond to consistent, professional follow-ups. Average payment time drops from 39 days to 25 days.",
    },
  ];

  return (
    <section id="how-it-works" ref={ref} className="py-20 lg:py-32 bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6">
            How It Works
          </h2>
          <p className="text-lg text-slate-600">
            Three steps. Sixty seconds. Start getting paid faster.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-emerald-200" />
              )}

              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-lg">
                  <step.icon className="w-10 h-10" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg" style={{ left: "calc(50% + 24px)" }}>
                  {index + 1}
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
              <p className="text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Use Cases Section
function UseCasesSection() {
  const { ref, isVisible } = useIntersectionObserver();

  const useCases = [
    {
      persona: "The Graphic Designer",
      context: "Juggling multiple projects, hates the 'business side' of freelancing",
      quote: "Every month, at least two clients 'forget' to pay on time. I used to spend Sunday evenings drafting polite-but-firm follow-up emails, then second-guessing every word. Now I forward invoices to InvoiceNudge and forget about them. Last month, I collected $8,400 that would have sat unpaid for another 3 weeks. That's rent, groceries, and peace of mind.",
      highlight: "Save time on collection",
      icon: "🎨",
    },
    {
      persona: "The Web Developer",
      context: "Great at coding, uncomfortable asking for money",
      quote: "I'd rather debug a production crash at 2am than send a payment reminder. It feels... desperate? But InvoiceNudge sends professional follow-ups that don't sound desperate at all. My clients just think I have my act together. One even commented that my 'new invoicing system' seems really organized.",
      highlight: "Stay professional",
      icon: "💻",
    },
    {
      persona: "The Marketing Consultant",
      context: "High-value ($5k+) project invoices",
      quote: "When you're billing $10,000 for a strategy engagement, you can't send a collections email that sounds like a utility company. InvoiceNudge's escalation ladder is perfect — firm enough to get results, professional enough to maintain the relationship. I've recovered over $25,000 in 'slow' invoices without a single awkward conversation.",
      highlight: "Maintain relationships",
      icon: "📊",
    },
  ];

  return (
    <section ref={ref} className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6">
            Built for Freelancers Like You
          </h2>
          <p className="text-lg text-slate-600">
            See how different freelancers would use InvoiceNudge to solve their payment problems.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="text-4xl mb-4">{useCase.icon}</div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-bold text-slate-900">{useCase.persona}</h3>
              </div>
              <p className="text-sm text-slate-500 mb-4">{useCase.context}</p>
              <div className="bg-slate-50 rounded-xl p-4 mb-4 border border-slate-200">
                <p className="text-slate-600 text-sm italic leading-relaxed">&ldquo;{useCase.quote}&rdquo;</p>
              </div>
              <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-full">
                {useCase.highlight}
              </span>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-slate-500 mt-8">
          These are illustrative scenarios showing how different freelancers might use InvoiceNudge.
        </p>
      </div>
    </section>
  );
}

// Pricing Section
function PricingSection() {
  const { ref, isVisible } = useIntersectionObserver();

  const tiers = [
    {
      name: "Starter",
      price: "$19",
      period: "/month",
      annual: "$199/year",
      description: "Perfect for solo freelancers with 5-10 clients",
      features: [
        "Up to 10 invoices/month",
        "AI-powered reminders (Day 0/7/14/21)",
        "Preview Mode (approve before send)",
        "Email-forward workflow",
        "Basic payment dashboard",
        "Works with any payment method",
      ],
      excluded: ["Autopilot Mode", "Client reply detection", "Custom schedules"],
      cta: "Join Waitlist",
      popular: false,
    },
    {
      name: "Pro",
      price: "$49",
      period: "/month",
      annual: "$499/year (save $89)",
      description: "For established freelancers scaling up",
      features: [
        "Up to 50 invoices/month",
        "Everything in Starter, plus:",
        "Autopilot Mode (send without approval)",
        "Client reply detection (auto-stop)",
        "Custom reminder schedules",
        "Advanced ROI dashboard",
        "Priority support (4hr response)",
        "Zapier integration",
      ],
      excluded: [],
      cta: "Join Waitlist",
      popular: true,
    },
    {
      name: "Agency",
      price: "$149",
      period: "/month",
      annual: "$1,499/year (save $289)",
      description: "For agencies and growing teams",
      features: [
        "Unlimited invoices",
        "Everything in Pro, plus:",
        "3 team seats",
        "White-label emails",
        "Multi-client dashboards",
        "Dedicated account manager",
        "API access",
        "Instant support (1hr + Slack)",
      ],
      excluded: [],
      cta: "Join Waitlist",
      popular: false,
    },
  ];

  return (
    <section id="pricing" ref={ref} className="py-20 lg:py-32 bg-slate-900 noise-texture relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="inline-block px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-medium mb-4">
            Planned Pricing — Lock in Founding Member Rates
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-slate-300">
            Pay for reminders, not features you don&apos;t need. 60-day money-back guarantee.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 transition-all duration-500 ${
                tier.popular
                  ? "bg-white scale-105 shadow-2xl"
                  : "bg-slate-800/50 border border-slate-700"
              } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-emerald-500 text-white text-sm font-medium rounded-full">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className={`text-xl font-bold mb-2 ${tier.popular ? "text-slate-900" : "text-white"}`}>
                  {tier.name}
                </h3>
                <p className={`text-sm ${tier.popular ? "text-slate-600" : "text-slate-400"}`}>
                  {tier.description}
                </p>
              </div>

              <div className="mb-6">
                <span className={`text-4xl font-bold ${tier.popular ? "text-slate-900" : "text-white"}`}>
                  {tier.price}
                </span>
                <span className={tier.popular ? "text-slate-600" : "text-slate-400"}>
                  {tier.period}
                </span>
                <p className={`text-sm mt-1 ${tier.popular ? "text-slate-500" : "text-slate-500"}`}>
                  or {tier.annual}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 flex-shrink-0 ${tier.popular ? "text-emerald-500" : "text-emerald-400"}`} />
                    <span className={tier.popular ? "text-slate-600" : "text-slate-300"}>
                      {feature}
                    </span>
                  </li>
                ))}
                {tier.excluded.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 opacity-50">
                    <X className={`w-5 h-5 flex-shrink-0 ${tier.popular ? "text-slate-400" : "text-slate-500"}`} />
                    <span className={tier.popular ? "text-slate-400" : "text-slate-500"}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#waitlist"
                className={`block w-full py-3 rounded-full text-center font-medium transition-all ${
                  tier.popular
                    ? "bg-emerald-500 text-white hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/25"
                    : "bg-slate-700 text-white hover:bg-slate-600"
                }`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Pricing FAQs */}
        <div className={`mt-16 max-w-2xl mx-auto transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h3 className="text-xl font-bold text-white text-center mb-8">Pricing Questions</h3>
          <div className="space-y-4">
            {[
              {
                q: "When will InvoiceNudge launch?",
                a: "We're currently in closed beta. Public launch is planned for Q2 2026. Join the waitlist to get early access and lock in founding member pricing.",
              },
              {
                q: "Will there be a free trial?",
                a: "Yes! The first 500 founding members will get a 14-day free trial (no credit card required).",
              },
              {
                q: "Can I cancel anytime?",
                a: "Absolutely. No contracts, no commitments. Cancel with one click. We also offer a 60-day money-back guarantee.",
              },
            ].map((faq, index) => (
              <div key={index} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <h4 className="font-medium text-white mb-2">{faq.q}</h4>
                <p className="text-slate-400 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// FAQ Section
function FAQSection() {
  const { ref, isVisible } = useIntersectionObserver();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "What if the AI writes something that upsets my client?",
      a: "That's why we built Preview Mode. Every reminder is drafted by AI but approved by you before sending. You see exactly what your client will see, and you can edit or reject with one click. After you trust the AI (usually 5-10 approvals), you can enable Autopilot Mode — or stay in Preview Mode forever. You're always in control.",
    },
    {
      q: "How is this different from FreshBooks or QuickBooks reminders?",
      a: "Those tools send generic template emails: 'Your invoice is overdue.' InvoiceNudge's AI learns YOUR communication style from your original invoice email. If you're casual ('Hey Sarah!'), we're casual. If you're formal ('Dear Ms. Chen,'), we're formal. Plus, we're not bundled with accounting features you don't need — just reminders, done exceptionally well.",
    },
    {
      q: "What if my emails go to spam?",
      a: "We use Resend for email delivery — the same infrastructure trusted by Linear, Vercel, and thousands of tech companies. SPF, DKIM, and DMARC are configured automatically. Our beta users report 85-90% open rates. If deliverability ever becomes an issue, our 60-day money-back guarantee has you covered.",
    },
    {
      q: "Do you take a percentage of my payments?",
      a: "Never. InvoiceNudge is a flat monthly subscription. We don't touch your money, don't process your payments, and don't take a cut. You keep using whatever payment method your clients prefer — Stripe, PayPal, Zelle, checks, wire transfers.",
    },
    {
      q: "Can I use this with my existing invoicing tool?",
      a: "Yes! InvoiceNudge works with any invoicing workflow. Use Bonsai, HoneyBook, Google Docs, or a handwritten invoice — just forward the email to us, and we'll track the due date and send reminders. No integrations required.",
    },
    {
      q: "What data do you store? Is my information safe?",
      a: "We store only the minimum information needed: client name, invoice amount, due date, and your email address. All data is encrypted at rest and in transit. We never share your information with third parties. You can delete all your data at any time.",
    },
    {
      q: "How long does setup take?",
      a: "About 60 seconds. Create an account, forward your first invoice, and you're done. No OAuth connections, no accounting software integrations, no 30-minute onboarding calls. Just email forwarding.",
    },
    {
      q: "When does InvoiceNudge launch?",
      a: "We're targeting Q2 2026 for public launch. Join the waitlist today to get early access, and you'll be among the first 500 to lock in founding member pricing ($19/month instead of $29/month when we raise prices).",
    },
  ];

  return (
    <section id="faq" ref={ref} className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-30" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-600">
            Everything you need to know about InvoiceNudge.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl border border-slate-200 overflow-hidden transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <button
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-medium text-slate-900">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5">
                  <p className="text-slate-600 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Final CTA / Waitlist Section
function WaitlistSection() {
  const { ref, isVisible } = useIntersectionObserver();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "You're on the waitlist!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <section id="waitlist" ref={ref} className="py-20 lg:py-32 bg-emerald-600 relative overflow-hidden">
      <div className="absolute inset-0 noise-texture" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-400/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-800/30 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 text-white rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            <span>Be One of the First 500 Founding Members</span>
          </div>

          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            Lock in $19/month Forever
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-xl mx-auto">
            Get early access, priority support, and help shape the product roadmap. Price rises to $29/month at public launch.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-5 py-4 rounded-full text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="px-8 py-4 bg-slate-900 text-white rounded-full font-medium hover:bg-slate-800 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === "loading" ? (
                  "Joining..."
                ) : (
                  <>
                    Join Waitlist
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </form>

          {status === "success" && (
            <div className="flex items-center justify-center gap-2 text-white">
              <Check className="w-5 h-5" />
              <p>{message}</p>
            </div>
          )}

          {status === "error" && (
            <div className="flex items-center justify-center gap-2 text-white/90">
              <X className="w-5 h-5" />
              <p>{message}</p>
            </div>
          )}

          <p className="text-emerald-200 text-sm">
            No credit card required • We&apos;ll email you when it&apos;s your turn
          </p>

          <div className="mt-12 flex items-center justify-center gap-8">
            <div className="flex items-center gap-2 text-white/80">
              <Shield className="w-5 h-5" />
              <span className="text-sm">60-day guarantee</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <Zap className="w-5 h-5" />
              <span className="text-sm">60-second setup</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <Check className="w-5 h-5" />
              <span className="text-sm">Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="py-12 lg:py-16 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
                <Send className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-lg text-white">InvoiceNudge</span>
            </div>
            <p className="text-slate-400 max-w-sm">
              AI-powered payment reminders for freelancers. Get paid faster without the awkward conversations.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="text-slate-400 hover:text-white transition-colors">Features</a></li>
              <li><a href="#pricing" className="text-slate-400 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#faq" className="text-slate-400 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#how-it-works" className="text-slate-400 hover:text-white transition-colors">How It Works</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Connect</h4>
            <ul className="space-y-2">
              <li><a href="mailto:hello@invoicenudge.com" className="text-slate-400 hover:text-white transition-colors">Contact</a></li>
              <li>
                <a href="https://twitter.com/invoicenudge" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                  <Twitter className="w-4 h-4" />
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://producthunt.com" className="text-slate-400 hover:text-white transition-colors">
                  Product Hunt
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © 2026 InvoiceNudge. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="/privacy" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Mobile Sticky CTA
function MobileStickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="glass p-4 border-t border-slate-200">
        <a
          href="#waitlist"
          className="block w-full py-3 bg-emerald-500 text-white rounded-full text-center font-medium shadow-lg"
        >
          Join the Waitlist — Get Early Access
        </a>
      </div>
    </div>
  );
}

// Main Page Component
export default function HomePage() {
  return (
    <main>
      <Navigation />
      <HeroSection />
      <CredibilityBar />
      <ProblemSection />
      <SolutionSection />
      <FeaturesSection />
      <HowItWorksSection />
      <UseCasesSection />
      <PricingSection />
      <FAQSection />
      <WaitlistSection />
      <Footer />
      <MobileStickyCTA />
    </main>
  );
}