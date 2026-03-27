"use client";

import { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  DollarSign,
  Clock,
  Heart,
  Sparkles,
  TrendingUp,
  Mail,
  CheckCircle,
  MessageSquare,
  Plug,
  Brain,
  Zap,
  ArrowRight,
  Shield,
  Lock,
  CreditCard,
  Check,
  ChevronDown,
  Twitter,
  Linkedin,
  ExternalLink,
  Lightbulb,
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

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <a href="#" className="font-display text-xl sm:text-2xl font-bold text-slate-900">
            Invoice<span className="text-blue-600">Nudge</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-slate-600 hover:text-slate-900 transition-colors">Features</a>
            <a href="#pricing" className="text-slate-600 hover:text-slate-900 transition-colors">Pricing</a>
            <a href="#faq" className="text-slate-600 hover:text-slate-900 transition-colors">FAQ</a>
            <a href="#waitlist" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full font-medium transition-colors">
              Join Waitlist
            </a>
          </div>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2" aria-label="Toggle menu">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {isOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 py-4">
            <div className="flex flex-col gap-4">
              <a href="#features" className="px-4 py-2 text-slate-600" onClick={() => setIsOpen(false)}>Features</a>
              <a href="#pricing" className="px-4 py-2 text-slate-600" onClick={() => setIsOpen(false)}>Pricing</a>
              <a href="#faq" className="px-4 py-2 text-slate-600" onClick={() => setIsOpen(false)}>FAQ</a>
              <a href="#waitlist" className="mx-4 bg-blue-600 text-white px-5 py-2.5 rounded-full font-medium text-center" onClick={() => setIsOpen(false)}>
                Join Waitlist
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

function HeroSection() {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section className="pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 via-white to-white">
      <div ref={ref} className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className={`${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
              Stop Writing{" "}
              <span className="text-blue-600">&ldquo;Just Checking In...&rdquo;</span>{" "}
              Emails
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed">
              AI sends polite payment reminders in your voice — so you can maintain client relationships without the awkwardness of chasing invoices. Designed to help freelancers get paid faster.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a href="#waitlist" className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all hover:scale-105 shadow-lg shadow-blue-600/25">
                Join the Waitlist
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
            <p className="mt-4 text-sm text-slate-500">
              Launching Q2 2026 • First 100 invoices free • No credit card required
            </p>
          </div>
          <div className={`${isVisible ? "animate-fade-in-up animation-delay-200" : "opacity-0"}`}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-3xl blur-3xl opacity-20 transform rotate-3"></div>
              <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
                <div className="bg-slate-100 px-4 py-3 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <span className="ml-2 text-xs text-slate-500">Email Preview</span>
                </div>
                <div className="p-6 space-y-6">
                  <div className="bg-slate-50 rounded-xl p-4 border-l-4 border-slate-300">
                    <p className="text-xs text-slate-400 mb-2">Generic Reminder</p>
                    <p className="text-slate-600 text-sm">Invoice #1234 is overdue. Please remit payment as soon as possible.</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4 border-l-4 border-blue-500">
                    <p className="text-xs text-blue-500 mb-2">AI-Personalized</p>
                    <p className="text-slate-700 text-sm">Hey Sarah! Hope the product launch went well! Quick follow-up on my Feb 15 invoice for the brand refresh work — let me know if you need anything from my end to process it. Thanks!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CredibilityBar() {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section ref={ref} className="py-12 bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <p className="text-lg sm:text-xl font-medium mb-6">
            Built for freelancers managing <span className="text-blue-400">$5K-50K+</span> in outstanding invoices
          </p>
          <p className="text-slate-400 text-sm mb-8">Works alongside the tools you already use</p>
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 opacity-60">
            {["QuickBooks", "FreshBooks", "Wave", "Xero", "Stripe", "PayPal"].map((tool) => (
              <span key={tool} className="text-sm sm:text-base font-medium tracking-wide">{tool}</span>
            ))}
          </div>
          <div className="mt-10 pt-10 border-t border-slate-700">
            <p className="text-slate-300 text-sm sm:text-base">
              <span className="text-blue-400 font-semibold">65% of freelancers</span> wait 30+ days for payment — costing them{" "}
              <span className="text-blue-400 font-semibold">$10,000+ annually</span> in cash flow gaps
            </p>
            <p className="text-slate-500 text-xs mt-2">Source: Jobbers.io 2025 Global Freelance Payment Delay Report</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProblemSection() {
  const { ref, isVisible } = useIntersectionObserver();

  const painPoints = [
    {
      icon: DollarSign,
      title: "You're carrying $12,000 in outstanding invoices right now",
      description: "Research shows the average freelancer has this much in unpaid work at any given time. Every day those invoices sit unpaid is a day you can't reinvest in your business, hire help, or simply pay rent on time.",
      color: "red",
    },
    {
      icon: Clock,
      title: "2-3 hours every month drafting 'polite but firm' follow-ups",
      description: "That's 30+ hours a year spent copying-pasting invoice numbers, looking up client names, and agonizing over whether 'Just checking in...' sounds too desperate. Time you could spend on billable work.",
      color: "amber",
    },
    {
      icon: Heart,
      title: "78% of freelancers say chasing payments is their most stressful task",
      description: "The anxiety of asking for your own money. The fear of damaging client relationships. The power imbalance when they have what's yours. It's exhausting — and it doesn't have to be.",
      color: "rose",
    },
  ];

  return (
    <section ref={ref} className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center max-w-3xl mx-auto mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            You&apos;re Losing <span className="text-red-500">$10,000+</span> Per Year to Late Payments
          </h2>
          <p className="mt-4 text-lg text-slate-600">Here&apos;s what that costs you beyond the cash flow gap</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {painPoints.map((point, i) => (
            <div key={i} className={`bg-white rounded-2xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-shadow ${isVisible ? `animate-fade-in-up animation-delay-${(i + 1) * 100}` : "opacity-0"}`}>
              <div className={`w-14 h-14 rounded-2xl bg-${point.color}-100 flex items-center justify-center mb-6`}>
                <point.icon className={`w-7 h-7 text-${point.color}-600`} />
              </div>
              <h3 className="font-display text-xl font-bold text-slate-900 mb-4">{point.title}</h3>
              <p className="text-slate-600 leading-relaxed">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SolutionSection() {
  const { ref, isVisible } = useIntersectionObserver();

  const comparisons = [
    {
      pain: "Lost Revenue",
      before: "Check email daily wondering \"Did they pay yet?\" while cash flow gaps grow",
      after: "AI monitors payment status automatically and follows up before delays compound",
    },
    {
      pain: "Wasted Hours",
      before: "Spend 15-30 minutes per invoice drafting, rewriting, and second-guessing your follow-up emails",
      after: "Forward invoice once → AI handles all follow-ups in under 10 seconds total",
    },
    {
      pain: "Emotional Drain",
      before: "Delete and rewrite \"Just checking in...\" emails 3 times before hitting send",
      after: "AI sends professionally warm reminders so you never feel like you're begging",
    },
  ];

  return (
    <section ref={ref} className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center max-w-3xl mx-auto mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            From Awkward to <span className="text-emerald-600">Automated</span>
          </h2>
          <p className="mt-4 text-lg text-slate-600">Here&apos;s how InvoiceNudge transforms your payment collection</p>
        </div>
        <div className="space-y-6">
          {comparisons.map((item, i) => (
            <div key={i} className={`grid md:grid-cols-2 gap-6 ${isVisible ? `animate-fade-in-up animation-delay-${(i + 1) * 100}` : "opacity-0"}`}>
              <div className="bg-white rounded-2xl p-6 border-2 border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Before</span>
                  <span className="text-sm text-slate-500">({item.pain})</span>
                </div>
                <p className="text-slate-600">{item.before}</p>
              </div>
              <div className="bg-emerald-50 rounded-2xl p-6 border-2 border-emerald-200">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">After</span>
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-slate-700">{item.after}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const { ref, isVisible } = useIntersectionObserver();

  const features = [
    { icon: Sparkles, title: "AI Voice Matching", description: "Reminders that sound like you wrote them. Our AI learns your communication style from sample emails, so clients receive follow-ups that match your tone.", benefit: "So you can maintain authentic relationships while automating the awkward parts." },
    { icon: TrendingUp, title: "Smart Escalation Ladder", description: "From friendly nudge to firm reminder — automatically. A 4-stage sequence (Day 0, 3, 7, 14) that starts warm and gradually increases urgency.", benefit: "So you can collect payment without burning bridges." },
    { icon: Mail, title: "Email-First Workflow", description: "Forward once, forget forever. Just BCC your invoice email to InvoiceNudge. No app to learn, no dashboard to check.", benefit: "So you can adopt instantly without changing your workflow." },
    { icon: CheckCircle, title: "Payment Detection", description: "Auto-stops when client pays. AI monitors for payment confirmations and automatically pauses the reminder sequence.", benefit: "So you never awkwardly follow up on a paid invoice." },
    { icon: MessageSquare, title: "Client Reply Handling", description: "AI suggests responses when clients push back. If a client asks for a payment plan or extension, we draft a professional response.", benefit: "So you can handle objections without stress." },
    { icon: Plug, title: "Works With Everything", description: "Keep your existing invoicing tool. InvoiceNudge isn't a replacement — it's the AI reminder layer on top of FreshBooks, Wave, or QuickBooks.", benefit: "So you get AI power without migration headaches." },
  ];

  return (
    <section ref={ref} id="features" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center max-w-3xl mx-auto mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            Everything You Need to <span className="text-blue-600">Get Paid Faster</span>
          </h2>
          <p className="mt-4 text-lg text-slate-600">Designed to handle the uncomfortable parts of freelancing for you</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div key={i} className={`group bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-lg hover:border-blue-100 transition-all ${isVisible ? `animate-fade-in-up animation-delay-${(i + 1) * 100}` : "opacity-0"}`}>
              <div className="w-14 h-14 rounded-2xl bg-blue-100 group-hover:bg-blue-600 flex items-center justify-center mb-6 transition-colors">
                <feature.icon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-display text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600 mb-4">{feature.description}</p>
              <p className="text-sm text-blue-600 font-medium">{feature.benefit}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const { ref, isVisible } = useIntersectionObserver();

  const steps = [
    { icon: Mail, number: "01", title: "Forward Your Invoice", description: "When you send an invoice to a client, BCC nudge@invoicenudge.com. Takes 2 seconds, no setup required." },
    { icon: Brain, number: "02", title: "AI Reads & Schedules", description: "Our AI extracts client name, amount, due date, and learns your writing style. Schedules reminders for Day 0, 3, 7, and 14." },
    { icon: Zap, number: "03", title: "Get Paid Faster", description: "Client receives personalized reminders that sound like you. Average collection time designed to improve by 10-16 days." },
  ];

  return (
    <section ref={ref} className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center max-w-3xl mx-auto mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold">
            Get Started in <span className="text-blue-400">60 Seconds</span>
          </h2>
          <p className="mt-4 text-lg text-slate-300">No complicated setup. No new tools to learn.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className={`relative ${isVisible ? `animate-fade-in-up animation-delay-${(i + 1) * 100}` : "opacity-0"}`}>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-blue-500 to-transparent -translate-x-1/2 z-0"></div>
              )}
              <div className="relative z-10 text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-slate-800 border-2 border-blue-500 mb-6">
                  <step.icon className="w-10 h-10 text-blue-400" />
                </div>
                <span className="block text-xs font-bold text-blue-400 tracking-widest mb-2">{step.number}</span>
                <h3 className="font-display text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-slate-400">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCasesSection() {
  const { ref, isVisible } = useIntersectionObserver();

  const useCases = [
    {
      persona: "Freelance Designer",
      context: "Managing 8-12 monthly retainers across different payment schedules",
      narrative: "Forward each retainer invoice to InvoiceNudge as they're sent. AI handles the follow-up cascade for each client independently, matching the designer's friendly-but-professional tone. Instead of tracking 12 different payment statuses manually, they check one dashboard weekly.",
      benefit: "Time saved on payment tracking",
    },
    {
      persona: "Independent Consultant",
      context: "Invoicing Fortune 500 companies with 60-90 day NET terms and AP bureaucracy",
      narrative: "Configure InvoiceNudge for longer escalation cycles (Day 30, 45, 60) with more formal language. AI drafts follow-ups that include PO numbers and speak 'enterprise AP language.' When clients request payment plan alternatives, AI suggests professional responses.",
      benefit: "Cash flow protection on $10K+ invoices",
    },
    {
      persona: "Creative Agency Owner",
      context: "15-20 active client projects with varying invoice sizes and payment reliability",
      narrative: "Team members BCC InvoiceNudge when sending any client invoice. Agency owner gets weekly summary of outstanding payments and collection progress. Chronic late-payers are flagged for deposit requirements on future projects.",
      benefit: "Client relationship preservation",
    },
  ];

  return (
    <section ref={ref} className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center max-w-3xl mx-auto mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            How <span className="text-blue-600">Freelancers Like You</span> Would Use InvoiceNudge
          </h2>
          <p className="mt-4 text-lg text-slate-600">Real scenarios, real outcomes (based on our product design)</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {useCases.map((useCase, i) => (
            <div key={i} className={`bg-white rounded-2xl p-8 shadow-lg border border-slate-100 ${isVisible ? `animate-fade-in-up animation-delay-${(i + 1) * 100}` : "opacity-0"}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">{useCase.persona.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-slate-900">{useCase.persona}</h3>
                  <p className="text-xs text-slate-500">{useCase.context}</p>
                </div>
              </div>
              <p className="text-slate-600 mb-6 leading-relaxed">{useCase.narrative}</p>
              <div className="pt-4 border-t border-slate-100">
                <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Key Benefit</span>
                <p className="text-slate-900 font-medium mt-1">{useCase.benefit}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section ref={ref} id="pricing" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-5xl mx-auto">
        <div className={`text-center max-w-3xl mx-auto mb-8 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            Simple, <span className="text-blue-600">Transparent</span> Pricing
          </h2>
          <p className="mt-4 text-lg text-slate-600">No contracts. No termination fees. Cancel anytime.</p>
        </div>
        
        {/* COO Required Banner */}
        <div className={`mb-10 ${isVisible ? "animate-fade-in-up animation-delay-100" : "opacity-0"}`}>
          <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-1">Beta Perk: All pricing tiers are free during validation</h3>
              <p className="text-slate-600">Your first 100 invoices are on us — no credit card required.</p>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className={`bg-white rounded-2xl p-8 shadow-lg border-2 border-slate-200 ${isVisible ? "animate-fade-in-up animation-delay-200" : "opacity-0"}`}>
            <h3 className="font-display text-xl font-bold text-slate-900 mb-2">Pay Per Invoice</h3>
            <p className="text-slate-500 text-sm mb-6">Best for freelancers with 5-15 invoices/month</p>
            <div className="mb-6">
              <span className="font-display text-4xl font-bold text-slate-900">$0.50</span>
              <span className="text-slate-500">/invoice</span>
              <span className="block text-xs text-slate-400 mt-1">Planned launch pricing</span>
            </div>
            <ul className="space-y-3 mb-8">
              {["AI-personalized reminders", "4-stage escalation sequence", "Email + dashboard notifications", "Works with any invoicing tool", "Pay only for what you use"].map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-slate-600">
                  <Check className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <a href="#waitlist" className="block w-full text-center bg-slate-100 hover:bg-slate-200 text-slate-900 px-6 py-3 rounded-full font-semibold transition-colors">
              Join Waitlist
            </a>
          </div>
          <div className={`bg-blue-600 rounded-2xl p-8 shadow-lg border-2 border-blue-600 relative ${isVisible ? "animate-fade-in-up animation-delay-300" : "opacity-0"}`}>
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="bg-amber-400 text-amber-900 text-xs font-bold px-4 py-1.5 rounded-full">RECOMMENDED</span>
            </div>
            <h3 className="font-display text-xl font-bold text-white mb-2">Unlimited</h3>
            <p className="text-blue-200 text-sm mb-6">Best for freelancers with 20+ invoices/month</p>
            <div className="mb-6">
              <span className="font-display text-4xl font-bold text-white">$19</span>
              <span className="text-blue-200">/month</span>
              <span className="block text-xs text-blue-300 mt-1">Planned launch pricing • Annual: $190/year (save $38)</span>
            </div>
            <ul className="space-y-3 mb-8">
              {["Everything in Pay Per Invoice", "Unlimited invoices", "Priority support (24-hour response)", "Custom reminder templates", "Early adopter pricing locked in"].map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-white">
                  <Check className="w-5 h-5 text-emerald-300 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <a href="#waitlist" className="block w-full text-center bg-white hover:bg-blue-50 text-blue-600 px-6 py-3 rounded-full font-semibold transition-colors">
              Join Waitlist
            </a>
          </div>
        </div>
        <div className={`bg-white rounded-2xl p-8 shadow-sm border border-slate-100 ${isVisible ? "animate-fade-in-up animation-delay-400" : "opacity-0"}`}>
          <h3 className="font-display text-xl font-bold text-slate-900 mb-6">Pricing FAQ</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { q: "When does InvoiceNudge launch?", a: "We're targeting Q2 2026 for public launch. Beta testers get early access starting in 8 weeks." },
              { q: "Will there be a free trial?", a: "Yes — your first 100 invoices are completely free during beta. No credit card required to start." },
              { q: "Can I cancel anytime?", a: "Absolutely. No contracts, no termination fees. The Unlimited plan is month-to-month." },
            ].map((faq, i) => (
              <div key={i}>
                <h4 className="font-semibold text-slate-900 mb-2">{faq.q}</h4>
                <p className="text-slate-600 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const { ref, isVisible } = useIntersectionObserver();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { q: "How does InvoiceNudge know when to send reminders?", a: "When you forward an invoice email to nudge@invoicenudge.com, our AI extracts the due date and schedules automatic reminders at Day 0 (due date), Day 3, Day 7, and Day 14. You can customize this schedule in your dashboard." },
    { q: "Will my clients know I'm using automation?", a: "No. Reminders are sent from your authenticated email address, not from @invoicenudge.com. To your client, it looks exactly like you personally wrote and sent each reminder." },
    { q: "What if the AI writes something I don't like?", a: "You can review and edit every reminder before it sends. For the first 30 days, approval is required by default. After that, you can switch to auto-send once you're confident in the AI's tone matching." },
    { q: "Can I use this with FreshBooks / QuickBooks / Wave?", a: "Yes. InvoiceNudge works alongside any invoicing tool. Just BCC or forward the invoice email — no API integration required. We're designed to complement your existing stack, not replace it." },
    { q: "What happens if my client replies to the reminder?", a: "InvoiceNudge detects client replies and pauses the sequence. If they confirm payment ('I paid this yesterday!'), we mark it resolved. If they request changes ('Can I pay half now?'), we draft a response for your approval." },
    { q: "Is my data secure?", a: "Absolutely. All data is encrypted with 256-bit SSL in transit and at rest. We're GDPR compliant and never share your information with third parties. You can delete your data at any time." },
    { q: "How is this different from FreshBooks' built-in reminders?", a: "FreshBooks sends generic templates ('Invoice #123 is overdue'). InvoiceNudge uses AI to write personalized reminders in YOUR voice, with an escalating tone sequence that gets progressively firmer. Clients respond better to personal messages." },
    { q: "When does InvoiceNudge launch?", a: "We're targeting Q2 2026 for public launch. Join the waitlist now to get beta access in 8 weeks, plus lifetime early-adopter pricing (50% off forever)." },
  ];

  return (
    <section ref={ref} id="faq" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            Frequently Asked <span className="text-blue-600">Questions</span>
          </h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className={`bg-white rounded-2xl border border-slate-200 overflow-hidden ${isVisible ? `animate-fade-in-up animation-delay-${Math.min(i + 1, 6) * 100}` : "opacity-0"}`}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-semibold text-slate-900 pr-4">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${openIndex === i ? "rotate-180" : ""}`} />
              </button>
              {openIndex === i && (
                <div className="px-6 pb-6">
                  <p className="text-slate-600 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
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
      if (data.success) {
        setStatus("success");
        setMessage(data.message);
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="flex-1 px-6 py-4 rounded-full border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-slate-900"
        required
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-4 rounded-full font-semibold transition-colors flex items-center justify-center gap-2"
      >
        {status === "loading" ? "Joining..." : "Get Early Access"}
        <ArrowRight className="w-5 h-5" />
      </button>
      {status === "success" && <p className="text-emerald-600 text-sm mt-2 sm:col-span-2">{message}</p>}
      {status === "error" && <p className="text-red-600 text-sm mt-2 sm:col-span-2">{message}</p>}
    </form>
  );
}

function FinalCTASection() {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section ref={ref} id="waitlist" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <div className={isVisible ? "animate-fade-in-up" : "opacity-0"}>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Join Freelancers Getting Paid Faster
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-4">
            Be one of the first to experience AI-powered payment reminders. Beta access opens in 8 weeks — early adopters get lifetime pricing locked in.
          </p>
          <p className="text-blue-200 mb-10">
            We&apos;re building this for people exactly like you — freelancers who are tired of feeling awkward about asking for their own money.
          </p>
        </div>
        <div className={`${isVisible ? "animate-fade-in-up animation-delay-200" : "opacity-0"}`}>
          <WaitlistForm />
        </div>
        <div className={`mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-blue-200 ${isVisible ? "animate-fade-in-up animation-delay-300" : "opacity-0"}`}>
          <span className="flex items-center gap-2"><Lock className="w-4 h-4" /> 256-bit SSL</span>
          <span className="flex items-center gap-2"><Shield className="w-4 h-4" /> GDPR Compliant</span>
          <span className="flex items-center gap-2"><CreditCard className="w-4 h-4" /> No Credit Card</span>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <a href="#" className="font-display text-2xl font-bold text-white">
              Invoice<span className="text-blue-400">Nudge</span>
            </a>
            <p className="mt-4 text-sm leading-relaxed max-w-sm">
              InvoiceNudge helps freelancers get paid faster with AI-powered payment reminders that sound like them.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors" aria-label="Product Hunt">
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="mailto:hello@invoicenudge.com" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-800 text-center text-sm">
          <p>&copy; 2026 InvoiceNudge. Made for freelancers who deserve to get paid on time.</p>
        </div>
      </div>
    </footer>
  );
}

export default function HomePage() {
  return (
    <main>
      <NavBar />
      <HeroSection />
      <CredibilityBar />
      <ProblemSection />
      <SolutionSection />
      <FeaturesSection />
      <HowItWorksSection />
      <UseCasesSection />
      <PricingSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
    </main>
  );
}