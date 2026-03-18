import { supabase } from "@/lib/supabase";

export async function generateDigest(periodDays = 1): Promise<string> {
  const now = new Date();
  const since = new Date(now);
  since.setDate(since.getDate() - periodDays);

  const [pvRes, svRes, feRes] = await Promise.all([
    supabase.from("lp_page_views").select("session_id, referrer, utm_source").gte("created_at", since.toISOString()),
    supabase.from("lp_section_views").select("session_id, section, time_spent_ms").gte("created_at", since.toISOString()),
    supabase.from("lp_form_events").select("session_id, event, step_name").gte("created_at", since.toISOString()),
  ]);

  const pageViews = pvRes.data || [];
  const sectionViews = svRes.data || [];
  const formEvents = feRes.data || [];

  const uniqueSessions = new Set(pageViews.map(p => p.session_id)).size;

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
    if (pv.utm_source) utmMap.set(pv.utm_source, (utmMap.get(pv.utm_source) || 0) + 1);
  }
  const topUtm = Array.from(utmMap.entries()).sort((a, b) => b[1] - a[1]).slice(0, 5);

  const periodLabel = periodDays === 1 ? "24 часа" : periodDays === 7 ? "7 дней" : periodDays === 30 ? "30 дней" : `${periodDays} дн.`;
  const bar = (n: number, max: number) => {
    const filled = max > 0 ? Math.min(10, Math.max(0, Math.round((n / max) * 10))) : 0;
    return "\u2593".repeat(filled) + "\u2591".repeat(10 - filled);
  };

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
      const stepKey = `step_${i + 1}`;
      const count = eventCounts.get(stepKey)?.size || 0;
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

/** Leads per day for the last N days */
export async function generateLeadsReport(days = 7): Promise<string> {
  const now = new Date();
  const since = new Date(now);
  since.setDate(since.getDate() - days);

  const { data: events } = await supabase
    .from("lp_form_events")
    .select("session_id, event, created_at")
    .in("event", ["submit", "open", "disqualified"])
    .gte("created_at", since.toISOString())
    .order("created_at", { ascending: true });

  const rows = events || [];

  // Group by date
  const byDate = new Map<string, { opens: Set<string>; submits: Set<string>; disq: Set<string> }>();

  for (let i = 0; i < days; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    byDate.set(key, { opens: new Set(), submits: new Set(), disq: new Set() });
  }

  for (const row of rows) {
    const key = row.created_at.slice(0, 10);
    let entry = byDate.get(key);
    if (!entry) { entry = { opens: new Set(), submits: new Set(), disq: new Set() }; byDate.set(key, entry); }
    if (row.event === "open") entry.opens.add(row.session_id);
    if (row.event === "submit") entry.submits.add(row.session_id);
    if (row.event === "disqualified") entry.disq.add(row.session_id);
  }

  const sorted = Array.from(byDate.entries()).sort((a, b) => b[0].localeCompare(a[0]));

  const totalSubmits = sorted.reduce((sum, [, d]) => sum + d.submits.size, 0);
  const totalOpens = sorted.reduce((sum, [, d]) => sum + d.opens.size, 0);

  const dayNames = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
  const bar = (n: number, max: number) => {
    const filled = max > 0 ? Math.min(8, Math.max(0, Math.round((n / max) * 8))) : 0;
    return "\u2593".repeat(filled) + "\u2591".repeat(8 - filled);
  };
  const maxSubmits = Math.max(...sorted.map(([, d]) => d.submits.size), 1);

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
    lines.push(`${dow} ${dd}  ${bar(s, maxSubmits)}  ✅${s}  📝${o}  ❌${d}`);
  }

  lines.push("", "✅ заявки  📝 открытия  ❌ дисквал.");

  return lines.join("\n");
}

/** Today's live stats */
export async function generateTodayStats(): Promise<string> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const since = today.toISOString();

  const [pvRes, feRes] = await Promise.all([
    supabase.from("lp_page_views").select("session_id").gte("created_at", since),
    supabase.from("lp_form_events").select("session_id, event").gte("created_at", since),
  ]);

  const pageViews = pvRes.data || [];
  const formEvents = feRes.data || [];

  const uniqueVisitors = new Set(pageViews.map(p => p.session_id)).size;

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
