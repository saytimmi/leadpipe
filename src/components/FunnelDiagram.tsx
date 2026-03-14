"use client";

import { motion } from "framer-motion";

const stages = [
  { label: "Написали", count: "100 человек", width: 100, color: "bg-accent/20" },
  { label: "Получили ответ", count: "60", width: 65, color: "bg-accent/15" },
  { label: "Узнали что нужно", count: "30", width: 38, color: "bg-orange-100" },
  { label: "Дошли до конца", count: "10", width: 18, color: "bg-red-100" },
  { label: "Стали клиентами", count: "3", width: 8, color: "bg-red-200" },
];

export default function FunnelDiagram() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center gap-3">
      <p className="mb-4 text-center text-sm font-medium text-muted">
        Куда уходят заявки?
      </p>
      {stages.map((stage, i) => (
        <motion.div
          key={stage.label}
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
          className="flex w-full flex-col items-center origin-center"
        >
          <div
            className={`${stage.color} flex items-center justify-between rounded-xl px-5 py-3.5 transition-all`}
            style={{ width: `${Math.max(stage.width, 25)}%` }}
          >
            <span className="text-sm font-medium text-dark">{stage.label}</span>
            <span className="text-sm font-bold text-dark/60">{stage.count}</span>
          </div>
        </motion.div>
      ))}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2 }}
        className="mt-4 text-center text-sm text-muted"
      >
        Остальные 97 — не плохие заявки.
        <br />
        Им просто никто нормально не ответил.
      </motion.p>
    </div>
  );
}
