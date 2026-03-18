"use client";

import { motion } from "framer-motion";
import { useFormModal } from "./FormModal";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const funnel = [
  { label: "Потрачено на рекламу", value: "$2 560", sub: null, dimValue: true },
  { label: "Показы", value: "580 000", sub: "CPM ~$4.4" },
  { label: "Охваты", value: "320 000", sub: "частота 1.8" },
  { label: "Клики по рекламе", value: "12 800", sub: "CTR 2.2% · CPC $0.20", color: "text-text" },
  { label: "Оставили заявку (лиды)", value: "1 280", sub: "конверсия 10% · CPL $2", color: "text-text" },
  { label: "Написали в WhatsApp", value: "890", sub: "390 потерялись", color: "text-text" },
  { label: "Назвали имя", value: "310", sub: "580 замолчали", color: "text-lime" },
  { label: "Услышали оффер", value: "145", sub: null, color: "text-lime" },
  { label: "Дослушали", value: "58", sub: null, color: "text-lime" },
  { label: "Пришли на встречу", value: "16", sub: null, color: "text-lime", big: true },
];

export default function ProblemSection() {
  const { open } = useFormModal();

  return (
    <section id="problem" className="relative px-6 pt-10 pb-28 md:pt-16 md:pb-40 lg:px-10">
      {/* Marquee */}
      <div className="mb-10 overflow-hidden border-y border-white/[0.04] py-4 md:mb-14 md:py-5">
        <div className="marquee-track whitespace-nowrap">
          {[0, 1].map(j => (
            <span key={j} className="inline-block">
              {["Стоматология", "Автосервис", "Онлайн-школа", "Салон красоты", "Клининг", "Агентство недвижимости", "Фитнес", "Юристы", "Ремонт квартир", "Доставка еды", "Клиника", "Детский центр", "Барбершоп", "Автошкола", "Мебель на заказ", "Фотостудия", "Ветеринарка", "Репетиторы", "Массаж", "Автомойка", "Цветы", "Кондитерская", "Шиномонтаж", "Пекарня"].map((biz, i) => (
                <span key={i} className="mx-3 font-display text-sm font-700 uppercase text-text-dim md:mx-5 md:text-3xl lg:text-4xl">
                  {biz}<span className="mx-3 text-lime md:mx-5">·</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease }}
        className="mb-10 text-center font-body text-sm text-text-muted md:mb-14 md:text-base"
      >
        Ты всё равно тратишь деньги на рекламу и обрабатываешь заявки.
        <br />
        <span className="text-text-dim">Допустим так.</span>
      </motion.p>

      <div className="mx-auto max-w-[1400px]">
        <div className="mb-8 flex items-center gap-4">
          <span className="font-display text-[10px] font-700 uppercase tracking-[0.3em] text-lime">02</span>
          <div className="h-px w-12 bg-white/[0.04]" />
        </div>

        <div className="grid gap-12 md:gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          {/* Left */}
          <div>
            {["Вот куда", "уходят", "деньги"].map((word, i) => (
              <div key={i} className="overflow-hidden">
                <motion.p
                  initial={{ y: "100%" }}
                  whileInView={{ y: "0%" }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.75, delay: i * 0.1, ease }}
                  className={`font-display text-4xl font-800 uppercase leading-[0.95] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl ${
                    i === 2 ? "text-text-muted" : ""
                  }`}
                >
                  {word}
                </motion.p>
              </div>
            ))}

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease }}
              className="mt-8 max-w-md font-body text-sm leading-relaxed text-text-muted md:text-base"
            >
              Вот реальная воронка типичного малого бизнеса за месяц. Посмотри, на каком этапе исчезают люди — и сколько на самом деле стоит один клиент.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="mt-8">
              <button onClick={open}
                className="cursor-pointer rounded-full border border-lime/20 px-6 py-3.5 font-display text-xs font-700 uppercase tracking-[0.15em] text-lime transition-all active:bg-lime/5 hover:bg-lime/5 md:px-8 md:py-4">
                Разобраться
              </button>
            </motion.div>
          </div>

          {/* Right — detailed funnel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="rounded-2xl border border-white/[0.04] bg-surface p-5 md:p-8"
          >
            <p className="mb-6 font-display text-[10px] font-500 uppercase tracking-[0.2em] text-text-muted">
              Реальная воронка за 1 месяц
            </p>

            <div className="space-y-1">
              {funnel.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06, ease }}
                >
                  {/* Bar */}
                  <div className="relative overflow-hidden rounded-lg bg-white/[0.02] py-3 pl-4 pr-4 md:py-3.5">
                    {/* Fill width proportional to value */}
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${
                        i === 0 ? 100 : i === 1 ? 85 : i === 2 ? 65 : i === 3 ? 28 :
                        i === 4 ? 24 : i === 5 ? 14 : i === 6 ? 9 : i === 7 ? 4.5 : 2
                      }%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: 0.2 + i * 0.08, ease }}
                      className={`absolute inset-y-0 left-0 ${
                        i <= 2 ? "bg-white/[0.02]" : i <= 4 ? "bg-white/[0.03]" : "bg-lime/[0.06]"
                      }`}
                    />

                    <div className="relative flex items-baseline justify-between gap-2">
                      <span className="min-w-0 truncate font-body text-[11px] text-text-muted md:text-xs">{item.label}</span>
                      <div className="flex items-baseline gap-2 shrink-0">
                        <span className={`font-display text-sm font-800 md:text-base ${
                          (item as { big?: boolean }).big ? "text-xl text-lime md:text-2xl" :
                          item.dimValue ? "text-text-dim" :
                          item.color || "text-text-muted"
                        }`}>
                          {item.value}
                        </span>
                      </div>
                    </div>
                    {item.sub && (
                      <p className="relative mt-1 font-body text-[10px] text-text-dim">{item.sub}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom line */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="mt-6 flex items-baseline justify-between border-t border-white/[0.04] pt-5"
            >
              <span className="font-body text-xs text-text-muted">Цена одного клиента:</span>
              <span className="font-display text-2xl font-900 text-lime md:text-3xl">$160</span>
            </motion.div>
            <p className="mt-2 font-body text-[10px] text-text-muted/60">
              1 280 лидов → 16 клиентов. Конверсия 1.25%. А могло быть 60+.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
