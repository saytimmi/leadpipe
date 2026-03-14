"use client";

import { motion } from "framer-motion";

const stages = [
  { label: "Написали", width: 100 },
  { label: "Получили ответ", width: 70 },
  { label: "Узнали что нужно", width: 40 },
  { label: "Дошли до конца", width: 20 },
  { label: "Стали клиентами", width: 8 },
];

export default function FunnelDiagram() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-2">
      {stages.map((stage, i) => (
        <motion.div
          key={stage.label}
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.2 }}
          className="flex flex-col items-center"
        >
          <div
            className="rounded-lg bg-accent/20 py-3 text-center text-sm font-medium text-dark transition-all"
            style={{ width: `${stage.width * 3.5}px` }}
          >
            {stage.label}
          </div>
          {i < stages.length - 1 && (
            <div className="h-2 w-px bg-accent/30" />
          )}
        </motion.div>
      ))}
    </div>
  );
}
