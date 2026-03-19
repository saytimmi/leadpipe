import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function POST(req: NextRequest) {
  const { session_id, section } = await req.json();
  await sql`INSERT INTO lp_section_views (session_id, section) VALUES (${session_id}, ${section})`;
  return NextResponse.json({ ok: true });
}
