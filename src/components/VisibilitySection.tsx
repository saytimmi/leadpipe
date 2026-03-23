"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const creatives = [
  { id: "#3", label: "Фото до/после", leads: 127, conversations: 43, qualified: 19, paid: 7, winner: true },
  { id: "#5", label: "Видео с мастером", leads: 89, conversations: 51, qualified: 24, paid: 4, winner: true },
  { id: "#1", label: "Акция «скидка 30%»", leads: 341, conversations: 112, qualified: 8, paid: 0, winner: false },
];

export default function VisibilitySection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const dashScale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);
  const dashOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  return (
    <section ref={ref} id="visibility" className="px-6 py-28 md:py-40 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-8 flex items-center gap-4">
          <span className="font-display text-[10px] font-700 uppercase tracking-[0.3em] text-lime">03</span>
          <div className="h-px flex-1 bg-white/[0.04]" />
        </div>

        <div className="mb-16">
          <div>
            {["Рентген", "бюджета"].map((word, i) => (
              <div key={i} className="overflow-hidden">
                <motion.p
                  initial={{ y: "100%" }}
                  whileInView={{ y: "0%" }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.75, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className={`font-display text-4xl font-800 uppercase leading-[0.95] tracking-tight md:text-5xl lg:text-7xl ${
                    i === 1 ? "text-lime" : ""
                  }`}
                >{word}</motion.p>
              </div>
            ))}
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-6 max-w-xl font-body text-sm leading-relaxed text-text-muted md:text-base"
          >
            И вот ты открываешь LeadPipe и видишь то, что никогда не покажет рекламный кабинет:
          </motion.p>
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
              <h3 className="font-display text-xs font-700 uppercase tracking-wider md:text-sm">Эффективность креативов</h3>
              <span className="flex items-center gap-1.5 font-display text-[10px] text-lime">
                <span className="h-1.5 w-1.5 rounded-full bg-lime" />Обновлено 2 мин назад
              </span>
            </div>

            {/* Header row */}
            <div className="mb-3 hidden items-center gap-2 px-3 md:flex">
              <span className="flex-1 font-display text-[9px] font-500 uppercase tracking-wider text-text-dim">Объявление</span>
              <span className="w-16 text-center font-display text-[9px] font-500 uppercase tracking-wider text-text-dim">Заявки</span>
              <span className="w-16 text-center font-display text-[9px] font-500 uppercase tracking-wider text-text-dim">Диалоги</span>
              <span className="w-16 text-center font-display text-[9px] font-500 uppercase tracking-wider text-text-dim">Квалиф.</span>
              <span className="w-20 text-center font-display text-[9px] font-500 uppercase tracking-wider text-text-dim">Оплаты</span>
            </div>

            {/* Creative rows */}
            <div className="space-y-2">
              {creatives.map((c, i) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className={`rounded-xl p-3 md:p-4 ${
                    c.winner ? "bg-white/[0.02]" : "border border-warm/20 bg-warm/[0.03]"
                  }`}
                >
                  {/* Desktop layout */}
                  <div className="hidden items-center gap-2 md:flex">
                    <div className="flex-1">
                      <span className={`font-display text-xs font-700 ${c.winner ? "text-lime" : "text-warm"}`}>
                        {c.id}
                      </span>
                      <span className="ml-2 font-body text-sm text-text-muted">{c.label}</span>
                    </div>
                    <span className="w-16 text-center font-display text-sm font-600 text-text-muted">{c.leads}</span>
                    <span className="w-16 text-center font-display text-sm font-600 text-text-muted">{c.conversations}</span>
                    <span className="w-16 text-center font-display text-sm font-600 text-text-muted">{c.qualified}</span>
                    <span className={`w-20 text-center font-display text-lg font-800 ${
                      c.paid > 0 ? "text-lime" : "text-warm"
                    }`}>
                      {c.paid}
                    </span>
                  </div>

                  {/* Mobile layout */}
                  <div className="md:hidden">
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`font-display text-xs font-700 ${c.winner ? "text-lime" : "text-warm"}`}>
                        {c.id}
                      </span>
                      <span className="font-body text-sm text-text-muted">{c.label}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-4 text-xs text-text-dim font-body">
                        <span>{c.leads} заявок</span>
                        <span>{c.qualified} квалиф.</span>
                      </div>
                      <span className={`font-display text-lg font-800 ${
                        c.paid > 0 ? "text-lime" : "text-warm"
                      }`}>
                        {c.paid} {c.paid === 0 ? "оплат" : "оплат"}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="mt-10 md:mt-14 mx-auto max-w-xl space-y-3 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-body text-base text-text md:text-lg"
          >
            341 заявка — и ни одной оплаты. Треть бюджета в мусорку.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
            className="font-body text-sm text-text-muted md:text-base"
          >
            Без LeadPipe ты бы думал что объявление #1 — лучшее. Потому что 341 заявка.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="font-display text-base font-600 text-lime md:text-lg"
          >
            За один месяц это экономит $800–1 200 рекламного бюджета.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
