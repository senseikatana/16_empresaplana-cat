"use client";

import * as React from "react";
import { Map as MapIcon, Bus, Clock, Euro, Route as RouteIcon, Navigation, Layers } from "lucide-react";
import RouteSearch from "./RouteSearch";
import RouteMap from "../map/RouteMapWrapper";
import { getAllStopLocations } from "@/lib/routes";
import type { RouteOption } from "@/lib/routes";

const ALL_STOP_LOCATIONS = getAllStopLocations();

function formatDuration(min: number) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (h === 0) return `${m} min`;
  return `${h} h ${String(m).padStart(2, "0")} min`;
}

export default function MapSection() {
  const [selected, setSelected] = React.useState<RouteOption | null>(null);

  return (
    <section id="buscador" className="relative scroll-mt-20 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Heading */}
        <div className="mb-8 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            <MapIcon className="h-3.5 w-3.5" />
            Buscador de líneas
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Encuentra tu ruta y síguela en el mapa
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Busca entre todas nuestras líneas regulares de la Costa Daurada, el
            Camp de Tarragona, Terres de l'Ebre y las conexiones con Barcelona y
            los aeropuertos. El mapa muestra el recorrido en tiempo real, parada
            a parada.
          </p>
        </div>

        {/* Search + Map layout */}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
          {/* Left: search + results */}
          <div className="min-w-0 rounded-2xl border border-border bg-card p-5 shadow-sm">
            <RouteSearch onSelectRoute={setSelected} selectedRoute={selected} />
          </div>

          {/* Right: map + details */}
          <div className="flex flex-col gap-4">
            <div className="relative h-[460px] overflow-hidden rounded-2xl border border-border shadow-sm sm:h-[540px]">
              <RouteMap
                routeOption={selected}
                allLocations={ALL_STOP_LOCATIONS}
                className="h-full w-full"
              />
              {/* Map overlay legend */}
              <div className="pointer-events-none absolute bottom-3 left-3 z-[500] rounded-lg bg-white/90 px-3 py-2 text-[11px] shadow-md ring-1 ring-black/5 backdrop-blur">
                <div className="flex items-center gap-1.5 font-semibold text-foreground">
                  <Layers className="h-3.5 w-3.5 text-primary" />
                  OpenStreetMap
                </div>
                <div className="mt-0.5 text-muted-foreground">
                  {selected
                    ? `${selected.segments.length} paradas · ruta ${selected.lineCode}`
                    : `${ALL_STOP_LOCATIONS.length} paradas disponibles`}
                </div>
              </div>
            </div>

            {/* Selected route detail */}
            {selected ? (
              <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-block h-3 w-3 rounded-full"
                        style={{ background: selected.color }}
                      />
                      <span className="font-mono text-sm font-bold" style={{ color: selected.color }}>
                        {selected.lineCode}
                      </span>
                      <span className="text-sm font-medium text-muted-foreground">{selected.lineName}</span>
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-lg font-bold">
                      <span>{selected.departure}</span>
                      <Navigation className="h-4 w-4 text-muted-foreground" />
                      <span>{selected.arrival}</span>
                    </div>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {selected.originName} → {selected.destinationName}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4 text-right">
                    <div>
                      <div className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" /> Duración
                      </div>
                      <div className="font-semibold">{formatDuration(selected.durationMin)}</div>
                    </div>
                    <div>
                      <div className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                        <Euro className="h-3.5 w-3.5" /> Desde
                      </div>
                      <div className="font-semibold text-primary">{selected.price.toFixed(2)} €</div>
                    </div>
                    <div>
                      <div className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                        <RouteIcon className="h-3.5 w-3.5" /> Tipo
                      </div>
                      <div className="font-semibold">
                        {selected.direct ? "Directo" : "1 transbordo"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stop timeline */}
                <div className="mt-4 border-t border-border pt-4">
                  <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Recorrido · {selected.segments.length} paradas
                  </h4>
                  <ol className="scroll-area-custom relative max-h-56 space-y-0 overflow-y-auto pr-2">
                    {selected.segments.map((seg, idx) => {
                      const isFirst = idx === 0;
                      const isLast = idx === selected.segments.length - 1;
                      return (
                        <li key={`${seg.locationId}-${idx}`} className="relative flex gap-3 pb-3">
                          {/* Timeline line */}
                          {!isLast && (
                            <span
                              className="absolute left-[7px] top-5 h-full w-0.5"
                              style={{ background: `${selected.color}40` }}
                            />
                          )}
                          <span
                            className="relative z-10 mt-1 h-3.5 w-3.5 shrink-0 rounded-full border-2 border-white shadow"
                            style={{
                              background: isFirst || isLast ? selected.color : "#fff",
                              borderColor: selected.color,
                            }}
                          />
                          <div className="flex flex-1 items-baseline justify-between gap-2 pb-1">
                            <span className={`text-sm ${isFirst || isLast ? "font-semibold" : ""}`}>
                              {seg.name}
                            </span>
                            <span className="font-mono text-xs text-muted-foreground">
                              {isFirst ? seg.departure : seg.arrival}
                            </span>
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 rounded-2xl border border-dashed border-border bg-card/50 p-5 text-sm text-muted-foreground">
                <Bus className="h-5 w-5 shrink-0 text-primary" />
                <span>
                  Selecciona origen y destino y pulsa <strong className="text-foreground">Buscar ruta</strong> para ver el
                  recorrido animado sobre el mapa. El autobús se mueve en tiempo real siguiendo las paradas.
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
