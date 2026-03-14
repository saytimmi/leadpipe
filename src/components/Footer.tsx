export default function Footer() {
  return (
    <footer id="footer" className="border-t border-dark/5 bg-dark px-6 py-20">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 text-center">
        <span className="font-display text-2xl font-800 text-white">
          lead<span className="text-accent">pipe</span>
        </span>
        <p className="max-w-md font-body text-base leading-relaxed text-white/40">
          Система, которая отвечает каждому клиенту, ведёт до конца
          и показывает реальные цифры твоего бизнеса.
        </p>
        <a
          href="https://t.me/"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-white/10 px-8 py-3 font-display text-sm font-600 text-white transition-all hover:border-white/30 hover:bg-white/5"
        >
          Написать в Telegram
        </a>
        <div className="h-px w-16 bg-white/10" />
        <p className="font-display text-xs text-white/20">
          &copy; {new Date().getFullYear()} LeadPipe
        </p>
      </div>
    </footer>
  );
}
