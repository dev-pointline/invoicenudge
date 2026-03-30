import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Mail, Clock, DollarSign, Zap, ArrowRight, Check } from "lucide-react";

export default async function LandingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  const features = [
    {
      icon: Mail,
      title: "Forward & Forget",
      description:
        "Forward any invoice to your unique address. AI extracts client details automatically.",
    },
    {
      icon: Clock,
      title: "Smart Scheduling",
      description:
        "Reminders send on Day 0, 7, 14, and 21. Escalating politeness built-in.",
    },
    {
      icon: Zap,
      title: "Your Voice, Automated",
      description:
        "AI learns your communication style. Reminders sound like you, not a robot.",
    },
    {
      icon: DollarSign,
      title: "Get Paid Faster",
      description:
        "Stop losing sleep over unpaid invoices. Let automation do the chasing.",
    },
  ];

  const tiers = [
    {
      name: "Free",
      price: "$0",
      features: ["5 invoices/month", "Preview Mode", "Email support"],
      cta: "Get started",
      href: "/signup",
    },
    {
      name: "Starter",
      price: "$19",
      features: [
        "10 invoices/month",
        "Autopilot Mode",
        "Payment dashboard",
        "Priority support",
      ],
      cta: "Start free trial",
      href: "/signup",
      popular: true,
    },
    {
      name: "Pro",
      price: "$49",
      features: [
        "30 invoices/month",
        "Advanced analytics",
        "Custom timing",
        "Everything in Starter",
      ],
      cta: "Start free trial",
      href: "/signup",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mail className="h-6 w-6 text-primary-600" />
            <span className="font-semibold text-xl">InvoiceNudge</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Never chase late payments again
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Forward your invoices. We&apos;ll send polite, personalized reminders
            that sound like you — automatically.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700"
            >
              Start for free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/login"
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Log in
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How it works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="text-center">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Simple pricing
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Start free. Upgrade when you need more.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-2xl p-8 ${
                  tier.popular
                    ? "bg-primary-600 text-white"
                    : "bg-white border"
                }`}
              >
                {tier.popular && (
                  <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded-full">
                    Most popular
                  </span>
                )}
                <h3
                  className={`text-lg font-semibold mt-4 ${
                    tier.popular ? "text-white" : "text-gray-900"
                  }`}
                >
                  {tier.name}
                </h3>
                <p
                  className={`text-3xl font-bold my-4 ${
                    tier.popular ? "text-white" : "text-gray-900"
                  }`}
                >
                  {tier.price}
                  <span
                    className={`text-sm font-normal ${
                      tier.popular ? "text-white/70" : "text-gray-500"
                    }`}
                  >
                    /month
                  </span>
                </p>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check
                        className={`h-4 w-4 ${
                          tier.popular ? "text-white" : "text-green-500"
                        }`}
                      />
                      <span
                        className={`text-sm ${
                          tier.popular ? "text-white/90" : "text-gray-600"
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={tier.href}
                  className={`block text-center py-2.5 rounded-lg font-medium ${
                    tier.popular
                      ? "bg-white text-primary-600 hover:bg-gray-100"
                      : "bg-primary-600 text-white hover:bg-primary-700"
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} InvoiceNudge. All rights reserved.
        </div>
      </footer>
    </div>
  );
}