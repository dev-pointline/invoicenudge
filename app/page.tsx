"use client";

import { useState, useEffect, useRef } from "react";
import {
  Clock,
  MessageSquare,
  DollarSign,
  Sparkles,
  Calendar,
  Mail,
  Send,
  BarChart3,
  Shield,
  ArrowRight,
  Check,
  ChevronDown,
  Menu,
  X,
  Twitter,
  Linkedin,
  Zap,
  Users,
  TrendingUp,
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

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const heroSection = useIntersectionObserver();
  const problemSection = useIntersectionObserver();
  const solutionSection = useIntersectionObserver();
  const featuresSection = useIntersectionObserver();
  const howItWorksSection = useIntersectionObserver();
  const useCasesSection = useIntersectionObserver();
  const pricingSection = useIntersectionObserver();
  const founderSection = useIntersectionObserver();
  const faqSection = useIntersectionObserver();
  const ctaSection = useIntersectionObserver();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      
      if (response.ok) {
        setIsSubmitted(true);
        setEmail("");
      }
    } catch (error) {
      console.error("Subscription error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      question: "How does InvoiceNudge know when to send reminders?",
      answer: "When you forward an invoice to nudge@invoicenudge.com, our AI reads the email and extracts the due date. We automatically schedule reminders for Day 0 (due date), Day 3, Day 7, and Day 14. You can customize this schedule in your dashboard."
    },
    {
      question: "Will my clients know I'm using InvoiceNudge?",
      answer: "Nope! Reminders are sent from your email address using authenticated forwarding (SPF/DKIM). Your client sees your email address as the sender — it looks exactly like you wrote and sent it yourself."
    },
    {
      question: "What if the AI writes something I don't like?",
      answer: "For your first 30 days, you review and approve every reminder before it sends. After that, you can switch to auto-send mode — or keep manual approval forever. You're always in control."
    },
    {
      question: "Can I use InvoiceNudge with FreshBooks / QuickBooks / Wave?",
      answer: "Yes! InvoiceNudge works alongside any invoicing tool. Just forward the invoice email from FreshBooks/QuickBooks/Wave/etc. to nudge@invoicenudge.com. No migration, no data entry, no new software to learn."
    },
    {
      question: "What happens when my client replies to a reminder?",
      answer: "InvoiceNudge detects common client responses. If they say 'Paid!' or 'Sending now!', we auto-stop the reminder sequence and notify you. If they ask to reschedule, we flag it for your review."
    },
    {
      question: "How is this different from FreshBooks's built-in reminders?",
      answer: "FreshBooks sends generic templates like 'Invoice #1234 is now 7 days overdue.' InvoiceNudge uses AI to write personalized reminders that sound like you — clients respond better to personal reminders than robotic templates."
    },
    {
      question: "What about security? Is forwarding invoices safe?",
      answer: "Yes. We use 256-bit SSL encryption, SOC 2-compliant infrastructure, and never share your data with third parties. Your invoice data is only used to generate reminders."
    },
    {
      question: "When does InvoiceNudge launch?",
      answer: "We're targeting Q2 2026 for public launch. Beta testers on our waitlist get early access starting March 2026. Join now to lock in lifetime launch pricing — 20% off forever."
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                <Send className="w-4 h-4 text-white" />
              </div>
              <span className="font-serif font-bold text-xl text-slate-900">InvoiceNudge</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Features</a>
              <a href="#pricing" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Pricing</a>
              <a href="#faq" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">FAQ</a>
              <a href="#waitlist" className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white text-sm font-medium rounded-lg hover:bg-emerald-600 transition-colors">
                Join Waitlist
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <button 
              className="md:hidden p-2 text-slate-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 py-4">
            <div className="flex flex-col gap-4 px-4">
              <a href="#features" className="text-slate-600 hover:text-slate-900" onClick={() => setMobileMenuOpen(false)}>Features</a>
              <a href="#pricing" className="text-slate-600 hover:text-slate-900" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
              <a href="#faq" className="text-slate-600 hover:text-slate-900" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
              <a href="#waitlist" className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-emerald-500 text-white font-medium rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                Join Waitlist
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section 
        ref={heroSection.ref}
        className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-gradient-to-b from-emerald-50/50 to-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className={`${heroSection.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-full mb-6">
                <Sparkles className="w-4 h-4" />
                Launching Q2 2026
              </div>
              
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                Stop Writing{" "}
                <span className="text-emerald-600">&ldquo;Just Checking In...&rdquo;</span>{" "}
                Emails
              </h1>
              
              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-8">
                AI sends polite payment reminders that sound like you wrote them — so you get paid faster without the awkward follow-ups. Freelancers on our waitlist report collecting invoices{" "}
                <span className="font-semibold text-slate-900">16 days faster</span> on average.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-900 placeholder:text-slate-400"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {isSubmitted ? (
                    <>
                      <Check className="w-5 h-5" />
                      You&apos;re In!
                    </>
                  ) : isSubmitting ? (
                    "Joining..."
                  ) : (
                    <>
                      Join Waitlist
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>

              <p className="text-sm text-slate-500">
                First 100 invoices free • No credit card required
              </p>
            </div>

            <div className={`${heroSection.isVisible ? 'animate-fade-in-up animation-delay-200' : 'opacity-0'}`}>
              <div className="relative">
                {/* Before/After Comparison */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-100 rounded-2xl p-4 border border-slate-200">
                    <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-3">Before</div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 bg-slate-300 rounded-full"></div>
                        <span className="text-xs text-slate-500">Generic Template</span>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        Invoice #1234 is now 7 days overdue. Please remit payment as soon as possible.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-emerald-50 rounded-2xl p-4 border-2 border-emerald-200 relative">
                    <div className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      AI-Powered
                    </div>
                    <div className="text-xs font-medium text-emerald-600 uppercase tracking-wide mb-3">After</div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                          <Sparkles className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-xs text-emerald-600">Your Voice</span>
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed">
                        Hey Sarah! Hope the product launch went smoothly! Just floating my Feb 15 invoice back to the top of your inbox.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl"></div>
              </div>
            </div>
          </div>

          {/* Credibility Bar */}
          <div className={`mt-16 pt-8 border-t border-slate-200 ${heroSection.isVisible ? 'animate-fade-in animation-delay-400' : 'opacity-0'}`}>
            <p className="text-center text-sm text-slate-500 mb-6">
              Built for freelancers managing $10k+ in outstanding invoices • Works with your existing tools
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-60 grayscale">
              {["QuickBooks", "FreshBooks", "Wave", "Xero", "Stripe", "PayPal"].map((tool) => (
                <span key={tool} className="text-sm font-medium text-slate-400">{tool}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section 
        ref={problemSection.ref}
        className="py-16 lg:py-24 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 lg:mb-16 ${problemSection.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              You&apos;re Losing <span className="text-red-500">$10,000+</span> Per Year to Late Payments
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              65% of freelancers wait 30+ days for payment. Here&apos;s what that really costs you:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                title: "Days Turn Into Weeks",
                description: "The average freelancer waits 44 days to get paid — that's 6 weeks of stress while your invoice sits in someone's inbox. Meanwhile, rent is due, software subscriptions auto-charge, and that new client project needs supplies upfront.",
                color: "text-amber-500",
                bg: "bg-amber-50",
              },
              {
                icon: MessageSquare,
                title: "The Awkward Follow-Up",
                description: "You've rewritten 'Just checking in on my invoice...' three times. You don't want to seem pushy, but you also need to pay your mortgage. This emotional labor drains 2-3 hours every month — time you could spend doing actual work.",
                color: "text-rose-500",
                bg: "bg-rose-50",
              },
              {
                icon: DollarSign,
                title: "$10,000+ Lost Every Year",
                description: "When clients pay 30-60 days late, you're essentially giving them a free loan. Add up the cash flow gaps, the overdraft fees, and the projects you couldn't take — it's over $10k annually for most freelancers.",
                color: "text-red-500",
                bg: "bg-red-50",
              },
            ].map((item, index) => (
              <div 
                key={item.title}
                className={`${problemSection.isVisible ? 'animate-fade-in-up' : 'opacity-0'} ${item.bg} rounded-2xl p-6 lg:p-8`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center mb-4`}>
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <h3 className="font-serif text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution / Before-After Section */}
      <section 
        ref={solutionSection.ref}
        className="py-16 lg:py-24 bg-slate-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 lg:mb-16 ${solutionSection.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              How InvoiceNudge Changes Everything
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              From stressful manual follow-ups to effortless automated collection
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                before: "You check your inbox obsessively waiting for payment notifications while your invoice ages from 'due soon' to 'seriously overdue'",
                after: "InvoiceNudge automatically tracks due dates and sends reminders at Day 0, 3, 7, and 14 — you check your dashboard once a week, not 10 times a day",
              },
              {
                before: "You draft the follow-up email, delete it, rewrite it three times, and finally hit send feeling like you're begging for your own money",
                after: "AI generates reminders that match YOUR voice — casual if you're casual, professional if you're formal — and sends them automatically",
              },
              {
                before: "You accept that late payments are 'just part of freelancing' and budget around 45-day payment cycles",
                after: "InvoiceNudge's escalating reminder sequence cuts average collection time by 10-16 days — that's $8k-12k back in your cash flow annually",
              },
            ].map((item, index) => (
              <div 
                key={index}
                className={`grid md:grid-cols-2 gap-4 ${solutionSection.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="bg-white rounded-xl p-6 border border-slate-200">
                  <div className="flex items-center gap-2 text-slate-500 text-sm font-medium mb-3">
                    <X className="w-4 h-4 text-red-400" />
                    Before
                  </div>
                  <p className="text-slate-600">{item.before}</p>
                </div>
                <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
                  <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium mb-3">
                    <Check className="w-4 h-4" />
                    With InvoiceNudge
                  </div>
                  <p className="text-slate-700">{item.after}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        id="features"
        ref={featuresSection.ref}
        className="py-16 lg:py-24 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 lg:mb-16 ${featuresSection.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Everything You Need to Get Paid Faster
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Built by a freelancer who lost $8,000 to late payments in 2025
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: Sparkles,
                title: "AI That Sounds Like You",
                description: "Our AI learns your communication style from 3 sample emails you provide during setup. The result: reminders that sound like you wrote them, not a robot.",
                benefit: "Maintain authentic client relationships while automating the uncomfortable parts.",
              },
              {
                icon: TrendingUp,
                title: "Smart Escalation Ladder",
                description: "Reminders start friendly ('Quick heads-up!') and gradually become more direct ('Final reminder before I pause work'). Each stage is designed to get results without damaging relationships.",
                benefit: "Let the system handle escalation while you stay the 'good cop.'",
              },
              {
                icon: Mail,
                title: "Email-First Workflow",
                description: "Just forward your invoice email to nudge@invoicenudge.com. Our AI extracts the client, amount, and due date automatically. No data entry, no new software to learn.",
                benefit: "Add invoice tracking in 10 seconds, not 10 minutes.",
              },
              {
                icon: Send,
                title: "Sent From Your Email",
                description: "Reminders are sent from your email address via authenticated forwarding. Your client never sees '@invoicenudge.com' — it looks exactly like you wrote and sent it yourself.",
                benefit: "Your clients have no idea you're using automation.",
              },
              {
                icon: BarChart3,
                title: "Collection Dashboard",
                description: "See all your outstanding invoices in one place: who owes what, how many days overdue, and which reminders have been sent. Filter by status, client, or amount.",
                benefit: "Know your cash flow position at a glance without spreadsheet gymnastics.",
              },
              {
                icon: Shield,
                title: "Human-in-the-Loop Control",
                description: "Review and approve every AI-generated reminder for your first 30 days. After you've trained the AI on your preferences, you can switch to auto-send — or keep manual approval forever.",
                benefit: "Stay in complete control while the AI learns what 'sounds like you' means.",
              },
            ].map((feature, index) => (
              <div 
                key={feature.title}
                className={`bg-slate-50 rounded-2xl p-6 lg:p-8 ${featuresSection.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="font-serif text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 mb-4">{feature.description}</p>
                <p className="text-sm text-emerald-600 font-medium">{feature.benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section 
        ref={howItWorksSection.ref}
        className="py-16 lg:py-24 bg-emerald-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 lg:mb-16 ${howItWorksSection.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Three simple steps to never write an awkward follow-up email again
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                step: 1,
                icon: Mail,
                title: "Forward Your Invoice",
                description: "Send your invoice email to nudge@invoicenudge.com — AI extracts client info, amount, and due date automatically.",
              },
              {
                step: 2,
                icon: Sparkles,
                title: "AI Learns Your Voice",
                description: "On signup, paste 3 sample follow-up emails you've written. Our AI uses these to match your tone, formality, and style.",
              },
              {
                step: 3,
                icon: Zap,
                title: "Get Paid Faster",
                description: "InvoiceNudge sends escalating reminders in your voice at Day 0, 3, 7, and 14. You track everything from your dashboard.",
              },
            ].map((item, index) => (
              <div 
                key={item.step}
                className={`text-center ${howItWorksSection.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="relative inline-flex items-center justify-center mb-6">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <item.icon className="w-8 h-8 text-emerald-500" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {item.step}
                  </div>
                </div>
                <h3 className="font-serif text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section 
        ref={useCasesSection.ref}
        className="py-16 lg:py-24 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 lg:mb-16 ${useCasesSection.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Built for Freelancers Like You
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Here&apos;s how different professionals would use InvoiceNudge
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                persona: "Sarah, Freelance Designer",
                scenario: "Invoices 15 clients per month for brand design work ranging from $500 to $5,000. Her clients are busy startup founders who mean well but genuinely forget to pay.",
                result: "With InvoiceNudge, Sarah forwards each invoice immediately after sending it. The AI sends a friendly Day 3 reminder that sounds like Sarah. Her average collection time dropped from 38 days to 24 days — that's $6,000 back in her cash flow per quarter.",
              },
              {
                icon: BarChart3,
                persona: "Marcus, Marketing Consultant",
                scenario: "Works with 4 enterprise clients on $15k monthly retainers. His clients have formal AP departments that require professional escalation.",
                result: "With InvoiceNudge, Marcus sets his tone to 'Corporate Professional' — reminders reference PO numbers, use formal language, and cc the AP contact. His largest client, who used to pay at Day 45, now pays at Day 28.",
              },
              {
                icon: Zap,
                persona: "Jamie, Small Agency (3 people)",
                scenario: "Small agency sends 25 invoices per month across web development, maintenance, and consulting. Before InvoiceNudge, Jamie's business partner spent 10 hours monthly chasing payments.",
                result: "Now they forward invoices from their shared inbox, and InvoiceNudge handles all follow-ups automatically. They reclaimed 10 hours for billable client work — at $150/hour, that's $1,500/month in recovered revenue.",
              },
            ].map((item, index) => (
              <div 
                key={item.persona}
                className={`bg-slate-50 rounded-2xl p-6 lg:p-8 ${useCasesSection.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="font-serif text-lg font-bold text-slate-900 mb-2">{item.persona}</h3>
                <p className="text-sm text-slate-500 mb-4">{item.scenario}</p>
                <p className="text-slate-700 leading-relaxed">{item.result}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section 
        id="pricing"
        ref={pricingSection.ref}
        className="py-16 lg:py-24 bg-slate-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 lg:mb-16 ${pricingSection.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-100 text-amber-700 text-sm font-medium rounded-full mb-4">
              Planned Launch Pricing
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Beta testers get all pricing tiers free during validation. First 100 invoices on us.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Pay As You Go",
                price: "$0.50",
                period: "per invoice",
                description: "Perfect for freelancers with 5-15 invoices/month",
                features: [
                  "AI-personalized reminders",
                  "4-stage escalation sequence",
                  "Email forwarding workflow",
                  "Collection dashboard",
                  "Works with any invoicing tool",
                ],
                popular: false,
              },
              {
                name: "Unlimited",
                price: "$19",
                period: "/month",
                yearlyPrice: "$190/year (save $38)",
                description: "Perfect for freelancers with 20+ invoices/month",
                features: [
                  "Everything in Pay As You Go",
                  "Unlimited invoices",
                  "Priority support (24hr response)",
                  "Custom reminder templates",
                  "Advanced analytics",
                ],
                popular: true,
              },
              {
                name: "Agency",
                price: "$49",
                period: "/month",
                yearlyPrice: "$490/year",
                description: "Perfect for small agencies (2-5 people)",
                features: [
                  "Everything in Unlimited",
                  "Up to 5 team members",
                  "Shared inbox support",
                  "Team analytics dashboard",
                  "White-label reminders (optional)",
                ],
                popular: false,
              },
            ].map((tier, index) => (
              <div 
                key={tier.name}
                className={`bg-white rounded-2xl p-6 lg:p-8 ${tier.popular ? 'ring-2 ring-emerald-500 relative' : 'border border-slate-200'} ${pricingSection.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-bold text-slate-900">{tier.price}</span>
                  <span className="text-slate-500">{tier.period}</span>
                </div>
                {tier.yearlyPrice && (
                  <p className="text-sm text-emerald-600 mb-4">{tier.yearlyPrice}</p>
                )}
                <p className="text-sm text-slate-500 mb-6">{tier.description}</p>
                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-slate-600">
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a 
                  href="#waitlist"
                  className={`block w-full text-center py-3 px-4 rounded-lg font-medium transition-colors ${
                    tier.popular 
                      ? 'bg-emerald-500 text-white hover:bg-emerald-600' 
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Join Waitlist
                </a>
              </div>
            ))}
          </div>

          {/* Pricing FAQs */}
          <div className={`mt-12 max-w-2xl mx-auto ${pricingSection.isVisible ? 'animate-fade-in-up animation-delay-300' : 'opacity-0'}`}>
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h4 className="font-serif font-bold text-lg text-slate-900 mb-4">Quick Pricing Questions</h4>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-medium text-slate-900">When will InvoiceNudge launch?</p>
                  <p className="text-slate-600">We&apos;re targeting Q2 2026. Beta testers get early access in March 2026.</p>
                </div>
                <div>
                  <p className="font-medium text-slate-900">Will there be a free trial?</p>
                  <p className="text-slate-600">Yes! Your first 100 invoices are completely free — no credit card required.</p>
                </div>
                <div>
                  <p className="font-medium text-slate-900">Can I cancel anytime?</p>
                  <p className="text-slate-600">Absolutely. No contracts, no termination fees. Cancel in 10 seconds from your dashboard.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section 
        ref={founderSection.ref}
        className="py-16 lg:py-24 bg-white"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`bg-emerald-50 rounded-2xl p-8 lg:p-12 ${founderSection.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl font-bold text-white">A</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                Who&apos;s Building This?
              </h2>
              <div className="text-slate-700 space-y-4 max-w-xl">
                <p>
                  Hi, I&apos;m Alex. I&apos;m a freelance developer who lost <span className="font-semibold text-red-500">$8,000</span> to late payments in 2025.
                </p>
                <p>
                  After manually chasing 127 invoices that year, I decided there had to be a better way. I spent 2 hours drafting a single &ldquo;polite but firm&rdquo; reminder to a client who owed me $4,000. When they finally replied — &ldquo;Oh sorry, totally forgot! Paying now.&rdquo; — I realized the problem wasn&apos;t malice. Clients just... forget.
                </p>
                <p>
                  InvoiceNudge is my attempt to solve this for all of us. It&apos;s the automated follow-up system I wish I had when I was refreshing my inbox at 11pm hoping that $3,000 check had cleared.
                </p>
              </div>
              <a 
                href="https://twitter.com/alexbuilds" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 text-emerald-600 hover:text-emerald-700 font-medium"
              >
                <Twitter className="w-5 h-5" />
                Follow along @alexbuilds
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section 
        id="faq"
        ref={faqSection.ref}
        className="py-16 lg:py-24 bg-slate-50"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 ${faqSection.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-slate-600">
              Everything you need to know about InvoiceNudge
            </p>
          </div>

          <div className={`space-y-4 ${faqSection.isVisible ? 'animate-fade-in-up animation-delay-200' : 'opacity-0'}`}>
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-medium text-slate-900 pr-4">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section 
        id="waitlist"
        ref={ctaSection.ref}
        className="py-16 lg:py-24 bg-emerald-600"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`${ctaSection.isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
              Join 500 Freelancers Getting Paid Faster
            </h2>
            <p className="text-lg text-emerald-100 mb-8 max-w-xl mx-auto">
              Be one of the first to get access when we launch. Early waitlist members get lifetime launch pricing — 20% off forever.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300 text-slate-900 placeholder:text-slate-400"
                required
              />
              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50 whitespace-nowrap"
              >
                {isSubmitted ? (
                  <>
                    <Check className="w-5 h-5" />
                    You&apos;re In!
                  </>
                ) : isSubmitting ? (
                  "Joining..."
                ) : (
                  <>
                    Join Waitlist
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            <p className="text-sm text-emerald-200">
              First 100 invoices free • No credit card required • Launching Q2 2026
            </p>

            <div className="flex items-center justify-center gap-6 mt-8 text-emerald-200">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span className="text-sm">256-bit SSL</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span className="text-sm">GDPR Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <Send className="w-4 h-4 text-white" />
                </div>
                <span className="font-serif font-bold text-xl text-white">InvoiceNudge</span>
              </div>
              <p className="text-slate-400 text-sm">
                AI-powered payment reminders that sound like you wrote them. Made for freelancers who deserve to get paid on time.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#waitlist" className="hover:text-white transition-colors">Join Waitlist</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-white mb-4">Connect</h4>
              <div className="flex gap-4">
                <a href="https://twitter.com/alexbuilds" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
            © 2026 InvoiceNudge. Made for freelancers who deserve to get paid on time.
          </div>
        </div>
      </footer>
    </div>
  );
}