export const runtime = 'edge'; // Cloudflare Pages အတွက် ဒါက မဖြစ်မနေ ပါရပါမယ်

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: "ဖိုင်ရှာမတွေ့ပါဘူး ဆရာကြီး" },
        { status: 400 }
      );
    }

    // ဒီနေရာမှာ Cloudflare R2 ဒါမှမဟုတ် တခြား Storage ဆီ ပို့မယ့် logic ထည့်ရပါမယ်
    // ဥပမာ - အစမ်းအနေနဲ့ ဖိုင်အကြောင်းအရာကိုပဲ ပြန်ပြပေးလိုက်ပါမယ်
    console.log(`Uploading: ${file.name}, Size: ${file.size}`);

    return NextResponse.json({ 
      success: true, 
      message: "File upload လုပ်လို့ ရပါပြီ",
      fileName: file.name 
    });

  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Upload လုပ်ရတာ အဆင်မပြေပါဘူး" },
      { status: 500 }
    );
  }
}