export const runtime = 'edge';

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: "File not found" },
        { status: 400 }
      );
    }

    const BOT_TOKEN = process.env.TG_BOT_TOKEN!;
    const CHAT_ID = process.env.TG_CHAT_ID!;

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

    if (!data.ok) {
      return NextResponse.json(
        { error: "Telegram upload failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Uploaded to Telegram",
      fileName: file.name,
      telegramMessageId: data.result.message_id,
    });

  } catch (error) {
    console.error("Upload error:", error);

    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}