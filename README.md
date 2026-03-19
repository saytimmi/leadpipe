# LeadPipe

Лендинг + аналитика для LeadPipe — бот, который автоматически обрабатывает заявки через WhatsApp.

## Stack

- **Frontend:** Next.js 16, React 19, Framer Motion, Tailwind CSS 4
- **Database:** Neon (Serverless Postgres)
- **Deploy:** Vercel
- **Уведомления:** Telegram Bot

## Структура

```
src/
├── app/
│   ├── page.tsx                          # Лендинг
│   ├── stats/                            # Страница статистики
│   └── api/
│       ├── analytics/
│       │   ├── pageview/route.ts         # Трекинг визитов
│       │   ├── section/route.ts          # Трекинг секций
│       │   ├── section-time/route.ts     # Время на секции
│       │   ├── form/route.ts             # События формы
│       │   ├── stats/route.ts            # GET — сводная статистика (x-stats-key)
│       │   └── digest/route.ts           # GET — дайджест в Telegram (cron)
│       ├── submit/route.ts               # Отправка заявки → Telegram
│       └── telegram/webhook/route.ts     # Telegram бот (команды /stats, /today, /leads)
└── lib/
    ├── db.ts                             # Neon Postgres клиент
    ├── analytics.ts                      # Клиентский трекинг (browser)
    ├── digest.ts                         # Генерация отчётов + Telegram отправка
    └── telegram.ts                       # Отправка заявок в Telegram
```

## БД (Neon)

Три таблицы:
- `lp_page_views` — визиты (session_id, referrer, utm_*, country)
- `lp_section_views` — просмотры секций (session_id, section, time_spent_ms)
- `lp_form_events` — события формы (session_id, event, step_name, value)

## Telegram бот

Команды:
- `/today` — статистика за сегодня
- `/stats` / `/stats 7` / `/stats 30` — полный отчёт
- `/leads` / `/leads 14` — заявки по дням
- `/funnel` — воронка за 7 дней

## Env

```
DATABASE_URL=           # Neon Postgres connection string
TELEGRAM_BOT_TOKEN=     # Telegram бот токен
TELEGRAM_CHAT_ID=       # Chat ID для уведомлений
STATS_SECRET=           # Ключ для /api/analytics/stats
CRON_SECRET=            # Ключ для /api/analytics/digest (Vercel cron)
```

## Deploy

```bash
npx vercel --prod
```
