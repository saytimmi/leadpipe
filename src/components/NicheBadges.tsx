"use client";

import { motion } from "framer-motion";

const niches = [
  "Стоматология",
  "Салон красоты",
  "Автосервис",
  "Клининг",
  "Фитнес",
  "Онлайн-школа",
  "Ремонт квартир",
  "Недвижимость",
  "Юридические услуги",
  "и другие",
];

export default function NicheBadges() {
  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-3">
      {niches.map((niche, i) => (
        <motion.span
          key={niche}
          className="rounded-full border border-white/[0.08] bg-surface px-4 py-2 text-xs font-body text-text-muted md:text-sm"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.04, duration: 0.3 }}
        >
          {niche}
        </motion.span>
      ))}
    </div>
  );
}
