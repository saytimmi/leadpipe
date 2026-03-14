"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FormData {
  name: string; business: string; hasTraffic: string;
  leadsPerDay: string; whoAnswers: string; messenger: string; contact: string;
}

const steps = [
  { key: "name" as const, q: "Как тебя зовут?", type: "text" as const, ph: "Имя" },
  { key: "business" as const, q: "Чем занимаешься?", type: "text" as const, ph: "Стоматология, автосервис..." },
  { key: "hasTraffic" as const, q: "Закупаешь трафик?", type: "select" as const, opts: ["Да, активно", "Нет пока", "Планирую"] },
  { key: "leadsPerDay" as const, q: "Сколько заявок в день?", type: "select" as const, opts: ["1–5", "5–20", "20+"] },
  { key: "whoAnswers" as const, q: "Кто отвечает клиентам?", type: "select" as const, opts: ["Сам", "Менеджер", "Никто толком"] },
  { key: "messenger" as const, q: "Куда написать?", type: "select" as const, opts: ["Telegram", "WhatsApp"] },
  { key: "contact" as const, q: "Номер или @username", type: "text" as const, ph: "+7... или @username" },
];

export default function FormSection() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>({ name:"",business:"",hasTraffic:"",leadsPerDay:"",whoAnswers:"",messenger:"",contact:"" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const cur = steps[step];
  const val = data[cur.key];
  const canNext = val.trim() !== "";

  const next = async () => {
    if (step < steps.length - 1) { setStep(s => s + 1); return; }
    setLoading(true);
    try { await fetch("/api/submit", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(data) }); } catch {}
    setLoading(false); setSubmitted(true);
  };

  if (submitted) return (
    <section id="form" className="flex min-h-screen items-center justify-center px-6">
      <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} className="text-center">
        <motion.div initial={{ scale:0 }} animate={{ scale:1 }} transition={{ type:"spring", delay:0.2 }}
          className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-accent to-purple glow">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <motion.path d="M8 20L16 28L32 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength:0 }} animate={{ pathLength:1 }} transition={{ duration:0.6, delay:0.4 }} />
          </svg>
        </motion.div>
        <h2 className="font-display text-5xl font-800 text-white">Готово!</h2>
        <p className="mt-4 font-display text-lg text-white/40">Напишем в течение часа с конкретным планом</p>
        <p className="mt-2 font-display text-sm text-white/20">Обычно — за 15 минут</p>
      </motion.div>
    </section>
  );

  return (
    <section id="form" className="relative flex min-h-screen items-center justify-center px-6 py-32">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[500px] rounded-full bg-accent/5 blur-[150px]" />
      </div>
      <div className="relative w-full max-w-lg">
        <div className="mb-10 text-center">
          <span className="font-display text-xs font-600 uppercase tracking-[0.3em] text-accent">05 — Старт</span>
          <h2 className="mt-4 font-display text-4xl font-800 text-white md:text-5xl">Узнай сколько<br /><span className="gradient-text-static">ты теряешь</span></h2>
          <p className="mt-3 font-display text-sm text-white/30">7 вопросов · 1 минута · Бесплатно</p>
        </div>

        <div className="mb-8 h-1 w-full overflow-hidden rounded-full bg-white/5">
          <motion.div className="h-full rounded-full bg-gradient-to-r from-accent to-purple"
            style={{ boxShadow:"0 0 10px rgba(0,71,255,0.4)" }}
            animate={{ width: `${((step+1)/steps.length)*100}%` }}
            transition={{ duration: 0.4 }} />
        </div>

        <div className="gradient-border rounded-2xl">
          <div className="rounded-2xl bg-[#0d0d14]/90 p-8 backdrop-blur-xl md:p-10">
            <AnimatePresence mode="wait">
              <motion.div key={step}
                initial={{ opacity:0, x:40, filter:"blur(4px)" }}
                animate={{ opacity:1, x:0, filter:"blur(0px)" }}
                exit={{ opacity:0, x:-40, filter:"blur(4px)" }}
                transition={{ duration:0.25 }}>
                <div className="mb-2 font-display text-xs text-white/20">{step+1} / {steps.length}</div>
                <p className="mb-8 font-display text-2xl font-700 text-white">{cur.q}</p>
                {cur.type === "text" ? (
                  <input type="text" value={val}
                    onChange={e => setData({...data, [cur.key]: e.target.value})}
                    onKeyDown={e => e.key==="Enter" && canNext && next()}
                    placeholder={cur.ph} autoFocus
                    className="w-full border-b-2 border-white/10 bg-transparent pb-3 font-display text-xl text-white outline-none placeholder:text-white/15 focus:border-accent transition-colors" />
                ) : (
                  <div className="flex flex-col gap-2">
                    {cur.opts?.map(opt => (
                      <motion.button key={opt} whileHover={{ x:4 }} whileTap={{ scale:0.98 }}
                        onClick={() => { setData({...data,[cur.key]:opt}); setTimeout(()=>{ if(step<steps.length-1) setStep(s=>s+1); }, 200); }}
                        className={`cursor-pointer rounded-xl border px-5 py-3.5 text-left font-display text-base font-500 transition-all ${
                          val===opt ? "border-accent/40 bg-accent/10 text-white" : "border-white/5 text-white/50 hover:border-white/15 hover:text-white/70"
                        }`}>{opt}</motion.button>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {cur.type === "text" && (
              <motion.button onClick={next} disabled={!canNext||loading} whileTap={{ scale:0.98 }}
                className="mt-8 w-full cursor-pointer rounded-xl bg-gradient-to-r from-accent to-purple py-4 font-display text-base font-600 text-white disabled:opacity-30 hover:shadow-[0_0_30px_rgba(0,71,255,0.25)] transition-all">
                {loading ? "Отправляем..." : step===steps.length-1 ? "Отправить →" : "Дальше →"}
              </motion.button>
            )}
            {step > 0 && (
              <button onClick={() => setStep(s=>s-1)} className="mt-4 w-full text-center font-display text-sm text-white/15 hover:text-white/30 transition-colors">← Назад</button>
            )}
          </div>
        </div>
        <div className="mt-8 flex justify-center gap-6 font-display text-xs text-white/15">
          <span>Бесплатно</span><span>·</span><span>Без обязательств</span><span>·</span><span>Ответ за 15 мин</span>
        </div>
      </div>
    </section>
  );
}
