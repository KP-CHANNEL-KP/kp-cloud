import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const runtime = "edge"; // ဒါကို မဖြစ်မနေ ပြန်ထည့်ပေးပါ

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  // Edge runtime မှာ error မတက်အောင် secret ကို သေချာထည့်ပေးရပါမယ်
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };