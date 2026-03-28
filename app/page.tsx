"use client";

import { useState, useEffect, useRef } from "react";
import {
  Mail,
  Sparkles,
  TrendingUp,
  Eye,
  Wallet,
  BarChart3,
  Clock,
  MessageSquare,
  AlertTriangle,
  Check,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Palette,
  Briefcase,
  Menu,
  X,
  Twitter,
  Linkedin,
  Send,
  Shield,
  Zap,
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

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

function Nav() {
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
        isScrolled ? "glass border-b border-slate-200/50 shadow-sm" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="#" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
              <Send className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-lg text-slate-900">InvoiceNudge</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">How It Works</a>
            <a href="#pricing" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Pricing</a>
            <a href="#faq" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">FAQ</a>
          </div>

          <div className="hidden md:block">
            <a
              href="#waitlist"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-500 text-white font-medium text-sm hover:bg-orange-600 transition-all hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25"
            >
              Join Waitlist
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-600"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden glass border-t border-slate-200/50">
          <div className="px-6 py-4 space-y-4">
            <a href="#features" className="block text-slate-600 hover:text-slate-900" onClick={() => setIsMobileMenuOpen(false)}>Features</a>
            <a href="#how-it-works" className="block text-slate-600 hover:text-slate-900" onClick={() => setIsMobileMenuOpen(false)}>How It Works</a>
            <a href="#pricing" className="block text-slate-600 hover:text-slate-900" onClick={() => setIsMobileMenuOpen(false)}>Pricing</a>
            <a href="#faq" className="block text-slate-600 hover:text-slate-900" onClick={() => setIsMobileMenuOpen(false)}>FAQ</a>
            <a
              href="#waitlist"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-500 text-white font-medium text-sm"
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

function WaitlistForm({ variant = "default" }: { variant?: "default" | "dark" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address");
      return;
    }

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
        setMessage(data.message || "Something went wrong");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  };

  const isDark = variant === "dark";

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className={`flex-1 px-4 py-3 rounded-xl border text-base focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all ${
            isDark
              ? "bg-slate-800 border-slate-700 text-white placeholder-slate-400"
              : "bg-white border-slate-200 text-slate-900 placeholder-slate-400"
          }`}
          disabled={status === "loading" || status === "success"}
        />
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className="px-6 py-3 rounded-xl bg-orange-500 text-white font-semibold text-base hover:bg-orange-600 transition-all hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 whitespace-nowrap"
        >
          {status === "loading" ? "Joining..." : status === "success" ? "You're In!" : "Get Early Access"}
        </button>
      </div>
      {message && (
        <p className={`mt-2 text-sm ${status === "error" ? "text-red-500" : "text-green-500"}`}>
          {message}
        </p>
      )}
    </form>
  );
}

function HeroMockup() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-3xl blur-3xl" />
      <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200/80 overflow-hidden">
        <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 text-center text-xs text-slate-500 font-mono">InvoiceNudge Dashboard</div>
        </div>
        <div className="p-6 space-y-4">
          <div className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-500 ${step >= 0 ? "bg-slate-100" : "bg-slate-50 opacity-50"}`}>
            <Mail className={`w-5 h-5 ${step >= 0 ? "text-orange-500" : "text-slate-400"}`} />
            <div className="flex-1">
              <div className="text-sm font-medium text-slate-900">Invoice Forwarded</div>
              <div className="text-xs text-slate-500">Logo Design - $2,500</div>
            </div>
            {step >= 0 && <Check className="w-5 h-5 text-green-500" />}
          </div>

          <div className="flex items-center gap-2 px-3">
            {[0, 7, 14, 21].map((day, i) => (
              <div key={day} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-500 ${
                    step > i ? "bg-green-500 text-white" : step === i ? "bg-orange-500 text-white animate-pulse" : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {step > i ? <Check className="w-4 h-4" /> : `D${day}`}
                </div>
                {i < 3 && <div className={`w-8 h-0.5 ${step > i ? "bg-green-500" : "bg-slate-200"}`} />}
              </div>
            ))}
          </div>

          <div className={`p-3 rounded-lg border transition-all duration-500 ${step === 3 ? "bg-green-50 border-green-200" : "bg-slate-50 border-slate-200"}`}>
            <div className="flex items-center gap-2">
              {step === 3 ? (
                <>
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-green-700">Payment Received!</div>
                    <div className="text-xs text-green-600">Paid 18 days after invoice</div>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-slate-500" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-700">Awaiting Payment</div>
                    <div className="text-xs text-slate-500">Next reminder: Day {step === 0 ? 7 : step === 1 ? 14 : 21}</div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 noise-overlay grain-light overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-orange-50/50 via-white to-white" />
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-slate-200/50 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <h1 className="animate-fade-in-up text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1]">
              Stop Chasing{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
                Late Payments
              </span>
            </h1>
            <p className="animate-fade-in-up delay-100 mt-6 text-lg lg:text-xl text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Forward your invoice. AI sends polite reminders that sound like you — not a robot. You approve every email before it sends.
            </p>
            <div className="animate-fade-in-up delay-200 mt-8" id="waitlist">
              <WaitlistForm />
              <p className="mt-3 text-sm text-slate-500">
                Launching Q2 2026 — Be one of the first to automate collections
              </p>
            </div>
          </div>

          <div className="animate-fade-in-up delay-300">
            <HeroMockup />
          </div>
        </div>
      </div>
    </section>
  );
}

function CredibilityBar() {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section ref={ref} className="py-12 border-y border-slate-200 bg-white">
      <div className={`max-w-7xl mx-auto px-6 lg:px-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="text-center space-y-6">
          <p className="text-slate-600 font-medium">
            Built for freelancers tired of awkward payment follow-ups
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10">
            {["Zelle", "Venmo", "PayPal", "Stripe", "Square", "Wire", "Check"].map((method) => (
              <div key={method} className="flex items-center gap-2 text-slate-400">
                <Wallet className="w-4 h-4" />
                <span className="text-sm font-medium">{method}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto">
            <span className="font-semibold text-slate-700">85% of freelancers</span> experience late payments at least some of the time — Remote.com, 2024
          </p>
        </div>
      </div>
    </section>
  );
}

function Problems() {
  const { ref, isVisible } = useIntersectionObserver();

  const problems = [
    {
      icon: Clock,
      title: "Hours Lost Chasing Payments",
      description: "Freelancers waste 8-12 hours every month drafting follow-up emails, agonizing over wording, and tracking who hasn't paid. That's time you could spend on billable work.",
    },
    {
      icon: MessageSquare,
      title: "The Uncomfortable Conversations",
      description: "Nobody teaches you how to ask for money without sounding desperate or damaging the relationship. You draft, delete, rewrite, and still feel weird hitting send.",
    },
    {
      icon: AlertTriangle,
      title: "Rent Is Due, Client Hasn't Paid",
      description: "40-45% of freelancers have missed personal bill payments because clients paid late. The anxiety of wondering \"will I make rent?\" shouldn't be part of freelancing.",
    },
  ];

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-slate-50 noise-overlay grain-light">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
            The Real Cost of Late Payments
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            It's not just the money. It's the time, the anxiety, and the awkward conversations.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {problems.map((problem, i) => (
            <div
              key={problem.title}
              className={`bg-white rounded-2xl p-6 lg:p-8 border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: isVisible ? `${i * 100}ms` : "0ms" }}
            >
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-5">
                <problem.icon className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">{problem.title}</h3>
              <p className="text-slate-600 leading-relaxed">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Solution() {
  const { ref, isVisible } = useIntersectionObserver();

  const comparisons = [
    {
      before: "Spend 30 minutes drafting each follow-up email, second-guessing every word",
      after: "Forward invoice once, AI handles all follow-ups automatically",
    },
    {
      before: "Feel awkward and pushy asking for your own money",
      after: "Professional reminders that sound like you wrote them, just more consistent",
    },
    {
      before: "Check your bank account at 2am wondering if the $3k invoice will clear before rent",
      after: "Proactive reminders mean clients pay while the work is still fresh",
    },
  ];

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
            From Manual Chasing to Automated Collections
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            See how InvoiceNudge transforms your payment follow-up workflow.
          </p>
        </div>

        <div className="space-y-6">
          {comparisons.map((item, i) => (
            <div
              key={i}
              className={`grid md:grid-cols-2 gap-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: isVisible ? `${i * 100}ms` : "0ms" }}
            >
              <div className="bg-slate-100 rounded-xl p-6 border border-slate-200">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X className="w-4 h-4 text-slate-600" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Before</span>
                    <p className="mt-1 text-slate-700">{item.before}</p>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-green-600 uppercase tracking-wide">After</span>
                    <p className="mt-1 text-green-800">{item.after}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const { ref, isVisible } = useIntersectionObserver();

  const features = [
    {
      icon: Mail,
      title: "Forward to followup@invoicenudge.com",
      description: "No complex setup, no accounting software integration required. Just forward your invoice email — AI extracts the client, amount, and due date automatically.",
      benefit: "Start automating collections in under 60 seconds.",
    },
    {
      icon: Sparkles,
      title: "Reminders That Sound Like You",
      description: "Groq-powered AI analyzes your original invoice email and matches your communication style — casual, formal, or somewhere in between.",
      benefit: "Clients never know AI wrote it.",
    },
    {
      icon: TrendingUp,
      title: "Day 0 → Day 7 → Day 14 → Day 21",
      description: "Starts friendly, escalates professionally. You control the ladder and customize the timeline to fit your business.",
      benefit: "Never sound desperate, but clients know you mean business.",
    },
    {
      icon: Eye,
      title: "Approve Every Email First",
      description: "AI drafts the reminder, you see it before it sends. Click Approve or Edit. After 5 approvals, unlock Autopilot Mode — or stay in Preview forever.",
      benefit: "Never worry about AI embarrassing you.",
    },
    {
      icon: Wallet,
      title: "Any Payment Method Works",
      description: "InvoiceNudge just tracks due dates and sends reminders. Get paid via Zelle, Venmo, PayPal, wire, check, or card — we don't care.",
      benefit: "No expensive payment processing fees.",
    },
    {
      icon: BarChart3,
      title: "See Your Payment Patterns",
      description: "Dashboard shows average days to payment, reminders sent, invoices outstanding. Watch your collection efficiency improve over time.",
      benefit: "Measure something that used to be invisible.",
    },
  ];

  return (
    <section ref={ref} id="features" className="py-20 lg:py-32 bg-slate-900 noise-overlay grain-dark">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            Everything You Need to Get Paid On Time
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Simple tools that handle the awkward work so you don't have to.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className={`group bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-slate-700/50 hover:border-orange-500/50 transition-all duration-500 hover:-translate-y-1 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: isVisible ? `${i * 75}ms` : "0ms" }}
            >
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center mb-5 group-hover:bg-orange-500/30 transition-colors">
                <feature.icon className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-3">{feature.description}</p>
              <p className="text-orange-400 text-sm font-medium flex items-center gap-1">
                <ChevronRight className="w-4 h-4" />
                {feature.benefit}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const { ref, isVisible } = useIntersectionObserver();

  const steps = [
    {
      number: "1",
      title: "Forward Your Invoice",
      description: "Send any invoice email to followup@invoicenudge.com. AI extracts client name, amount, and due date.",
      icon: Mail,
    },
    {
      number: "2",
      title: "Preview AI Reminders",
      description: "See exactly what AI will send on Day 0, Day 7, Day 14, Day 21. Approve, edit, or customize.",
      icon: Eye,
    },
    {
      number: "3",
      title: "Relax and Get Paid",
      description: "Reminders send automatically. If the client replies \"I paid!\", AI detects it and stops the sequence.",
      icon: Check,
    },
  ];

  return (
    <section ref={ref} id="how-it-works" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
            Three Steps to Automated Collections
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Set up in under 60 seconds. No learning curve, no integrations needed.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`relative text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: isVisible ? `${i * 150}ms` : "0ms" }}
            >
              {i < 2 && (
                <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-orange-200 to-orange-100" />
              )}
              <div className="relative w-24 h-24 mx-auto mb-6">
                <div className="absolute inset-0 bg-orange-100 rounded-2xl rotate-3" />
                <div className="relative bg-white rounded-2xl border border-slate-200 w-full h-full flex items-center justify-center shadow-sm">
                  <step.icon className="w-10 h-10 text-orange-500" />
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  {step.number}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-slate-600 max-w-xs mx-auto">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCases() {
  const { ref, isVisible } = useIntersectionObserver();

  const personas = [
    {
      icon: Palette,
      role: "The Solo Designer",
      scenario: "Running a one-person design studio, juggling 5-8 client projects at once. Invoices range from $500 brand refreshes to $5,000 website redesigns. Most clients pay on time, but the 2-3 who don't consume hours of mental energy.",
      usage: "Forward each invoice as it goes out. Preview Mode catches the occasional weird AI phrasing. After two months, trust the AI enough to enable Autopilot. Reclaim 6-8 hours monthly for actual design work.",
      benefit: "Time reclamation",
    },
    {
      icon: Briefcase,
      role: "The Busy Consultant",
      scenario: "Billing $10-15k monthly across 2-3 retainer clients plus ad-hoc projects. Too focused on client work to remember follow-ups. Currently relies on mental notes and occasional calendar reminders (which get snoozed indefinitely).",
      usage: "Set up escalating reminders with professional tone matching their consulting persona. Let the system handle the \"admin\" of getting paid while they focus on delivering value.",
      benefit: "Mental load reduction",
    },
    {
      icon: TrendingUp,
      role: "The Growing Freelancer",
      scenario: "Just crossed $100k annual revenue, hiring first VA next quarter. Currently tracks invoices in a Google Sheet but the \"sent reminder\" column is always weeks out of date. Needs systems that scale.",
      usage: "Migrate from manual tracking to automated reminders. Use the dashboard to actually measure average days-to-payment. Eventually upgrade to Pro when invoice volume exceeds 10/month.",
      benefit: "Building scalable systems",
    },
  ];

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-slate-50 noise-overlay grain-light">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
            Built for Freelancers Like You
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            See how different freelancers use InvoiceNudge to automate their collections.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {personas.map((persona, i) => (
            <div
              key={persona.role}
              className={`bg-white rounded-2xl p-6 lg:p-8 border border-slate-200 shadow-sm transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: isVisible ? `${i * 100}ms` : "0ms" }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                  <persona.icon className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{persona.role}</h3>
              </div>
              <p className="text-slate-600 text-sm mb-4 leading-relaxed">{persona.scenario}</p>
              <div className="bg-slate-50 rounded-xl p-4 mb-4">
                <p className="text-slate-700 text-sm leading-relaxed">
                  <span className="font-semibold">How they'd use InvoiceNudge:</span> {persona.usage}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                  {persona.benefit}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const { ref, isVisible } = useIntersectionObserver();

  const tiers = [
    {
      name: "Starter",
      price: "$19",
      period: "/month",
      annual: "$199/year",
      description: "For solo freelancers with 5-10 invoices/month",
      features: [
        "Up to 10 invoices/month",
        "AI reminders (Day 0/7/14/21)",
        "Preview Mode (approve before send)",
        "Email-forward workflow",
        "Basic payment dashboard",
      ],
      highlighted: false,
    },
    {
      name: "Pro",
      price: "$49",
      period: "/month",
      annual: "$499/year (save $89)",
      description: "For established freelancers scaling their business",
      features: [
        "Up to 50 invoices/month",
        "Everything in Starter, plus:",
        "Autopilot Mode (auto-send)",
        "Client reply detection",
        "Custom reminder schedules",
        "Priority support (4hr response)",
        "Zapier integration",
      ],
      highlighted: true,
    },
    {
      name: "Agency",
      price: "$149",
      period: "/month",
      annual: "$1,499/year (save $289)",
      description: "For agencies and freelancers with teams",
      features: [
        "Unlimited invoices",
        "Everything in Pro, plus:",
        "3 team seats",
        "White-label emails",
        "Multi-client dashboards",
        "Dedicated account manager",
        "API access",
      ],
      highlighted: false,
    },
  ];

  return (
    <section ref={ref} id="pricing" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium mb-4">
            <Zap className="w-4 h-4" />
            Planned Pricing
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
            Simple Pricing, Serious Results
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Choose the plan that fits your invoice volume. Upgrade or downgrade anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {tiers.map((tier, i) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl p-6 lg:p-8 transition-all duration-700 ${
                tier.highlighted
                  ? "bg-slate-900 text-white border-2 border-orange-500 shadow-2xl shadow-orange-500/20 scale-105 lg:scale-110"
                  : "bg-white border border-slate-200"
              } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: isVisible ? `${i * 100}ms` : "0ms" }}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <h3 className={`text-xl font-semibold ${tier.highlighted ? "text-white" : "text-slate-900"}`}>
                  {tier.name}
                </h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className={`text-4xl font-bold ${tier.highlighted ? "text-white" : "text-slate-900"}`}>
                    {tier.price}
                  </span>
                  <span className={tier.highlighted ? "text-slate-300" : "text-slate-500"}>
                    {tier.period}
                  </span>
                </div>
                <p className={`mt-1 text-sm ${tier.highlighted ? "text-slate-400" : "text-slate-500"}`}>
                  {tier.annual}
                </p>
                <p className={`mt-3 text-sm ${tier.highlighted ? "text-slate-300" : "text-slate-600"}`}>
                  {tier.description}
                </p>
              </div>
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${tier.highlighted ? "text-orange-400" : "text-orange-500"}`} />
                    <span className={`text-sm ${tier.highlighted ? "text-slate-300" : "text-slate-600"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href="#waitlist"
                className={`block w-full py-3 rounded-xl font-semibold text-center transition-all hover:scale-105 ${
                  tier.highlighted
                    ? "bg-orange-500 text-white hover:bg-orange-600"
                    : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                }`}
              >
                Join Waitlist
              </a>
            </div>
          ))}
        </div>

        <div className={`mt-16 max-w-2xl mx-auto text-center space-y-4 transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h3 className="text-lg font-semibold text-slate-900">Questions about pricing?</h3>
          <div className="space-y-2 text-sm text-slate-600">
            <p><strong>When does InvoiceNudge launch?</strong> Targeting Q2 2026. Join the waitlist for early access.</p>
            <p><strong>Will there be a free trial?</strong> Yes — 7 days free, no credit card required to start.</p>
            <p><strong>Can I cancel anytime?</strong> Absolutely. No contracts, no cancellation fees.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const { ref, isVisible } = useIntersectionObserver();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How does the AI learn my tone?",
      answer: "When you forward an invoice, our AI analyzes your writing style — sentence length, formality level, emoji usage, greeting style. It uses this to generate reminders that match your voice. Most users say \"it sounds like I wrote it, just more consistent.\"",
    },
    {
      question: "What if the AI writes something I don't like?",
      answer: "That's why Preview Mode exists. You see every reminder before it sends. Click Approve if it's good, or Edit to adjust. After you've approved 5 reminders without changes, you can unlock Autopilot Mode — or stay in Preview forever. You're always in control.",
    },
    {
      question: "Will my clients know I'm using automation?",
      answer: "No. Emails come from your email address (via our sending infrastructure), not from \"noreply@invoicenudge.com.\" There's no \"Sent via InvoiceNudge\" footer unless you choose to add one.",
    },
    {
      question: "What if my emails land in spam?",
      answer: "We use Resend for email delivery — the same infrastructure used by Linear, Vercel, and thousands of tech companies. SPF, DKIM, and DMARC are configured automatically. Deliverability is our #1 priority.",
    },
    {
      question: "Do I need to connect my accounting software?",
      answer: "No. InvoiceNudge works via email forwarding — no OAuth integrations, no syncing with QuickBooks or Xero required. Just forward your invoice and we extract the data.",
    },
    {
      question: "What payment methods does this work with?",
      answer: "All of them. InvoiceNudge tracks due dates and sends reminders — we don't process payments. Your clients can pay via Zelle, Venmo, PayPal, wire transfer, check, credit card, or carrier pigeon. We just make sure they remember.",
    },
    {
      question: "Is my data secure?",
      answer: "Yes. Invoice data is encrypted at rest and in transit. We never share your client information with third parties. We're GDPR-compliant and you can export or delete your data anytime.",
    },
    {
      question: "What's the refund policy?",
      answer: "60-day money-back guarantee, no questions asked. If InvoiceNudge isn't working for you — for any reason — email us and we'll refund your subscription in full.",
    },
  ];

  return (
    <section ref={ref} id="faq" className="py-20 lg:py-32 bg-slate-50 noise-overlay grain-light">
      <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8">
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Everything you need to know about InvoiceNudge.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`bg-white rounded-xl border border-slate-200 overflow-hidden transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: isVisible ? `${i * 50}ms` : "0ms" }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-4 flex items-center justify-between text-left"
              >
                <span className="font-medium text-slate-900">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-500 transition-transform ${openIndex === i ? "rotate-180" : ""}`}
                />
              </button>
              {openIndex === i && (
                <div className="px-6 pb-4">
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

function FinalCTA() {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-slate-900 noise-overlay grain-dark">
      <div className={`relative z-10 max-w-3xl mx-auto px-6 lg:px-8 text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <h2 className="text-3xl lg:text-4xl font-bold text-white">
          Ready to Stop Chasing Payments?
        </h2>
        <p className="mt-4 text-lg text-slate-400 max-w-xl mx-auto">
          Join the waitlist for early access. First 500 members lock in founding pricing when we launch.
        </p>
        <div className="mt-8 flex justify-center">
          <WaitlistForm variant="dark" />
        </div>
        <p className="mt-4 text-sm text-slate-500">
          We're building this for freelancers exactly like you. No spam, just launch updates.
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <a href="#" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                <Send className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-lg text-white">InvoiceNudge</span>
            </a>
            <p className="mt-4 text-slate-400 text-sm max-w-xs">
              AI-powered payment reminders that sound like you, not a robot. Built for freelancers who are tired of chasing late payments.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://producthunt.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                <Zap className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="text-slate-400 hover:text-white transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="text-slate-400 hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#pricing" className="text-slate-400 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#faq" className="text-slate-400 hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/privacy" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="text-slate-400 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="mailto:hello@invoicenudge.com" className="text-slate-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 text-center">
          <p className="text-sm text-slate-500">
            © 2026 InvoiceNudge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function MobileFloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 z-50 md:hidden">
      <a
        href="#waitlist"
        className="flex items-center justify-center gap-2 w-full py-4 bg-orange-500 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/25 animate-pulse-glow"
      >
        Join Waitlist
        <ArrowRight className="w-5 h-5" />
      </a>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <CredibilityBar />
      <Problems />
      <Solution />
      <Features />
      <HowItWorks />
      <UseCases />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
      <MobileFloatingCTA />
    </main>
  );
}