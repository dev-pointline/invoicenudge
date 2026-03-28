"use client";

import { useState, useEffect, useRef } from "react";
import {
  Mail,
  Sparkles,
  TrendingUp,
  Eye,
  CreditCard,
  BarChart3,
  Clock,
  MessageSquare,
  Wallet,
  Check,
  ChevronDown,
  ArrowRight,
  Send,
  Calendar,
  CheckCircle2,
  Zap,
  Shield,
  Users,
  X,
  Menu,
} from "lucide-react";

// Intersection Observer hook for scroll animations
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    
    const elements = ref.current?.querySelectorAll(".scroll-reveal");
    elements?.forEach((el) => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);
  
  return ref;
}

// Navigation Component
function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-coral-500 to-coral-600 flex items-center justify-center">
              <Send className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-lg text-slate-900">InvoiceNudge</span>
          </a>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium">Features</a>
            <a href="#how-it-works" className="text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium">How It Works</a>
            <a href="#pricing" className="text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium">Pricing</a>
            <a href="#faq" className="text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium">FAQ</a>
          </div>
          
          <div className="hidden md:block">
            <a
              href="#waitlist"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-coral-500 hover:bg-coral-600 text-white font-medium rounded-full transition-all hover:scale-105 hover:shadow-lg hover:shadow-coral-500/25"
            >
              Join Waitlist
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass border-t border-slate-200/50">
          <div className="px-4 py-4 space-y-3">
            <a href="#features" className="block py-2 text-slate-600 hover:text-slate-900 font-medium">Features</a>
            <a href="#how-it-works" className="block py-2 text-slate-600 hover:text-slate-900 font-medium">How It Works</a>
            <a href="#pricing" className="block py-2 text-slate-600 hover:text-slate-900 font-medium">Pricing</a>
            <a href="#faq" className="block py-2 text-slate-600 hover:text-slate-900 font-medium">FAQ</a>
            <a
              href="#waitlist"
              className="block w-full text-center py-3 bg-coral-500 hover:bg-coral-600 text-white font-medium rounded-full transition-colors"
            >
              Join Waitlist
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

// Hero Email Mockup Animation
function HeroMockup() {
  const [step, setStep] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => (s + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Glow effect */}
      <div className="absolute -inset-4 bg-gradient-to-r from-coral-500/20 via-coral-400/10 to-coral-500/20 blur-3xl rounded-3xl" />
      
      {/* Main card */}
      <div className="relative glass rounded-2xl p-6 shadow-2xl">
        {/* Email preview */}
        <div className={`transition-all duration-500 ${step === 0 ? "opacity-100 scale-100" : "opacity-0 scale-95 absolute inset-6"}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-slate-200" />
            <div>
              <div className="text-sm font-medium text-slate-900">Invoice #1247</div>
              <div className="text-xs text-slate-500">To: client@company.com</div>
            </div>
          </div>
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <div className="text-sm text-slate-600">Hi Sarah, attached is the invoice for the logo design project...</div>
            <div className="mt-2 text-lg font-semibold text-slate-900">$2,500.00</div>
          </div>
        </div>
        
        {/* Forward animation */}
        <div className={`transition-all duration-500 ${step === 1 ? "opacity-100 scale-100" : "opacity-0 scale-95 absolute inset-6"}`}>
          <div className="flex items-center justify-center h-32">
            <div className="flex items-center gap-4">
              <Mail className="w-8 h-8 text-slate-400" />
              <ArrowRight className="w-6 h-6 text-coral-500 animate-pulse" />
              <div className="px-4 py-2 bg-coral-50 rounded-lg border border-coral-200">
                <span className="text-sm font-mono text-coral-600">followup@invoicenudge.com</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Timeline */}
        <div className={`transition-all duration-500 ${step === 2 ? "opacity-100 scale-100" : "opacity-0 scale-95 absolute inset-6"}`}>
          <div className="space-y-3">
            {[
              { day: "Day 0", text: "Friendly reminder sent", done: true },
              { day: "Day 7", text: "Check-in scheduled", done: true },
              { day: "Day 14", text: "Follow-up ready", done: false },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${item.done ? "bg-green-100 text-green-600" : "bg-slate-100 text-slate-400"}`}>
                  {item.done ? <Check className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                </div>
                <div>
                  <div className="text-xs text-slate-500">{item.day}</div>
                  <div className="text-sm font-medium text-slate-700">{item.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Paid! */}
        <div className={`transition-all duration-500 ${step === 3 ? "opacity-100 scale-100" : "opacity-0 scale-95 absolute inset-6"}`}>
          <div className="flex flex-col items-center justify-center h-32">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-3 animate-pulse-glow">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-xl font-semibold text-green-600">Paid!</div>
            <div className="text-sm text-slate-500">$2,500.00 received</div>
          </div>
        </div>
        
        {/* Step indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all ${step === i ? "bg-coral-500 w-6" : "bg-slate-300"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Waitlist Form Component
function WaitlistForm({ variant = "default" }: { variant?: "default" | "hero" | "final" }) {
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
      
      if (res.ok) {
        setStatus("success");
        setMessage(data.message);
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.message || "Something went wrong");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  };
  
  if (status === "success") {
    return (
      <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border border-green-200">
        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
        <span className="text-green-800 font-medium">{message}</span>
      </div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className={`flex flex-col sm:flex-row gap-3 ${variant === "hero" ? "max-w-md" : ""}`}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 px-4 py-3 rounded-full border border-slate-300 focus:border-coral-500 focus:ring-2 focus:ring-coral-500/20 outline-none transition-all text-slate-900 placeholder:text-slate-400"
          required
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-6 py-3 bg-coral-500 hover:bg-coral-600 disabled:bg-coral-400 text-white font-medium rounded-full transition-all hover:scale-105 hover:shadow-lg hover:shadow-coral-500/25 disabled:hover:scale-100 whitespace-nowrap flex items-center justify-center gap-2"
        >
          {status === "loading" ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              Join Waitlist
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
      {status === "error" && (
        <p className="mt-2 text-sm text-red-600">{message}</p>
      )}
    </form>
  );
}

// Pricing Card Component
function PricingCard({
  name,
  price,
  period,
  description,
  features,
  popular,
}: {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
}) {
  return (
    <div
      className={`relative rounded-2xl p-6 lg:p-8 transition-all hover:scale-[1.02] ${
        popular
          ? "bg-slate-900 text-white shadow-2xl shadow-slate-900/20 ring-4 ring-coral-500"
          : "bg-white border border-slate-200 hover:border-coral-200 hover:shadow-xl"
      }`}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-coral-500 text-white text-sm font-medium rounded-full">
          Most Popular
        </div>
      )}
      
      <div className="mb-6">
        <h3 className={`text-lg font-semibold ${popular ? "text-white" : "text-slate-900"}`}>{name}</h3>
        <p className={`text-sm mt-1 ${popular ? "text-slate-400" : "text-slate-500"}`}>{description}</p>
      </div>
      
      <div className="mb-6">
        <span className={`text-4xl font-bold ${popular ? "text-white" : "text-slate-900"}`}>{price}</span>
        <span className={`text-sm ${popular ? "text-slate-400" : "text-slate-500"}`}>/{period}</span>
      </div>
      
      <ul className="space-y-3 mb-8">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${popular ? "text-coral-400" : "text-coral-500"}`} />
            <span className={`text-sm ${popular ? "text-slate-300" : "text-slate-600"}`}>{feature}</span>
          </li>
        ))}
      </ul>
      
      <a
        href="#waitlist"
        className={`block w-full text-center py-3 rounded-full font-medium transition-all ${
          popular
            ? "bg-coral-500 hover:bg-coral-600 text-white hover:shadow-lg hover:shadow-coral-500/25"
            : "bg-slate-100 hover:bg-slate-200 text-slate-900"
        }`}
      >
        Join Waitlist
      </a>
    </div>
  );
}

// FAQ Item Component
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-slate-200 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left"
      >
        <span className="font-medium text-slate-900 pr-4">{question}</span>
        <ChevronDown className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <div className={`overflow-hidden transition-all ${isOpen ? "max-h-96 pb-5" : "max-h-0"}`}>
        <p className="text-slate-600 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

// Main Page Component
export default function Home() {
  const featuresRef = useScrollReveal();
  const howItWorksRef = useScrollReveal();
  const useCasesRef = useScrollReveal();
  const pricingRef = useScrollReveal();
  const faqRef = useScrollReveal();
  const finalCtaRef = useScrollReveal();
  
  return (
    <>
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden grain-overlay">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-coral-50/50 via-white to-white" />
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-coral-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-coral-100/40 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-coral-100 rounded-full mb-6 animate-fade-in-up">
                <Zap className="w-4 h-4 text-coral-600" />
                <span className="text-sm font-medium text-coral-700">Launching Soon</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 leading-[1.1] tracking-tight animate-fade-in-up animation-delay-100">
                Stop Chasing
                <span className="block text-coral-500">Late Payments</span>
              </h1>
              
              <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed animate-fade-in-up animation-delay-200">
                Forward your invoice. We handle the follow-ups. Get paid 14 days faster without the awkward "just checking in" emails that make you cringe.
              </p>
              
              <div className="mt-8 animate-fade-in-up animation-delay-300">
                <WaitlistForm variant="hero" />
                <p className="mt-3 text-sm text-slate-500">
                  Join 247 freelancers on the waitlist. We'll notify you when we launch.
                </p>
              </div>
            </div>
            
            {/* Mockup */}
            <div className="animate-fade-in-up animation-delay-400">
              <HeroMockup />
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-slate-400" />
        </div>
      </section>
      
      {/* Credibility Bar */}
      <section className="py-12 border-y border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-slate-600">
              <span className="font-semibold text-slate-900">Built for freelancers</span> who'd rather create than chase invoices
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-sm text-slate-500">
            <span className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Works with: Zelle, Venmo, PayPal, Check, Wire, Stripe, Square
            </span>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              No payment processor lock-in
            </span>
          </div>
          
          <p className="mt-6 text-center text-sm text-slate-500">
            85% of freelancers experience late payments. You shouldn't have to be a debt collector.
          </p>
        </div>
      </section>
      
      {/* Problem Section */}
      <section className="py-20 lg:py-32 grain-overlay" ref={featuresRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">The Freelancer's Curse</h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              You're great at what you do. But chasing payments? That's a whole different job you never signed up for.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: Clock,
                title: "8-12 Hours Monthly — Gone",
                description: "You spend nearly a full workday every month drafting 'friendly reminders' and refreshing your bank account. That's 3 extra work weeks per year you could spend on actual client work.",
              },
              {
                icon: MessageSquare,
                title: '"Am I Being Too Pushy?"',
                description: "You agonize over every word. Too aggressive? Too passive? You've rewritten 'just checking in!' seventeen times. Meanwhile, that $3,000 invoice? Still unpaid.",
              },
              {
                icon: Wallet,
                title: "Rent Due, Invoice Outstanding",
                description: "40% of freelancers miss personal bill payments because clients pay late. That anxiety-check of your bank account before the 1st? It shouldn't be part of your job.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="scroll-reveal p-6 lg:p-8 rounded-2xl bg-white border border-slate-200 hover:border-coral-200 hover:shadow-xl transition-all group"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-coral-50 flex items-center justify-center mb-5 group-hover:bg-coral-100 transition-colors">
                  <item.icon className="w-6 h-6 text-coral-500" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Solution Section */}
      <section className="py-20 lg:py-32 bg-slate-900 text-white grain-overlay" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-coral-400" />
                <span className="text-sm font-medium text-coral-300">The Solution</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                Forward your invoice.
                <span className="block text-coral-400">We handle the rest.</span>
              </h2>
              
              <div className="mt-10 space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                    <X className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Before: The Manual Chase</h4>
                    <p className="text-slate-400 text-sm mt-1">Invoice sent → Wait → Anxiety → Draft email → Second-guess → Send → Wait more → Cringe → Finally get paid (30-60 days late)</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Check className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">After: The InvoiceNudge Way</h4>
                    <p className="text-slate-400 text-sm mt-1">Invoice sent → Forward to InvoiceNudge → AI handles reminders → Get notified when paid → Total time: 10 seconds</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Feature bento grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <Mail className="w-8 h-8 text-coral-400 mb-4" />
                <h4 className="font-semibold text-white mb-2">Email-Forward Simplicity</h4>
                <p className="text-sm text-slate-400">No integrations. No accounting software. Just forward your invoice email and we extract everything automatically.</p>
              </div>
              
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <Sparkles className="w-8 h-8 text-coral-400 mb-4" />
                <h4 className="font-semibold text-white mb-2">Your Voice, Automated</h4>
                <p className="text-sm text-slate-400">AI learns your tone — casual or formal.</p>
              </div>
              
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <TrendingUp className="w-8 h-8 text-coral-400 mb-4" />
                <h4 className="font-semibold text-white mb-2">Escalates Gracefully</h4>
                <p className="text-sm text-slate-400">Day 0 → Day 7 → Day 14 → Day 21 politeness ladder.</p>
              </div>
              
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <Eye className="w-8 h-8 text-coral-400 mb-4" />
                <h4 className="font-semibold text-white mb-2">Preview Mode</h4>
                <p className="text-sm text-slate-400">Approve every email before it sends.</p>
              </div>
              
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <BarChart3 className="w-8 h-8 text-coral-400 mb-4" />
                <h4 className="font-semibold text-white mb-2">Track Results</h4>
                <p className="text-sm text-slate-400">See your average days-to-payment drop.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-20 lg:py-32 dot-grid" id="how-it-works" ref={howItWorksRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">How It Works</h2>
            <p className="mt-4 text-lg text-slate-600">Three steps. 60 seconds. Then never think about it again.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                step: "01",
                icon: Mail,
                title: "Forward Your Invoice",
                description: "Just forward the invoice email you sent to your client. We extract the client name, amount, and due date automatically.",
              },
              {
                step: "02",
                icon: Calendar,
                title: "We Handle Follow-Ups",
                description: "Our AI sends polite reminders on your schedule — Day 0, 7, 14, 21 — in your voice. Preview every email or go fully hands-off.",
              },
              {
                step: "03",
                icon: CheckCircle2,
                title: "Get Paid Faster",
                description: 'When your client pays, we detect it and stop the reminders. You just see "Paid" in your dashboard.',
              },
            ].map((item, i) => (
              <div key={i} className="scroll-reveal relative" style={{ transitionDelay: `${i * 150}ms` }}>
                {i < 2 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-coral-300 to-transparent -translate-x-8" />
                )}
                
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-coral-50 mb-6 relative">
                    <item.icon className="w-10 h-10 text-coral-500" />
                    <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-coral-500 text-white text-sm font-bold flex items-center justify-center">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Use Cases */}
      <section className="py-20 lg:py-32 bg-slate-50 grain-overlay" ref={useCasesRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Built for Freelancers Like You</h2>
            <p className="mt-4 text-lg text-slate-600">Here's how different freelancers would use InvoiceNudge</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                persona: "The Solo Designer",
                icon: "🎨",
                context: "5-8 clients monthly, PDF invoices, paid via Zelle or check",
                narrative: "Sarah forwards each invoice right after sending it to her client. When her $2,500 brand package invoice hits Day 7 without payment, InvoiceNudge sends a friendly check-in that matches her casual style. She's been getting paid an average of 12 days faster.",
                benefit: "Time saved: 8 hours/month",
              },
              {
                persona: "The Busy Consultant",
                icon: "💼",
                context: "3-4 retainer clients plus project work, $1,500-$15,000 invoices",
                narrative: "Marcus used to spend 2 hours every Friday reviewing outstanding invoices. Now he forwards invoices once and checks his dashboard weekly. His $8,000 strategy engagement that would've been 45 days overdue? InvoiceNudge's Day 14 reminder prompted payment within 48 hours.",
                benefit: "Cash flow: Predictable",
              },
              {
                persona: "The Growing Freelancer",
                icon: "📈",
                context: "Scaling from solo to team, 15-20 invoices monthly",
                narrative: "Alex was about to hire a part-time bookkeeper just to chase payments. Instead, she trained her VA to forward invoices to InvoiceNudge. At $149/month (Agency plan), it's a fraction of what a bookkeeper would cost — and it never takes PTO.",
                benefit: "Cost saved: $4,000+/month",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="scroll-reveal p-6 lg:p-8 rounded-2xl bg-white border border-slate-200 hover:shadow-xl transition-all"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{item.icon}</span>
                  <div>
                    <h3 className="font-semibold text-slate-900">{item.persona}</h3>
                    <p className="text-sm text-slate-500">{item.context}</p>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed mb-4">{item.narrative}</p>
                <div className="pt-4 border-t border-slate-100">
                  <span className="text-sm font-medium text-coral-600">{item.benefit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section className="py-20 lg:py-32" id="pricing" ref={pricingRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 scroll-reveal">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-coral-100 rounded-full mb-4">
              <span className="text-sm font-medium text-coral-700">Planned Pricing</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Simple, Transparent Pricing</h2>
            <p className="mt-4 text-lg text-slate-600">Lock in founding member rates before we launch.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 scroll-reveal">
            <PricingCard
              name="Starter"
              price="$19"
              period="month"
              description="For solo freelancers with 5-10 invoices monthly"
              features={[
                "Up to 10 invoices/month",
                "AI reminders (Day 0, 7, 14, 21)",
                "Preview Mode",
                "Email-forward workflow",
                "Basic payment dashboard",
                "Works with any payment method",
              ]}
            />
            
            <PricingCard
              name="Pro"
              price="$49"
              period="month"
              description="For established freelancers scaling up"
              popular
              features={[
                "Up to 50 invoices/month",
                "Everything in Starter",
                "Autopilot Mode",
                "Client reply detection",
                "Custom reminder schedules",
                "Priority support (4hr)",
                "Zapier integration",
              ]}
            />
            
            <PricingCard
              name="Agency"
              price="$149"
              period="month"
              description="For agencies and teams"
              features={[
                "Unlimited invoices",
                "Everything in Pro",
                "3 team seats",
                "White-label emails",
                "Multi-client dashboards",
                "Dedicated account manager",
                "API access",
              ]}
            />
          </div>
          
          <div className="mt-12 text-center scroll-reveal">
            <p className="text-slate-500">Pay annually and get 2 months free</p>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-20 lg:py-32 bg-slate-50" id="faq" ref={faqRef}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Frequently Asked Questions</h2>
          </div>
          
          <div className="scroll-reveal bg-white rounded-2xl border border-slate-200 divide-y divide-slate-200 overflow-hidden">
            <FAQItem
              question="When does InvoiceNudge launch?"
              answer="We're in the final stages of development, targeting launch within 8-12 weeks. Join the waitlist to be notified the moment we're live — founding members get exclusive early access and locked-in pricing."
            />
            <FAQItem
              question="Will my clients know I'm using an automation tool?"
              answer="No. Emails come from your email address and match your communication style. There's no 'Sent via InvoiceNudge' footer or robotic language. Your clients will think you wrote every reminder yourself."
            />
            <FAQItem
              question="What if the AI writes something that doesn't sound like me?"
              answer="Start with Preview Mode — you'll see and approve every email before it sends. After a few invoices, you'll see the AI learns your tone. Only switch to Autopilot Mode when you're fully comfortable."
            />
            <FAQItem
              question="What if my emails go to spam?"
              answer="We're built on Resend, the same email infrastructure used by Linear, Vercel, and thousands of modern companies — with 98%+ deliverability rates. We automatically configure SPF/DKIM/DMARC to maximize inbox placement."
            />
            <FAQItem
              question="Do I need to connect my accounting software?"
              answer="Nope. Just forward your invoice emails. No QuickBooks, no Xero, no FreshBooks integration required. We extract everything we need from the email itself."
            />
            <FAQItem
              question="What if a client replies 'I already paid'?"
              answer="Our AI detects payment confirmations and automatically stops the reminder sequence. No manual intervention needed — though you can always check and override in your dashboard."
            />
            <FAQItem
              question="Is my invoice data secure?"
              answer="Yes. All data is encrypted at rest and in transit. We process invoice data only to extract what's needed (client name, amount, due date) and never share it with third parties."
            />
            <FAQItem
              question="What's your refund policy?"
              answer="60-day money-back guarantee, no questions asked. If InvoiceNudge doesn't help you get paid faster — or you just change your mind — email us for a full refund."
            />
          </div>
        </div>
      </section>
      
      {/* Final CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-coral-50 to-coral-100 grain-overlay" id="waitlist" ref={finalCtaRef}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="scroll-reveal">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-coral-500 mb-6 animate-pulse-glow">
              <Send className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
              Be One of the First 500
              <span className="block text-coral-600">to Get Access</span>
            </h2>
            
            <p className="mt-6 text-lg text-slate-600 max-w-xl mx-auto">
              Founding members lock in $19/month forever — even when the price increases to $29. Plus exclusive early access and extended trial.
            </p>
            
            <div className="mt-10 max-w-md mx-auto">
              <WaitlistForm variant="final" />
            </div>
            
            <p className="mt-6 text-sm text-slate-500">
              We're building this for people exactly like you. No spam, just a launch notification.
            </p>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-coral-500 to-coral-600 flex items-center justify-center">
                <Send className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-lg">InvoiceNudge</span>
            </div>
            
            <nav className="flex items-center gap-6 text-sm text-slate-400">
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
              <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
              <a href="mailto:hello@invoicenudge.com" className="hover:text-white transition-colors">Contact</a>
            </nav>
            
            <div className="flex items-center gap-4">
              <a href="https://twitter.com/invoicenudge" target="_blank" rel="noopener noreferrer" className="p-2 text-slate-400 hover:text-white transition-colors" aria-label="Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://producthunt.com/products/invoicenudge" target="_blank" rel="noopener noreferrer" className="p-2 text-slate-400 hover:text-white transition-colors" aria-label="Product Hunt">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M13.604 8.4h-3.405V12h3.405c.995 0 1.801-.806 1.801-1.8 0-.995-.806-1.8-1.801-1.8zM12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm1.604 14.4h-3.405V18H7.801V6h5.803c2.319 0 4.2 1.881 4.2 4.2 0 2.319-1.881 4.2-4.2 4.2z"/></svg>
              </a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
            <p>InvoiceNudge automates payment follow-ups for freelancers who'd rather create than chase invoices.</p>
            <p className="mt-2">© 2026 InvoiceNudge. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      {/* Floating Mobile CTA */}
      <div className="fixed bottom-4 left-4 right-4 md:hidden z-40">
        <a
          href="#waitlist"
          className="flex items-center justify-center gap-2 w-full py-4 bg-coral-500 hover:bg-coral-600 text-white font-medium rounded-full shadow-lg shadow-coral-500/30 transition-all"
        >
          Join Waitlist
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </>
  );
}