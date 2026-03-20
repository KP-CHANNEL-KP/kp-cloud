export const runtime = 'edge';

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: "No file" }, { status: 400 });
    }

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
      return NextResponse.json({ error: "ENV missing" }, { status: 500 });
    }

    const tgForm = new FormData();
    tgForm.append("chat_id", CHAT_ID);
    tgForm.append("document", file);

    const res = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`,
      {
        method: "POST",
        body: tgForm,
      }
    );

    const data = await res.json();
    console.log("Telegram:", data);

    if (!data.ok) {
      return NextResponse.json(
        { error: data.description },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}