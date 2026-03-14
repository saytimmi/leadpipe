# LeadPipe Landing Page Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a scroll-animated landing page for LeadPipe that tells a story about lost leads and presents the product in simple language, with a multi-step qualification form.

**Architecture:** Single-page Next.js app with 7 sections. Each section is an independent React component with Framer Motion scroll animations. Multi-step form stores state locally and submits to a Telegram Bot API endpoint via Next.js API route.

**Tech Stack:** Next.js 14 (App Router), Framer Motion, Tailwind CSS, TypeScript

---

## File Structure

```
leadpipe/
├── src/
│   ├── app/
│   │   ├── layout.tsx          — Root layout (fonts, metadata, global styles)
│   │   ├── page.tsx            — Main page composing all sections
│   │   ├── globals.css         — Tailwind directives + custom styles
│   │   └── api/
│   │       └── submit/
│   │           └── route.ts    — API route: form → Telegram Bot
│   ├── components/
│   │   ├── Header.tsx          — Fixed top nav (logo + CTA)
│   │   ├── HeroSection.tsx     — Section 1: headline + floating messages animation
│   │   ├── FamiliarSection.tsx — Section 2: "Знакомо?" storytelling text
│   │   ├── ProblemSection.tsx  — Section 3: "Вот в чём проблема" + funnel
│   │   ├── VisibilitySection.tsx — Section 4: "И ты наконец видишь" + dashboard mockup
│   │   ├── SolutionSection.tsx — Section 5: "Что мы делаем" + chat animation
│   │   ├── FormSection.tsx     — Section 6: multi-step form
│   │   ├── Footer.tsx          — Section 7: footer
│   │   ├── CTAButton.tsx       — Reusable CTA button (scrolls to form)
│   │   ├── AnimatedText.tsx    — Reusable: text appears paragraph by paragraph on scroll
│   │   ├── CountUpNumber.tsx   — Reusable: number counts up when in viewport
│   │   └── FunnelDiagram.tsx   — Animated funnel SVG
│   └── lib/
│       └── telegram.ts         — Telegram Bot API helper
├── public/
│   └── fonts/                  — Local font files (if needed)
├── tailwind.config.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## Chunk 1: Project Setup & Layout

### Task 1: Initialize Next.js project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`
- Create: `src/app/layout.tsx`, `src/app/globals.css`, `src/app/page.tsx`

- [ ] **Step 1: Create Next.js project with TypeScript, Tailwind, App Router**

```bash
cd /Users/timur/leadpipe
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```

Accept defaults. This scaffolds the project.

- [ ] **Step 2: Install Framer Motion**

```bash
cd /Users/timur/leadpipe
npm install framer-motion
```

- [ ] **Step 3: Verify dev server starts**

```bash
cd /Users/timur/leadpipe
npm run dev &
sleep 3
curl -s http://localhost:3000 | head -20
kill %1
```

Expected: HTML output from Next.js.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: initialize Next.js project with Framer Motion and Tailwind"
```

---

### Task 2: Configure global styles, fonts, and layout

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Update `tailwind.config.ts`** — add custom colors and fonts

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#2563EB",       // blue-600
        "accent-dark": "#1D4ED8", // blue-700
        dark: "#111827",          // gray-900
        muted: "#6B7280",         // gray-500
        light: "#F9FAFB",         // gray-50
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 2: Update `src/app/globals.css`** — minimal reset + smooth scroll

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  @apply bg-white text-dark antialiased;
}
```

- [ ] **Step 3: Update `src/app/layout.tsx`** — metadata + Inter font

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "LeadPipe — Ты тратишь на рекламу. А дальше?",
  description:
    "Система, которая отвечает каждому клиенту, ведёт до конца и показывает реальные цифры твоего бизнеса.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

- [ ] **Step 4: Set up empty `page.tsx`** — placeholder with all section slots

```tsx
export default function Home() {
  return (
    <main>
      <section id="hero" className="min-h-screen" />
      <section id="familiar" className="min-h-screen" />
      <section id="problem" className="min-h-screen" />
      <section id="visibility" className="min-h-screen" />
      <section id="solution" className="min-h-screen" />
      <section id="form" className="min-h-screen" />
      <footer id="footer" />
    </main>
  );
}
```

- [ ] **Step 5: Verify page loads with empty sections**

```bash
cd /Users/timur/leadpipe
npm run dev &
sleep 3
curl -s http://localhost:3000 | grep -c "section"
kill %1
```

Expected: sections present in HTML.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: configure layout, fonts, colors, and page structure"
```

---

## Chunk 2: Reusable Components

### Task 3: CTAButton component

**Files:**
- Create: `src/components/CTAButton.tsx`

- [ ] **Step 1: Create CTAButton**

```tsx
"use client";

interface CTAButtonProps {
  text?: string;
  targetId?: string;
}

export default function CTAButton({
  text = "Разобраться",
  targetId = "form",
}: CTAButtonProps) {
  const handleClick = () => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <button
      onClick={handleClick}
      className="rounded-full bg-accent px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-accent-dark"
    >
      {text}
    </button>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/CTAButton.tsx
git commit -m "feat: add CTAButton component"
```

---

### Task 4: AnimatedText component

**Files:**
- Create: `src/components/AnimatedText.tsx`

- [ ] **Step 1: Create AnimatedText** — paragraphs appear one by one on scroll

```tsx
"use client";

import { motion } from "framer-motion";

interface AnimatedTextProps {
  paragraphs: string[];
}

export default function AnimatedText({ paragraphs }: AnimatedTextProps) {
  return (
    <div className="space-y-6">
      {paragraphs.map((text, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: i * 0.15 }}
          className="text-lg leading-relaxed text-muted md:text-xl"
        >
          {text}
        </motion.p>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/AnimatedText.tsx
git commit -m "feat: add AnimatedText component with scroll reveal"
```

---

### Task 5: CountUpNumber component

**Files:**
- Create: `src/components/CountUpNumber.tsx`

- [ ] **Step 1: Create CountUpNumber** — animates from 0 to target when in view

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CountUpNumberProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

export default function CountUpNumber({
  target,
  suffix = "",
  prefix = "",
  duration = 1.5,
}: CountUpNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const interval = (duration * 1000) / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setValue(target);
        clearInterval(timer);
      } else {
        setValue(Math.floor(current));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {value.toLocaleString("ru-RU")}
      {suffix}
    </span>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/CountUpNumber.tsx
git commit -m "feat: add CountUpNumber component"
```

---

### Task 6: FunnelDiagram component

**Files:**
- Create: `src/components/FunnelDiagram.tsx`

- [ ] **Step 1: Create animated funnel SVG** — draws on scroll

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/FunnelDiagram.tsx
git commit -m "feat: add FunnelDiagram component with scroll animation"
```

---

## Chunk 3: Landing Page Sections (Hero, Familiar, Problem)

### Task 7: Header component

**Files:**
- Create: `src/components/Header.tsx`

- [ ] **Step 1: Create fixed header with logo and CTA**

```tsx
"use client";

import CTAButton from "./CTAButton";

export default function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <span className="text-xl font-bold text-dark">LeadPipe</span>
        <CTAButton text="Оставить заявку" />
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Header.tsx
git commit -m "feat: add Header component"
```

---

### Task 8: HeroSection

**Files:**
- Create: `src/components/HeroSection.tsx`

- [ ] **Step 1: Create Hero with floating message icons animation**

```tsx
"use client";

import { motion } from "framer-motion";
import CTAButton from "./CTAButton";

const floatingMessages = [
  { text: "Сколько стоит?", x: "10%", y: "20%", delay: 0 },
  { text: "Здравствуйте!", x: "75%", y: "15%", delay: 0.5 },
  { text: "Хочу записаться", x: "60%", y: "70%", delay: 1 },
  { text: "Есть в наличии?", x: "15%", y: "65%", delay: 1.5 },
  { text: "Подскажите...", x: "80%", y: "45%", delay: 2 },
];

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* Floating message bubbles that fade out */}
      {floatingMessages.map((msg, i) => (
        <motion.div
          key={i}
          className="absolute rounded-2xl bg-gray-100 px-4 py-2 text-sm text-muted"
          style={{ left: msg.x, top: msg.y }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0, 0.7, 0.7, 0],
            scale: [0.8, 1, 1, 0.6],
            y: [0, 0, 0, -60],
          }}
          transition={{
            duration: 4,
            delay: msg.delay,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        >
          {msg.text}
        </motion.div>
      ))}

      <div className="relative z-10 text-center">
        <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight text-dark md:text-6xl lg:text-7xl">
          Ты тратишь на рекламу.{" "}
          <span className="text-muted">Люди пишут.</span>{" "}
          <span className="text-accent">А дальше?</span>
        </h1>
        <div className="mt-12">
          <CTAButton text="Читай дальше" targetId="familiar" />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/HeroSection.tsx
git commit -m "feat: add HeroSection with floating messages animation"
```

---

### Task 9: FamiliarSection

**Files:**
- Create: `src/components/FamiliarSection.tsx`

- [ ] **Step 1: Create "Знакомо?" section with animated text**

```tsx
"use client";

import AnimatedText from "./AnimatedText";

const paragraphs = [
  "Ты запускаешь рекламу. Люди начинают писать.",
  "Кто-то спрашивает цену — ему ответили через три часа. Он уже нашёл другого.",
  "Кто-то написал вечером — ему ответили утром. Он забыл, о чём спрашивал.",
  "Кто-то задал вопрос, ему ответили, он сказал «подумаю» — и всё. Никто ему больше не написал.",
  "В конце месяца ты смотришь: на рекламу ушло нормально. Заявки были. А клиентов — три с половиной.",
];

export default function FamiliarSection() {
  return (
    <section
      id="familiar"
      className="flex min-h-screen flex-col items-center justify-center px-6 py-24"
    >
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-12 text-3xl font-bold text-dark md:text-5xl">
          Знакомо?
        </h2>
        <AnimatedText paragraphs={paragraphs} />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/FamiliarSection.tsx
git commit -m "feat: add FamiliarSection with storytelling text"
```

---

### Task 10: ProblemSection

**Files:**
- Create: `src/components/ProblemSection.tsx`

- [ ] **Step 1: Create "Вот в чём проблема" section with funnel**

```tsx
"use client";

import AnimatedText from "./AnimatedText";
import FunnelDiagram from "./FunnelDiagram";
import CTAButton from "./CTAButton";

const paragraphs = [
  "Заявки были нормальные. Люди реально интересовались.",
  "Просто им не ответили вовремя. Или ответили, но не довели. Или довели, но потом забыли напомнить.",
  "И ты этого даже не видишь. Ты не знаешь, на каком этапе они уходят. Ты не знаешь, сколько на самом деле стоит клиент, а не просто заявка.",
];

export default function ProblemSection() {
  return (
    <section
      id="problem"
      className="flex min-h-screen flex-col items-center justify-center bg-light px-6 py-24"
    >
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-12 text-3xl font-bold text-dark md:text-5xl">
          Вот в чём проблема
        </h2>
        <AnimatedText paragraphs={paragraphs} />
        <div className="mt-16">
          <FunnelDiagram />
        </div>
        <div className="mt-12 text-center">
          <CTAButton />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ProblemSection.tsx
git commit -m "feat: add ProblemSection with funnel diagram"
```

---

## Chunk 4: Landing Page Sections (Visibility, Solution, Form, Footer)

### Task 11: VisibilitySection

**Files:**
- Create: `src/components/VisibilitySection.tsx`

- [ ] **Step 1: Create "И ты наконец видишь" section with dashboard mockup**

```tsx
"use client";

import { motion } from "framer-motion";
import AnimatedText from "./AnimatedText";
import CountUpNumber from "./CountUpNumber";
import CTAButton from "./CTAButton";

const paragraphs = [
  "Ты открываешь одну страницу — и там всё.",
  "Сколько денег ушло на рекламу. Сколько людей по ней кликнули. Сколько из них написали. Какая реклама привела нормальных клиентов, а какая просто съела бюджет.",
  "Дальше видишь, что было в переписке: сколько человек назвали имя, сколько рассказали что нужно, сколько дошли до записи. И где именно люди перестают отвечать.",
  "Это не табличка в Excel и не отчёт от маркетолога. Это живая картина твоего бизнеса — обновляется сама, без твоего участия.",
];

const metrics = [
  { label: "Потрачено на рекламу", value: 85000, suffix: " ₽" },
  { label: "Написали", value: 120 },
  { label: "Реально заинтересованы", value: 45 },
  { label: "Стали клиентами", value: 18 },
  { label: "Цена заявки", value: 708, suffix: " ₽" },
  { label: "Цена клиента", value: 4722, suffix: " ₽" },
];

export default function VisibilitySection() {
  return (
    <section
      id="visibility"
      className="flex min-h-screen flex-col items-center justify-center px-6 py-24"
    >
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-12 text-3xl font-bold text-dark md:text-5xl">
          И ты наконец видишь, что происходит
        </h2>
        <AnimatedText paragraphs={paragraphs} />

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 rounded-2xl border border-gray-200 bg-white p-8 shadow-lg"
        >
          <div className="mb-4 flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-400" />
            <div className="h-3 w-3 rounded-full bg-yellow-400" />
            <div className="h-3 w-3 rounded-full bg-green-400" />
            <span className="ml-2 text-sm text-muted">LeadPipe — Твой бизнес</span>
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
            {metrics.map((m) => (
              <div key={m.label} className="text-center">
                <div className="text-2xl font-bold text-dark md:text-3xl">
                  <CountUpNumber
                    target={m.value}
                    suffix={m.suffix}
                  />
                </div>
                <div className="mt-1 text-sm text-muted">{m.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="mt-12 text-center">
          <CTAButton />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/VisibilitySection.tsx
git commit -m "feat: add VisibilitySection with dashboard mockup and count-up numbers"
```

---

### Task 12: SolutionSection

**Files:**
- Create: `src/components/SolutionSection.tsx`

- [ ] **Step 1: Create "Что мы делаем" section with chat animation**

```tsx
"use client";

import { motion } from "framer-motion";
import AnimatedText from "./AnimatedText";
import CTAButton from "./CTAButton";

const paragraphs = [
  "Каждому, кто написал — сразу отвечают. Не через час, не завтра. Сразу.",
  "Спрашивают что нужно, когда удобно, какая ситуация. Если человек замолчал — ему напишут, уточнят. Не навязчиво, по-человечески.",
  "Когда заявка готова — она уходит менеджеру. Не «строчка в табличке», а конкретный человек: зовут так, нужно вот это, удобно тогда-то.",
];

const chatMessages = [
  { from: "client", text: "Здравствуйте, сколько стоит консультация?" },
  { from: "bot", text: "Добрый день! Подскажите, как вас зовут?" },
  { from: "client", text: "Анна" },
  { from: "bot", text: "Анна, расскажите, что вас интересует?" },
  { from: "client", text: "Хочу разобраться с налогами для ИП" },
  { from: "bot", text: "Поняла. Когда вам удобно — завтра в 14:00 или в 16:00?" },
  { from: "client", text: "В 14 давайте" },
  { from: "bot", text: "Отлично, записала! Ссылку на встречу отправлю за час." },
];

export default function SolutionSection() {
  return (
    <section
      id="solution"
      className="flex min-h-screen flex-col items-center justify-center bg-light px-6 py-24"
    >
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-12 text-3xl font-bold text-dark md:text-5xl">
          Что мы делаем
        </h2>
        <AnimatedText paragraphs={paragraphs} />

        {/* Chat mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg"
        >
          <div className="space-y-3">
            {chatMessages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.2 }}
                className={`flex ${msg.from === "client" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${
                    msg.from === "client"
                      ? "bg-accent text-white"
                      : "bg-gray-100 text-dark"
                  }`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="mt-12 text-center">
          <CTAButton />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/SolutionSection.tsx
git commit -m "feat: add SolutionSection with chat animation"
```

---

### Task 13: FormSection (multi-step)

**Files:**
- Create: `src/components/FormSection.tsx`

- [ ] **Step 1: Create multi-step qualification form**

```tsx
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

const steps = [
  { key: "name" as const, question: "Как тебя зовут?", type: "text", placeholder: "Имя" },
  { key: "business" as const, question: "Какой у тебя бизнес?", type: "text", placeholder: "Например: стоматология, автосервис, онлайн-школа" },
  {
    key: "hasTraffic" as const,
    question: "Закупаешь трафик?",
    type: "select",
    options: ["Да", "Нет", "Планирую"],
  },
  {
    key: "leadsPerDay" as const,
    question: "Сколько заявок приходит в день?",
    type: "select",
    options: ["1–5", "5–20", "20+"],
  },
  {
    key: "whoAnswers" as const,
    question: "Кто сейчас отвечает на заявки?",
    type: "select",
    options: ["Сам", "Менеджер", "Отдел продаж", "Никто толком"],
  },
  {
    key: "messenger" as const,
    question: "Куда написать?",
    type: "select",
    options: ["Telegram", "WhatsApp"],
  },
  {
    key: "contact" as const,
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
        // silently fail — we'll handle errors later
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
          <h2 className="text-3xl font-bold text-dark md:text-5xl">
            Готово!
          </h2>
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

        {/* Progress bar */}
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
                      // auto-advance on select
                      setTimeout(() => setStep(step + 1), 300);
                    }}
                    className={`rounded-xl border px-5 py-4 text-left text-lg transition-colors ${
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
            className="mt-8 w-full rounded-full bg-accent px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-accent-dark disabled:opacity-40"
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
            className="mt-4 w-full text-center text-sm text-muted hover:text-dark"
          >
            Назад
          </button>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/FormSection.tsx
git commit -m "feat: add multi-step qualification form"
```

---

### Task 14: Footer

**Files:**
- Create: `src/components/Footer.tsx`

- [ ] **Step 1: Create footer**

```tsx
export default function Footer() {
  return (
    <footer id="footer" className="border-t border-gray-100 px-6 py-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center">
        <span className="text-xl font-bold text-dark">LeadPipe</span>
        <a
          href="https://t.me/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          Написать в Telegram
        </a>
        <p className="text-sm text-muted">
          &copy; {new Date().getFullYear()} LeadPipe
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "feat: add Footer component"
```

---

## Chunk 5: Assemble Page & API Route

### Task 15: Assemble all sections in page.tsx

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Import and compose all sections**

```tsx
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FamiliarSection from "@/components/FamiliarSection";
import ProblemSection from "@/components/ProblemSection";
import VisibilitySection from "@/components/VisibilitySection";
import SolutionSection from "@/components/SolutionSection";
import FormSection from "@/components/FormSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <HeroSection />
        <FamiliarSection />
        <ProblemSection />
        <VisibilitySection />
        <SolutionSection />
        <FormSection />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: assemble all sections in main page"
```

---

### Task 16: API route for form submission

**Files:**
- Create: `src/app/api/submit/route.ts`
- Create: `src/lib/telegram.ts`

- [ ] **Step 1: Create Telegram helper**

```ts
// src/lib/telegram.ts

export async function sendToTelegram(data: Record<string, string>) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error("Telegram credentials not configured");
    return;
  }

  const text = [
    "Новая заявка с LeadPipe:",
    "",
    `Имя: ${data.name}`,
    `Бизнес: ${data.business}`,
    `Трафик: ${data.hasTraffic}`,
    `Заявок в день: ${data.leadsPerDay}`,
    `Кто отвечает: ${data.whoAnswers}`,
    `Мессенджер: ${data.messenger}`,
    `Контакт: ${data.contact}`,
  ].join("\n");

  await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    }
  );
}
```

- [ ] **Step 2: Create API route**

```ts
// src/app/api/submit/route.ts

import { NextRequest, NextResponse } from "next/server";
import { sendToTelegram } from "@/lib/telegram";

export async function POST(req: NextRequest) {
  const data = await req.json();
  await sendToTelegram(data);
  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 3: Create `.env.local` template**

```bash
# .env.local (не коммитим)
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
```

Create `.env.example` (this one we commit):

```
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
```

- [ ] **Step 4: Add `.env.local` to `.gitignore`** — verify it's already there (Next.js adds it by default), if not add it.

- [ ] **Step 5: Commit**

```bash
git add src/lib/telegram.ts src/app/api/submit/route.ts .env.example
git commit -m "feat: add form submission API route with Telegram integration"
```

---

### Task 17: Final verification

- [ ] **Step 1: Run dev server and verify all sections render**

```bash
cd /Users/timur/leadpipe
npm run dev &
sleep 3
curl -s http://localhost:3000 | grep -c "section\|footer"
kill %1
```

- [ ] **Step 2: Run build to check for TypeScript errors**

```bash
cd /Users/timur/leadpipe
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 3: Fix any build errors if found, then commit**

```bash
git add -A
git commit -m "fix: resolve build issues"
```

- [ ] **Step 4: Final commit if all is clean**

```bash
git add -A
git commit -m "chore: landing page ready for deployment"
```
