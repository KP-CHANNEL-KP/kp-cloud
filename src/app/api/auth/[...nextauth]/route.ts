import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

const authOptions = {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
};

const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;