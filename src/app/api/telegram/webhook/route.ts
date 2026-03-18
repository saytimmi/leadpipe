import { NextRequest, NextResponse } from "next/server";
import { generateDigest, generateLeadsReport, generateTodayStats, sendTelegram } from "@/lib/digest";

const BOT_NAME = "@zayavkidlzLeadbot";

function matchCmd(text: string, cmd: string): boolean {
  return text === cmd || text === `${cmd}${BOT_NAME}`;
}

function matchCmdWithArgs(text: string, cmd: string): string | null {
  if (text.startsWith(`${cmd} `)) return text.slice(cmd.length + 1).trim();
  if (text.startsWith(`${cmd}${BOT_NAME} `)) return text.slice(cmd.length + BOT_NAME.length + 1).trim();
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message = body?.message;
    if (!message?.text) return NextResponse.json({ ok: true });

    const text = message.text.trim();
    const chatId = message.chat.id;

    let reply: string | null = null;

    // /today — quick today stats
    if (matchCmd(text, "/today")) {
      reply = await generateTodayStats();
    }

    // /stats or /stats N — full digest
    else if (matchCmd(text, "/stats")) {
      reply = await generateDigest(1);
    } else {
      const statsArg = matchCmdWithArgs(text, "/stats");
      if (statsArg) {
        const days = statsArg === "7" || statsArg === "7d" ? 7
          : statsArg === "30" || statsArg === "30d" ? 30 : 1;
        reply = await generateDigest(days);
      }
    }

    // /leads or /leads N — leads per day
    if (!reply) {
      if (matchCmd(text, "/leads")) {
        reply = await generateLeadsReport(7);
      } else {
        const leadsArg = matchCmdWithArgs(text, "/leads");
        if (leadsArg) {
          const days = parseInt(leadsArg) || 7;
          reply = await generateLeadsReport(Math.min(days, 90));
        }
      }
    }

    // /funnel — form funnel only
    if (!reply && matchCmd(text, "/funnel")) {
      reply = await generateDigest(7);
    }

    // /help — command list
    if (!reply && matchCmd(text, "/help")) {
      reply = [
        "📊 LeadPipe Bot — команды:",
        "",
        "/today — статистика за сегодня",
        "/stats — полный отчёт за 24ч",
        "/stats 7 — отчёт за 7 дней",
        "/stats 30 — отчёт за 30 дней",
        "/leads — заявки по дням (7 дн.)",
        "/leads 14 — заявки по дням (14 дн.)",
        "/funnel — воронка за 7 дней",
        "/help — эта справка",
      ].join("\n");
    }

    if (reply) {
      await sendTelegram(chatId, reply);
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Webhook error:", e);
    return NextResponse.json({ ok: true });
  }
}
