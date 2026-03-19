import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function POST(req: NextRequest) {
  const { session_id, event, step_name, value } = await req.json();
  await sql`INSERT INTO lp_form_events (session_id, event, step_name, value)
    VALUES (${session_id}, ${event}, ${step_name}, ${value})`;
  return NextResponse.json({ ok: true });
}
