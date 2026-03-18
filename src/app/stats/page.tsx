"use client";

import { useEffect, useState } from "react";

interface Stats {
  period: string;
  pageViews: number;
  uniqueSessions: number;
  sections: { name: string; views: number; avgTime: number }[];
  formFunnel: { event: string; count: number }[];
  topReferrers: { referrer: string; count: number }[];
  topUtm: { source: string; count: number }[];
  conversionRate: string;
}

const PASS_KEY = "lp_stats_auth";

export default function StatsPage() {
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState("");
  const [stats, setStats] = useState<Stats | null>(null);
  const [period, setPeriod] = useState("7d");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem(PASS_KEY);
    if (saved) { setAuthed(true); }
  }, []);

  useEffect(() => {
    if (authed) fetchStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authed, period]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    sessionStorage.setItem(PASS_KEY, pass);
    setAuthed(true);
  };

  const fetchStats = async () => {
    setLoading(true);
    const saved = sessionStorage.getItem(PASS_KEY) || pass;
    const res = await fetch(`/api/analytics/stats?period=${period}`, {
      headers: { "x-stats-key": saved },
    });
    if (res.status === 401) {
      sessionStorage.removeItem(PASS_KEY);
      setAuthed(false);
      setLoading(false);
      return;
    }
    const data = await res.json();
    setStats(data);
    setLoading(false);
  };

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] px-4">
        <form onSubmit={handleLogin} className="w-full max-w-xs">
          <h1 className="mb-6 text-center text-xl font-bold text-white">LeadPipe Stats</h1>
          <input
            type="password"
            value={pass}
            onChange={e => setPass(e.target.value)}
            placeholder="Пароль"
            autoFocus
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#CCFF00]"
          />
          <button className="mt-4 w-full rounded-lg bg-[#CCFF00] py-3 font-bold text-black">
            Войти
          </button>
        </form>
      </div>
    );
  }

  const SECTIONS_ORDER = ["hero", "story", "problem", "visibility", "solution", "form"];

  return (
    <div className="min-h-screen bg-[#0a0a0a] px-4 py-8 text-white">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            <span className="text-[#CCFF00]">LeadPipe</span> Analytics
          </h1>
          <div className="flex gap-2">
            {["1d", "7d", "30d", "all"].map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  period === p ? "bg-[#CCFF00] text-black" : "bg-white/5 text-white/60 hover:bg-white/10"
                }`}
              >
                {p === "1d" ? "24h" : p === "7d" ? "7 дней" : p === "30d" ? "30 дней" : "Всё"}
              </button>
            ))}
          </div>
        </div>

        {loading && !stats ? (
          <div className="py-20 text-center text-white/40">Загрузка...</div>
        ) : stats ? (
          <>
            {/* Key Metrics */}
            <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
              <MetricCard label="Визиты" value={stats.pageViews} />
              <MetricCard label="Уникальные" value={stats.uniqueSessions} />
              <MetricCard
                label="Открыли форму"
                value={stats.formFunnel.find(f => f.event === "open")?.count || 0}
              />
              <MetricCard label="Конверсия" value={stats.conversionRate} highlight />
            </div>

            {/* Section Funnel */}
            <div className="mb-8 rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
              <h2 className="mb-4 text-lg font-bold">Глубина скролла</h2>
              <div className="space-y-3">
                {SECTIONS_ORDER.map(name => {
                  const sec = stats.sections.find(s => s.name === name);
                  const views = sec?.views || 0;
                  const pct = stats.uniqueSessions > 0 ? (views / stats.uniqueSessions) * 100 : 0;
                  const avgSec = sec ? Math.round(sec.avgTime / 1000) : 0;
                  return (
                    <div key={name} className="flex items-center gap-3">
                      <div className="w-24 text-sm text-white/60">{sectionLabel(name)}</div>
                      <div className="flex-1">
                        <div className="h-6 overflow-hidden rounded-md bg-white/5">
                          <div
                            className="flex h-full items-center rounded-md bg-[#CCFF00]/20 px-2 text-xs font-medium text-[#CCFF00]"
                            style={{ width: `${Math.max(pct, 2)}%` }}
                          >
                            {views} ({Math.round(pct)}%)
                          </div>
                        </div>
                      </div>
                      <div className="w-16 text-right text-xs text-white/40">
                        {avgSec > 0 ? `${avgSec}с` : "—"}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Form Funnel */}
            <div className="mb-8 rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
              <h2 className="mb-4 text-lg font-bold">Воронка формы</h2>
              <div className="space-y-2">
                {stats.formFunnel.map((f, i) => {
                  const maxCount = stats.formFunnel[0]?.count || 1;
                  const pct = (f.count / maxCount) * 100;
                  return (
                    <div key={f.event} className="flex items-center gap-3">
                      <div className="w-28 text-sm text-white/60">{formEventLabel(f.event)}</div>
                      <div className="flex-1">
                        <div className="h-6 overflow-hidden rounded-md bg-white/5">
                          <div
                            className="flex h-full items-center rounded-md px-2 text-xs font-medium"
                            style={{
                              width: `${Math.max(pct, 2)}%`,
                              backgroundColor: f.event === "submit" ? "rgba(204,255,0,0.3)" :
                                f.event === "disqualified" ? "rgba(255,107,53,0.3)" : "rgba(255,255,255,0.08)",
                              color: f.event === "submit" ? "#CCFF00" :
                                f.event === "disqualified" ? "#FF6B35" : "rgba(255,255,255,0.6)",
                            }}
                          >
                            {f.count}
                          </div>
                        </div>
                      </div>
                      {i > 0 && stats.formFunnel[i - 1]?.count > 0 && (
                        <div className="w-14 text-right text-xs text-white/30">
                          {Math.round((f.count / stats.formFunnel[i - 1].count) * 100)}%
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Referrers & UTM */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
                <h2 className="mb-4 text-lg font-bold">Источники</h2>
                {stats.topReferrers.length === 0 ? (
                  <div className="text-sm text-white/30">Нет данных</div>
                ) : (
                  <div className="space-y-2">
                    {stats.topReferrers.map(r => (
                      <div key={r.referrer} className="flex justify-between text-sm">
                        <span className="text-white/60">{r.referrer || "Прямой"}</span>
                        <span className="text-white/40">{r.count}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
                <h2 className="mb-4 text-lg font-bold">UTM Source</h2>
                {stats.topUtm.length === 0 ? (
                  <div className="text-sm text-white/30">Нет данных</div>
                ) : (
                  <div className="space-y-2">
                    {stats.topUtm.map(u => (
                      <div key={u.source} className="flex justify-between text-sm">
                        <span className="text-white/60">{u.source}</span>
                        <span className="text-white/40">{u.count}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

function MetricCard({ label, value, highlight }: { label: string; value: string | number; highlight?: boolean }) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
      <div className="text-xs text-white/40">{label}</div>
      <div className={`mt-1 text-2xl font-bold ${highlight ? "text-[#CCFF00]" : "text-white"}`}>
        {value}
      </div>
    </div>
  );
}

function sectionLabel(name: string) {
  const map: Record<string, string> = {
    hero: "Hero",
    story: "История",
    problem: "Проблема",
    visibility: "Видимость",
    solution: "Решение",
    form: "Форма",
  };
  return map[name] || name;
}

function formEventLabel(event: string) {
  if (event === "open") return "Открыли";
  if (event === "submit") return "Отправили";
  if (event === "disqualified") return "Дисквал.";
  const m = event.match(/step_(\d+)/);
  if (m) return `Шаг ${m[1]}`;
  return event;
}
