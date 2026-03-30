"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Mail,
  Clock,
  Send,
  Bell,
  Shield,
  Zap,
  BarChart3,
  CreditCard,
  Users,
  Eye,
  Calendar,
  MessageSquare,
  Twitter,
  AlertCircle,
  Timer,
  DollarSign,
  FileText,
  Sparkles,
  Menu,
  X,
} from "lucide-react";

/* ─── Scroll Reveal Hook ────────────────────────────────────────────────── */
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

/* ─── Waitlist Form ─────────────────────────────────────────────────────── */
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
        <Check size={16} /> You&apos;re on the list! We&apos;ll email you April 15, 2026.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`flex gap-3 ${compact ? "flex-col sm:flex-row" : "flex-col sm:flex-row max-w-md"}`}>
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

/* ─── Mobile Nav ────────────────────────────────────────────────────────── */
function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="md:hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="p-2 text-[var(--text-secondary)]"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b border-[var(--border)] p-4 space-y-4">
          <a href="#features" onClick={() => setIsOpen(false)} className="block text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Features</a>
          <a href="#pricing" onClick={() => setIsOpen(false)} className="block text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Pricing</a>
          <a href="#faq" onClick={() => setIsOpen(false)} className="block text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]">FAQ</a>
          <a href="#waitlist" onClick={() => setIsOpen(false)} className="btn-primary px-4 py-2 rounded-lg text-sm font-medium inline-flex items-center gap-1.5">
            Join Waitlist <ArrowRight size={13} />
          </a>
        </div>
      )}
    </div>
  );
}

/* ─── Browser Chrome Mockup ─────────────────────────────────────────────── */
function BrowserMockup({ children }: { children: React.ReactNode }) {
  return (
    <div className="browser-chrome">
      <div className="browser-chrome-bar">
        <div className="browser-dot" style={{ background: "#FF5F57" }} />
        <div className="browser-dot" style={{ background: "#FFBD2E" }} />
        <div className="browser-dot" style={{ background: "#28CA42" }} />
        <div className="browser-url font-mono">invoicenudge.com/dashboard</div>
      </div>
      <div className="p-4 sm:p-6">{children}</div>
    </div>
  );
}

/* ─── Product Mockup ────────────────────────────────────────────────────── */
function ProductMockup() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <Bell size={16} style={{ color: "hsl(var(--accent))" }} />
          <span className="text-sm font-medium">Active Reminders</span>
        </div>
        <span className="text-xs text-[var(--text-tertiary)]">3 invoices</span>
      </div>
      
      {/* Invoice Cards */}
      <div className="space-y-3">
        {/* Invoice 1 - Sent */}
        <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--bg-secondary)]">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "hsl(var(--accent) / 0.1)" }}>
            <FileText size={16} style={{ color: "hsl(var(--accent))" }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">Logo Design Project</div>
            <div className="text-xs text-[var(--text-tertiary)]">$2,400 • Due Jan 15</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1 text-xs text-[var(--text-tertiary)]">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Day 7 sent</span>
            </div>
            <div className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600">
              On Track
            </div>
          </div>
        </div>

        {/* Invoice 2 - Pending */}
        <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--bg-secondary)]">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-amber-50">
            <FileText size={16} className="text-amber-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">Website Redesign</div>
            <div className="text-xs text-[var(--text-tertiary)]">$5,800 • Due Jan 22</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1 text-xs text-[var(--text-tertiary)]">
              <div className="w-2 h-2 rounded-full bg-amber-500 pulse-gentle" />
              <span>Day 14 queued</span>
            </div>
            <div className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-50 text-amber-600">
              Pending
            </div>
          </div>
        </div>

        {/* Invoice 3 - Paid */}
        <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--bg-secondary)] opacity-60">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-gray-100">
            <Check size={16} className="text-gray-500" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">Brand Guidelines</div>
            <div className="text-xs text-[var(--text-tertiary)]">$1,200 • Paid Jan 8</div>
          </div>
          <div className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
            Collected
          </div>
        </div>
      </div>

      {/* Timeline Preview */}
      <div className="mt-4 pt-4 border-t border-[var(--border)]">
        <div className="flex items-center justify-between text-xs text-[var(--text-tertiary)] mb-3">
          <span>Reminder Timeline</span>
          <span>Logo Design Project</span>
        </div>
        <div className="flex items-center justify-between">
          {[
            { day: "Day 0", status: "done", label: "Sent" },
            { day: "Day 7", status: "done", label: "Sent" },
            { day: "Day 14", status: "next", label: "Jan 22" },
            { day: "Day 21", status: "pending", label: "Jan 29" },
          ].map((step, i) => (
            <div key={i} className="flex flex-col items-center">
              <div
                className={`w-3 h-3 rounded-full ${
                  step.status === "done"
                    ? "bg-emerald-500"
                    : step.status === "next"
                    ? "bg-amber-500 pulse-gentle"
                    : "bg-gray-200"
                }`}
              />
              <span className="text-[10px] font-medium mt-1">{step.day}</span>
              <span className="text-[10px] text-[var(--text-tertiary)]">{step.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── FAQ Item ──────────────────────────────────────────────────────────── */
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

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════════════════ */
export default function LandingPage() {
  return (
    <main className="relative noise">
      {/* ── Nav ──────────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-[var(--bg-primary)]/80 border-b border-[var(--border-subtle)]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell size={18} style={{ color: "hsl(var(--accent))" }} />
            <span className="text-[15px] font-medium tracking-tight">InvoiceNudge</span>
          </div>
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
            <a
              href="#waitlist"
              className="btn-primary px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5"
            >
              Join Waitlist <ArrowRight size={13} />
            </a>
          </div>
          <MobileNav />
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-40" />
        <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-16 lg:pt-24 lg:pb-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — Copy */}
            <div className="stagger">
              <p
                className="hero-enter hero-enter-1 text-sm font-medium tracking-wide uppercase"
                style={{ color: "hsl(var(--accent))" }}
              >
                Launching April 15, 2026
              </p>
              <h1 className="hero-enter hero-enter-2 mt-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-[-0.02em] leading-[1.05] text-[var(--text-primary)]">
                Never Chase Late Payments Again
              </h1>
              <p className="hero-enter hero-enter-3 mt-6 text-lg sm:text-xl leading-relaxed text-[var(--text-secondary)] max-w-lg">
                Forward your invoice. We handle the follow-ups. AI-powered reminders that sound like you — sent automatically on Day 0, 7, 14, and 21.
              </p>
              <div className="hero-enter hero-enter-4 mt-8">
                <WaitlistForm />
              </div>
              <p className="hero-enter hero-enter-5 mt-4 text-xs text-[var(--text-tertiary)]">
                Be one of the first 500 to lock in founding member pricing. No credit card required.
              </p>
            </div>

            {/* Right — Product Mockup */}
            <div className="hero-enter hero-enter-5 hidden lg:block">
              <BrowserMockup>
                <ProductMockup />
              </BrowserMockup>
            </div>
          </div>
        </div>
      </section>

      {/* ── Credibility Bar ──────────────────────────────────────────────── */}
      <Reveal>
        <section className="border-y border-[var(--border)] bg-[var(--bg-secondary)]">
          <div className="max-w-6xl mx-auto px-6 py-10 text-center">
            <p className="text-[15px] text-[var(--text-secondary)]">
              Built for freelancers who&apos;d rather create than collect
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-[14px] text-[var(--text-tertiary)]">
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>Gmail</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>Outlook</span>
              </div>
              <div className="flex items-center gap-2">
                <Send size={16} />
                <span>Any Email Client</span>
              </div>
            </div>
            <p className="mt-6 text-sm text-[var(--text-tertiary)]">
              <span className="font-medium text-[var(--text-secondary)]">85% of freelancers</span> experience late payments.
              Average payment time: <span className="font-medium text-[var(--text-secondary)]">39 days</span>.
            </p>
          </div>
        </section>
      </Reveal>

      {/* ── Problem / Pain Points ────────────────────────────────────────── */}
      <Reveal>
        <section className="max-w-6xl mx-auto px-6 py-20 lg:py-28">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-[-0.02em]">
              The Late Payment Problem
            </h2>
            <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
              Every freelancer knows the pain. Here&apos;s what you&apos;re dealing with.
            </p>
          </div>
          <div className="mt-12 lg:mt-16 grid md:grid-cols-3 gap-6 lg:gap-8 stagger">
            {[
              {
                icon: AlertCircle,
                title: "The Anxiety Loop",
                desc: "You send an invoice, then spend weeks checking your bank account. Each day unpaid adds stress. 42% of freelancers miss personal bills due to late client payments.",
              },
              {
                icon: MessageSquare,
                title: "The Awkward Chase",
                desc: "Writing follow-up emails is uncomfortable. You don't want to seem desperate or damage the relationship. So invoices slip through the cracks.",
              },
              {
                icon: Timer,
                title: "The Time Drain",
                desc: "Freelancers spend 8-12 hours monthly chasing payments. That's 3 full work weeks per year you could spend on actual client work.",
              },
            ].map((pain, i) => (
              <Reveal key={i}>
                <div className="p-6 lg:p-8 rounded-xl border border-[var(--border)] bg-white">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: "hsl(var(--accent) / 0.08)" }}
                  >
                    <pain.icon size={18} style={{ color: "hsl(var(--accent))" }} />
                  </div>
                  <h3 className="mt-4 text-[15px] font-medium">{pain.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-secondary)]">{pain.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ── Solution (Before / After) ────────────────────────────────────── */}
      <Reveal>
        <section className="bg-[var(--bg-secondary)] relative noise">
          <div className="max-w-6xl mx-auto px-6 py-20 lg:py-28">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-[-0.02em]">
                Your New Reality
              </h2>
            </div>
            <div className="mt-12 lg:mt-16 grid md:grid-cols-2 gap-6">
              {/* Before */}
              <div className="p-6 lg:p-8 rounded-xl border border-[var(--border)] bg-white">
                <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-tertiary)]">Before</p>
                <ul className="mt-4 space-y-3">
                  {[
                    "Send invoice → wait anxiously for weeks",
                    "Draft awkward follow-up email (30 min of agonizing)",
                    "Client ignores → draft another follow-up",
                    "Payment arrives 30-45 days late (if at all)",
                    "8-12 hours/month wasted on chasing",
                  ].map((item, i) => (
                    <li key={i} className="text-sm text-[var(--text-secondary)] flex items-start gap-2">
                      <span className="text-[var(--text-tertiary)] mt-0.5">&times;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              {/* After */}
              <div className="p-6 lg:p-8 rounded-xl border border-[hsl(var(--accent)/0.2)] bg-[hsl(var(--accent-light))]">
                <p className="text-xs font-medium uppercase tracking-wider" style={{ color: "hsl(var(--accent))" }}>
                  After
                </p>
                <ul className="mt-4 space-y-3">
                  {[
                    "Forward invoice to InvoiceNudge (10 seconds)",
                    "AI sends Day 0 confirmation automatically",
                    "Day 7, 14, 21 reminders sent on schedule",
                    "Client pays without you lifting a finger",
                    "Zero time spent on collections",
                  ].map((item, i) => (
                    <li key={i} className="text-sm text-[var(--text-primary)] flex items-start gap-2">
                      <Check size={14} className="mt-0.5 shrink-0" style={{ color: "hsl(var(--accent))" }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── Features (Bento Grid) ────────────────────────────────────────── */}
      <Reveal>
        <section id="features" className="max-w-6xl mx-auto px-6 py-20 lg:py-28">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-[-0.02em]">
              Everything You Need
            </h2>
            <p className="mt-4 text-[var(--text-secondary)]">
              Simple tools designed for freelancers, not accountants.
            </p>
          </div>
          {/* Bento: 2 large + 4 small */}
          <div className="mt-12 lg:mt-16 grid md:grid-cols-3 gap-4 stagger">
            {/* Large card — spans 2 cols */}
            <Reveal className="md:col-span-2 p-6 lg:p-8 rounded-xl border border-[var(--border)] bg-white">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: "hsl(var(--accent) / 0.08)" }}
              >
                <Zap size={18} style={{ color: "hsl(var(--accent))" }} />
              </div>
              <h3 className="mt-4 text-lg font-medium">60-Second Setup</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-secondary)] max-w-md">
                Forward any invoice to followup@invoicenudge.com. AI extracts client name, amount, and due date. Your first reminder is queued instantly. No integrations, no forms, no friction.
              </p>
            </Reveal>
            {/* Small card */}
            <Reveal className="p-6 lg:p-8 rounded-xl border border-[var(--border)] bg-white">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: "hsl(var(--accent) / 0.08)" }}
              >
                <Sparkles size={18} style={{ color: "hsl(var(--accent))" }} />
              </div>
              <h3 className="mt-4 text-[15px] font-medium">AI That Sounds Like You</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                Our AI learns your communication style. Casual client? Casual reminders. Formal contract? Professional follow-ups.
              </p>
            </Reveal>
            {/* Small card */}
            <Reveal className="p-6 lg:p-8 rounded-xl border border-[var(--border)] bg-white">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: "hsl(var(--accent) / 0.08)" }}
              >
                <Eye size={18} style={{ color: "hsl(var(--accent))" }} />
              </div>
              <h3 className="mt-4 text-[15px] font-medium">Preview Mode</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                See every email before it sends. Approve, edit, or skip. Build trust, then unlock Autopilot when ready.
              </p>
            </Reveal>
            {/* Large card — spans 2 cols */}
            <Reveal className="md:col-span-2 p-6 lg:p-8 rounded-xl border border-[var(--border)] bg-white">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: "hsl(var(--accent) / 0.08)" }}
              >
                <Calendar size={18} style={{ color: "hsl(var(--accent))" }} />
              </div>
              <h3 className="mt-4 text-lg font-medium">Escalating Politeness</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-secondary)] max-w-md">
                Day 0: Friendly confirmation. Day 7: Gentle check-in. Day 14: Clear follow-up. Day 21: Firm but professional final notice. Each reminder escalates appropriately.
              </p>
            </Reveal>
            {/* Small card */}
            <Reveal className="p-6 lg:p-8 rounded-xl border border-[var(--border)] bg-white">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: "hsl(var(--accent) / 0.08)" }}
              >
                <BarChart3 size={18} style={{ color: "hsl(var(--accent))" }} />
              </div>
              <h3 className="mt-4 text-[15px] font-medium">Payment Dashboard</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                Track average days-to-payment. See time saved quantified: &quot;You saved 9.2 hours this month.&quot;
              </p>
            </Reveal>
            {/* Small card */}
            <Reveal className="p-6 lg:p-8 rounded-xl border border-[var(--border)] bg-white">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: "hsl(var(--accent) / 0.08)" }}
              >
                <CreditCard size={18} style={{ color: "hsl(var(--accent))" }} />
              </div>
              <h3 className="mt-4 text-[15px] font-medium">Any Payment Method</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                Zelle, Venmo, PayPal, bank transfer, check, crypto. We remind — you get paid however works for you.
              </p>
            </Reveal>
          </div>
        </section>
      </Reveal>

      {/* ── How It Works ─────────────────────────────────────────────────── */}
      <Reveal>
        <section className="bg-[var(--text-primary)] text-white relative noise">
          <div className="max-w-6xl mx-auto px-6 py-20 lg:py-28">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-[-0.02em]">How It Works</h2>
              <p className="mt-4 text-white/60">Three steps. Under 60 seconds total.</p>
            </div>
            <div className="mt-12 lg:mt-16 grid md:grid-cols-3 gap-8 lg:gap-12 stagger">
              {[
                {
                  step: "01",
                  icon: Mail,
                  title: "Forward Your Invoice",
                  desc: "Send your invoice email to followup@invoicenudge.com. That's it. Takes 10 seconds.",
                },
                {
                  step: "02",
                  icon: Sparkles,
                  title: "AI Parses Everything",
                  desc: "We extract client email, invoice amount, and due date automatically. No manual data entry.",
                },
                {
                  step: "03",
                  icon: Send,
                  title: "Reminders Send",
                  desc: "AI sends polite reminders on Day 0, 7, 14, and 21. Approve each one or let Autopilot handle it.",
                },
              ].map((s, i) => (
                <Reveal key={i}>
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl font-light text-white/20">{s.step}</span>
                      <s.icon size={20} className="text-white/60" />
                    </div>
                    <h3 className="text-[15px] font-medium">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">{s.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── Use Cases ────────────────────────────────────────────────────── */}
      <Reveal>
        <section className="max-w-6xl mx-auto px-6 py-20 lg:py-28">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-[-0.02em]">Built For Freelancers Like You</h2>
            <p className="mt-4 text-[var(--text-secondary)]">
              Whether you&apos;re solo or scaling, InvoiceNudge adapts to your workflow.
            </p>
          </div>
          <div className="mt-12 lg:mt-16 grid md:grid-cols-3 gap-6 stagger">
            {[
              {
                icon: Users,
                role: "The Solo Designer",
                context: "5-8 clients monthly • Hates awkward follow-ups",
                narrative:
                  "Juggles multiple projects and dreads the \"did you see my invoice?\" conversation. Uses InvoiceNudge to automate follow-ups while maintaining their friendly brand voice. Preview Mode ensures every email feels personal.",
              },
              {
                icon: DollarSign,
                role: "The Busy Consultant",
                context: "$5k-15k per project • NET-30 terms",
                narrative:
                  "Bills high-value projects and can't afford to spend time chasing — their time is worth $150/hour. Autopilot mode means zero hours spent on collections. Dashboard tracks every outstanding invoice at a glance.",
              },
              {
                icon: BarChart3,
                role: "The Growing Agency",
                context: "Multiple team members • Dozens of invoices monthly",
                narrative:
                  "Managing multiple team members means invoices can slip through the cracks. Team dashboard shows all outstanding payments in one place. White-label emails maintain professional brand consistency.",
              },
            ].map((uc, i) => (
              <Reveal key={i}>
                <div className="p-6 lg:p-8 rounded-xl border border-[var(--border)] bg-white h-full flex flex-col">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ background: "hsl(var(--accent) / 0.08)" }}
                    >
                      <uc.icon size={18} style={{ color: "hsl(var(--accent))" }} />
                    </div>
                    <div>
                      <p className="text-sm font-medium" style={{ color: "hsl(var(--accent))" }}>
                        {uc.role}
                      </p>
                      <p className="text-xs text-[var(--text-tertiary)]">{uc.context}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-[15px] leading-relaxed text-[var(--text-secondary)] flex-1">{uc.narrative}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ── Founder Section ──────────────────────────────────────────────── */}
      <Reveal>
        <section className="bg-[var(--bg-secondary)] relative noise">
          <div className="max-w-4xl mx-auto px-6 py-20 lg:py-28">
            <div className="grid md:grid-cols-[1fr_2fr] gap-8 lg:gap-12 items-center">
              <div className="flex flex-col items-center md:items-start">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                  <Users size={32} className="text-amber-600" />
                </div>
                <div className="mt-4 text-center md:text-left">
                  <p className="text-[15px] font-medium">Built by a Fellow Freelancer</p>
                  <a
                    href="https://twitter.com/pointlinedev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1.5 text-sm text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
                  >
                    <Twitter size={14} />
                    @pointlinedev
                  </a>
                </div>
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-medium tracking-[-0.01em]">Why I Built This</h2>
                <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                  <p>
                    I&apos;ve been freelancing for years. The work is great. The clients are (mostly) great. But chasing payments? That part is awful.
                  </p>
                  <p>
                    I spent 10+ hours every month drafting awkward follow-up emails, checking my bank account obsessively, and stressing about whether I&apos;d make rent. All while clients happily used the work I delivered.
                  </p>
                  <p>
                    So I built InvoiceNudge — the tool I wish existed. Forward an invoice, and AI handles the rest. No integrations. No accounting software. Just polite, professional reminders that sound like you wrote them.
                  </p>
                  <p className="font-medium text-[var(--text-primary)]">
                    Launching April 15, 2026. Join the waitlist and be one of the first to try it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── Pricing ──────────────────────────────────────────────────────── */}
      <Reveal>
        <section id="pricing" className="max-w-5xl mx-auto px-6 py-20 lg:py-28">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-[-0.02em]">Simple, Transparent Pricing</h2>
            <p className="mt-3 text-sm text-[var(--text-tertiary)]">
              Planned launch pricing — founding members lock in these rates forever
            </p>
          </div>
          <div className="mt-12 lg:mt-16 grid md:grid-cols-3 gap-6 stagger">
            {[
              {
                name: "Starter",
                price: "$19",
                period: "/mo",
                features: [
                  "10 invoices/month",
                  "AI-powered reminders (Day 0/7/14/21)",
                  "Preview Mode — approve before send",
                  "Email-forward workflow",
                  "Basic payment dashboard",
                ],
                recommended: false,
              },
              {
                name: "Pro",
                price: "$49",
                period: "/mo",
                features: [
                  "50 invoices/month",
                  "Everything in Starter, plus:",
                  "Autopilot Mode — hands-free reminders",
                  "Client reply detection",
                  "Custom reminder schedules",
                  "Priority support (4hr response)",
                ],
                recommended: true,
              },
              {
                name: "Agency",
                price: "$149",
                period: "/mo",
                features: [
                  "Unlimited invoices",
                  "Everything in Pro, plus:",
                  "3 team seats included",
                  "White-label emails",
                  "Multi-client dashboard",
                  "Dedicated account manager",
                ],
                recommended: false,
              },
            ].map((tier, i) => (
              <Reveal key={i}>
                <div
                  className={`p-6 lg:p-8 rounded-xl border bg-white flex flex-col ${
                    tier.recommended ? "pricing-recommended ring-1 ring-[hsl(var(--accent)/0.2)]" : "border-[var(--border)]"
                  }`}
                >
                  {tier.recommended && (
                    <span
                      className="self-start text-xs font-medium px-2.5 py-0.5 rounded-full mb-4"
                      style={{ background: "hsl(var(--accent) / 0.1)", color: "hsl(var(--accent))" }}
                    >
                      Most Popular
                    </span>
                  )}
                  <p className="text-sm font-medium text-[var(--text-secondary)]">{tier.name}</p>
                  <p className="mt-2 flex items-baseline gap-1">
                    <span className="text-3xl font-medium">{tier.price}</span>
                    <span className="text-sm text-[var(--text-tertiary)]">{tier.period}</span>
                  </p>
                  <ul className="mt-6 space-y-3 flex-1">
                    {tier.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                        <Check size={14} className="mt-0.5 shrink-0" style={{ color: "hsl(var(--accent))" }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#waitlist"
                    className={`mt-8 block text-center py-2.5 rounded-lg text-sm font-medium transition-all ${
                      tier.recommended
                        ? "btn-primary"
                        : "border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    Join Waitlist
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
          {/* Guarantee */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] bg-white">
              <Shield size={16} style={{ color: "hsl(var(--accent))" }} />
              <span className="text-sm text-[var(--text-secondary)]">
                60-day money-back guarantee — no questions asked
              </span>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <Reveal>
        <section id="faq" className="bg-[var(--bg-secondary)] relative noise">
          <div className="max-w-3xl mx-auto px-6 py-20 lg:py-28">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-[-0.02em] text-center">
              Frequently Asked Questions
            </h2>
            <div className="mt-12 border-t border-[var(--border)] bg-white rounded-xl overflow-hidden">
              <FaqItem
                question="When does InvoiceNudge launch?"
                answer="April 15, 2026. Waitlist members get early access starting April 1st, plus founding member pricing locked in forever ($19/mo vs $29/mo public price)."
              />
              <FaqItem
                question="What if the AI writes something wrong?"
                answer="Preview Mode lets you approve every email before it sends. You're always in control. After you've approved 5+ reminders and trust the AI, you can unlock Autopilot Mode — or stay in Preview Mode forever."
              />
              <FaqItem
                question="Will emails land in spam?"
                answer="We use Resend, the same email infrastructure as Linear and Vercel (98%+ deliverability). SPF, DKIM, and DMARC are configured automatically. Our beta testers report 85-90% open rates."
              />
              <FaqItem
                question="Do I need to connect my accounting software?"
                answer="No. Just forward invoices via email. No QuickBooks, no Xero, no integrations required. Works with any email client: Gmail, Outlook, Apple Mail, etc."
              />
              <FaqItem
                question="What about invoices I've already sent?"
                answer="Forward them anytime. If they're overdue, AI will send the first reminder within 24 hours. If they're not yet due, reminders start on the due date."
              />
              <FaqItem
                question="Can I customize the reminder schedule?"
                answer="Pro and Agency plans include custom schedules. You can change Day 0/7/14/21 to whatever works for your business (e.g., Day 1/3/7/14 for faster follow-up)."
              />
              <FaqItem
                question="Is there a money-back guarantee?"
                answer="Yes — 60-day refund, no questions asked. Test two full billing cycles. If InvoiceNudge doesn't save you time, email us and we'll refund 100% of your subscription."
              />
              <FaqItem
                question="Why not just use FreshBooks or Wave?"
                answer="FreshBooks ($19-60/mo) and Wave (free) bundle reminders with full accounting you may not need. InvoiceNudge does one thing exceptionally well: AI-powered reminders that match your tone. No accounting overhead, lower price, better personalization."
              />
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── Final CTA ────────────────────────────────────────────────────── */}
      <Reveal>
        <section id="waitlist" className="relative noise">
          <div className="max-w-2xl mx-auto px-6 py-20 lg:py-28 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-[-0.02em]">
              Stop Anxiety-Checking Your Bank Account
            </h2>
            <p className="mt-4 text-[var(--text-secondary)] leading-relaxed max-w-lg mx-auto">
              Join the waitlist for InvoiceNudge. Launching April 15, 2026. First 500 members lock in founding member pricing forever.
            </p>
            <div className="mt-8 flex justify-center">
              <WaitlistForm />
            </div>
            <p className="mt-4 text-xs text-[var(--text-tertiary)]">No spam. Just a launch notification and early access.</p>
          </div>
        </section>
      </Reveal>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="border-t border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <Bell size={16} style={{ color: "hsl(var(--accent))" }} />
              <span className="text-sm text-[var(--text-tertiary)]">&copy; 2026 InvoiceNudge. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-[var(--text-tertiary)]">
              <a href="/privacy" className="hover:text-[var(--text-secondary)] transition-colors">
                Privacy
              </a>
              <a href="/terms" className="hover:text-[var(--text-secondary)] transition-colors">
                Terms
              </a>
              <a
                href="https://twitter.com/pointlinedev"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--text-secondary)] transition-colors flex items-center gap-1"
              >
                <Twitter size={14} />
                Twitter
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}