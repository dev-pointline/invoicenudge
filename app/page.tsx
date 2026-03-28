"use client";

import { useState, useEffect, useRef } from "react";
import {
  Mail,
  ArrowRight,
  Clock,
  DollarSign,
  MessageSquare,
  Zap,
  Eye,
  TrendingUp,
  Users,
  Check,
  ChevronDown,
  Send,
  Sparkles,
  Shield,
  Globe,
  Pause,
  Reply,
  Briefcase,
  Palette,
  Building2,
  Menu,
  X,
} from "lucide-react";

function useInView(ref: React.RefObject<HTMLElement | null>, options = {}) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect();
      }
    }, { threshold: 0.1, ...options });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options]);

  return isInView;
}

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
            <Mail className="w-4 h-4 text-white" />
          </div>
          <span className="font-medium text-slate-900">InvoiceNudge</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Features</a>
          <a href="#pricing" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Pricing</a>
          <a href="#faq" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">FAQ</a>
          <a
            href="#waitlist"
            className="text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg transition-colors"
          >
            Join Waitlist
          </a>
        </div>
        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 space-y-4">
          <a href="#features" className="block text-sm text-slate-600" onClick={() => setMobileOpen(false)}>Features</a>
          <a href="#pricing" className="block text-sm text-slate-600" onClick={() => setMobileOpen(false)}>Pricing</a>
          <a href="#faq" className="block text-sm text-slate-600" onClick={() => setMobileOpen(false)}>FAQ</a>
          <a
            href="#waitlist"
            className="block text-sm font-medium text-white bg-orange-500 px-4 py-2 rounded-lg text-center"
            onClick={() => setMobileOpen(false)}
          >
            Join Waitlist
          </a>
        </div>
      )}
    </nav>
  );
}

function HeroSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "hero" }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section ref={ref} className="pt-32 pb-20 lg:pt-40 lg:pb-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-orange-50/50 to-transparent pointer-events-none" />
      <div className="max-w-6xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className={isInView ? "animate-fade-in-up" : "opacity-0"}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-slate-900 leading-tight tracking-tight">
              Get paid without the awkward follow-ups
            </h1>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-lg">
              Forward your invoices to InvoiceNudge. Our AI writes personalized payment reminders that match your tone — so you stay professional while your cash flow stays healthy.
            </p>
            <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md" id="waitlist">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="flex-1 px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                required
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-all hover:-translate-y-0.5 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {status === "loading" ? "Joining..." : "Join Waitlist"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
            {status === "success" && (
              <p className="mt-3 text-sm text-emerald-600 flex items-center gap-2">
                <Check className="w-4 h-4" /> You&apos;re on the list! We&apos;ll notify you at launch.
              </p>
            )}
            {status === "error" && (
              <p className="mt-3 text-sm text-red-600">Something went wrong. Please try again.</p>
            )}
            <p className="mt-4 text-sm text-slate-500">
              Launching April 2026 — be one of the first to automate your payment follow-ups
            </p>
          </div>
          <div className={`relative ${isInView ? "animate-fade-in-up delay-200" : "opacity-0"}`}>
            <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-slate-100 p-1">
              <div className="bg-slate-50 rounded-t-xl px-4 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-white rounded px-3 py-1 text-xs text-slate-400 font-mono">
                    nudge@invoicenudge.com
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-start gap-3 animate-fade-in-up delay-300">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-slate-500" />
                  </div>
                  <div className="flex-1 bg-slate-50 rounded-lg p-3">
                    <p className="text-xs text-slate-500 mb-1">Forwarded Invoice</p>
                    <p className="text-sm text-slate-700">Invoice #1234 — $2,500 due</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="animate-pulse-soft">
                    <Sparkles className="w-5 h-5 text-orange-500" />
                  </div>
                </div>
                <div className="flex items-start gap-3 animate-fade-in-up delay-400">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <Send className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="flex-1 bg-orange-50 rounded-lg p-3 border border-orange-100">
                    <p className="text-xs text-orange-600 mb-1">AI Reminder Sent</p>
                    <p className="text-sm text-slate-700">&quot;Hi Sarah, hope the project is going well! Just a friendly heads up that invoice #1234 is due...&quot;</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 animate-float">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="flex-1 bg-emerald-50 rounded-lg p-3 border border-emerald-100">
                    <p className="text-xs text-emerald-600 mb-1">Payment Received</p>
                    <p className="text-sm text-slate-700">$2,500 — Marked as paid</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CredibilityBar() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);

  return (
    <section ref={ref} className="py-12 border-y border-slate-100 bg-white/50">
      <div className={`max-w-6xl mx-auto px-6 ${isInView ? "animate-fade-in-up" : "opacity-0"}`}>
        <p className="text-center text-sm text-slate-600 mb-6">
          Built for freelancers who lose sleep over late-paying clients
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
          <span className="text-sm font-medium text-slate-500">Works with:</span>
          <span className="text-slate-400 font-medium">Gmail</span>
          <span className="text-slate-400 font-medium">Outlook</span>
          <span className="text-slate-400 font-medium">QuickBooks</span>
          <span className="text-slate-400 font-medium">FreshBooks</span>
          <span className="text-slate-400 font-medium">Xero</span>
          <span className="text-slate-400 font-medium">Stripe</span>
        </div>
        <p className="text-center text-xs text-slate-400 mt-6">
          Late payments cost freelancers 8-12 hours/month in follow-up time
        </p>
      </div>
    </section>
  );
}

function ProblemSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);

  const problems = [
    {
      icon: MessageSquare,
      title: "The Awkward Chase",
      description: "You delivered great work, but now you're stuck sending uncomfortable \"just following up\" emails. 85% of freelancers report late payments damage their client relationships.",
    },
    {
      icon: DollarSign,
      title: "The Cash Flow Crunch",
      description: "Every day an invoice sits unpaid is a day you can't pay your own bills. The average freelancer waits 27+ days past due date for payment.",
    },
    {
      icon: Clock,
      title: "The Time Drain",
      description: "You're spending 8-12 hours every month on payment follow-ups instead of billable work. That's $500-2,000/month in lost productivity.",
    },
  ];

  return (
    <section ref={ref} className="py-20 lg:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 ${isInView ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="text-3xl md:text-4xl font-medium text-slate-900">
            Sound familiar?
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Late payments aren&apos;t just annoying — they&apos;re costing you time, money, and peace of mind.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, i) => (
            <div
              key={problem.title}
              className={`bg-white rounded-xl p-8 border border-slate-100 hover:border-slate-200 transition-all hover:-translate-y-1 ${
                isInView ? `animate-fade-in-up delay-${(i + 1) * 100}` : "opacity-0"
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mb-6">
                <problem.icon className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-3">{problem.title}</h3>
              <p className="text-slate-600 leading-relaxed">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SolutionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);

  const solutions = [
    {
      before: "You check your inbox daily, mentally tracking who owes what",
      after: "InvoiceNudge tracks every invoice automatically",
    },
    {
      before: "You write awkward \"friendly reminder\" emails",
      after: "AI writes reminders that sound exactly like you",
    },
    {
      before: "You forget to follow up until it's too late",
      after: "Escalating reminders sent on autopilot (Day 0, 7, 14, 21)",
    },
  ];

  return (
    <section ref={ref} className="py-20 lg:py-28 px-6 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <div className={`text-center mb-16 ${isInView ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="text-3xl md:text-4xl font-medium text-slate-900">
            There&apos;s a better way
          </h2>
        </div>
        <div className="space-y-6">
          {solutions.map((solution, i) => (
            <div
              key={i}
              className={`bg-white rounded-xl p-6 border border-slate-100 ${
                isInView ? `animate-fade-in-up delay-${(i + 1) * 100}` : "opacity-0"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1">
                  <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Before</span>
                  <p className="text-slate-600 mt-1">{solution.before}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-orange-500 flex-shrink-0 hidden md:block" />
                <div className="flex-1">
                  <span className="text-xs font-medium text-orange-500 uppercase tracking-wider">After</span>
                  <p className="text-slate-900 font-medium mt-1">{solution.after}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);

  const features = [
    {
      icon: Mail,
      title: "Email-Forward Workflow",
      description: "No integrations to set up. Just forward your invoice email and we handle the rest.",
    },
    {
      icon: Sparkles,
      title: "AI Tone Matching",
      description: "Train the AI on your writing style. Your clients will think every reminder came from you.",
    },
    {
      icon: Eye,
      title: "Preview Mode",
      description: "Review every reminder before it sends. Stay in control while we do the heavy lifting.",
    },
    {
      icon: TrendingUp,
      title: "Smart Escalation",
      description: "Reminders get progressively firmer: friendly, firm, urgent, final notice — all customizable.",
    },
    {
      icon: Check,
      title: "Payment Tracking",
      description: "Mark invoices as paid with one click. Never accidentally double-remind.",
    },
    {
      icon: Users,
      title: "Client Insights",
      description: "See which clients consistently pay late so you can adjust your terms.",
    },
  ];

  return (
    <section ref={ref} id="features" className="py-20 lg:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 ${isInView ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="text-3xl md:text-4xl font-medium text-slate-900">
            Everything you need to get paid on time
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Powerful features, simple workflow. Forward an invoice, and we handle the rest.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className={`bg-white rounded-xl p-6 border border-slate-100 hover:border-orange-200 transition-all group ${
                isInView ? `animate-fade-in-up delay-${Math.min((i + 1) * 100, 600)}` : "opacity-0"
              }`}
            >
              <div className="w-10 h-10 rounded-lg bg-slate-50 group-hover:bg-orange-50 flex items-center justify-center mb-4 transition-colors">
                <feature.icon className="w-5 h-5 text-slate-500 group-hover:text-orange-500 transition-colors" />
              </div>
              <h3 className="text-base font-medium text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);

  const steps = [
    {
      number: "01",
      title: "Forward",
      description: "Forward your invoice email to nudge@invoicenudge.com",
      icon: Mail,
    },
    {
      number: "02",
      title: "Customize",
      description: "Set your reminder schedule and tone preferences (or use our proven defaults)",
      icon: Zap,
    },
    {
      number: "03",
      title: "Relax",
      description: "We send personalized reminders until you mark the invoice as paid",
      icon: Check,
    },
  ];

  return (
    <section ref={ref} className="py-20 lg:py-28 px-6 bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 ${isInView ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="text-3xl md:text-4xl font-medium">
            How it works
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            Get started in under 60 seconds. No complex setup required.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`text-center ${isInView ? `animate-fade-in-up delay-${(i + 1) * 100}` : "opacity-0"}`}
            >
              <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center mx-auto mb-6">
                <step.icon className="w-8 h-8 text-orange-500" />
              </div>
              <span className="text-xs font-mono text-orange-500">{step.number}</span>
              <h3 className="text-xl font-medium mt-2 mb-3">{step.title}</h3>
              <p className="text-slate-400 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCasesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);

  const useCases = [
    {
      icon: Palette,
      persona: "The Solo Designer",
      description: "Manages 10-15 client projects per month. Uses InvoiceNudge to maintain professional relationships while ensuring timely payment.",
    },
    {
      icon: Briefcase,
      persona: "The Busy Consultant",
      description: "High-value contracts mean high-stakes follow-ups. Relies on AI tone matching to keep communications polished.",
    },
    {
      icon: Building2,
      persona: "The Growing Agency",
      description: "50+ invoices per month across multiple team members. Needs centralized tracking and consistent follow-up.",
    },
  ];

  return (
    <section ref={ref} className="py-20 lg:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 ${isInView ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="text-3xl md:text-4xl font-medium text-slate-900">
            Built for the way you work
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {useCases.map((useCase, i) => (
            <div
              key={useCase.persona}
              className={`bg-white rounded-xl p-8 border border-slate-100 ${
                isInView ? `animate-fade-in-up delay-${(i + 1) * 100}` : "opacity-0"
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mb-6">
                <useCase.icon className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-3">{useCase.persona}</h3>
              <p className="text-slate-600 leading-relaxed">{useCase.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);

  const tiers = [
    {
      name: "Starter",
      price: "$19",
      period: "/month",
      description: "Perfect for solo freelancers",
      features: [
        "Up to 10 invoices/month",
        "Email-forward workflow",
        "AI-written reminders",
        "Basic escalation templates",
      ],
      cta: "Join Waitlist",
      popular: false,
    },
    {
      name: "Pro",
      price: "$49",
      period: "/month",
      description: "For growing freelance businesses",
      features: [
        "Up to 50 invoices/month",
        "Custom tone training",
        "Preview before send",
        "Priority support",
        "Everything in Starter",
      ],
      cta: "Join Waitlist",
      popular: true,
    },
    {
      name: "Agency",
      price: "$149",
      period: "/month",
      description: "For teams and agencies",
      features: [
        "Unlimited invoices",
        "Team accounts",
        "Client insights dashboard",
        "White-label reminders",
        "Everything in Pro",
      ],
      cta: "Join Waitlist",
      popular: false,
    },
  ];

  return (
    <section ref={ref} id="pricing" className="py-20 lg:py-28 px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 ${isInView ? "animate-fade-in-up" : "opacity-0"}`}>
          <span className="text-xs font-medium text-orange-500 uppercase tracking-wider">Launch Pricing</span>
          <h2 className="text-3xl md:text-4xl font-medium text-slate-900 mt-2">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            14-day free trial on all plans. No credit card required.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tiers.map((tier, i) => (
            <div
              key={tier.name}
              className={`bg-white rounded-xl p-8 border ${
                tier.popular ? "border-orange-200 ring-1 ring-orange-100" : "border-slate-100"
              } relative ${isInView ? `animate-fade-in-up delay-${(i + 1) * 100}` : "opacity-0"}`}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              <h3 className="text-lg font-medium text-slate-900">{tier.name}</h3>
              <p className="text-sm text-slate-500 mt-1">{tier.description}</p>
              <div className="mt-6 mb-6">
                <span className="text-4xl font-medium text-slate-900">{tier.price}</span>
                <span className="text-slate-500">{tier.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-slate-600">
                    <Check className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href="#waitlist"
                className={`block text-center py-3 rounded-lg font-medium transition-all ${
                  tier.popular
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-900"
                }`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "When does InvoiceNudge launch?",
      answer: "We're targeting April 2026. Join the waitlist to be first in line and get notified the moment we launch.",
    },
    {
      question: "How is this different from invoice software reminders?",
      answer: "Most invoice tools send generic \"Payment due\" notifications. InvoiceNudge writes personalized, escalating reminders that match your voice and build on previous context.",
    },
    {
      question: "Will my clients know I'm using automation?",
      answer: "No. Every reminder is written to sound like you. Your clients will think you wrote it personally.",
    },
    {
      question: "What if I want to edit a reminder before it sends?",
      answer: "Preview Mode lets you review and edit every reminder before it goes out. You stay in control of every communication.",
    },
    {
      question: "Is my data secure?",
      answer: "We never access your bank accounts or store payment information. We only process invoice details and client contact info, encrypted at rest and in transit.",
    },
    {
      question: "Can I stop reminders for a specific invoice?",
      answer: "Yes, mark any invoice as \"paused\" or \"paid\" with one click from your dashboard or via email reply.",
    },
    {
      question: "What if my client responds to a reminder?",
      answer: "Replies go directly to your email inbox — we're not a middleman for conversations, just for reminders.",
    },
    {
      question: "Do you support international clients?",
      answer: "Yes, InvoiceNudge works with any currency and timezone. We'll send reminders at appropriate times for your clients.",
    },
  ];

  return (
    <section ref={ref} id="faq" className="py-20 lg:py-28 px-6">
      <div className="max-w-3xl mx-auto">
        <div className={`text-center mb-16 ${isInView ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="text-3xl md:text-4xl font-medium text-slate-900">
            Frequently asked questions
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`bg-white rounded-xl border border-slate-100 overflow-hidden ${
                isInView ? `animate-fade-in-up delay-${Math.min((i + 1) * 50, 400)}` : "opacity-0"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-medium text-slate-900">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 transition-transform ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === i && (
                <div className="px-6 pb-6">
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

function FinalCTASection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "footer_cta" }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section ref={ref} className="py-20 lg:py-28 px-6 bg-slate-900 text-white">
      <div className={`max-w-2xl mx-auto text-center ${isInView ? "animate-fade-in-up" : "opacity-0"}`}>
        <h2 className="text-3xl md:text-4xl font-medium">
          Stop losing money to late payments
        </h2>
        <p className="mt-4 text-lg text-slate-400">
          We&apos;re building InvoiceNudge for freelancers who deserve to get paid on time. Join the waitlist and we&apos;ll notify you the moment we launch.
        </p>
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="flex-1 px-4 py-3 rounded-lg border border-slate-700 bg-slate-800 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
            required
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-all hover:-translate-y-0.5 disabled:opacity-50"
          >
            {status === "loading" ? "Joining..." : "Get Early Access"}
          </button>
        </form>
        {status === "success" && (
          <p className="mt-4 text-sm text-emerald-400 flex items-center justify-center gap-2">
            <Check className="w-4 h-4" /> You&apos;re on the list!
          </p>
        )}
        {status === "error" && (
          <p className="mt-4 text-sm text-red-400">Something went wrong. Please try again.</p>
        )}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-slate-100">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
              <Mail className="w-4 h-4 text-white" />
            </div>
            <span className="font-medium text-slate-900">InvoiceNudge</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-6">
            <a href="#features" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Features</a>
            <a href="#pricing" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Pricing</a>
            <a href="#faq" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">FAQ</a>
            <a href="/privacy" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Privacy</a>
            <a href="/terms" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Terms</a>
          </nav>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            AI-powered payment reminders for freelancers
          </p>
          <p className="text-sm text-slate-400">
            © 2026 InvoiceNudge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function MobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-sm border-t border-slate-100 md:hidden z-40">
      <a
        href="#waitlist"
        className="block w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg text-center transition-colors"
      >
        Join the Waitlist
      </a>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <NavBar />
      <main>
        <HeroSection />
        <CredibilityBar />
        <ProblemSection />
        <SolutionSection />
        <FeaturesSection />
        <HowItWorksSection />
        <UseCasesSection />
        <PricingSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
}