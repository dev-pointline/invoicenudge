"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Mail,
  Clock,
  DollarSign,
  Heart,
  Send,
  Eye,
  Zap,
  BarChart3,
  Shuffle,
  Forward,
  Bot,
  Bell,
  Palette,
  Code,
  Camera,
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
        <Check size={16} /> You&apos;re on the list! We&apos;ll notify you when we launch.
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
      <div className="p-4 sm:p-6 bg-[var(--bg-secondary)]">{children}</div>
    </div>
  );
}

/* ─── Invoice Mockup ────────────────────────────────────────────────────── */
function InvoiceMockup() {
  return (
    <div className="space-y-3">
      {/* Invoice 1 - Active reminder */}
      <div className="flex items-center gap-3 p-4 rounded-lg bg-white border border-[var(--border)]">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "hsl(var(--accent) / 0.1)" }}>
          <Palette size={18} style={{ color: "hsl(var(--accent))" }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium truncate">Acme Corp — Logo Design</span>
          </div>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-xs text-[var(--text-tertiary)]">$2,400</span>
            <span className="text-xs text-[var(--text-tertiary)]">Due Dec 15</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: "hsl(var(--accent) / 0.1)", color: "hsl(var(--accent))" }}>
            Day 7 Sent
          </span>
          <span className="text-[10px] text-[var(--text-tertiary)]">Opened 2h ago</span>
        </div>
      </div>

      {/* Invoice 2 - Paid */}
      <div className="flex items-center gap-3 p-4 rounded-lg bg-white border border-[var(--border)]">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-emerald-50">
          <Code size={18} className="text-emerald-600" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium truncate">TechStart — API Integration</span>
          </div>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-xs text-[var(--text-tertiary)]">$4,800</span>
            <span className="text-xs text-[var(--text-tertiary)]">Paid Dec 10</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600">
            Paid
          </span>
          <span className="text-[10px] text-emerald-600">18 days</span>
        </div>
      </div>

      {/* Invoice 3 - Pending */}
      <div className="flex items-center gap-3 p-4 rounded-lg bg-white border border-[var(--border)]">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-amber-50">
          <Camera size={18} className="text-amber-600" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium truncate">Local Bakery — Product Photos</span>
          </div>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-xs text-[var(--text-tertiary)]">$850</span>
            <span className="text-xs text-[var(--text-tertiary)]">Due Dec 20</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-amber-50 text-amber-600">
            Scheduled
          </span>
          <span className="text-[10px] text-[var(--text-tertiary)]">Day 0 in 3d</span>
        </div>
      </div>

      {/* Stats bar */}
      <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
        <div className="text-center">
          <div className="text-lg font-medium">$8,050</div>
          <div className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider">Outstanding</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-medium text-emerald-600">$12,400</div>
          <div className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider">Collected</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-medium">22 days</div>
          <div className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider">Avg. Payment</div>
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

/* ─── Mobile Nav ────────────────────────────────────────────────────────── */
function MobileNav({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute top-0 right-0 w-64 h-full bg-white p-6 shadow-lg">
        <button onClick={onClose} className="absolute top-4 right-4 p-2">
          <X size={20} />
        </button>
        <nav className="mt-12 flex flex-col gap-6">
          <a href="#features" onClick={onClose} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Features</a>
          <a href="#pricing" onClick={onClose} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Pricing</a>
          <a href="#faq" onClick={onClose} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">FAQ</a>
          <a href="#waitlist" onClick={onClose} className="btn-primary px-4 py-2.5 rounded-lg text-sm font-medium text-center">
            Join Waitlist
          </a>
        </nav>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════════════════ */
export default function LandingPage() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <main className="relative noise">
      <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />

      {/* ── Nav ──────────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-40 backdrop-blur-lg bg-[var(--bg-primary)]/80 border-b border-[var(--border-subtle)]">
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
          <button className="md:hidden p-2" onClick={() => setMobileNavOpen(true)}>
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-40" />
        <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-16 lg:pt-28 lg:pb-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — Copy */}
            <div className="stagger">
              <p className="hero-enter hero-enter-1 text-sm font-medium tracking-wide uppercase" style={{ color: "hsl(var(--accent))" }}>
                For freelancers who hate chasing payments
              </p>
              <h1 className="hero-enter hero-enter-2 mt-4 text-4xl sm:text-5xl lg:text-6xl font-medium tracking-[-0.02em] leading-[1.08] text-[var(--text-primary)]">
                Stop chasing clients.<br />Start getting paid.
              </h1>
              <p className="hero-enter hero-enter-3 mt-6 text-lg sm:text-xl leading-relaxed text-[var(--text-secondary)] max-w-lg">
                Forward your invoices to InvoiceNudge. Our AI sends polite, professional payment reminders that sound like you — not a robot. You focus on the work.
              </p>
              <div className="hero-enter hero-enter-4 mt-8">
                <WaitlistForm />
              </div>
              <p className="hero-enter hero-enter-5 mt-4 text-xs text-[var(--text-tertiary)]">
                Launching April 2026. Be first in line.
              </p>
            </div>

            {/* Right — Product Mockup */}
            <div className="hero-enter hero-enter-5">
              <BrowserMockup>
                <InvoiceMockup />
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
              Built for freelancers who invoice via any method — Stripe, PayPal, Zelle, checks, or wire transfers.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[15px] font-medium text-[var(--text-tertiary)]">
              <span>Gmail</span>
              <span>Outlook</span>
              <span>Stripe</span>
              <span>PayPal</span>
              <span>QuickBooks</span>
              <span>Xero</span>
            </div>
            <p className="mt-6 text-sm text-[var(--text-tertiary)]">
              85% of freelancers experience late payments. You&apos;re not alone.
            </p>
          </div>
        </section>
      </Reveal>

      {/* ── Problem / Pain Points ────────────────────────────────────────── */}
      <Reveal>
        <section className="max-w-6xl mx-auto px-6 py-20 lg:py-28">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-[-0.02em]">
              Late payments cost you more than money
            </h2>
            <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
              Every unpaid invoice drains your time, stresses your finances, and makes client relationships awkward.
            </p>
          </div>
          <div className="mt-12 lg:mt-16 grid md:grid-cols-3 gap-6 lg:gap-8 stagger">
            {[
              {
                icon: Clock,
                title: "Wasted Hours",
                desc: "Freelancers spend 8-12 hours monthly writing awkward \"just checking in\" emails. That's 120+ hours per year you're not billing.",
              },
              {
                icon: DollarSign,
                title: "Cash Flow Chaos",
                desc: "When a $3,000 invoice sits unpaid for 45 days, rent becomes a question mark. 40% of freelancers miss personal bills due to late payments.",
              },
              {
                icon: Heart,
                title: "Relationship Anxiety",
                desc: "You don't want to seem pushy, so you wait. And wait. And then the email feels even more awkward to send.",
              },
            ].map((pain, i) => (
              <Reveal key={i}>
                <div className="p-6 lg:p-8 rounded-xl border border-[var(--border)] bg-white">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "hsl(var(--accent) / 0.08)" }}>
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
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-[-0.02em]">
                What if follow-ups happened automatically?
              </h2>
            </div>
            <div className="mt-12 lg:mt-16 grid md:grid-cols-2 gap-6">
              {/* Before */}
              <div className="p-6 lg:p-8 rounded-xl border border-[var(--border)] bg-white">
                <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-tertiary)]">Before</p>
                <ul className="mt-4 space-y-3">
                  <li className="text-sm text-[var(--text-secondary)] flex items-start gap-2">
                    <span className="text-red-400 mt-0.5 shrink-0">&times;</span>
                    Invoice sent → 15 days pass → Draft email → Agonize for 30 minutes
                  </li>
                  <li className="text-sm text-[var(--text-secondary)] flex items-start gap-2">
                    <span className="text-red-400 mt-0.5 shrink-0">&times;</span>
                    Send → Wait → Client ignores → Draft another awkward email
                  </li>
                  <li className="text-sm text-[var(--text-secondary)] flex items-start gap-2">
                    <span className="text-red-400 mt-0.5 shrink-0">&times;</span>
                    Client finally pays 45 days late. You spent 2+ hours on one invoice.
                  </li>
                </ul>
              </div>
              {/* After */}
              <div className="p-6 lg:p-8 rounded-xl border border-[hsl(var(--accent)/0.2)] bg-[hsl(var(--accent-light))]">
                <p className="text-xs font-medium uppercase tracking-wider" style={{ color: "hsl(var(--accent))" }}>After</p>
                <ul className="mt-4 space-y-3">
                  <li className="text-sm text-[var(--text-primary)] flex items-start gap-2">
                    <Check size={14} className="mt-0.5 shrink-0" style={{ color: "hsl(var(--accent))" }} />
                    Invoice sent → Forward to InvoiceNudge in 10 seconds
                  </li>
                  <li className="text-sm text-[var(--text-primary)] flex items-start gap-2">
                    <Check size={14} className="mt-0.5 shrink-0" style={{ color: "hsl(var(--accent))" }} />
                    AI sends Day 0, Day 7, Day 14, Day 21 reminders automatically
                  </li>
                  <li className="text-sm text-[var(--text-primary)] flex items-start gap-2">
                    <Check size={14} className="mt-0.5 shrink-0" style={{ color: "hsl(var(--accent))" }} />
                    Client pays Day 18. You spent zero minutes following up.
                  </li>
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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-[-0.02em]">
              Built for the way freelancers actually work
            </h2>
            <p className="mt-4 text-[var(--text-secondary)]">
              No accounting software required. No complex setup. Just forward your invoices.
            </p>
          </div>
          {/* Bento: 2 large + 4 small */}
          <div className="mt-12 lg:mt-16 grid md:grid-cols-3 gap-4 stagger">
            {/* Large card — spans 2 cols */}
            <Reveal className="md:col-span-2 p-6 lg:p-8 rounded-xl border border-[var(--border)] bg-white">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "hsl(var(--accent) / 0.08)" }}>
                <Forward size={18} style={{ color: "hsl(var(--accent))" }} />
              </div>
              <h3 className="mt-4 text-lg font-medium">Email-Forward Workflow</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-secondary)] max-w-md">
                Forward any invoice to followup@invoicenudge.com. AI extracts client name, amount, and due date in seconds. Zero manual data entry, no accounting software integration required.
              </p>
            </Reveal>
            {/* Small card */}
            <Reveal className="p-6 lg:p-8 rounded-xl border border-[var(--border)] bg-white">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "hsl(var(--accent) / 0.08)" }}>
                <Bot size={18} style={{ color: "hsl(var(--accent))" }} />
              </div>
              <h3 className="mt-4 text-[15px] font-medium">Tone Matching</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                AI analyzes your original invoice email and matches your communication style — casual or formal, emoji or no emoji.
              </p>
            </Reveal>
            {/* Small card */}
            <Reveal className="p-6 lg:p-8 rounded-xl border border-[var(--border)] bg-white">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "hsl(var(--accent) / 0.08)" }}>
                <Bell size={18} style={{ color: "hsl(var(--accent))" }} />
              </div>
              <h3 className="mt-4 text-[15px] font-medium">Escalating Reminders</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                Day 0: friendly due-today note. Day 7: gentle check-in. Day 14: firm follow-up. Day 21: final notice. Professional throughout.
              </p>
            </Reveal>
            {/* Large card — spans 2 cols */}
            <Reveal className="md:col-span-2 p-6 lg:p-8 rounded-xl border border-[var(--border)] bg-white">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "hsl(var(--accent) / 0.08)" }}>
                <Eye size={18} style={{ color: "hsl(var(--accent))" }} />
              </div>
              <h3 className="mt-4 text-lg font-medium">Preview Mode</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-secondary)] max-w-md">
                See every AI-drafted reminder before it sends. Approve, edit, or skip. Build trust with 5 approvals before enabling Autopilot Mode — or stay in Preview Mode forever. You&apos;re always in control.
              </p>
            </Reveal>
            {/* Small card */}
            <Reveal className="p-6 lg:p-8 rounded-xl border border-[var(--border)] bg-white">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "hsl(var(--accent) / 0.08)" }}>
                <BarChart3 size={18} style={{ color: "hsl(var(--accent))" }} />
              </div>
              <h3 className="mt-4 text-[15px] font-medium">Payment Dashboard</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                Track which clients opened reminders, which replied, which paid. See your average days-to-payment improve over time.
              </p>
            </Reveal>
            {/* Small card */}
            <Reveal className="p-6 lg:p-8 rounded-xl border border-[var(--border)] bg-white">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "hsl(var(--accent) / 0.08)" }}>
                <Shuffle size={18} style={{ color: "hsl(var(--accent))" }} />
              </div>
              <h3 className="mt-4 text-[15px] font-medium">Works with Everything</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                InvoiceNudge doesn&apos;t process payments. It works with Stripe, PayPal, Venmo, Zelle, checks, wire transfers — whatever you use.
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
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-[-0.02em]">
                60 seconds to set up. Zero ongoing effort.
              </h2>
            </div>
            <div className="mt-12 lg:mt-16 grid md:grid-cols-3 gap-8 lg:gap-12 stagger">
              {[
                {
                  step: "01",
                  icon: Send,
                  title: "Forward Your Invoice",
                  desc: "Send any invoice email to followup@invoicenudge.com. We parse client name, amount, and due date automatically.",
                },
                {
                  step: "02",
                  icon: Eye,
                  title: "AI Drafts Reminders",
                  desc: "We create a 4-email sequence matching your tone. Review in Preview Mode or enable Autopilot after 5 approvals.",
                },
                {
                  step: "03",
                  icon: Zap,
                  title: "Get Paid, Zero Effort",
                  desc: "Reminders send on schedule. When client replies \"paid!\", we detect it and stop the sequence automatically.",
                },
              ].map((s, i) => (
                <Reveal key={i}>
                  <div className="text-center md:text-left">
                    <div className="w-12 h-12 mx-auto md:mx-0 rounded-xl flex items-center justify-center bg-white/10 mb-4">
                      <s.icon size={20} className="text-white/80" />
                    </div>
                    <span className="text-2xl font-light text-white/20">{s.step}</span>
                    <h3 className="mt-2 text-[15px] font-medium">{s.title}</h3>
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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-[-0.02em]">
              Built for how you work
            </h2>
            <p className="mt-4 text-[var(--text-secondary)]">
              Whether you&apos;re a solo designer or running a small studio, InvoiceNudge adapts to your workflow.
            </p>
          </div>
          <div className="mt-12 lg:mt-16 grid md:grid-cols-3 gap-6 stagger">
            {[
              {
                role: "The Solo Designer",
                icon: Palette,
                context: "5-8 clients monthly, $2,000-5,000 per project",
                narrative: "Spends Sunday evenings writing follow-up emails instead of relaxing. With InvoiceNudge, forward invoices on Friday and let AI handle the chase while you recharge.",
              },
              {
                role: "The Freelance Developer",
                icon: Code,
                context: "3-4 retainer clients plus one-off projects",
                narrative: "NET-30 terms mean cash flow planning is a nightmare. InvoiceNudge's dashboard shows exactly when to expect payment — no more guessing if rent will clear.",
              },
              {
                role: "The Photography Studio Owner",
                icon: Camera,
                context: "Wedding deposits, final balances, print orders",
                narrative: "Manually tracking 20+ invoices leads to missed follow-ups and awkward conversations. InvoiceNudge ensures nothing falls through the cracks.",
              },
            ].map((uc, i) => (
              <Reveal key={i}>
                <div className="p-6 lg:p-8 rounded-xl border border-[var(--border)] bg-white">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "hsl(var(--accent) / 0.08)" }}>
                    <uc.icon size={18} style={{ color: "hsl(var(--accent))" }} />
                  </div>
                  <p className="mt-4 text-xs font-medium uppercase tracking-wider" style={{ color: "hsl(var(--accent))" }}>
                    {uc.role}
                  </p>
                  <p className="mt-1 text-xs text-[var(--text-tertiary)]">{uc.context}</p>
                  <p className="mt-4 text-[15px] leading-relaxed text-[var(--text-secondary)]">{uc.narrative}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ── Pricing ──────────────────────────────────────────────────────── */}
      <Reveal>
        <section id="pricing" className="bg-[var(--bg-secondary)] relative noise">
          <div className="max-w-5xl mx-auto px-6 py-20 lg:py-28">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-[-0.02em]">
                Simple pricing. Pay for itself in one invoice.
              </h2>
              <p className="mt-3 text-sm text-[var(--text-tertiary)]">
                Planned launch pricing — founding members lock in these rates forever.
              </p>
            </div>
            <div className="mt-12 lg:mt-16 grid md:grid-cols-3 gap-6 stagger">
              {[
                {
                  name: "Starter",
                  price: "$19",
                  period: "/mo",
                  features: [
                    "10 invoices per month",
                    "AI reminders Day 0/7/14/21",
                    "Preview Mode (approve emails)",
                    "Basic payment dashboard",
                    "Works with any payment method",
                  ],
                  recommended: false,
                },
                {
                  name: "Pro",
                  price: "$49",
                  period: "/mo",
                  features: [
                    "50 invoices per month",
                    "Autopilot Mode",
                    "Custom reminder schedules",
                    "Client reply detection",
                    "Priority support (4hr response)",
                    "Zapier integration",
                  ],
                  recommended: true,
                },
                {
                  name: "Agency",
                  price: "$149",
                  period: "/mo",
                  features: [
                    "Unlimited invoices",
                    "3 team seats",
                    "White-label emails",
                    "Multi-client dashboards",
                    "Dedicated account manager",
                    "API access",
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
                        Recommended
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
            {/* Pricing FAQs */}
            <div className="mt-12 max-w-2xl mx-auto">
              <div className="grid sm:grid-cols-3 gap-6 text-center text-sm">
                <div>
                  <p className="font-medium text-[var(--text-primary)]">Will there be a free trial?</p>
                  <p className="mt-1 text-[var(--text-tertiary)]">Yes — 7-day free trial, no credit card required.</p>
                </div>
                <div>
                  <p className="font-medium text-[var(--text-primary)]">Can I cancel anytime?</p>
                  <p className="mt-1 text-[var(--text-tertiary)]">Yes. Cancel with one click, no questions asked.</p>
                </div>
                <div>
                  <p className="font-medium text-[var(--text-primary)]">Is there a money-back guarantee?</p>
                  <p className="mt-1 text-[var(--text-tertiary)]">Yes — 60-day full refund if it doesn&apos;t work for you.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <Reveal>
        <section id="faq" className="max-w-3xl mx-auto px-6 py-20 lg:py-28">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-[-0.02em] text-center">
            Frequently Asked Questions
          </h2>
          <div className="mt-10 lg:mt-12 border-t border-[var(--border)]">
            <FaqItem
              question="When does InvoiceNudge launch?"
              answer="We're launching in April 2026. Join the waitlist to be notified first and lock in founding member pricing ($19/month forever, even when the price rises)."
            />
            <FaqItem
              question="Will my clients know I'm using AI?"
              answer="No. Emails come from your email address via our sending infrastructure (Resend). Clients see 'From: you@yourdomain.com' — not InvoiceNudge. Your brand, your voice."
            />
            <FaqItem
              question="What if the AI writes something wrong?"
              answer="Preview Mode lets you approve every email before it sends. You have 100% control. After 5 approvals, you can unlock Autopilot Mode — or stay in Preview Mode forever. No pressure."
            />
            <FaqItem
              question="Does this work with my invoicing software?"
              answer="Yes — InvoiceNudge is invoice-agnostic. Forward invoices from FreshBooks, Wave, Bonsai, QuickBooks, or even a PDF you created in Google Docs. If you can email it, we can track it."
            />
            <FaqItem
              question="What if my client already paid?"
              answer="Our AI detects replies containing 'I paid', 'payment sent', 'just wired', etc. and automatically stops the reminder sequence. No awkward 'oops, sorry!' follow-ups."
            />
            <FaqItem
              question="Can I cancel anytime?"
              answer="Yes. Cancel with one click, no questions asked. We also offer a 60-day money-back guarantee — if InvoiceNudge doesn't work for you, email support for a full refund."
            />
            <FaqItem
              question="Why not just use FreshBooks reminders?"
              answer="FreshBooks reminders are generic templates ('Your invoice is overdue'). InvoiceNudge AI learns YOUR tone and matches your communication style. Plus, FreshBooks only works with FreshBooks invoices. We work with any invoice from any source."
            />
            <FaqItem
              question="What about Wave — isn't it free?"
              answer="Wave's reminders only work if you accept online payments through Wave (2.9% + $0.60 per transaction). On $10k/month in invoices, that's $290/month in fees. InvoiceNudge is $19/month flat and works with ANY payment method — Zelle, check, wire, whatever."
            />
          </div>
        </section>
      </Reveal>

      {/* ── Final CTA ────────────────────────────────────────────────────── */}
      <Reveal>
        <section id="waitlist" className="bg-[var(--bg-secondary)] relative noise">
          <div className="max-w-2xl mx-auto px-6 py-20 lg:py-28 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-[-0.02em]">
              Ready to stop chasing payments?
            </h2>
            <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
              Join the waitlist and be first to know when we launch. Founding members lock in $19/month forever — before the price rises.
            </p>
            <div className="mt-8 flex justify-center">
              <WaitlistForm />
            </div>
            <p className="mt-4 text-xs text-[var(--text-tertiary)]">
              No spam. Just a launch notification.
            </p>
          </div>
        </section>
      </Reveal>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="border-t border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <span className="text-sm font-medium">InvoiceNudge</span>
              <p className="mt-1 text-xs text-[var(--text-tertiary)]">
                AI-powered payment reminders for freelancers.
              </p>
            </div>
            <div className="flex items-center gap-6 text-sm text-[var(--text-tertiary)]">
              <a href="/privacy" className="hover:text-[var(--text-secondary)] transition-colors">Privacy</a>
              <a href="/terms" className="hover:text-[var(--text-secondary)] transition-colors">Terms</a>
              <a href="https://twitter.com/invoicenudge" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-secondary)] transition-colors">
                Twitter
              </a>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-[var(--border)] text-center">
            <p className="text-xs text-[var(--text-tertiary)]">
              &copy; 2026 InvoiceNudge. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* ── Mobile Sticky CTA ────────────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-sm border-t border-[var(--border)] md:hidden z-30">
        <a
          href="#waitlist"
          className="btn-primary w-full py-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2"
        >
          Join Waitlist <ArrowRight size={14} />
        </a>
      </div>
    </main>
  );
}