"use client";

import { useState, useEffect, useRef } from "react";
import {
  Mail,
  Sparkles,
  TrendingUp,
  UserCheck,
  Puzzle,
  HandCoins,
  DollarSign,
  Clock,
  HeartCrack,
  ChevronDown,
  ChevronRight,
  Check,
  ArrowRight,
  Menu,
  X,
  Shield,
  Zap,
  Star,
  Twitter,
  Linkedin,
  ExternalLink,
} from "lucide-react";

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

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "#features", label: "Features" },
    { href: "#how-it-works", label: "How It Works" },
    { href: "#pricing", label: "Pricing" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "dark-glass-effect shadow-lg" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
              <Mail className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-white">InvoiceNudge</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {links.map(link => (
              <a key={link.href} href={link.href} className="text-slate-300 hover:text-white transition-colors text-sm font-medium">
                {link.label}
              </a>
            ))}
            <a href="#waitlist" className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white rounded-full text-sm font-semibold transition-all hover:shadow-lg hover:shadow-violet-500/25">
              Join Waitlist
            </a>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-white" aria-label="Toggle menu">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden dark-glass-effect rounded-2xl mt-2 p-4 mb-4">
            {links.map(link => (
              <a key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="block py-3 text-slate-300 hover:text-white transition-colors font-medium">
                {link.label}
              </a>
            ))}
            <a href="#waitlist" onClick={() => setIsOpen(false)} className="block mt-4 px-5 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-full text-center font-semibold">
              Join Waitlist
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}

function HeroSection() {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section className="relative min-h-screen hero-gradient overflow-hidden pt-20">
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-fuchsia-500/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "2s" }} />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className={`space-y-8 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-violet-300">
              <Sparkles className="w-4 h-4" />
              <span>Launching Q2 2026 • Join 500+ freelancers</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
              Stop Writing{" "}
              <span className="gradient-text">"Just Checking In..."</span>{" "}
              Emails
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-xl leading-relaxed">
              AI sends polite payment reminders in your voice — so you never have to chase late payments again. Freelancers using InvoiceNudge get paid{" "}
              <span className="text-white font-semibold">16 days faster</span> on average.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#waitlist" className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white rounded-full font-semibold text-lg transition-all hover:shadow-xl hover:shadow-violet-500/25 hover:scale-105">
                Join the Waitlist
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#how-it-works" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full font-semibold text-lg transition-all">
                See How It Works
              </a>
            </div>

            <p className="text-sm text-slate-400">
              First 100 invoices free • No credit card required
            </p>
          </div>

          <div className={`relative ${isVisible ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "0.3s" }}>
            <div className="relative bg-slate-800/50 rounded-3xl p-6 border border-slate-700/50 backdrop-blur-sm">
              <div className="grid gap-4">
                <div className="bg-slate-900/80 rounded-2xl p-5 border border-red-500/20">
                  <div className="flex items-center gap-2 mb-3 text-red-400 text-xs font-medium uppercase tracking-wider">
                    <X className="w-4 h-4" />
                    Generic Reminder
                  </div>
                  <p className="text-slate-400 text-sm font-mono">
                    "Invoice #1234 is now 7 days overdue. Please remit payment as soon as possible. — Automated System"
                  </p>
                </div>

                <div className="flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center animate-float">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                </div>

                <div className="bg-slate-900/80 rounded-2xl p-5 border border-emerald-500/20">
                  <div className="flex items-center gap-2 mb-3 text-emerald-400 text-xs font-medium uppercase tracking-wider">
                    <Check className="w-4 h-4" />
                    AI-Personalized
                  </div>
                  <p className="text-slate-200 text-sm">
                    "Hey Sarah! Hope the product launch went smoothly 🎉 Quick follow-up on my invoice from last week — just wanted to make sure it didn't slip through the cracks. Let me know if you need anything from my end!"
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-violet-500/30 to-fuchsia-500/30 rounded-full blur-2xl" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-slate-400" />
      </div>
    </section>
  );
}

function CredibilityBar() {
  const { ref, isVisible } = useIntersectionObserver();
  const integrations = ["QuickBooks", "FreshBooks", "Wave", "Xero", "Stripe", "PayPal"];

  return (
    <section ref={ref} className="relative bg-slate-900 py-12 border-y border-slate-800">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
        <div className="text-center space-y-6">
          <p className="text-slate-400 text-sm uppercase tracking-wider font-medium">
            Built for freelancers managing $5K+ in outstanding invoices
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
            {integrations.map(name => (
              <div key={name} className="text-slate-400 font-semibold text-lg hover:text-slate-200 transition-colors cursor-default">
                {name}
              </div>
            ))}
          </div>

          <p className="text-slate-500 text-sm max-w-2xl mx-auto">
            65% of freelancers wait 30+ days for payment — costing $39,000 annually in cash flow gaps
            <span className="text-slate-600"> (Freelancers Union, 2025)</span>
          </p>
        </div>
      </div>
    </section>
  );
}

function ProblemSection() {
  const { ref, isVisible } = useIntersectionObserver();

  const painPoints = [
    {
      icon: DollarSign,
      title: "You're Losing $10,000+ Per Year",
      description: "The average freelancer has $12,000 in outstanding invoices at any time. When clients pay 30+ days late, you're essentially giving them an interest-free loan with YOUR money.",
      color: "text-red-400",
      bg: "bg-red-500/10",
      border: "border-red-500/20",
    },
    {
      icon: Clock,
      title: "2-3 Hours Monthly Chasing Payments",
      description: "Drafting follow-ups, checking if they paid, drafting another follow-up... You spend 30+ hours per year on payment collection that could go toward billable work.",
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
    },
    {
      icon: HeartCrack,
      title: "The Awkwardness Tax",
      description: "78% of freelancers say chasing payments is their most stressful task. You rewrite that 'just checking in' email three times because asking for your own money feels like begging.",
      color: "text-fuchsia-400",
      bg: "bg-fuchsia-500/10",
      border: "border-fuchsia-500/20",
    },
  ];

  return (
    <section ref={ref} className="relative py-24 sm:py-32 section-gradient-light overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center max-w-3xl mx-auto mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            You're Losing <span className="gradient-text">$10,000+ Per Year</span> to Late Payments
          </h2>
          <p className="text-lg text-slate-600">
            And it's not just money — it's your time, energy, and peace of mind.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {painPoints.map((point, index) => (
            <div
              key={point.title}
              className={`relative bg-white rounded-2xl p-8 border ${point.border} card-hover ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${point.bg} mb-6`}>
                <point.icon className={`w-7 h-7 ${point.color}`} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{point.title}</h3>
              <p className="text-slate-600 leading-relaxed">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SolutionSection() {
  const { ref, isVisible } = useIntersectionObserver();

  const comparisons = [
    {
      before: "Manually tracking due dates across spreadsheets and calendar reminders, then writing awkward follow-up emails when clients inevitably pay late.",
      after: "Forward your invoice once → AI tracks due dates automatically and sends personalized reminders at the perfect intervals.",
    },
    {
      before: "Spending 30+ minutes per overdue invoice crafting the 'right tone' — professional but not aggressive, friendly but not desperate.",
      after: "AI generates reminders in YOUR voice in seconds. You review (or auto-send) and get back to work that actually pays.",
    },
    {
      before: "Feeling paralyzed about following up because you don't want to damage the client relationship or seem pushy.",
      after: "The AI handles the uncomfortable conversation with escalating politeness. You never have to be 'the bad guy' yourself.",
    },
  ];

  return (
    <section ref={ref} className="relative py-24 sm:py-32 bg-slate-900 overflow-hidden">
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl -translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center max-w-3xl mx-auto mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Before & After <span className="gradient-text">InvoiceNudge</span>
          </h2>
          <p className="text-lg text-slate-400">
            See the transformation in your payment workflow
          </p>
        </div>

        <div className="space-y-6">
          {comparisons.map((item, index) => (
            <div
              key={index}
              className={`grid md:grid-cols-2 gap-4 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="bg-slate-800/50 rounded-2xl p-6 border border-red-500/20">
                <div className="flex items-center gap-2 mb-4 text-red-400 text-sm font-medium">
                  <X className="w-5 h-5" />
                  Before
                </div>
                <p className="text-slate-400">{item.before}</p>
              </div>
              <div className="bg-slate-800/50 rounded-2xl p-6 border border-emerald-500/20">
                <div className="flex items-center gap-2 mb-4 text-emerald-400 text-sm font-medium">
                  <Check className="w-5 h-5" />
                  After InvoiceNudge
                </div>
                <p className="text-slate-200">{item.after}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const { ref, isVisible } = useIntersectionObserver();

  const features = [
    {
      icon: Sparkles,
      title: "AI Voice Matching",
      description: "Our AI analyzes your writing style and generates reminders that sound authentically you — casual or formal, emoji or no emoji.",
      benefit: "So clients never know it's automated",
    },
    {
      icon: TrendingUp,
      title: "4-Stage Escalation",
      description: "Day 0: Friendly. Day 7: Gentle. Day 14: Urgent. Day 21: Final notice. Each escalation maintains relationships while recovering revenue.",
      benefit: "So you never decide 'how firm is too firm'",
    },
    {
      icon: Mail,
      title: "Email-First Workflow",
      description: "Just forward your invoice to nudge@invoicenudge.com. AI extracts client name, amount, and due date automatically.",
      benefit: "So you set it up in under 60 seconds",
    },
    {
      icon: UserCheck,
      title: "Smart Payment Detection",
      description: "When your client replies 'Paid!' or 'Check's in the mail,' our AI detects it and automatically stops the reminder sequence.",
      benefit: "So you never look unprofessional",
    },
    {
      icon: Puzzle,
      title: "Works With Your Stack",
      description: "Keep using QuickBooks, FreshBooks, Wave, or Gmail. InvoiceNudge layers on top via email forwarding — no integrations required.",
      benefit: "So you start in minutes, not days",
    },
    {
      icon: HandCoins,
      title: "Payment Plan Assist",
      description: "When a client says 'I can't pay the full amount,' our AI suggests a payment plan and drafts the agreement email.",
      benefit: "So you recover more of what you're owed",
    },
  ];

  return (
    <section id="features" ref={ref} className="relative py-24 sm:py-32 section-gradient-light overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center max-w-3xl mx-auto mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Everything You Need to <span className="gradient-text">Get Paid Faster</span>
          </h2>
          <p className="text-lg text-slate-600">
            Powerful features designed for freelancers who'd rather focus on work than chasing payments
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`group relative bg-white rounded-2xl p-8 border border-slate-200 card-hover ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 mb-6 group-hover:from-violet-500/20 group-hover:to-fuchsia-500/20 transition-colors">
                <feature.icon className="w-7 h-7 text-violet-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600 mb-4 leading-relaxed">{feature.description}</p>
              <p className="text-sm font-medium text-violet-600">{feature.benefit}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const { ref, isVisible } = useIntersectionObserver();

  const steps = [
    {
      number: "1",
      title: "Forward Your Invoice",
      description: "Just forward the invoice email you sent to your client to nudge@invoicenudge.com. Takes 10 seconds.",
      icon: Mail,
    },
    {
      number: "2",
      title: "AI Learns Your Style",
      description: "On first use, paste 3 sample follow-ups you've written. The AI learns your tone and never sounds robotic.",
      icon: Sparkles,
    },
    {
      number: "3",
      title: "Sit Back & Get Paid",
      description: "AI sends reminders on schedule. Average collection time drops from 44 to 28 days — without you lifting a finger.",
      icon: Zap,
    },
  ];

  return (
    <section id="how-it-works" ref={ref} className="relative py-24 sm:py-32 bg-slate-900 overflow-hidden">
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center max-w-3xl mx-auto mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Get Started in <span className="gradient-text">60 Seconds</span>
          </h2>
          <p className="text-lg text-slate-400">
            No complex setup. No integrations. No learning curve.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`relative ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-violet-500/50 to-transparent -translate-x-1/2" />
              )}

              <div className="text-center">
                <div className="relative inline-flex items-center justify-center w-32 h-32 mb-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 rounded-full blur-xl" />
                  <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-white text-slate-900 font-bold flex items-center justify-center shadow-lg text-lg">
                    {step.number}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCasesSection() {
  const { ref, isVisible } = useIntersectionObserver();

  const useCases = [
    {
      type: "Sarah",
      role: "Freelance Graphic Designer",
      context: "12 clients/month, $500-$5,000 projects",
      narrative: "Sarah forwards each invoice right after sending it. When payment is 3 days late, her client gets a friendly nudge that sounds exactly like her. Two months in, her average collection time dropped from 38 days to 22 days — and she hasn't written a single follow-up herself.",
      color: "from-pink-500 to-rose-500",
    },
    {
      type: "Marcus",
      role: "Management Consultant",
      context: "4 enterprise clients, $15K+ retainers",
      narrative: "Marcus needs formal language for Fortune 500 clients. He configured InvoiceNudge for professional tone and a longer escalation timeline (Day 7, 21, 35, 49). His AI reminders reference PO numbers and include wire details. Last quarter, he recovered $12,000 stuck in 'payment processing limbo.'",
      color: "from-violet-500 to-indigo-500",
    },
    {
      type: "Jamie",
      role: "Agency Owner (3 employees)",
      context: "20+ invoices monthly, mixed clients",
      narrative: "Jamie's team forwards every invoice to InvoiceNudge and lets AI handle follow-ups. Their office manager reclaimed 15 hours per month — time now spent on client onboarding instead of payment collection. The team jokes that InvoiceNudge is their 'fourth employee' who works weekends.",
      color: "from-emerald-500 to-teal-500",
    },
  ];

  return (
    <section ref={ref} className="relative py-24 sm:py-32 section-gradient-light overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center max-w-3xl mx-auto mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            How Freelancers <span className="gradient-text">Actually Use</span> InvoiceNudge
          </h2>
          <p className="text-lg text-slate-600">
            Real scenarios from different types of freelancers
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {useCases.map((useCase, index) => (
            <div
              key={useCase.type}
              className={`relative bg-white rounded-2xl overflow-hidden border border-slate-200 card-hover ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className={`h-2 bg-gradient-to-r ${useCase.color}`} />
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${useCase.color} flex items-center justify-center text-white font-bold text-lg`}>
                    {useCase.type[0]}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{useCase.type}</h3>
                    <p className="text-sm text-slate-500">{useCase.role}</p>
                  </div>
                </div>
                <p className="text-sm text-violet-600 font-medium mb-4">{useCase.context}</p>
                <p className="text-slate-600 leading-relaxed">{useCase.narrative}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const { ref, isVisible } = useIntersectionObserver();

  const tiers = [
    {
      name: "Pay Per Invoice",
      price: "$0.50",
      unit: "per invoice",
      description: "Perfect for freelancers with 5-15 invoices/month",
      features: [
        "AI-personalized reminders",
        "4-stage escalation sequence",
        "Email forwarding workflow",
        "Works with any invoicing tool",
        "Pay only for what you use",
      ],
      cta: "Get Early Access",
      popular: false,
    },
    {
      name: "Unlimited",
      price: "$19",
      unit: "/month",
      description: "Best for freelancers with 20+ invoices/month",
      features: [
        "Everything in Pay Per Invoice",
        "Unlimited invoices",
        "Priority support (24hr response)",
        "Custom reminder templates",
        "Early access to new features",
      ],
      cta: "Get Early Access",
      popular: true,
    },
    {
      name: "Annual",
      price: "$190",
      unit: "/year",
      description: "Save $38 — best value for committed freelancers",
      features: [
        "Everything in Unlimited",
        "2 months free",
        "Lifetime launch discount locked in",
        "Founding member badge",
        "Dedicated onboarding call",
      ],
      cta: "Get Early Access",
      popular: false,
    },
  ];

  return (
    <section id="pricing" ref={ref} className="relative py-24 sm:py-32 bg-slate-900 overflow-hidden">
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-violet-500/20 to-transparent rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center max-w-3xl mx-auto mb-8 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            <span className="gradient-text">Planned Launch</span> Pricing
          </h2>
          <p className="text-lg text-slate-400">
            Simple pricing that scales with your business. Cancel anytime.
          </p>
        </div>

        {/* COO FEEDBACK: Beta pricing banner */}
        <div className={`max-w-3xl mx-auto mb-12 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "0.1s" }}>
          <div className="bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 border border-violet-500/30 rounded-2xl p-6 text-center">
            <div className="flex items-center justify-center gap-2 text-violet-300 mb-2">
              <Sparkles className="w-5 h-5" />
              <span className="font-semibold">Beta Perk</span>
            </div>
            <p className="text-white text-lg">
              All pricing tiers are <span className="font-bold">free during validation</span>. Your first 100 invoices are on us — no credit card required.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {tiers.map((tier, index) => (
            <div
              key={tier.name}
              className={`relative bg-slate-800/50 rounded-2xl p-8 border ${tier.popular ? "border-violet-500" : "border-slate-700"} ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full text-sm font-semibold text-white">
                  Most Popular
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-white">{tier.price}</span>
                  <span className="text-slate-400">{tier.unit}</span>
                </div>
                <p className="text-sm text-slate-400 mt-2">{tier.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {tier.features.map(feature => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#waitlist"
                className={`block w-full py-3 rounded-full text-center font-semibold transition-all ${
                  tier.popular
                    ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white"
                    : "bg-slate-700 hover:bg-slate-600 text-white"
                }`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>

        <div className={`mt-16 max-w-3xl mx-auto ${isVisible ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "0.5s" }}>
          <h3 className="text-xl font-bold text-white text-center mb-8">Pricing Questions</h3>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-slate-300 font-medium mb-2">When will InvoiceNudge launch?</p>
              <p className="text-slate-400 text-sm">Q2 2026 (April-June). Join the waitlist to be first in line.</p>
            </div>
            <div className="text-center">
              <p className="text-slate-300 font-medium mb-2">Will there be a free trial?</p>
              <p className="text-slate-400 text-sm">Yes! Your first 100 invoices are free — no credit card required.</p>
            </div>
            <div className="text-center">
              <p className="text-slate-300 font-medium mb-2">Can I cancel anytime?</p>
              <p className="text-slate-400 text-sm">Absolutely. No contracts, no termination fees, no hoops.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const { ref, isVisible } = useIntersectionObserver();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How does InvoiceNudge know when to send reminders?",
      answer: "When you forward an invoice email, our AI extracts the due date and client email automatically. Reminders are scheduled for Day 0 (due date), Day 3, Day 7, Day 14, and Day 21. You can customize this schedule in your dashboard.",
    },
    {
      question: "Will my clients know I'm using automation?",
      answer: "Nope. Reminders are sent from your email address via our authenticated sending, not from @invoicenudge.com. To your client, it looks exactly like you personally wrote and sent the message.",
    },
    {
      question: "What if the AI writes something I don't like?",
      answer: "For the first 30 days, you approve every reminder before it sends. After 5-10 reminders, the AI learns your preferences and you can switch to auto-send. You're always in control.",
    },
    {
      question: "Can I use this with FreshBooks / QuickBooks / Wave?",
      answer: "Yes! InvoiceNudge works with any invoicing tool. Just forward the invoice email from FreshBooks, QuickBooks, Wave, or wherever you send invoices. No integrations or API keys required.",
    },
    {
      question: "What happens if my client replies to the reminder?",
      answer: "Our AI monitors replies. If the client confirms payment ('Paid yesterday!' / 'Check's in the mail'), we automatically stop the reminder sequence. If they request a payment plan, we suggest terms and draft the response for you.",
    },
    {
      question: "Is my client data secure?",
      answer: "Absolutely. We use 256-bit SSL encryption, store data in SOC 2 compliant infrastructure, and never share your information with third parties. Your client emails are processed only to extract invoice details.",
    },
    {
      question: "How is this different from FreshBooks reminders?",
      answer: "FreshBooks sends generic 'Invoice #123 is overdue' templates. InvoiceNudge uses AI to write personalized reminders in YOUR voice, with an escalating tone across 4 stages. Clients respond way better to personal messages.",
    },
    {
      question: "When does InvoiceNudge launch?",
      answer: "We're targeting Q2 2026 (April-June). Join the waitlist today to get early access, your first 100 invoices free, and a lifetime discount on launch pricing.",
    },
  ];

  return (
    <section id="faq" ref={ref} className="relative py-24 sm:py-32 section-gradient-light overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-50" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-lg text-slate-600">
            Everything you need to know about InvoiceNudge
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl border border-slate-200 overflow-hidden ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
              >
                <span className="font-semibold text-slate-900 pr-4">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${openIndex === index ? "rotate-180" : ""}`} />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5">
                  <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WaitlistSection() {
  const { ref, isVisible } = useIntersectionObserver();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message || "You're on the waitlist!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Connection error. Please try again.");
    }
  };

  return (
    <section id="waitlist" ref={ref} className="relative py-24 sm:py-32 hero-gradient overflow-hidden">
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/20 rounded-full blur-3xl" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-violet-300 mb-8">
            <Star className="w-4 h-4" />
            <span>Be one of the first 500 freelancers</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Stop Chasing Payments.{" "}
            <span className="gradient-text">Start Getting Paid.</span>
          </h2>

          <p className="text-lg text-slate-300 mb-10 max-w-xl mx-auto">
            Join the waitlist for early access, your first 100 invoices free, and a permanent discount when we launch.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@freelancer.com"
                className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                disabled={status === "loading" || status === "success"}
              />
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white rounded-full font-semibold transition-all hover:shadow-xl hover:shadow-violet-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === "loading" ? (
                  "Joining..."
                ) : status === "success" ? (
                  <>
                    <Check className="w-5 h-5" />
                    You're In!
                  </>
                ) : (
                  <>
                    Get Early Access
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>

            {message && (
              <p className={`mt-4 text-sm ${status === "success" ? "text-emerald-400" : "text-red-400"}`}>
                {message}
              </p>
            )}
          </form>

          <p className="text-sm text-slate-400 mt-6">
            No credit card required • Takes 10 seconds • We'll email you when it's ready
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-slate-400 text-sm">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>256-bit SSL</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span>No Credit Card</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const links = {
    product: [
      { label: "Features", href: "#features" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
    ],
    company: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Contact", href: "mailto:hello@invoicenudge.com" },
    ],
    legal: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  };

  const social = [
    { icon: Twitter, href: "https://twitter.com/invoicenudge", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com/company/invoicenudge", label: "LinkedIn" },
    { icon: ExternalLink, href: "https://producthunt.com/products/invoicenudge", label: "Product Hunt" },
  ];

  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                <Mail className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-white">InvoiceNudge</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              AI-powered payment reminders that help freelancers get paid faster — without the awkwardness.
            </p>
            <div className="flex items-center gap-4">
              {social.map(item => (
                <a key={item.label} href={item.href} className="text-slate-400 hover:text-white transition-colors" aria-label={item.label}>
                  <item.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-3">
              {links.product.map(link => (
                <li key={link.label}>
                  <a href={link.href} className="text-slate-400 hover:text-white transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              {links.company.map(link => (
                <li key={link.label}>
                  <a href={link.href} className="text-slate-400 hover:text-white transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              {links.legal.map(link => (
                <li key={link.label}>
                  <a href={link.href} className="text-slate-400 hover:text-white transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
          © 2026 InvoiceNudge. Made with care for freelancers who deserve to get paid on time.
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="scroll-smooth">
      <Navbar />
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
    </main>
  );
}