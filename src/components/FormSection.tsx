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
            className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-accent"
          >
            <span className="text-4xl text-white">&#10003;</span>
          </motion.div>
          <h2 className="font-display text-4xl font-800 text-dark md:text-6xl">Готово!</h2>
          <p className="mt-4 font-body text-xl text-muted">
            Посмотрим твою ситуацию и расскажем, что можно сделать.
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="form" className="relative flex min-h-screen flex-col items-center justify-center px-6 py-32">
      <div className="mx-auto w-full max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="font-display text-xs font-600 uppercase tracking-[0.3em] text-accent">
            05 — Анкета
          </span>
          <h2 className="mt-4 font-display text-4xl font-800 tracking-tight text-dark md:text-6xl">
            Давай
            <br />
            разберёмся
          </h2>
          <p className="mt-3 font-body text-lg text-muted">
            Ответь на пару вопросов — это займёт минуту
          </p>
        </motion.div>

        {/* Progress */}
        <div className="mb-3 flex justify-between font-display text-xs font-500 text-muted">
          <span>{step + 1} / {steps.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="mb-10 h-1 w-full overflow-hidden rounded-full bg-dark/5">
          <motion.div
            className="h-full rounded-full bg-accent"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        {/* Form card */}
        <div className="rounded-2xl border border-dark/5 bg-white p-8 shadow-xl shadow-dark/5 md:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="mb-8 font-display text-2xl font-700 text-dark">
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
                  className="w-full border-b-2 border-dark/10 bg-transparent pb-4 font-body text-xl text-dark outline-none transition-colors placeholder:text-dark/20 focus:border-accent"
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
                      className={`cursor-pointer rounded-xl border-2 px-6 py-4 text-left font-display text-lg font-500 transition-all ${
                        data[current.key] === opt
                          ? "border-accent bg-accent/5 text-accent"
                          : "border-dark/5 text-dark hover:border-dark/20"
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
              className="mt-8 w-full cursor-pointer rounded-xl bg-dark px-8 py-4 font-display text-lg font-600 text-white transition-all hover:bg-accent disabled:opacity-30"
              whileTap={{ scale: 0.98 }}
            >
              {loading ? "Отправляем..." : step === steps.length - 1 ? "Отправить" : "Дальше \u2192"}
            </motion.button>
          )}

          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="mt-4 w-full cursor-pointer text-center font-display text-sm font-500 text-muted transition-colors hover:text-dark"
            >
              \u2190 Назад
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
