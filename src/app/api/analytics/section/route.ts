import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const { session_id, section } = await req.json();
  await supabase.from("lp_section_views").insert({ session_id, section });
  return NextResponse.json({ ok: true });
}
