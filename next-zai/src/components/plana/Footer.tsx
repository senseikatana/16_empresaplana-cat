"use client";

import { Bus, Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter } from "lucide-react";

const FOOTER_LINKS = [
  {
    title: "Empresa",
    links: [
      { label: "Empresa Plana", href: "#empresa" },
      { label: "Dónde estamos", href: "#donde" },
      { label: "Trabaja con nosotros", href: "#contacto" },
      { label: "Solicitar presupuesto", href: "#contacto" },
    ],
  },
  {
    title: "Rutas y horarios",
    links: [
      { label: "Buscador de líneas", href: "#buscador" },
      { label: "Líneas populares", href: "#lineas" },
      { label: "Aeroport de Barcelona", href: "#buscador" },
      { label: "Aeroport de Reus", href: "#buscador" },
    ],
  },
  {
    title: "Servicios",
    links: [
      { label: "Transportes discrecionales", href: "#servicios" },
      { label: "Transporte escolar", href: "#servicios" },
      { label: "Transfers", href: "#servicios" },
      { label: "Viajes turísticos", href: "#servicios" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Bus className="h-5 w-5" />
              </span>
              <div className="flex flex-col leading-none">
                <span className="text-lg font-extrabold">Empresa Plana</span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-primary">
                  Costa Daurada · Catalunya
                </span>
              </div>
            </div>
            <p className="max-w-xs text-sm text-background/70">
              Empresa Plana, SL · CIF B-43009091. Más de 60 años de experiencia
              en el transporte de personas en líneas regulares, transfers a
              aeropuertos y servicios discrecionales.
            </p>
            <div className="flex items-center gap-2">
              <a
                href="https://www.facebook.com/BusPlana"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-background/10 transition hover:bg-background/20"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/busplana/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-background/10 transition hover:bg-background/20"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-background/10 transition hover:bg-background/20"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map((col) => (
            <div key={col.title}>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-background/60">
                {col.title}
              </h3>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-background/80 transition hover:text-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact strip */}
        <div className="mt-10 grid gap-4 border-t border-background/10 pt-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-start gap-2.5">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <div className="text-sm">
              <div className="font-medium">Oficina central</div>
              <div className="text-background/70">C/ Cristòfor Colom, 29 · 43001 Tarragona</div>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <div className="text-sm">
              <div className="font-medium">Teléfono</div>
              <a href="tel:+34977553680" className="font-mono text-background/70 hover:text-primary">
                +34 977 553 680
              </a>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <div className="text-sm">
              <div className="font-medium">Correo</div>
              <a href="mailto:info@empresaplana.cat" className="text-background/70 hover:text-primary">
                info@empresaplana.cat
              </a>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <div className="text-sm">
              <div className="font-medium">Atención al cliente</div>
              <div className="text-background/70">Lun-Sáb 8:00-22:00 · Dom 10:00-19:00</div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-background/10 pt-6 text-xs text-background/60 sm:flex-row">
          <p>© {new Date().getFullYear()} Empresa Plana, SL · Todos los derechos reservados</p>
          <div className="flex items-center gap-4">
            <a href="#" className="transition hover:text-primary">Aviso Legal</a>
            <a href="#" className="transition hover:text-primary">Política de Cookies</a>
            <a href="#" className="transition hover:text-primary">Política de Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
