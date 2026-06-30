"use client";

import * as React from "react";
import { Menu, X, Phone, Bus, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Buscador", href: "#buscador" },
  { label: "Líneas populares", href: "#lineas" },
  { label: "Servicios", href: "#servicios" },
  { label: "Empresa", href: "#empresa" },
  { label: "Dónde estamos", href: "#donde" },
  { label: "Contacto", href: "#contacto" },
];

export default function Header() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-[1000] w-full border-b transition-colors",
        scrolled
          ? "border-border bg-background/85 backdrop-blur-md shadow-sm"
          : "border-transparent bg-background"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="#top" className="flex shrink-0 items-center gap-2.5" onClick={close}>
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <Bus className="h-5 w-5" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-base font-extrabold tracking-tight text-foreground">
              Empresa Plana
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-primary">
              Costa Daurada · Catalunya
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <a
            href="tel:+34977553680"
            className="hidden items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm font-medium text-foreground transition hover:bg-muted md:flex"
          >
            <Phone className="h-3.5 w-3.5 text-primary" />
            <span className="font-mono">977 553 680</span>
          </a>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <a href="#buscador">Comprar billete</a>
          </Button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="flex h-10 w-10 items-center justify-center rounded-md text-foreground lg:hidden"
            aria-label="Abrir menú"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={close}
                className="flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted"
              >
                {item.label}
                <ChevronDown className="h-4 w-4 -rotate-90 text-muted-foreground" />
              </a>
            ))}
            <a
              href="tel:+34977553680"
              className="mt-1 flex items-center gap-2 rounded-md border border-border px-3 py-2.5 text-sm font-medium"
            >
              <Phone className="h-4 w-4 text-primary" />
              977 553 680
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
