import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
