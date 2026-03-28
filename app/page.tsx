"use client";

import { useEffect, useRef, useState } from "react";
import {
  Mail,
  Clock,
  Shield,
  CheckCircle,
  ArrowRight,
  Zap,
  Eye,
  Calendar,
  MessageSquare,
  TrendingUp,
  Users,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Send,
  FileText,
  DollarSign,
  AlertCircle,
  Timer,
  Briefcase,
  Palette,
  Code,
  PenTool,
  X,
  Menu,
} from "lucide-react";

// Custom hook for scroll reveal
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const element = ref.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return ref;
}

// Waitlist Form Component
function WaitlistForm({ variant = "default" }: { variant?: "default" | "compact" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

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
      setMessage("Connection error. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="flex items-center gap-3 text-[var(--accent)] bg-[var(--accent-light)] px-6 py-4 rounded-lg">
        <CheckCircle className="w-5 h-5 flex-shrink-0" />
        <span className="font-medium">{message}</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={variant === "compact" ? "flex gap-3" : "flex flex-col sm:flex-row gap-3"}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@company.com"
        required
        className={variant === "compact" ? "flex-1" : "flex-1 min-w-0"}
        disabled={status === "loading"}
      />
      <button
        type="submit"
        className="btn-primary whitespace-nowrap"
        disabled={status === "loading"}
      >
        {status === "loading" ? (
          "Joining..."
        ) : (
          <>
            Join Waitlist
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
      {status === "error" && (
        <p className="text-red-500 text-sm mt-2 sm:col-span-2">{message}</p>
      )}
    </form>
  );
}

// Browser Mockup Component
function BrowserMockup() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => (s + 1) % 4);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="browser-chrome">
      <div className="browser-chrome-bar">
        <div className="browser-dot browser-dot-red" />
        <div className="browser-dot browser-dot-yellow" />
        <div className="browser-dot browser-dot-green" />
        <div className="browser-url-bar font-mono">invoicenudge.com/dashboard</div>
      </div>
      <div className="p-6 bg-[var(--bg-secondary)] min-h-[320px]">
        {/* Mockup content showing the flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Email forward */}
          <div className={`card transition-all duration-500 ${step === 0 ? "ring-2 ring-[var(--accent)] ring-offset-2" : ""}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="icon-container">
                <Mail className="w-5 h-5" />
              </div>
              <span className="font-medium text-sm">Forwarded Invoice</span>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-[var(--text-secondary)]">
                <span>From:</span>
                <span className="font-mono text-xs">you@studio.com</span>
              </div>
              <div className="flex justify-between text-[var(--text-secondary)]">
                <span>Client:</span>
                <span>Acme Corp</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-secondary)]">Amount:</span>
                <span className="font-medium text-[var(--accent)]">$4,500</span>
              </div>
              <div className="flex justify-between text-[var(--text-secondary)]">
                <span>Due:</span>
                <span>April 15, 2026</span>
              </div>
            </div>
            {step >= 1 && (
              <div className="mt-4 pt-4 border-t border-[var(--border)] flex items-center gap-2 text-sm text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span>Parsed by AI</span>
              </div>
            )}
          </div>

          {/* Right: Reminder schedule */}
          <div className={`card transition-all duration-500 ${step >= 2 ? "ring-2 ring-[var(--accent)] ring-offset-2" : "opacity-50"}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="icon-container">
                <Calendar className="w-5 h-5" />
              </div>
              <span className="font-medium text-sm">Reminder Schedule</span>
            </div>
            <div className="space-y-3">
              <div className={`flex items-center gap-3 p-2 rounded-lg transition-all ${step >= 2 ? "bg-[var(--accent-light)]" : ""}`}>
                <div className={`w-2 h-2 rounded-full ${step >= 2 ? "bg-[var(--accent)]" : "bg-gray-300"}`} />
                <span className="text-sm flex-1">3 days before due</span>
                <span className="text-xs text-[var(--text-muted)]">Gentle</span>
              </div>
              <div className={`flex items-center gap-3 p-2 rounded-lg transition-all ${step >= 3 ? "bg-[var(--accent-light)]" : ""}`}>
                <div className={`w-2 h-2 rounded-full ${step >= 3 ? "bg-[var(--accent)]" : "bg-gray-300"}`} />
                <span className="text-sm flex-1">On due date</span>
                <span className="text-xs text-[var(--text-muted)]">Firm</span>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-gray-300" />
                <span className="text-sm flex-1 text-[var(--text-muted)]">7 days overdue</span>
                <span className="text-xs text-[var(--text-muted)]">Final</span>
              </div>
            </div>
            {step >= 3 && (
              <div className="mt-4 flex items-center gap-2">
                <Eye className="w-4 h-4 text-[var(--accent)]" />
                <span className="text-sm text-[var(--accent)] font-medium">Preview before sending</span>
              </div>
            )}
          </div>
        </div>

        {/* Status bar */}
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-[var(--text-secondary)]">
          <Sparkles className={`w-4 h-4 ${step > 0 ? "text-[var(--accent)]" : ""} transition-colors`} />
          <span>
            {step === 0 && "Forward any invoice email..."}
            {step === 1 && "AI extracts payment details..."}
            {step === 2 && "Smart reminders scheduled..."}
            {step === 3 && "Preview & approve each message"}
          </span>
        </div>
      </div>
    </div>
  );
}

// FAQ Item Component
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq-item">
      <button
        className="faq-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-[var(--text-muted)]" />
        ) : (
          <ChevronDown className="w-5 h-5 text-[var(--text-muted)]" />
        )}
      </button>
      {isOpen && <div className="faq-content">{answer}</div>}
    </div>
  );
}

// Sticky Nav Component
function StickyNav() {
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
        isScrolled
          ? "bg-[rgba(250,250,249,0.9)] backdrop-blur-md border-b border-[var(--border)]"
          : "bg-transparent"
      }`}
    >
      <div className="container-wide px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 font-medium text-lg">
          <div className="w-8 h-8 rounded-lg bg-[var(--accent)] flex items-center justify-center">
            <Send className="w-4 h-4 text-white" />
          </div>
          InvoiceNudge
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            How It Works
          </a>
          <a href="#features" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            Features
          </a>
          <a href="#pricing" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            Pricing
          </a>
          <a href="#faq" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            FAQ
          </a>
          <a href="#waitlist" className="btn-primary text-sm py-2 px-4">
            Join Waitlist
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[var(--bg-card)] border-b border-[var(--border)] px-6 py-4 space-y-4">
          <a href="#how-it-works" className="block text-[var(--text-secondary)]" onClick={() => setIsMobileMenuOpen(false)}>
            How It Works
          </a>
          <a href="#features" className="block text-[var(--text-secondary)]" onClick={() => setIsMobileMenuOpen(false)}>
            Features
          </a>
          <a href="#pricing" className="block text-[var(--text-secondary)]" onClick={() => setIsMobileMenuOpen(false)}>
            Pricing
          </a>
          <a href="#faq" className="block text-[var(--text-secondary)]" onClick={() => setIsMobileMenuOpen(false)}>
            FAQ
          </a>
          <a href="#waitlist" className="btn-primary w-full text-center" onClick={() => setIsMobileMenuOpen(false)}>
            Join Waitlist
          </a>
        </div>
      )}
    </nav>
  );
}

export default function LandingPage() {
  const problemRef = useReveal();
  const solutionRef = useReveal();
  const featuresRef = useReveal();
  const howItWorksRef = useReveal();
  const useCasesRef = useReveal();
  const pricingRef = useReveal();
  const faqRef = useReveal();
  const finalCtaRef = useReveal();

  return (
    <>
      <StickyNav />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern noise-overlay" />
        <div className="relative container-wide px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="hero-animate inline-flex items-center gap-2 bg-[var(--accent-light)] text-[var(--accent)] px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Eye className="w-4 h-4" />
              Preview Mode: See every reminder before it sends
            </div>

            <h1 className="hero-animate-delay-1 text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] mb-6">
              Get paid without the awkward follow-ups
            </h1>

            <p className="hero-animate-delay-2 text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed">
              Forward your invoices, let AI craft professional payment reminders. 
              You preview and approve every message before it sends. No surprises, no cringe.
            </p>

            <div className="hero-animate-delay-3 max-w-md mx-auto mb-6">
              <WaitlistForm />
            </div>

            <p className="hero-animate-delay-4 text-sm text-[var(--text-muted)]">
              Launching Q2 2026 · Be one of the first to get access
            </p>
          </div>

          {/* Browser Mockup */}
          <div className="hero-animate-delay-4 mt-16 lg:mt-24 max-w-4xl mx-auto accent-glow rounded-xl">
            <BrowserMockup />
          </div>
        </div>
      </section>

      {/* Credibility Bar */}
      <section className="py-12 border-y border-[var(--border)] bg-[var(--bg-secondary)]">
        <div className="container-wide px-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 text-center">
            <div>
              <p className="text-sm text-[var(--text-muted)] mb-1">Built for</p>
              <p className="font-medium">Freelancers & Consultants</p>
            </div>
            <div className="hidden md:block w-px h-8 bg-[var(--border)]" />
            <div>
              <p className="text-sm text-[var(--text-muted)] mb-1">Works with</p>
              <div className="flex items-center gap-4">
                <span className="text-[var(--text-secondary)]">Any invoice tool</span>
                <span className="text-[var(--text-muted)]">·</span>
                <span className="text-[var(--text-secondary)]">Gmail</span>
                <span className="text-[var(--text-muted)]">·</span>
                <span className="text-[var(--text-secondary)]">Outlook</span>
              </div>
            </div>
            <div className="hidden md:block w-px h-8 bg-[var(--border)]" />
            <div>
              <p className="text-sm text-[var(--text-muted)] mb-1">The problem</p>
              <p className="font-medium">6+ hours/week chasing payments</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 lg:py-32">
        <div className="container-wide px-6">
          <div ref={problemRef} className="reveal text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-medium mb-4">
              Chasing payments is exhausting
            </h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-lg">
              You did the work. You sent the invoice. Now you wait, wonder, and eventually cave to the awkward follow-up email.
            </p>
          </div>

          <div ref={problemRef} className="reveal-stagger grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="card">
              <div className="icon-container mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-medium text-lg mb-2">Time drain</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Freelancers report spending 6+ hours per week on payment follow-ups. That's a full workday you could bill for instead.
              </p>
            </div>

            <div className="card">
              <div className="icon-container mb-4">
                <AlertCircle className="w-5 h-5" />
              </div>
              <h3 className="font-medium text-lg mb-2">Relationship anxiety</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Every reminder feels like nagging. You worry about damaging client relationships, so you wait too long and eat the delay.
              </p>
            </div>

            <div className="card">
              <div className="icon-container mb-4">
                <DollarSign className="w-5 h-5" />
              </div>
              <h3 className="font-medium text-lg mb-2">Cash flow chaos</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                68% of freelancers report late payments as their top cash flow issue. One late invoice can derail your entire month.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24 lg:py-32 bg-[var(--bg-secondary)]">
        <div className="container-wide px-6">
          <div ref={solutionRef} className="reveal text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-medium mb-4">
              What if reminders just happened?
            </h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-lg">
              InvoiceNudge handles the follow-up so you don't have to. You stay in control — nothing sends without your approval.
            </p>
          </div>

          <div ref={solutionRef} className="reveal max-w-3xl mx-auto space-y-6">
            <div className="card flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-shrink-0">
                <div className="text-sm text-[var(--text-muted)] mb-1">Before</div>
                <div className="text-[var(--text-secondary)]">
                  Hours spent writing reminder emails, second-guessing your tone, feeling guilty
                </div>
              </div>
              <div className="hidden md:block">
                <ArrowRight className="w-6 h-6 text-[var(--accent)]" />
              </div>
              <div className="flex-shrink-0">
                <div className="text-sm text-[var(--accent)] mb-1">After</div>
                <div className="font-medium">
                  AI drafts professional reminders; you just approve
                </div>
              </div>
            </div>

            <div className="card flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-shrink-0">
                <div className="text-sm text-[var(--text-muted)] mb-1">Before</div>
                <div className="text-[var(--text-secondary)]">
                  Copy-pasting invoice details into spreadsheets to track who owes what
                </div>
              </div>
              <div className="hidden md:block">
                <ArrowRight className="w-6 h-6 text-[var(--accent)]" />
              </div>
              <div className="flex-shrink-0">
                <div className="text-sm text-[var(--accent)] mb-1">After</div>
                <div className="font-medium">
                  Forward the invoice; AI extracts everything automatically
                </div>
              </div>
            </div>

            <div className="card flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-shrink-0">
                <div className="text-sm text-[var(--text-muted)] mb-1">Before</div>
                <div className="text-[var(--text-secondary)]">
                  Forgetting to follow up until the invoice is 30 days overdue
                </div>
              </div>
              <div className="hidden md:block">
                <ArrowRight className="w-6 h-6 text-[var(--accent)]" />
              </div>
              <div className="flex-shrink-0">
                <div className="text-sm text-[var(--accent)] mb-1">After</div>
                <div className="font-medium">
                  Smart scheduling sends reminders at the right time, every time
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 lg:py-32">
        <div className="container-wide px-6">
          <div ref={featuresRef} className="reveal text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-medium mb-4">
              Built for how you actually work
            </h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-lg">
              No new tools to learn. No complicated setup. Just forward and go.
            </p>
          </div>

          <div ref={featuresRef} className="reveal-stagger grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="card">
              <div className="icon-container mb-4">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-medium text-lg mb-2">Forward to activate</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Forward any invoice email. AI extracts client name, amount, due date, and details — no manual entry.
              </p>
            </div>

            <div className="card">
              <div className="icon-container mb-4">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="font-medium text-lg mb-2">Preview mode</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                See exactly what your client will receive. Edit, approve, or skip — nothing sends without your OK.
              </p>
            </div>

            <div className="card">
              <div className="icon-container mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-medium text-lg mb-2">Smart escalation</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Reminders get progressively firmer. Gentle at first, then professional urgency if needed.
              </p>
            </div>

            <div className="card">
              <div className="icon-container mb-4">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="font-medium text-lg mb-2">Your voice, AI-written</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Train the AI on your communication style. Reminders sound like you, not a robot.
              </p>
            </div>

            <div className="card">
              <div className="icon-container mb-4">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="font-medium text-lg mb-2">Smart scheduling</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Reminders timed around due dates. Before, on, and after — the sequence that works.
              </p>
            </div>

            <div className="card">
              <div className="icon-container mb-4">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-medium text-lg mb-2">Relationship-safe</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Professional tone that preserves relationships. No aggressive language, ever.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 lg:py-32 bg-[var(--bg-secondary)]">
        <div className="container-wide px-6">
          <div ref={howItWorksRef} className="reveal text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-medium mb-4">
              Three steps. Under 60 seconds.
            </h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-lg">
              Getting started is as simple as forwarding an email.
            </p>
          </div>

          <div ref={howItWorksRef} className="reveal-stagger max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-[var(--accent)] text-white flex items-center justify-center font-medium text-lg mx-auto mb-6">
                  1
                </div>
                <h3 className="font-medium text-lg mb-2">Forward your invoice</h3>
                <p className="text-[var(--text-secondary)]">
                  Send any invoice email to your unique InvoiceNudge address. Takes 5 seconds.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-[var(--accent)] text-white flex items-center justify-center font-medium text-lg mx-auto mb-6">
                  2
                </div>
                <h3 className="font-medium text-lg mb-2">AI parses details</h3>
                <p className="text-[var(--text-secondary)]">
                  Client name, amount, due date extracted automatically. Review and confirm.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-[var(--accent)] text-white flex items-center justify-center font-medium text-lg mx-auto mb-6">
                  3
                </div>
                <h3 className="font-medium text-lg mb-2">Preview & approve</h3>
                <p className="text-[var(--text-secondary)]">
                  See every reminder before it sends. Edit, approve, or skip — you're in control.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 lg:py-32">
        <div className="container-wide px-6">
          <div ref={useCasesRef} className="reveal text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-medium mb-4">
              Built for independents like you
            </h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-lg">
              See how different freelancers would use InvoiceNudge.
            </p>
          </div>

          <div ref={useCasesRef} className="reveal-stagger grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <div className="icon-container">
                  <Palette className="w-5 h-5" />
                </div>
                <span className="font-medium">The Solo Designer</span>
              </div>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                Juggles 5-10 clients at once. Each invoice has different net terms. Previously tracked everything in a messy spreadsheet.
              </p>
              <p className="text-sm">
                <span className="text-[var(--accent)] font-medium">With InvoiceNudge:</span> Forward invoices as they go out. The system handles timing based on each client's terms.
              </p>
            </div>

            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <div className="icon-container">
                  <Briefcase className="w-5 h-5" />
                </div>
                <span className="font-medium">The Busy Consultant</span>
              </div>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                Works with enterprise clients who pay slow but pay well. Hates sending "just checking in" emails to Fortune 500 contacts.
              </p>
              <p className="text-sm">
                <span className="text-[var(--accent)] font-medium">With InvoiceNudge:</span> Professional, polished reminders that match the enterprise tone. No awkwardness.
              </p>
            </div>

            <div className="card">
              <div className="flex items-center gap-3 mb-4">
                <div className="icon-container">
                  <Code className="w-5 h-5" />
                </div>
                <span className="font-medium">The Dev Shop Owner</span>
              </div>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                Runs a small dev agency. Invoices go out from different project managers. Hard to track who followed up on what.
              </p>
              <p className="text-sm">
                <span className="text-[var(--accent)] font-medium">With InvoiceNudge:</span> Centralized view of all outstanding invoices. One dashboard, full visibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 lg:py-32 bg-[var(--bg-secondary)]">
        <div className="container-wide px-6">
          <div ref={pricingRef} className="reveal text-center mb-16">
            <p className="text-sm text-[var(--accent)] font-medium mb-2">Planned Pricing</p>
            <h2 className="text-3xl md:text-4xl font-medium mb-4">
              Simple pricing. No surprises.
            </h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-lg">
              Start free. Upgrade when you're ready. Cancel anytime.
            </p>
          </div>

          <div ref={pricingRef} className="reveal-stagger grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Free Tier */}
            <div className="card">
              <h3 className="font-medium text-lg mb-2">Starter</h3>
              <div className="mb-4">
                <span className="text-4xl font-medium">$0</span>
                <span className="text-[var(--text-muted)]">/month</span>
              </div>
              <p className="text-[var(--text-secondary)] mb-6">
                Perfect for getting started.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                  <span className="text-sm">3 active invoices</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Basic reminder sequence</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Email support</span>
                </li>
              </ul>
              <a href="#waitlist" className="btn-secondary w-full">
                Join Waitlist
              </a>
            </div>

            {/* Pro Tier */}
            <div className="card pricing-recommended">
              <h3 className="font-medium text-lg mb-2">Pro</h3>
              <div className="mb-4">
                <span className="text-4xl font-medium">$19</span>
                <span className="text-[var(--text-muted)]">/month</span>
              </div>
              <p className="text-[var(--text-secondary)] mb-6">
                For freelancers who mean business.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Unlimited invoices</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Custom reminder sequences</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Voice training</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Analytics dashboard</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Priority support</span>
                </li>
              </ul>
              <a href="#waitlist" className="btn-primary w-full">
                Join Waitlist
              </a>
            </div>

            {/* Agency Tier */}
            <div className="card">
              <h3 className="font-medium text-lg mb-2">Agency</h3>
              <div className="mb-4">
                <span className="text-4xl font-medium">$49</span>
                <span className="text-[var(--text-muted)]">/month</span>
              </div>
              <p className="text-[var(--text-secondary)] mb-6">
                For teams and small agencies.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Everything in Pro</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Up to 5 team members</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Team dashboard</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                  <span className="text-sm">White-label options</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Dedicated support</span>
                </li>
              </ul>
              <a href="#waitlist" className="btn-secondary w-full">
                Join Waitlist
              </a>
            </div>
          </div>

          {/* Pricing FAQ */}
          <div className="mt-16 max-w-2xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <h4 className="font-medium mb-2">When will this launch?</h4>
                <p className="text-sm text-[var(--text-secondary)]">We're targeting Q2 2026. Join the waitlist to be first.</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Will there be a free trial?</h4>
                <p className="text-sm text-[var(--text-secondary)]">Yes. The Starter plan is free forever. Upgrade when you need more.</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Can I cancel anytime?</h4>
                <p className="text-sm text-[var(--text-secondary)]">Absolutely. No contracts, no cancellation fees.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 lg:py-32">
        <div className="container-wide px-6">
          <div ref={faqRef} className="reveal text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-medium mb-4">
              Questions? Answers.
            </h2>
          </div>

          <div ref={faqRef} className="reveal max-w-2xl mx-auto">
            <FaqItem
              question="When does InvoiceNudge launch?"
              answer="We're building toward a Q2 2026 beta launch. Waitlist members get early access and special launch pricing. We'll email you when we're ready."
            />
            <FaqItem
              question="How does the preview mode work?"
              answer="Before any reminder sends, you see exactly what your client will receive. You can edit the message, approve it as-is, or skip that reminder entirely. Nothing sends without your explicit approval."
            />
            <FaqItem
              question="What invoicing tools does it work with?"
              answer="InvoiceNudge works with any invoicing tool — FreshBooks, QuickBooks, Wave, HoneyBook, or even manual invoices. Just forward the email, and our AI extracts the details."
            />
            <FaqItem
              question="Will my clients know I'm using automation?"
              answer="No. Reminders come from your email address and sound like you. We train the AI on your communication style. Clients just see a professional, well-timed follow-up."
            />
            <FaqItem
              question="What if a client already paid?"
              answer="Mark invoices as paid with one click, and all scheduled reminders are canceled instantly. You can also pause reminders if a client requests an extension."
            />
            <FaqItem
              question="Is my data secure?"
              answer="Yes. We use bank-level encryption for all data. Invoice details are processed securely and never shared with third parties. You can delete your data at any time."
            />
            <FaqItem
              question="What if I need to customize the reminder tone?"
              answer="You control the tone. Choose from gentle, professional, or firm templates — or train the AI on your own writing samples. Customize per client if needed."
            />
            <FaqItem
              question="Can I use this for my agency or team?"
              answer="Yes! The Agency plan supports up to 5 team members with a centralized dashboard. Everyone sees outstanding invoices, and you control who can send reminders."
            />
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="waitlist" className="py-24 lg:py-32 bg-[var(--bg-secondary)]">
        <div className="container-wide px-6">
          <div ref={finalCtaRef} className="reveal max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-medium mb-4">
              Stop chasing. Start getting paid.
            </h2>
            <p className="text-lg text-[var(--text-secondary)] mb-8 leading-relaxed">
              Join the waitlist for early access and launch-day pricing. 
              We're building InvoiceNudge for freelancers exactly like you.
            </p>

            <div className="max-w-md mx-auto mb-6">
              <WaitlistForm />
            </div>

            <p className="text-sm text-[var(--text-muted)]">
              No spam. Just a heads-up when we're ready to launch.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-[var(--border)]">
        <div className="container-wide px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[var(--accent)] flex items-center justify-center">
                <Send className="w-4 h-4 text-white" />
              </div>
              <span className="font-medium">InvoiceNudge</span>
            </div>

            <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--text-secondary)]">
              <a href="#features" className="hover:text-[var(--text-primary)] transition-colors">Features</a>
              <a href="#pricing" className="hover:text-[var(--text-primary)] transition-colors">Pricing</a>
              <a href="#faq" className="hover:text-[var(--text-primary)] transition-colors">FAQ</a>
              <a href="/privacy" className="hover:text-[var(--text-primary)] transition-colors">Privacy</a>
              <a href="/terms" className="hover:text-[var(--text-primary)] transition-colors">Terms</a>
            </nav>

            <div className="text-sm text-[var(--text-muted)]">
              © 2026 InvoiceNudge. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky CTA */}
      <div className="mobile-sticky-cta md:hidden">
        <a href="#waitlist" className="btn-primary w-full">
          Join the Waitlist
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </>
  );
}