export const runtime = 'edge';

import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

// Configuration ကို variable တစ်ခုထဲ အကုန်စုထည့်လိုက်ပါ
const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  // အရေးကြီးတယ်: Edge ပေါ်မှာ run ရင် pages configuration တွေက error တက်တတ်လို့
  // လောလောဆယ် default အတိုင်းပဲ ထားလိုက်ပါမယ်
});

export { handler as GET, handler as POST };