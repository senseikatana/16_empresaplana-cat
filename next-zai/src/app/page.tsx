"use client";

import * as React from "react";
import {
  Bus,
  Plane,
  MapPin,
  Clock,
  ArrowRight,
  PlaneTakeoff,
  Ship,
  Building2,
  GraduationCap,
  PartyPopper,
  Luggage,
  Palmtree,
  Globe2,
  Heart,
  Users,
  ShieldCheck,
  Phone,
  Mail,
  CalendarDays,
  Route as RouteIcon,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/plana/Header";
import Footer from "@/components/plana/Footer";
import MapSection from "@/components/plana/MapSection";
import { getPopularLines, BUS_LINES } from "@/lib/routes";

const POPULAR = getPopularLines();

const SERVICES = [
  {
    icon: Bus,
    title: "Transportes discrecionales",
    desc: "Desplazamientos en autobús a medida para empresas, organizaciones y particulares.",
  },
  {
    icon: Building2,
    title: "Servicios a Empresas y fábricas",
    desc: "Transporte regular de trabajadores con flota adaptada a los turnos de tu empresa.",
  },
  {
    icon: ShieldCheck,
    title: "Autocares adaptados",
    desc: "Vehículos accesibles con elevador para personas con movilidad reducida.",
  },
  {
    icon: GraduationCap,
    title: "Transporte escolar",
    desc: "Rutas escolares seguras con monitores y conductores titulados.",
  },
  {
    icon: PartyPopper,
    title: "Viajes fin de curso",
    desc: "Organizamos el viaje de fin de curso con destinos por toda Europa.",
  },
  {
    icon: PlaneTakeoff,
    title: "Transfers",
    desc: "Traslados a los aeropuertos de Barcelona y Reus, puertos y estaciones.",
  },
  {
    icon: Palmtree,
    title: "Viajes turísticos",
    desc: "Excursiones y circuitos por la Costa Daurada, Catalunya y el Estado.",
  },
  {
    icon: Globe2,
    title: "Excursiones Internacionales",
    desc: "Rutas y circuitos por Europa con autocares de gran confort.",
  },
  {
    icon: Heart,
    title: "Bodas y celebraciones",
    desc: "Transporte para invitados en bodas, banquetes y eventos especiales.",
  },
];

const COMPANY_STATS = [
  { value: "60+", label: "años de experiencia" },
  { value: "134", label: "localidades conectadas" },
  { value: "15", label: "líneas regulares" },
  { value: "4", label: "bases operativas" },
];

const POPULAR_DESTINATIONS = [
  { name: "Aeroport de Barcelona", icon: Plane, color: "#dc2626" },
  { name: "Aeroport de Reus", icon: Plane, color: "#ea580c" },
  { name: "Tarragona", icon: MapPin, color: "#16a34a" },
  { name: "Reus", icon: Building2, color: "#0891b2" },
  { name: "Salou", icon: Palmtree, color: "#7c3aed" },
  { name: "Cambrils", icon: Ship, color: "#0d9488" },
  { name: "Barcelona", icon: Building2, color: "#ca8a04" },
  { name: "PortAventura", icon: Sparkles, color: "#db2777" },
];

export default function Home() {
  return (
    <div id="top" className="flex min-h-screen flex-col overflow-x-hidden bg-background">
      <Header />

      <main className="flex-1">
        {/* ===== Hero ===== */}
        <section className="plana-hero-gradient relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
            <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-6">
                <Badge className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary hover:bg-primary/15">
                  <Sparkles className="h-3.5 w-3.5" />
                  Más de 60 años conectando Catalunya
                </Badge>
                <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
                  Viaja por la{" "}
                  <span className="text-primary">Costa Daurada</span> y todo el{" "}
                  <span className="text-primary">Camp de Tarragona</span>
                </h1>
                <p className="max-w-xl text-lg text-muted-foreground text-balance">
                  Líneas regulares de autobús con paradas en todos los pueblos de
                  Tarragona —Alt Camp i Baix Camp—, conexiones directas con
                  Barcelona, los aeropuertos de Barcelona y Reus, y la Costa
                  Daurada. Busca tu ruta y síguela en vivo sobre el mapa.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <Button asChild size="lg" className="h-12 px-7 text-base font-semibold">
                    <a href="#buscador">
                      Buscar mi ruta
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="h-12 px-6 text-base">
                    <a href="#lineas">Ver líneas populares</a>
                  </Button>
                </div>

                {/* Quick destination chips */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {POPULAR_DESTINATIONS.map((d) => (
                    <a
                      key={d.name}
                      href="#buscador"
                      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/70 px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur transition hover:border-primary/40 hover:bg-background"
                    >
                      <d.icon className="h-3.5 w-3.5" style={{ color: d.color }} />
                      {d.name}
                    </a>
                  ))}
                </div>
              </div>

              {/* Hero card: stats + live feature highlight */}
              <div className="relative">
                <div className="absolute -inset-4 -z-10 rounded-3xl bg-primary/5 blur-2xl" />
                <Card className="overflow-hidden border-border/60 shadow-xl">
                  <div className="relative h-44 bg-gradient-to-br from-primary/90 via-primary to-emerald-700">
                    <div className="absolute inset-0 opacity-20" style={{
                      backgroundImage:
                        "radial-gradient(circle at 20% 30%, white 1px, transparent 1px), radial-gradient(circle at 70% 60%, white 1px, transparent 1px)",
                      backgroundSize: "32px 32px",
                    }} />
                    <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between text-primary-foreground">
                      <div>
                        <div className="text-xs uppercase tracking-wider opacity-80">Próxima salida</div>
                        <div className="text-2xl font-extrabold">Tarragona → Barcelona</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs opacity-80">Sale en</div>
                        <div className="font-mono text-2xl font-extrabold">12:45</div>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <div className="grid grid-cols-2 gap-4">
                      {COMPANY_STATS.map((s) => (
                        <div key={s.label} className="rounded-xl bg-muted/40 p-3 text-center">
                          <div className="text-2xl font-extrabold text-primary">{s.value}</div>
                          <div className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                            {s.label}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center gap-2 rounded-lg bg-primary/5 p-3 text-sm">
                      <MapPin className="h-4 w-4 shrink-0 text-primary" />
                      <span className="text-muted-foreground">
                        Mapa OpenStreetMap en vivo · seguimiento parada a parada
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Map + search section (main feature) ===== */}
        <MapSection />

        {/* ===== Popular lines ===== */}
        <section id="lineas" className="scroll-mt-20 bg-background">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                  <RouteIcon className="h-3.5 w-3.5" />
                  Líneas más buscadas
                </span>
                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                  Nuestras rutas estrella
                </h2>
                <p className="mt-2 max-w-2xl text-muted-foreground">
                  Las conexiones más demandadas de la Costa Daurada y el Camp de
                  Tarragona con los aeropuertos, Barcelona y las principales
                  ciudades.
                </p>
              </div>
              <Button asChild variant="outline">
                <a href="#buscador">
                  Ver todas las líneas
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {POPULAR.map((line) => {
                const stopsCount = line.stops.length;
                const first = line.stops[0];
                const last = line.stops[line.stops.length - 1];
                return (
                  <a
                    key={line.id}
                    href="#buscador"
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <div
                      className="absolute left-0 top-0 h-1 w-full"
                      style={{ background: line.color }}
                    />
                    <div className="flex items-center justify-between">
                      <span
                        className="inline-flex items-center rounded-md px-2 py-0.5 font-mono text-xs font-bold"
                        style={{ color: line.color, background: `${line.color}1a` }}
                      >
                        {line.code}
                      </span>
                      <Badge variant="outline" className="text-[10px] capitalize">
                        {line.type === "airport" ? "Aeropuerto" : line.type === "express" ? "Exprés" : line.type === "coastal" ? "Costa" : "Regular"}
                      </Badge>
                    </div>
                    <h3 className="mt-3 text-base font-bold leading-snug">{line.name}</h3>
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" />
                      {stopsCount} paradas · {line.durationMin} min
                    </div>
                    <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                      <span className="text-xs text-muted-foreground">Desde</span>
                      <span className="text-lg font-extrabold text-primary">
                        {line.priceFrom.toFixed(2)} €
                      </span>
                    </div>
                    <div className="mt-2 inline-flex items-center text-xs font-medium text-primary opacity-0 transition group-hover:opacity-100">
                      Buscar esta ruta <ArrowRight className="ml-1 h-3 w-3" />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===== Services ===== */}
        <section id="servicios" className="scroll-mt-20 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                <Bus className="h-3.5 w-3.5" />
                Servicios discrecionales
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                ¿Qué te ofrece Empresa Plana?
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                Más allá de las líneas regulares, ponemos nuestra flota y
                experiencia a tu servicio para cualquier necesidad de transporte
                colectivo.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((service) => (
                <Card
                  key={service.title}
                  className="group border-border/60 bg-card shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
                >
                  <CardContent className="p-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                      <service.icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-base font-bold">{service.title}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{service.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Budget CTA */}
            <div className="mt-10 overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-emerald-700 text-primary-foreground shadow-lg">
              <div className="grid items-center gap-6 p-8 sm:grid-cols-[1.5fr_auto] sm:p-10">
                <div>
                  <h3 className="text-2xl font-bold">¿Necesitas un presupuesto a medida?</h3>
                  <p className="mt-2 max-w-xl text-primary-foreground/80">
                    Cuéntanos qué necesitas y te preparamos una propuesta de
                    transporte con la mejor relación calidad-precio.
                  </p>
                </div>
                <Button asChild size="lg" variant="secondary" className="h-12 px-7 text-base font-semibold">
                  <a href="#contacto">
                    Solicitar presupuesto
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Company info ===== */}
        <section id="empresa" className="scroll-mt-20 bg-background">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div className="space-y-5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                  <Building2 className="h-3.5 w-3.5" />
                  Empresa Plana
                </span>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  60 años transportando a Catalunya
                </h2>
                <p className="text-muted-foreground">
                  Empresa Plana es uno de los principales grupos de transporte de
                  viajeros por carretera de Catalunya, con bases operativas en
                  Tarragona, Reus, Vilanova i la Geltrú y Tortosa. Desde 1963
                  conectamos la Costa Daurada, el Camp de Tarragona y las Terres
                  de l'Ebre con Barcelona y sus aeropuertos.
                </p>
                <p className="text-muted-foreground">
                  Ofrecemos líneas regulares, transfers aeropuerto, transporte
                  escolar, servicios discrecionales para empresas y viajes
                  turísticos con una flota moderna, accesible y respetuosa con el
                  medio ambiente.
                </p>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {[
                    "Flota moderna y de bajas emisiones",
                    "Autocares adaptados PMR",
                    "Conductores titulados",
                    "Atención al cliente 7 días",
                    "Cobertura de toda la provincia",
                    "Puntualidad garantizada",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Operational bases */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Bases operativas
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { name: "Tarragona", desc: "Oficina central y estación", lat: 41.1189 },
                    { name: "Reus", desc: "Base Baix Camp y aeropuerto", lat: 41.1561 },
                    { name: "Vilanova i la Geltrú", desc: "Base Garraf i Penedès", lat: 41.224 },
                    { name: "Tortosa", desc: "Base Terres de l'Ebre", lat: 40.8126 },
                  ].map((base) => (
                    <Card key={base.name} className="border-border/60 bg-card">
                      <CardContent className="flex items-start gap-3 p-4">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <MapPin className="h-4 w-4" />
                        </span>
                        <div>
                          <div className="text-sm font-bold">{base.name}</div>
                          <div className="text-xs text-muted-foreground">{base.desc}</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="rounded-2xl border border-border bg-muted/30 p-5">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Users className="h-4 w-4 text-primary" />
                    Compromiso con el territorio
                  </div>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    Conectamos 134 localidades de Tarragona, Barcelona y las
                    Terres de l'Ebre con un servicio público de calidad,
                    contribuyendo a la movilidad sostenible de Catalunya.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Where we are / coverage ===== */}
        <section id="donde" className="scroll-mt-20 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                <MapPin className="h-3.5 w-3.5" />
                Dónde estamos
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Cobertura de la provincia de Tarragona
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                Llegamos a todos los pueblos del Alt Camp y Baix Camp, la Costa
                Daurada, las Terres de l'Ebre y la conexión con Barcelona y su
                aeropuerto.
              </p>
            </div>

            {/* Comarca coverage */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { comarca: "Tarragonès", towns: "Tarragona, Salou, Vila-seca, La Pineda, Constantí…", color: "#16a34a" },
                { comarca: "Alt Camp", towns: "Valls, Alcover, El Pla de Santa Maria, Cabra del Camp…", color: "#ca8a04" },
                { comarca: "Baix Camp", towns: "Reus, Cambrils, Mont-roig, Riudoms, Les Borges…", color: "#0891b2" },
                { comarca: "Baix Penedès / Garraf", towns: "Vilanova, Sitges, Cubelles, Cunit, Vilafranca…", color: "#9333ea" },
                { comarca: "Conca de Barberà", towns: "Montblanc, L'Espluga, Vimbodí, Sarral…", color: "#0f766e" },
                { comarca: "Priorat", towns: "Falset, Cornudella, Poboleda, La Morera…", color: "#be123c" },
                { comarca: "Ribera d'Ebre", towns: "Móra d'Ebre, Ascó, Flix, Tivissa, Garcia…", color: "#b45309" },
                { comarca: "Baix Ebre / Montsià", towns: "Tortosa, L'Ampolla, L'Aldea, Camarles, Deltebre…", color: "#0d9488" },
              ].map((c) => (
                <Card key={c.comarca} className="border-border/60 bg-card">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full" style={{ background: c.color }} />
                      <h3 className="text-sm font-bold">{c.comarca}</h3>
                    </div>
                    <p className="mt-1.5 text-xs text-muted-foreground">{c.towns}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm">
              <span className="text-muted-foreground">Conexiones destacadas:</span>
              {["Aeroport de Barcelona", "Aeroport de Reus", "Barcelona", "PortAventura", "Estació del Camp"].map((c) => (
                <span key={c} className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium">
                  <Plane className="h-3 w-3 text-primary" />
                  {c}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Contact ===== */}
        <section id="contacto" className="scroll-mt-20 bg-background">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              {/* Contact info */}
              <div className="space-y-6">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                    <Phone className="h-3.5 w-3.5" />
                    Contacta
                  </span>
                  <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                    Estamos para ayudarte
                  </h2>
                  <p className="mt-2 text-muted-foreground">
                    Resuelve dudas sobre horarios, rutas, billetes o solicita un
                    presupuesto para servicios discrecionales.
                  </p>
                </div>

                <div className="space-y-3">
                  <a
                    href="tel:+34977553680"
                    className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition hover:border-primary/40 hover:shadow-sm"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Phone className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="text-xs text-muted-foreground">Teléfono</div>
                      <div className="font-mono font-bold">+34 977 553 680</div>
                    </div>
                  </a>
                  <a
                    href="mailto:info@empresaplana.cat"
                    className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition hover:border-primary/40 hover:shadow-sm"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Mail className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="text-xs text-muted-foreground">Correo</div>
                      <div className="font-bold">info@empresaplana.cat</div>
                    </div>
                  </a>
                  <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <MapPin className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="text-xs text-muted-foreground">Oficina central</div>
                      <div className="font-bold">C/ Cristòfor Colom, 29 · 43001 Tarragona</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <CalendarDays className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="text-xs text-muted-foreground">Horario de atención</div>
                      <div className="font-bold">Lun-Sáb 8:00-22:00 · Dom 10:00-19:00</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact form */}
              <Card className="border-border/60 shadow-sm">
                <CardContent className="p-6 sm:p-8">
                  <h3 className="text-xl font-bold">Solicita información o presupuesto</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Rellena el formulario y te responderemos lo antes posible.
                  </p>
                  <ContactForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function ContactForm() {
  const [sent, setSent] = React.useState(false);
  return (
    <form
      className="mt-6 grid gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="name" className="text-sm font-medium">Nombre</label>
          <input
            id="name"
            required
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Tu nombre"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <input
            id="email"
            type="email"
            required
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="tucorreo@email.com"
          />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="phone" className="text-sm font-medium">Teléfono</label>
          <input
            id="phone"
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="600 000 000"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="service" className="text-sm font-medium">Servicio</label>
          <select
            id="service"
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option>Línea regular</option>
            <option>Transfer aeropuerto</option>
            <option>Transporte discrecional</option>
            <option>Transporte escolar</option>
            <option>Viaje / excursión</option>
            <option>Otro</option>
          </select>
        </div>
      </div>
      <div className="space-y-1.5">
        <label htmlFor="message" className="text-sm font-medium">Mensaje</label>
        <textarea
          id="message"
          rows={4}
          required
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="Cuéntanos qué necesitas: origen, destino, fecha, número de pasajeros…"
        />
      </div>
      {sent ? (
        <div className="flex items-center gap-2 rounded-lg bg-primary/10 p-3 text-sm text-primary">
          <CheckCircle2 className="h-4 w-4" />
          ¡Gracias! Hemos recibido tu solicitud y te contactaremos pronto.
        </div>
      ) : (
        <Button type="submit" size="lg" className="h-11 w-full text-base font-semibold sm:w-auto sm:px-8">
          Enviar solicitud
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      )}
      <p className="text-xs text-muted-foreground">
        Al enviar aceptas nuestra política de privacidad. Empresa Plana, SL · CIF B-43009091.
      </p>
    </form>
  );
}
