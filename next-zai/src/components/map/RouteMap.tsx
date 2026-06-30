"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import type { RouteOption } from "@/lib/routes";
import type { GeoLocation } from "@/lib/locations";

// Default map center: Tarragona province.
const DEFAULT_CENTER: [number, number] = [41.12, 1.25];
const DEFAULT_ZOOM = 11;

interface RouteMapProps {
  routeOption: RouteOption | null;
  allLocations?: GeoLocation[];
  className?: string;
}

/** Component that fits the map bounds whenever the route changes. */
function FitBounds({ points }: { points: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (points.length === 0) return;
    const bounds = L.latLngBounds(points);
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 13 });
  }, [points, map]);
  return null;
}

/** Animated bus marker that travels along the route. */
function AnimatedBus({
  points,
  color,
  playing,
}: {
  points: [number, number][];
  color: string;
  playing: boolean;
}) {
  const markerRef = useRef<L.Marker | null>(null);
  const rafRef = useRef<number | null>(null);
  const segProgressRef = useRef(0);
  const segIndexRef = useRef(0);
  const lastTsRef = useRef<number | null>(null);

  const icon = useMemo(
    () =>
      L.divIcon({
        className: "plana-bus-icon",
        html: `<div class="plana-bus-pin" style="--bus-color:${color}">
          <span class="bus-pulse"></span>
          <span class="bus-body">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"/><circle cx="7" cy="18" r="2"/><path d="M9 18h5"/><circle cx="16" cy="18" r="2"/></svg>
          </span>
        </div>`,
        iconSize: [38, 38],
        iconAnchor: [19, 19],
      }),
    [color]
  );

  // Reset animation whenever route changes.
  useEffect(() => {
    segProgressRef.current = 0;
    segIndexRef.current = 0;
    lastTsRef.current = null;
    if (points.length > 0 && markerRef.current) {
      markerRef.current.setLatLng(points[0]);
    }
  }, [points]);

  useEffect(() => {
    if (!playing || points.length < 2) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
      return;
    }

    const speed = 0.00045; // progress per ms (full route ~2.2s per segment)
    const tick = (ts: number) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = ts - lastTsRef.current;
      lastTsRef.current = ts;

      segProgressRef.current += speed * dt;
      while (segProgressRef.current >= 1) {
        segProgressRef.current -= 1;
        segIndexRef.current = (segIndexRef.current + 1) % (points.length - 1);
      }
      const i = segIndexRef.current;
      const t = segProgressRef.current;
      const a = points[i];
      const b = points[i + 1];
      const lat = a[0] + (b[0] - a[0]) * t;
      const lng = a[1] + (b[1] - a[1]) * t;
      markerRef.current?.setLatLng([lat, lng]);

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
    };
  }, [playing, points]);

  if (points.length === 0) return null;

  return (
    <Marker
      ref={(m) => {
        markerRef.current = m;
      }}
      position={points[0]}
      icon={icon}
      zIndexOffset={1000}
    />
  );
}

function townIcon() {
  return L.divIcon({
    className: "plana-stop-marker",
    html: `<div class="plana-town-dot"></div>`,
    iconSize: [8, 8],
    iconAnchor: [4, 4],
  });
}

function stopIcon(color: string, isEndpoint: boolean, label?: string) {
  if (isEndpoint) {
    return L.divIcon({
      className: "plana-stop-marker",
      html: `<div class="plana-endpoint-dot" style="--marker-color:${color}">${label ?? ""}</div>`,
      iconSize: [22, 22],
      iconAnchor: [11, 11],
    });
  }
  return L.divIcon({
    className: "plana-stop-marker",
    html: `<div class="plana-stop-dot" style="--marker-color:${color}"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });
}

export default function RouteMap({
  routeOption,
  allLocations = [],
  className,
}: RouteMapProps) {
  const [playing, setPlaying] = useState(true);

  const routePoints: [number, number][] = useMemo(() => {
    if (!routeOption) return [];
    return routeOption.segments.map((s) => [s.lat, s.lng] as [number, number]);
  }, [routeOption]);

  const fitPoints: [number, number][] = useMemo(() => {
    if (routePoints.length > 0) return routePoints;
    if (allLocations.length > 0) {
      return allLocations.map((l) => [l.lat, l.lng] as [number, number]);
    }
    return [];
  }, [routePoints, allLocations]);

  // Key changes per route so the AnimatedBus remounts and resets its animation.
  const busKey = `${routeOption?.lineId ?? "none"}-${routeOption?.departure ?? ""}`;

  return (
    <div className={className}>
      <MapContainer
        center={DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM}
        scrollWheelZoom
        className="h-full w-full"
        attributionControl
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <FitBounds points={fitPoints} />

        {/* All town dots when no route selected */}
        {!routeOption &&
          allLocations.map((loc) => (
            <Marker
              key={`town-${loc.id}`}
              position={[loc.lat, loc.lng]}
              icon={townIcon()}
              zIndexOffset={1}
            >
              <Popup>
                <div className="plana-popup-title">{loc.name}</div>
                <div className="plana-popup-sub">
                  {loc.comarca} · {loc.region}
                </div>
              </Popup>
            </Marker>
          ))}

        {/* Route polyline */}
        {routeOption && routePoints.length > 1 && (
          <>
            <Polyline
              positions={routePoints}
              pathOptions={{
                color: routeOption.color,
                weight: 6,
                opacity: 0.25,
                lineCap: "round",
              }}
            />
            <Polyline
              positions={routePoints}
              pathOptions={{
                color: routeOption.color,
                weight: 4,
                opacity: 0.95,
                lineCap: "round",
                lineJoin: "round",
                dashArray: "8 10",
                className: "plana-route-line",
              }}
            />

            {/* Stop markers */}
            {routeOption.segments.map((seg, idx) => {
              const isOrigin = idx === 0;
              const isDest = idx === routeOption.segments.length - 1;
              const isEndpoint = isOrigin || isDest;
              const label = isOrigin ? "A" : isDest ? "B" : undefined;
              return (
                <Marker
                  key={`stop-${seg.locationId}-${idx}`}
                  position={[seg.lat, seg.lng]}
                  icon={stopIcon(routeOption.color, isEndpoint, label)}
                  zIndexOffset={isEndpoint ? 800 : 400}
                >
                  <Popup>
                    <div className="plana-popup-title">{seg.name}</div>
                    <div className="plana-popup-sub">
                      {isOrigin
                        ? `Salida · ${seg.departure}`
                        : isDest
                        ? `Llegada · ${seg.arrival}`
                        : `Parada · ${seg.arrival}`}
                    </div>
                  </Popup>
                </Marker>
              );
            })}

            {/* Animated bus */}
            <AnimatedBus
              key={busKey}
              points={routePoints}
              color={routeOption.color}
              playing={playing}
            />
          </>
        )}
      </MapContainer>

      {/* Floating map controls */}
      <div className="pointer-events-none absolute right-3 top-3 z-[500] flex flex-col gap-2">
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-foreground shadow-md ring-1 ring-black/5 transition hover:bg-white"
          aria-label={playing ? "Pausar animación" : "Reproducir animación"}
          title={playing ? "Pausar autobús" : "Reproducir autobús"}
        >
          {playing ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
