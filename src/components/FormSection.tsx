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
          <h2 className="text-3xl font-bold text-dark md:text-5xl">Готово!</h2>
          <p className="mt-4 text-lg text-muted">
            Посмотрим твою ситуацию и расскажем, что можно сделать.
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section
      id="form"
      className="flex min-h-screen flex-col items-center justify-center px-6 py-24"
    >
      <div className="mx-auto w-full max-w-md">
        <h2 className="mb-8 text-center text-3xl font-bold text-dark md:text-5xl">
          Давай разберёмся
        </h2>

        <div className="mb-12 h-1.5 w-full rounded-full bg-gray-200">
          <motion.div
            className="h-full rounded-full bg-accent"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            <p className="mb-6 text-xl font-medium text-dark">
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
                className="w-full rounded-xl border border-gray-300 px-5 py-4 text-lg outline-none transition-colors focus:border-accent"
              />
            ) : (
              <div className="flex flex-col gap-3">
                {current.options?.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setData({ ...data, [current.key]: opt });
                      setTimeout(() => {
                        if (step < steps.length - 1) setStep(step + 1);
                      }, 300);
                    }}
                    className={`cursor-pointer rounded-xl border px-5 py-4 text-left text-lg transition-colors ${
                      data[current.key] === opt
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-gray-300 hover:border-accent"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {current.type === "text" && (
          <motion.button
            onClick={handleNext}
            disabled={!canProceed || loading}
            className="mt-8 w-full cursor-pointer rounded-full bg-accent px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-accent-dark disabled:opacity-40"
            whileTap={{ scale: 0.98 }}
          >
            {loading
              ? "Отправляем..."
              : step === steps.length - 1
                ? "Отправить"
                : "Дальше"}
          </motion.button>
        )}

        {step > 0 && (
          <button
            onClick={() => setStep(step - 1)}
            className="mt-4 w-full cursor-pointer text-center text-sm text-muted hover:text-dark"
          >
            Назад
          </button>
        )}
      </div>
    </section>
  );
}
