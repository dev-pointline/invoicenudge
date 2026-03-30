"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Mail,
  Forward,
  Clock,
  DollarSign,
  MessageSquare,
  Shield,
  BarChart3,
  Zap,
  Eye,
  Users,
  Send,
  Bell,
  Wallet,
  Menu,
  X,
  Palette,
  Briefcase,
  Building2,
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

function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
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
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

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
      <div
        className="flex items-center gap-2 text-sm"
        style={{ color: "hsl(var(--accent))" }}
      >
        <Check size={16} /> You&apos;re on the list! We&apos;ll notify you when
        we launch.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col sm:flex-row gap-3 ${compact ? "" : "max-w-md"}`}
    >
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
        <div className="browser-url">invoicenudge.com</div>
      </div>
      <div className="p-4 md:p-6">{children}</div>
    </div>
  );
}

/* ─── FAQ Item ──────────────────────────────────────────────────────────── */
function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group border-b border-[var(--border)] last:border-0">
      <summary className="flex items-center justify-between py-5 px-4 text-base font-medium text-[var(--text-primary)] cursor-pointer">
        {question}
        <ChevronDown
          size={16}
          className="faq-chevron text-[var(--text-tertiary)] shrink-0 ml-4"
        />
      </summary>
      <div className="pb-5 px-4 text-[15px] leading-relaxed text-[var(--text-secondary)]">
        {answer}
      </div>
    </details>
  );
}

/* ─── Mobile Nav Toggle ─────────────────────────────────────────────────── */
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
        <div className="absolute top-16 left-0 right-0 bg-[var(--bg-primary)] border-b border-[var(--border)] p-4 flex flex-col gap-4">
          <a
            href="#features"
            className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            onClick={() => setIsOpen(false)}
          >
            Features
          </a>
          <a
            href="#pricing"
            className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            onClick={() => setIsOpen(false)}
          >
            Pricing
          </a>
          <a
            href="#faq"
            className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            onClick={() => setIsOpen(false)}
          >
            FAQ
          </a>
          <a
            href="#waitlist"
            className="btn-primary px-4 py-2 rounded-lg text-sm font-medium text-center"
            onClick={() => setIsOpen(false)}
          >
            Join Waitlist
          </a>
        </div>
      )}
    </div>
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
            <Bell
              size={20}
              style={{ color: "hsl(var(--accent))" }}
              strokeWidth={2.5}
            />
            <span className="text-[15px] font-medium tracking-tight">
              InvoiceNudge
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-[var(--text-secondary)]">
            <a
              href="#features"
              className="hover:text-[var(--text-primary)] transition-colors"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="hover:text-[var(--text-primary)] transition-colors"
            >
              Pricing
            </a>
            <a
              href="#faq"
              className="hover:text-[var(--text-primary)] transition-colors"
            >
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
        <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-16 md:pt-24 md:pb-20 lg:pt-32 lg:pb-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — Copy */}
            <div className="stagger">
              <p
                className="hero-enter hero-enter-1 text-sm font-medium tracking-wide uppercase"
                style={{ color: "hsl(var(--accent))" }}
              >
                For Freelancers Who Invoice Clients
              </p>
              <h1 className="hero-enter hero-enter-2 mt-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-[-0.02em] leading-[1.05] text-[var(--text-primary)]">
                Stop Chasing
                <br />
                Late Payments
              </h1>
              <p className="hero-enter hero-enter-3 mt-6 text-lg md:text-xl leading-relaxed text-[var(--text-secondary)] max-w-lg">
                Forward your invoice. We send polite reminders that sound like
                you — not a robot. You stay professional. Clients pay on time.
              </p>
              <div className="hero-enter hero-enter-4 mt-8">
                <WaitlistForm />
              </div>
              <p className="hero-enter hero-enter-5 mt-4 text-xs text-[var(--text-tertiary)]">
                Launching April 2026 — be one of the first to automate
                collections.
              </p>
            </div>

            {/* Right — Product Mockup */}
            <div className="hero-enter hero-enter-5 hidden lg:block">
              <BrowserMockup>
                {/* Email Forward Workflow Mockup */}
                <div className="space-y-4">
                  {/* Forwarded Invoice */}
                  <div className="p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
                    <div className="flex items-center gap-2 text-xs text-[var(--text-tertiary)] mb-2">
                      <Forward size={12} />
                      <span>Forwarded to followup@invoicenudge.com</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: "hsl(var(--accent) / 0.1)" }}
                      >
                        <Mail
                          size={14}
                          style={{ color: "hsl(var(--accent))" }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          Invoice #1247 - Logo Design
                        </p>
                        <p className="text-xs text-[var(--text-tertiary)] mt-0.5">
                          $2,400 • Due: April 15
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ background: "hsl(var(--accent) / 0.1)" }}
                    >
                      <ArrowRight
                        size={14}
                        style={{ color: "hsl(var(--accent))" }}
                        className="rotate-90"
                      />
                    </div>
                  </div>

                  {/* AI Draft Preview */}
                  <div className="p-4 rounded-lg bg-white border border-[hsl(var(--accent)/0.2)]">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Zap
                          size={12}
                          style={{ color: "hsl(var(--accent))" }}
                        />
                        <span
                          className="text-xs font-medium"
                          style={{ color: "hsl(var(--accent))" }}
                        >
                          AI Draft Ready
                        </span>
                      </div>
                      <span className="text-xs text-[var(--text-tertiary)]">
                        Day 7 Reminder
                      </span>
                    </div>
                    <div className="text-sm text-[var(--text-secondary)] space-y-2">
                      <p>Hi there!</p>
                      <p>
                        Just a quick follow-up on Invoice #1247 for the logo
                        design project. It&apos;s now 7 days past due.
                      </p>
                      <p>Let me know if you have any questions!</p>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button className="btn-primary px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1.5">
                        <Check size={12} /> Approve
                      </button>
                      <button className="px-3 py-1.5 rounded text-xs border border-[var(--border)] text-[var(--text-secondary)]">
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
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
              Built for freelancers who invoice clients directly —{" "}
              <span className="font-medium">
                85% experience late payments
              </span>
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-[var(--text-tertiary)]">
              <div className="flex items-center gap-2">
                <Mail size={14} />
                <span>Gmail</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} />
                <span>Outlook</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} />
                <span>Any Email</span>
              </div>
              <div className="flex items-center gap-2">
                <Wallet size={14} />
                <span>Any Payment Method</span>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── Problem / Pain Points ────────────────────────────────────────── */}
      <Reveal>
        <section className="max-w-6xl mx-auto px-6 py-20 lg:py-28">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-[-0.02em]">
              Late Payments Drain Your Time and Energy
            </h2>
            <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
              You&apos;re a professional, not an accounts receivable department.
            </p>
          </div>
          <div className="mt-12 lg:mt-16 grid md:grid-cols-3 gap-6 lg:gap-8 stagger">
            {/* Pain 1 */}
            <Reveal>
              <div className="p-6 rounded-xl border border-[var(--border)] bg-white">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: "hsl(var(--accent) / 0.08)" }}
                >
                  <Clock
                    size={18}
                    style={{ color: "hsl(var(--accent))" }}
                  />
                </div>
                <h3 className="mt-4 text-[15px] font-medium">
                  Hours Lost Chasing
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                  Freelancers spend 8-12 hours/month writing follow-up emails,
                  checking if payments arrived, and feeling anxious about
                  whether to send another reminder.
                </p>
              </div>
            </Reveal>
            {/* Pain 2 */}
            <Reveal>
              <div className="p-6 rounded-xl border border-[var(--border)] bg-white">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: "hsl(var(--accent) / 0.08)" }}
                >
                  <MessageSquare
                    size={18}
                    style={{ color: "hsl(var(--accent))" }}
                  />
                </div>
                <h3 className="mt-4 text-[15px] font-medium">
                  Awkward Conversations
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                  Every &quot;just checking in&quot; email feels desperate. You
                  don&apos;t want to damage relationships, so you wait too long
                  — and cash flow suffers.
                </p>
              </div>
            </Reveal>
            {/* Pain 3 */}
            <Reveal>
              <div className="p-6 rounded-xl border border-[var(--border)] bg-white">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: "hsl(var(--accent) / 0.08)" }}
                >
                  <DollarSign
                    size={18}
                    style={{ color: "hsl(var(--accent))" }}
                  />
                </div>
                <h3 className="mt-4 text-[15px] font-medium">
                  Unpredictable Cash Flow
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                  When clients pay 30-60 days late, you can&apos;t plan. Rent
                  deadlines hit while invoices sit in limbo. You check your bank
                  account daily hoping money arrived.
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      </Reveal>

      {/* ── Solution (Before / After) ────────────────────────────────────── */}
      <Reveal>
        <section className="bg-[var(--bg-secondary)] relative noise">
          <div className="max-w-6xl mx-auto px-6 py-20 lg:py-28">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-[-0.02em]">
                From Manual Chasing to Automated Follow-Ups
              </h2>
            </div>
            <div className="mt-12 lg:mt-16 grid md:grid-cols-2 gap-6">
              {/* Before */}
              <div className="p-6 lg:p-8 rounded-xl border border-[var(--border)] bg-white">
                <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-tertiary)]">
                  Before
                </p>
                <ul className="mt-4 space-y-3">
                  <li className="text-sm text-[var(--text-secondary)] flex items-start gap-2">
                    <span className="text-[var(--text-tertiary)] mt-0.5">
                      ×
                    </span>
                    Manually draft &quot;polite but firm&quot; follow-up emails
                  </li>
                  <li className="text-sm text-[var(--text-secondary)] flex items-start gap-2">
                    <span className="text-[var(--text-tertiary)] mt-0.5">
                      ×
                    </span>
                    Agonize over tone for 30+ minutes per email
                  </li>
                  <li className="text-sm text-[var(--text-secondary)] flex items-start gap-2">
                    <span className="text-[var(--text-tertiary)] mt-0.5">
                      ×
                    </span>
                    Check bank account daily hoping payment arrived
                  </li>
                  <li className="text-sm text-[var(--text-secondary)] flex items-start gap-2">
                    <span className="text-[var(--text-tertiary)] mt-0.5">
                      ×
                    </span>
                    Lose track of which invoices are overdue
                  </li>
                </ul>
              </div>
              {/* After */}
              <div className="p-6 lg:p-8 rounded-xl border border-[hsl(var(--accent)/0.2)] bg-[hsl(var(--accent-light))]">
                <p
                  className="text-xs font-medium uppercase tracking-wider"
                  style={{ color: "hsl(var(--accent))" }}
                >
                  After
                </p>
                <ul className="mt-4 space-y-3">
                  <li className="text-sm text-[var(--text-primary)] flex items-start gap-2">
                    <Check
                      size={14}
                      className="mt-0.5 shrink-0"
                      style={{ color: "hsl(var(--accent))" }}
                    />
                    Forward invoice once — automated reminders handle the rest
                  </li>
                  <li className="text-sm text-[var(--text-primary)] flex items-start gap-2">
                    <Check
                      size={14}
                      className="mt-0.5 shrink-0"
                      style={{ color: "hsl(var(--accent))" }}
                    />
                    AI matches your communication style automatically
                  </li>
                  <li className="text-sm text-[var(--text-primary)] flex items-start gap-2">
                    <Check
                      size={14}
                      className="mt-0.5 shrink-0"
                      style={{ color: "hsl(var(--accent))" }}
                    />
                    Dashboard shows which invoices are pending or paid
                  </li>
                  <li className="text-sm text-[var(--text-primary)] flex items-start gap-2">
                    <Check
                      size={14}
                      className="mt-0.5 shrink-0"
                      style={{ color: "hsl(var(--accent))" }}
                    />
                    Preview every reminder before it sends
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
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-[-0.02em]">
              Everything You Need to Get Paid On Time
            </h2>
            <p className="mt-4 text-[var(--text-secondary)]">
              Simple tools designed for how freelancers actually work.
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
                <Forward size={18} style={{ color: "hsl(var(--accent))" }} />
              </div>
              <h3 className="mt-4 text-lg font-medium">
                Email-Forward Workflow
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-secondary)] max-w-md">
                Forward any invoice to followup@invoicenudge.com. AI extracts
                client name, amount, and due date automatically. No accounting
                software required. No integrations to set up.
              </p>
            </Reveal>
            {/* Small card */}
            <Reveal className="p-6 lg:p-8 rounded-xl border border-[var(--border)] bg-white">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: "hsl(var(--accent) / 0.08)" }}
              >
                <Zap size={18} style={{ color: "hsl(var(--accent))" }} />
              </div>
              <h3 className="mt-4 text-[15px] font-medium">
                AI That Sounds Like You
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                AI analyzes your communication style to match tone — casual or
                formal, emoji-user or straight-laced.
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
                See every AI-drafted email before it goes out. Approve, edit, or
                reject. Stay in control until you trust the AI.
              </p>
            </Reveal>
            {/* Large card — spans 2 cols */}
            <Reveal className="md:col-span-2 p-6 lg:p-8 rounded-xl border border-[var(--border)] bg-white">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: "hsl(var(--accent) / 0.08)" }}
              >
                <Send size={18} style={{ color: "hsl(var(--accent))" }} />
              </div>
              <h3 className="mt-4 text-lg font-medium">
                Escalating Reminder Sequence
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-secondary)] max-w-md">
                Day 0 (friendly check-in), Day 7 (gentle follow-up), Day 14
                (firm reminder), Day 21 (final notice). Customizable timing on
                Pro and Agency plans.
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
              <h3 className="mt-4 text-[15px] font-medium">
                Payment Dashboard
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                See which invoices are pending, how many days overdue, and when
                reminders were sent. Know where every dollar stands.
              </p>
            </Reveal>
            {/* Small card */}
            <Reveal className="p-6 lg:p-8 rounded-xl border border-[var(--border)] bg-white">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: "hsl(var(--accent) / 0.08)" }}
              >
                <Wallet size={18} style={{ color: "hsl(var(--accent))" }} />
              </div>
              <h3 className="mt-4 text-[15px] font-medium">Any Payment Method</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                Zelle, Venmo, check, wire, PayPal, crypto — we don&apos;t
                process payments, we just remind. Use whatever your clients
                prefer.
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
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-[-0.02em]">
                Get Started in 60 Seconds
              </h2>
            </div>
            <div className="mt-12 lg:mt-16 grid md:grid-cols-3 gap-8 lg:gap-12 stagger">
              <Reveal>
                <div>
                  <span className="text-3xl font-light text-white/20">01</span>
                  <div
                    className="mt-3 w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: "hsl(var(--accent) / 0.2)" }}
                  >
                    <Forward size={18} style={{ color: "hsl(var(--accent))" }} />
                  </div>
                  <h3 className="mt-4 text-[15px] font-medium">
                    Forward Your Invoice
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    Send any invoice email to followup@invoicenudge.com. Takes 10
                    seconds. That&apos;s the only setup.
                  </p>
                </div>
              </Reveal>
              <Reveal>
                <div>
                  <span className="text-3xl font-light text-white/20">02</span>
                  <div
                    className="mt-3 w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: "hsl(var(--accent) / 0.2)" }}
                  >
                    <Zap size={18} style={{ color: "hsl(var(--accent))" }} />
                  </div>
                  <h3 className="mt-4 text-[15px] font-medium">
                    AI Drafts Reminders
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    We extract client info and schedule friendly reminders that
                    match your tone. Preview and approve each one.
                  </p>
                </div>
              </Reveal>
              <Reveal>
                <div>
                  <span className="text-3xl font-light text-white/20">03</span>
                  <div
                    className="mt-3 w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: "hsl(var(--accent) / 0.2)" }}
                  >
                    <DollarSign size={18} style={{ color: "hsl(var(--accent))" }} />
                  </div>
                  <h3 className="mt-4 text-[15px] font-medium">
                    Clients Pay, You Relax
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    Reminders go out automatically. You get notified when
                    payments arrive. No more manual chasing.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── Use Cases ────────────────────────────────────────────────────── */}
      <Reveal>
        <section className="max-w-6xl mx-auto px-6 py-20 lg:py-28">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-[-0.02em]">
              Built for Different Types of Freelancers
            </h2>
            <p className="mt-4 text-[var(--text-secondary)]">
              Here&apos;s how different freelancers would use InvoiceNudge.
            </p>
          </div>
          <div className="mt-12 lg:mt-16 grid md:grid-cols-3 gap-6 stagger">
            {/* Use Case 1 */}
            <Reveal>
              <div className="p-6 rounded-xl border border-[var(--border)] bg-white">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: "hsl(var(--accent) / 0.08)" }}
                >
                  <Palette size={18} style={{ color: "hsl(var(--accent))" }} />
                </div>
                <p
                  className="mt-4 text-xs font-medium uppercase tracking-wider"
                  style={{ color: "hsl(var(--accent))" }}
                >
                  The Solo Designer
                </p>
                <p className="mt-1 text-xs text-[var(--text-tertiary)]">
                  5-8 invoices/month
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                  Sends invoices to retainer clients for logo and branding work.
                  Hates the awkwardness of chasing payments but can&apos;t afford
                  to wait 60 days. Uses InvoiceNudge to automate follow-ups
                  while staying professional.
                </p>
              </div>
            </Reveal>
            {/* Use Case 2 */}
            <Reveal>
              <div className="p-6 rounded-xl border border-[var(--border)] bg-white">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: "hsl(var(--accent) / 0.08)" }}
                >
                  <Briefcase size={18} style={{ color: "hsl(var(--accent))" }} />
                </div>
                <p
                  className="mt-4 text-xs font-medium uppercase tracking-wider"
                  style={{ color: "hsl(var(--accent))" }}
                >
                  The Busy Consultant
                </p>
                <p className="mt-1 text-xs text-[var(--text-tertiary)]">
                  10-15 active clients
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                  Manages multiple client projects with varying payment terms.
                  Loses track of which invoices are overdue across different
                  projects. Uses the dashboard to see payment status at a glance.
                </p>
              </div>
            </Reveal>
            {/* Use Case 3 */}
            <Reveal>
              <div className="p-6 rounded-xl border border-[var(--border)] bg-white">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: "hsl(var(--accent) / 0.08)" }}
                >
                  <Building2 size={18} style={{ color: "hsl(var(--accent))" }} />
                </div>
                <p
                  className="mt-4 text-xs font-medium uppercase tracking-wider"
                  style={{ color: "hsl(var(--accent))" }}
                >
                  The Growing Agency Owner
                </p>
                <p className="mt-1 text-xs text-[var(--text-tertiary)]">
                  30+ invoices/month
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                  Has a small team sending invoices on their behalf. Needs
                  consistent, professional follow-up across all accounts without
                  hiring a dedicated accounts receivable person.
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      </Reveal>

      {/* ── Pricing ──────────────────────────────────────────────────────── */}
      <Reveal>
        <section id="pricing" className="bg-[var(--bg-secondary)] relative noise">
          <div className="max-w-5xl mx-auto px-6 py-20 lg:py-28">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-[-0.02em]">
                Simple, Transparent Pricing
              </h2>
              <p className="mt-3 text-sm text-[var(--text-tertiary)]">
                Planned launch pricing — join waitlist to lock in founding member
                rates
              </p>
            </div>
            <div className="mt-12 lg:mt-16 grid md:grid-cols-3 gap-6 stagger">
              {/* Starter */}
              <Reveal>
                <div className="p-6 lg:p-8 rounded-xl border border-[var(--border)] bg-white flex flex-col h-full">
                  <p className="text-sm font-medium text-[var(--text-secondary)]">
                    Starter
                  </p>
                  <p className="mt-2 flex items-baseline gap-1">
                    <span className="text-3xl font-medium">$19</span>
                    <span className="text-sm text-[var(--text-tertiary)]">
                      /mo
                    </span>
                  </p>
                  <p className="text-xs text-[var(--text-tertiary)] mt-1">
                    or $199/year (save $29)
                  </p>
                  <ul className="mt-6 space-y-3 flex-1">
                    <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <Check
                        size={14}
                        className="mt-0.5 shrink-0"
                        style={{ color: "hsl(var(--accent))" }}
                      />
                      Up to 10 invoices/month
                    </li>
                    <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <Check
                        size={14}
                        className="mt-0.5 shrink-0"
                        style={{ color: "hsl(var(--accent))" }}
                      />
                      AI reminders (Day 0/7/14/21)
                    </li>
                    <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <Check
                        size={14}
                        className="mt-0.5 shrink-0"
                        style={{ color: "hsl(var(--accent))" }}
                      />
                      Preview Mode
                    </li>
                    <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <Check
                        size={14}
                        className="mt-0.5 shrink-0"
                        style={{ color: "hsl(var(--accent))" }}
                      />
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

              {/* Pro - Recommended */}
              <Reveal>
                <div className="p-6 lg:p-8 rounded-xl border bg-white flex flex-col h-full pricing-recommended ring-1 ring-[hsl(var(--accent)/0.2)]">
                  <span
                    className="self-start text-xs font-medium px-2.5 py-0.5 rounded-full mb-4"
                    style={{
                      background: "hsl(var(--accent) / 0.1)",
                      color: "hsl(var(--accent))",
                    }}
                  >
                    Recommended
                  </span>
                  <p className="text-sm font-medium text-[var(--text-secondary)]">
                    Pro
                  </p>
                  <p className="mt-2 flex items-baseline gap-1">
                    <span className="text-3xl font-medium">$49</span>
                    <span className="text-sm text-[var(--text-tertiary)]">
                      /mo
                    </span>
                  </p>
                  <p className="text-xs text-[var(--text-tertiary)] mt-1">
                    or $499/year (save $89)
                  </p>
                  <ul className="mt-6 space-y-3 flex-1">
                    <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <Check
                        size={14}
                        className="mt-0.5 shrink-0"
                        style={{ color: "hsl(var(--accent))" }}
                      />
                      Up to 50 invoices/month
                    </li>
                    <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <Check
                        size={14}
                        className="mt-0.5 shrink-0"
                        style={{ color: "hsl(var(--accent))" }}
                      />
                      Autopilot Mode (no approval needed)
                    </li>
                    <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <Check
                        size={14}
                        className="mt-0.5 shrink-0"
                        style={{ color: "hsl(var(--accent))" }}
                      />
                      Custom reminder schedules
                    </li>
                    <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <Check
                        size={14}
                        className="mt-0.5 shrink-0"
                        style={{ color: "hsl(var(--accent))" }}
                      />
                      Advanced dashboard
                    </li>
                    <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <Check
                        size={14}
                        className="mt-0.5 shrink-0"
                        style={{ color: "hsl(var(--accent))" }}
                      />
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

              {/* Agency */}
              <Reveal>
                <div className="p-6 lg:p-8 rounded-xl border border-[var(--border)] bg-white flex flex-col h-full">
                  <p className="text-sm font-medium text-[var(--text-secondary)]">
                    Agency
                  </p>
                  <p className="mt-2 flex items-baseline gap-1">
                    <span className="text-3xl font-medium">$149</span>
                    <span className="text-sm text-[var(--text-tertiary)]">
                      /mo
                    </span>
                  </p>
                  <p className="text-xs text-[var(--text-tertiary)] mt-1">
                    or $1,499/year (save $289)
                  </p>
                  <ul className="mt-6 space-y-3 flex-1">
                    <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <Check
                        size={14}
                        className="mt-0.5 shrink-0"
                        style={{ color: "hsl(var(--accent))" }}
                      />
                      Unlimited invoices
                    </li>
                    <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <Check
                        size={14}
                        className="mt-0.5 shrink-0"
                        style={{ color: "hsl(var(--accent))" }}
                      />
                      3 team seats included
                    </li>
                    <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <Check
                        size={14}
                        className="mt-0.5 shrink-0"
                        style={{ color: "hsl(var(--accent))" }}
                      />
                      White-label emails
                    </li>
                    <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <Check
                        size={14}
                        className="mt-0.5 shrink-0"
                        style={{ color: "hsl(var(--accent))" }}
                      />
                      Multi-client dashboards
                    </li>
                    <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <Check
                        size={14}
                        className="mt-0.5 shrink-0"
                        style={{ color: "hsl(var(--accent))" }}
                      />
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

            {/* Pricing FAQs */}
            <div className="mt-12 max-w-2xl mx-auto">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <h4 className="text-sm font-medium">When will you launch?</h4>
                  <p className="mt-1 text-sm text-[var(--text-tertiary)]">
                    April 2026. Waitlist members get early access.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Is there a free trial?</h4>
                  <p className="mt-1 text-sm text-[var(--text-tertiary)]">
                    Yes, 7 days free when we launch. No credit card required.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Can I cancel anytime?</h4>
                  <p className="mt-1 text-sm text-[var(--text-tertiary)]">
                    Yes, cancel with one click. No contracts, no hassle.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <Reveal>
        <section id="faq" className="max-w-3xl mx-auto px-6 py-20 lg:py-28">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-[-0.02em] text-center">
            Frequently Asked Questions
          </h2>
          <div className="mt-12 border-t border-[var(--border)]">
            <FaqItem
              question="What if AI writes something that offends my client?"
              answer="Preview Mode shows you every email before it sends. Approve, edit, or reject. You stay in full control. After you've approved 5 reminders without edits, you can unlock Autopilot Mode — or stay in Preview Mode forever if you prefer."
            />
            <FaqItem
              question="Why not just use Wave or FreshBooks?"
              answer="Those require using their payment processing (which takes 2-3% fees) or subscribing to their full accounting suite. InvoiceNudge works with ANY invoice you already send, ANY payment method your clients use — just forward the email. No integrations, no switching costs."
            />
            <FaqItem
              question="Will reminders land in spam?"
              answer="We use Resend (the same email infrastructure as Linear, Vercel, and other tech companies) with SPF, DKIM, and DMARC properly configured. Industry-leading deliverability. If emails aren't being delivered, we'll work with you to troubleshoot."
            />
            <FaqItem
              question="What if my client replies to a reminder?"
              answer="Replies go directly to YOUR inbox — we're just the reminder sender. You handle client communication personally. We never see or store the replies."
            />
            <FaqItem
              question="Can I customize the reminder schedule?"
              answer="On Pro and Agency plans, yes. Set any timing you want — Day 3, Day 10, whatever works for your business. Starter plan uses the default Day 0/7/14/21 sequence."
            />
            <FaqItem
              question="Is my data secure?"
              answer="We store only invoice metadata (client name, email, amount, due date) needed to send reminders. We never access your bank accounts, payment processors, or full email contents beyond what you forward. All data is encrypted at rest and in transit."
            />
            <FaqItem
              question="What if I only have 2-3 late invoices per year?"
              answer="Those 2-3 invoices might be worth thousands of dollars. If even one invoice gets paid faster, InvoiceNudge pays for itself many times over. The Starter plan at $19/month is less than a single hour of most freelancers' rates."
            />
            <FaqItem
              question="When does InvoiceNudge launch?"
              answer="April 2026. Join the waitlist to get early access and lock in founding member pricing before public launch."
            />
          </div>
        </section>
      </Reveal>

      {/* ── Final CTA ────────────────────────────────────────────────────── */}
      <Reveal>
        <section id="waitlist" className="bg-[var(--bg-secondary)] relative noise">
          <div className="max-w-2xl mx-auto px-6 py-20 lg:py-28 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-[-0.02em]">
              Ready to Stop Chasing Payments?
            </h2>
            <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
              Join the waitlist. We&apos;ll notify you when InvoiceNudge is
              ready — plus founding members lock in early-access pricing.
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
            <div className="flex items-center gap-2">
              <Bell
                size={16}
                style={{ color: "hsl(var(--accent))" }}
                strokeWidth={2.5}
              />
              <span className="text-sm text-[var(--text-tertiary)]">
                InvoiceNudge — AI-powered payment reminders for freelancers
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-[var(--text-tertiary)]">
              <a
                href="/privacy"
                className="hover:text-[var(--text-secondary)] transition-colors"
              >
                Privacy
              </a>
              <a
                href="/terms"
                className="hover:text-[var(--text-secondary)] transition-colors"
              >
                Terms
              </a>
              <a
                href="https://twitter.com/invoicenudge"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--text-secondary)] transition-colors"
              >
                X/Twitter
              </a>
            </div>
          </div>
          <div className="mt-6 text-center md:text-left">
            <span className="text-xs text-[var(--text-tertiary)]">
              © 2026 InvoiceNudge. All rights reserved.
            </span>
          </div>
        </div>
      </footer>

      {/* ── Sticky Mobile CTA ────────────────────────────────────────────── */}
      <div className="sticky-mobile-cta md:hidden">
        <a
          href="#waitlist"
          className="btn-primary w-full py-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2"
        >
          Join the Waitlist <ArrowRight size={14} />
        </a>
      </div>
    </main>
  );
}