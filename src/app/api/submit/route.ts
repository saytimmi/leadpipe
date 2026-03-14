import { NextRequest, NextResponse } from "next/server";
import { sendToTelegram } from "@/lib/telegram";

export async function POST(req: NextRequest) {
  const data = await req.json();
  await sendToTelegram(data);
  return NextResponse.json({ ok: true });
}
