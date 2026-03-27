"use client";

import { useState, useEffect, useRef } from "react";
import {
  Mail,
  MessageSquare,
  BrainCircuit,
  HeartCrack,
  TrendingUp,
  Palette,
  Reply,
  ShieldAlert,
  PartyPopper,
  Send,
  Bot,
  DollarSign,
  Check,
  ArrowRight,
  Menu,
  X,
  Twitter,
  Linkedin,
  Zap,
  Clock,
  Star,
  MailForward,
  ChevronDown,
} from "lucide-react";

function useIntersectionObserver(options = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1, ...options });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

function AnimatedSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useIntersectionObserver();
  
  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitMessage(data.message || "You're on the waitlist!");
        setEmail("");
      } else {
        setSubmitMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setSubmitMessage("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const painPoints = [
    {
      icon: MessageSquare,
      title: '"Just Checking If You Saw My Invoice..."',
      description: "You've drafted that email 15 times. Too pushy? Too passive? You wait another week hoping they'll just pay. Meanwhile, your rent is due and you're refreshing your bank app every hour.",
    },
    {
      icon: BrainCircuit,
      title: "Tracking Who Owes What, When",
      description: "You have 8 clients, 12 outstanding invoices, and a spreadsheet that's three months out of date. The mental load of tracking payment status costs freelancers 2-3 hours every month.",
    },
    {
      icon: HeartCrack,
      title: "Don't Want to Damage the Relationship",
      description: "Your best client is 3 weeks late. Do you risk the relationship with a firm reminder, or stay quiet and hope? 78% of freelancers let invoices go unpaid rather than risk offending a client.",
    },
  ];

  const features = [
    {
      icon: MailForward,
      title: "Forward & Forget",
      description: "Forward your invoice email to nudge@invoicenudge.com — AI extracts the client name, amount, and due date automatically. Built to work in under 10 seconds.",
    },
    {
      icon: TrendingUp,
      title: "Escalating Politeness Ladder",
      description: 'Day 3: "Friendly heads up!" Day 7: "Just checking in." Day 14: "This is my final reminder before I pause work." Designed to collect payment 15 days faster.',
    },
    {
      icon: Palette,
      title: "Brand Voice Matching",
      description: "Casual-with-emojis or buttoned-up-professional? AI learns your tone from a 60-second quiz, so reminders sound like you wrote them.",
    },
    {
      icon: Reply,
      title: "Smart Reply Detection",
      description: 'When your client replies "Check\'s in the mail!" AI detects the payment confirmation and stops the reminder sequence automatically.',
    },
    {
      icon: ShieldAlert,
      title: "Chronic No-Show Protection",
      description: "AI tracks repeat late-payers. After 2 late payments, auto-require a deposit on their next project — protecting you from serial slow-payers.",
    },
    {
      icon: PartyPopper,
      title: "Payment Celebration",
      description: 'When payment lands, you get a dopamine-hit notification: "$2,500 received from Acme Corp!" Because getting paid should feel like winning.',
    },
  ];

  const steps = [
    {
      icon: Send,
      title: "Forward Your Invoice",
      description: "When you send an invoice to a client, BCC or forward to nudge@invoicenudge.com. That's it — no app to learn.",
    },
    {
      icon: Bot,
      title: "AI Takes Over",
      description: "AI extracts the details and schedules reminders: Day 3, Day 7, Day 14, Day 21. Each one matching your voice.",
    },
    {
      icon: DollarSign,
      title: "Get Paid Faster",
      description: "Clients respond to professional, consistent follow-up. You get paid 2-3 weeks faster on average.",
    },
  ];

  const useCases = [
    {
      persona: "Freelance Brand Designer",
      context: "Emma juggles 6-8 clients at once and invoices NET 15, but clients routinely pay NET 45+.",
      usage: "Emma BCCs every invoice to nudge@invoicenudge.com as she sends them. Her average collection time would drop from 42 days to 18 days, recovering 6+ hours a month she used to spend tracking and chasing.",
    },
    {
      persona: "Fractional CFO / Consultant",
      context: "Marcus charges $5,000+ per engagement and feels deeply uncomfortable sending \"where's my money?\" emails to C-suite executives.",
      usage: "Marcus sets his brand voice to \"formal professional\" and lets AI send perfectly-worded reminders. His relationship stays intact, but his cash flow improves.",
    },
    {
      persona: "Part-Time Photographer",
      context: "Aisha shoots weddings on weekends while working a day job. She invoices 2-3 clients a month and frequently forgets which ones have paid.",
      usage: "With only a few invoices a month, Aisha uses pay-per-invoice pricing ($0.50/invoice). She forwards each invoice, AI handles follow-up, and she never wonders \"did they pay?\" again.",
    },
  ];

  const faqs = [
    {
      question: "How is this different from FreshBooks/QuickBooks reminders?",
      answer: 'FreshBooks sends generic templates: "Invoice #123 is due." InvoiceNudge sends AI-personalized messages that match your brand voice and escalate professionally over time. Our "escalating politeness ladder" is something no accounting software offers.',
    },
    {
      question: "What if the AI says something embarrassing to my client?",
      answer: "You're always in control. For the first 30 days, you approve every AI-generated message before it sends. We also include a \"conservatism slider\" — set it to \"extra gentle\" if you're nervous.",
    },
    {
      question: "Is my invoice data secure?",
      answer: "Yes. Invoice emails are parsed by AI, then only the essential data (client name, amount, due date) is stored. We never see your full invoice contents, and we never share data with third parties.",
    },
    {
      question: "What if I already use FreshBooks/Wave/Bonsai for invoicing?",
      answer: "Perfect — keep using them. InvoiceNudge doesn't replace your invoicing tool. Just BCC nudge@invoicenudge.com when you send invoices, and we handle the follow-up.",
    },
    {
      question: "What happens if my client replies \"I already paid!\"?",
      answer: "Our AI detects payment confirmation language. When detected, we automatically stop the reminder sequence and notify you. If not confirmed, you can resume reminders with one click.",
    },
    {
      question: "How do I change my brand voice after setup?",
      answer: "You can retake the 60-second brand voice quiz anytime from your dashboard. You can also manually edit any AI-generated message, and the AI learns from your edits over time.",
    },
    {
      question: "What's your support like?",
      answer: "We're a small team, which means you'll talk to real humans who built the product — not a chatbot. Email support with 24-hour response time for all plans.",
    },
    {
      question: "When does InvoiceNudge launch?",
      answer: "We're targeting Summer 2026 for public launch. Waitlist members get early access in late Spring 2026, plus locked-in launch pricing before we raise rates.",
    },
  ];

  return (
    <div className="min-h-screen" style={{ fontFamily: "var(--font-source-sans)" }}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAF7F2]/95 backdrop-blur-sm border-b border-[#2D5A3D]/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Mail className="w-6 h-6 text-[#2D5A3D]" />
              <span className="text-xl font-bold text-[#2D5A3D]" style={{ fontFamily: "var(--font-fraunces)" }}>
                InvoiceNudge
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-[#64748B] hover:text-[#2D5A3D] transition-colors">Features</a>
              <a href="#pricing" className="text-[#64748B] hover:text-[#2D5A3D] transition-colors">Pricing</a>
              <a href="#faq" className="text-[#64748B] hover:text-[#2D5A3D] transition-colors">FAQ</a>
              <a
                href="#waitlist"
                className="bg-[#2D5A3D] text-white px-5 py-2 rounded-full font-semibold hover:bg-[#1E3D29] transition-colors"
              >
                Join Waitlist
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-[#2D5A3D]/10">
              <div className="flex flex-col gap-4">
                <a href="#features" className="text-[#64748B] hover:text-[#2D5A3D]" onClick={() => setMobileMenuOpen(false)}>Features</a>
                <a href="#pricing" className="text-[#64748B] hover:text-[#2D5A3D]" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
                <a href="#faq" className="text-[#64748B] hover:text-[#2D5A3D]" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
                <a
                  href="#waitlist"
                  className="bg-[#2D5A3D] text-white px-5 py-2 rounded-full font-semibold text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Join Waitlist
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#E8F0E8] via-[#FAF7F2] to-[#FAF7F2] opacity-60" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-[#2D5A3D]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#E85A4F]/5 rounded-full blur-3xl" />
        
        <div className="max-w-6xl mx-auto relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <AnimatedSection>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#2D5A3D]/10 rounded-full text-[#2D5A3D] text-sm font-medium mb-6">
                  <Zap className="w-4 h-4" />
                  <span>Launching Summer 2026</span>
                </div>
              </AnimatedSection>
              
              <AnimatedSection delay={100}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2C2C2C] leading-tight mb-6" style={{ fontFamily: "var(--font-fraunces)" }}>
                  Stop Writing{" "}
                  <span className="text-[#E85A4F]">"Just Checking In"</span>{" "}
                  Emails
                </h1>
              </AnimatedSection>
              
              <AnimatedSection delay={200}>
                <p className="text-lg sm:text-xl text-[#64748B] mb-8 max-w-xl mx-auto md:mx-0">
                  AI sends polite payment reminders so you never have to chase clients again. Forward your invoice, we handle the awkward part — from gentle nudge to firm follow-up.
                </p>
              </AnimatedSection>
              
              <AnimatedSection delay={300}>
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto md:mx-0" id="waitlist">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-5 py-3 rounded-full border border-[#2D5A3D]/20 bg-white focus:outline-none focus:ring-2 focus:ring-[#2D5A3D]/30"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#2D5A3D] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#1E3D29] transition-all hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? "Joining..." : "Get Early Access"}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
                {submitMessage && (
                  <p className={`mt-3 text-sm ${submitMessage.includes("waitlist") ? "text-[#2D5A3D]" : "text-[#E85A4F]"}`}>
                    {submitMessage}
                  </p>
                )}
                <p className="text-sm text-[#64748B] mt-4">
                  Be one of the first 500 • No credit card required
                </p>
              </AnimatedSection>
            </div>

            <AnimatedSection delay={400} className="relative">
              <div className="relative bg-white rounded-2xl shadow-2xl p-6 border border-[#2D5A3D]/10">
                <div className="absolute -top-3 -right-3 bg-[#2D5A3D] text-white text-xs px-3 py-1 rounded-full">
                  AI-Powered
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-[#E8F0E8] rounded-xl">
                    <div className="w-8 h-8 bg-[#2D5A3D] rounded-full flex items-center justify-center flex-shrink-0">
                      <Send className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#2C2C2C]">Day 3 — Friendly Reminder</p>
                      <p className="text-xs text-[#64748B] mt-1">"Hey! Just a quick heads up — Invoice #2847 is due today. Let me know if you have any questions!"</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-[#FAF7F2] rounded-xl">
                    <div className="w-8 h-8 bg-[#D4A853] rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#2C2C2C]">Day 7 — Gentle Check-In</p>
                      <p className="text-xs text-[#64748B] mt-1">"Just checking in on Invoice #2847. Sometimes emails slip through — let me know if you need me to resend!"</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-[#FAF7F2] rounded-xl opacity-75">
                    <div className="w-8 h-8 bg-[#E85A4F] rounded-full flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#2C2C2C]">Day 14 — Firm Follow-Up</p>
                      <p className="text-xs text-[#64748B] mt-1">"This is my final reminder before I pause work on active projects..."</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-[#2D5A3D]/10 flex items-center justify-between">
                  <span className="text-sm text-[#64748B]">Payment Status</span>
                  <span className="text-sm font-semibold text-[#2D5A3D] flex items-center gap-1">
                    <Check className="w-4 h-4" /> Received
                  </span>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-[#2D5A3D] text-white p-4 rounded-xl shadow-lg animate-float">
                <PartyPopper className="w-6 h-6 mb-2" />
                <p className="text-sm font-medium">$2,500 received!</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Credibility Bar */}
      <section className="py-12 bg-white border-y border-[#2D5A3D]/10">
        <div className="max-w-6xl mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-8">
              <p className="text-[#64748B] text-sm uppercase tracking-wider mb-2">Built for freelancers who invoice clients</p>
              <p className="text-[#2C2C2C] font-medium">Works with your existing tools — no migration required</p>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <span className="text-lg font-semibold text-[#64748B]">QuickBooks</span>
              <span className="text-lg font-semibold text-[#64748B]">FreshBooks</span>
              <span className="text-lg font-semibold text-[#64748B]">Wave</span>
              <span className="text-lg font-semibold text-[#64748B]">Bonsai</span>
              <span className="text-lg font-semibold text-[#64748B]">HoneyBook</span>
              <span className="text-lg font-semibold text-[#64748B]">Gmail</span>
            </div>
            <div className="mt-8 text-center">
              <p className="inline-flex items-center gap-2 text-[#E85A4F] font-medium">
                <Star className="w-4 h-4 fill-current" />
                64% of freelancers experience late payments every year
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2C2C2C] mb-4" style={{ fontFamily: "var(--font-fraunces)" }}>
              The <span className="text-[#E85A4F]">Real Cost</span> of Late Payments
            </h2>
            <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
              It's not just about the money. It's the mental load, the awkward emails, and the relationships you're afraid to damage.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {painPoints.map((point, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <div className="bg-white rounded-2xl p-8 border border-[#2D5A3D]/10 hover:shadow-xl transition-shadow h-full">
                  <div className="w-14 h-14 bg-[#E85A4F]/10 rounded-xl flex items-center justify-center mb-6">
                    <point.icon className="w-7 h-7 text-[#E85A4F]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2C2C2C] mb-3" style={{ fontFamily: "var(--font-fraunces)" }}>
                    {point.title}
                  </h3>
                  <p className="text-[#64748B] leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#E8F0E8] to-[#FAF7F2]">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2C2C2C] mb-4" style={{ fontFamily: "var(--font-fraunces)" }}>
              From Awkward to <span className="text-[#2D5A3D]">Automatic</span>
            </h2>
          </AnimatedSection>

          <div className="space-y-8">
            {[
              {
                before: "You draft a reminder email, delete it, rewrite it, read it aloud, ask your partner if it sounds desperate, then finally send it 2 weeks later when you're broke.",
                after: "Forward your invoice to InvoiceNudge. AI sends a perfectly-toned reminder on day 3, day 7, and day 14 — each one escalating professionally while you focus on your actual work.",
              },
              {
                before: "You have a mental list of \"who owes me money\" that haunts you at 2am. You check 4 different email threads to figure out which invoices are outstanding.",
                after: "One dashboard shows every outstanding invoice, its status, and when the next AI reminder goes out. Check once a week, or don't check at all.",
              },
              {
                before: "You send the same generic \"your invoice is overdue\" message to your laid-back startup client and your formal corporate client. Neither responds.",
                after: "AI learns your brand voice. Casual clients get friendly nudges while corporate contacts get formal follow-ups. Same you, scaled.",
              },
            ].map((item, index) => (
              <AnimatedSection key={index} delay={index * 150}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-[#E85A4F]/5 border border-[#E85A4F]/20 rounded-xl p-6">
                    <span className="text-xs uppercase tracking-wider text-[#E85A4F] font-semibold">Before</span>
                    <p className="mt-3 text-[#2C2C2C]">{item.before}</p>
                  </div>
                  <div className="bg-[#2D5A3D]/5 border border-[#2D5A3D]/20 rounded-xl p-6">
                    <span className="text-xs uppercase tracking-wider text-[#2D5A3D] font-semibold">After</span>
                    <p className="mt-3 text-[#2C2C2C]">{item.after}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4" id="features">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2C2C2C] mb-4" style={{ fontFamily: "var(--font-fraunces)" }}>
              Everything You Need to <span className="text-[#2D5A3D]">Get Paid Faster</span>
            </h2>
            <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
              No bloated accounting suite. Just laser-focused tools for getting paid.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <AnimatedSection key={index} delay={index * 80}>
                <div className="bg-white rounded-2xl p-6 border border-[#2D5A3D]/10 hover:border-[#2D5A3D]/30 transition-all hover:shadow-lg h-full">
                  <div className="w-12 h-12 bg-[#2D5A3D]/10 rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-[#2D5A3D]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#2C2C2C] mb-2" style={{ fontFamily: "var(--font-fraunces)" }}>
                    {feature.title}
                  </h3>
                  <p className="text-[#64748B] text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-[#2D5A3D]">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-fraunces)" }}>
              How It Works
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Three steps. Sixty seconds. Never chase a payment again.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <AnimatedSection key={index} delay={index * 150}>
                <div className="relative">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                      <step.icon className="w-8 h-8 text-white" />
                      <span className="absolute -top-2 -right-2 w-8 h-8 bg-[#D4A853] rounded-full flex items-center justify-center text-sm font-bold text-[#2C2C2C]">
                        {index + 1}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-fraunces)" }}>
                      {step.title}
                    </h3>
                    <p className="text-white/70">
                      {step.description}
                    </p>
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-[80%] border-t-2 border-dashed border-white/20" />
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2C2C2C] mb-4" style={{ fontFamily: "var(--font-fraunces)" }}>
              Built for <span className="text-[#2D5A3D]">People Like You</span>
            </h2>
            <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
              See how different freelancers would use InvoiceNudge in their day-to-day.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <div className="bg-gradient-to-b from-white to-[#E8F0E8]/30 rounded-2xl p-8 border border-[#2D5A3D]/10 h-full">
                  <div className="text-xs uppercase tracking-wider text-[#2D5A3D] font-semibold mb-2">
                    {useCase.persona}
                  </div>
                  <p className="text-[#64748B] text-sm mb-4 italic">
                    "{useCase.context}"
                  </p>
                  <p className="text-[#2C2C2C] text-sm leading-relaxed">
                    {useCase.usage}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#FAF7F2] to-[#E8F0E8]" id="pricing">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-4">
            <span className="inline-block bg-[#D4A853]/20 text-[#D4A853] text-sm font-semibold px-4 py-1 rounded-full mb-4">
              Planned Launch Pricing
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2C2C2C] mb-4" style={{ fontFamily: "var(--font-fraunces)" }}>
              Simple, Honest Pricing
            </h2>
            <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
              No hidden fees. No surprise charges. Pay for what you use.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {/* Pay Per Invoice */}
            <AnimatedSection delay={100}>
              <div className="bg-white rounded-2xl p-8 border border-[#2D5A3D]/10 h-full flex flex-col">
                <h3 className="text-xl font-bold text-[#2C2C2C] mb-2" style={{ fontFamily: "var(--font-fraunces)" }}>Pay-Per-Invoice</h3>
                <p className="text-[#64748B] text-sm mb-6">For 1-10 invoices/month</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-[#2C2C2C]">$0.50</span>
                  <span className="text-[#64748B]">/invoice</span>
                </div>
                <ul className="space-y-3 mb-8 flex-grow">
                  {["AI-powered reminders", "Brand voice matching", "Payment detection", "Email support"].map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-[#64748B]">
                      <Check className="w-4 h-4 text-[#2D5A3D] flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href="#waitlist"
                  className="block w-full text-center py-3 rounded-full border-2 border-[#2D5A3D] text-[#2D5A3D] font-semibold hover:bg-[#2D5A3D] hover:text-white transition-colors"
                >
                  Join Waitlist
                </a>
              </div>
            </AnimatedSection>

            {/* Unlimited - Most Popular */}
            <AnimatedSection delay={200}>
              <div className="bg-[#2D5A3D] rounded-2xl p-8 h-full flex flex-col relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D4A853] text-[#2C2C2C] text-xs font-bold px-4 py-1 rounded-full">
                  Most Popular
                </div>
                <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-fraunces)" }}>Unlimited</h3>
                <p className="text-white/70 text-sm mb-6">For active freelancers</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">$19</span>
                  <span className="text-white/70">/month</span>
                </div>
                <ul className="space-y-3 mb-8 flex-grow">
                  {["Everything in Pay-Per-Invoice", "Unlimited invoices", "Priority email support", "Late-payer tracking", "SMS payment alerts"].map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-white/90">
                      <Check className="w-4 h-4 text-[#D4A853] flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href="#waitlist"
                  className="block w-full text-center py-3 rounded-full bg-white text-[#2D5A3D] font-semibold hover:bg-[#FAF7F2] transition-colors"
                >
                  Join Waitlist
                </a>
              </div>
            </AnimatedSection>

            {/* Annual */}
            <AnimatedSection delay={300}>
              <div className="bg-white rounded-2xl p-8 border border-[#2D5A3D]/10 h-full flex flex-col">
                <h3 className="text-xl font-bold text-[#2C2C2C] mb-2" style={{ fontFamily: "var(--font-fraunces)" }}>Annual</h3>
                <p className="text-[#64748B] text-sm mb-6">For committed freelancers</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-[#2C2C2C]">$190</span>
                  <span className="text-[#64748B]">/year</span>
                  <span className="ml-2 bg-[#2D5A3D]/10 text-[#2D5A3D] text-xs px-2 py-1 rounded-full">Save $38</span>
                </div>
                <ul className="space-y-3 mb-8 flex-grow">
                  {["Everything in Unlimited", "2 months free", "Annual billing", "Early access to features"].map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-[#64748B]">
                      <Check className="w-4 h-4 text-[#2D5A3D] flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href="#waitlist"
                  className="block w-full text-center py-3 rounded-full border-2 border-[#2D5A3D] text-[#2D5A3D] font-semibold hover:bg-[#2D5A3D] hover:text-white transition-colors"
                >
                  Join Waitlist
                </a>
              </div>
            </AnimatedSection>
          </div>

          {/* Pricing FAQs */}
          <AnimatedSection delay={400}>
            <div className="mt-16 max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-[#2C2C2C] text-center mb-6" style={{ fontFamily: "var(--font-fraunces)" }}>
                Pricing Questions
              </h3>
              <div className="space-y-4">
                {[
                  { q: "When will InvoiceNudge launch?", a: "We're targeting Summer 2026. Join the waitlist for early access in late Spring 2026." },
                  { q: "Will there be a free trial?", a: "Yes — waitlist members get 30 days free to test the full Unlimited plan. No credit card required." },
                  { q: "Can I cancel anytime?", a: "Absolutely. Monthly plans cancel with one click, no termination fees. Annual plans can cancel renewal anytime." },
                ].map((item, index) => (
                  <div key={index} className="bg-white rounded-xl p-4 border border-[#2D5A3D]/10">
                    <p className="font-medium text-[#2C2C2C]">{item.q}</p>
                    <p className="text-sm text-[#64748B] mt-1">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4" id="faq">
        <div className="max-w-3xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2C2C2C] mb-4" style={{ fontFamily: "var(--font-fraunces)" }}>
              Frequently Asked Questions
            </h2>
          </AnimatedSection>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <AnimatedSection key={index} delay={index * 50}>
                <div className="bg-white rounded-xl border border-[#2D5A3D]/10 overflow-hidden">
                  <button
                    className="w-full p-5 text-left flex items-center justify-between gap-4"
                    onClick={() => setActiveAccordion(activeAccordion === index ? null : index)}
                  >
                    <span className="font-medium text-[#2C2C2C]">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-[#64748B] transition-transform ${activeAccordion === index ? "rotate-180" : ""}`} />
                  </button>
                  {activeAccordion === index && (
                    <div className="px-5 pb-5 text-[#64748B] text-sm leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-[#2D5A3D]">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-fraunces)" }}>
              Be One of the First 500
            </h2>
            <p className="text-lg text-white/70 mb-8 max-w-xl mx-auto">
              We're building InvoiceNudge for freelancers exactly like you — people who've sent that awkward "just following up" email one too many times.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-5 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-white text-[#2D5A3D] px-6 py-3 rounded-full font-semibold hover:bg-[#FAF7F2] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? "Joining..." : "Get Early Access"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
            {submitMessage && (
              <p className={`mt-3 text-sm ${submitMessage.includes("waitlist") ? "text-[#D4A853]" : "text-white/70"}`}>
                {submitMessage}
              </p>
            )}
            <p className="text-sm text-white/50 mt-4">
              30-day free trial when we launch • No credit card required
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-[#1E3D29]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Mail className="w-6 h-6 text-white" />
                <span className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-fraunces)" }}>InvoiceNudge</span>
              </div>
              <p className="text-white/60 text-sm max-w-xs">
                Built by a solo founder who got tired of chasing payments. We're here to make getting paid feel effortless.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-white/60 hover:text-white text-sm">Features</a></li>
                <li><a href="#pricing" className="text-white/60 hover:text-white text-sm">Pricing</a></li>
                <li><a href="#faq" className="text-white/60 hover:text-white text-sm">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Connect</h4>
              <div className="flex gap-4">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">© 2026 InvoiceNudge. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="/privacy" className="text-white/40 hover:text-white/60 text-sm">Privacy Policy</a>
              <a href="/terms" className="text-white/40 hover:text-white/60 text-sm">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#FAF7F2]/95 backdrop-blur-sm border-t border-[#2D5A3D]/10 md:hidden z-40">
        <a
          href="#waitlist"
          className="block w-full text-center py-3 rounded-full bg-[#2D5A3D] text-white font-semibold"
        >
          Join the Waitlist
        </a>
      </div>
    </div>
  );
}