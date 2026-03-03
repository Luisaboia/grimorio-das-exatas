import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-surface-200 bg-surface-50 border-surface-800 bg-surface-950">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 py-8 sm:flex-row sm:justify-between">
        <p className="text-sm text-surface-800/60 text-surface-50/60">
          Fórmulas IFPR © {new Date().getFullYear()}
        </p>
        <nav className="flex items-center gap-6">
          <Link
            href="/sobre"
            className="text-sm text-surface-800/60 transition-colors hover:text-primary-500 text-surface-50/60 hover:text-primary-400"
          >
            Sobre
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-surface-800/60 transition-colors hover:text-primary-500 text-surface-50/60 hover:text-primary-400"
          >
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}
