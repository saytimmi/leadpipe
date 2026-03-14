export default function Footer() {
  return (
    <footer id="footer" className="border-t border-gray-100 bg-dark px-6 py-16">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
            <span className="text-sm font-bold text-white">L</span>
          </div>
          <span className="text-xl font-bold text-white">LeadPipe</span>
        </div>
        <p className="max-w-md text-sm text-gray-400">
          Система, которая отвечает каждому клиенту, ведёт до конца и показывает
          реальные цифры твоего бизнеса.
        </p>
        <a
          href="https://t.me/"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-white/10 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/20"
        >
          Написать в Telegram
        </a>
        <p className="text-xs text-gray-500">
          &copy; {new Date().getFullYear()} LeadPipe
        </p>
      </div>
    </footer>
  );
}
