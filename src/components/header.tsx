"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { nav } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open ? "bg-white/90 shadow-[0_8px_30px_rgb(15_35_80/8%)] backdrop-blur-xl" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-[4.6rem] max-w-[86rem] items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#uvod" className="relative z-20" aria-label="KAPE čištění — nahoru">
          <Logo />
        </a>

        <nav className="hidden items-center lg:flex" aria-label="Hlavní navigace">
          <div className="flex items-center gap-1 rounded-full bg-white/90 px-2 py-1.5 shadow-[0_10px_40px_rgb(15_35_80/10%)] ring-1 ring-white/80">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-3.5 py-2 text-[0.92rem] font-medium text-navy/80 transition-colors hover:bg-ice hover:text-navy"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#kontakt"
              className="rounded-full bg-primary px-4.5 py-2 text-[0.92rem] font-semibold text-white transition-colors hover:bg-primary/90"
            >
              Chci kalkulaci
            </a>
          </div>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            href="#kontakt"
            className="rounded-full bg-primary px-3.5 py-2 text-sm font-semibold text-white"
          >
            Kalkulace
          </a>
          <button
            type="button"
            className="relative z-20 inline-flex size-11 items-center justify-center rounded-full bg-white text-navy shadow-sm ring-1 ring-black/5"
            aria-expanded={open}
            aria-controls="mobilni-menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
            <span className="sr-only">{open ? "Zavřít menu" : "Otevřít menu"}</span>
          </button>
        </div>
      </div>

      <div
        id="mobilni-menu"
        hidden={!open}
        className="border-t border-black/5 bg-white lg:hidden"
      >
        <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Mobilní navigace">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-3 text-lg font-semibold text-navy hover:bg-ice"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#kontakt"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-primary px-4 py-3 text-center text-lg font-semibold text-white"
          >
            Chci kalkulaci
          </a>
        </nav>
      </div>
    </header>
  );
}
