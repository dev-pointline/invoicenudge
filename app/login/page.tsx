"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Send, ArrowRight, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");
  const router = useRouter();
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setStatus("error");
      setError(error.message);
    } else {
      router.push("/dashboard");
    }
  }

  async function handleGoogleLogin() {
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

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-12 bg-[var(--bg-secondary)]">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-lg font-medium">
            <Send size={20} style={{ color: "hsl(var(--accent))" }} />
            InvoiceNudge
          </Link>
          <h1 className="mt-6 text-2xl font-medium">Welcome back</h1>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">Sign in to your account</p>
        </div>

        <div className="card">
          <button
            onClick={handleGoogleLogin}
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
                className="input-field"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={status === "loading"}
              className="btn-primary w-full py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2"
            >
              {status === "loading" ? "Signing in..." : "Sign in"}
              <ArrowRight size={14} />
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[var(--text-secondary)]">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-medium hover:underline" style={{ color: "hsl(var(--accent))" }}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}