# Landing Page Rework Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rework LeadPipe landing page to communicate the AI bot + analytics value proposition clearly, based on customer feedback showing people don't understand the product.

**Architecture:** Update existing section components with new copy, add multi-niche WhatsApp demo tabs, simplified dashboard, pricing section, and social proof. No new pages — all changes within existing component files.

**Tech Stack:** Next.js 16, React 19, Framer Motion 12, Tailwind CSS 4

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `src/components/HeroSection.tsx` | Modify | New headline, subheadline, tech line |
| `src/components/StorySection.tsx` | Modify | Updated copy with more niches, Instagram |
| `src/components/ProblemSection.tsx` | Modify | Non-round realistic numbers, simplified labels |
| `src/components/SolutionSection.tsx` | Modify | Multi-niche demo tabs, "живой менеджер" line, rename to AI-agent focus |
| `src/components/VisibilitySection.tsx` | Modify | Simplified creative comparison dashboard |
| `src/components/FormSection.tsx` | Modify | Add pricing, WhatsApp CTA button, guarantee |
| `src/components/NicheBadges.tsx` | Create | Horizontal scrolling niche badges component |
| `src/components/SocialProof.tsx` | Create | Case study / results section |
| `src/app/page.tsx` | Modify | Reorder sections, add SocialProof, remove TransitionArrow between some sections |

---

## Chunk 1: Hero + Story (copy updates)

### Task 1: Update HeroSection copy

**Files:**
- Modify: `src/components/HeroSection.tsx`

- [ ] **Step 1: Read current HeroSection**

Run: Read `src/components/HeroSection.tsx` in full

- [ ] **Step 2: Update headline text**

Replace the three headline lines:
```
Line 1: "Знай куда"        →  "Умная воронка"
Line 2: "ушёл каждый"      →  "от рекламы"
Line 3: "доллар."           →  "до оплаты."
```

Keep the same animation structure (3 lines, staggered 0.12s, y="110%" → "0%"). Keep color scheme: line 1 default, line 2 text-muted, line 3 text-lime.

- [ ] **Step 3: Update subheadline text**

Replace current right-aligned subtext with:
```
AI-агент сам отвечает клиентам и ведёт по каждому этапу до визита.
А ты видишь какой креатив реально приносит деньги, а какой сливает бюджет.
```

- [ ] **Step 4: Add tech line below subheadline**

Add a new line below the subheadline, smaller and muted:
```tsx
<motion.p
  className="mt-4 text-xs md:text-sm text-text-muted font-body tracking-wide"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 1.2, duration: 0.8 }}
>
  Instagram · WhatsApp · CRM — всё связано. В реальном времени.
</motion.p>
```

- [ ] **Step 5: Verify in browser**

Run: `cd /Users/timur/leadpipe && npm run dev`
Open http://localhost:3000, verify:
- 3 headline lines animate correctly
- Subheadline readable on mobile and desktop
- Tech line appears after headline animation

- [ ] **Step 6: Commit**

```bash
cd /Users/timur/leadpipe
git add src/components/HeroSection.tsx
git commit -m "feat: update Hero section copy — new value proposition"
```

---

### Task 2: Update StorySection copy

**Files:**
- Modify: `src/components/StorySection.tsx`

- [ ] **Step 1: Read current StorySection**

Run: Read `src/components/StorySection.tsx` in full

- [ ] **Step 2: Update the lines array**

Replace the current `lines` array content. Key changes:
- First line: "У ТЕБЯ БИЗНЕС." stays
- Second line niches: add "фитнес, онлайн-школа, ремонт квартир, агентство недвижимости"
- Change "Он запустил три кампании" → "Он запустил 6 объявлений в Instagram"
- Change "Бюджет — $2 560" → "Бюджет — $3 100 за месяц"
- Change "1 280 лидов. Лид — $2" → "847 заявок, лид по $3.60 — отличный результат!"
- Change "В WhatsApp написали 890. 390 — потерялись" → "847 человек написали в WhatsApp. А дальше что?"
- Add new lines:
  - "312 — написали вечером или в выходные. Админ ответил через 4-6 часов. Они уже записались к конкуренту."
  - "168 — спросили цену и пропали. Никто не написал им повторно."
  - "94 — хотели записаться, но им не ответили на второе сообщение."
- Keep big highlighted line: "Лид стоил $3.60. Клиент который заплатил — $281."
- Final lines:
  - "Эти 11 клиентов — они пришли с какого объявления?"
  - "С первого? С третьего? С шестого?"
  - "Ты не знаешь. Таргетолог не знает. Никто не знает." (big, warm)

Preserve existing animation structure — each line gets a position in the scroll progress, with StoryLine opacity/color transforms.

- [ ] **Step 3: Adjust section height if needed**

If total lines increased significantly, increase the outer div height from `h-[200vh]` to `h-[250vh]` or `h-[280vh]` to give each line enough scroll space.

- [ ] **Step 4: Verify scroll reading experience**

Run dev server, scroll through story section:
- Each line should fade in/out smoothly
- No lines should overlap or skip
- Big lines should be visually prominent
- Pacing should feel natural — not too fast, not too slow

- [ ] **Step 5: Commit**

```bash
cd /Users/timur/leadpipe
git add src/components/StorySection.tsx
git commit -m "feat: update Story section — new copy, more niches, realistic numbers"
```

---

## Chunk 2: Funnel + AI Agent sections

### Task 3: Update ProblemSection with realistic numbers

**Files:**
- Modify: `src/components/ProblemSection.tsx`

- [ ] **Step 1: Read current ProblemSection**

Run: Read `src/components/ProblemSection.tsx` in full

- [ ] **Step 2: Update marquee industries**

Add missing niches to the marquee: "Фитнес", "Онлайн-школа", "Ремонт квартир" if not already present.

- [ ] **Step 3: Update funnel data array**

Replace current funnel items with non-round realistic numbers:

```typescript
const funnel = [
  { label: "Увидели рекламу", value: "634 000", color: "text-text-dim" },
  { label: "Кликнули", value: "8 370", sub: "CTR 1.3% · CPC $0.37", color: "text-text-dim" },
  { label: "Написали в WhatsApp", value: "847", sub: "Лид $3.60", color: "text-lime", big: true },
  { label: "Получили быстрый ответ", value: "380", sub: "467 ждали часами", color: "text-text" },
  { label: "Назвали имя, описали что нужно", value: "174", color: "text-text" },
  { label: "Услышали оффер до конца", value: "63", color: "text-text-muted" },
  { label: "Пришли / заплатили", value: "11", color: "text-lime", big: true },
];
```

- [ ] **Step 4: Update bottom summary**

Change bottom text:
```
"Цена одного клиента: $281"
"847 заявок → 11 клиентов. А таргетолог рапортует «лид по $3.60, всё отлично»."
```

- [ ] **Step 5: Update section heading text**

Left column text: "Вот реальная воронка типичного бизнеса за месяц. Посмотри, на каком этапе люди уходят — и сколько на самом деле стоит один клиент."

- [ ] **Step 6: Verify in browser**

Check:
- Bars render with correct proportions
- Numbers are non-round and realistic
- Bottom summary is visible and impactful

- [ ] **Step 7: Commit**

```bash
cd /Users/timur/leadpipe
git add src/components/ProblemSection.tsx
git commit -m "feat: update funnel section — realistic non-round numbers"
```

---

### Task 4: Rework SolutionSection — AI Agent with multi-niche demos

**Files:**
- Modify: `src/components/SolutionSection.tsx`

This is the biggest change. The current section has 6 capability cards + 1 WhatsApp demo. We need to:
1. Change section title to focus on AI agent
2. Add intro copy explaining the bot
3. Add niche tabs for WhatsApp demo (3 demos)
4. Add "переключает на живого менеджера" line
5. Add critical connection: "bot records every step → that's where analytics comes from"
6. Keep iPhone mockup structure, make demos switchable

- [ ] **Step 1: Read current SolutionSection in full**

Run: Read `src/components/SolutionSection.tsx` lines 1-329

- [ ] **Step 2: Update section label and title**

Change from "04" to "03" (since this now comes as section 4 in the new order, after Problem).
Change title from "Почему мы тебе полезны" to "AI-агент который продаёт за тебя"

- [ ] **Step 3: Replace capability cards with intro copy**

Remove the 6 capability cards grid. Replace with intro text:

```tsx
<div className="space-y-6 text-base md:text-lg font-body text-text-muted leading-relaxed max-w-lg">
  <p className="text-text">
    Представь что у тебя появился идеальный продавец в WhatsApp.
  </p>
  <p>
    Он отвечает за 3 секунды. Днём, ночью, в выходные — без пауз.
  </p>
  <p>
    Он не пишет «Здравствуйте, чем могу помочь?» и не просит «выберите из списка.»
  </p>
  <p className="text-text">
    Он разговаривает как живой человек:
  </p>
</div>
```

- [ ] **Step 4: Add niche tabs above WhatsApp demo**

Add 3 tabs that switch the WhatsApp conversation:

```tsx
const niches = [
  { id: "dental", label: "Стоматология" },
  { id: "repair", label: "Ремонт квартир" },
  { id: "fitness", label: "Фитнес" },
];

// Tab buttons
<div className="flex gap-2 mb-4">
  {niches.map((niche) => (
    <button
      key={niche.id}
      onClick={() => setActiveNiche(niche.id)}
      className={`px-4 py-2 rounded-full text-sm font-body transition-colors ${
        activeNiche === niche.id
          ? "bg-lime text-bg font-600"
          : "bg-white/[0.06] text-text-muted hover:text-text"
      }`}
    >
      {niche.label}
    </button>
  ))}
</div>
```

- [ ] **Step 5: Create 3 conversation datasets**

Define message arrays for each niche. Keep the existing dental conversation (Айгерим). Add:

**Repair conversation:**
```typescript
const repairMessages = [
  { type: "message", from: "client", text: "здравствуйте, сколько стоит ремонт кухни?", time: "21:47" },
  { type: "message", from: "bot", text: "Добрый вечер! Подскажите, какой у вас метраж кухни примерно?", time: "21:47" },
  { type: "message", from: "client", text: "12 квадратов", time: "21:48" },
  { type: "message", from: "bot", text: "Отлично. А что хотите сделать — освежить стены и потолок, или полностью всё: пол, плитка, мебель под ключ?", time: "21:48" },
  { type: "message", from: "client", text: "полностью хочу, надоело уже", time: "21:49" },
  { type: "message", from: "bot", text: "Понимаю) Полный ремонт кухни 12м² у нас от 850 000 тенге — с материалами и работой. Делаем за 2-3 недели. Когда удобно чтобы замерщик приехал? Могу предложить завтра после 14:00 или субботу утром.", time: "21:49" },
  { type: "date", text: "2 дня спустя" },
  { type: "message", from: "bot", text: "Здравствуйте! Вы ещё думаете насчёт ремонта кухни? На эту неделю есть свободная бригада — если записаться на замер сейчас, можем начать уже через 5 дней 🙂", time: "10:15" },
  { type: "message", from: "client", text: "да давайте на субботу замерщика", time: "10:22" },
  { type: "message", from: "bot", text: "Записала! Суббота, 10:00. Замерщик Ерлан приедет, посмотрит кухню и посчитает точную стоимость — это бесплатно. За 2 часа напомню. Будут вопросы — пишите!", time: "10:22" },
];
```

**Fitness conversation:**
```typescript
const fitnessMessages = [
  { type: "message", from: "client", text: "привет, сколько стоит абонемент?", time: "22:31" },
  { type: "message", from: "bot", text: "Привет! У нас два варианта — безлимит за 35 000 тг/мес и утренний (до 14:00) за 25 000. Вы раньше занимались или хотите начать?", time: "22:31" },
  { type: "message", from: "client", text: "хочу начать, но не уверена", time: "22:33" },
  { type: "message", from: "bot", text: "Тогда приходите на пробную тренировку — это бесплатно, познакомитесь с тренером и залом. Если понравится — запишетесь. Без давления 🙂 Когда удобно — завтра вечером или в субботу утром?", time: "22:33" },
  { type: "message", from: "client", text: "а в субботу во сколько?", time: "22:35" },
  { type: "message", from: "bot", text: "В субботу есть групповая HIIT в 10:00 — отличный вариант для старта, тренер Серик, он очень внимательный к новичкам. Или персональная в 11:30.", time: "22:35" },
  { type: "message", from: "client", text: "давайте на групповую", time: "22:36" },
  { type: "message", from: "bot", text: "Записала! Суббота, 10:00, групповая HIIT, тренер Серик. Адрес: ул. Жандосова 58, 2 этаж. Возьмите кроссовки и воду. За 2 часа напомню 🙂", time: "22:36" },
];
```

- [ ] **Step 6: Switch messages based on active tab**

Use `useState` for `activeNiche`, render the correct messages array in the iPhone mockup. Use `AnimatePresence` + `motion.div` with key={activeNiche} for smooth transition when switching tabs:

```tsx
<AnimatePresence mode="wait">
  <motion.div
    key={activeNiche}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3 }}
  >
    {/* render messages for activeNiche */}
  </motion.div>
</AnimatePresence>
```

- [ ] **Step 7: Add "живой менеджер" callout after demo**

Below the iPhone mockup, add:

```tsx
<p className="text-center text-sm text-text-muted mt-6 max-w-sm mx-auto">
  Если клиент задаёт вопрос, на который бот не может ответить — он сразу переключает на живого менеджера.
</p>
```

- [ ] **Step 8: Add analytics connection copy after demo**

Below the callout, add the critical bridge text:

```tsx
<div className="mt-12 md:mt-16 max-w-2xl mx-auto text-center space-y-4">
  <p className="text-lg md:text-xl font-display font-600 text-text">
    А теперь самое важное.
  </p>
  <p className="text-base md:text-lg font-body text-text-muted leading-relaxed">
    Этот продавец записывает каждый шаг. Кто написал, с какого объявления пришёл, на каком этапе разговора замолчал, кого дожал, кто записался и кто заплатил.
  </p>
  <p className="text-base md:text-lg font-body text-text leading-relaxed">
    Вот откуда берётся аналитика. Не из рекламного кабинета. Из реальных разговоров с реальными людьми.
  </p>
</div>
```

- [ ] **Step 9: Verify in browser**

Check:
- Tabs switch correctly, conversation changes with smooth animation
- iPhone mockup renders correctly for all 3 niches
- Message typing animation works for each conversation
- "Живой менеджер" and analytics connection text visible below demo
- Mobile layout works (tabs may need to scroll horizontally on small screens)

- [ ] **Step 10: Commit**

```bash
cd /Users/timur/leadpipe
git add src/components/SolutionSection.tsx
git commit -m "feat: rework AI agent section — multi-niche demos, human fallback, analytics bridge"
```

---

## Chunk 3: Dashboard + Setup + Pricing + Social Proof

### Task 5: Simplify VisibilitySection to creative comparison

**Files:**
- Modify: `src/components/VisibilitySection.tsx`

- [ ] **Step 1: Read current VisibilitySection**

Run: Read `src/components/VisibilitySection.tsx` in full

- [ ] **Step 2: Update section title**

Change from "И ты наконец видишь всё" to "Рентген бюджета"
Change section number from "03" to "04"

- [ ] **Step 3: Update intro text**

Left column description:
```
"И вот ты открываешь LeadPipe и видишь то, что никогда не покажет рекламный кабинет:"
```

- [ ] **Step 4: Replace dashboard metrics with creative comparison**

Remove the complex metrics grid (Budget, Impressions, Clicks, etc.) and qualification stages. Replace with a focused creative comparison table:

```typescript
const creatives = [
  {
    id: "#3",
    label: "Фото до/после",
    leads: 127,
    conversations: 43,
    qualified: 19,
    paid: 7,
    color: "lime",
  },
  {
    id: "#5",
    label: "Видео с мастером",
    leads: 89,
    conversations: 51,
    qualified: 24,
    paid: 4,
    color: "lime",
  },
  {
    id: "#1",
    label: 'Акция "скидка 30%"',
    leads: 341,
    conversations: 112,
    qualified: 8,
    paid: 0,
    color: "warm",
  },
];
```

Render as 3 rows inside the browser-frame dashboard. Each row shows:
- Creative name (left)
- Mini funnel: leads → conversations → qualified → paid (right, with animated bars)
- Paid count highlighted (lime for > 0, warm/red for 0)

- [ ] **Step 5: Add callout text below dashboard**

```tsx
<div className="mt-8 space-y-3 text-center max-w-xl mx-auto">
  <p className="text-base md:text-lg font-body text-text">
    341 заявка — и ни одной оплаты. Треть бюджета в мусорку.
  </p>
  <p className="text-sm md:text-base font-body text-text-muted">
    Без LeadPipe ты бы думал что объявление #1 — лучшее. Потому что 341 заявка.
  </p>
  <p className="text-base md:text-lg font-display font-600 text-lime">
    За один месяц это экономит $800–1 200 рекламного бюджета.
  </p>
</div>
```

- [ ] **Step 6: Remove features list (right column)**

The 4 feature bullets with emojis are no longer needed — the dashboard now speaks for itself. Remove the features array and its rendering.

- [ ] **Step 7: Verify in browser**

Check:
- Dashboard renders with 3 creative rows
- Bars animate on scroll into view
- "0 оплат" for creative #1 is visually distinct (warm color)
- Callout text is readable
- Mobile layout works

- [ ] **Step 8: Commit**

```bash
cd /Users/timur/leadpipe
git add src/components/VisibilitySection.tsx
git commit -m "feat: simplify dashboard to creative comparison — focus on paid results"
```

---

### Task 6: Create NicheBadges component

**Files:**
- Create: `src/components/NicheBadges.tsx`

- [ ] **Step 1: Create component**

```tsx
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
          className="rounded-full border border-white/[0.08] bg-surface px-4 py-2 text-xs md:text-sm font-body text-text-muted"
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
```

- [ ] **Step 2: Commit**

```bash
cd /Users/timur/leadpipe
git add src/components/NicheBadges.tsx
git commit -m "feat: add NicheBadges component"
```

---

### Task 7: Update FormSection — pricing, WhatsApp CTA, guarantee, niche badges

**Files:**
- Modify: `src/components/FormSection.tsx`

- [ ] **Step 1: Read current FormSection**

Run: Read `src/components/FormSection.tsx` in full

- [ ] **Step 2: Add setup section content above CTA**

Before the CTA button area, add "Под ключ за 7 дней" content:

```tsx
import NicheBadges from "./NicheBadges";

// Inside the component, above the CTA:
<div className="space-y-8 text-center max-w-2xl mx-auto mb-16">
  <p className="text-base md:text-lg font-body text-text-muted leading-relaxed">
    Ты не покупаешь конструктор и не настраиваешь бота сам. Мы подключаем твой Instagram, WhatsApp и CRM — настраиваем AI-агента под твой бизнес — и через 7 дней ты видишь первые данные.
  </p>

  {/* 3 steps */}
  <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-center">
    {["Подключаем Instagram, WhatsApp и CRM", "Настраиваем AI-агента под твой бизнес", "Через 7 дней — первые данные"].map((step, i) => (
      <motion.div
        key={i}
        className="flex items-center gap-3 md:flex-col md:items-center md:text-center"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.1, duration: 0.4 }}
      >
        <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-lime text-bg text-sm font-display font-700">
          {i + 1}
        </span>
        <span className="text-sm md:text-base font-body text-text-muted">{step}</span>
      </motion.div>
    ))}
  </div>

  <NicheBadges />
</div>
```

- [ ] **Step 3: Add pricing indication**

Below the setup content, add:

```tsx
<p className="text-lg md:text-xl font-display font-600 text-text mb-2">
  от $149/мес
</p>
<p className="text-sm text-text-muted mb-8">
  Зависит от количества заявок и точек
</p>
```

- [ ] **Step 4: Add guarantee text**

```tsx
<p className="text-sm md:text-base font-body text-text-muted max-w-md mx-auto mb-8">
  Если за 30 дней LeadPipe не покажет какие объявления сливают бюджет — вернём деньги. Не пробный период. Гарантия результата.
</p>
```

- [ ] **Step 5: Add WhatsApp CTA button alongside form button**

Add a second button below the main "Начать" button:

```tsx
<div className="flex flex-col items-center gap-3">
  <motion.button
    onClick={open}
    className="rounded-full bg-lime px-10 py-4 md:px-14 md:py-5 font-display text-base md:text-lg font-700 text-bg"
    whileTap={{ scale: 0.92 }}
  >
    Оставить заявку
  </motion.button>
  <a
    href="https://wa.me/YOUR_NUMBER?text=Привет! Хочу узнать про LeadPipe"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 text-sm text-text-muted hover:text-text transition-colors"
  >
    или написать в WhatsApp
  </a>
</div>
```

Note: Replace `YOUR_NUMBER` with actual LeadPipe WhatsApp number.

- [ ] **Step 6: Verify in browser**

Check:
- 3 steps render horizontally on desktop, vertically on mobile
- Niche badges wrap correctly
- Pricing is visible and clear
- Both CTA buttons work
- Guarantee text is readable

- [ ] **Step 7: Commit**

```bash
cd /Users/timur/leadpipe
git add src/components/FormSection.tsx src/components/NicheBadges.tsx
git commit -m "feat: update CTA section — pricing, guarantee, WhatsApp button, niche badges"
```

---

### Task 8: Create SocialProof component

**Files:**
- Create: `src/components/SocialProof.tsx`

- [ ] **Step 1: Create component**

```tsx
"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "30–40%", label: "экономия рекламного бюджета" },
  { value: "x2.5", label: "рост конверсии в оплату" },
  { value: "3 сек", label: "время ответа на заявку" },
];

export default function SocialProof() {
  return (
    <section className="relative px-6 py-20 md:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <motion.p
          className="text-sm font-body text-text-muted uppercase tracking-widest mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Результаты первых клиентов за 30 дней
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <p className="text-3xl md:text-4xl font-display font-700 text-lime">
                {stat.value}
              </p>
              <p className="text-sm md:text-base font-body text-text-muted">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Case study placeholder - replace with real case when available */}
        <motion.div
          className="mt-16 rounded-2xl border border-white/[0.06] bg-surface p-8 md:p-10 text-left max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <p className="text-sm text-text-muted font-body mb-4">Кейс</p>
          <p className="text-base md:text-lg font-body text-text leading-relaxed">
            Стоматология в Алматы, 3 кресла. Тратили $2 800/мес на рекламу — 8 клиентов с рекламы.
          </p>
          <p className="text-base md:text-lg font-body text-text leading-relaxed mt-3">
            Через месяц с LeadPipe: тот же бюджет, <span className="text-lime font-600">23 клиента</span>. Отключили 2 объявления которые сливали 40% бюджета.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/timur/leadpipe
git add src/components/SocialProof.tsx
git commit -m "feat: add SocialProof component with stats and case study"
```

---

### Task 9: Update page.tsx — new section order

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Read current page.tsx**

Run: Read `src/app/page.tsx` in full

- [ ] **Step 2: Import SocialProof**

Add import at top:
```tsx
import SocialProof from "@/components/SocialProof";
```

- [ ] **Step 3: Update section order**

New order:
```tsx
<FormModalProvider>
  <PageViewTracker />
  <Header />
  <main>
    <SectionTracker name="hero"><HeroSection /></SectionTracker>
    <SectionTracker name="story"><StorySection /></SectionTracker>
    <TransitionArrow />
    <SectionTracker name="problem"><ProblemSection /></SectionTracker>
    <SectionDivider />
    <SectionTracker name="solution"><SolutionSection /></SectionTracker>
    <SectionDivider />
    <SectionTracker name="visibility"><VisibilitySection /></SectionTracker>
    <SectionDivider />
    <SectionTracker name="proof"><SocialProof /></SectionTracker>
    <SectionDivider />
    <SectionTracker name="form"><FormSection /></SectionTracker>
  </main>
  <Footer />
</FormModalProvider>
```

Key changes:
- SolutionSection (AI agent) moved BEFORE VisibilitySection (dashboard)
- SocialProof added between dashboard and form
- VisibilitySection removed from its old position

- [ ] **Step 4: Verify full page flow**

Run dev server, scroll through entire page:
1. Hero — new copy ✓
2. Story — new niches, Instagram, realistic numbers ✓
3. Arrow transition
4. Problem — non-round funnel ✓
5. Divider
6. AI Agent — multi-niche demos, human fallback ✓
7. Divider
8. Dashboard — creative comparison ✓
9. Divider
10. Social Proof — stats + case ✓
11. Divider
12. CTA — pricing, guarantee, WhatsApp ✓
13. Footer

- [ ] **Step 5: Commit**

```bash
cd /Users/timur/leadpipe
git add src/app/page.tsx
git commit -m "feat: reorder sections — AI agent before dashboard, add social proof"
```

---

### Task 10: Update section numbers across all components

**Files:**
- Modify: Multiple section components

- [ ] **Step 1: Update section label numbers**

Go through each section component and update the "0X" labels to match new order:
- StorySection: "01" → keep "01"
- ProblemSection: "02" → keep "02"
- SolutionSection: "04" → change to "03"
- VisibilitySection: "03" → change to "04"
- FormSection: "05" → change to "05" (stays same)

- [ ] **Step 2: Verify all numbers in browser**

Scroll through and check each section label shows correct number.

- [ ] **Step 3: Commit**

```bash
cd /Users/timur/leadpipe
git add src/components/SolutionSection.tsx src/components/VisibilitySection.tsx
git commit -m "fix: update section numbers to match new order"
```

---

### Task 11: Final verification and build check

- [ ] **Step 1: Run production build**

```bash
cd /Users/timur/leadpipe && npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 2: Run lint**

```bash
cd /Users/timur/leadpipe && npm run lint
```

Expected: No errors.

- [ ] **Step 3: Visual QA in dev mode**

Run `npm run dev`, check:
- [ ] Hero animations work
- [ ] Story scroll pacing is smooth
- [ ] Funnel bars animate
- [ ] AI agent tabs switch smoothly
- [ ] Dashboard creative comparison renders
- [ ] Social proof stats animate
- [ ] Pricing visible
- [ ] WhatsApp button links correctly
- [ ] Mobile responsive on all sections
- [ ] No broken layouts or overflow issues

- [ ] **Step 4: Final commit if any fixes needed**

```bash
cd /Users/timur/leadpipe
git add -A
git commit -m "fix: final QA adjustments for landing rework"
```
