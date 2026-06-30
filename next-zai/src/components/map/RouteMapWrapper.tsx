"use client";

import dynamic from "next/dynamic";
import type { RouteOption } from "@/lib/routes";
import type { GeoLocation } from "@/lib/locations";

const RouteMapInner = dynamic(() => import("./RouteMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-muted">
      <div className="flex flex-col items-center gap-3 text-muted-foreground">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <span className="text-sm">Cargando mapa…</span>
      </div>
    </div>
  ),
});

export default function RouteMap(
  props: React.ComponentProps<typeof import("./RouteMap").default>
) {
  return <RouteMapInner {...props} />;
}

export type { RouteOption, GeoLocation };
