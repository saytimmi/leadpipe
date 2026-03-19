import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function POST(req: NextRequest) {
  const { session_id, section, time_spent_ms } = await req.json();

  const rows = await sql`SELECT id FROM lp_section_views
    WHERE session_id = ${session_id} AND section = ${section}
    ORDER BY created_at DESC LIMIT 1`;

  if (rows.length > 0) {
    await sql`UPDATE lp_section_views SET time_spent_ms = ${time_spent_ms} WHERE id = ${rows[0].id}`;
  }

  return NextResponse.json({ ok: true });
}
