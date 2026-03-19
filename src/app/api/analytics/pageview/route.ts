import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const country = req.headers.get("x-vercel-ip-country") || null;

  await sql`INSERT INTO lp_page_views (session_id, referrer, utm_source, utm_medium, utm_campaign, user_agent, country)
    VALUES (${body.session_id}, ${body.referrer}, ${body.utm_source}, ${body.utm_medium}, ${body.utm_campaign}, ${body.user_agent}, ${country})`;

  return NextResponse.json({ ok: true });
}
