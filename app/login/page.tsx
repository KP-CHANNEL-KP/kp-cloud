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

      // အောင်မြင်ရင် dashboard ကို ပို့
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError("တစ်ခုခု မမှန်ကန်ပါ။ ထပ်မံကြိုးစားပါ။");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950/80 to-purple-950/70 px-4">
      <div className="w-full max-w-md p-8 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">KP Cloud</h1>
          <p className="text-slate-400 mt-2">သင့်အကောင့်သို့ ဝင်ရောက်ပါ</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
              အီးမေးလ်
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/60 focus:bg-white/10 transition"
              placeholder="example@company.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
              စကားဝှက်
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/60 focus:bg-white/10 transition"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="text-rose-400 text-sm text-center bg-rose-950/30 border border-rose-500/30 p-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                ဝင်ရောက်နေသည်...
              </>
            ) : (
              "ဝင်ရောက်မည်"
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-400">
          အကောင့်မရှိသေးဘူးလား?{" "}
          <Link href="/register" className="text-indigo-400 hover:text-indigo-300 font-medium">
            အကောင့်ဖွင့်ရန်
          </Link>
        </div>
      </div>
    </div>
  );
}