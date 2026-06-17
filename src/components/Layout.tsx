import { Link, NavLink, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { Gem, Github } from "lucide-react";
import { cx } from "../lib/assets";

function Brand() {
  return (
    <Link to="/" className="group flex items-center gap-2.5">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-950 text-gold-400 shadow-soft transition group-hover:scale-105">
        <Gem size={18} strokeWidth={2.2} />
      </span>
      <span className="leading-tight">
        <span className="block text-sm font-extrabold tracking-tight text-ink-900">
          Golden Task Viewer
        </span>
        <span className="block text-[11px] font-medium text-ink-400">
          Learn the reasoning, not just the result
        </span>
      </span>
    </Link>
  );
}

const links = [
  { to: "/", label: "The Method", end: true },
  { to: "/tasks", label: "Golden Tasks" },
];

export default function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-ink-200/70 bg-ink-50/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Brand />
          <nav className="flex items-center gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  cx(
                    "rounded-lg px-3.5 py-2 text-sm font-semibold transition",
                    isActive || (l.to === "/tasks" && pathname.startsWith("/tasks"))
                      ? "bg-brand-600 text-white shadow-glow"
                      : "text-ink-600 hover:bg-ink-100"
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
            <a
              href="https://pages.github.com/"
              target="_blank"
              rel="noreferrer"
              className="ml-1 hidden rounded-lg p-2 text-ink-400 transition hover:bg-ink-100 hover:text-ink-700 sm:block"
              title="Deploy anywhere"
            >
              <Github size={18} />
            </a>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="mt-24 border-t border-ink-200/70 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="text-sm text-ink-500">
              <span className="font-semibold text-ink-700">Golden Task Viewer</span> — an
              interactive learning environment for Blue Shell contributors.
            </div>
            <div className="text-xs text-ink-400">
              Built from the Complexity Playbook + task rationale.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
