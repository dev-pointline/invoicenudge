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
  Zap,
  Send,
  Eye,
  BarChart3,
  CreditCard,
  Menu,
  X,
  Sparkles,
  Calendar,
  Users,
  FileText,
  DollarSign,
  AlertCircle,
  CheckCircle,
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
        className="flex items-center gap-2 text-sm font-medium"
        style={{ color: "hsl(var(--accent))" }}
      >
        <CheckCircle size={18} /> You&apos;re on the list! We&apos;ll notify you
        when we launch.
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
        className="btn-primary px-5 py-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-60"
      >
        {status === "loading" ? "Joining..." : "Join Waitlist"}
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
        <div className="browser-url font-mono">app.invoicenudge.com</div>
      </div>
      <div className="p-4 sm:p-6">{children}</div>
    </div>
  );
}

/* ─── FAQ Item ──────────────────────────────────────────────────────────── */
function FaqItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <details className="group border-b border-[var(--border)] last:border-0">
      <summary className="flex items-center justify-between py-5 px-4 text-[15px] font-medium text-[var(--text-primary)] cursor-pointer">
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

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════════════════ */
export default function LandingPage() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <main className="relative">
      {/* ── Nav ──────────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-[var(--bg-primary)]/80 border-b border-[var(--border-subtle)]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "hsl(var(--accent))" }}
            >
              <Send size={16} className="text-white" />
            </div>
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
          <button
            className="md:hidden p-2"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            aria-label="Toggle menu"
          >
            {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {/* Mobile Nav */}
        {mobileNavOpen && (
          <div className="md:hidden border-t border-[var(--border)] bg-white px-6 py-4 space-y-4">
            <a
              href="#features"
              className="block text-sm text-[var(--text-secondary)]"
              onClick={() => setMobileNavOpen(false)}
            >
              Features
            </a>
            <a
              href="#pricing"
              className="block text-sm text-[var(--text-secondary)]"
              onClick={() => setMobileNavOpen(false)}
            >
              Pricing
            </a>
            <a
              href="#faq"
              className="block text-sm text-[var(--text-secondary)]"
              onClick={() => setMobileNavOpen(false)}
            >
              FAQ
            </a>
            <a
              href="#waitlist"
              className="btn-primary px-4 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-1.5 w-full"
              onClick={() => setMobileNavOpen(false)}
            >
              Join Waitlist <ArrowRight size={13} />
            </a>
          </div>
        )}
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
                For Freelancers Who Hate Chasing Payments
              </p>
              <h1 className="hero-enter hero-enter-2 mt-4 text-4xl sm:text-5xl lg:text-6xl font-medium tracking-[-0.02em] leading-[1.08] text-[var(--text-primary)]">
                Never chase late payments again
              </h1>
              <p className="hero-enter hero-enter-3 mt-6 text-lg sm:text-xl leading-relaxed text-[var(--text-secondary)] max-w-lg">
                Forward your invoice. Our AI sends polite reminders that sound
                like you — not a robot. Get paid faster without awkward client
                conversations.
              </p>
              <div className="hero-enter hero-enter-4 mt-8">
                <WaitlistForm />
              </div>
              <p className="hero-enter hero-enter-5 mt-4 text-xs text-[var(--text-tertiary)]">
                Launching April 2026 — be one of the first 500 founding members
              </p>
            </div>

            {/* Right — Product Mockup */}
            <div className="hero-enter hero-enter-5 hidden lg:block">
              <BrowserMockup>
                {/* Preview Mode Interface */}
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
                    <div className="flex items-center gap-2">
                      <Eye
                        size={16}
                        style={{ color: "hsl(var(--accent))" }}
                      />
                      <span className="text-sm font-medium">Preview Mode</span>
                    </div>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{
                        background: "hsl(var(--accent) / 0.1)",
                        color: "hsl(var(--accent))",
                      }}
                    >
                      Casual Tone
                    </span>
                  </div>

                  {/* Email Preview */}
                  <div className="p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)]">
                    <div className="flex items-center gap-2 text-xs text-[var(--text-tertiary)] mb-3">
                      <Mail size={12} />
                      <span>To: sarah@designcorp.co</span>
                    </div>
                    <p className="text-sm font-medium text-[var(--text-primary)] mb-2">
                      Quick reminder about invoice #1247
                    </p>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      Hey Sarah! Just wanted to check in on the invoice I sent
                      over for the brand refresh project ($2,500). Let me know
                      if you have any questions — happy to chat!
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button
                      className="flex-1 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2"
                      style={{
                        background: "hsl(var(--accent))",
                        color: "white",
                      }}
                    >
                      <Check size={14} />
                      Approve & Send
                    </button>
                    <button className="flex-1 py-2.5 rounded-lg text-sm font-medium border border-[var(--border)] text-[var(--text-secondary)]">
                      Edit
                    </button>
                  </div>

                  {/* Stats */}
                  <div className="flex gap-4 pt-3 border-t border-[var(--border)]">
                    <div className="text-center">
                      <p className="text-lg font-medium">3</p>
                      <p className="text-xs text-[var(--text-tertiary)]">
                        Reminders sent
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-medium text-emerald-600">
                        $8.4k
                      </p>
                      <p className="text-xs text-[var(--text-tertiary)]">
                        Collected
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-medium">12 days</p>
                      <p className="text-xs text-[var(--text-tertiary)]">
                        Avg time to pay
                      </p>
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
              Built for freelancers who invoice $5k-50k/month and hate chasing
              payments
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-[var(--text-tertiary)]">
              <span className="flex items-center gap-1.5">
                <Mail size={14} /> Gmail
              </span>
              <span className="flex items-center gap-1.5">
                <Mail size={14} /> Outlook
              </span>
              <span className="flex items-center gap-1.5">
                <FileText size={14} /> QuickBooks
              </span>
              <span className="flex items-center gap-1.5">
                <FileText size={14} /> Xero
              </span>
              <span className="flex items-center gap-1.5">
                <CreditCard size={14} /> Stripe
              </span>
              <span className="flex items-center gap-1.5">
                <CreditCard size={14} /> PayPal
              </span>
            </div>
            <p className="mt-6 text-sm text-[var(--text-tertiary)]">
              85% of freelancers experience late payments.{" "}
              <span className="text-[var(--text-secondary)]">
                You&apos;re not alone.
              </span>
            </p>
          </div>
        </section>
      </Reveal>

      {/* ── Problem / Pain Points ────────────────────────────────────────── */}
      <Reveal>
        <section className="max-w-6xl mx-auto px-6 py-20 lg:py-28">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-[-0.02em]">
              The late payment problem is real
            </h2>
            <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
              You didn&apos;t become a freelancer to spend hours chasing
              invoices
            </p>
          </div>
          <div className="mt-14 grid md:grid-cols-3 gap-6 stagger">
            {[
              {
                icon: Clock,
                title: "Wasted Hours",
                desc: "You spend 8-12 hours every month drafting follow-up emails, checking payment status, and stressing about who hasn't paid. That's 3 work weeks per year lost to admin.",
              },
              {
                icon: MessageSquare,
                title: "Awkward Conversations",
                desc: "You don't want to seem desperate or damage the relationship. So you wait... and wait... and the invoice slips to 45 days overdue.",
              },
              {
                icon: AlertCircle,
                title: "Cash Flow Anxiety",
                desc: "It's the 28th and a $3,000 invoice is still unpaid. You're anxiety-checking your bank account wondering if you can make rent.",
              },
            ].map((pain, i) => (
              <Reveal key={i}>
                <div className="p-6 rounded-xl border border-[var(--border)] bg-white">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: "hsl(var(--accent) / 0.08)" }}
                  >
                    <pain.icon
                      size={18}
                      style={{ color: "hsl(var(--accent))" }}
                    />
                  </div>
                  <h3 className="mt-4 text-[15px] font-medium">{pain.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                    {pain.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ── Solution (Before / After) ────────────────────────────────────── */}
      <Reveal>
        <section className="bg-[var(--bg-secondary)] relative">
          <div className="max-w-6xl mx-auto px-6 py-20 lg:py-28">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-[-0.02em]">
                From chasing to collecting
              </h2>
            </div>
            <div className="mt-14 grid md:grid-cols-2 gap-6">
              {/* Before */}
              <div className="p-6 sm:p-8 rounded-xl border border-[var(--border)] bg-white">
                <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-tertiary)]">
                  Before InvoiceNudge
                </p>
                <ul className="mt-4 space-y-3">
                  {[
                    "Invoice due → 15 days pass → Still not paid",
                    "Draft \"polite but firm\" email → Agonize for 30 minutes",
                    "Send → Wait → Client ignores → Repeat the cycle",
                    "8-12 hours/month wasted on follow-ups",
                    "Cash flow unpredictable, rent anxiety real",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="text-sm text-[var(--text-secondary)] flex items-start gap-2"
                    >
                      <X
                        size={14}
                        className="text-[var(--text-tertiary)] mt-0.5 shrink-0"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              {/* After */}
              <div
                className="p-6 sm:p-8 rounded-xl border"
                style={{
                  borderColor: "hsl(var(--accent) / 0.2)",
                  background: "hsl(var(--accent-light))",
                }}
              >
                <p
                  className="text-xs font-medium uppercase tracking-wider"
                  style={{ color: "hsl(var(--accent))" }}
                >
                  After InvoiceNudge
                </p>
                <ul className="mt-4 space-y-3">
                  {[
                    "Forward invoice → AI handles everything",
                    "Day 0: Friendly reminder. Day 7: Check-in. Day 14: Follow-up",
                    "Client pays in 14 days instead of 39",
                    "10 seconds/month instead of 10 hours",
                    "Predictable cash flow, peace of mind",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="text-sm text-[var(--text-primary)] flex items-start gap-2"
                    >
                      <Check
                        size={14}
                        className="mt-0.5 shrink-0"
                        style={{ color: "hsl(var(--accent))" }}
                      />
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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-[-0.02em]">
              Everything you need to get paid
            </h2>
            <p className="mt-4 text-[var(--text-secondary)]">
              Built for freelancers who want results, not complexity
            </p>
          </div>
          {/* Bento Grid */}
          <div className="mt-14 grid md:grid-cols-3 gap-4 stagger">
            {/* Large card — spans 2 cols */}
            <Reveal className="md:col-span-2 p-6 sm:p-8 rounded-xl border border-[var(--border)] bg-white">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: "hsl(var(--accent) / 0.08)" }}
              >
                <Sparkles
                  size={18}
                  style={{ color: "hsl(var(--accent))" }}
                />
              </div>
              <h3 className="mt-4 text-lg font-medium">AI Tone Matching</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-secondary)] max-w-md">
                AI learns your communication style from your original invoice.
                Casual freelancer? Friendly nudges. Buttoned-up consultant?
                Professional reminders. Never sounds like a robot.
              </p>
            </Reveal>
            {/* Small card */}
            <Reveal className="p-6 sm:p-8 rounded-xl border border-[var(--border)] bg-white">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: "hsl(var(--accent) / 0.08)" }}
              >
                <Eye size={18} style={{ color: "hsl(var(--accent))" }} />
              </div>
              <h3 className="mt-4 text-[15px] font-medium">Preview Mode</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                See every reminder before it sends. Approve with one click, or
                edit the wording. You&apos;re always in control.
              </p>
            </Reveal>
            {/* Small card */}
            <Reveal className="p-6 sm:p-8 rounded-xl border border-[var(--border)] bg-white">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: "hsl(var(--accent) / 0.08)" }}
              >
                <Calendar size={18} style={{ color: "hsl(var(--accent))" }} />
              </div>
              <h3 className="mt-4 text-[15px] font-medium">
                Escalating Politeness
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                Day 0: Friendly. Day 7: Check-in. Day 14: Firm. Day 21: Final
                notice. The AI knows when to turn up the heat.
              </p>
            </Reveal>
            {/* Large card — spans 2 cols */}
            <Reveal className="md:col-span-2 p-6 sm:p-8 rounded-xl border border-[var(--border)] bg-white">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: "hsl(var(--accent) / 0.08)" }}
              >
                <Zap size={18} style={{ color: "hsl(var(--accent))" }} />
              </div>
              <h3 className="mt-4 text-lg font-medium">
                Email-Forward Workflow
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-secondary)] max-w-md">
                No complex setup. No accounting software required. Just forward
                your invoice to followup@invoicenudge.com and we handle the rest
                in 60 seconds.
              </p>
            </Reveal>
            {/* Two more small cards */}
            <Reveal className="p-6 sm:p-8 rounded-xl border border-[var(--border)] bg-white">
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
                Track days-to-payment before vs after. See exactly how much
                time and money you&apos;re saving.
              </p>
            </Reveal>
            <Reveal className="md:col-span-2 p-6 sm:p-8 rounded-xl border border-[var(--border)] bg-white">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: "hsl(var(--accent) / 0.08)" }}
              >
                <CreditCard size={18} style={{ color: "hsl(var(--accent))" }} />
              </div>
              <h3 className="mt-4 text-lg font-medium">Works With Everything</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-secondary)] max-w-md">
                Zelle, Venmo, PayPal, check, wire, crypto — we don&apos;t care
                how clients pay. We just make sure they pay on time. No payment
                processor lock-in.
              </p>
            </Reveal>
          </div>
        </section>
      </Reveal>

      {/* ── How It Works ─────────────────────────────────────────────────── */}
      <Reveal>
        <section className="bg-[var(--text-primary)] text-white relative">
          <div className="max-w-6xl mx-auto px-6 py-20 lg:py-28">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-[-0.02em]">
                How it works
              </h2>
              <p className="mt-4 text-white/60">
                From invoice to payment in 3 simple steps
              </p>
            </div>
            <div className="mt-14 grid md:grid-cols-3 gap-12 stagger">
              {[
                {
                  step: "01",
                  title: "Forward your invoice",
                  desc: "Send any invoice email to followup@invoicenudge.com. Our AI extracts client name, amount, and due date automatically.",
                  icon: Mail,
                },
                {
                  step: "02",
                  title: "AI drafts your reminders",
                  desc: "Based on your tone and the invoice details, AI creates a sequence of reminders (Day 0, 7, 14, 21). Review them in Preview Mode.",
                  icon: Sparkles,
                },
                {
                  step: "03",
                  title: "Get paid, stress-free",
                  desc: "Reminders send automatically. You get notified when clients reply. Focus on client work, not payment chasing.",
                  icon: DollarSign,
                },
              ].map((s, i) => (
                <Reveal key={i}>
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-light text-white/20">
                        {s.step}
                      </span>
                      <s.icon size={20} className="text-white/40" />
                    </div>
                    <h3 className="mt-4 text-[15px] font-medium">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">
                      {s.desc}
                    </p>
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
              Built for freelancers like you
            </h2>
            <p className="mt-4 text-[var(--text-secondary)]">
              See how different freelancers would use InvoiceNudge
            </p>
          </div>
          <div className="mt-14 grid md:grid-cols-3 gap-6 stagger">
            {[
              {
                role: "The Solo Designer",
                context: "Freelance graphic designer, 5-8 clients/month",
                narrative:
                  "Uses Google Docs for invoicing. Spends Fridays chasing late payments instead of new projects. InvoiceNudge handles follow-ups so Friday becomes a client work day again.",
                icon: Users,
              },
              {
                role: "The Busy Consultant",
                context: "Independent marketing consultant, $80-150k/year",
                narrative:
                  "Has 10-15 invoices outstanding at any time. Considered hiring a VA just to handle AR. InvoiceNudge replaces the VA for $19/month instead of $500/month.",
                icon: BarChart3,
              },
              {
                role: "The Agency Owner",
                context: "Small agency (2-3 people), 30+ invoices/month",
                narrative:
                  "Clients on NET-30 terms. Late payments affect cash flow and team payroll. The Agency plan automates collection across the whole team with white-label emails.",
                icon: Users,
              },
            ].map((uc, i) => (
              <Reveal key={i}>
                <div className="p-6 rounded-xl border border-[var(--border)] bg-white">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: "hsl(var(--accent) / 0.08)" }}
                  >
                    <uc.icon
                      size={18}
                      style={{ color: "hsl(var(--accent))" }}
                    />
                  </div>
                  <p
                    className="mt-4 text-xs font-medium uppercase tracking-wider"
                    style={{ color: "hsl(var(--accent))" }}
                  >
                    {uc.role}
                  </p>
                  <p className="mt-1 text-xs text-[var(--text-tertiary)]">
                    {uc.context}
                  </p>
                  <p className="mt-4 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                    {uc.narrative}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ── Pricing ──────────────────────────────────────────────────────── */}
      <Reveal>
        <section id="pricing" className="bg-[var(--bg-secondary)] relative">
          <div className="max-w-5xl mx-auto px-6 py-20 lg:py-28">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-[-0.02em]">
                Simple, transparent pricing
              </h2>
              <p className="mt-3 text-sm text-[var(--text-tertiary)]">
                Planned launch pricing — founding members lock in rates forever
              </p>
            </div>
            <div className="mt-14 grid md:grid-cols-3 gap-6 stagger">
              {[
                {
                  name: "Starter",
                  price: "$19",
                  period: "/mo",
                  annual: "$199/yr (save $29)",
                  features: [
                    "10 invoices/month",
                    "AI reminders (Day 0/7/14/21)",
                    "Preview Mode",
                    "Email-forward workflow",
                    "Basic dashboard",
                  ],
                  recommended: false,
                },
                {
                  name: "Pro",
                  price: "$49",
                  period: "/mo",
                  annual: "$499/yr (save $89)",
                  features: [
                    "50 invoices/month",
                    "Everything in Starter",
                    "Autopilot Mode",
                    "Client reply detection",
                    "Custom reminder schedules",
                    "Priority support (4hr)",
                  ],
                  recommended: true,
                },
                {
                  name: "Agency",
                  price: "$149",
                  period: "/mo",
                  annual: "$1,499/yr (save $289)",
                  features: [
                    "Unlimited invoices",
                    "Everything in Pro",
                    "3 team seats",
                    "White-label emails",
                    "Dedicated account manager",
                    "API access",
                  ],
                  recommended: false,
                },
              ].map((tier, i) => (
                <Reveal key={i}>
                  <div
                    className={`p-6 sm:p-8 rounded-xl border bg-white flex flex-col ${
                      tier.recommended
                        ? "pricing-recommended ring-1 ring-[hsl(var(--accent)/0.2)]"
                        : "border-[var(--border)]"
                    }`}
                  >
                    {tier.recommended && (
                      <span
                        className="self-start text-xs font-medium px-2.5 py-0.5 rounded-full mb-4"
                        style={{
                          background: "hsl(var(--accent) / 0.1)",
                          color: "hsl(var(--accent))",
                        }}
                      >
                        Most Popular
                      </span>
                    )}
                    <p className="text-sm font-medium text-[var(--text-secondary)]">
                      {tier.name}
                    </p>
                    <p className="mt-2 flex items-baseline gap-1">
                      <span className="text-3xl font-medium">{tier.price}</span>
                      <span className="text-sm text-[var(--text-tertiary)]">
                        {tier.period}
                      </span>
                    </p>
                    <p className="mt-1 text-xs text-[var(--text-tertiary)]">
                      {tier.annual}
                    </p>
                    <ul className="mt-6 space-y-3 flex-1">
                      {tier.features.map((f, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2 text-sm text-[var(--text-secondary)]"
                        >
                          <Check
                            size={14}
                            className="mt-0.5 shrink-0"
                            style={{ color: "hsl(var(--accent))" }}
                          />
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
            <div className="mt-12 max-w-xl mx-auto text-center text-sm text-[var(--text-tertiary)] space-y-2">
              <p>
                <strong className="text-[var(--text-secondary)]">
                  Free trial?
                </strong>{" "}
                Yes, 7 days free on all plans. No credit card required.
              </p>
              <p>
                <strong className="text-[var(--text-secondary)]">
                  Can I cancel?
                </strong>{" "}
                Anytime, no questions asked. 60-day money-back guarantee.
              </p>
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
          <div className="mt-12 border-t border-[var(--border)]">
            <FaqItem
              question="What if the AI writes something that upsets my client?"
              answer="That's why we built Preview Mode. You approve every reminder before it sends. After 5 approvals, you can unlock Autopilot Mode — or stay in Preview forever. You're always in control of every word that goes to your clients."
            />
            <FaqItem
              question="Why not just use Wave for free?"
              answer="Wave's reminders only work if you accept payments through Wave (2.9% + $0.60 per transaction). On $10k/month invoices, that's $290/month in fees. InvoiceNudge is $19/month flat and works with any payment method — Zelle, Venmo, check, whatever you prefer."
            />
            <FaqItem
              question="How is this different from FreshBooks?"
              answer="FreshBooks is $19-60/month for invoicing + expenses + time tracking + reminders. Most freelancers only use 2 of those features. InvoiceNudge does one thing — payment reminders — and does it 10X better with AI tone matching that sounds like you, not a template."
            />
            <FaqItem
              question="What if my invoices go to spam?"
              answer="We use Resend, the same email infrastructure as Linear and Vercel. SPF/DKIM/DMARC are configured automatically for optimal deliverability. If deliverability fails and you're not seeing results, you get a full refund under our 60-day guarantee."
            />
            <FaqItem
              question="Can I use this with my existing invoicing tool?"
              answer="Yes. Keep using Google Docs, Bonsai, HoneyBook, or whatever you use now. Just forward the invoice email to followup@invoicenudge.com. No complex integration required — it works with any invoicing system."
            />
            <FaqItem
              question="I only have 2-3 late invoices per year. Is this worth it?"
              answer="Those 2-3 invoices likely equal $5k-10k tied up for 30-60 days. If InvoiceNudge collects even one invoice 14 days faster, you save $50-100 in opportunity cost (credit card float, late fees on your own bills). It pays for itself in month one."
            />
            <FaqItem
              question="When does InvoiceNudge launch?"
              answer="April 2026. Join the waitlist to be notified first and lock in $19/month founding member pricing. After launch, the Starter plan rises to $29/month for new customers."
            />
            <FaqItem
              question="What's your refund policy?"
              answer="60-day money-back guarantee, no questions asked. If you don't get paid faster, don't love the AI tone, or just change your mind — email us for a full refund. You keep what you collected, we refund your subscription fees."
            />
          </div>
        </section>
      </Reveal>

      {/* ── Final CTA ────────────────────────────────────────────────────── */}
      <Reveal>
        <section id="waitlist" className="bg-[var(--bg-secondary)] relative">
          <div className="max-w-2xl mx-auto px-6 py-20 lg:py-28 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-[-0.02em]">
              Stop chasing. Start collecting.
            </h2>
            <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
              Join 500 founding members who&apos;ll never send an awkward
              payment reminder again. Lock in $19/month forever — before the
              price rises to $29.
            </p>
            <div className="mt-8 flex justify-center">
              <WaitlistForm />
            </div>
            <p className="mt-4 text-xs text-[var(--text-tertiary)]">
              No spam. Just a launch notification and your founding member spot.
            </p>
          </div>
        </section>
      </Reveal>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="border-t border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-md flex items-center justify-center"
                style={{ background: "hsl(var(--accent))" }}
              >
                <Send size={12} className="text-white" />
              </div>
              <span className="text-sm text-[var(--text-tertiary)]">
                InvoiceNudge — AI payment reminders for freelancers
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-[var(--text-tertiary)]">
              <a
                href="#features"
                className="hover:text-[var(--text-secondary)] transition-colors"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="hover:text-[var(--text-secondary)] transition-colors"
              >
                Pricing
              </a>
              <a
                href="#faq"
                className="hover:text-[var(--text-secondary)] transition-colors"
              >
                FAQ
              </a>
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
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-[var(--border)] text-center text-xs text-[var(--text-tertiary)]">
            © 2026 InvoiceNudge. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}