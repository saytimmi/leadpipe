import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const country = req.headers.get("x-vercel-ip-country") || undefined;

  await supabase.from("lp_page_views").insert({
    session_id: body.session_id,
    referrer: body.referrer,
    utm_source: body.utm_source,
    utm_medium: body.utm_medium,
    utm_campaign: body.utm_campaign,
    user_agent: body.user_agent,
    country,
  });

  return NextResponse.json({ ok: true });
}
