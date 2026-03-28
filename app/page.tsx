"use client";

import { useState, useEffect, useRef } from "react";
import {
  Mail,
  Clock,
  DollarSign,
  Brain,
  TrendingUp,
  Shield,
  Zap,
  MessageSquare,
  ArrowRight,
  Check,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  Users,
  Timer,
  Heart,
  Send,
  Bell,
  RefreshCw,
  Layers,
  Star,
  ExternalLink,
  Twitter,
  Lightbulb,
} from "lucide-react";

function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        observer.disconnect();
      }
    }, { threshold: 0.1, ...options });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isIntersecting };
}

function AnimatedSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isIntersecting } = useIntersectionObserver();
  
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${className}`}
      style={{
        opacity: isIntersecting ? 1 : 0,
        transform: isIntersecting ? "translateY(0)" : "translateY(30px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSubmitStatus("success");
        setEmail("");
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  const faqs = [
    {
      q: "Will my clients know I'm using automation?",
      a: "Nope. Reminders are sent from your email address using authenticated sending. To your client, it looks like you personally wrote and sent each message.",
    },
    {
      q: "What if the AI writes something I don't like?",
      a: "You review and approve every reminder before it sends during your first 30 days. After you've approved 5-10 reminders, you can optionally switch to auto-send. You're always in control.",
    },
    {
      q: "Can I use this with FreshBooks/QuickBooks/Wave?",
      a: "Yes! InvoiceNudge works with any invoicing tool. Just forward the invoice email — no integrations to configure, no data to migrate.",
    },
    {
      q: "How does the AI learn my voice?",
      a: "During onboarding, you'll share 3-5 examples of follow-up emails you've sent before. Our AI analyzes your word choice, tone, and style to generate reminders that sound authentically you.",
    },
    {
      q: "What happens if a client replies to my reminder?",
      a: "Our AI detects common responses like 'I paid this' or 'Can I get an extension?' and automatically pauses the sequence. You'll get a notification to handle it personally.",
    },
    {
      q: "Is my data secure?",
      a: "Absolutely. All data is encrypted with 256-bit SSL. We never share client information with third parties. We're GDPR compliant and delete your data upon request.",
    },
    {
      q: "What if I stop freelancing?",
      a: "Just cancel your plan (takes 10 seconds). If you're on pay-per-invoice, you simply pay nothing until your next invoice. No penalties, no retention calls.",
    },
    {
      q: "When does InvoiceNudge launch?",
      a: "We're planning a Q2 2026 public launch. Join the waitlist now to get early beta access and lifetime launch pricing.",
    },
  ];

  const integrations = ["QuickBooks", "FreshBooks", "Wave", "Xero", "Stripe", "PayPal"];

  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <a href="#" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-emerald-500 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-lg tracking-tight">InvoiceNudge</span>
            </a>

            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-slate-300 hover:text-white transition-colors">Features</a>
              <a href="#pricing" className="text-sm text-slate-300 hover:text-white transition-colors">Pricing</a>
              <a href="#faq" className="text-sm text-slate-300 hover:text-white transition-colors">FAQ</a>
              <a
                href="#waitlist"
                className="text-sm font-medium px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition-colors"
              >
                Join Waitlist
              </a>
            </div>

            <button
              className="md:hidden p-2 text-slate-300 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden glass mt-2 mx-4 rounded-xl p-4">
            <div className="flex flex-col gap-4">
              <a href="#features" className="text-slate-300 hover:text-white py-2" onClick={() => setMobileMenuOpen(false)}>Features</a>
              <a href="#pricing" className="text-slate-300 hover:text-white py-2" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
              <a href="#faq" className="text-slate-300 hover:text-white py-2" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
              <a
                href="#waitlist"
                className="text-center font-medium px-4 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Join Waitlist
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-24 pb-16 noise-overlay">
        <div className="absolute inset-0 gradient-mesh" />
        <div className="absolute inset-0 dot-pattern opacity-30" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8">
              <AnimatedSection delay={0}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span className="text-sm text-indigo-300">Launching Q2 2026</span>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={100}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight">
                  Stop Writing{" "}
                  <span className="relative">
                    <span className="relative z-10 bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent animate-gradient">
                      "Just Checking In..."
                    </span>
                  </span>{" "}
                  Emails
                </h1>
              </AnimatedSection>

              <AnimatedSection delay={200}>
                <p className="text-lg sm:text-xl text-slate-300 max-w-xl leading-relaxed">
                  AI sends polite payment reminders in your voice — so you never have to chase clients again.{" "}
                  <span className="text-white font-medium">Freelancers report getting paid up to 16 days faster.</span>
                </p>
              </AnimatedSection>

              <AnimatedSection delay={300}>
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all placeholder:text-slate-500"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-medium transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2 animate-pulse-glow"
                  >
                    {isSubmitting ? (
                      <RefreshCw className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        Join Waitlist
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
                {submitStatus === "success" && (
                  <p className="text-emerald-400 text-sm mt-2 flex items-center gap-2">
                    <Check className="w-4 h-4" /> You&apos;re on the waitlist! Check your email for confirmation.
                  </p>
                )}
                {submitStatus === "error" && (
                  <p className="text-red-400 text-sm mt-2">Something went wrong. Please try again.</p>
                )}
                <p className="text-sm text-slate-500 mt-2">
                  First 100 invoices free • No credit card required
                </p>
              </AnimatedSection>

              <AnimatedSection delay={400}>
                <div className="flex items-center gap-4 pt-4">
                  <div className="flex -space-x-2">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 border-2 border-slate-900 flex items-center justify-center"
                      >
                        <Users className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-slate-400">
                    <span className="text-white font-medium">Join 500+ freelancers</span> on the waitlist
                  </p>
                </div>
              </AnimatedSection>
            </div>

            {/* Hero Visual - Invoice Comparison Mockup */}
            <AnimatedSection delay={500} className="relative">
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-emerald-500/20 rounded-3xl blur-3xl" />
                
                {/* Before/After Cards */}
                <div className="relative glass rounded-2xl p-6 space-y-4">
                  <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
                    <Mail className="w-4 h-4" />
                    <span>Payment Reminder Comparison</span>
                  </div>

                  {/* Before */}
                  <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20">
                    <div className="flex items-center gap-2 text-red-400 text-sm mb-2">
                      <X className="w-4 h-4" />
                      <span className="font-medium">Generic Template</span>
                    </div>
                    <p className="text-slate-400 text-sm font-mono leading-relaxed">
                      Invoice #1234 is now overdue. Please remit payment at your earliest convenience.
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center py-2">
                    <div className="p-2 rounded-full bg-indigo-500/20">
                      <ArrowRight className="w-5 h-5 text-indigo-400 rotate-90" />
                    </div>
                  </div>

                  {/* After */}
                  <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                    <div className="flex items-center gap-2 text-emerald-400 text-sm mb-2">
                      <Sparkles className="w-4 h-4" />
                      <span className="font-medium">AI-Personalized (Your Voice)</span>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      Hey Sarah! Hope the product launch went smoothly. Quick follow-up on my Feb 15 invoice — let me know if you need anything from my end!
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-700/50">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-emerald-400">16 days</p>
                      <p className="text-sm text-slate-500">Faster payment</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-indigo-400">3 hours</p>
                      <p className="text-sm text-slate-500">Saved monthly</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-slate-500" />
        </div>
      </section>

      {/* Credibility Bar */}
      <section className="py-12 border-y border-slate-800 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-8">
              <p className="text-sm text-slate-400 uppercase tracking-wider mb-2">Built for freelancers managing</p>
              <p className="text-lg font-medium">$5K-50K+ in monthly invoices</p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60">
              {integrations.map((name) => (
                <div key={name} className="flex items-center gap-2 text-slate-400 hover:text-slate-300 transition-colors">
                  <Layers className="w-5 h-5" />
                  <span className="font-medium">{name}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <p className="text-center text-sm text-slate-500 mt-8 max-w-2xl mx-auto">
              &quot;64% of freelancers experience late payments, costing an average of $39,406 per year in cash flow disruptions&quot;
              <span className="block mt-1 text-slate-600">— Freelancers Union, 2025</span>
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 relative noise-overlay">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/5 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                You&apos;re Losing{" "}
                <span className="text-red-400">$10,000+</span>{" "}
                Per Year to Late Payments
              </h2>
              <p className="text-lg text-slate-400">
                65% of freelancers wait 30+ days for payment. Here&apos;s what that really costs you:
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: DollarSign,
                title: "Lost Revenue",
                stat: "$12,000",
                description: "Average outstanding invoices at any time. Every day a client delays payment, your cash flow suffers and your business stability wavers.",
                color: "red",
              },
              {
                icon: Clock,
                title: "Wasted Time",
                stat: "30+ hours",
                description: "Per year spent drafting, editing, and re-editing 'polite but firm' follow-up emails. Time you could be billing clients.",
                color: "amber",
              },
              {
                icon: Heart,
                title: "Emotional Drain",
                stat: "78%",
                description: "Of freelancers say chasing payments is their most stressful business task. The awkwardness of asking for money takes a real toll.",
                color: "purple",
              },
            ].map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 100}>
                <div className="group h-full p-6 lg:p-8 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-slate-600/50 transition-all hover:-translate-y-1">
                  <div className={`w-12 h-12 rounded-xl bg-${item.color}-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <item.icon className={`w-6 h-6 text-${item.color}-400`} />
                  </div>
                  <p className={`text-3xl lg:text-4xl font-bold text-${item.color}-400 mb-2`}>{item.stat}</p>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{item.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Transform Your Payment Collection
              </h2>
              <p className="text-lg text-slate-400">
                See the difference InvoiceNudge is designed to make
              </p>
            </div>
          </AnimatedSection>

          <div className="space-y-6">
            {[
              {
                before: "You draft the same 'Just checking in on Invoice #1234...' email for the fifth time, delete it, rewrite it softer, then stare at your inbox hoping they respond.",
                after: "Forward your invoice once, and AI sends perfectly-timed, escalating reminders that sound exactly like you wrote them.",
              },
              {
                before: "Clients pay 44 days late on average because your follow-ups get buried in their inbox or feel too passive.",
                after: "Strategic reminder timing designed to catch clients before invoices slip through the cracks — targeting up to 16 days faster payment.",
              },
              {
                before: "You feel like you're begging for your own money, damaging the professional relationship you worked hard to build.",
                after: "AI handles the uncomfortable conversations so you can maintain authentic client relationships.",
              },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                  <div className="p-6 rounded-xl bg-red-500/5 border border-red-500/20">
                    <div className="flex items-center gap-2 text-red-400 text-sm mb-3">
                      <X className="w-4 h-4" />
                      <span className="font-medium uppercase tracking-wider">Before</span>
                    </div>
                    <p className="text-slate-400 leading-relaxed">{item.before}</p>
                  </div>
                  <div className="p-6 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                    <div className="flex items-center gap-2 text-emerald-400 text-sm mb-3">
                      <Check className="w-4 h-4" />
                      <span className="font-medium uppercase tracking-wider">After</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">{item.after}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative noise-overlay">
        <div className="absolute inset-0 gradient-mesh" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Everything You Need to Get Paid Faster
              </h2>
              <p className="text-lg text-slate-400">
                Powerful AI features designed to work the way you do
              </p>
            </div>
          </AnimatedSection>

          {/* Bento Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {/* Large Feature Card */}
            <AnimatedSection className="md:col-span-2 lg:col-span-2 row-span-2">
              <div className="h-full p-8 lg:p-10 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 group hover:border-indigo-500/40 transition-all">
                <Brain className="w-12 h-12 text-indigo-400 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl lg:text-3xl font-bold mb-4">Voice Matching AI</h3>
                <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                  Our AI analyzes your past emails to learn your unique communication style. Whether you&apos;re casual (&quot;Hey! Quick reminder...&quot;) or formal (&quot;I hope this message finds you well...&quot;), reminders sound authentically you.
                </p>
                <div className="glass rounded-xl p-4 font-mono text-sm">
                  <p className="text-slate-400 mb-2">// Your style detected:</p>
                  <p className="text-indigo-300">Tone: Friendly professional</p>
                  <p className="text-emerald-300">Emoji use: Occasional</p>
                  <p className="text-purple-300">Sign-off: &quot;Best, Alex&quot;</p>
                </div>
              </div>
            </AnimatedSection>

            {/* Regular Feature Cards */}
            {[
              {
                icon: TrendingUp,
                title: "Escalating Politeness",
                description: "Four-stage reminder sequence: Friendly → Gentle → Professional → Firm. Each calibrated to maintain relationships.",
              },
              {
                icon: Timer,
                title: "Smart Timing",
                description: "Designed to learn when each client is most likely to respond. Morning person? 9am. Night owl? 7pm.",
              },
              {
                icon: MessageSquare,
                title: "Reply Detection",
                description: "When clients respond 'Paying now!', AI automatically pauses the sequence. No embarrassing double-sends.",
              },
              {
                icon: Layers,
                title: "Works With Your Tools",
                description: "Forward invoices from QuickBooks, FreshBooks, Wave, or any email. No migration, no disruption.",
              },
            ].map((feature, i) => (
              <AnimatedSection key={feature.title} delay={i * 50}>
                <div className="h-full p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 group hover:border-slate-600/50 hover:-translate-y-1 transition-all">
                  <feature.icon className="w-10 h-10 text-indigo-400 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Zero Risk Feature - Breaks the grid */}
          <AnimatedSection delay={300}>
            <div className="mt-6 -mx-4 sm:mx-0 p-8 lg:p-10 rounded-none sm:rounded-2xl bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent border-y sm:border border-emerald-500/20">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                <div className="flex-shrink-0">
                  <Shield className="w-16 h-16 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Zero-Risk Approval Flow</h3>
                  <p className="text-slate-300 leading-relaxed">
                    Review and approve every AI-generated reminder before it sends. After 5-10 approvals, switch to auto-send when you&apos;re confident in the AI&apos;s voice. You&apos;re always in control — never worry about AI sending something you wouldn&apos;t.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                How It Works
              </h2>
              <p className="text-lg text-slate-400">
                Get set up in under 60 seconds
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                step: "01",
                icon: Send,
                title: "Forward Your Invoice",
                description: "Send any invoice email to nudge@invoicenudge.com. Our AI extracts client info, amount, and due date automatically. Takes 10 seconds.",
              },
              {
                step: "02",
                icon: Sparkles,
                title: "AI Drafts Reminders",
                description: "Based on your communication style, AI generates a 4-part reminder sequence. Review the first few to ensure they sound like you.",
              },
              {
                step: "03",
                icon: DollarSign,
                title: "Get Paid Faster",
                description: "Reminders send automatically on your schedule. Clients pay on time. You never write another awkward follow-up again.",
              },
            ].map((item, i) => (
              <AnimatedSection key={item.step} delay={i * 100}>
                <div className="relative">
                  {/* Connector Line */}
                  {i < 2 && (
                    <div className="hidden md:block absolute top-12 left-full w-full h-px bg-gradient-to-r from-indigo-500/50 to-transparent -translate-x-8" />
                  )}
                  
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-indigo-500/10 border border-indigo-500/30 mb-6">
                      <item.icon className="w-10 h-10 text-indigo-400" />
                    </div>
                    <p className="text-sm text-indigo-400 font-mono mb-2">Step {item.step}</p>
                    <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                    <p className="text-slate-400 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 relative noise-overlay">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Built for How You Work
              </h2>
              <p className="text-lg text-slate-400">
                See how freelancers like you would use InvoiceNudge
              </p>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                persona: "Freelance Designer",
                context: "Managing 8-12 active clients, sending 15+ invoices monthly",
                description: "Set up reminder sequences once per client and let AI handle the follow-through — potentially reclaiming 4+ hours monthly that previously went to chasing payments.",
                highlight: "4+ hours saved monthly",
              },
              {
                persona: "Independent Consultant",
                context: "Invoicing $10K-25K retainers to enterprise clients",
                description: "Use InvoiceNudge's formal tone matching to maintain executive-level professionalism while ensuring NET-30 terms are actually respected — not stretched to NET-60.",
                highlight: "Enterprise-grade professionalism",
              },
              {
                persona: "Creative Agency Owner",
                context: "Running a 3-person shop with 20+ outstanding invoices",
                description: "Get a single dashboard showing which clients are current, which need gentle nudges, and which require escalation — replacing the chaos of spreadsheets and calendar reminders.",
                highlight: "Complete invoice visibility",
              },
            ].map((useCase, i) => (
              <AnimatedSection key={useCase.persona} delay={i * 100}>
                <div className="h-full p-6 lg:p-8 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-indigo-500/30 transition-all group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
                      <Users className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{useCase.persona}</h3>
                      <p className="text-sm text-slate-500">{useCase.context}</p>
                    </div>
                  </div>
                  <p className="text-slate-400 leading-relaxed mb-4">{useCase.description}</p>
                  <div className="pt-4 border-t border-slate-700/50">
                    <p className="text-sm font-medium text-emerald-400 flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      {useCase.highlight}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 relative">
        <div className="absolute inset-0 gradient-mesh" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-8">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Planned Launch Pricing
              </h2>
              <p className="text-lg text-slate-400">
                Choose how you want to pay. No contracts, cancel anytime.
              </p>
            </div>
          </AnimatedSection>

          {/* COO-Required Beta Banner */}
          <AnimatedSection delay={50}>
            <div className="max-w-3xl mx-auto mb-12 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-amber-300">Beta Perk</p>
                  <p className="text-amber-200/80">
                    All pricing tiers are free during validation. Your first 100 invoices are on us — no credit card required.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {/* Pay As You Go */}
            <AnimatedSection delay={100}>
              <div className="h-full p-6 lg:p-8 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-slate-600/50 transition-all">
                <h3 className="text-xl font-semibold mb-2">Pay As You Go</h3>
                <div className="mb-6">
                  <span className="text-4xl lg:text-5xl font-bold">$0.50</span>
                  <span className="text-slate-400 ml-2">per invoice</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {[
                    "AI-personalized reminders",
                    "4-stage escalation sequence",
                    "Email delivery",
                    "Works with any invoicing tool",
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-slate-300">
                      <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-slate-500 mb-4">Perfect for: 5-15 invoices/month</p>
                <a
                  href="#waitlist"
                  className="block w-full py-3 rounded-xl border border-slate-600 hover:border-indigo-500 text-center font-medium transition-colors"
                >
                  Join Waitlist
                </a>
              </div>
            </AnimatedSection>

            {/* Unlimited */}
            <AnimatedSection delay={200}>
              <div className="relative h-full p-6 lg:p-8 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-2 border-indigo-500/50">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-indigo-600 text-sm font-medium">
                  Most Popular
                </div>
                <h3 className="text-xl font-semibold mb-2">Unlimited</h3>
                <div className="mb-2">
                  <span className="text-4xl lg:text-5xl font-bold">$19</span>
                  <span className="text-slate-400 ml-2">/month</span>
                </div>
                <p className="text-sm text-slate-400 mb-6">or $190/year (save $38)</p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Everything in Pay As You Go",
                    "Unlimited invoices",
                    "Priority support",
                    "Custom reminder templates",
                    "SMS notifications (coming soon)",
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-slate-300">
                      <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-slate-500 mb-4">Perfect for: 20+ invoices/month</p>
                <a
                  href="#waitlist"
                  className="block w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-center font-medium transition-colors"
                >
                  Join Waitlist
                </a>
              </div>
            </AnimatedSection>
          </div>

          {/* Pricing FAQ */}
          <AnimatedSection delay={300}>
            <div className="max-w-2xl mx-auto mt-12 space-y-4">
              {[
                {
                  q: "When does InvoiceNudge launch?",
                  a: "We're targeting Q2 2026 for public launch. Beta testers get early access in the coming weeks.",
                },
                {
                  q: "Will there be a free trial?",
                  a: "Beta testers get their first 100 invoices completely free. After launch, we'll offer a 14-day free trial.",
                },
                {
                  q: "Can I cancel anytime?",
                  a: "Absolutely. No contracts, no termination fees, cancel in 10 seconds from your dashboard.",
                },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/50">
                  <p className="font-medium mb-1">{item.q}</p>
                  <p className="text-slate-400 text-sm">{item.a}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-slate-900/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-slate-400">
                Everything you need to know about InvoiceNudge
              </p>
            </div>
          </AnimatedSection>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <AnimatedSection key={i} delay={i * 50}>
                <div className="rounded-xl border border-slate-700/50 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-800/30 transition-colors"
                  >
                    <span className="font-medium">{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform ${
                        openFaq === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5">
                      <p className="text-slate-400 leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="waitlist" className="py-24 relative noise-overlay">
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/10 to-transparent" />
        
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
              <Star className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-emerald-300">Limited beta spots available</span>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Be One of the First 500 to Get Paid Faster
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <p className="text-lg text-slate-400 mb-8 max-w-xl mx-auto">
              We&apos;re building InvoiceNudge for freelancers exactly like you. Join the waitlist for early access, free beta testing, and lifetime launch pricing.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={300}>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-4 rounded-xl bg-slate-800/50 border border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all placeholder:text-slate-500"
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-medium transition-all hover:scale-105 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Join Waitlist
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
            {submitStatus === "success" && (
              <p className="text-emerald-400 text-sm mt-3 flex items-center justify-center gap-2">
                <Check className="w-4 h-4" /> You&apos;re on the waitlist!
              </p>
            )}
            <p className="text-sm text-slate-500 mt-4">
              No spam, ever. Just launch updates and early access.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={400}>
            <div className="flex items-center justify-center gap-6 mt-8 text-sm text-slate-500">
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                256-bit SSL
              </span>
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                GDPR Compliant
              </span>
              <span className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                No CC Required
              </span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <a href="#" className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-emerald-500 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold text-lg">InvoiceNudge</span>
              </a>
              <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
                InvoiceNudge helps freelancers get paid faster with AI-powered payment reminders that sound like you, not a robot.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-slate-800 gap-4">
            <p className="text-sm text-slate-500">
              © 2026 InvoiceNudge. Made for freelancers who deserve to get paid on time.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors" aria-label="Product Hunt">
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 glass md:hidden z-40">
        <a
          href="#waitlist"
          className="block w-full py-3 rounded-xl bg-emerald-600 text-center font-medium"
        >
          Join Waitlist — Get Early Access
        </a>
      </div>
    </main>
  );
}