import { Link, NavLink, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { Gem, Moon, Sun } from "lucide-react";
import { cx } from "../lib/assets";
import { useTheme } from "../lib/useTheme";

function ThemeToggle() {
  const [theme, toggle] = useTheme();
  const dark = theme === "dark";
  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="grid h-9 w-9 place-items-center rounded-lg border border-ink-200 bg-surface text-ink-600 transition hover:border-ink-300 hover:text-ink-900"
    >
      {dark ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}

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
      </span>
    </Link>
  );
}

const links = [
  { to: "/", label: "The Method", end: true },
  { to: "/tasks", label: "Golden Tasks" },
  { to: "/common-errors", label: "Common Errors" },
  { to: "/spec", label: "Scoring Spec" },
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
            <span className="mx-1.5 h-5 w-px bg-ink-200" />
            <ThemeToggle />
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="mt-24 border-t border-ink-200/70 bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-sm text-ink-500">
            <span className="font-semibold text-ink-700">Golden Task Viewer</span>, a learning environment for Blue Shell contributors.
          </div>
        </div>
      </footer>
    </div>
  );
}
