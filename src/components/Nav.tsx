"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { Logo } from "./Logo";

const navLinks = [
  { href: "/features", label: "Features" },
  { href: "/#memory", label: "Memory" },
  { href: "/#mcp", label: "MCP" },
  { href: "/#graph", label: "Graph" },
  { href: "/#speed", label: "Speed" },
  { href: "/#oss", label: "Open Source" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 80], [0, 1]);
  const blur = useTransform(scrollY, [0, 80], [0, 12]);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {mounted ? (
        <motion.div
          style={{ opacity, backdropFilter: blur.get() ? `blur(${blur.get()}px)` : undefined }}
          className="fixed inset-x-0 top-0 z-50 h-16 bg-ink-900/60"
        />
      ) : (
        <div
          suppressHydrationWarning
          className="fixed inset-x-0 top-0 z-50 h-16 bg-ink-900/60"
        />
      )}
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled ? "border-b border-ink-200/10" : ""
        )}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="group flex items-center gap-3">
            <Logo size={32} priority />
            <span className="hidden font-mono text-[10px] uppercase tracking-widest text-ink-300 sm:inline-block">
              v0.2
            </span>
          </Link>

          <div className="hidden items-center gap-1 rounded-full border border-ink-200/10 bg-ink-200/[0.03] p-1 md:flex">
            {navLinks.map((l) => (
              <NavLink key={l.href} href={l.href}>{l.label}</NavLink>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://github.com/ltfysl/biTurbo"
              className="hidden font-mono text-xs text-ink-200 transition-colors hover:text-ink sm:inline"
            >
              ★ GitHub
            </a>
            <Link href="/features" className="button-primary !px-3 !py-2 !text-xs hidden sm:inline-flex">
              Explore features →
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="relative z-[60] flex h-9 w-9 items-center justify-center rounded-full border border-ink-200/20 bg-ink-200/5 md:hidden"
              aria-label="Toggle menu"
            >
              <span className="sr-only">Menu</span>
              <div className="flex flex-col items-center justify-center gap-1">
                <span className={cn("block h-px w-4 bg-ink transition-transform duration-200", mobileOpen ? "translate-y-[2.5px] rotate-45" : "")} />
                <span className={cn("block h-px w-4 bg-ink transition-opacity duration-200", mobileOpen ? "opacity-0" : "opacity-100")} />
                <span className={cn("block h-px w-4 bg-ink transition-transform duration-200", mobileOpen ? "-translate-y-[2.5px] -rotate-45" : "")} />
              </div>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[55] bg-ink-900/95 backdrop-blur-xl md:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, delay: 0.05 }}
              className="flex h-full flex-col items-center justify-center gap-6 px-6"
              onClick={(e) => e.stopPropagation()}
            >
              {navLinks.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.04 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-display text-2xl font-bold text-ink transition-colors hover:text-moss"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <a
                  href="https://github.com/ltfysl/biTurbo"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-ink-900"
                >
                  ★ Star on GitHub
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="rounded-full px-3.5 py-1.5 text-xs font-medium text-ink-200/70 transition-colors hover:bg-ink-200/10 hover:text-ink"
    >
      {children}
    </Link>
  );
}
