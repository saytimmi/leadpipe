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
