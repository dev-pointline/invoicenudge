"use client";

import { useEffect, useRef, useState } from "react";
import {
  Mail,
  Clock,
  Eye,
  MessageSquare,
  CreditCard,
  BarChart3,
  Forward,
  Sparkles,
  Send,
  Palette,
  Briefcase,
  Users,
  Check,
  ChevronDown,
  ArrowRight,
  Twitter,
  ExternalLink,
  Zap,
  Shield,
  Globe,
} from "lucide-react";

// Reveal animation hook
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
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return ref;
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

// Waitlist form component
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
      if (data.success) {
        setStatus("success");
        setMessage("You're on the list! We'll be in touch soon.");
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

  if (status === "success") {
    return (
      <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-3 rounded-lg">
        <Check className="w-5 h-5" />
        <span className="text-sm font-medium">{message}</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={variant === "compact" ? "flex gap-2" : "flex flex-col sm:flex-row gap-3"}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="input-field flex-1"
        required
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary whitespace-nowrap flex items-center justify-center gap-2"
      >
        {status === "loading" ? (
          "Joining..."
        ) : (
          <>
            Get early access
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
      {status === "error" && <p className="text-red-500 text-sm mt-2">{message}</p>}
    </form>
  );
}

// Browser mockup component
function BrowserMockup() {
  return (
    <div className="browser-chrome">
      <div className="browser-bar">
        <div className="browser-dot browser-dot-red" />
        <div className="browser-dot browser-dot-yellow" />
        <div className="browser-dot browser-dot-green" />
        <div className="browser-url">app.invoicenudge.com/dashboard</div>
      </div>
      <div className="p-6 bg-stone-50">
        {/* Mini dashboard mockup */}
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-medium text-sm text-stone-800">InvoiceNudge</span>
            </div>
            <div className="text-xs text-stone-500">3 invoices outstanding</div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white rounded-lg p-3 border border-stone-200">
              <div className="text-xs text-stone-500">Outstanding</div>
              <div className="text-lg font-medium text-stone-800">$12,450</div>
            </div>
            <div className="bg-white rounded-lg p-3 border border-stone-200">
              <div className="text-xs text-stone-500">Overdue</div>
              <div className="text-lg font-medium text-orange-500">$3,200</div>
            </div>
            <div className="bg-white rounded-lg p-3 border border-stone-200">
              <div className="text-xs text-stone-500">Collected</div>
              <div className="text-lg font-medium text-green-600">$28,900</div>
            </div>
          </div>

          {/* Invoice list */}
          <div className="bg-white rounded-lg border border-stone-200 overflow-hidden">
            <div className="px-4 py-2 border-b border-stone-100 flex items-center justify-between">
              <span className="text-xs font-medium text-stone-600">Recent Invoices</span>
              <span className="text-xs text-orange-500">View all</span>
            </div>
            
            {/* Invoice row 1 */}
            <div className="px-4 py-3 flex items-center justify-between border-b border-stone-50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-medium text-blue-600">AC</div>
                <div>
                  <div className="text-sm font-medium text-stone-800">Acme Corp</div>
                  <div className="text-xs text-stone-500">INV-2024-031 · Due in 3 days</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-stone-800">$4,500</div>
                <div className="flex items-center gap-1 text-xs text-green-600">
                  <Eye className="w-3 h-3" />
                  <span>Viewed</span>
                </div>
              </div>
            </div>

            {/* Invoice row 2 */}
            <div className="px-4 py-3 flex items-center justify-between border-b border-stone-50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-xs font-medium text-purple-600">TW</div>
                <div>
                  <div className="text-sm font-medium text-stone-800">TechWave Inc</div>
                  <div className="text-xs text-orange-500">INV-2024-028 · 5 days overdue</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-stone-800">$3,200</div>
                <div className="flex items-center gap-1 text-xs text-orange-500">
                  <Send className="w-3 h-3" />
                  <span>Reminder sent</span>
                </div>
              </div>
            </div>

            {/* Invoice row 3 */}
            <div className="px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-xs font-medium text-green-600">SM</div>
                <div>
                  <div className="text-sm font-medium text-stone-800">StartupMedia</div>
                  <div className="text-xs text-stone-500">INV-2024-025 · Due in 12 days</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-stone-800">$4,750</div>
                <div className="flex items-center gap-1 text-xs text-stone-400">
                  <Clock className="w-3 h-3" />
                  <span>Scheduled</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// FAQ Item component
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq-item">
      <button className="faq-button" onClick={() => setIsOpen(!isOpen)}>
        <span>{question}</span>
        <ChevronDown className={`w-5 h-5 text-stone-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <div className={`faq-content ${isOpen ? "open" : ""}`}>
        <p className="text-stone-600 text-sm leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg-primary)]/80 backdrop-blur-md border-b border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-medium text-stone-800">InvoiceNudge</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-stone-600 hover:text-stone-900 transition-colors">Features</a>
            <a href="#pricing" className="text-sm text-stone-600 hover:text-stone-900 transition-colors">Pricing</a>
            <a href="#faq" className="text-sm text-stone-600 hover:text-stone-900 transition-colors">FAQ</a>
          </div>
          <a href="#waitlist" className="btn-primary text-sm">
            Join waitlist
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-24 lg:pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-stone-900 leading-[1.1] tracking-tight animate-hero">
                Get paid on time without awkward follow-ups
              </h1>
              <p className="mt-6 text-lg text-stone-600 leading-relaxed animate-hero-delay-1">
                Forward your invoices to InvoiceNudge. Our AI sends polite, persistent payment reminders that actually work — so you can focus on your craft, not chasing money.
              </p>
              <div className="mt-8 animate-hero-delay-2" id="waitlist">
                <WaitlistForm />
                <p className="mt-3 text-sm text-stone-500">
                  Launching soon — be one of the first to automate your payment reminders
                </p>
              </div>
            </div>
            <div className="animate-hero-delay-3">
              <BrowserMockup />
            </div>
          </div>
        </div>
      </section>

      {/* Credibility Bar */}
      <section className="py-12 border-y border-[var(--border)] bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center">
              <p className="text-sm font-medium text-stone-800 mb-6">
                Built for freelancers and solo consultants who invoice $5K+ monthly
              </p>
              <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
                <div className="flex items-center gap-2 text-stone-500">
                  <Mail className="w-5 h-5" />
                  <span className="text-sm">Gmail</span>
                </div>
                <div className="flex items-center gap-2 text-stone-500">
                  <Mail className="w-5 h-5" />
                  <span className="text-sm">Outlook</span>
                </div>
                <div className="flex items-center gap-2 text-stone-500">
                  <BarChart3 className="w-5 h-5" />
                  <span className="text-sm">QuickBooks</span>
                </div>
                <div className="flex items-center gap-2 text-stone-500">
                  <BarChart3 className="w-5 h-5" />
                  <span className="text-sm">FreshBooks</span>
                </div>
                <div className="flex items-center gap-2 text-stone-500">
                  <CreditCard className="w-5 h-5" />
                  <span className="text-sm">Stripe</span>
                </div>
              </div>
              <p className="mt-6 text-sm text-stone-500">
                64% of freelancers report late payments as their #1 cash flow issue
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-medium text-stone-900 text-center mb-16">
              Sound familiar?
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8">
            <Reveal delay={100}>
              <div className="bg-white rounded-xl p-8 border border-[var(--border)]">
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-6">
                  <Clock className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="text-lg font-medium text-stone-900 mb-3">
                  Chasing payments kills your creative time
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  You spend 4-6 hours every month writing awkward "just following up" emails instead of doing billable work.
                </p>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="bg-white rounded-xl p-8 border border-[var(--border)]">
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-6">
                  <Mail className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="text-lg font-medium text-stone-900 mb-3">
                  Clients forget, invoices get buried
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Your invoice lands in their inbox on a busy day and disappears. Without reminders, you're invisible.
                </p>
              </div>
            </Reveal>
            <Reveal delay={300}>
              <div className="bg-white rounded-xl p-8 border border-[var(--border)]">
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-6">
                  <MessageSquare className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="text-lg font-medium text-stone-900 mb-3">
                  Being persistent feels unprofessional
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  You want to be paid but don't want to seem desperate. So you wait... and wait... and your cash flow suffers.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24 lg:py-32 bg-white border-y border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-medium text-stone-900 text-center mb-16">
              There's a better way
            </h2>
          </Reveal>
          <div className="space-y-6 max-w-3xl mx-auto">
            <Reveal delay={100}>
              <div className="flex items-start gap-6 p-6 rounded-xl bg-stone-50">
                <div className="text-stone-400 text-sm font-medium whitespace-nowrap">Before</div>
                <div className="flex-1 text-stone-600">Manually tracking due dates in spreadsheets</div>
                <ArrowRight className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <div className="flex-1 text-stone-900 font-medium">Forward once, automated reminders forever</div>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="flex items-start gap-6 p-6 rounded-xl bg-stone-50">
                <div className="text-stone-400 text-sm font-medium whitespace-nowrap">Before</div>
                <div className="flex-1 text-stone-600">Writing cringy "just checking in" emails</div>
                <ArrowRight className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <div className="flex-1 text-stone-900 font-medium">AI-crafted polite nudges that match your tone</div>
              </div>
            </Reveal>
            <Reveal delay={300}>
              <div className="flex items-start gap-6 p-6 rounded-xl bg-stone-50">
                <div className="text-stone-400 text-sm font-medium whitespace-nowrap">Before</div>
                <div className="flex-1 text-stone-600">Wondering if clients even saw your invoice</div>
                <ArrowRight className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <div className="flex-1 text-stone-900 font-medium">Real-time open and view tracking</div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 lg:py-32" id="features">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-medium text-stone-900 text-center mb-4">
              Everything you need to get paid
            </h2>
            <p className="text-stone-600 text-center mb-16 max-w-2xl mx-auto">
              Designed to turn your outstanding invoices into collected revenue — without the manual work.
            </p>
          </Reveal>
          
          {/* Bento grid layout */}
          <div className="grid md:grid-cols-3 gap-4">
            {/* Large card - spans 2 columns */}
            <Reveal delay={100} className="md:col-span-2">
              <div className="bg-white rounded-xl p-8 border border-[var(--border)] h-full">
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-6">
                  <Forward className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="text-xl font-medium text-stone-900 mb-3">
                  Email-Forward Setup
                </h3>
                <p className="text-stone-600 leading-relaxed">
                  Forward your invoice email to us. Our AI extracts client, amount, and due date automatically. No manual data entry, no complex integrations, no learning curve.
                </p>
              </div>
            </Reveal>
            
            {/* Regular card */}
            <Reveal delay={150}>
              <div className="bg-white rounded-xl p-8 border border-[var(--border)] h-full">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-6">
                  <Send className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-lg font-medium text-stone-900 mb-3">
                  Smart Reminder Sequences
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Pre-due, on-due, and overdue reminders sent at optimal times. Designed to maximize response without annoying clients.
                </p>
              </div>
            </Reveal>
            
            {/* Regular card */}
            <Reveal delay={200}>
              <div className="bg-white rounded-xl p-8 border border-[var(--border)] h-full">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-6">
                  <Eye className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="text-lg font-medium text-stone-900 mb-3">
                  Open & View Tracking
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Know exactly when clients open your reminders. Follow up strategically, not blindly.
                </p>
              </div>
            </Reveal>
            
            {/* Large card - spans 2 columns */}
            <Reveal delay={250} className="md:col-span-2">
              <div className="bg-white rounded-xl p-8 border border-[var(--border)] h-full">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-6">
                  <Sparkles className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-xl font-medium text-stone-900 mb-3">
                  Tone Matching AI
                </h3>
                <p className="text-stone-600 leading-relaxed">
                  Reminders that sound like you wrote them. Professional for corporate clients, casual for creative collaborators. Your voice, automated.
                </p>
              </div>
            </Reveal>
            
            {/* Regular card */}
            <Reveal delay={300}>
              <div className="bg-white rounded-xl p-8 border border-[var(--border)] h-full">
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center mb-6">
                  <CreditCard className="w-6 h-6 text-amber-500" />
                </div>
                <h3 className="text-lg font-medium text-stone-900 mb-3">
                  Payment Link Integration
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Connect Stripe, PayPal, or bank details. Make paying as easy as clicking a button.
                </p>
              </div>
            </Reveal>
            
            {/* Regular card */}
            <Reveal delay={350}>
              <div className="bg-white rounded-xl p-8 border border-[var(--border)] h-full">
                <div className="w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center mb-6">
                  <BarChart3 className="w-6 h-6 text-rose-500" />
                </div>
                <h3 className="text-lg font-medium text-stone-900 mb-3">
                  Cash Flow Dashboard
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  See outstanding invoices, overdue amounts, and collection rates at a glance. Your financial health, visualized.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* How It Works - Dark Section */}
      <section className="py-24 lg:py-32 section-dark">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-medium text-white text-center mb-4">
              How it works
            </h2>
            <p className="text-white/70 text-center mb-16 max-w-2xl mx-auto">
              Get started in under 60 seconds. No complex setup required.
            </p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8">
            <Reveal delay={100}>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
                  <Forward className="w-8 h-8 text-orange-400" />
                </div>
                <div className="text-orange-400 text-sm font-medium mb-2">Step 1</div>
                <h3 className="text-xl font-medium text-white mb-3">Forward</h3>
                <p className="text-white/70 text-sm">
                  Send your invoice email to pay@invoicenudge.com. That's it.
                </p>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-8 h-8 text-orange-400" />
                </div>
                <div className="text-orange-400 text-sm font-medium mb-2">Step 2</div>
                <h3 className="text-xl font-medium text-white mb-3">AI Parses</h3>
                <p className="text-white/70 text-sm">
                  Our AI extracts client details, amount, and due date instantly.
                </p>
              </div>
            </Reveal>
            <Reveal delay={300}>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
                  <Send className="w-8 h-8 text-orange-400" />
                </div>
                <div className="text-orange-400 text-sm font-medium mb-2">Step 3</div>
                <h3 className="text-xl font-medium text-white mb-3">Reminders Sent</h3>
                <p className="text-white/70 text-sm">
                  Polite, persistent reminders go out automatically until you're paid.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-medium text-stone-900 text-center mb-4">
              Built for people like you
            </h2>
            <p className="text-stone-600 text-center mb-16 max-w-2xl mx-auto">
              Whether you're a solo creative or managing a small team, InvoiceNudge adapts to your workflow.
            </p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8">
            <Reveal delay={100}>
              <div className="bg-white rounded-xl p-8 border border-[var(--border)]">
                <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center mb-6">
                  <Palette className="w-6 h-6 text-pink-500" />
                </div>
                <h3 className="text-lg font-medium text-stone-900 mb-2">The Solo Designer</h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Juggles 5-8 active clients monthly. Uses InvoiceNudge to ensure no invoice falls through the cracks while staying focused on creative work.
                </p>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="bg-white rounded-xl p-8 border border-[var(--border)]">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-6">
                  <Briefcase className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-lg font-medium text-stone-900 mb-2">The Busy Consultant</h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Bills hourly across multiple projects. Forwards invoices immediately after sending, never thinks about follow-ups again.
                </p>
              </div>
            </Reveal>
            <Reveal delay={300}>
              <div className="bg-white rounded-xl p-8 border border-[var(--border)]">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-6">
                  <Users className="w-6 h-6 text-emerald-500" />
                </div>
                <h3 className="text-lg font-medium text-stone-900 mb-2">The Agency Owner</h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Manages a small team with dozens of outstanding invoices. Uses the dashboard to prioritize which clients need personal attention.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 lg:py-32 bg-white border-y border-[var(--border)]" id="pricing">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-medium text-stone-900 text-center mb-4">
              Planned pricing
            </h2>
            <p className="text-stone-600 text-center mb-16 max-w-2xl mx-auto">
              Simple, transparent pricing. No hidden fees. Cancel anytime.
            </p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Starter */}
            <Reveal delay={100}>
              <div className="bg-stone-50 rounded-xl p-8 border border-[var(--border)]">
                <h3 className="text-lg font-medium text-stone-900 mb-2">Starter</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-medium text-stone-900">$19</span>
                  <span className="text-stone-500">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-sm text-stone-600">
                    <Check className="w-4 h-4 text-green-500" />
                    Up to 10 invoices/month
                  </li>
                  <li className="flex items-center gap-3 text-sm text-stone-600">
                    <Check className="w-4 h-4 text-green-500" />
                    Email reminders
                  </li>
                  <li className="flex items-center gap-3 text-sm text-stone-600">
                    <Check className="w-4 h-4 text-green-500" />
                    Basic open tracking
                  </li>
                  <li className="flex items-center gap-3 text-sm text-stone-600">
                    <Check className="w-4 h-4 text-green-500" />
                    Email support
                  </li>
                </ul>
                <a href="#waitlist" className="btn-secondary w-full block text-center">
                  Join waitlist
                </a>
              </div>
            </Reveal>
            
            {/* Pro - Popular */}
            <Reveal delay={200}>
              <div className="bg-white rounded-xl p-8 border-2 border-orange-500 relative pricing-popular">
                <h3 className="text-lg font-medium text-stone-900 mb-2">Pro</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-medium text-stone-900">$49</span>
                  <span className="text-stone-500">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-sm text-stone-600">
                    <Check className="w-4 h-4 text-green-500" />
                    Unlimited invoices
                  </li>
                  <li className="flex items-center gap-3 text-sm text-stone-600">
                    <Check className="w-4 h-4 text-green-500" />
                    Email + SMS reminders
                  </li>
                  <li className="flex items-center gap-3 text-sm text-stone-600">
                    <Check className="w-4 h-4 text-green-500" />
                    Tone customization
                  </li>
                  <li className="flex items-center gap-3 text-sm text-stone-600">
                    <Check className="w-4 h-4 text-green-500" />
                    Advanced analytics
                  </li>
                  <li className="flex items-center gap-3 text-sm text-stone-600">
                    <Check className="w-4 h-4 text-green-500" />
                    Priority support
                  </li>
                </ul>
                <a href="#waitlist" className="btn-primary w-full block text-center">
                  Join waitlist
                </a>
              </div>
            </Reveal>
            
            {/* Agency */}
            <Reveal delay={300}>
              <div className="bg-stone-50 rounded-xl p-8 border border-[var(--border)]">
                <h3 className="text-lg font-medium text-stone-900 mb-2">Agency</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-medium text-stone-900">$149</span>
                  <span className="text-stone-500">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-sm text-stone-600">
                    <Check className="w-4 h-4 text-green-500" />
                    Everything in Pro
                  </li>
                  <li className="flex items-center gap-3 text-sm text-stone-600">
                    <Check className="w-4 h-4 text-green-500" />
                    Team access (5 seats)
                  </li>
                  <li className="flex items-center gap-3 text-sm text-stone-600">
                    <Check className="w-4 h-4 text-green-500" />
                    White-label reminders
                  </li>
                  <li className="flex items-center gap-3 text-sm text-stone-600">
                    <Check className="w-4 h-4 text-green-500" />
                    API access
                  </li>
                  <li className="flex items-center gap-3 text-sm text-stone-600">
                    <Check className="w-4 h-4 text-green-500" />
                    Dedicated success manager
                  </li>
                </ul>
                <a href="#waitlist" className="btn-secondary w-full block text-center">
                  Join waitlist
                </a>
              </div>
            </Reveal>
          </div>
          
          {/* Pricing FAQs */}
          <Reveal delay={400}>
            <div className="mt-16 max-w-2xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <h4 className="font-medium text-stone-900 mb-2">When will this launch?</h4>
                  <p className="text-sm text-stone-600">Targeting early Q2 2026. Waitlist members get first access.</p>
                </div>
                <div>
                  <h4 className="font-medium text-stone-900 mb-2">Will there be a free trial?</h4>
                  <p className="text-sm text-stone-600">Yes, 14-day free trial on all plans. No credit card required.</p>
                </div>
                <div>
                  <h4 className="font-medium text-stone-900 mb-2">Can I cancel anytime?</h4>
                  <p className="text-sm text-stone-600">Absolutely. No contracts, cancel with one click.</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 lg:py-32" id="faq">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-medium text-stone-900 text-center mb-16">
              Frequently asked questions
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="bg-white rounded-xl border border-[var(--border)] divide-y divide-[var(--border)] px-6">
              <FAQItem
                question="How does email forwarding work?"
                answer="Forward any invoice email to pay@invoicenudge.com. Our AI reads the email and any PDF attachments to extract the client name, invoice amount, and due date. No manual data entry required."
              />
              <FAQItem
                question="What if my client uses a different language?"
                answer="We support invoices in English, Spanish, French, German, and Portuguese. Our AI can extract information from invoices in any of these languages. More languages are coming soon."
              />
              <FAQItem
                question="Will my clients know I'm using automation?"
                answer="Reminders come from your email address and match your communication style. Clients see a professional follow-up message, not a robotic template. You maintain full control over tone and timing."
              />
              <FAQItem
                question="Is my financial data secure?"
                answer="We use bank-level encryption for all data. We're working toward SOC 2 compliance and never share or sell your data. Your invoices and client information remain strictly confidential."
              />
              <FAQItem
                question="Can I customize the reminder schedule?"
                answer="Pro and Agency plans let you set exact timing and frequency for each client. You can customize when reminders go out before, on, and after the due date."
              />
              <FAQItem
                question="What if I already use QuickBooks or FreshBooks?"
                answer="We integrate with major invoicing tools including QuickBooks, FreshBooks, Wave, and Xero. Connect your account for automatic invoice import alongside the email-forward method."
              />
              <FAQItem
                question="How is this different from my invoicing software's reminders?"
                answer="Most invoicing tools send generic, one-size-fits-all reminders. InvoiceNudge uses AI to craft personalized messages that match your tone and optimizes timing based on client behavior patterns."
              />
              <FAQItem
                question="When does InvoiceNudge launch?"
                answer="We're in private beta now and targeting a public launch in early Q2 2026. Join the waitlist to get early access and lock in launch pricing."
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 lg:py-32 bg-stone-900">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-medium text-white mb-4">
              Stop chasing payments. Start getting paid.
            </h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              Join freelancers who are tired of being their own collections department. Get early access and lock in launch pricing.
            </p>
            <div className="max-w-md mx-auto">
              <WaitlistForm />
            </div>
            <p className="mt-6 text-white/50 text-sm">
              We're building this for people exactly like you.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-medium text-stone-800">InvoiceNudge</span>
            </div>
            
            <nav className="flex items-center gap-8">
              <a href="#features" className="text-sm text-stone-600 hover:text-stone-900 transition-colors">Features</a>
              <a href="#pricing" className="text-sm text-stone-600 hover:text-stone-900 transition-colors">Pricing</a>
              <a href="#faq" className="text-sm text-stone-600 hover:text-stone-900 transition-colors">FAQ</a>
              <a href="mailto:hello@invoicenudge.com" className="text-sm text-stone-600 hover:text-stone-900 transition-colors">Contact</a>
            </nav>
            
            <div className="flex items-center gap-4">
              <a href="https://twitter.com/invoicenudge" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-stone-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://producthunt.com" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-stone-600 transition-colors">
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-stone-500">
              InvoiceNudge helps freelancers get paid on time with AI-powered payment reminders.
            </p>
            <div className="flex items-center gap-6">
              <a href="/privacy" className="text-sm text-stone-500 hover:text-stone-700 transition-colors">Privacy Policy</a>
              <a href="/terms" className="text-sm text-stone-500 hover:text-stone-700 transition-colors">Terms of Service</a>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-stone-400">© 2026 InvoiceNudge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}