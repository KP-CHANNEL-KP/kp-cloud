import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth"; // auth configuration ကို lib ထဲမှာ ခွဲထားတာ ပိုကောင်းပါတယ်

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// Cloudflare Pages (Edge) မှာ run ဖို့ runtime ကို သတ်မှတ်ပေးရပါမယ်
//export const runtime = "edge";