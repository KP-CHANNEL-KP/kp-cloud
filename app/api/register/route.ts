// app/api/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import  prisma  from "@/lib/prisma"; // မင်း prisma path ကို မှန်အောင်ချိန်ပါ
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "အီးမေးလ်နှင့် စကားဝှက် လိုအပ်ပါသည်" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json(
        { message: "ဤအီးမေးလ်ကို အသုံးပြုပြီးပါပြီ" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "အကောင့်ဖွင့်ခြင်း အောင်မြင်ပါပြီ" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "အမှားတစ်ခုဖြစ်ပွားခဲ့သည်" },
      { status: 500 }
    );
  }
}