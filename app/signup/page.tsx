"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Send, ArrowRight, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const router = useRouter();
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
        emailRedirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });

    if (error) {
      setStatus("error");
      setError(error.message);
    } else {
      setStatus("success");
    }
  }

  async function handleGoogleSignup() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });
    if (error) {
      setError(error.message);
    }
  }

  if (status === "success") {
    return (
      <main className="min-h-screen flex items-center justify-center px-6 py-12 bg-[var(--bg-secondary)]">
        <div className="w-full max-w-sm text-center">
          <div className="card">
            <div className="w-12 h-12 rounded-full mx-auto flex items-center justify-center mb-4" style={{ background: "hsl(var(--accent) / 0.1)" }}>
              <Mail size={24} style={{ color: "hsl(var(--accent))" }} />
            </div>
            <h1 className="text-xl font-medium">Check your email</h1>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              We sent a confirmation link to <strong>{email}</strong>. Click the link to complete your signup.
            </p>
            <Link href="/login" className="btn-secondary mt-6 inline-block px-4 py-2 rounded-lg text-sm font-medium">
              Back to login
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-12 bg-[var(--bg-secondary)]">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-lg font-medium">
            <Send size={20} style={{ color: "hsl(var(--accent))" }} />
            InvoiceNudge
          </Link>
          <h1 className="mt-6 text-2xl font-medium">Create your account</h1>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">Start automating payment reminders</p>
        </div>

        <div className="card">
          <button
            onClick={handleGoogleSignup}
            className="btn-secondary w-full py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2"
          >
            <Mail size={16} />
            Continue with Google
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--border)]" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-2 text-[var(--text-tertiary)]">or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium mb-1.5">Full name</label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Jane Doe"
                required
                className="input-field"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1.5">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="input-field"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1.5">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={8}
                className="input-field"
              />
              <p className="mt-1 text-xs text-[var(--text-tertiary)]">Minimum 8 characters</p>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={status === "loading"}
              className="btn-primary w-full py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2"
            >
              {status === "loading" ? "Creating account..." : "Create account"}
              <ArrowRight size={14} />
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[var(--text-secondary)]">
            Already have an account?{" "}
            <Link href="/login" className="font-medium hover:underline" style={{ color: "hsl(var(--accent))" }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}