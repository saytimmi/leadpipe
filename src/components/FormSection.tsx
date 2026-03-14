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
  {
    key: "business",
    question: "Какой у тебя бизнес?",
    type: "text",
    placeholder: "Например: стоматология, автосервис, онлайн-школа",
  },
  {
    key: "hasTraffic",
    question: "Закупаешь трафик?",
    type: "select",
    options: ["Да", "Нет", "Планирую"],
  },
  {
    key: "leadsPerDay",
    question: "Сколько заявок приходит в день?",
    type: "select",
    options: ["1–5", "5–20", "20+"],
  },
  {
    key: "whoAnswers",
    question: "Кто сейчас отвечает на заявки?",
    type: "select",
    options: ["Сам", "Менеджер", "Отдел продаж", "Никто толком"],
  },
  {
    key: "messenger",
    question: "Куда написать?",
    type: "select",
    options: ["Telegram", "WhatsApp"],
  },
  {
    key: "contact",
    question: "Номер или @username",
    type: "text",
    placeholder: "+7... или @username",
  },
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
        // will handle errors later
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
      <section
        id="form"
        className="flex min-h-screen flex-col items-center justify-center px-6 py-24"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <span className="text-4xl">&#10003;</span>
          </div>
          <h2 className="text-3xl font-extrabold text-dark md:text-5xl">Готово!</h2>
          <p className="mt-4 text-xl text-muted">
            Посмотрим твою ситуацию и расскажем, что можно сделать.
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section
      id="form"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-accent/[0.03] to-white" />

      <div className="relative z-10 mx-auto w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-2 text-center text-3xl font-extrabold text-dark md:text-5xl">
            Давай разберёмся
          </h2>
          <p className="mb-8 text-center text-muted">
            Ответь на пару вопросов — это займёт минуту
          </p>
        </motion.div>

        {/* Progress bar */}
        <div className="mb-2 flex justify-between text-xs text-muted">
          <span>Шаг {step + 1} из {steps.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="mb-10 h-2 w-full overflow-hidden rounded-full bg-gray-100">
          <motion.div
            className="h-full rounded-full bg-accent"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>

        <div className="rounded-2xl border border-gray-200/60 bg-white p-8 shadow-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
            >
              <p className="mb-6 text-xl font-semibold text-dark">
                {current.question}
              </p>

              {current.type === "text" ? (
                <input
                  type="text"
                  value={data[current.key]}
                  onChange={(e) =>
                    setData({ ...data, [current.key]: e.target.value })
                  }
                  onKeyDown={handleKeyDown}
                  placeholder={current.placeholder}
                  autoFocus
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 text-lg outline-none transition-all focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20"
                />
              ) : (
                <div className="flex flex-col gap-3">
                  {current.options?.map((opt) => (
                    <motion.button
                      key={opt}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => {
                        setData({ ...data, [current.key]: opt });
                        setTimeout(() => {
                          if (step < steps.length - 1) setStep(step + 1);
                        }, 300);
                      }}
                      className={`cursor-pointer rounded-xl border-2 px-5 py-4 text-left text-lg transition-all ${
                        data[current.key] === opt
                          ? "border-accent bg-accent/5 text-accent font-medium"
                          : "border-gray-200 hover:border-accent/50 hover:bg-gray-50"
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
              className="mt-6 w-full cursor-pointer rounded-xl bg-accent px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-accent-dark disabled:opacity-40"
              whileTap={{ scale: 0.98 }}
            >
              {loading
                ? "Отправляем..."
                : step === steps.length - 1
                  ? "Отправить"
                  : "Дальше \u2192"}
            </motion.button>
          )}

          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="mt-4 w-full cursor-pointer text-center text-sm text-muted transition-colors hover:text-dark"
            >
              \u2190 Назад
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
