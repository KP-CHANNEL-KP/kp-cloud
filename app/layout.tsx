// app/layout.tsx  ← ဒီ file ကို အသစ်ဖန်တီးပါ
import type { Metadata } from "next";
//import "./globals.css";  // မင်း global CSS ရှိရင် import လုပ်

export const metadata: Metadata = {
  title: "KP Cloud - Business Storage",
  description: "Secure cloud storage powered by Telegram",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-slate-950 to-indigo-950 text-white antialiased">
        {children}
      </body>
    </html>
  );
}