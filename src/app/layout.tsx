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
