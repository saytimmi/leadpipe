import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const { session_id, event, step_name, value } = await req.json();
  await supabase.from("lp_form_events").insert({ session_id, event, step_name, value });
  return NextResponse.json({ ok: true });
}
