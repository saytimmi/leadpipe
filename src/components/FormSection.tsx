"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FormData {
  name: string;
  business: string;
  hasTraffic: string;
  leadsPerDay: string;
  whoAnswers: string;
  messenger: string;
  contact: string;
}

const initialData: FormData = {
  name: "",
  business: "",
  hasTraffic: "",
  leadsPerDay: "",
  whoAnswers: "",
  messenger: "",
  contact: "",
};

const steps: {
  key: keyof FormData;
  question: string;
  type: "text" | "select";
  placeholder?: string;
  options?: string[];
}[] = [
  { key: "name", question: "Как тебя зовут?", type: "text", placeholder: "Имя" },
  { key: "business", question: "Чем занимаешься?", type: "text", placeholder: "Стоматология, автосервис, онлайн-школа..." },
  { key: "hasTraffic", question: "Уже закупаешь трафик?", type: "select", options: ["Да, активно", "Нет, пока нет", "Планирую запустить"] },
  { key: "leadsPerDay", question: "Сколько заявок приходит в день?", type: "select", options: ["1–5", "5–20", "20+", "Пока не считал"] },
  { key: "whoAnswers", question: "Кто сейчас отвечает клиентам?", type: "select", options: ["Сам, когда успеваю", "Менеджер", "Отдел продаж", "Честно — никто толком"] },
  { key: "messenger", question: "Куда тебе удобнее написать?", type: "select", options: ["Telegram", "WhatsApp"] },
  { key: "contact", question: "Оставь контакт — напишем в течение часа", type: "text", placeholder: "+7... или @username" },
];

export default function FormSection() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(initialData);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const current = steps[step];
  const progress = ((step + 1) / steps.length) * 100;
  const canProceed = data[current.key].trim() !== "";

  const handleNext = async () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setLoading(true);
      try {
        await fetch("/api/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      } catch {
        // handle later
      }
      setLoading(false);
      setSubmitted(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && canProceed) handleNext();
  };

  if (submitted) {
    return (
      <section id="form" className="flex min-h-screen flex-col items-center justify-center px-6 py-32">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-accent to-purple glow"
          >
            <span className="text-4xl text-white">&#10003;</span>
          </motion.div>
          <h2 className="font-display text-4xl font-800 text-white md:text-6xl">
            <span className="gradient-text">Готово!</span>
          </h2>
          <p className="mt-4 font-body text-xl text-white/40">
            Мы уже смотрим твою ситуацию. Напишем в течение часа с конкретным планом.
          </p>
          <p className="mt-2 font-display text-sm text-white/20">
            Обычно отвечаем за 15 минут
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="form" className="relative flex min-h-screen flex-col items-center justify-center px-6 py-32">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-[150px]" />

      <div className="relative mx-auto w-full max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="font-display text-xs font-600 uppercase tracking-[0.3em] text-accent">
            05 — Твой ход
          </span>
          <h2 className="mt-4 font-display text-4xl font-800 tracking-tight text-white md:text-6xl">
            Узнай, сколько
            <br />
            <span className="gradient-text-static">ты теряешь</span>
          </h2>
          <p className="mt-3 font-body text-lg text-white/40">
            7 вопросов. 1 минута. После этого — конкретный план, как перестать сливать бюджет.
          </p>
        </motion.div>

        {/* Progress */}
        <div className="mb-3 flex justify-between font-display text-xs font-500 text-white/30">
          <span>{step + 1} / {steps.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="mb-10 h-1 w-full overflow-hidden rounded-full bg-white/5">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-accent to-purple shadow-[0_0_10px_rgba(0,71,255,0.3)]"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        {/* Form card */}
        <div className="gradient-border rounded-2xl">
          <div className="rounded-2xl bg-dark/80 p-8 backdrop-blur-xl md:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="mb-8 font-display text-2xl font-700 text-white">
                  {current.question}
                </p>

                {current.type === "text" ? (
                  <input
                    type="text"
                    value={data[current.key]}
                    onChange={(e) => setData({ ...data, [current.key]: e.target.value })}
                    onKeyDown={handleKeyDown}
                    placeholder={current.placeholder}
                    autoFocus
                    className="w-full border-b-2 border-white/10 bg-transparent pb-4 font-body text-xl text-white outline-none transition-colors placeholder:text-white/15 focus:border-accent"
                  />
                ) : (
                  <div className="flex flex-col gap-3">
                    {current.options?.map((opt) => (
                      <motion.button
                        key={opt}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => {
                          setData({ ...data, [current.key]: opt });
                          setTimeout(() => {
                            if (step < steps.length - 1) setStep(step + 1);
                          }, 250);
                        }}
                        className={`cursor-pointer rounded-xl border px-6 py-4 text-left font-display text-lg font-500 transition-all ${
                          data[current.key] === opt
                            ? "border-accent/50 bg-accent/10 text-accent shadow-[0_0_20px_rgba(0,71,255,0.1)]"
                            : "border-white/5 text-white/60 hover:border-white/15 hover:bg-white/5"
                        }`}
                      >
                        {opt}
                      </motion.button>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {current.type === "text" && (
              <motion.button
                onClick={handleNext}
                disabled={!canProceed || loading}
                className="mt-8 w-full cursor-pointer overflow-hidden rounded-xl bg-gradient-to-r from-accent to-purple px-8 py-4 font-display text-lg font-600 text-white transition-all hover:shadow-[0_0_30px_rgba(0,71,255,0.3)] disabled:opacity-30"
                whileTap={{ scale: 0.98 }}
              >
                {loading ? "Отправляем..." : step === steps.length - 1 ? "Отправить \u2192" : "Дальше \u2192"}
              </motion.button>
            )}

            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                className="mt-4 w-full cursor-pointer text-center font-display text-sm font-500 text-white/20 transition-colors hover:text-white/40"
              >
                \u2190 Назад
              </button>
            )}
          </div>
        </div>

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex items-center justify-center gap-6 font-display text-xs text-white/15"
        >
          <span>Бесплатная консультация</span>
          <span className="h-3 w-px bg-white/10" />
          <span>Без обязательств</span>
          <span className="h-3 w-px bg-white/10" />
          <span>Ответ за 15 мин</span>
        </motion.div>
      </div>
    </section>
  );
}
