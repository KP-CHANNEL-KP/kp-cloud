import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge'; // Cloudflare Edge မှာ အလုပ်လုပ်ဖို့ မရှိမဖြစ်ပါ

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ ok: false, description: "No file provided" }, { status: 400 });
    }

    // 🛠️ Cloudflare Environment Variables ကို ရယူခြင်း
    // TG_BOT_TOKEN နဲ့ TG_CHAT_ID ကို Cloudflare Dashboard မှာ ထည့်ထားဖို့ လိုပါမယ်
    const BOT_TOKEN = process.env.TG_BOT_TOKEN;
    const CHAT_ID = process.env.TG_CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
      return NextResponse.json({ 
        ok: false, 
        description: "Server Configuration Missing (Check Environment Variables)" 
      }, { status: 500 });
    }

    // Telegram Bot API သို့ ပို့ရန်ပြင်ဆင်ခြင်း
    const tgFormData = new FormData();
    tgFormData.append('chat_id', CHAT_ID);
    tgFormData.append('document', file);
    // Caption ထဲမှာ ဖိုင်တင်တဲ့အချိန် ဒါမှမဟုတ် အချက်အလက်လေးတွေ ထည့်ချင်ရင် ဒီမှာ ထည့်လို့ရပါတယ်
    tgFormData.append('caption', `Uploaded via KP Cloud: ${file.name}`);

    const tgResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`, {
      method: 'POST',
      body: tgFormData,
    });

    const result = await tgResponse.json();

    if (result.ok) {
      // ✅ အောင်မြင်ရင် လိုအပ်တဲ့ အချက်အလက်တွေကိုပဲ သန့်သန့်လေး ပြန်ပေးမယ်
      return NextResponse.json({
        ok: true,
        file_id: result.result.document.file_id,
        file_name: result.result.document.file_name,
        file_size: result.result.document.file_size,
        message_id: result.result.message_id
      });
    } else {
      // ❌ Telegram ဘက်က Error တက်ရင် (ဥပမာ Token မှားတာမျိုး)
      return NextResponse.json({ 
        ok: false, 
        description: result.description || "Telegram API Error" 
      }, { status: tgResponse.status });
    }

  } catch (error: any) {
    console.error("Upload Error:", error);
    return NextResponse.json({ 
      ok: false, 
      description: error.message || "Internal Server Error" 
    }, { status: 500 });
  }
}