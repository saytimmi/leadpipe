"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useFormModal } from "./FormModal";
import CountUpNumber from "./CountUpNumber";

const metrics = [
  { label: "Бюджет", value: 2560, suffix: " $" },
  { label: "Охваты", value: 320000, suffix: "" },
  { label: "Клики", value: 12800, suffix: "" },
  { label: "Лиды", value: 1280, suffix: "", accent: true },
  { label: "Квалифицированы", value: 310, suffix: "", accent: true },
  { label: "Клиенты", value: 16, suffix: "", accent: true },
  { label: "Цена лида", value: 2, suffix: " $" },
  { label: "Цена клиента", value: 160, suffix: " $", accent: true },
];

const qualStages = [
  { name: "Показы", count: 580000, isCurrency: false, loss: null, hint: "CPM $4.4 — дешёвый трафик → обсудить качество с таргетологом" },
  { name: "Охваты", count: 320000, loss: null, hint: "320к уникальных → обсудить сегменты с таргетологом" },
  { name: "Клики", count: 12800, loss: null, hint: "CTR 2.2% · CPC $0.20 → креативщик молодец" },
  { name: "Лиды", count: 1280, loss: "−11520", hint: "Конверсия 10% · CPL $2 → обсудить качество лидов" },
  { name: "Написали", count: 890, loss: "−390", hint: "390 потерялись между формой и чатом → автоответ нужен" },
  { name: "Имя", count: 310, loss: "−580", hint: "Менеджер не отвечает вовремя → обсудить с РОПом" },
  { name: "Боль", count: 145, loss: "−165", hint: "Скрипт не раскрывает потребность → обсудить с маркетологом" },
  { name: "Презентация", count: 58, loss: "−87", hint: "Продукт не доносится → обсудить с РОПом" },
  { name: "Встреча", count: 16, loss: "−42", hint: "Нет дожима → обсудить с менеджером" },
];

const features = [
  "Видишь расход по каждой кампании — какая реклама приносит клиентов, а какая сжирает бюджет",
  "Помогает таргетологу понять, где кликабельность хуже и что менять",
  "Видишь на каком этапе переписки люди уходят и почему",
  "Подсказки: какой этап просел и с кем из команды это обсудить",
];

export default function VisibilitySection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const dashScale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);
  const dashOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const { open } = useFormModal();

  return (
    <section ref={ref} id="visibility" className="px-6 py-28 md:py-40 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-8 flex items-center gap-4">
          <span className="font-display text-[10px] font-700 uppercase tracking-[0.3em] text-lime">03</span>
          <div className="h-px flex-1 bg-white/[0.04]" />
        </div>

        <div className="mb-16 grid gap-8 lg:grid-cols-2 lg:gap-10">
          <div>
            {["И ты", "наконец", "видишь", "всё"].map((word, i) => (
              <div key={i} className="overflow-hidden">
                <motion.p
                  initial={{ y: "100%" }}
                  whileInView={{ y: "0%" }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.75, delay: i * 0.08, ease: [0.65, 0.05, 0, 1] }}
                  className={`font-display text-4xl font-800 uppercase leading-[0.95] tracking-tight md:text-5xl lg:text-7xl ${
                    i === 3 ? "text-lime" : ""
                  }`}
                >{word}</motion.p>
              </div>
            ))}
          </div>
          <div className="flex items-end">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <p className="max-w-md font-body text-sm leading-relaxed text-text-muted md:text-base">
                Одна страница — вся картина. От рекламы до клиента. Система сама подсказывает какой этап просел и с кем из команды это обсудить.
              </p>
              <div className="mt-5 space-y-2.5">
                {features.map((f, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: 0.4 + i * 0.08 }} className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lime" />
                    <p className="font-body text-xs leading-relaxed text-text-muted md:text-sm">{f}</p>
                  </motion.div>
                ))}
              </div>
              <button onClick={open}
                className="mt-8 cursor-pointer rounded-full border border-lime/20 px-6 py-3.5 font-display text-xs font-700 uppercase tracking-[0.15em] text-lime transition-all active:bg-lime/5 hover:bg-lime/5 md:px-8 md:py-4">
                Разобраться
              </button>
            </motion.div>
          </div>
        </div>

        {/* Dashboard */}
        <motion.div style={{ scale: dashScale, opacity: dashOpacity }}
          className="overflow-hidden rounded-2xl border border-white/[0.04] bg-surface will-change-transform">
          <div className="flex items-center gap-2 border-b border-white/[0.04] px-4 py-2.5 md:px-5 md:py-3">
            <div className="h-2 w-2 rounded-full bg-white/10" />
            <div className="h-2 w-2 rounded-full bg-white/10" />
            <div className="h-2 w-2 rounded-full bg-white/10" />
            <div className="ml-3 flex-1 rounded bg-white/[0.03] px-3 py-1 text-center font-display text-[9px] text-text-dim md:text-[10px]">
              app.leadpipe.ru/dashboard
            </div>
          </div>

          <div className="p-4 md:p-8 lg:p-10">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-display text-xs font-700 uppercase tracking-wider md:text-sm">Воронка за март</h3>
              <span className="flex items-center gap-1.5 font-display text-[10px] text-lime">
                <span className="h-1.5 w-1.5 rounded-full bg-lime" />Обновлено 2 мин назад
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
              {metrics.map((m) => (
                <div key={m.label} className={`rounded-xl p-3 md:p-4 ${m.accent ? "border border-lime/10 bg-lime/[0.03]" : "bg-white/[0.02]"}`}>
                  <div className={`font-display text-base font-800 md:text-xl lg:text-2xl ${m.accent ? "text-lime" : "text-text"}`}>
                    <CountUpNumber target={m.value} suffix={m.suffix} />
                  </div>
                  <div className="mt-1 font-display text-[8px] font-500 uppercase tracking-wider text-text-dim md:text-[9px]">{m.label}</div>
                </div>
              ))}
            </div>

            {/* Qualification stages with hints */}
            <div className="mt-5 rounded-xl bg-white/[0.02] p-4 md:p-5">
              <div className="mb-4 font-display text-[9px] font-700 uppercase tracking-wider text-text-dim md:text-[10px]">
                Этапы квалификации
              </div>

              <div className="space-y-2">
                {qualStages.map((stage, i) => {
                  const maxCount = qualStages[0].count;
                  const barWidth = (stage.count / maxCount) * 100;
                  const isLast = i === qualStages.length - 1;
                  return (
                    <motion.div key={stage.name}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.08 }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-20 shrink-0 font-display text-[10px] font-500 text-text-dim md:w-24 md:text-xs">{stage.name}</span>
                        <div className="relative h-7 flex-1 overflow-hidden rounded bg-white/[0.02] md:h-8">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${barWidth}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.4 + i * 0.1, ease: [0.65, 0.05, 0, 1] }}
                            className={`absolute inset-y-0 left-0 rounded ${isLast ? "bg-lime/20" : "bg-white/[0.04]"}`}
                          />
                          <div className="relative flex h-full items-center justify-between px-2.5">
                            <span className={`font-display text-xs font-800 ${isLast ? "text-lime" : "text-text"}`}>
                              {stage.count.toLocaleString("ru-RU")}{(stage as { isCurrency?: boolean }).isCurrency ? " ₸" : ""}
                            </span>
                            {stage.loss && <span className="font-display text-[10px] font-500 text-warm">{stage.loss}</span>}
                          </div>
                        </div>
                      </div>
                      {/* Hint — owner insight */}
                      {stage.hint && (
                        <div className="ml-20 mt-1 flex items-start gap-1.5 md:ml-24">
                          <span className="mt-0.5 text-[9px]">💡</span>
                          <p className="font-body text-[10px] leading-snug text-warm/80 md:text-[11px]">{stage.hint}</p>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
