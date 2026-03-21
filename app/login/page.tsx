"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("အီးမေးလ် သို့မဟုတ် စကားဝှက် မမှန်ကန်ပါ");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("တစ်ခုခု မမှန်ကန်ပါ။ ထပ်မံကြိုးစားပါ။");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-[#070b1a] text-white">

      {/* Glow background */}
      <div className="absolute w-[500px] h-[500px] bg-indigo-600/20 blur-3xl rounded-full top-[-120px] left-[-120px]" />
      <div className="absolute w-[400px] h-[400px] bg-purple-600/20 blur-3xl rounded-full bottom-[-120px] right-[-120px]" />

      {/* Card */}
      <div className="relative w-full max-w-md p-8 rounded-2xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_0_60px_rgba(99,102,241,0.2)]">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">KP Cloud 🚀</h1>
          <p className="text-slate-400 mt-2 text-sm">
            သင့်အကောင့်သို့ ဝင်ရောက်ပါ
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-sm mb-1 text-slate-300">
              အီးမေးလ်
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-indigo-500 focus:bg-white/10 outline-none transition"
              placeholder="example@company.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm mb-1 text-slate-300">
              စကားဝှက်
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-indigo-500 focus:bg-white/10 outline-none transition"
              placeholder="••••••••"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="text-rose-400 text-sm text-center bg-rose-950/30 border border-rose-500/30 p-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-medium bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-[1.02] active:scale-100 transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" />
                ဝင်ရောက်နေသည်...
              </>
            ) : (
              "ဝင်ရောက်မည်"
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-slate-400">
          အကောင့်မရှိသေးဘူးလား?{" "}
          <Link href="/register" className="text-indigo-400 hover:underline">
            အကောင့်ဖွင့်ရန်
          </Link>
        </p>
      </div>
    </div>
  );
}