import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const runtime = "edge";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  // ကျန်တဲ့ configurations တွေ ဒီမှာထည့်ပါ
});

export const { GET, POST } = handlers;