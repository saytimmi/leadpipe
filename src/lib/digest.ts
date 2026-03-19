import { sql } from "@/lib/db";

// Shenzhen UTC+8
const TZ_OFFSET_HOURS = 8;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Row = any;

/** Convert UTC created_at to Shenzhen date string YYYY-MM-DD */
function toLocalDate(utcTimestamp: string): string {
  const d = new Date(utcTimestamp);
  d.setTime(d.getTime() + TZ_OFFSET_HOURS * 3600_000);
  return d.toISOString().slice(0, 10);
}

/** Get "today midnight" in Shenzhen timezone as UTC ISO string */
function todayMidnightUTC(): string {
  const now = new Date();
  const local = new Date(now.getTime() + TZ_OFFSET_HOURS * 3600_000);
  local.setUTCHours(0, 0, 0, 0);
  return new Date(local.getTime() - TZ_OFFSET_HOURS * 3600_000).toISOString();
}

const bar = (n: number, max: number, len = 10) => {
  const filled = max > 0 ? Math.min(len, Math.max(0, Math.round((n / max) * len))) : 0;
  return "\u2593".repeat(filled) + "\u2591".repeat(len - filled);
};

// ─── Full digest ─────────────────────────────────────────────

export async function generateDigest(periodDays = 1): Promise<string> {
  const since = new Date(Date.now() - periodDays * 86400_000).toISOString();

  const [pageViews, sectionViews, formEvents] = await Promise.all([
    sql`SELECT session_id, referrer, utm_source FROM lp_page_views WHERE created_at >= ${since}`,
    sql`SELECT session_id, section, time_spent_ms FROM lp_section_views WHERE created_at >= ${since}`,
    sql`SELECT session_id, event, step_name FROM lp_form_events WHERE created_at >= ${since}`,
  ]);

  const uniqueSessions = new Set(pageViews.map((p: Row) => p.session_id)).size;

  // Section reach
  const sectionOrder = ["hero", "story", "problem", "visibility", "solution", "form"];
  const sectionLabels: Record<string, string> = {
    hero: "Hero", story: "История", problem: "Проблема",
    visibility: "Видимость", solution: "Решение", form: "Форма",
  };
  const sectionCounts = new Map<string, Set<string>>();
  for (const sv of sectionViews) {
    let s = sectionCounts.get(sv.section);
    if (!s) { s = new Set(); sectionCounts.set(sv.section, s); }
    s.add(sv.session_id);
  }

  // Form funnel
  const eventCounts = new Map<string, Set<string>>();
  for (const fe of formEvents) {
    let s = eventCounts.get(fe.event);
    if (!s) { s = new Set(); eventCounts.set(fe.event, s); }
    s.add(fe.session_id);
  }

  const opens = eventCounts.get("open")?.size || 0;
  const submits = eventCounts.get("submit")?.size || 0;
  const disqualified = eventCounts.get("disqualified")?.size || 0;
  const convRate = uniqueSessions > 0 ? Math.round((submits / uniqueSessions) * 100) : 0;
  const formRate = opens > 0 ? Math.round((submits / opens) * 100) : 0;

  // Top UTM
  const utmMap = new Map<string, number>();
  for (const pv of pageViews) {
    if (pv.utm_source) utmMap.set(pv.utm_source as string, (utmMap.get(pv.utm_source as string) || 0) + 1);
  }
  const topUtm = Array.from(utmMap.entries()).sort((a, b) => b[1] - a[1]).slice(0, 5);

  const periodLabel = periodDays === 1 ? "24 часа" : periodDays === 7 ? "7 дней" : periodDays === 30 ? "30 дней" : `${periodDays} дн.`;

  const lines = [
    `📊 LeadPipe — статистика за ${periodLabel}`,
    "",
    `👁 Визиты: ${pageViews.length}`,
    `👤 Уникальные: ${uniqueSessions}`,
    `📝 Открыли форму: ${opens}`,
    `✅ Отправили заявку: ${submits}`,
    `❌ Дисквалифицированы: ${disqualified}`,
    `📈 Конверсия сайта: ${convRate}%`,
    `📈 Конверсия формы: ${formRate}%`,
    "",
    "— Глубина скролла —",
    ...sectionOrder.map(name => {
      const count = sectionCounts.get(name)?.size || 0;
      const pct = uniqueSessions > 0 ? Math.round((count / uniqueSessions) * 100) : 0;
      return `${bar(count, uniqueSessions)} ${sectionLabels[name]}: ${count} (${pct}%)`;
    }),
    "",
    "— Воронка формы —",
    `Открыли:    ${opens}`,
    ...Array.from({ length: 8 }, (_, i) => {
      const count = eventCounts.get(`step_${i + 1}`)?.size || 0;
      return { line: `Шаг ${i + 1}:      ${count}`, count };
    }).filter(s => s.count > 0).map(s => s.line),
    `Отправили:  ${submits}`,
    `Дисквал.:   ${disqualified}`,
  ];

  if (topUtm.length > 0) {
    lines.push("", "— UTM источники —");
    for (const [source, count] of topUtm) {
      lines.push(`  ${source}: ${count}`);
    }
  }

  return lines.join("\n");
}

// ─── Leads per day ───────────────────────────────────────────

export async function generateLeadsReport(days = 7): Promise<string> {
  const since = new Date(Date.now() - days * 86400_000).toISOString();

  const events = await sql`SELECT session_id, event, created_at FROM lp_form_events WHERE created_at >= ${since}`;

  // Group by local date
  const byDate = new Map<string, { opens: Set<string>; submits: Set<string>; disq: Set<string> }>();

  // Pre-fill all dates
  for (let i = 0; i < days; i++) {
    const d = new Date(Date.now() - i * 86400_000 + TZ_OFFSET_HOURS * 3600_000);
    const key = d.toISOString().slice(0, 10);
    byDate.set(key, { opens: new Set(), submits: new Set(), disq: new Set() });
  }

  for (const row of events) {
    const key = toLocalDate(row.created_at);
    let entry = byDate.get(key);
    if (!entry) { entry = { opens: new Set(), submits: new Set(), disq: new Set() }; byDate.set(key, entry); }
    if (row.event === "open") entry.opens.add(row.session_id);
    if (row.event === "submit") entry.submits.add(row.session_id);
    if (row.event === "disqualified") entry.disq.add(row.session_id);
  }

  const sorted = Array.from(byDate.entries()).sort((a, b) => b[0].localeCompare(a[0]));
  const totalSubmits = sorted.reduce((sum, [, d]) => sum + d.submits.size, 0);
  const totalOpens = sorted.reduce((sum, [, d]) => sum + d.opens.size, 0);
  const maxSubmits = Math.max(...sorted.map(([, d]) => d.submits.size), 1);

  const dayNames = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

  const lines = [
    `📋 Лиды по дням (${days} дн.)`,
    "",
    `Всего заявок: ${totalSubmits}  |  Открытий формы: ${totalOpens}`,
    "",
  ];

  for (const [date, data] of sorted) {
    const dow = dayNames[new Date(date + "T12:00:00").getDay()];
    const dd = date.slice(8, 10) + "." + date.slice(5, 7);
    const s = data.submits.size;
    const o = data.opens.size;
    const d = data.disq.size;
    lines.push(`${dow} ${dd}  ${bar(s, maxSubmits, 8)}  ✅${s}  📝${o}  ❌${d}`);
  }

  lines.push("", "✅ заявки  📝 открытия  ❌ дисквал.");
  return lines.join("\n");
}

// ─── Today stats ─────────────────────────────────────────────

export async function generateTodayStats(): Promise<string> {
  const since = todayMidnightUTC();

  const [pageViews, formEvents] = await Promise.all([
    sql`SELECT session_id FROM lp_page_views WHERE created_at >= ${since}`,
    sql`SELECT session_id, event FROM lp_form_events WHERE created_at >= ${since}`,
  ]);

  const uniqueVisitors = new Set(pageViews.map((p: Row) => p.session_id)).size;

  const eventSets = new Map<string, Set<string>>();
  for (const fe of formEvents) {
    let s = eventSets.get(fe.event);
    if (!s) { s = new Set(); eventSets.set(fe.event, s); }
    s.add(fe.session_id);
  }

  const opens = eventSets.get("open")?.size || 0;
  const submits = eventSets.get("submit")?.size || 0;
  const disq = eventSets.get("disqualified")?.size || 0;

  const lines = [
    `⚡ LeadPipe — сегодня`,
    "",
    `👁 Визиты: ${pageViews.length}`,
    `👤 Уникальные: ${uniqueVisitors}`,
    `📝 Открыли форму: ${opens}`,
    `✅ Заявки: ${submits}`,
    `❌ Дисквал.: ${disq}`,
    "",
    uniqueVisitors > 0
      ? `📈 Конверсия: ${Math.round((submits / uniqueVisitors) * 100)}%`
      : "📈 Конверсия: —",
  ];

  return lines.join("\n");
}

// ─── Telegram helpers ────────────────────────────────────────

export async function sendTelegram(chatId: string | number, text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) throw new Error("Telegram not configured");

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
}

export async function sendDigestToTelegram(text: string) {
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!chatId) throw new Error("TELEGRAM_CHAT_ID not set");
  await sendTelegram(chatId, text);
}
