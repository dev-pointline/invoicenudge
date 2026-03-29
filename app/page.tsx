"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Clock,
  Mail,
  MessageSquare,
  Shield,
  Sparkles,
  Timer,
  Wallet,
  Zap,
  Send,
  Eye,
  BarChart3,
  Palette,
  Briefcase,
  Users,
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
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex items-center gap-2 text-sm" style={{ color: "hsl(var(--accent))" }}>
        <Check size={16} /> You&apos;re on the list. We&apos;ll notify you when we launch.
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
        className="btn-primary px-5 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-60"
      >
        {status === "loading" ? "..." : "Join Waitlist"}
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
        <div className="browser-url">invoicenudge.com/dashboard</div>
      </div>
      <div className="p-4 sm:p-6">{children}</div>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group border-b border-[var(--border)] last:border-0">
      <summary className="flex items-center justify-between py-5 px-4 text-base font-medium text-[var(--text-primary)]">
        {question}
        <ChevronDown size={16} className="faq-chevron text-[var(--text-tertiary)] shrink-0 ml-4" />
      </summary>
      <div className="pb-5 px-4 text-[15px] leading-relaxed text-[var(--text-secondary)]">{answer}</div>
    </details>
  );
}

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="relative">
      {/* Nav */}
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-[var(--bg-primary)]/80 border-b border-[var(--border-subtle)]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-[15px] font-medium tracking-tight">InvoiceNudge</span>
          <div className="hidden md:flex items-center gap-8 text-sm text-[var(--text-secondary)]">
            <a href="#features" className="hover:text-[var(--text-primary)] transition-colors">Features</a>
            <a href="#pricing" className="hover:text-[var(--text-primary)] transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-[var(--text-primary)] transition-colors">FAQ</a>
            <a href="#waitlist" className="btn-primary px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5">
              Join Waitlist <ArrowRight size={13} />
            </a>
          </div>
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-5 h-0.5 bg-[var(--text-primary)] mb-1.5" />
            <div className="w-5 h-0.5 bg-[var(--text-primary)] mb-1.5" />
            <div className="w-5 h-0.5 bg-[var(--text-primary)]" />
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[var(--border)] bg-[var(--bg-primary)] px-6 py-4 space-y-4">
            <a href="#features" className="block text-sm text-[var(--text-secondary)]">Features</a>
            <a href="#pricing" className="block text-sm text-[var(--text-secondary)]">Pricing</a>
            <a href="#faq" className="block text-sm text-[var(--text-secondary)]">FAQ</a>
            <a href="#waitlist" className="btn-primary px-4 py-2 rounded-lg text-sm font-medium inline-flex items-center gap-1.5">
              Join Waitlist <ArrowRight size={13} />
            </a>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-40" />
        <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-16 sm:pt-24 sm:pb-20 lg:pt-32 lg:pb-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="stagger">
              <p className="hero-enter hero-enter-1 text-sm font-medium tracking-wide uppercase" style={{ color: "hsl(var(--accent))" }}>
                For freelancers who hate chasing payments
              </p>
              <h1 className="hero-enter hero-enter-2 mt-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-[-0.02em] leading-[1.05] text-[var(--text-primary)]">
                Stop chasing late payments
              </h1>
              <p className="hero-enter hero-enter-3 mt-6 text-lg sm:text-xl leading-relaxed text-[var(--text-secondary)] max-w-lg">
                Forward your invoice. AI sends polite reminders that sound like you — not a robot. Get paid faster without the awkward follow-ups.
              </p>
              <div className="hero-enter hero-enter-4 mt-8">
                <WaitlistForm />
              </div>
              <p className="hero-enter hero-enter-5 mt-4 text-xs text-[var(--text-tertiary)]">
                Launching April 2026 — founding members lock in $19/month forever
              </p>
            </div>

            <div className="hero-enter hero-enter-5 hidden lg:block">
              <BrowserMockup>
                <div className="space-y-3">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">Reminder Preview</span>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "hsl(var(--accent) / 0.1)", color: "hsl(var(--accent))" }}>Day 7</span>
                  </div>
                  <div className="p-4 rounded-lg border border-[var(--border)] bg-white">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium" style={{ background: "hsl(var(--accent) / 0.1)", color: "hsl(var(--accent))" }}>JD</div>
                      <div>
                        <p className="text-sm font-medium text-[var(--text-primary)]">To: sarah@clientco.com</p>
                        <p className="text-xs text-[var(--text-tertiary)]">Re: Invoice #2847 - Logo Design</p>
                      </div>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      Hey Sarah! Just checking if you had a chance to review the invoice I sent last week — let me know if you have any questions! 😊
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                      <button className="text-xs px-3 py-1.5 rounded-md font-medium" style={{ background: "hsl(var(--accent))", color: "white" }}>Approve</button>
                      <button className="text-xs px-3 py-1.5 rounded-md border border-[var(--border)] text-[var(--text-secondary)]">Edit</button>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--bg-secondary)]">
                    <Clock size={14} className="text-[var(--text-tertiary)]" />
                    <div className="flex-1">
                      <p className="text-xs text-[var(--text-secondary)]">Invoice #2847 • $2,400</p>
                      <p className="text-xs text-[var(--text-tertiary)]">Due 7 days ago</p>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "hsl(var(--accent) / 0.1)", color: "hsl(var(--accent))" }}>Pending</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--bg-secondary)]">
                    <Check size={14} className="text-emerald-600" />
                    <div className="flex-1">
                      <p className="text-xs text-[var(--text-secondary)]">Invoice #2831 • $1,800</p>
                      <p className="text-xs text-[var(--text-tertiary)]">Paid in 12 days</p>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600">Paid</span>
                  </div>
                </div>
              </BrowserMockup>
            </div>
          </div>
        </div>
      </section>

      {/* Credibility Bar */}
      <Reveal>
        <section className="border-y border-[var(--border)] bg-[var(--bg-secondary)]">
          <div className="max-w-6xl mx-auto px-6 py-10 text-center">
            <p className="text-[15px] text-[var(--text-secondary)]">Built for freelancers who invoice $5K-50K/month and hate chasing payments</p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-medium text-[var(--text-tertiary)]">
              <span>Gmail</span>
              <span>Outlook</span>
              <span>QuickBooks</span>
              <span>Xero</span>
              <span>Stripe</span>
              <span>PayPal</span>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Problem / Pain Points */}
      <Reveal>
        <section className="max-w-6xl mx-auto px-6 py-20 lg:py-28">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-[-0.02em]">The late payment trap</h2>
            <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">85% of freelancers experience late payments. Here&apos;s why it hurts.</p>
          </div>
          <div className="mt-14 grid md:grid-cols-3 gap-6 stagger">
            <Reveal>
              <div className="p-6 rounded-xl border border-[var(--border)] bg-white">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "hsl(var(--accent) / 0.08)" }}>
                  <MessageSquare size={18} style={{ color: "hsl(var(--accent))" }} />
                </div>
                <h3 className="mt-4 text-[15px] font-medium">The Awkward Chase</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                  You spend 8-12 hours/month writing &quot;just checking in&quot; emails, agonizing over whether you sound too pushy or too passive.
                </p>
              </div>
            </Reveal>
            <Reveal>
              <div className="p-6 rounded-xl border border-[var(--border)] bg-white">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "hsl(var(--accent) / 0.08)" }}>
                  <Wallet size={18} style={{ color: "hsl(var(--accent))" }} />
                </div>
                <h3 className="mt-4 text-[15px] font-medium">The Cash Flow Anxiety</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                  40% of freelancers miss personal bill payments because clients pay 30-60 days late. Your rent shouldn&apos;t depend on your client&apos;s AP calendar.
                </p>
              </div>
            </Reveal>
            <Reveal>
              <div className="p-6 rounded-xl border border-[var(--border)] bg-white">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "hsl(var(--accent) / 0.08)" }}>
                  <Shield size={18} style={{ color: "hsl(var(--accent))" }} />
                </div>
                <h3 className="mt-4 text-[15px] font-medium">The Professional Paradox</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                  You want to be paid on time but don&apos;t want to damage client relationships. So you wait. And wait. And silently resent.
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      </Reveal>

      {/* Solution (Before / After) */}
      <Reveal>
        <section className="bg-[var(--bg-secondary)] relative">
          <div className="max-w-6xl mx-auto px-6 py-20 lg:py-28">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-[-0.02em]">From chaos to calm</h2>
            </div>
            <div className="mt-14 grid md:grid-cols-2 gap-6">
              <div className="p-6 sm:p-8 rounded-xl border border-[var(--border)] bg-white">
                <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-tertiary)]">Before</p>
                <ul className="mt-4 space-y-3">
                  <li className="text-sm text-[var(--text-secondary)] flex items-start gap-2">
                    <span className="text-[var(--text-tertiary)] mt-0.5">&times;</span>
                    Invoice due → 15 days pass → Draft awkward email
                  </li>
                  <li className="text-sm text-[var(--text-secondary)] flex items-start gap-2">
                    <span className="text-[var(--text-tertiary)] mt-0.5">&times;</span>
                    Agonize for 30 minutes: &quot;Am I too pushy?&quot;
                  </li>
                  <li className="text-sm text-[var(--text-secondary)] flex items-start gap-2">
                    <span className="text-[var(--text-tertiary)] mt-0.5">&times;</span>
                    Send → Wait → Client ignores → Repeat
                  </li>
                </ul>
              </div>
              <div className="p-6 sm:p-8 rounded-xl border border-[hsl(var(--accent)/0.2)] bg-[hsl(var(--accent-light))]">
                <p className="text-xs font-medium uppercase tracking-wider" style={{ color: "hsl(var(--accent))" }}>After</p>
                <ul className="mt-4 space-y-3">
                  <li className="text-sm text-[var(--text-primary)] flex items-start gap-2">
                    <Check size={14} className="mt-0.5 shrink-0" style={{ color: "hsl(var(--accent))" }} />
                    Forward invoice → AI schedules reminders automatically
                  </li>
                  <li className="text-sm text-[var(--text-primary)] flex items-start gap-2">
                    <Check size={14} className="mt-0.5 shrink-0" style={{ color: "hsl(var(--accent))" }} />
                    Day 0 friendly reminder → Day 7 check-in → Day 14 follow-up
                  </li>
                  <li className="text-sm text-[var(--text-primary)] flex items-start gap-2">
                    <Check size={14} className="mt-0.5 shrink-0" style={{ color: "hsl(var(--accent))" }} />
                    Client pays → Zero time spent chasing
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Features (Bento Grid) */}
      <Reveal>
        <section id="features" className="max-w-6xl mx-auto px-6 py-20 lg:py-28">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-[-0.02em]">Designed to get you paid</h2>
            <p className="mt-4 text-[var(--text-secondary)]">Everything you need to automate payment follow-ups without losing your personal touch.</p>
          </div>
          <div className="mt-14 grid md:grid-cols-3 gap-4 stagger">
            <Reveal className="md:col-span-2 p-6 sm:p-8 rounded-xl border border-[var(--border)] bg-white">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "hsl(var(--accent) / 0.08)" }}>
                <Zap size={18} style={{ color: "hsl(var(--accent))" }} />
              </div>
              <h3 className="mt-4 text-lg font-medium">60-Second Setup</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-secondary)] max-w-md">
                Forward any invoice to followup@invoicenudge.com. AI extracts client name, amount, and due date. First reminder scheduled instantly — no forms, no integrations, no setup wizard.
              </p>
            </Reveal>
            <Reveal className="p-6 sm:p-8 rounded-xl border border-[var(--border)] bg-white">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "hsl(var(--accent) / 0.08)" }}>
                <Sparkles size={18} style={{ color: "hsl(var(--accent))" }} />
              </div>
              <h3 className="mt-4 text-[15px] font-medium">Sounds Like You</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                AI learns your communication style from your original invoice emails. Casual or formal — it matches your brand voice.
              </p>
            </Reveal>
            <Reveal className="p-6 sm:p-8 rounded-xl border border-[var(--border)] bg-white">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "hsl(var(--accent) / 0.08)" }}>
                <Timer size={18} style={{ color: "hsl(var(--accent))" }} />
              </div>
              <h3 className="mt-4 text-[15px] font-medium">Escalating Politeness</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                Day 0 is friendly. Day 7 is a check-in. Day 14 is firm. Day 21 is final notice. Designed to get paid without burning bridges.
              </p>
            </Reveal>
            <Reveal className="md:col-span-2 p-6 sm:p-8 rounded-xl border border-[var(--border)] bg-white">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "hsl(var(--accent) / 0.08)" }}>
                <Eye size={18} style={{ color: "hsl(var(--accent))" }} />
              </div>
              <h3 className="mt-4 text-lg font-medium">Preview Mode</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-secondary)] max-w-md">
                Scared of AI saying something wrong? See every reminder before it sends. Approve, edit, or reject. Build trust before enabling autopilot — or stay in Preview Mode forever.
              </p>
            </Reveal>
            <Reveal className="p-6 sm:p-8 rounded-xl border border-[var(--border)] bg-white">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "hsl(var(--accent) / 0.08)" }}>
                <BarChart3 size={18} style={{ color: "hsl(var(--accent))" }} />
              </div>
              <h3 className="mt-4 text-[15px] font-medium">Payment Dashboard</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                Track &quot;average days to payment&quot; over time. See exactly how much time InvoiceNudge is saving you.
              </p>
            </Reveal>
            <Reveal className="p-6 sm:p-8 rounded-xl border border-[var(--border)] bg-white">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "hsl(var(--accent) / 0.08)" }}>
                <Wallet size={18} style={{ color: "hsl(var(--accent))" }} />
              </div>
              <h3 className="mt-4 text-[15px] font-medium">Works With Everything</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                Zelle, Venmo, check, wire, PayPal, crypto. We track due dates, not payment processors.
              </p>
            </Reveal>
          </div>
        </section>
      </Reveal>

      {/* How It Works (Dark Section) */}
      <Reveal>
        <section className="bg-[var(--text-primary)] text-white relative">
          <div className="max-w-6xl mx-auto px-6 py-20 lg:py-28">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-[-0.02em]">How it works</h2>
            </div>
            <div className="mt-14 grid md:grid-cols-3 gap-10 lg:gap-12 stagger">
              <Reveal>
                <div>
                  <span className="text-3xl font-light text-white/20">01</span>
                  <div className="mt-3 w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "hsl(var(--accent) / 0.2)" }}>
                    <Send size={18} style={{ color: "hsl(var(--accent))" }} />
                  </div>
                  <h3 className="mt-4 text-[15px] font-medium">Forward Your Invoice</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    Send any invoice email to followup@invoicenudge.com. That&apos;s it — no signup forms, no integrations.
                  </p>
                </div>
              </Reveal>
              <Reveal>
                <div>
                  <span className="text-3xl font-light text-white/20">02</span>
                  <div className="mt-3 w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "hsl(var(--accent) / 0.2)" }}>
                    <Clock size={18} style={{ color: "hsl(var(--accent))" }} />
                  </div>
                  <h3 className="mt-4 text-[15px] font-medium">AI Schedules Reminders</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    We extract the due date and set up Day 0/7/14/21 reminders automatically. AI drafts messages that match your tone.
                  </p>
                </div>
              </Reveal>
              <Reveal>
                <div>
                  <span className="text-3xl font-light text-white/20">03</span>
                  <div className="mt-3 w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "hsl(var(--accent) / 0.2)" }}>
                    <Check size={18} style={{ color: "hsl(var(--accent))" }} />
                  </div>
                  <h3 className="mt-4 text-[15px] font-medium">You Get Paid</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    Polite, professional nudges go out. Client pays. You never chase again.
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-[-0.02em]">Built for people like you</h2>
            <p className="mt-4 text-[var(--text-secondary)]">See how different freelancers would use InvoiceNudge.</p>
          </div>
          <div className="mt-14 grid md:grid-cols-3 gap-6 stagger">
            <Reveal>
              <div className="p-6 rounded-xl border border-[var(--border)] bg-white">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "hsl(var(--accent) / 0.08)" }}>
                  <Palette size={18} style={{ color: "hsl(var(--accent))" }} />
                </div>
                <p className="mt-4 text-xs font-medium uppercase tracking-wider" style={{ color: "hsl(var(--accent))" }}>The Solo Designer</p>
                <p className="mt-1 text-xs text-[var(--text-tertiary)]">3-5 retainer clients • $8K-15K/month</p>
                <p className="mt-4 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                  Manages a handful of ongoing clients, invoices monthly. Uses InvoiceNudge to eliminate the &quot;awkward second email&quot; entirely. Reclaims 6 hours/month previously spent on follow-ups.
                </p>
              </div>
            </Reveal>
            <Reveal>
              <div className="p-6 rounded-xl border border-[var(--border)] bg-white">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "hsl(var(--accent) / 0.08)" }}>
                  <Briefcase size={18} style={{ color: "hsl(var(--accent))" }} />
                </div>
                <p className="mt-4 text-xs font-medium uppercase tracking-wider" style={{ color: "hsl(var(--accent))" }}>The Busy Consultant</p>
                <p className="mt-1 text-xs text-[var(--text-tertiary)]">10+ active projects • $20K-40K/month</p>
                <p className="mt-4 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                  Juggling multiple projects at any time. Forwards every invoice automatically. Dashboard shows average payment time dropped from 42 days to 26 days — a 38% improvement.
                </p>
              </div>
            </Reveal>
            <Reveal>
              <div className="p-6 rounded-xl border border-[var(--border)] bg-white">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "hsl(var(--accent) / 0.08)" }}>
                  <Users size={18} style={{ color: "hsl(var(--accent))" }} />
                </div>
                <p className="mt-4 text-xs font-medium uppercase tracking-wider" style={{ color: "hsl(var(--accent))" }}>The Growing Agency</p>
                <p className="mt-1 text-xs text-[var(--text-tertiary)]">Team of 3 • 30+ invoices/month</p>
                <p className="mt-4 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                  Managing multiple clients with a small team. White-label reminders keep brand consistent across all communications. Autopilot mode means zero manual follow-ups.
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      </Reveal>

      {/* Pricing */}
      <Reveal>
        <section id="pricing" className="bg-[var(--bg-secondary)] relative">
          <div className="max-w-5xl mx-auto px-6 py-20 lg:py-28">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-[-0.02em]">Simple pricing</h2>
              <p className="mt-3 text-sm text-[var(--text-tertiary)]">Planned launch pricing — founding members lock in these rates forever</p>
            </div>
            <div className="mt-14 grid md:grid-cols-3 gap-6 stagger">
              <Reveal>
                <div className="p-6 sm:p-8 rounded-xl border border-[var(--border)] bg-white flex flex-col h-full">
                  <p className="text-sm font-medium text-[var(--text-secondary)]">Starter</p>
                  <p className="mt-2 flex items-baseline gap-1">
                    <span className="text-3xl font-medium">$19</span>
                    <span className="text-sm text-[var(--text-tertiary)]">/mo</span>
                  </p>
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
                      Preview Mode (approve before send)
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
                <div className="p-6 sm:p-8 rounded-xl border bg-white flex flex-col h-full pricing-recommended ring-1 ring-[hsl(var(--accent)/0.2)]">
                  <span className="self-start text-xs font-medium px-2.5 py-0.5 rounded-full mb-4" style={{ background: "hsl(var(--accent) / 0.1)", color: "hsl(var(--accent))" }}>
                    Recommended
                  </span>
                  <p className="text-sm font-medium text-[var(--text-secondary)]">Pro</p>
                  <p className="mt-2 flex items-baseline gap-1">
                    <span className="text-3xl font-medium">$49</span>
                    <span className="text-sm text-[var(--text-tertiary)]">/mo</span>
                  </p>
                  <ul className="mt-6 space-y-3 flex-1">
                    <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <Check size={14} className="mt-0.5 shrink-0" style={{ color: "hsl(var(--accent))" }} />
                      50 invoices/month
                    </li>
                    <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <Check size={14} className="mt-0.5 shrink-0" style={{ color: "hsl(var(--accent))" }} />
                      Autopilot Mode (no approval needed)
                    </li>
                    <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <Check size={14} className="mt-0.5 shrink-0" style={{ color: "hsl(var(--accent))" }} />
                      Custom reminder schedules
                    </li>
                    <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <Check size={14} className="mt-0.5 shrink-0" style={{ color: "hsl(var(--accent))" }} />
                      Client reply detection
                    </li>
                    <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <Check size={14} className="mt-0.5 shrink-0" style={{ color: "hsl(var(--accent))" }} />
                      Priority support (4hr response)
                    </li>
                  </ul>
                  <a
                    href="#waitlist"
                    className="mt-8 block text-center py-2.5 rounded-lg text-sm font-medium btn-primary"
                  >
                    Join Waitlist
                  </a>
                </div>
              </Reveal>
              <Reveal>
                <div className="p-6 sm:p-8 rounded-xl border border-[var(--border)] bg-white flex flex-col h-full">
                  <p className="text-sm font-medium text-[var(--text-secondary)]">Agency</p>
                  <p className="mt-2 flex items-baseline gap-1">
                    <span className="text-3xl font-medium">$149</span>
                    <span className="text-sm text-[var(--text-tertiary)]">/mo</span>
                  </p>
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
                      API access
                    </li>
                    <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <Check size={14} className="mt-0.5 shrink-0" style={{ color: "hsl(var(--accent))" }} />
                      Dedicated account manager
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-[-0.02em] text-center">Frequently asked questions</h2>
          <div className="mt-12 border-t border-[var(--border)]">
            <FaqItem
              question="When does InvoiceNudge launch?"
              answer="April 2026. Join the waitlist to be notified first and lock in founding member pricing ($19/month forever, even when the public price rises to $29)."
            />
            <FaqItem
              question="Will there be a free trial?"
              answer="Yes — 7-day free trial, no credit card required. Forward your first invoice and see if AI matches your tone before you commit."
            />
            <FaqItem
              question="What if the AI says something embarrassing?"
              answer="Preview Mode lets you approve every email before it sends. You're always in control. After you've approved 5+ messages and trust the AI, you can optionally enable Autopilot Mode."
            />
            <FaqItem
              question="Does this work with my existing invoicing tool?"
              answer="Yes. We don't replace your invoicing — we just add smart reminders. Works with FreshBooks, Wave, Bonsai, QuickBooks, or plain PDF invoices. Just forward any invoice email to us."
            />
            <FaqItem
              question="What if my client replies 'I already paid'?"
              answer="Pro plan includes reply detection. When a client responds (confirming payment, asking questions, etc.), we automatically pause reminders and notify you."
            />
            <FaqItem
              question="Will my emails go to spam?"
              answer="We use Resend with 98%+ deliverability (same infrastructure as Linear and Vercel). SPF/DKIM/DMARC are configured automatically. Our beta testers report 85-90% open rates."
            />
            <FaqItem
              question="Can I cancel anytime?"
              answer="Yes. No contracts, no commitments. Cancel in one click from your dashboard. We also offer a 60-day money-back guarantee — if you don't get paid faster, you don't pay."
            />
            <FaqItem
              question="What payment methods does this support?"
              answer="All of them. InvoiceNudge tracks due dates, not payment processors. Works with Zelle, Venmo, checks, wire transfers, PayPal, Stripe, crypto — whatever your clients use."
            />
          </div>
        </section>
      </Reveal>

      {/* Final CTA */}
      <Reveal>
        <section id="waitlist" className="bg-[var(--bg-secondary)] relative">
          <div className="max-w-2xl mx-auto px-6 py-20 lg:py-28 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-[-0.02em]">Stop letting late payments run your life</h2>
            <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
              Founding members lock in $19/month forever — price rises to $29 after launch. Be one of the first to automate the awkward chase.
            </p>
            <div className="mt-8 flex justify-center">
              <WaitlistForm />
            </div>
            <p className="mt-4 text-xs text-[var(--text-tertiary)]">No spam. Just a launch notification + founding member access.</p>
          </div>
        </section>
      </Reveal>

      {/* Footer */}
      <footer className="border-t border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <span className="text-sm text-[var(--text-tertiary)]">&copy; 2026 InvoiceNudge. All rights reserved.</span>
            <div className="flex items-center gap-6 text-sm text-[var(--text-tertiary)]">
              <a href="#features" className="hover:text-[var(--text-secondary)] transition-colors">Features</a>
              <a href="#pricing" className="hover:text-[var(--text-secondary)] transition-colors">Pricing</a>
              <a href="#faq" className="hover:text-[var(--text-secondary)] transition-colors">FAQ</a>
              <a href="/privacy" className="hover:text-[var(--text-secondary)] transition-colors">Privacy</a>
              <a href="/terms" className="hover:text-[var(--text-secondary)] transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-[var(--bg-primary)] border-t border-[var(--border)] p-4 z-40">
        <a href="#waitlist" className="btn-primary w-full py-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2">
          Join Waitlist <ArrowRight size={14} />
        </a>
      </div>
    </main>
  );
}