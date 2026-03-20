import { NextRequest, NextResponse } from 'next/server';
export const runtime = 'edge';
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ ok: false, description: "No file provided" }, { status: 400 });
    }

    // လုံခြုံရေးအတွက် Environment Variables မှ Token များယူခြင်း
    const BOT_TOKEN = process.env.TG_BOT_TOKEN;
    const CHAT_ID = process.env.TG_CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
      return NextResponse.json({ ok: false, description: "Server Configuration Missing" }, { status: 500 });
    }

    // Telegram Bot API သို့ ပို့ရန်ပြင်ဆင်ခြင်း
    const tgFormData = new FormData();
    tgFormData.append('document', file);
    tgFormData.append('chat_id', CHAT_ID);

    const tgResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`, {
      method: 'POST',
      body: tgFormData,
    });

    const result = await tgResponse.json();
    return NextResponse.json(result);

  } catch (error: any) {
    return NextResponse.json({ ok: false, description: error.message }, { status: 500 });
  }
}