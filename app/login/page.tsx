"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Monitor, Lock, Mail, Loader2, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@example.com"); // Pre-filled for demo
  const [password, setPassword] = useState("password123");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
      setIsLoading(false);
    } else {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#050510]">
      {/* Background ambient light effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand/10 rounded-full blur-[128px] pointer-events-none" />

      <div className="w-full max-w-md z-10 p-6 animate-in">
        <div className="glass-card rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          {/* Top accent line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-brand to-primary" />
          
          <div className="mb-8 text-center flex flex-col items-center">
            <div className="bg-primary/10 p-3 rounded-2xl mb-4 text-primary w-fit ring-1 ring-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.2)]">
              <Monitor size={32} strokeWidth={1.5} />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
              ServiceDesk <span className="text-primary font-normal">Pro</span>
            </h1>
            <p className="text-muted-foreground text-sm">
              Sign in to enterprise IT management
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-destructive/10 text-destructive-foreground text-sm p-3 rounded-lg border border-destructive/20 text-center animate-in">
                {error}
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors duration-200" size={18} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-background/50 border border-border rounded-xl py-3 pl-10 pr-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                    placeholder="Email address"
                  />
                </div>
              </div>
              <div>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors duration-200" size={18} />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-background/50 border border-border rounded-xl py-3 pl-10 pr-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                    placeholder="Password"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full relative overflow-hidden group bg-primary hover:bg-primary/90 text-white font-medium rounded-xl py-3 px-4 shadow-[0_0_20px_rgba(0,0,0,0.1)] transition-all duration-200 active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  <span className="relative z-10">Sign In</span>
                  <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform duration-200" />
                </>
              )}
            </button>
            
            <div className="text-center mt-6 p-4 bg-muted/20 rounded-xl border border-border/50 text-xs text-muted-foreground">
              <p className="mb-1 font-medium text-foreground">Demo Accounts:</p>
              <p>Admin: admin@example.com</p>
              <p>Agent: agent@example.com</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
