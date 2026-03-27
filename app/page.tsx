"use client";

import { useState, useEffect, useRef } from "react";
import {
  Mail,
  Clock,
  DollarSign,
  MessageCircle,
  TrendingUp,
  Target,
  Plug,
  Coins,
  Send,
  Bot,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  Shield,
  Zap,
  Users,
  Star,
  Twitter,
  Linkedin,
  ExternalLink,
} from "lucide-react";

function useIntersectionObserver(options = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-orange-500 flex items-center justify-center">
              <Mail className="w-4 h-4 text-white" />
            </div>
            <span className={`font-[family-name:var(--font-fraunces)] font-semibold text-xl ${isScrolled ? "text-gray-900" : "text-white"}`}>
              InvoiceNudge
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className={`text-sm font-medium transition-colors ${isScrolled ? "text-gray-600 hover:text-gray-900" : "text-white/80 hover:text-white"}`}>Features</a>
            <a href="#how-it-works" className={`text-sm font-medium transition-colors ${isScrolled ? "text-gray-600 hover:text-gray-900" : "text-white/80 hover:text-white"}`}>How It Works</a>
            <a href="#pricing" className={`text-sm font-medium transition-colors ${isScrolled ? "text-gray-600 hover:text-gray-900" : "text-white/80 hover:text-white"}`}>Pricing</a>
            <a href="#faq" className={`text-sm font-medium transition-colors ${isScrolled ? "text-gray-600 hover:text-gray-900" : "text-white/80 hover:text-white"}`}>FAQ</a>
          </div>

          <div className="hidden md:block">
            <a href="#waitlist" className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white text-sm font-semibold rounded-full hover:from-indigo-600 hover:to-indigo-700 transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40">
              Join Waitlist
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className={isScrolled ? "text-gray-900" : "text-white"} /> : <Menu className={isScrolled ? "text-gray-900" : "text-white"} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden bg-white rounded-2xl shadow-xl p-6 mt-2 animate-fade-in-up">
            <div className="flex flex-col gap-4">
              <a href="#features" className="text-gray-600 hover:text-gray-900 font-medium" onClick={() => setIsOpen(false)}>Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 font-medium" onClick={() => setIsOpen(false)}>How It Works</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 font-medium" onClick={() => setIsOpen(false)}>Pricing</a>
              <a href="#faq" className="text-gray-600 hover:text-gray-900 font-medium" onClick={() => setIsOpen(false)}>FAQ</a>
              <a href="#waitlist" className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold rounded-full" onClick={() => setIsOpen(false)}>
                Join Waitlist
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

function HeroSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setIsSubmitted(true);
        setEmail("");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setIsSubmitting(false);
  };

  return (
    <section className="hero-gradient min-h-screen flex items-center pt-20 pb-16 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-indigo-500/10 to-transparent rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6 animate-fade-in-up">
              <Zap className="w-4 h-4 text-orange-400" />
              Launching Q2 2026 — Join the waitlist
            </div>
            
            <h1 className="font-[family-name:var(--font-fraunces)] text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 animate-fade-in-up animation-delay-100">
              Stop Writing{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400">
                &ldquo;Just Checking In...&rdquo;
              </span>{" "}
              Emails
            </h1>
            
            <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-in-up animation-delay-200">
              AI sends polite payment follow-ups in your voice, so you never have to chase invoices again. Designed to help freelancers get paid faster without the awkward conversations.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0 animate-fade-in-up animation-delay-300">
              {isSubmitted ? (
                <div className="flex items-center gap-3 px-6 py-4 bg-emerald-500/20 backdrop-blur-sm rounded-2xl text-emerald-300">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">You&apos;re on the list! We&apos;ll be in touch soon.</span>
                </div>
              ) : (
                <>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-5 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-pink-600 transition-all shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? "Joining..." : "Get Early Access"}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </form>

            <p className="text-sm text-white/60 mt-4 animate-fade-in-up animation-delay-400">
              First 100 invoices free • No credit card required
            </p>
          </div>

          <div className="relative animate-fade-in-up animation-delay-300">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 to-orange-500/30 rounded-3xl blur-2xl"></div>
              <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="text-xs text-white/50 uppercase tracking-wider mb-2">Generic Reminder</div>
                    <div className="bg-red-500/20 rounded-lg p-3 border border-red-500/30">
                      <p className="text-sm text-white/80 leading-relaxed">
                        &ldquo;Invoice #1234 is overdue. Please remit payment as soon as possible.&rdquo;
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-3 text-red-400 text-xs">
                      <X className="w-3 h-3" />
                      Cold, impersonal
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="text-xs text-white/50 uppercase tracking-wider mb-2">InvoiceNudge</div>
                    <div className="bg-emerald-500/20 rounded-lg p-3 border border-emerald-500/30">
                      <p className="text-sm text-white/80 leading-relaxed">
                        &ldquo;Hey Sarah! Hope the launch went great! Quick follow-up on my Feb invoice — let me know if you need anything!&rdquo;
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-3 text-emerald-400 text-xs">
                      <CheckCircle className="w-3 h-3" />
                      Sounds like you
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bot className="w-5 h-5 text-indigo-400" />
                    <span className="text-sm text-white/70">AI adapts to your writing style</span>
                  </div>
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 border-2 border-[#2d2d5a]"></div>
                    ))}
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
    <section ref={ref} className="py-12 bg-white border-b border-gray-100">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
        <div className="text-center mb-8">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Built for freelance designers, developers, writers, and consultants</p>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Works with your existing tools — no migration required
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-60">
          <div className="flex items-center gap-2 text-gray-400">
            <div className="w-8 h-8 bg-gray-200 rounded"></div>
            <span className="font-medium">QuickBooks</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <div className="w-8 h-8 bg-gray-200 rounded"></div>
            <span className="font-medium">FreshBooks</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <div className="w-8 h-8 bg-gray-200 rounded"></div>
            <span className="font-medium">Wave</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <div className="w-8 h-8 bg-gray-200 rounded"></div>
            <span className="font-medium">Xero</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <div className="w-8 h-8 bg-gray-200 rounded"></div>
            <span className="font-medium">Stripe</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <div className="w-8 h-8 bg-gray-200 rounded"></div>
            <span className="font-medium">PayPal</span>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="inline-flex items-center gap-2 text-sm text-orange-600 font-medium bg-orange-50 px-4 py-2 rounded-full">
            <TrendingUp className="w-4 h-4" />
            64% of freelancers experience late payments, costing $39,000+ per year in cash flow disruption
          </p>
        </div>
      </div>
    </section>
  );
}

function ProblemSection() {
  const { ref, isVisible } = useIntersectionObserver();

  const painPoints = [
    {
      icon: MessageCircle,
      title: '"Just Checking If You Saw My Invoice..."',
      description: "You draft the same uncomfortable email over and over. Should you be firm? Friendly? You rewrite it three times, finally hit send, then cringe at your inbox for a week.",
      stat: "78% of freelancers say chasing payments is their most stressful business task",
      color: "from-red-500 to-orange-500",
    },
    {
      icon: DollarSign,
      title: "Waiting 30-45 Days (or More) to Get Paid",
      description: "The average freelancer has $12,000 in outstanding invoices at any given time. When clients pay 30+ days late, that's rent you can't cover and opportunities you can't invest in.",
      stat: "$10,000+ annual cash flow gap for typical freelancers",
      color: "from-orange-500 to-yellow-500",
    },
    {
      icon: Clock,
      title: "2-3 Hours Every Month on Payment Admin",
      description: "Tracking who owes what, when to follow up, drafting each reminder manually — it adds up to 30+ hours per year spent on work you already completed.",
      stat: "That's time you should be spending on paid projects",
      color: "from-yellow-500 to-green-500",
    },
  ];

  return (
    <section ref={ref} className="py-20 md:py-28 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="font-[family-name:var(--font-fraunces)] text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            You&apos;re Losing <span className="gradient-text">$10,000+</span> Per Year to Late Payments
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            65% of freelancers wait 30+ days for payment. Here&apos;s what that costs you:
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {painPoints.map((point, index) => (
            <div
              key={index}
              className={`group bg-white rounded-2xl p-8 card-shadow hover:card-shadow-lg transition-all duration-300 hover:-translate-y-1 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: `${(index + 1) * 150}ms` }}
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${point.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <point.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-[family-name:var(--font-fraunces)] text-xl font-bold text-gray-900 mb-4">
                {point.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {point.description}
              </p>
              <div className="pt-4 border-t border-gray-100">
                <p className="text-sm font-medium text-gray-500">{point.stat}</p>
              </div>
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
      before: "You manually track due dates in a spreadsheet and set calendar reminders to follow up",
      after: "Forward your invoice once — InvoiceNudge monitors payment status and handles all follow-ups automatically",
    },
    {
      before: "You spend 15-20 minutes drafting each \"polite but firm\" reminder, agonizing over tone",
      after: "AI generates reminders that match YOUR voice in seconds — casual, professional, or somewhere in between",
    },
    {
      before: "You send one awkward email and hope for the best (or worse, give up entirely)",
      after: "An intelligent 4-stage sequence escalates from friendly nudge to firm final notice, designed to get action without burning bridges",
    },
  ];

  return (
    <section ref={ref} className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="font-[family-name:var(--font-fraunces)] text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Before & After <span className="gradient-text">InvoiceNudge</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See the transformation in your payment collection workflow
          </p>
        </div>

        <div className="space-y-6">
          {comparisons.map((item, index) => (
            <div
              key={index}
              className={`grid md:grid-cols-2 gap-4 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: `${(index + 1) * 150}ms` }}
            >
              <div className="bg-white rounded-2xl p-6 border-l-4 border-red-400 card-shadow">
                <div className="flex items-center gap-2 text-red-500 text-sm font-medium mb-3">
                  <X className="w-4 h-4" />
                  BEFORE
                </div>
                <p className="text-gray-700 leading-relaxed">{item.before}</p>
              </div>
              <div className="bg-white rounded-2xl p-6 border-l-4 border-emerald-400 card-shadow">
                <div className="flex items-center gap-2 text-emerald-500 text-sm font-medium mb-3">
                  <CheckCircle className="w-4 h-4" />
                  AFTER
                </div>
                <p className="text-gray-700 leading-relaxed">{item.after}</p>
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
    {
      icon: Target,
      title: "Reminders That Sound Like You",
      description: "Our AI learns your communication style from your emails. Casual emoji user? Strictly professional? The reminders will match your brand voice.",
      benefit: "So you can maintain authentic relationships while automating the awkward parts.",
      color: "bg-indigo-500",
    },
    {
      icon: TrendingUp,
      title: "4-Stage Intelligent Escalation",
      description: "Day 0: Friendly reminder. Day 7: Gentle check-in. Day 14: Firmer request. Day 21: Final notice with payment plan option.",
      benefit: "So you can apply appropriate pressure without having to decide what to say each time.",
      color: "bg-orange-500",
    },
    {
      icon: Mail,
      title: "Forward Invoice, Done",
      description: "No complex onboarding, no data migration, no new software to learn. Just forward your invoice email — we extract the details and handle the rest.",
      benefit: "So you can get started in 30 seconds, not 30 minutes.",
      color: "bg-emerald-500",
    },
    {
      icon: MessageCircle,
      title: "Smart Response Handling",
      description: "When a client replies \"I paid yesterday!\" or \"Can I pay half now?\" — InvoiceNudge detects it, stops the reminder sequence, and notifies you.",
      benefit: "So you can avoid awkward situations when clients respond between messages.",
      color: "bg-purple-500",
    },
    {
      icon: Plug,
      title: "Works With Your Existing Tools",
      description: "Keep using QuickBooks, FreshBooks, Wave, or even plain email invoices. InvoiceNudge plugs into your existing workflow.",
      benefit: "So you can add intelligent reminders without switching your entire financial stack.",
      color: "bg-pink-500",
    },
    {
      icon: Coins,
      title: "Only Pay When You Use It",
      description: "Not invoicing much this month? Pay $0.50 per invoice instead of a flat monthly fee. Send 10 invoices? Pay $5. No minimums, no commitments.",
      benefit: "So you can scale your costs with your actual business volume.",
      color: "bg-teal-500",
    },
  ];

  return (
    <section ref={ref} id="features" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="font-[family-name:var(--font-fraunces)] text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Everything You Need to <span className="gradient-text">Get Paid Faster</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Powerful features designed to handle the uncomfortable work of payment collection
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group p-8 rounded-2xl bg-gray-50 hover:bg-white hover:card-shadow-lg transition-all duration-300 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-[family-name:var(--font-fraunces)] text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {feature.description}
              </p>
              <p className="text-sm font-medium text-indigo-600">
                {feature.benefit}
              </p>
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
    {
      number: "01",
      icon: Send,
      title: "Forward Your Invoice",
      description: "Send any invoice email to follow-up@invoicenudge.com — takes 5 seconds",
    },
    {
      number: "02",
      icon: Bot,
      title: "AI Handles Follow-Up",
      description: "We extract the due date, amount, and client info, then create a personalized reminder sequence",
    },
    {
      number: "03",
      icon: CheckCircle,
      title: "Get Paid Faster",
      description: "Automatic reminders go out in your voice — you get notified when they pay or reply",
    },
  ];

  return (
    <section ref={ref} id="how-it-works" className="py-20 md:py-28 bg-gradient-to-b from-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="font-[family-name:var(--font-fraunces)] text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get started in under 60 seconds — no setup, no migration, no learning curve
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-24 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-indigo-200 via-indigo-400 to-indigo-200"></div>
          
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative text-center ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: `${(index + 1) * 200}ms` }}
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 mb-6 shadow-lg shadow-indigo-500/30">
                <step.icon className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 md:right-auto md:left-1/2 md:translate-x-8 md:-translate-y-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                {step.number}
              </div>
              <h3 className="font-[family-name:var(--font-fraunces)] text-xl font-bold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
                {step.description}
              </p>
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
      avatar: "S",
      context: "8-12 clients per month, invoices NET 15 but rarely gets paid before day 30",
      narrative: "After sending each invoice through FreshBooks, Sarah forwards the confirmation email to InvoiceNudge. Two weeks later, her client gets a friendly reminder that sounds exactly like Sarah's casual, emoji-filled writing style. By day 21, if still unpaid, a firmer (but still friendly) final notice goes out.",
      benefit: "Reclaimed Sunday evenings previously spent drafting awkward follow-up emails",
      color: "from-pink-500 to-rose-500",
    },
    {
      persona: "Technical Consultant",
      avatar: "M",
      context: "3-5 high-value clients, $10-20K per project with NET 30 terms",
      narrative: "For his big-ticket invoices, Marcus sets up the escalation ladder with more professional language befitting enterprise clients. The AI adapts to his formal communication style. When his client's AP department replies asking for a W-9, InvoiceNudge stops the sequence and alerts Marcus so he can respond personally.",
      benefit: "Focuses on the relationship while the system handles reminder logistics",
      color: "from-indigo-500 to-blue-500",
    },
    {
      persona: "Agency Founder",
      avatar: "J",
      context: "Boutique agency managing 15-20 client accounts",
      narrative: "Each team member forwards their client invoices after sending. InvoiceNudge tracks all outstanding payments in one dashboard, so Jamie can see agency-wide AR at a glance. When one client consistently pays 45 days late, the system flags them for deposit requirements on future projects.",
      benefit: "Reclaimed 15 hours/month previously spent on collections follow-up",
      color: "from-emerald-500 to-teal-500",
    },
  ];

  return (
    <section ref={ref} className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="font-[family-name:var(--font-fraunces)] text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Built for <span className="gradient-text">Real Freelancers</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See how different professionals would use InvoiceNudge in their daily workflow
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className={`bg-gray-50 rounded-3xl p-8 hover:card-shadow-lg transition-all duration-300 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: `${(index + 1) * 150}ms` }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${useCase.color} flex items-center justify-center text-white text-xl font-bold`}>
                  {useCase.avatar}
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-fraunces)] text-lg font-bold text-gray-900">
                    {useCase.persona}
                  </h3>
                  <p className="text-sm text-gray-500">{useCase.context}</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">
                {useCase.narrative}
              </p>
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium">
                  <CheckCircle className="w-4 h-4" />
                  {useCase.benefit}
                </div>
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
    <section ref={ref} id="pricing" className="py-20 md:py-28 bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-full text-indigo-700 text-sm font-medium mb-6">
            <Star className="w-4 h-4" />
            Planned Launch Pricing
          </div>
          <h2 className="font-[family-name:var(--font-fraunces)] text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            No contracts, no hidden fees, no surprises. Cancel anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className={`bg-white rounded-3xl p-8 card-shadow ${isVisible ? "animate-slide-in-left" : "opacity-0"}`}>
            <h3 className="font-[family-name:var(--font-fraunces)] text-2xl font-bold text-gray-900 mb-2">
              Pay Per Invoice
            </h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-5xl font-bold text-gray-900">$0.50</span>
              <span className="text-gray-500">/ invoice</span>
            </div>
            <ul className="space-y-4 mb-8">
              {[
                "AI-personalized reminders in your voice",
                "4-stage escalation sequence",
                "Client reply detection",
                "Email notifications",
                "Works with any invoicing tool",
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
            <a href="#waitlist" className="block w-full py-4 text-center border-2 border-indigo-500 text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 transition-colors">
              Join Waitlist
            </a>
            <p className="text-sm text-gray-500 text-center mt-4">
              Best for 5-15 invoices per month
            </p>
          </div>

          <div className={`relative bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 text-white card-shadow-lg ${isVisible ? "animate-slide-in-right" : "opacity-0"}`}>
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-orange-400 to-pink-500 text-white text-sm font-bold rounded-full">
              BEST VALUE
            </div>
            <h3 className="font-[family-name:var(--font-fraunces)] text-2xl font-bold mb-2">
              Unlimited
            </h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-5xl font-bold">$19</span>
              <span className="text-white/70">/ month</span>
            </div>
            <ul className="space-y-4 mb-8">
              {[
                "Everything in Pay Per Invoice",
                "Unlimited invoices",
                "Priority support",
                "Custom reminder templates",
                "Dashboard with AR overview",
                "Annual plan: $190/year (save $38)",
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-300 flex-shrink-0 mt-0.5" />
                  <span className="text-white/90">{feature}</span>
                </li>
              ))}
            </ul>
            <a href="#waitlist" className="block w-full py-4 text-center bg-white text-indigo-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors">
              Get Early Access
            </a>
            <p className="text-sm text-white/70 text-center mt-4">
              Best for 20+ invoices per month
            </p>
          </div>
        </div>

        <div className={`mt-16 max-w-3xl mx-auto ${isVisible ? "animate-fade-in-up animation-delay-400" : "opacity-0"}`}>
          <h3 className="font-[family-name:var(--font-fraunces)] text-xl font-bold text-gray-900 mb-6 text-center">
            Pricing FAQs
          </h3>
          <div className="grid gap-4">
            {[
              { q: "When will InvoiceNudge launch?", a: "We're targeting launch in Q2 2026. Waitlist members will get early access and a lifetime discount on any plan." },
              { q: "Will there be a free trial?", a: "Yes! Your first 100 invoices will be completely free — no credit card required. That's enough to validate the product for 3-6 months of typical freelance work." },
              { q: "Can I cancel anytime?", a: "Absolutely. No contracts, no termination fees, no retention calls. Cancel in 10 seconds from your dashboard." },
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-xl p-6 card-shadow">
                <h4 className="font-semibold text-gray-900 mb-2">{faq.q}</h4>
                <p className="text-gray-600">{faq.a}</p>
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
    { q: "How does InvoiceNudge know when to send reminders?", a: "When you forward an invoice email, our AI extracts the due date, client info, and amount. It automatically schedules reminders at Day 0 (due date), Day 3, Day 7, Day 14, and Day 21. You can customize this schedule in your dashboard." },
    { q: "Will my clients know I'm using automation?", a: "No — reminders are designed to be sent from your email address using authenticated sending. To your client, it looks like you personally wrote and sent each message. We never include \"Sent via InvoiceNudge\" branding." },
    { q: "What if the AI writes something I don't like?", a: "During the first 30 days, you'll review and approve each reminder before it sends. After the AI learns your voice (typically 5-10 reminders), you can switch to auto-send. You can always edit templates or jump into any conversation manually." },
    { q: "Can I use this with my existing invoicing tool?", a: "Yes! InvoiceNudge works with QuickBooks, FreshBooks, Wave, Xero, Stripe Invoicing, PayPal, or even plain email invoices. Just forward the invoice to us — no integration setup required." },
    { q: "What happens if my client replies to a reminder?", a: "InvoiceNudge monitors for replies and detects common responses like \"I paid already,\" \"Can I get an extension?,\" or \"Let me check with accounting.\" When detected, we pause the sequence and notify you immediately so you can respond personally." },
    { q: "Is there a contract or commitment?", a: "None. Pay-per-invoice has zero commitment — you only pay when you use it. The $19/month plan is month-to-month with no cancellation fees. Annual plans are discounted but you can cancel the renewal anytime." },
    { q: "How is this different from FreshBooks reminders?", a: "FreshBooks and similar tools send generic template reminders like \"Invoice #123 is overdue.\" InvoiceNudge uses AI to generate personalized messages that match YOUR writing style, with an intelligent escalation from friendly to firm." },
    { q: "What about GDPR and data privacy?", a: "We take privacy seriously. Invoice data is encrypted in transit and at rest. We never share your client information with third parties. You can delete all your data at any time, and we're designed to be GDPR compliant." },
  ];

  return (
    <section ref={ref} id="faq" className="py-20 md:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="font-[family-name:var(--font-fraunces)] text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to know about InvoiceNudge
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-gray-50 rounded-2xl overflow-hidden ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: `${(index + 1) * 50}ms` }}
            >
              <button
                className="w-full flex items-center justify-between p-6 text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTASection() {
  const { ref, isVisible } = useIntersectionObserver();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setIsSubmitted(true);
        setEmail("");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setIsSubmitting(false);
  };

  return (
    <section ref={ref} id="waitlist" className="py-20 md:py-28 hero-gradient relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6">
            <Users className="w-4 h-4" />
            Be one of the first 500 freelancers
          </div>
          
          <h2 className="font-[family-name:var(--font-fraunces)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Stop Chasing <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400">Late Payments?</span>
          </h2>
          
          <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
            Join the waitlist for early access and a lifetime launch discount. Your first 100 invoices are free — no credit card required.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            {isSubmitted ? (
              <div className="flex items-center gap-3 px-6 py-4 bg-emerald-500/20 backdrop-blur-sm rounded-2xl text-emerald-300 w-full justify-center">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">You&apos;re on the list! We&apos;ll be in touch soon.</span>
              </div>
            ) : (
              <>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-pink-600 transition-all shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 disabled:opacity-50 whitespace-nowrap"
                >
                  {isSubmitting ? "Joining..." : "Get Early Access"}
                </button>
              </>
            )}
          </form>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              256-bit SSL encryption
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              GDPR compliant
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              No credit card required
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-orange-500 flex items-center justify-center">
                <Mail className="w-4 h-4 text-white" />
              </div>
              <span className="font-[family-name:var(--font-fraunces)] font-semibold text-xl">
                InvoiceNudge
              </span>
            </div>
            <p className="text-gray-400 max-w-sm mb-6">
              AI-powered payment reminders that sound like you, not a robot. Built for freelancers who deserve to get paid on time.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          © 2026 InvoiceNudge. Made for freelancers who deserve to get paid on time.
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
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