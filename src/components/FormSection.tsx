"use client";

import { motion } from "framer-motion";
import { useFormModal } from "./FormModal";
import NicheBadges from "./NicheBadges";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const steps = [
  "Подключаем Instagram, WhatsApp и CRM",
  "Настраиваем AI-агента под твой бизнес",
  "Через 7 дней — первые данные",
];

export default function FormSection() {
  const { open } = useFormModal();

  return (
    <section id="form" className="px-6 py-28 md:py-40">
      <div className="mx-auto max-w-3xl">
        {/* Section label */}
        <div className="mb-8 flex items-center justify-center gap-4">
          <div className="h-px w-8 bg-white/[0.04]" />
          <span className="font-display text-[10px] font-700 uppercase tracking-[0.3em] text-lime">05</span>
          <div className="h-px w-8 bg-white/[0.04]" />
        </div>

        {/* Title */}
        <div className="text-center">
          {["Под ключ", "за 7 дней"].map((word, i) => (
            <div key={i} className="overflow-hidden">
              <motion.p
                initial={{ y: "100%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, delay: i * 0.1, ease }}
                className={`font-display text-4xl font-800 uppercase leading-[0.95] tracking-tight sm:text-5xl md:text-6xl lg:text-8xl ${
                  i === 1 ? "text-text-muted" : ""
                }`}
              >
                {word}
              </motion.p>
            </div>
          ))}
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mx-auto mt-8 max-w-xl text-center font-body text-sm leading-relaxed text-text-muted md:text-base"
        >
          Ты не покупаешь конструктор и не настраиваешь бота сам. Мы подключаем твой Instagram, WhatsApp и CRM — настраиваем AI-агента под твой бизнес — и через 7 дней ты видишь первые данные.
        </motion.p>

        {/* 3 Steps */}
        <div className="mt-12 flex flex-col items-center gap-4 md:flex-row md:justify-center md:gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-3 md:flex-col md:items-center md:text-center"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4, ease }}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-lime font-display text-sm font-700 text-bg">
                {i + 1}
              </span>
              <span className="font-body text-sm text-text-muted md:text-base">{step}</span>
            </motion.div>
          ))}
        </div>

        {/* Niche badges */}
        <div className="mt-12">
          <NicheBadges />
        </div>

        {/* Pricing */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-16 text-center"
        >
          <p className="font-display text-2xl font-700 text-text md:text-3xl">
            от $149/мес
          </p>
          <p className="mt-2 font-body text-sm text-text-muted">
            Зависит от количества заявок и точек
          </p>
        </motion.div>

        {/* Guarantee */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mx-auto mt-8 max-w-md text-center font-body text-sm leading-relaxed text-text-muted md:text-base"
        >
          Если за 30 дней LeadPipe не покажет какие объявления сливают бюджет — вернём деньги. Не пробный период. Гарантия результата.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 flex flex-col items-center gap-4"
        >
          <button
            onClick={open}
            className="cursor-pointer rounded-full bg-lime px-10 py-4 font-display text-xs font-700 uppercase tracking-[0.15em] text-bg transition-shadow active:shadow-[0_0_40px_rgba(204,255,0,0.25)] md:px-14 md:py-5 md:text-sm"
          >
            Оставить заявку
          </button>
          <a
            href="https://wa.me/77001234567?text=Привет! Хочу узнать про LeadPipe"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-sm text-text-muted transition-colors hover:text-text"
          >
            или написать в WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
