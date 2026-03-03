import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-surface-800 bg-surface-950">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 py-8 sm:flex-row sm:justify-between">
        <p className="text-sm text-surface-50/60">
          Grimório das Exatas © {new Date().getFullYear()}
        </p>
        <nav className="flex items-center gap-6">
          <Link
            href="/sobre"
            className="text-sm text-surface-50/60 transition-colors hover:text-primary-400"
          >
            Sobre
          </Link>
        </nav>
      </div>
    </footer>
  );
}
