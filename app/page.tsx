"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Mail,
  Forward,
  Clock,
  Shield,
  Zap,
  CreditCard,
  BarChart3,
  AlertCircle,
  MessageSquare,
  DollarSign,
  Palette,
  Briefcase,
  TrendingUp,
  Menu,
  X,
} from "lucide-react";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add("visible");
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

function WaitlistForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex items-center gap-2 text-sm" style={{ color: "hsl(var(--accent))" }}>
        <Check size={16} /> You&apos;re on the list! We&apos;ll email you when we launch.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col sm:flex-row gap-3 ${compact ? "" : "max-w-md"}`}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        required
        className="flex-1 px-4 py-3 rounded-lg text-sm bg-white border border-[var(--border)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent)/0.2)] focus:border-[hsl(var(--accent)/0.4)] transition-shadow"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary px-5 py-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-60"
      >
        {status === "loading" ? "Joining..." : "Join Waitlist"}
        <ArrowRight size={14} />
      </button>
    </form>
  );
}

function BrowserMockup({ children }: { children: React.ReactNode }) {
  return (
    <div className="browser-chrome">
      <div className="browser-chrome-bar">
        <div className="browser-dot" style={{ background: "#FF5F57" }} />
        <div className="browser-dot" style={{ background: "#FFBD2E" }} />
        <div className="browser-dot" style={{ background: "#28CA42" }} />
        <div className="browser-url font-mono">invoicenudge.com</div>
      </div>
      <div className="p-4 sm:p-6">{children}</div>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group border-b border-[var(--border)] last:border-0">
      <summary className="flex items-center justify-between py-5 px-1 text-[15px] font-medium text-[var(--text-primary)]">
        {question}
        <ChevronDown size={16} className="faq-chevron text-[var(--text-tertiary)]" />
      </summary>
      <div className="pb-5 px-1 text-sm leading-relaxed text-[var(--text-secondary)]">{answer}</div>
    </details>
  );
}

function EmailTimelineMockup() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "hsl(var(--accent) / 0.15)" }}>
          <Forward size={14} style={{ color: "hsl(var(--accent))" }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-medium text-[var(--text-primary)] truncate">Invoice forwarded</div>
          <div className="text-[10px] text-[var(--text-tertiary)]">Design project — $2,400</div>
        </div>
        <div className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 shrink-0">Received</div>
      </div>

      <div className="ml-4 border-l-2 border-dashed border-[var(--border)] pl-6 space-y-3">
        <div className="animate-slide-in animate-slide-in-1 flex items-center gap-2 text-xs">
          <div className="w-2 h-2 rounded-full animate-pulse-dot" style={{ background: "hsl(var(--accent))" }} />
          <span className="text-[var(--text-secondary)]">Day 0</span>
          <span className="text-[var(--text-tertiary)]">—</span>
          <span className="text-[var(--text-primary)]">Friendly reminder sent</span>
        </div>
        <div className="animate-slide-in animate-slide-in-2 flex items-center gap-2 text-xs">
          <div className="w-2 h-2 rounded-full" style={{ background: "hsl(var(--accent) / 0.6)" }} />
          <span className="text-[var(--text-secondary)]">Day 7</span>
          <span className="text-[var(--text-tertiary)]">—</span>
          <span className="text-[var(--text-primary)]">Gentle check-in</span>
        </div>
        <div className="animate-slide-in animate-slide-in-3 flex items-center gap-2 text-xs">
          <div className="w-2 h-2 rounded-full" style={{ background: "hsl(var(--accent) / 0.4)" }} />
          <span className="text-[var(--text-secondary)]">Day 14</span>
          <span className="text-[var(--text-tertiary)]">—</span>
          <span className="text-[var(--text-primary)]">Firm follow-up</span>
        </div>
        <div className="animate-slide-in animate-slide-in-4 flex items-center gap-2 text-xs">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-[var(--text-secondary)]">Day 18</span>
          <span className="text-[var(--text-tertiary)]">—</span>
          <span className="font-medium text-emerald-600">Paid! $2,400</span>
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="relative noise">
      {/* Nav */}
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-[var(--bg-primary)]/80 border-b border-[var(--border-subtle)]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-[15px] font-medium tracking-tight">InvoiceNudge</span>
          <div className="hidden md:flex items-center gap-8 text-sm text-[var(--text-secondary)]">
            <a href="#features" className="hover:text-[var(--text-primary)] transition-colors">
              Features
            </a>
            <a href="#pricing" className="hover:text-[var(--text-primary)] transition-colors">
              Pricing
            </a>
            <a href="#faq" className="hover:text-[var(--text-primary)] transition-colors">
              FAQ
            </a>
            <a href="#waitlist" className="btn-primary px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5">
              Join Waitlist <ArrowRight size={13} />
            </a>
          </div>
          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[var(--border)] bg-[var(--bg-primary)] px-6 py-4 space-y-4">
            <a href="#features" className="block text-sm text-[var(--text-secondary)]" onClick={() => setMobileMenuOpen(false)}>
              Features
            </a>
            <a href="#pricing" className="block text-sm text-[var(--text-secondary)]" onClick={() => setMobileMenuOpen(false)}>
              Pricing
            </a>
            <a href="#faq" className="block text-sm text-[var(--text-secondary)]" onClick={() => setMobileMenuOpen(false)}>
              FAQ
            </a>
            <a
              href="#waitlist"
              className="btn-primary px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 w-fit"
              onClick={() => setMobileMenuOpen(false)}
            >
              Join Waitlist <ArrowRight size={13} />
            </a>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-40" />
        <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-16 lg:pt-24 lg:pb-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="stagger">
              <p className="hero-enter hero-enter-1 text-sm font-medium tracking-wide uppercase" style={{ color: "hsl(var(--accent))" }}>
                For Freelancers Who Hate Chasing Payments
              </p>
              <h1 className="hero-enter hero-enter-2 mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-medium tracking-tight leading-[1.1] text-[var(--text-primary)]">
                Stop Chasing Late Payments
              </h1>
              <p className="hero-enter hero-enter-3 mt-6 text-base sm:text-lg leading-relaxed text-[var(--text-secondary)] max-w-lg">
                Forward your invoice. AI sends polite reminders that sound like you — not a robot. You approve every email before it sends.
              </p>
              <div className="hero-enter hero-enter-4 mt-8">
                <WaitlistForm />
              </div>
              <p className="hero-enter hero-enter-5 mt-4 text-xs text-[var(--text-tertiary)]">
                Launching Q2 2026 — be one of the first to automate your collections
              </p>
            </div>

            <div className="hero-enter hero-enter-5 lg:block">
              <BrowserMockup>
                <EmailTimelineMockup />
              </BrowserMockup>
            </div>
          </div>
        </div>
      </section>

      {/* Credibility Bar */}
      <Reveal>
        <section className="border-y border-[var(--border)]">
          <div className="max-w-6xl mx-auto px-6 py-8 text-center">
            <p className="text-sm text-[var(--text-secondary)]">
              Built for freelancers who invoice $50K+ annually. Works with any payment method.
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-[var(--text-tertiary)]">
              <span>Gmail</span>
              <span>Outlook</span>
              <span>Stripe</span>
              <span>PayPal</span>
              <span>Zelle</span>
              <span>Venmo</span>
              <span>Check</span>
            </div>
            <p className="mt-4 text-xs text-[var(--text-tertiary)]">
              85% of freelancers experience late payments at least some of the time —{" "}
              <a href="https://remote.com/blog/reversing-late-payment-culture" className="underline" target="_blank" rel="noopener noreferrer">
                Remote.com, 2025
              </a>
            </p>
          </div>
        </section>
      </Reveal>

      {/* Problem / Pain Points */}
      <Reveal>
        <section className="max-w-6xl mx-auto px-6 py-20 lg:py-28">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight">The Late Payment Tax</h2>
            <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
              You do great work. You send the invoice. Then you wait. And wait. And wait.
            </p>
          </div>
          <div className="mt-12 lg:mt-16 grid md:grid-cols-3 gap-6 lg:gap-8 stagger">
            <Reveal>
              <div className="p-6 rounded-xl border border-[var(--border)] bg-white">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "hsl(var(--accent) / 0.08)" }}>
                  <Clock size={18} style={{ color: "hsl(var(--accent))" }} />
                </div>
                <h3 className="mt-4 text-[15px] font-medium">Time Wasted Chasing</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                  You spend 8-12 hours every month drafting &quot;just checking in&quot; emails, agonizing over wording, and still getting ignored. That&apos;s time you could spend on actual client work.
                </p>
              </div>
            </Reveal>
            <Reveal>
              <div className="p-6 rounded-xl border border-[var(--border)] bg-white">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "hsl(var(--accent) / 0.08)" }}>
                  <MessageSquare size={18} style={{ color: "hsl(var(--accent))" }} />
                </div>
                <h3 className="mt-4 text-[15px] font-medium">The Awkwardness Tax</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                  Every follow-up feels uncomfortable. You don&apos;t want to seem desperate or damage the relationship. So you wait... and wait... while rent is due.
                </p>
              </div>
            </Reveal>
            <Reveal>
              <div className="p-6 rounded-xl border border-[var(--border)] bg-white">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "hsl(var(--accent) / 0.08)" }}>
                  <DollarSign size={18} style={{ color: "hsl(var(--accent))" }} />
                </div>
                <h3 className="mt-4 text-[15px] font-medium">Cash Flow Chaos</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                  40% of freelancers miss personal bill payments because clients pay late. You&apos;re running a business, but your income feels unpredictable.
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      </Reveal>

      {/* Solution (Before/After) */}
      <Reveal>
        <section className="bg-[var(--bg-secondary)] relative noise">
          <div className="max-w-6xl mx-auto px-6 py-20 lg:py-28">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight">What If Payment Follow-Up Was Automatic?</h2>
            </div>
            <div className="mt-12 lg:mt-16 grid md:grid-cols-2 gap-6">
              <div className="p-6 lg:p-8 rounded-xl border border-[var(--border)] bg-white">
                <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-tertiary)]">Before</p>
                <ul className="mt-4 space-y-3">
                  <li className="text-sm text-[var(--text-secondary)] flex items-start gap-2">
                    <span className="text-[var(--text-tertiary)] mt-0.5">&times;</span>
                    Draft &quot;polite but firm&quot; email (30 min agonizing)
                  </li>
                  <li className="text-sm text-[var(--text-secondary)] flex items-start gap-2">
                    <span className="text-[var(--text-tertiary)] mt-0.5">&times;</span>
                    Send, wait, get ignored
                  </li>
                  <li className="text-sm text-[var(--text-secondary)] flex items-start gap-2">
                    <span className="text-[var(--text-tertiary)] mt-0.5">&times;</span>
                    Draft follow-up (another 30 min)
                  </li>
                  <li className="text-sm text-[var(--text-secondary)] flex items-start gap-2">
                    <span className="text-[var(--text-tertiary)] mt-0.5">&times;</span>
                    Wait 2 more weeks
                  </li>
                  <li className="text-sm text-[var(--text-secondary)] flex items-start gap-2">
                    <span className="text-[var(--text-tertiary)] mt-0.5">&times;</span>
                    Finally get paid (45+ days late)
                  </li>
                </ul>
              </div>
              <div className="p-6 lg:p-8 rounded-xl border border-[hsl(var(--accent)/0.2)] bg-[hsl(var(--accent-light))]">
                <p className="text-xs font-medium uppercase tracking-wider" style={{ color: "hsl(var(--accent))" }}>
                  After
                </p>
                <ul className="mt-4 space-y-3">
                  <li className="text-sm text-[var(--text-primary)] flex items-start gap-2">
                    <Check size={14} className="mt-0.5 shrink-0" style={{ color: "hsl(var(--accent))" }} />
                    Forward invoice (10 seconds)
                  </li>
                  <li className="text-sm text-[var(--text-primary)] flex items-start gap-2">
                    <Check size={14} className="mt-0.5 shrink-0" style={{ color: "hsl(var(--accent))" }} />
                    AI sends Day 0 friendly reminder
                  </li>
                  <li className="text-sm text-[var(--text-primary)] flex items-start gap-2">
                    <Check size={14} className="mt-0.5 shrink-0" style={{ color: "hsl(var(--accent))" }} />
                    Day 7 gentle check-in
                  </li>
                  <li className="text-sm text-[var(--text-primary)] flex items-start gap-2">
                    <Check size={14} className="mt-0.5 shrink-0" style={{ color: "hsl(var(--accent))" }} />
                    Day 14 firm follow-up
                  </li>
                  <li className="text-sm text-[var(--text-primary)] flex items-start gap-2">
                    <Check size={14} className="mt-0.5 shrink-0" style={{ color: "hsl(var(--accent))" }} />
                    Client pays (average 18 days)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Features */}
      <Reveal>
        <section id="features" className="max-w-6xl mx-auto px-6 py-20 lg:py-28">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight">How InvoiceNudge Works</h2>
            <p className="mt-4 text-[var(--text-secondary)]">
              Polite, professional follow-ups that sound like you wrote them — because you approve every one.
            </p>
          </div>
          <div className="mt-12 lg:mt-16 grid md:grid-cols-3 gap-4 stagger">
            <Reveal className="md:col-span-2 p-6 lg:p-8 rounded-xl border border-[var(--border)] bg-white">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "hsl(var(--accent) / 0.08)" }}>
                <Forward size={18} style={{ color: "hsl(var(--accent))" }} />
              </div>
              <h3 className="mt-4 text-lg font-medium">Email-Forward Workflow</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)] max-w-md">
                Forward any invoice to followup@invoicenudge.com. AI extracts client, amount, and due date automatically. No accounting software required.
              </p>
            </Reveal>
            <Reveal className="p-6 lg:p-8 rounded-xl border border-[var(--border)] bg-white">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "hsl(var(--accent) / 0.08)" }}>
                <Mail size={18} style={{ color: "hsl(var(--accent))" }} />
              </div>
              <h3 className="mt-4 text-[15px] font-medium">AI Learns Your Tone</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                Casual or formal? Emoji user or buttoned-up? The AI mirrors your communication style.
              </p>
            </Reveal>
            <Reveal className="p-6 lg:p-8 rounded-xl border border-[var(--border)] bg-white">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "hsl(var(--accent) / 0.08)" }}>
                <Zap size={18} style={{ color: "hsl(var(--accent))" }} />
              </div>
              <h3 className="mt-4 text-[15px] font-medium">Escalating Politeness</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                Day 0: friendly. Day 7: check-in. Day 14: firm. Day 21: final notice. Tone escalates while staying professional.
              </p>
            </Reveal>
            <Reveal className="md:col-span-2 p-6 lg:p-8 rounded-xl border border-[var(--border)] bg-white">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "hsl(var(--accent) / 0.08)" }}>
                <Shield size={18} style={{ color: "hsl(var(--accent))" }} />
              </div>
              <h3 className="mt-4 text-lg font-medium">Preview Mode — You&apos;re Always in Control</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)] max-w-md">
                You approve every email before it sends. See exactly what your client will receive. Edit if needed. Unlock autopilot only when you trust it.
              </p>
            </Reveal>
            <Reveal className="p-6 lg:p-8 rounded-xl border border-[var(--border)] bg-white">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "hsl(var(--accent) / 0.08)" }}>
                <CreditCard size={18} style={{ color: "hsl(var(--accent))" }} />
              </div>
              <h3 className="mt-4 text-[15px] font-medium">Any Payment Method</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                Zelle, Venmo, check, wire, PayPal, crypto — we track due dates, not payment processors.
              </p>
            </Reveal>
            <Reveal className="p-6 lg:p-8 rounded-xl border border-[var(--border)] bg-white">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "hsl(var(--accent) / 0.08)" }}>
                <BarChart3 size={18} style={{ color: "hsl(var(--accent))" }} />
              </div>
              <h3 className="mt-4 text-[15px] font-medium">Payment Dashboard</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                See outstanding invoices, sent reminders, and your average days-to-payment over time.
              </p>
            </Reveal>
          </div>
        </section>
      </Reveal>

      {/* How It Works */}
      <Reveal>
        <section className="bg-[var(--text-primary)] text-white relative noise">
          <div className="max-w-6xl mx-auto px-6 py-20 lg:py-28">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight">Three Steps to Automated Collections</h2>
            </div>
            <div className="mt-12 lg:mt-16 grid md:grid-cols-3 gap-8 lg:gap-12 stagger">
              <Reveal>
                <div>
                  <span className="text-3xl font-light text-white/20">01</span>
                  <h3 className="mt-3 text-[15px] font-medium">Forward Your Invoice</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    Just forward the invoice email you already sent to your client. Takes 10 seconds.
                  </p>
                </div>
              </Reveal>
              <Reveal>
                <div>
                  <span className="text-3xl font-light text-white/20">02</span>
                  <h3 className="mt-3 text-[15px] font-medium">AI Parses & Schedules</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    Our AI extracts the details and creates a reminder sequence based on the due date.
                  </p>
                </div>
              </Reveal>
              <Reveal>
                <div>
                  <span className="text-3xl font-light text-white/20">03</span>
                  <h3 className="mt-3 text-[15px] font-medium">Approve & Relax</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    Review each reminder before it sends. Get paid without the awkward conversations.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Use Cases */}
      <Reveal>
        <section className="max-w-6xl mx-auto px-6 py-20 lg:py-28">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight">Built for Real Freelancers</h2>
            <p className="mt-4 text-[var(--text-secondary)]">Here&apos;s how different freelancers would use InvoiceNudge.</p>
          </div>
          <div className="mt-12 lg:mt-16 grid md:grid-cols-3 gap-6 stagger">
            <Reveal>
              <div className="p-6 rounded-xl border border-[var(--border)] bg-white">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "hsl(var(--accent) / 0.08)" }}>
                  <Palette size={18} style={{ color: "hsl(var(--accent))" }} />
                </div>
                <p className="mt-4 text-xs font-medium uppercase tracking-wider" style={{ color: "hsl(var(--accent))" }}>
                  The Solo Designer
                </p>
                <p className="mt-1 text-xs text-[var(--text-tertiary)]">5-8 clients at once</p>
                <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                  Manages multiple projects simultaneously. Hates the &quot;did you see my invoice?&quot; conversation. Uses InvoiceNudge to maintain professional relationships while still getting paid on time.
                </p>
              </div>
            </Reveal>
            <Reveal>
              <div className="p-6 rounded-xl border border-[var(--border)] bg-white">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "hsl(var(--accent) / 0.08)" }}>
                  <Briefcase size={18} style={{ color: "hsl(var(--accent))" }} />
                </div>
                <p className="mt-4 text-xs font-medium uppercase tracking-wider" style={{ color: "hsl(var(--accent))" }}>
                  The Busy Consultant
                </p>
                <p className="mt-1 text-xs text-[var(--text-tertiary)]">$5-15K per project</p>
                <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                  Bills large amounts per engagement. Can&apos;t afford to have $20K outstanding for 60 days. Needs automated follow-up that doesn&apos;t make clients feel harassed.
                </p>
              </div>
            </Reveal>
            <Reveal>
              <div className="p-6 rounded-xl border border-[var(--border)] bg-white">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "hsl(var(--accent) / 0.08)" }}>
                  <TrendingUp size={18} style={{ color: "hsl(var(--accent))" }} />
                </div>
                <p className="mt-4 text-xs font-medium uppercase tracking-wider" style={{ color: "hsl(var(--accent))" }}>
                  The Growing Freelancer
                </p>
                <p className="mt-1 text-xs text-[var(--text-tertiary)]">$80K → $150K/year</p>
                <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                  Scaling their business. Starting to lose track of which invoices are overdue. Needs a system before hiring a bookkeeper.
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      </Reveal>

      {/* Pricing */}
      <Reveal>
        <section id="pricing" className="bg-[var(--bg-secondary)] relative noise">
          <div className="max-w-5xl mx-auto px-6 py-20 lg:py-28">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight">Simple, Transparent Pricing</h2>
              <p className="mt-3 text-sm text-[var(--text-tertiary)]">Planned launch pricing — join waitlist to lock in founding member rates</p>
            </div>
            <div className="mt-12 lg:mt-16 grid md:grid-cols-3 gap-6 stagger">
              <Reveal>
                <div className="p-6 lg:p-8 rounded-xl border border-[var(--border)] bg-white flex flex-col h-full">
                  <p className="text-sm font-medium text-[var(--text-secondary)]">Starter</p>
                  <p className="mt-2 flex items-baseline gap-1">
                    <span className="text-3xl font-medium">$19</span>
                    <span className="text-sm text-[var(--text-tertiary)]">/mo</span>
                  </p>
                  <p className="text-xs text-[var(--text-tertiary)] mt-1">or $199/year</p>
                  <ul className="mt-6 space-y-3 flex-1">
                    <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <Check size={14} className="mt-0.5 shrink-0" style={{ color: "hsl(var(--accent))" }} />
                      10 invoices/month
                    </li>
                    <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <Check size={14} className="mt-0.5 shrink-0" style={{ color: "hsl(var(--accent))" }} />
                      AI reminders (Day 0/7/14/21)
                    </li>
                    <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <Check size={14} className="mt-0.5 shrink-0" style={{ color: "hsl(var(--accent))" }} />
                      Preview Mode
                    </li>
                    <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <Check size={14} className="mt-0.5 shrink-0" style={{ color: "hsl(var(--accent))" }} />
                      Basic dashboard
                    </li>
                  </ul>
                  <a
                    href="#waitlist"
                    className="mt-8 block text-center py-2.5 rounded-lg text-sm font-medium border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-all"
                  >
                    Join Waitlist
                  </a>
                </div>
              </Reveal>
              <Reveal>
                <div className="p-6 lg:p-8 rounded-xl border bg-white flex flex-col h-full pricing-recommended ring-1 ring-[hsl(var(--accent)/0.2)]">
                  <span
                    className="self-start text-xs font-medium px-2.5 py-0.5 rounded-full mb-4"
                    style={{ background: "hsl(var(--accent) / 0.1)", color: "hsl(var(--accent))" }}
                  >
                    Recommended
                  </span>
                  <p className="text-sm font-medium text-[var(--text-secondary)]">Pro</p>
                  <p className="mt-2 flex items-baseline gap-1">
                    <span className="text-3xl font-medium">$49</span>
                    <span className="text-sm text-[var(--text-tertiary)]">/mo</span>
                  </p>
                  <p className="text-xs text-[var(--text-tertiary)] mt-1">or $499/year (save $89)</p>
                  <ul className="mt-6 space-y-3 flex-1">
                    <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <Check size={14} className="mt-0.5 shrink-0" style={{ color: "hsl(var(--accent))" }} />
                      50 invoices/month
                    </li>
                    <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <Check size={14} className="mt-0.5 shrink-0" style={{ color: "hsl(var(--accent))" }} />
                      Autopilot Mode
                    </li>
                    <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <Check size={14} className="mt-0.5 shrink-0" style={{ color: "hsl(var(--accent))" }} />
                      Client reply detection
                    </li>
                    <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <Check size={14} className="mt-0.5 shrink-0" style={{ color: "hsl(var(--accent))" }} />
                      Custom reminder schedules
                    </li>
                    <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <Check size={14} className="mt-0.5 shrink-0" style={{ color: "hsl(var(--accent))" }} />
                      Zapier integration
                    </li>
                  </ul>
                  <a href="#waitlist" className="mt-8 block text-center py-2.5 rounded-lg text-sm font-medium btn-primary">
                    Join Waitlist
                  </a>
                </div>
              </Reveal>
              <Reveal>
                <div className="p-6 lg:p-8 rounded-xl border border-[var(--border)] bg-white flex flex-col h-full">
                  <p className="text-sm font-medium text-[var(--text-secondary)]">Agency</p>
                  <p className="mt-2 flex items-baseline gap-1">
                    <span className="text-3xl font-medium">$149</span>
                    <span className="text-sm text-[var(--text-tertiary)]">/mo</span>
                  </p>
                  <p className="text-xs text-[var(--text-tertiary)] mt-1">or $1,499/year (save $289)</p>
                  <ul className="mt-6 space-y-3 flex-1">
                    <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <Check size={14} className="mt-0.5 shrink-0" style={{ color: "hsl(var(--accent))" }} />
                      Unlimited invoices
                    </li>
                    <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <Check size={14} className="mt-0.5 shrink-0" style={{ color: "hsl(var(--accent))" }} />
                      3 team seats
                    </li>
                    <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <Check size={14} className="mt-0.5 shrink-0" style={{ color: "hsl(var(--accent))" }} />
                      White-label emails
                    </li>
                    <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <Check size={14} className="mt-0.5 shrink-0" style={{ color: "hsl(var(--accent))" }} />
                      Dedicated account manager
                    </li>
                    <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <Check size={14} className="mt-0.5 shrink-0" style={{ color: "hsl(var(--accent))" }} />
                      API access
                    </li>
                  </ul>
                  <a
                    href="#waitlist"
                    className="mt-8 block text-center py-2.5 rounded-lg text-sm font-medium border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-all"
                  >
                    Join Waitlist
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </Reveal>

      {/* FAQ */}
      <Reveal>
        <section id="faq" className="max-w-3xl mx-auto px-6 py-20 lg:py-28">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-center">Frequently Asked Questions</h2>
          <div className="mt-12 border-t border-[var(--border)]">
            <FaqItem
              question="When does InvoiceNudge launch?"
              answer="Q2 2026. Join the waitlist to get early access and lock in founding member pricing before the public launch."
            />
            <FaqItem
              question="Will my clients know I'm using automation?"
              answer="No. Emails come from your address via our infrastructure. There's no 'Sent via InvoiceNudge' footer or branding. To your clients, it looks like you wrote it."
            />
            <FaqItem
              question="What if the AI writes something wrong?"
              answer="Preview Mode shows you every email before it sends. You can approve as-is, edit the text, or reject entirely. You're always in control. Only after you trust the AI can you enable Autopilot Mode."
            />
            <FaqItem
              question="Do I need accounting software?"
              answer="No. Just forward invoice emails. No QuickBooks, no Xero, no integrations required. If you can forward an email, you can use InvoiceNudge."
            />
            <FaqItem
              question="What if my emails go to spam?"
              answer="We use Resend for email delivery — the same infrastructure used by Linear, Vercel, and thousands of tech companies. SPF/DKIM/DMARC are configured automatically for high deliverability."
            />
            <FaqItem
              question="Can I use this with any payment method?"
              answer="Yes. Zelle, Venmo, check, wire, bank transfer, PayPal, crypto — we track due dates and send reminders. We don't care how the client actually pays you."
            />
            <FaqItem
              question="What's your refund policy?"
              answer="60-day money-back guarantee. If you don't get paid faster or just change your mind, email us for a full refund. No questions asked."
            />
            <FaqItem
              question="Is my data secure?"
              answer="Your invoice data is encrypted at rest and in transit. We never share client information with third parties. We're building this for freelancers who value privacy and professionalism."
            />
          </div>
        </section>
      </Reveal>

      {/* Final CTA */}
      <Reveal>
        <section id="waitlist" className="bg-[var(--bg-secondary)] relative noise">
          <div className="max-w-2xl mx-auto px-6 py-20 lg:py-28 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight">Stop Losing Hours to Payment Chasing</h2>
            <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
              Join the waitlist for early access and lock in founding member pricing before we launch.
            </p>
            <div className="mt-8 flex justify-center">
              <WaitlistForm />
            </div>
            <p className="mt-4 text-xs text-[var(--text-tertiary)]">No spam. Just a launch notification and early access.</p>
          </div>
        </section>
      </Reveal>

      {/* Footer */}
      <footer className="border-t border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-sm font-medium">InvoiceNudge</p>
              <p className="text-xs text-[var(--text-tertiary)] mt-1">
                Automated payment reminders that sound like you.
              </p>
            </div>
            <div className="flex items-center gap-6 text-sm text-[var(--text-tertiary)]">
              <a href="#features" className="hover:text-[var(--text-secondary)] transition-colors">
                Features
              </a>
              <a href="#pricing" className="hover:text-[var(--text-secondary)] transition-colors">
                Pricing
              </a>
              <a href="#faq" className="hover:text-[var(--text-secondary)] transition-colors">
                FAQ
              </a>
              <a href="/privacy" className="hover:text-[var(--text-secondary)] transition-colors">
                Privacy
              </a>
              <a href="/terms" className="hover:text-[var(--text-secondary)] transition-colors">
                Terms
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-[var(--border)] text-center">
            <p className="text-xs text-[var(--text-tertiary)]">&copy; 2026 InvoiceNudge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}