"use client";

import * as React from "react";
import { Check, ChevronsUpDown, MapPin, Search, X, ArrowRight, Clock, Bus, ArrowLeftRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { LOCATIONS, type GeoLocation } from "@/lib/locations";
import { searchRoutes, type RouteOption } from "@/lib/routes";

const TIME_SLOTS = [
  { value: "any", label: "Cualquier hora" },
  { value: "00-07", label: "00:00 - 07:00" },
  { value: "07-10", label: "07:00 - 10:00" },
  { value: "10-12", label: "10:00 - 12:00" },
  { value: "12-16", label: "12:00 - 16:00" },
  { value: "16-18", label: "16:00 - 18:00" },
  { value: "18-20", label: "18:00 - 20:00" },
  { value: "20-24", label: "20:00 - 23:59" },
];

interface RouteSearchProps {
  onSelectRoute: (route: RouteOption | null) => void;
  selectedRoute: RouteOption | null;
}

function LocationCombobox({
  value,
  onChange,
  placeholder,
  accentColor,
}: {
  value: string | undefined;
  onChange: (id: string | undefined) => void;
  placeholder: string;
  accentColor?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  const selected = React.useMemo(
    () => LOCATIONS.find((l) => l.id === value),
    [value]
  );

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return LOCATIONS;
    return LOCATIONS.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.comarca.toLowerCase().includes(q) ||
        l.region.toLowerCase().includes(q)
    );
  }, [query]);

  // Group by region for display.
  const grouped = React.useMemo(() => {
    const map = new Map<string, GeoLocation[]>();
    for (const l of filtered) {
      const key = l.region;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(l);
    }
    return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  }, [filtered]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between font-normal"
        >
          <span className="flex min-w-0 items-center gap-2 truncate">
            <span
              className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ background: accentColor ?? "currentColor" }}
            />
            <span className={cn("truncate", !selected && "text-muted-foreground")}>
              {selected ? selected.name : placeholder}
            </span>
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Buscar localidad…"
            value={query}
            onValueChange={setQuery}
          />
          <CommandList className="max-h-72">
            <CommandEmpty>No se encontraron localidades.</CommandEmpty>
            {grouped.map(([region, locs]) => (
              <CommandGroup key={region} heading={region}>
                {locs.map((loc) => (
                  <CommandItem
                    key={loc.id}
                    value={loc.id}
                    onSelect={() => {
                      onChange(loc.id === value ? undefined : loc.id);
                      setOpen(false);
                      setQuery("");
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === loc.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
                      <span className="truncate">{loc.name}</span>
                      <span className="shrink-0 text-[11px] text-muted-foreground">{loc.comarca}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default function RouteSearch({ onSelectRoute, selectedRoute }: RouteSearchProps) {
  const [originId, setOriginId] = React.useState<string | undefined>("tarragona");
  const [destinationId, setDestinationId] = React.useState<string | undefined>("aeroport-barcelona");
  const [timeSlot, setTimeSlot] = React.useState("any");
  const [routeType, setRouteType] = React.useState<"any" | "direct" | "transfers">("any");
  const [results, setResults] = React.useState<RouteOption[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [hasSearched, setHasSearched] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSearch = React.useCallback(async () => {
    if (!originId || !destinationId) {
      setError("Selecciona origen y destino.");
      return;
    }
    if (originId === destinationId) {
      setError("El origen y el destino no pueden ser iguales.");
      return;
    }
    setError(null);
    setLoading(true);
    setHasSearched(true);
    try {
      const params = new URLSearchParams({
        originId,
        destinationId,
        timeSlot,
        routeType,
        limit: "30",
      });
      const res = await fetch(`/api/routes/search?${params.toString()}`);
      if (!res.ok) throw new Error("Error en la búsqueda");
      const data = await res.json();
      setResults(data.options ?? []);
      if ((data.options ?? []).length > 0) {
        onSelectRoute(data.options[0]);
      } else {
        onSelectRoute(null);
      }
    } catch (e) {
      setError("No se pudo completar la búsqueda. Inténtalo de nuevo.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [originId, destinationId, timeSlot, routeType, onSelectRoute]);

  const swap = () => {
    setOriginId(destinationId);
    setDestinationId(originId);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Search form */}
      <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-end">
        <div className="space-y-1.5">
          <Label htmlFor="origin" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <MapPin className="mr-1 inline h-3.5 w-3.5" />
            Localidad de origen
          </Label>
          <LocationCombobox
            value={originId}
            onChange={setOriginId}
            placeholder="¿Desde dónde sales?"
            accentColor="#16a34a"
          />
        </div>

        <div className="flex items-end justify-center pb-1">
          <button
            type="button"
            onClick={swap}
            aria-label="Intercambiar origen y destino"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            <ArrowLeftRight className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="destination" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <MapPin className="mr-1 inline h-3.5 w-3.5" />
            Localidad de destino
          </Label>
          <LocationCombobox
            value={destinationId}
            onChange={setDestinationId}
            placeholder="¿A dónde vas?"
            accentColor="#dc2626"
          />
        </div>
      </div>

      {/* Filters row */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <Clock className="mr-1 inline h-3.5 w-3.5" />
            Franja horaria
          </Label>
          <select
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {TIME_SLOTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <Bus className="mr-1 inline h-3.5 w-3.5" />
            Tipo de ruta
          </Label>
          <RadioGroup
            value={routeType}
            onValueChange={(v) => setRouteType(v as typeof routeType)}
            className="flex h-9 items-center gap-4"
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem value="any" id="rt-any" />
              <Label htmlFor="rt-any" className="cursor-pointer text-sm font-normal">Todas</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="direct" id="rt-direct" />
              <Label htmlFor="rt-direct" className="cursor-pointer text-sm font-normal">Directas</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="transfers" id="rt-transfers" />
              <Label htmlFor="rt-transfers" className="cursor-pointer text-sm font-normal">Con transbordo</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button
          type="button"
          onClick={handleSearch}
          disabled={loading}
          className="h-11 flex-1 text-sm font-semibold sm:flex-none sm:px-8"
        >
          {loading ? (
            <>
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              Buscando…
            </>
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" />
              Buscar ruta
            </>
          )}
        </Button>
        {(originId || destinationId) && (
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setOriginId(undefined);
              setDestinationId(undefined);
              setResults([]);
              setHasSearched(false);
              onSelectRoute(null);
              setError(null);
            }}
            className="h-11"
          >
            <X className="mr-1 h-4 w-4" />
            Limpiar
          </Button>
        )}
      </div>

      {error && (
        <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}

      {/* Results */}
      {hasSearched && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">
              {loading ? "Buscando opciones…" : `${results.length} resultado${results.length === 1 ? "" : "s"}`}
            </h3>
            {!loading && results.length > 0 && (
              <span className="text-xs text-muted-foreground">Ordenadas por salida</span>
            )}
          </div>

          {loading ? (
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-20 w-full rounded-xl" />
              ))}
            </div>
          ) : results.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border bg-muted/30 p-8 text-center">
              <Bus className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
              <p className="font-medium text-foreground">No hay rutas disponibles</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Prueba con otra franja horaria o permite rutas con transbordo.
              </p>
            </div>
          ) : (
            <div className="scroll-area-custom max-h-[28rem] space-y-2 overflow-y-auto pr-1">
              {results.map((opt, idx) => {
                const active =
                  selectedRoute?.lineId === opt.lineId &&
                  selectedRoute?.departure === opt.departure;
                return (
                  <button
                    key={`${opt.lineId}-${opt.departure}-${idx}`}
                    type="button"
                    onClick={() => onSelectRoute(opt)}
                    className={cn(
                      "group flex w-full items-stretch gap-3 rounded-xl border bg-card p-3 text-left transition hover:shadow-md",
                      active
                        ? "border-primary ring-2 ring-primary/30"
                        : "border-border hover:border-primary/40"
                    )}
                  >
                    <div
                      className="flex w-1.5 shrink-0 rounded-full"
                      style={{ background: opt.color }}
                    />
                    <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge
                          variant="secondary"
                          className="font-mono text-[11px]"
                          style={{ color: opt.color, background: `${opt.color}1a` }}
                        >
                          {opt.lineCode}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{opt.lineName}</span>
                        {opt.direct ? (
                          <Badge variant="outline" className="ml-auto text-[10px]">Directo</Badge>
                        ) : (
                          <Badge variant="outline" className="ml-auto text-[10px]">1 transbordo</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold">
                        <span>{opt.departure}</span>
                        <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{opt.arrival}</span>
                        <span className="ml-auto text-xs font-normal text-muted-foreground">
                          {Math.floor(opt.durationMin / 60)}h {opt.durationMin % 60}min
                        </span>
                      </div>
                      <div className="flex min-w-0 items-center justify-between gap-2 text-xs text-muted-foreground">
                        <span className="min-w-0 truncate">{opt.originName} → {opt.destinationName}</span>
                        <span className="ml-2 shrink-0 font-semibold text-foreground">{opt.price.toFixed(2)} €</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
