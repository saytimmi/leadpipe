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
  { key: "business", question: "Какой у тебя бизнес?", type: "text", placeholder: "Стоматология, автосервис, онлайн-школа..." },
  { key: "hasTraffic", question: "Закупаешь трафик?", type: "select", options: ["Да", "Нет", "Планирую"] },
  { key: "leadsPerDay", question: "Сколько заявок в день?", type: "select", options: ["1–5", "5–20", "20+"] },
  { key: "whoAnswers", question: "Кто отвечает на заявки?", type: "select", options: ["Сам", "Менеджер", "Отдел продаж", "Никто толком"] },
  { key: "messenger", question: "Куда написать?", type: "select", options: ["Telegram", "WhatsApp"] },
  { key: "contact", question: "Номер или @username", type: "text", placeholder: "+7... или @username" },
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
            className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full glow-neon"
            style={{ background: "linear-gradient(135deg, var(--color-accent), var(--color-neon))" }}
          >
            <span className="text-4xl text-white">&#10003;</span>
          </motion.div>
          <h2 className="font-display text-4xl font-800 text-text md:text-6xl">Готово!</h2>
          <p className="mt-4 font-body text-xl text-text-secondary">
            Посмотрим твою ситуацию и расскажем, что можно сделать.
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="form" className="relative flex min-h-screen flex-col items-center justify-center px-6 py-32">
      {/* Background glow */}
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-[120px]" />

      <div className="relative z-10 mx-auto w-full max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="font-display text-xs font-500 uppercase tracking-[0.3em] text-accent">
            05 — Последний шаг
          </span>
          <h2 className="mt-5 font-display text-3xl font-800 tracking-tight text-text md:text-5xl">
            Хочешь увидеть,
            <br />
            <span className="text-gradient">как это работает у тебя?</span>
          </h2>
          <p className="mt-4 font-body text-lg text-text-secondary">
            Ответь на пару вопросов — это займёт 40 секунд
          </p>
        </motion.div>

        {/* Progress */}
        <div className="mb-3 flex justify-between font-display text-xs font-400 text-text-dim">
          <span>{step + 1} / {steps.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="mb-10 h-1 w-full overflow-hidden rounded-full bg-white/[0.04]">
          <motion.div
            className="h-full rounded-full gradient-line"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        {/* Form card */}
        <div className="glass-card rounded-3xl p-8 md:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="mb-8 font-display text-xl font-700 text-text md:text-2xl">
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
                  className="w-full border-b-2 border-white/10 bg-transparent pb-4 font-body text-xl text-text outline-none transition-colors placeholder:text-text-dim focus:border-accent"
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
                      className={`cursor-pointer rounded-xl border px-6 py-4 text-left font-display text-base font-500 transition-all ${
                        data[current.key] === opt
                          ? "border-accent/30 bg-accent/10 text-accent"
                          : "border-white/[0.06] text-text-secondary hover:border-white/10 hover:bg-white/[0.02]"
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
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-8 w-full cursor-pointer rounded-xl bg-accent py-4 font-display text-base font-600 text-white transition-all hover:shadow-lg hover:shadow-accent/25 disabled:opacity-30 disabled:hover:shadow-none"
            >
              {loading ? "Отправляем..." : step === steps.length - 1 ? "Отправить" : "Дальше →"}
            </motion.button>
          )}

          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="mt-4 w-full cursor-pointer text-center font-display text-sm font-400 text-text-dim transition-colors hover:text-text-secondary"
            >
              ← Назад
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
