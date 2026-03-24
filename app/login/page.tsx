"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Mail, Lock, Rocket } from "lucide-react";

// ✅ Cloudflare Pages Build အချိန်မှာ Static ထုတ်တာကို လုံးဝပိတ်မယ်
export const dynamic = "force-dynamic";

export default function LoginPage() {
  const router = useRouter();
  
  // ⚠️ useSession ကို direct destructure မလုပ်ဘဲ safe ဖြစ်အောင် ခေါ်ပါမယ်
  const sessionData = useSession();
  const status = sessionData?.status;
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email: email.trim(),
        password: password,
        redirect: false,
      });

      if (result?.error) {
        setError("အီးမေးလ် သို့မဟုတ် စကားဝှက် မှားယွင်းနေပါသည်");
        setLoading(false);
      } else if (result?.ok) {
        window.location.href = "/dashboard";
      }
    } catch (err) {
      setError("Server ချိတ်ဆက်မှု အခက်အခဲရှိနေပါသည်။");
      setLoading(false);
    }
  };

  // ✅ status undefined ဖြစ်နေရင် (Build အချိန်) loading ပဲ ပြထားမယ်
  if (!status || status === "loading" || status === "authenticated") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#070b1a] gap-4 text-white">
        <Loader2 className="animate-spin text-indigo-500 w-12 h-12" />
        <p className="text-slate-400 font-medium animate-pulse">Initializing KP Cloud...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-[#020617] text-white">
      <div className="absolute w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full -top-48 -left-48" />
      <div className="absolute w-[500px] h-[500px] bg-indigo-600/10 blur-[100px] rounded-full -bottom-48 -right-48" />

      <div className="relative w-full max-w-md p-10 rounded-[2.5rem] bg-white/[0.02] backdrop-blur-3xl border border-white/10 shadow-2xl">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-500/20">
            <Rocket className="text-white w-8 h-8" />
          </div>
          <h1 className="text-4xl font-black tracking-tighter bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent uppercase">
            KP Cloud
          </h1>
          <p className="text-slate-500 mt-2 text-sm font-medium uppercase tracking-[0.2em]">Secure Access</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase ml-1 tracking-widest">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-indigo-500/50 focus:bg-white/[0.08] outline-none transition-all font-medium text-sm"
                placeholder="name@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase ml-1 tracking-widest">Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-indigo-500/50 focus:bg-white/[0.08] outline-none transition-all font-medium text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold">
              <div className="w-1 h-1 rounded-full bg-rose-500" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl font-black bg-white text-[#020617] hover:bg-indigo-50 transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl shadow-white/5 group"
          >
            {loading ? (
              <Loader2 className="animate-spin w-5 h-5" />
            ) : (
              <>
                SIGN IN
                <Rocket size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500 font-medium">
            New here?{" "}
            <Link href="/register" className="text-white hover:text-indigo-400 transition-colors font-bold underline underline-offset-4">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}