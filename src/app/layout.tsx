import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LeadPipe — Перестань терять клиентов",
  description:
    "Система, которая мгновенно отвечает каждому клиенту, ведёт до записи и показывает реальные цифры твоего бизнеса. Для малого и среднего бизнеса.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
