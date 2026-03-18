import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const { session_id, section, time_spent_ms } = await req.json();
  // Update the existing section view record with time spent
  const { data } = await supabase
    .from("lp_section_views")
    .select("id")
    .eq("session_id", session_id)
    .eq("section", section)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (data) {
    await supabase.from("lp_section_views").update({ time_spent_ms }).eq("id", data.id);
  }

  return NextResponse.json({ ok: true });
}
