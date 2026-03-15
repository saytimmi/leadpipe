"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FormData {
  name: string; business: string; hasTraffic: string;
  leadsPerDay: string; whoAnswers: string; messenger: string; contact: string;
}

const steps: { key: keyof FormData; q: string; type: "text" | "select"; ph?: string; opts?: string[] }[] = [
  { key: "name", q: "Как тебя зовут?", type: "text", ph: "Имя" },
  { key: "business", q: "Какой у тебя бизнес?", type: "text", ph: "Стоматология, автосервис, онлайн-школа..." },
  { key: "hasTraffic", q: "Закупаешь трафик?", type: "select", opts: ["Да", "Нет", "Планирую"] },
  { key: "leadsPerDay", q: "Сколько заявок в день?", type: "select", opts: ["1–5", "5–20", "20+"] },
  { key: "whoAnswers", q: "Кто отвечает на заявки?", type: "select", opts: ["Сам", "Менеджер", "Отдел продаж", "Никто толком"] },
  { key: "messenger", q: "Куда написать?", type: "select", opts: ["Telegram", "WhatsApp"] },
  { key: "contact", q: "Номер или @username", type: "text", ph: "+7... или @username" },
];

export default function FormSection() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>({ name: "", business: "", hasTraffic: "", leadsPerDay: "", whoAnswers: "", messenger: "", contact: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const cur = steps[step];
  const val = data[cur.key];
  const canNext = val.trim() !== "";

  const next = async () => {
    if (step < steps.length - 1) { setStep(s => s + 1); return; }
    setLoading(true);
    try { await fetch("/api/submit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }); } catch {}
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) return (
    <section id="form" className="flex min-h-screen items-center justify-center px-6">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }}
          className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-lime">
          <span className="text-3xl text-bg">✓</span>
        </motion.div>
        <h2 className="font-display text-4xl font-800 md:text-6xl">Готово!</h2>
        <p className="mt-4 font-body text-lg text-text-muted">Посмотрим твою ситуацию и расскажем, что можно сделать.</p>
      </motion.div>
    </section>
  );

  return (
    <section id="form" className="flex min-h-screen items-center justify-center px-6 py-32">
      <div className="w-full max-w-lg">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-12">
          <span className="font-display text-xs font-500 uppercase tracking-[0.3em] text-lime">05</span>
          <h2 className="mt-4 font-display text-3xl font-800 tracking-tight md:text-5xl">
            Давай <span className="text-text-muted">разберёмся</span>
          </h2>
          <p className="mt-3 font-body text-base text-text-muted">Ответь на пару вопросов — это займёт минуту</p>
        </motion.div>

        <div className="mb-3 flex justify-between font-display text-xs text-text-dim">
          <span>{step + 1} / {steps.length}</span>
          <span>{Math.round(((step + 1) / steps.length) * 100)}%</span>
        </div>
        <div className="mb-10 h-px w-full bg-white/[0.04]">
          <motion.div className="h-full bg-lime" animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.4, ease: [0.65, 0.05, 0, 1] }} />
        </div>

        <div className="rounded-2xl border border-white/[0.04] bg-surface p-8 md:p-10">
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.25, ease: [0.65, 0.05, 0, 1] }}>
              <p className="mb-8 font-display text-xl font-700">{cur.q}</p>
              {cur.type === "text" ? (
                <input type="text" value={val} onChange={e => setData({ ...data, [cur.key]: e.target.value })}
                  onKeyDown={e => e.key === "Enter" && canNext && next()} placeholder={cur.ph} autoFocus
                  className="w-full border-b border-white/10 bg-transparent pb-3 font-body text-xl outline-none placeholder:text-text-dim focus:border-lime transition-colors" />
              ) : (
                <div className="flex flex-col gap-2">
                  {cur.opts?.map(opt => (
                    <motion.button key={opt} whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}
                      onClick={() => { setData({ ...data, [cur.key]: opt }); setTimeout(() => { if (step < steps.length - 1) setStep(s => s + 1); }, 200); }}
                      className={`cursor-pointer rounded-xl border px-5 py-3.5 text-left font-display text-base font-500 transition-all ${
                        val === opt ? "border-lime/30 bg-lime/5 text-lime" : "border-white/[0.04] text-text-muted hover:border-white/10"
                      }`}>{opt}</motion.button>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {cur.type === "text" && (
            <motion.button onClick={next} disabled={!canNext || loading} whileTap={{ scale: 0.98 }}
              className="mt-8 w-full cursor-pointer rounded-xl bg-lime py-4 font-display text-base font-600 text-bg transition-all disabled:opacity-30 hover:shadow-[0_0_30px_rgba(204,255,0,0.15)]">
              {loading ? "Отправляем..." : step === steps.length - 1 ? "Отправить" : "Дальше →"}
            </motion.button>
          )}
          {step > 0 && (
            <button onClick={() => setStep(s => s - 1)} className="mt-4 w-full cursor-pointer text-center font-display text-sm text-text-dim hover:text-text-muted transition-colors">← Назад</button>
          )}
        </div>
      </div>
    </section>
  );
}
