"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Clock,
  CreditCard,
  FileText,
  Gauge,
  Mail,
  MessageSquare,
  Send,
  Sparkles,
  Timer,
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
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

function WaitlistForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

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
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "You're on the list!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong");
      }
    } catch {
      setStatus("error");
      setMessage("Failed to join waitlist");
    }
  }

  if (status === "success") {
    return (
      <div className="flex items-center gap-2 text-sm font-medium" style={{ color: "hsl(var(--accent))" }}>
        <Check size={16} /> {message}
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
        className="input-field flex-1"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary px-5 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-60"
      >
        {status === "loading" ? "Joining..." : "Join Waitlist"}
        <ArrowRight size={14} />
      </button>
      {status === "error" && <p className="text-red-500 text-sm mt-1">{message}</p>}
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
        <div className="browser-url font-mono">app.invoicenudge.com</div>
      </div>
      <div className="p-4 sm:p-6">{children}</div>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group border-b border-[var(--border)] last:border-0">
      <summary className="flex items-center justify-between py-5 px-4 text-[15px] font-medium text-[var(--text-primary)]">
        {question}
        <ChevronDown size={16} className="faq-chevron text-[var(--text-tertiary)] shrink-0 ml-4" />
      </summary>
      <div className="pb-5 px-4 text-[15px] leading-relaxed text-[var(--text-secondary)]">{answer}</div>
    </details>
  );
}

function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-xl p-6">
        <button onClick={onClose} className="absolute top-4 right-4 p-2" aria-label="Close menu">
          <X size={20} />
        </button>
        <nav className="mt-12 flex flex-col gap-6">
          <a href="#features" onClick={onClose} className="text-[15px] text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Features</a>
          <a href="#pricing" onClick={onClose} className="text-[15px] text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Pricing</a>
          <a href="#faq" onClick={onClose} className="text-[15px] text-[var(--text-secondary)] hover:text-[var(--text-primary)]">FAQ</a>
          <a href="#waitlist" onClick={onClose} className="btn-primary px-4 py-2.5 rounded-lg text-sm font-medium text-center">Join Waitlist</a>
        </nav>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="relative">
      {/* Nav */}
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-[var(--bg-primary)]/80 border-b border-[var(--border-subtle)]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-[15px] font-medium tracking-tight flex items-center gap-2">
            <Send size={18} style={{ color: "hsl(var(--accent))" }} />
            InvoiceNudge
          </span>
          <div className="hidden md:flex items-center gap-8 text-sm text-[var(--text-secondary)]">
            <a href="#features" className="hover:text-[var(--text-primary)] transition-colors">Features</a>
            <a href="#pricing" className="hover:text-[var(--text-primary)] transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-[var(--text-primary)] transition-colors">FAQ</a>
            <a href="/login" className="hover:text-[var(--text-primary)] transition-colors">Log in</a>
            <a href="#waitlist" className="btn-primary px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5">
              Join Waitlist <ArrowRight size={13} />
            </a>
          </div>
          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(true)} aria-label="Open menu">
            <Menu size={20} />
          </button>
        </div>
      </nav>
      
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-40" />
        <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-16 lg:pt-24 lg:pb-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="stagger">
              <p className="hero-enter hero-enter-1 text-sm font-medium tracking-wide uppercase" style={{ color: "hsl(var(--accent))" }}>
                For freelancers who hate chasing payments
              </p>
              <h1 className="hero-enter hero-enter-2 mt-4 text-4xl sm:text-5xl lg:text-6xl font-medium tracking-[-0.02em] leading-[1.08] text-[var(--text-primary)]">
                Never chase late payments again
              </h1>
              <p className="hero-enter hero-enter-3 mt-6 text-lg sm:text-xl leading-relaxed text-[var(--text-secondary)] max-w-lg">
                Forward your invoice. AI sends polite reminders that sound like you — not a robot. Get paid faster without the awkward follow-ups.
              </p>
              <div id="waitlist" className="hero-enter hero-enter-4 mt-8">
                <WaitlistForm />
              </div>
              <p className="hero-enter hero-enter-5 mt-4 text-xs text-[var(--text-tertiary)]">
                Launching Q2 2026 — be one of the first to automate collections
              </p>
            </div>

            <div className="hero-enter hero-enter-5">
              <BrowserMockup>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: "hsl(var(--accent) / 0.1)" }}>
                        <FileText size={14} style={{ color: "hsl(var(--accent))" }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-xs font-medium truncate">Invoice #1247 — Logo Design</p>
                          <span className="text-[10px] text-[var(--text-tertiary)] shrink-0">Just now</span>
                        </div>
                        <p className="text-[11px] text-[var(--text-tertiary)] mt-0.5">From: you → followup@invoicenudge.com</p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-xs font-medium">$2,500</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-600">Due Apr 15</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg border" style={{ borderColor: "hsl(var(--accent) / 0.2)", background: "hsl(var(--accent-light))" }}>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: "hsl(var(--accent) / 0.15)" }}>
                        <Sparkles size={14} style={{ color: "hsl(var(--accent))" }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-medium">AI Draft Ready</p>
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: "hsl(var(--accent) / 0.1)", color: "hsl(var(--accent))" }}>
                            Matches your tone
                          </span>
                        </div>
                        <p className="text-[11px] text-[var(--text-secondary)] mt-2 leading-relaxed">
                          &ldquo;Hey! Just a heads up that invoice #1247 for the logo project is due today. Let me know if you have any questions! Thanks so much.&rdquo;
                        </p>
                        <div className="mt-3 flex items-center gap-2">
                          <button className="pulse-glow text-[11px] font-medium px-3 py-1.5 rounded-md text-white" style={{ background: "hsl(var(--accent))" }}>
                            Approve
                          </button>
                          <button className="text-[11px] font-medium px-3 py-1.5 rounded-md border border-[var(--border)] text-[var(--text-secondary)]">
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="px-3 py-2 text-[10px] text-[var(--text-tertiary)] flex items-center gap-4">
                    <span className="flex items-center gap-1"><Clock size={10} /> Day 7: Apr 22</span>
                    <span className="flex items-center gap-1"><Clock size={10} /> Day 14: Apr 29</span>
                    <span className="flex items-center gap-1"><Clock size={10} /> Day 21: May 6</span>
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
            <p className="text-[15px] text-[var(--text-secondary)]">
              85% of freelancers experience late payments. We&apos;re building the fix.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-medium text-[var(--text-tertiary)]">
              <span className="flex items-center gap-1.5"><Mail size={14} /> Gmail</span>
              <span className="flex items-center gap-1.5"><Mail size={14} /> Outlook</span>
              <span className="flex items-center gap-1.5"><FileText size={14} /> QuickBooks</span>
              <span className="flex items-center gap-1.5"><FileText size={14} /> Xero</span>
              <span className="flex items-center gap-1.5"><CreditCard size={14} /> Stripe</span>
              <span className="flex items-center gap-1.5"><CreditCard size={14} /> PayPal</span>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Problem Section */}
      <Reveal>
        <section className="max-w-6xl mx-auto px-6 py-20 lg:py-28">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-[-0.02em]">Sound familiar?</h2>
            <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
              You&apos;re great at your craft. But chasing payments? That&apos;s a different story.
            </p>
          </div>
          <div className="mt-14 grid md:grid-cols-3 gap-6 stagger">
            <Reveal>
              <div className="p-6 rounded-xl border border-[var(--border)] bg-white">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "hsl(var(--accent) / 0.08)" }}>
                  <Timer size={18} style={{ color: "hsl(var(--accent))" }} />
                </div>
                <h3 className="mt-4 text-[15px] font-medium">Hours wasted chasing</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                  You spend 8-12 hours every month writing &ldquo;just checking in&rdquo; emails instead of doing billable work.
                </p>
              </div>
            </Reveal>
            <Reveal>
              <div className="p-6 rounded-xl border border-[var(--border)] bg-white">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "hsl(var(--accent) / 0.08)" }}>
                  <MessageSquare size={18} style={{ color: "hsl(var(--accent))" }} />
                </div>
                <h3 className="mt-4 text-[15px] font-medium">Awkward client dynamics</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                  Every follow-up feels like nagging. You hesitate, wordsmith for 30 minutes, then send something passive-aggressive anyway.
                </p>
              </div>
            </Reveal>
            <Reveal>
              <div className="p-6 rounded-xl border border-[var(--border)] bg-white">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "hsl(var(--accent) / 0.08)" }}>
                  <Gauge size={18} style={{ color: "hsl(var(--accent))" }} />
                </div>
                <h3 className="mt-4 text-[15px] font-medium">Cash flow anxiety</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                  It&apos;s the 28th and that $3,000 invoice still hasn&apos;t cleared. Can you make rent?
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      </Reveal>

      {/* How It Works */}
      <Reveal>
        <section id="features" className="bg-[var(--bg-secondary)]">
          <div className="max-w-6xl mx-auto px-6 py-20 lg:py-28">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-[-0.02em]">How it works</h2>
              <p className="mt-4 text-[var(--text-secondary)]">Three simple steps to automated payment reminders.</p>
            </div>
            <div className="mt-14 grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full mx-auto flex items-center justify-center text-lg font-medium" style={{ background: "hsl(var(--accent))", color: "white" }}>1</div>
                <h3 className="mt-4 font-medium">Forward</h3>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">Send any invoice email to followup@invoicenudge.com</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full mx-auto flex items-center justify-center text-lg font-medium" style={{ background: "hsl(var(--accent))", color: "white" }}>2</div>
                <h3 className="mt-4 font-medium">Approve</h3>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">AI drafts reminders matching your tone. Review and approve.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full mx-auto flex items-center justify-center text-lg font-medium" style={{ background: "hsl(var(--accent))", color: "white" }}>3</div>
                <h3 className="mt-4 font-medium">Get Paid</h3>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">Reminders go out Day 0, 7, 14, 21. You focus on work.</p>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Pricing */}
      <Reveal>
        <section id="pricing" className="max-w-6xl mx-auto px-6 py-20 lg:py-28">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-[-0.02em]">Simple pricing</h2>
            <p className="mt-4 text-[var(--text-secondary)]">Start free. Upgrade when you need more.</p>
          </div>
          <div className="mt-14 grid md:grid-cols-3 gap-6">
            <div className="card card-hover">
              <h3 className="font-medium">Starter</h3>
              <div className="mt-2">
                <span className="text-3xl font-medium">$19</span>
                <span className="text-[var(--text-tertiary)]">/month</span>
              </div>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">For solo freelancers</p>
              <ul className="mt-6 space-y-3 text-sm">
                <li className="flex items-center gap-2"><Check size={14} style={{ color: "hsl(var(--accent))" }} /> Up to 10 invoices/month</li>
                <li className="flex items-center gap-2"><Check size={14} style={{ color: "hsl(var(--accent))" }} /> AI reminders (Day 0/7/14/21)</li>
                <li className="flex items-center gap-2"><Check size={14} style={{ color: "hsl(var(--accent))" }} /> Preview Mode</li>
                <li className="flex items-center gap-2"><Check size={14} style={{ color: "hsl(var(--accent))" }} /> Email support</li>
              </ul>
              <button className="btn-secondary w-full mt-6 py-2.5 rounded-lg text-sm font-medium">Coming Soon</button>
            </div>
            <div className="card card-hover pricing-recommended">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Pro</h3>
                <span className="text-[10px] px-2 py-1 rounded-full font-medium" style={{ background: "hsl(var(--accent))", color: "white" }}>Popular</span>
              </div>
              <div className="mt-2">
                <span className="text-3xl font-medium">$49</span>
                <span className="text-[var(--text-tertiary)]">/month</span>
              </div>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">For established freelancers</p>
              <ul className="mt-6 space-y-3 text-sm">
                <li className="flex items-center gap-2"><Check size={14} style={{ color: "hsl(var(--accent))" }} /> Up to 50 invoices/month</li>
                <li className="flex items-center gap-2"><Check size={14} style={{ color: "hsl(var(--accent))" }} /> Autopilot Mode</li>
                <li className="flex items-center gap-2"><Check size={14} style={{ color: "hsl(var(--accent))" }} /> Client reply detection</li>
                <li className="flex items-center gap-2"><Check size={14} style={{ color: "hsl(var(--accent))" }} /> Custom schedules</li>
                <li className="flex items-center gap-2"><Check size={14} style={{ color: "hsl(var(--accent))" }} /> Priority support</li>
              </ul>
              <button className="btn-primary w-full mt-6 py-2.5 rounded-lg text-sm font-medium">Coming Soon</button>
            </div>
            <div className="card card-hover">
              <h3 className="font-medium">Agency</h3>
              <div className="mt-2">
                <span className="text-3xl font-medium">$149</span>
                <span className="text-[var(--text-tertiary)]">/month</span>
              </div>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">For teams and agencies</p>
              <ul className="mt-6 space-y-3 text-sm">
                <li className="flex items-center gap-2"><Check size={14} style={{ color: "hsl(var(--accent))" }} /> Unlimited invoices</li>
                <li className="flex items-center gap-2"><Check size={14} style={{ color: "hsl(var(--accent))" }} /> 3 team seats</li>
                <li className="flex items-center gap-2"><Check size={14} style={{ color: "hsl(var(--accent))" }} /> White-label emails</li>
                <li className="flex items-center gap-2"><Check size={14} style={{ color: "hsl(var(--accent))" }} /> API access</li>
                <li className="flex items-center gap-2"><Check size={14} style={{ color: "hsl(var(--accent))" }} /> Dedicated support</li>
              </ul>
              <button className="btn-secondary w-full mt-6 py-2.5 rounded-lg text-sm font-medium">Coming Soon</button>
            </div>
          </div>
        </section>
      </Reveal>

      {/* FAQ */}
      <Reveal>
        <section id="faq" className="bg-[var(--bg-secondary)]">
          <div className="max-w-3xl mx-auto px-6 py-20 lg:py-28">
            <h2 className="text-3xl sm:text-4xl font-medium tracking-[-0.02em] text-center">Frequently asked questions</h2>
            <div className="mt-12 bg-white rounded-xl border border-[var(--border)]">
              <FaqItem question="When does InvoiceNudge launch?" answer="We're targeting Q2 2026. Join the waitlist to be notified and lock in founding member pricing." />
              <FaqItem question="How is this different from FreshBooks reminders?" answer="FreshBooks bundles reminders with accounting features you may not need. We do one thing exceptionally: AI reminders that sound like you, not a robot." />
              <FaqItem question="What if the AI writes something weird?" answer="Preview Mode shows every email before it sends. You approve or edit. Autopilot Mode unlocks only after you've approved 5+ reminders." />
              <FaqItem question="Will my clients know it's automated?" answer="No. Emails come from your email address via Resend's infrastructure. Clients see your email address — no InvoiceNudge branding." />
              <FaqItem question="What if emails go to spam?" answer="We use Resend (same infrastructure as Linear, Vercel). SPF/DKIM/DMARC configured automatically. 98%+ deliverability." />
              <FaqItem question="Can I cancel anytime?" answer="Yes. No contracts, cancel with one click. 60-day money-back guarantee if you're not satisfied." />
            </div>
          </div>
        </section>
      </Reveal>

      {/* Final CTA */}
      <Reveal>
        <section className="max-w-6xl mx-auto px-6 py-20 lg:py-28 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-[-0.02em]">Stop losing hours to payment follow-ups</h2>
          <p className="mt-4 text-lg text-[var(--text-secondary)] max-w-xl mx-auto">
            Join the waitlist and lock in $19/month founding member pricing before we raise prices.
          </p>
          <div className="mt-8 flex justify-center">
            <WaitlistForm />
          </div>
        </section>
      </Reveal>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] bg-[var(--bg-secondary)]">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <Send size={18} style={{ color: "hsl(var(--accent))" }} />
              <span className="font-medium">InvoiceNudge</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-[var(--text-tertiary)]">
              <a href="#features" className="hover:text-[var(--text-primary)]">Features</a>
              <a href="#pricing" className="hover:text-[var(--text-primary)]">Pricing</a>
              <a href="#faq" className="hover:text-[var(--text-primary)]">FAQ</a>
            </div>
            <p className="text-sm text-[var(--text-tertiary)]">© 2026 InvoiceNudge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}