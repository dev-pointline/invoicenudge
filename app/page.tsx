"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Clock,
  CreditCard,
  FileText,
  Forward,
  Gauge,
  Mail,
  MessageSquare,
  Send,
  Shield,
  Sparkles,
  Timer,
  Users,
  Zap,
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
      <summary className="flex items-center justify-between py-5 px-4 text-[15px] font-medium text-[var(--text-primary)]">
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

/* ─── Mobile Menu ───────────────────────────────────────────────────────── */
function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-xl p-6">
        <button onClick={onClose} className="absolute top-4 right-4 p-2">
          <X size={20} />
        </button>
        <nav className="mt-12 flex flex-col gap-6">
          <a href="#features" onClick={onClose} className="text-[15px] text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Features</a>
          <a href="#pricing" onClick={onClose} className="text-[15px] text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Pricing</a>
          <a href="#faq" onClick={onClose} className="text-[15px] text-[var(--text-secondary)] hover:text-[var(--text-primary)]">FAQ</a>
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="relative">
      {/* ── Nav ──────────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-[var(--bg-primary)]/80 border-b border-[var(--border-subtle)]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-[15px] font-medium tracking-tight flex items-center gap-2">
            <Send size={18} style={{ color: "hsl(var(--accent))" }} />
            InvoiceNudge
          </span>
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
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>
      
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

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
                For freelancers who hate chasing payments
              </p>
              <h1 className="hero-enter hero-enter-2 mt-4 text-4xl sm:text-5xl lg:text-6xl font-medium tracking-[-0.02em] leading-[1.08] text-[var(--text-primary)]">
                Never chase late payments again
              </h1>
              <p className="hero-enter hero-enter-3 mt-6 text-lg sm:text-xl leading-relaxed text-[var(--text-secondary)] max-w-lg">
                Forward your invoice. AI sends polite reminders that sound like
                you — not a robot. Get paid faster without the awkward
                follow-ups.
              </p>
              <div className="hero-enter hero-enter-4 mt-8">
                <WaitlistForm />
              </div>
              <p className="hero-enter hero-enter-5 mt-4 text-xs text-[var(--text-tertiary)]">
                Launching soon — be one of the first to automate collections
              </p>
            </div>

            {/* Right — Product Mockup */}
            <div className="hero-enter hero-enter-5">
              <BrowserMockup>
                {/* Email Inbox Mockup */}
                <div className="space-y-3">
                  {/* Forwarded Invoice */}
                  <div className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
                    <div className="flex items-start gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: "hsl(var(--accent) / 0.1)" }}
                      >
                        <FileText
                          size={14}
                          style={{ color: "hsl(var(--accent))" }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-xs font-medium truncate">
                            Invoice #1247 — Logo Design
                          </p>
                          <span className="text-[10px] text-[var(--text-tertiary)] shrink-0">
                            Just now
                          </span>
                        </div>
                        <p className="text-[11px] text-[var(--text-tertiary)] mt-0.5">
                          From: you → followup@invoicenudge.com
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-xs font-medium">$2,500</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-600">
                            Due Apr 15
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* AI Draft */}
                  <div
                    className="p-3 rounded-lg border"
                    style={{
                      borderColor: "hsl(var(--accent) / 0.2)",
                      background: "hsl(var(--accent-light))",
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: "hsl(var(--accent) / 0.15)" }}
                      >
                        <Sparkles
                          size={14}
                          style={{ color: "hsl(var(--accent))" }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-medium">AI Draft Ready</p>
                          <span
                            className="text-[10px] px-1.5 py-0.5 rounded-full"
                            style={{
                              background: "hsl(var(--accent) / 0.1)",
                              color: "hsl(var(--accent))",
                            }}
                          >
                            Matches your tone
                          </span>
                        </div>
                        <p className="text-[11px] text-[var(--text-secondary)] mt-2 leading-relaxed">
                          &ldquo;Hey! Just a heads up that invoice #1247 for the
                          logo project is due today. Let me know if you have any
                          questions! Thanks so much.&rdquo;
                        </p>
                        <div className="mt-3 flex items-center gap-2">
                          <button
                            className="pulse-glow text-[11px] font-medium px-3 py-1.5 rounded-md text-white"
                            style={{ background: "hsl(var(--accent))" }}
                          >
                            Approve
                          </button>
                          <button className="text-[11px] font-medium px-3 py-1.5 rounded-md border border-[var(--border)] text-[var(--text-secondary)]">
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Scheduled Reminders */}
                  <div className="px-3 py-2 text-[10px] text-[var(--text-tertiary)] flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Clock size={10} /> Day 7: Apr 22
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={10} /> Day 14: Apr 29
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={10} /> Day 21: May 6
                    </span>
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
              85% of freelancers experience late payments. We&apos;re building
              the fix.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-medium text-[var(--text-tertiary)]">
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
          </div>
        </section>
      </Reveal>

      {/* ── Problem / Pain Points ────────────────────────────────────────── */}
      <Reveal>
        <section className="max-w-6xl mx-auto px-6 py-20 lg:py-28">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-[-0.02em]">
              Sound familiar?
            </h2>
            <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
              You&apos;re great at your craft. But chasing payments? That&apos;s
              a different story.
            </p>
          </div>
          <div className="mt-14 grid md:grid-cols-3 gap-6 stagger">
            <Reveal>
              <div className="p-6 rounded-xl border border-[var(--border)] bg-white">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: "hsl(var(--accent) / 0.08)" }}
                >
                  <Timer size={18} style={{ color: "hsl(var(--accent))" }} />
                </div>
                <h3 className="mt-4 text-[15px] font-medium">
                  Hours wasted chasing
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                  You spend 8-12 hours every month writing &ldquo;just checking
                  in&rdquo; emails instead of doing billable work. That&apos;s
                  $200-400 in lost income.
                </p>
              </div>
            </Reveal>
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
                  Awkward client dynamics
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                  Every follow-up feels like nagging. You hesitate, wordsmith
                  for 30 minutes, then send something passive-aggressive anyway.
                </p>
              </div>
            </Reveal>
            <Reveal>
              <div className="p-6 rounded-xl border border-[var(--border)] bg-white">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: "hsl(var(--accent) / 0.08)" }}
                >
                  <Gauge size={18} style={{ color: "hsl(var(--accent))" }} />
                </div>
                <h3 className="mt-4 text-[15px] font-medium">
                  Cash flow anxiety
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                  It&apos;s the 28th and that $3,000 invoice still hasn&apos;t
                  cleared. Can you make rent? 42% of freelancers miss bills due
                  to late client payments.
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      </Reveal>

      {/* ── Solution (Before / After) ────────────────────────────────────── */}
      <Reveal>
        <section className="bg-[var(--bg-secondary)] relative">
          <div className="max-w-6xl mx-auto px-6 py-20 lg:py-28">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-[-0.02em]">
                There&apos;s a better way
              </h2>
            </div>
            <div className="mt-14 grid md:grid-cols-2 gap-6">
              {/* Before */}
              <div className="p-8 rounded-xl border border-[var(--border)] bg-white">
                <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-tertiary)]">
                  Before
                </p>
                <ul className="mt-5 space-y-4">
                  <li className="text-[15px] text-[var(--text-secondary)] flex items-start gap-3">
                    <span className="text-red-400 mt-0.5 shrink-0">
                      <X size={14} />
                    </span>
                    <span>
                      Invoice is due → 15 days pass → Realize you need to follow
                      up
                    </span>
                  </li>
                  <li className="text-[15px] text-[var(--text-secondary)] flex items-start gap-3">
                    <span className="text-red-400 mt-0.5 shrink-0">
                      <X size={14} />
                    </span>
                    <span>
                      Draft reminder → Agonize over wording (30 min) →
                      &ldquo;Am I too pushy?&rdquo;
                    </span>
                  </li>
                  <li className="text-[15px] text-[var(--text-secondary)] flex items-start gap-3">
                    <span className="text-red-400 mt-0.5 shrink-0">
                      <X size={14} />
                    </span>
                    <span>
                      Send → Wait → No response → Repeat awkwardly for 3 weeks
                    </span>
                  </li>
                  <li className="text-[15px] text-[var(--text-secondary)] flex items-start gap-3">
                    <span className="text-red-400 mt-0.5 shrink-0">
                      <X size={14} />
                    </span>
                    <span>Finally get paid Day 40. Wonder if you damaged the relationship.</span>
                  </li>
                </ul>
              </div>
              {/* After */}
              <div
                className="p-8 rounded-xl border"
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
                <ul className="mt-5 space-y-4">
                  <li className="text-[15px] text-[var(--text-primary)] flex items-start gap-3">
                    <Check
                      size={14}
                      className="mt-0.5 shrink-0"
                      style={{ color: "hsl(var(--accent))" }}
                    />
                    <span>Forward invoice to followup@invoicenudge.com (10 seconds)</span>
                  </li>
                  <li className="text-[15px] text-[var(--text-primary)] flex items-start gap-3">
                    <Check
                      size={14}
                      className="mt-0.5 shrink-0"
                      style={{ color: "hsl(var(--accent))" }}
                    />
                    <span>
                      AI drafts reminders matching YOUR tone — approve with one click
                    </span>
                  </li>
                  <li className="text-[15px] text-[var(--text-primary)] flex items-start gap-3">
                    <Check
                      size={14}
                      className="mt-0.5 shrink-0"
                      style={{ color: "hsl(var(--accent))" }}
                    />
                    <span>
                      Reminders go out Day 0, 7, 14, 21 automatically. Zero time spent.
                    </span>
                  </li>
                  <li className="text-[15px] text-[var(--text-primary)] flex items-start gap-3">
                    <Check
                      size={14}
                      className="mt-0.5 shrink-0"
                      style={{ color: "hsl(var(--accent))" }}
                    />
                    <span>
                      Client pays sooner. Relationship intact. You focus on work.
                    </span>
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-[-0.02em]">
              Everything you need to stop chasing
            </h2>
            <p className="mt-4 text-[var(--text-secondary)]">
              Built for freelancers, by someone who hated writing follow-up
              emails
            </p>
          </div>
          {/* Bento: 2 large + 4 small */}
          <div className="mt-14 grid md:grid-cols-3 gap-4 stagger">
            {/* Large card — spans 2 cols */}
            <Reveal className="md:col-span-2 p-8 rounded-xl border border-[var(--border)] bg-white">
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
                No complex setup. No accounting software required. Just forward
                any invoice email to followup@invoicenudge.com. AI parses the
                client name, amount, and due date in 60 seconds.
              </p>
            </Reveal>
            {/* Small card */}
            <Reveal className="p-8 rounded-xl border border-[var(--border)] bg-white">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: "hsl(var(--accent) / 0.08)" }}
              >
                <Sparkles size={18} style={{ color: "hsl(var(--accent))" }} />
              </div>
              <h3 className="mt-4 text-[15px] font-medium">AI Tone Matching</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                Learns from your original invoice email. Casual freelancer?
                Formal consultant? AI matches your voice so clients think
                it&apos;s you.
              </p>
            </Reveal>
            {/* Small card */}
            <Reveal className="p-8 rounded-xl border border-[var(--border)] bg-white">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: "hsl(var(--accent) / 0.08)" }}
              >
                <Shield size={18} style={{ color: "hsl(var(--accent))" }} />
              </div>
              <h3 className="mt-4 text-[15px] font-medium">Preview Mode</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                See every reminder before it sends. Approve with one click, or
                edit if needed. Full control — we never send without your
                permission.
              </p>
            </Reveal>
            {/* Large card — spans 2 cols */}
            <Reveal className="md:col-span-2 p-8 rounded-xl border border-[var(--border)] bg-white">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: "hsl(var(--accent) / 0.08)" }}
              >
                <Zap size={18} style={{ color: "hsl(var(--accent))" }} />
              </div>
              <h3 className="mt-4 text-lg font-medium">
                Escalating Politeness Ladder
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-secondary)] max-w-md">
                Day 0: friendly reminder. Day 7: check-in. Day 14: firm but
                professional. Day 21: final notice. Each message is calibrated
                to maintain your relationship while getting you paid.
              </p>
            </Reveal>
            {/* Small card */}
            <Reveal className="p-8 rounded-xl border border-[var(--border)] bg-white">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: "hsl(var(--accent) / 0.08)" }}
              >
                <CreditCard size={18} style={{ color: "hsl(var(--accent))" }} />
              </div>
              <h3 className="mt-4 text-[15px] font-medium">Any Payment Method</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                Works with Stripe, PayPal, Zelle, Venmo, wire, check — whatever
                you use. We track due dates, not payment processing.
              </p>
            </Reveal>
            {/* Small card */}
            <Reveal className="p-8 rounded-xl border border-[var(--border)] bg-white">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: "hsl(var(--accent) / 0.08)" }}
              >
                <Gauge size={18} style={{ color: "hsl(var(--accent))" }} />
              </div>
              <h3 className="mt-4 text-[15px] font-medium">Savings Dashboard</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                Track your ROI: &ldquo;Average days to payment: 42 → 26&rdquo;
                and &ldquo;Time saved this month: 9.5 hours&rdquo; so you know
                it&apos;s working.
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
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-[-0.02em]">
                How it works
              </h2>
              <p className="mt-4 text-white/60">
                From invoice to paid in three steps
              </p>
            </div>
            <div className="mt-14 grid md:grid-cols-3 gap-12 stagger">
              <Reveal>
                <div>
                  <span className="text-4xl font-light text-white/20">01</span>
                  <div
                    className="mt-4 w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ background: "hsl(var(--accent) / 0.2)" }}
                  >
                    <Forward size={20} style={{ color: "hsl(var(--accent))" }} />
                  </div>
                  <h3 className="mt-4 text-[15px] font-medium">Forward</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    Send any invoice email to followup@invoicenudge.com. AI
                    extracts client, amount, and due date automatically.
                  </p>
                </div>
              </Reveal>
              <Reveal>
                <div>
                  <span className="text-4xl font-light text-white/20">02</span>
                  <div
                    className="mt-4 w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ background: "hsl(var(--accent) / 0.2)" }}
                  >
                    <Check size={20} style={{ color: "hsl(var(--accent))" }} />
                  </div>
                  <h3 className="mt-4 text-[15px] font-medium">Approve</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    AI drafts reminders matching your tone. Review and approve
                    with one click (or enable autopilot after you trust it).
                  </p>
                </div>
              </Reveal>
              <Reveal>
                <div>
                  <span className="text-4xl font-light text-white/20">03</span>
                  <div
                    className="mt-4 w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ background: "hsl(var(--accent) / 0.2)" }}
                  >
                    <Send size={20} style={{ color: "hsl(var(--accent))" }} />
                  </div>
                  <h3 className="mt-4 text-[15px] font-medium">Get Paid</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    Reminders go out on schedule. Clients pay. You focus on the
                    work you love — not awkward follow-ups.
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-[-0.02em]">
              Built for every kind of freelancer
            </h2>
            <p className="mt-4 text-[var(--text-secondary)]">
              Whether you&apos;re solo or scaling, InvoiceNudge handles the
              chase
            </p>
          </div>
          <div className="mt-14 grid md:grid-cols-3 gap-6 stagger">
            <Reveal>
              <div className="p-6 rounded-xl border border-[var(--border)] bg-white">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: "hsl(var(--accent) / 0.08)" }}
                >
                  <FileText size={18} style={{ color: "hsl(var(--accent))" }} />
                </div>
                <p
                  className="mt-4 text-xs font-medium uppercase tracking-wider"
                  style={{ color: "hsl(var(--accent))" }}
                >
                  The Solo Designer
                </p>
                <p className="mt-1 text-xs text-[var(--text-tertiary)]">
                  Juggles 5-8 clients monthly
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                  Invoices $2k-5k projects but spends evenings stressing about
                  who&apos;s paid. With InvoiceNudge, they forward each invoice
                  once and focus on designing — not drafting awkward emails.
                </p>
              </div>
            </Reveal>
            <Reveal>
              <div className="p-6 rounded-xl border border-[var(--border)] bg-white">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: "hsl(var(--accent) / 0.08)" }}
                >
                  <Users size={18} style={{ color: "hsl(var(--accent))" }} />
                </div>
                <p
                  className="mt-4 text-xs font-medium uppercase tracking-wider"
                  style={{ color: "hsl(var(--accent))" }}
                >
                  The Busy Consultant
                </p>
                <p className="mt-1 text-xs text-[var(--text-tertiary)]">
                  20+ hours/week of client calls
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                  Sends $10k+ invoices but can&apos;t afford to look desperate
                  following up with senior executives. AI maintains professional
                  distance while ensuring timely payment.
                </p>
              </div>
            </Reveal>
            <Reveal>
              <div className="p-6 rounded-xl border border-[var(--border)] bg-white">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: "hsl(var(--accent) / 0.08)" }}
                >
                  <Zap size={18} style={{ color: "hsl(var(--accent))" }} />
                </div>
                <p
                  className="mt-4 text-xs font-medium uppercase tracking-wider"
                  style={{ color: "hsl(var(--accent))" }}
                >
                  The Growing Freelancer
                </p>
                <p className="mt-1 text-xs text-[var(--text-tertiary)]">
                  Scaling from solo to small team
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                  Needs systems that scale. Considering hiring a VA just for
                  payment follow-ups ($1,500/month). InvoiceNudge is the first
                  hire that costs $19/month instead.
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      </Reveal>

      {/* ── Pricing ──────────────────────────────────────────────────────── */}
      <Reveal>
        <section id="pricing" className="bg-[var(--bg-secondary)] relative">
          <div className="max-w-5xl mx-auto px-6 py-20 lg:py-28">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-[-0.02em]">
                Simple, transparent pricing
              </h2>
              <p className="mt-3 text-sm text-[var(--text-tertiary)]">
                Planned launch pricing — founding members lock in rates forever
              </p>
            </div>
            <div className="mt-14 grid md:grid-cols-3 gap-6 stagger">
              {/* Starter */}
              <Reveal>
                <div className="p-8 rounded-xl border border-[var(--border)] bg-white flex flex-col h-full">
                  <p className="text-sm font-medium text-[var(--text-secondary)]">
                    Starter
                  </p>
                  <p className="mt-2 flex items-baseline gap-1">
                    <span className="text-3xl font-medium">$19</span>
                    <span className="text-sm text-[var(--text-tertiary)]">
                      /mo
                    </span>
                  </p>
                  <p className="mt-1 text-xs text-[var(--text-tertiary)]">
                    or $199/year (save $29)
                  </p>
                  <ul className="mt-6 space-y-3 flex-1">
                    <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <Check
                        size={14}
                        className="mt-0.5 shrink-0"
                        style={{ color: "hsl(var(--accent))" }}
                      />
                      10 invoices/month
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
                      Email-forward workflow
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
                    className="mt-8 block text-center py-2.5 rounded-lg text-sm font-medium border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    Join Waitlist
                  </a>
                </div>
              </Reveal>

              {/* Pro — Recommended */}
              <Reveal>
                <div className="p-8 rounded-xl border bg-white flex flex-col h-full pricing-recommended ring-1 ring-[hsl(var(--accent)/0.2)]">
                  <span
                    className="self-start text-xs font-medium px-2.5 py-0.5 rounded-full mb-3"
                    style={{
                      background: "hsl(var(--accent) / 0.1)",
                      color: "hsl(var(--accent))",
                    }}
                  >
                    Most Popular
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
                  <p className="mt-1 text-xs text-[var(--text-tertiary)]">
                    or $499/year (save $89)
                  </p>
                  <ul className="mt-6 space-y-3 flex-1">
                    <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <Check
                        size={14}
                        className="mt-0.5 shrink-0"
                        style={{ color: "hsl(var(--accent))" }}
                      />
                      50 invoices/month
                    </li>
                    <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <Check
                        size={14}
                        className="mt-0.5 shrink-0"
                        style={{ color: "hsl(var(--accent))" }}
                      />
                      Everything in Starter
                    </li>
                    <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <Check
                        size={14}
                        className="mt-0.5 shrink-0"
                        style={{ color: "hsl(var(--accent))" }}
                      />
                      <strong>Autopilot Mode</strong>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <Check
                        size={14}
                        className="mt-0.5 shrink-0"
                        style={{ color: "hsl(var(--accent))" }}
                      />
                      Client reply detection
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
                      Zapier integration
                    </li>
                    <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <Check
                        size={14}
                        className="mt-0.5 shrink-0"
                        style={{ color: "hsl(var(--accent))" }}
                      />
                      Priority support (4hr)
                    </li>
                  </ul>
                  <a
                    href="#waitlist"
                    className="btn-primary mt-8 block text-center py-2.5 rounded-lg text-sm font-medium"
                  >
                    Join Waitlist
                  </a>
                </div>
              </Reveal>

              {/* Agency */}
              <Reveal>
                <div className="p-8 rounded-xl border border-[var(--border)] bg-white flex flex-col h-full">
                  <p className="text-sm font-medium text-[var(--text-secondary)]">
                    Agency
                  </p>
                  <p className="mt-2 flex items-baseline gap-1">
                    <span className="text-3xl font-medium">$149</span>
                    <span className="text-sm text-[var(--text-tertiary)]">
                      /mo
                    </span>
                  </p>
                  <p className="mt-1 text-xs text-[var(--text-tertiary)]">
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
                      Everything in Pro
                    </li>
                    <li className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <Check
                        size={14}
                        className="mt-0.5 shrink-0"
                        style={{ color: "hsl(var(--accent))" }}
                      />
                      3 team seats
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
                    className="mt-8 block text-center py-2.5 rounded-lg text-sm font-medium border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    Join Waitlist
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Guarantee */}
            <div className="mt-10 text-center">
              <p className="text-sm text-[var(--text-secondary)]">
                <Shield
                  size={14}
                  className="inline mr-1.5"
                  style={{ color: "hsl(var(--accent))" }}
                />
                60-day money-back guarantee — if you don&apos;t love it, we
                refund everything
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <Reveal>
        <section id="faq" className="max-w-3xl mx-auto px-6 py-20 lg:py-28">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-[-0.02em] text-center">
            Frequently Asked Questions
          </h2>
          <div className="mt-12 border-t border-[var(--border)]">
            <FaqItem
              question="When does InvoiceNudge launch?"
              answer="We're targeting Q2 2026. Join the waitlist to be notified first and lock in founding member pricing ($19/month forever, even when we raise prices)."
            />
            <FaqItem
              question="How is this different from FreshBooks reminders?"
              answer="FreshBooks bundles reminders with accounting features (expense tracking, payroll, tax forms) you may not need — and charges $19-60/month. We do one thing exceptionally: AI-powered reminders that sound like you. If you just need reminders without the accounting bloat, InvoiceNudge is built for you."
            />
            <FaqItem
              question="What if the AI writes something weird?"
              answer="Preview Mode shows every email before it sends. You approve or edit with one click. AI learns from your edits. After you've approved 5+ reminders and see the AI matches your tone, you can unlock Autopilot Mode — or stay in Preview Mode forever. Full control."
            />
            <FaqItem
              question="Does this work with my invoicing tool?"
              answer="Yes! We don't replace your invoicing tool — we just handle reminders. Forward any invoice email (from Bonsai, QuickBooks, Google Docs, whatever) to followup@invoicenudge.com. We parse the details automatically."
            />
            <FaqItem
              question="Will my clients know it's automated?"
              answer="No. Emails come from your email address via Resend's infrastructure (same as Linear, Vercel use). Clients see 'from: you@yourdomain.com' — no InvoiceNudge branding anywhere in the message."
            />
            <FaqItem
              question="What if emails go to spam?"
              answer="We use Resend (98%+ deliverability, trusted by 10,000+ companies). SPF/DKIM/DMARC are configured automatically for your domain. If deliverability is ever an issue, we'll work with you personally to fix it — and our 60-day money-back guarantee applies."
            />
            <FaqItem
              question="Can I cancel anytime?"
              answer="Yes. No contracts, no lock-in. Cancel with one click from your dashboard. If you're not satisfied for any reason in the first 60 days, email us for a full refund — no questions asked."
            />
            <FaqItem
              question="What if a client replies 'I paid yesterday'?"
              answer="Pro tier includes client reply detection. When a client replies confirming payment, AI reads the message and stops future reminders automatically. No more embarrassing duplicate follow-ups."
            />
          </div>
        </section>
      </Reveal>

      {/* ── Final CTA ────────────────────────────────────────────────────── */}
      <Reveal>
        <section id="waitlist" className="bg-[var(--bg-secondary)] relative">
          <div className="max-w-2xl mx-auto px-6 py-20 lg:py-28 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-[-0.02em]">
              Stop losing hours to payment follow-ups
            </h2>
            <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
              Join the waitlist and lock in $19/month founding member pricing
              before we raise prices. Be one of the first to automate the
              chase.
            </p>
            <div className="mt-8 flex justify-center">
              <WaitlistForm />
            </div>
            <p className="mt-4 text-xs text-[var(--text-tertiary)]">
              No spam. Just a launch notification + founding member perks.
            </p>
          </div>
        </section>
      </Reveal>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="border-t border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 text-sm text-[var(--text-tertiary)]">
              <Send size={16} style={{ color: "hsl(var(--accent))" }} />
              <span>
                © 2026 InvoiceNudge. Automated payment reminders that sound like
                you.
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
                aria-label="Twitter"
              >
                𝕏
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* ── Mobile Sticky CTA ────────────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-[var(--border)] md:hidden z-40">
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