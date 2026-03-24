"use client";

import React, { useState } from "react";

export default function SignupPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirm: "",
  });

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
    alert("Account Created 🎉");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 text-white">
      <form
        onSubmit={handleSignup}
        className="bg-white/5 p-8 rounded-2xl w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Create Account</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded bg-white/5"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded bg-white/5"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-3 rounded bg-white/5"
          onChange={(e) => setForm({ ...form, confirm: e.target.value })}
        />

        <button className="w-full py-3 bg-indigo-600 rounded-lg">
          Sign Up
        </button>
      </form>
    </div>
  );
}