import GitHubProvider from "next-auth/providers/github";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  // Cloudflare အတွက် session ကို jwt သုံးဖို့ အသေအချာ သတ်မှတ်ပေးရပါတယ်
  session: {
    strategy: "jwt",
  },
};