import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

const STATS_KEY = process.env.STATS_SECRET || "leadpipe2024";

export async function GET(req: NextRequest) {
  const key = req.headers.get("x-stats-key");
  if (key !== STATS_KEY) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const period = req.nextUrl.searchParams.get("period") || "7d";
  const since = periodToDate(period);

  const [pageViews, sectionViews, formEvents] = await Promise.all([
    sql`SELECT session_id, referrer, utm_source, created_at FROM lp_page_views WHERE created_at >= ${since}`,
    sql`SELECT session_id, section, time_spent_ms, created_at FROM lp_section_views WHERE created_at >= ${since}`,
    sql`SELECT session_id, event, step_name, value, created_at FROM lp_form_events WHERE created_at >= ${since}`,
  ]);

  const uniqueSessions = new Set(pageViews.map(p => p.session_id)).size;

  // Section stats
  const sectionMap = new Map<string, { views: Set<string>; totalTime: number; count: number }>();
  for (const sv of sectionViews) {
    let entry = sectionMap.get(sv.section);
    if (!entry) { entry = { views: new Set(), totalTime: 0, count: 0 }; sectionMap.set(sv.section, entry); }
    entry.views.add(sv.session_id);
    if (sv.time_spent_ms) { entry.totalTime += sv.time_spent_ms; entry.count++; }
  }
  const sections = Array.from(sectionMap.entries()).map(([name, data]) => ({
    name,
    views: data.views.size,
    avgTime: data.count > 0 ? Math.round(data.totalTime / data.count) : 0,
  }));

  // Form funnel
  const funnelOrder = ["open", "step_1", "step_2", "step_3", "step_4", "step_5", "step_6", "step_7", "step_8", "submit", "disqualified"];
  const eventCounts = new Map<string, Set<string>>();
  for (const fe of formEvents) {
    let s = eventCounts.get(fe.event);
    if (!s) { s = new Set(); eventCounts.set(fe.event, s); }
    s.add(fe.session_id);
  }
  const formFunnel = funnelOrder
    .filter(e => eventCounts.has(e))
    .map(event => ({ event, count: eventCounts.get(event)!.size }));

  // Referrers
  const refMap = new Map<string, number>();
  for (const pv of pageViews) {
    let ref = "Прямой";
    if (pv.referrer) {
      try { ref = new URL(pv.referrer).hostname; } catch { ref = pv.referrer; }
    }
    refMap.set(ref, (refMap.get(ref) || 0) + 1);
  }
  const topReferrers = Array.from(refMap.entries())
    .map(([referrer, count]) => ({ referrer, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // UTM sources
  const utmMap = new Map<string, number>();
  for (const pv of pageViews) {
    if (pv.utm_source) utmMap.set(pv.utm_source, (utmMap.get(pv.utm_source) || 0) + 1);
  }
  const topUtm = Array.from(utmMap.entries())
    .map(([source, count]) => ({ source, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // Conversion rate
  const submits = eventCounts.get("submit")?.size || 0;
  const conversionRate = uniqueSessions > 0 ? `${Math.round((submits / uniqueSessions) * 100)}%` : "0%";

  return NextResponse.json({
    period,
    pageViews: pageViews.length,
    uniqueSessions,
    sections,
    formFunnel,
    topReferrers,
    topUtm,
    conversionRate,
  });
}

function periodToDate(period: string): string {
  if (period === "all") return "2020-01-01T00:00:00Z";
  const now = new Date();
  const days = period === "1d" ? 1 : period === "7d" ? 7 : 30;
  now.setDate(now.getDate() - days);
  return now.toISOString();
}
