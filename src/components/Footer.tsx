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
