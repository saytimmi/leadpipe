import { NextRequest, NextResponse } from "next/server";
import { generateDigest } from "@/lib/digest";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const message = body?.message;
  if (!message?.text) return NextResponse.json({ ok: true });

  const text = message.text.trim();
  const chatId = message.chat.id;
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return NextResponse.json({ ok: true });

  // Parse commands
  let reply: string | null = null;

  if (text === "/stats" || text === "/stats@zayavkidlzLeadbot") {
    reply = await generateDigest(1);
  } else if (text.startsWith("/stats ") || text.startsWith("/stats@zayavkidlzLeadbot ")) {
    const arg = text.split(" ").pop()?.trim();
    const days = arg === "7" || arg === "7d" ? 7 : arg === "30" || arg === "30d" ? 30 : 1;
    reply = await generateDigest(days);
  }

  if (reply) {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: reply }),
    });
  }

  return NextResponse.json({ ok: true });
}
