"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FormData {
  name: string; business: string; hasTraffic: string;
  leadsPerDay: string; whoAnswers: string; messenger: string; contact: string;
}

const steps: { key: keyof FormData; q: string; type: "text" | "select"; ph?: string; opts?: string[] }[] = [
  { key: "name", q: "Как тебя зовут?", type: "text", ph: "Имя" },
  { key: "business", q: "Какой у тебя бизнес?", type: "text", ph: "Стоматология, автосервис..." },
  { key: "hasTraffic", q: "Закупаешь трафик?", type: "select", opts: ["Да", "Нет", "Планирую"] },
  { key: "leadsPerDay", q: "Сколько заявок в день?", type: "select", opts: ["1–5", "5–20", "20+"] },
  { key: "whoAnswers", q: "Кто отвечает на заявки?", type: "select", opts: ["Сам", "Менеджер", "Отдел продаж", "Никто толком"] },
  { key: "messenger", q: "Куда написать?", type: "select", opts: ["Telegram", "WhatsApp"] },
  { key: "contact", q: "Номер или @username", type: "text", ph: "+7... или @username" },
];

// Context to open modal from anywhere
const ModalContext = createContext<{ open: () => void }>({ open: () => {} });
export const useFormModal = () => useContext(ModalContext);

export function FormModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>({ name: "", business: "", hasTraffic: "", leadsPerDay: "", whoAnswers: "", messenger: "", contact: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
    setStep(0);
    setData({ name: "", business: "", hasTraffic: "", leadsPerDay: "", whoAnswers: "", messenger: "", contact: "" });
    setSubmitted(false);
  }, []);

  const close = () => setIsOpen(false);

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
            {/* Backdrop */}
            <div className="absolute inset-0 bg-bg/80 backdrop-blur-md" />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.65, 0.05, 0, 1] }}
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/[0.06] bg-surface"
            >
              {/* Close button */}
              <button onClick={close} className="absolute right-4 top-4 z-10 cursor-pointer p-1 text-text-dim transition-colors hover:text-text-muted">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.5" /></svg>
              </button>

              <div className="p-6 md:p-8">
                {submitted ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-8 text-center">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-lime">
                      <span className="text-2xl text-bg">✓</span>
                    </div>
                    <h3 className="font-display text-2xl font-800">Готово!</h3>
                    <p className="mt-3 font-body text-sm text-text-muted">Посмотрим твою ситуацию и расскажем, что можно сделать.</p>
                    <button onClick={close} className="mt-6 cursor-pointer font-display text-xs text-text-dim hover:text-text-muted transition-colors">Закрыть</button>
                  </motion.div>
                ) : (
                  <>
                    {/* Progress */}
                    <div className="mb-2 flex justify-between font-display text-[10px] text-text-dim">
                      <span>{step + 1} / {steps.length}</span>
                      <span>{Math.round(((step + 1) / steps.length) * 100)}%</span>
                    </div>
                    <div className="mb-8 h-px w-full bg-white/[0.04]">
                      <motion.div className="h-full bg-lime" animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
                        transition={{ duration: 0.4, ease: [0.65, 0.05, 0, 1] }} />
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.2 }}>
                        <p className="mb-6 font-display text-lg font-700">{cur.q}</p>
                        {cur.type === "text" ? (
                          <input type="text" value={val} onChange={e => setData({ ...data, [cur.key]: e.target.value })}
                            onKeyDown={e => e.key === "Enter" && canNext && next()} placeholder={cur.ph}
                            className="w-full border-b border-white/10 bg-transparent pb-3 font-body text-lg outline-none placeholder:text-text-dim focus:border-lime transition-colors" />
                        ) : (
                          <div className="flex flex-col gap-2">
                            {cur.opts?.map(opt => (
                              <motion.button key={opt} whileTap={{ scale: 0.97 }}
                                onClick={() => { setData({ ...data, [cur.key]: opt }); setTimeout(() => { if (step < steps.length - 1) setStep(s => s + 1); }, 300); }}
                                className={`cursor-pointer rounded-xl border px-4 py-3 text-left font-display text-sm font-500 transition-all active:bg-lime/5 ${
                                  val === opt ? "border-lime/30 bg-lime/5 text-lime" : "border-white/[0.04] text-text-muted"
                                }`}>{opt}</motion.button>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>

                    {cur.type === "text" && (
                      <motion.button onClick={next} disabled={!canNext || loading} whileTap={{ scale: 0.97 }}
                        className="mt-6 w-full cursor-pointer rounded-xl bg-lime py-3.5 font-display text-sm font-600 text-bg transition-all disabled:opacity-30 active:shadow-[0_0_30px_rgba(204,255,0,0.15)]">
                        {loading ? "Отправляем..." : step === steps.length - 1 ? "Отправить" : "Дальше →"}
                      </motion.button>
                    )}
                    {step > 0 && (
                      <button onClick={() => setStep(s => s - 1)} className="mt-3 w-full cursor-pointer text-center font-display text-xs text-text-dim hover:text-text-muted transition-colors">← Назад</button>
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
