"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react"; // useSession ထည့်လိုက်ပါ
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  const router = useRouter();
  const { status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // ✅ အကယ်၍ Login ဝင်ပြီးသားဆိုရင် Dashboard ကို အော်တိုပို့ပေးမယ်
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false, // UI မှာ error ပြချင်လို့ false ထားတာ မှန်ပါတယ်
      });

      if (result?.error) {
        setError("အီးမေးလ် သို့မဟုတ် စကားဝှက် မမှန်ကန်ပါ");
        setLoading(false);
        return;
      }

      if (result?.ok) {
        // ✅ router.push က တခါတလေ cache ကြောင့် မသွားရင် window.location သုံးတာ ပိုထိရောက်ပါတယ်
        window.location.href = "/dashboard";
      }
    } catch (err) {
      setError("တစ်ခုခု မမှန်ကန်ပါ။ ထပ်မံကြိုးစားပါ။");
      setLoading(false);
    }
  };

  // Loading ဖြစ်နေချိန်မှာ ခဏစောင့်ခိုင်းမယ်
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#070b1a]">
        <Loader2 className="animate-spin text-indigo-500 w-10 h-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-[#070b1a] text-white">
      {/* Glow background */}
      <div className="absolute w-[500px] h-[500px] bg-indigo-600/20 blur-3xl rounded-full top-[-120px] left-[-120px]" />
      <div className="absolute w-[400px] h-[400px] bg-purple-600/20 blur-3xl rounded-full bottom-[-120px] right-[-120px]" />

      <div className="relative w-full max-w-md p-8 rounded-2xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_0_60px_rgba(99,102,241,0.2)]">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">KP Cloud 🚀</h1>
          <p className="text-slate-400 mt-2 text-sm">သင့်အကောင့်သို့ ဝင်ရောက်ပါ</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm mb-1 text-slate-300">အီးမေးလ်</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-indigo-500 focus:bg-white/10 outline-none transition"
              placeholder="example@company.com"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-slate-300">စကားဝှက်</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-indigo-500 focus:bg-white/10 outline-none transition"
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