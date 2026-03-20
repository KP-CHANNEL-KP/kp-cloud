export const runtime = "edge";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "No file received" },
        { status: 400 }
      );
    }

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
      return NextResponse.json(
        { error: "ENV variables missing" },
        { status: 500 }
      );
    }

    // 🔥 IMPORTANT FIX (Edge safe)
    const blob = new Blob([await file.arrayBuffer()], {
      type: file.type,
    });

    const tgForm = new FormData();
    tgForm.append("chat_id", CHAT_ID);
    tgForm.append("document", blob, file.name);

    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`,
      {
        method: "POST",
        body: tgForm,
      }
    );

    const data = await response.json();
    console.log("Telegram response:", data);

    if (!data.ok) {
      return NextResponse.json(
        { error: data.description || "Telegram error" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Uploaded successfully",
      fileName: file.name,
    });

  } catch (error) {
    console.error("Upload error:", error);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}