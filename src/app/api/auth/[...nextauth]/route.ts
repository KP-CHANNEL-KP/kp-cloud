export const runtime = 'edge'; // Cloudflare Pages အတွက် ဒါက အရေးကြီးဆုံးပါ

import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";

const handler = NextAuth({
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login', // ဆရာကြီးဆောက်ထားတဲ့ Custom Login Page ရှိရင် ဒါကို သုံးပါ
  },
  callbacks: {
    async session({ session, token }) {
      return session;
    },
  },
});

export { handler as GET, handler as POST };