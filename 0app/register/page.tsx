"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("စကားဝှက်နှစ်ခု မတူညီပါ");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "အကောင့်ဖွင့်မရပါ");
        return;
      }

      router.push("/login?registered=true");
    } catch {
      setError("တစ်ခုခု မမှန်ကန်ပါ။ ထပ်မံကြိုးစားပါ။");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-[#070b1a] text-white">

      {/* Background glow */}
      <div className="absolute w-[500px] h-[500px] bg-purple-600/20 blur-3xl rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-indigo-600/20 blur-3xl rounded-full bottom-[-100px] right-[-100px]" />

      {/* Card */}
      <div className="relative w-full max-w-md p-8 rounded-2xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_0_50px_rgba(99,102,241,0.2)]">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">KP Cloud 🚀</h1>
          <p className="text-slate-400 mt-2 text-sm">
            Secure business storage platform
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Input component style */}
          {[{
            id: "name",
            label: "အမည်",
            value: name,
            set: setName,
            type: "text",
            placeholder: "Aung Paing Soe"
          },{
            id: "email",
            label: "အီးမေးလ်",
            value: email,
            set: setEmail,
            type: "email",
            placeholder: "example@company.com"
          },{
            id: "password",
            label: "စကားဝှက်",
            value: password,
            set: setPassword,
            type: "password",
            placeholder: "အနည်းဆုံး ၈ လုံး"
          },{
            id: "confirm",
            label: "စကားဝှက် အတည်ပြုရန်",
            value: confirmPassword,
            set: setConfirmPassword,
            type: "password",
            placeholder: "ထပ်မံရိုက်ထည့်ပါ"
          }].map((field) => (
            <div key={field.id}>
              <label className="block text-sm mb-1 text-slate-300">
                {field.label}
              </label>
              <input
                type={field.type}
                value={field.value}
                onChange={(e) => field.set(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-indigo-500 focus:bg-white/10 outline-none transition"
                placeholder={field.placeholder}
              />
            </div>
          ))}

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
                Loading...
              </>
            ) : (
              "အကောင့်ဖွင့်မည်"
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-slate-400">
          အကောင့်ရှိပြီးသားလား?{" "}
          <Link href="/login" className="text-indigo-400 hover:underline">
            ဝင်ရောက်ရန်
          </Link>
        </p>
      </div>
    </div>
  );
}