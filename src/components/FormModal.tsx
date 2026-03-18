"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trackFormEvent } from "@/lib/analytics";

interface FormData {
  name: string; business: string; hasTraffic: string; budget: string;
  leadsPerDay: string; whoAnswers: string; messenger: string; contact: string;
}

const emptyData: FormData = {
  name: "", business: "", hasTraffic: "", budget: "",
  leadsPerDay: "", whoAnswers: "", messenger: "", contact: "",
};

// Step config with emoji for gamification
const steps: {
  key: keyof FormData; q: string; type: "text" | "select";
  ph?: string; opts?: { label: string; emoji: string }[];
  disqualify?: (val: string) => string | null; // returns message if disqualified
}[] = [
  {
    key: "name", q: "Как тебя зовут?", type: "text", ph: "Имя",
  },
  {
    key: "business", q: "Какой у тебя бизнес?", type: "select",
    opts: [
      { label: "Стоматология", emoji: "🦷" },
      { label: "Салон красоты", emoji: "💇" },
      { label: "Автосервис", emoji: "🔧" },
      { label: "Онлайн-школа", emoji: "🎓" },
      { label: "Клининг", emoji: "🧹" },
      { label: "Недвижимость", emoji: "🏠" },
      { label: "Фитнес", emoji: "💪" },
      { label: "Другое", emoji: "📦" },
    ],
  },
  {
    key: "hasTraffic", q: "Покупаешь рекламу?", type: "select",
    opts: [
      { label: "Да, активно", emoji: "🚀" },
      { label: "Немного, тестирую", emoji: "🧪" },
      { label: "Нет, но планирую", emoji: "📋" },
      { label: "Нет и не планирую", emoji: "🚫" },
    ],
    disqualify: (val) => val === "Нет и не планирую"
      ? "LeadPipe работает с рекламным трафиком. Без рекламы нам пока нечего оптимизировать. Когда запустишь — возвращайся!"
      : null,
  },
  {
    key: "budget", q: "Сколько тратишь на рекламу в месяц?", type: "select",
    opts: [
      { label: "До $200", emoji: "💰" },
      { label: "$200 — $1 000", emoji: "💰💰" },
      { label: "$1 000 — $3 000", emoji: "💰💰💰" },
      { label: "$3 000 — $10 000", emoji: "🔥" },
      { label: "Свыше $10 000", emoji: "🚀" },
    ],
    disqualify: (val) => val === "До $200"
      ? "При бюджете до $200 LeadPipe пока не окупится. Рекомендуем начать с бюджета от $200 — тогда возвращайся, поможем!"
      : null,
  },
  {
    key: "leadsPerDay", q: "Сколько заявок приходит в день?", type: "select",
    opts: [
      { label: "1–3", emoji: "📩" },
      { label: "3–10", emoji: "📬" },
      { label: "10–30", emoji: "📮" },
      { label: "30–100", emoji: "📦" },
      { label: "100+", emoji: "🏔️" },
    ],
  },
  {
    key: "whoAnswers", q: "Кто сейчас обрабатывает заявки?", type: "select",
    opts: [
      { label: "Я сам", emoji: "🙋" },
      { label: "Менеджер / помощник", emoji: "👤" },
      { label: "Отдел продаж", emoji: "👥" },
      { label: "Никто толком", emoji: "😅" },
    ],
    disqualify: (val) => val === "Я сам"
      ? "LeadPipe передаёт горячих клиентов менеджеру. Если обрабатываешь сам — тебе сначала нужен хотя бы один человек на приём заявок. Когда появится — пиши!"
      : null,
  },
  {
    key: "messenger", q: "Куда написать результат?", type: "select",
    opts: [
      { label: "Telegram", emoji: "✈️" },
      { label: "WhatsApp", emoji: "💬" },
    ],
  },
  {
    key: "contact", q: "Номер или @username", type: "text", ph: "+7... или @username",
  },
];

// Gamification messages per step
const stepMessages = [
  "", // name
  "Приятно познакомиться! 🤝",
  "Отлично, разберёмся! 💪",
  "",
  "",
  "",
  "",
  "Почти готово! 🏁",
];

const ModalContext = createContext<{ open: () => void }>({ open: () => {} });
export const useFormModal = () => useContext(ModalContext);

export function FormModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(emptyData);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disqualified, setDisqualified] = useState<string | null>(null);
  const [showStepMsg, setShowStepMsg] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
    setStep(0);
    setData(emptyData);
    setSubmitted(false);
    setDisqualified(null);
    setShowStepMsg(false);
    trackFormEvent("open");
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  // ESC key closes modal
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, close]);

  const cur = steps[step];
  const val = data[cur.key];
  const canNext = val.trim() !== "";
  const progress = ((step + 1) / steps.length) * 100;

  const goNext = async () => {
    // Check disqualification
    if (cur.disqualify) {
      const msg = cur.disqualify(val);
      if (msg) { trackFormEvent("disqualified", cur.key, val); setDisqualified(msg); return; }
    }
    trackFormEvent(`step_${step + 1}`, cur.key, cur.type === "text" ? undefined : val);

    // Show gamification message
    const stepMsg = stepMessages[step];
    if (stepMsg && !showStepMsg) {
      setShowStepMsg(true);
      setTimeout(() => {
        setShowStepMsg(false);
        if (step < steps.length - 1) setStep(s => s + 1);
        else submitForm();
      }, 800);
      return;
    }

    if (step < steps.length - 1) { setStep(s => s + 1); return; }
    await submitForm();
  };

  const submitForm = async () => {
    setLoading(true);
    try { await fetch("/api/submit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }); } catch {}
    trackFormEvent("submit");
    setLoading(false);
    setSubmitted(true);
  };

  const handleSelect = (opt: string) => {
    setData({ ...data, [cur.key]: opt });

    // Check disqualification immediately
    if (cur.disqualify) {
      const msg = cur.disqualify(opt);
      if (msg) { trackFormEvent("disqualified", cur.key, opt); setTimeout(() => setDisqualified(msg), 300); return; }
    }
    trackFormEvent(`step_${step + 1}`, cur.key, opt);

    // Show step message or advance
    const stepMsg = stepMessages[step];
    if (stepMsg) {
      setShowStepMsg(true);
      setTimeout(() => {
        setShowStepMsg(false);
        if (step < steps.length - 1) setStep(s => s + 1);
      }, 800);
    } else {
      setTimeout(() => { if (step < steps.length - 1) setStep(s => s + 1); }, 300);
    }
  };

  return (
    <ModalContext.Provider value={{ open }}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-4"
            onClick={close}
          >
            <div className="absolute inset-0 bg-bg/80 backdrop-blur-md" />

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/[0.06] bg-surface"
            >
              <button onClick={close} aria-label="Закрыть форму" className="absolute right-3 top-3 z-10 cursor-pointer p-2 text-text-muted transition-colors hover:text-text">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.5" /></svg>
              </button>

              <div className="p-6 md:p-8">
                {/* DISQUALIFIED */}
                {disqualified ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-6 text-center">
                    <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-warm/10">
                      <span className="text-2xl">🤝</span>
                    </div>
                    <h3 className="font-display text-lg font-700">Пока не подходит</h3>
                    <p className="mt-3 font-body text-sm leading-relaxed text-text-muted">{disqualified}</p>
                    <div className="mt-6 flex flex-col items-center gap-3">
                      <button onClick={() => { setDisqualified(null); setStep(s => Math.max(0, s - 1)); }}
                        className="cursor-pointer rounded-full bg-lime/10 px-6 py-3 font-display text-xs font-600 text-lime transition-colors hover:bg-lime/20">
                        ← Попробовать ещё раз
                      </button>
                      <button onClick={close} className="cursor-pointer font-display text-xs text-text-dim transition-colors hover:text-text-muted">Закрыть</button>
                    </div>
                  </motion.div>
                ) : submitted ? (
                  /* SUCCESS */
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-6 text-center">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", delay: 0.15, damping: 12 }}
                      className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-lime"
                    >
                      <span className="text-3xl text-bg">✓</span>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                      <h3 className="font-display text-2xl font-800">Заявка принята! 🎉</h3>
                      <p className="mt-3 font-body text-sm text-text-muted">Изучим твою ситуацию и напишем с конкретным планом.</p>
                      <p className="mt-1 font-display text-xs text-text-muted/60">Обычно — в течение часа</p>
                    </motion.div>
                    <button onClick={close} className="mt-6 cursor-pointer font-display text-xs text-text-dim hover:text-text-muted transition-colors">Закрыть</button>
                  </motion.div>
                ) : (
                  /* FORM STEPS */
                  <>
                    {/* Progress bar with step dots */}
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex gap-1.5">
                        {steps.map((_, i) => (
                          <motion.div
                            key={i}
                            className={`h-1.5 rounded-full ${
                              i < step ? "bg-lime" : i === step ? "bg-lime" : "bg-white/[0.08]"
                            }`}
                            animate={{ width: i === step ? 24 : 10 }}
                            transition={{ duration: 0.3 }}
                          />
                        ))}
                      </div>
                      <span className="font-display text-[10px] text-text-muted">{Math.round(progress)}%</span>
                    </div>

                    <div className="mb-6 h-px w-full bg-white/[0.04]" />

                    {/* Step message overlay */}
                    <AnimatePresence>
                      {showStepMsg && stepMessages[step] && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="absolute inset-0 z-20 flex items-center justify-center bg-surface/95"
                        >
                          <p className="font-display text-xl font-700">{stepMessages[step]}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <AnimatePresence mode="wait">
                      <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.2 }}>
                        <p className="mb-6 font-display text-lg font-700">{cur.q}</p>
                        {cur.type === "text" ? (
                          <input type="text" value={val} onChange={e => setData({ ...data, [cur.key]: e.target.value })}
                            onKeyDown={e => e.key === "Enter" && canNext && goNext()} placeholder={cur.ph}
                            autoFocus
                            className="w-full border-b-2 border-white/15 bg-transparent pb-3 font-body text-lg outline-none placeholder:text-text-dim focus:border-lime transition-colors" />
                        ) : (
                          <div className="flex flex-col gap-2">
                            {cur.opts?.map(opt => (
                              <motion.button key={opt.label} whileTap={{ scale: 0.97 }}
                                onClick={() => handleSelect(opt.label)}
                                className={`cursor-pointer rounded-xl border px-4 py-3.5 text-left font-display text-sm font-500 transition-all active:bg-lime/5 focus-visible:ring-2 focus-visible:ring-lime focus-visible:outline-none ${
                                  val === opt.label ? "border-lime/30 bg-lime/5 text-lime" : "border-white/[0.06] text-text-muted hover:border-white/10"
                                }`}>
                                <span className="mr-2">{opt.emoji}</span>
                                {opt.label}
                              </motion.button>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>

                    {cur.type === "text" && (
                      <motion.button onClick={goNext} disabled={!canNext || loading} whileTap={{ scale: 0.97 }}
                        className="mt-6 w-full cursor-pointer rounded-xl bg-lime py-3.5 font-display text-sm font-600 text-bg transition-all disabled:opacity-30 active:shadow-[0_0_30px_rgba(204,255,0,0.15)]">
                        {loading ? "Отправляем..." : step === steps.length - 1 ? "Отправить 🚀" : "Дальше →"}
                      </motion.button>
                    )}
                    {step > 0 && (
                      <button onClick={() => setStep(s => s - 1)} className="mt-3 w-full cursor-pointer py-2 text-center font-display text-xs text-text-muted/60 hover:text-text-muted transition-colors">← Назад</button>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ModalContext.Provider>
  );
}
