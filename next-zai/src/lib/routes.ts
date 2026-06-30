// Regular bus line data for Empresa Plana.
// Each line has ordered stops, an array of scheduled trips (with per-stop
// departure minutes offset from the trip start), and a map color.

import { LOCATIONS, LOCATION_MAP, type GeoLocation } from "./locations";

export interface RouteStop {
  locationId: string;
  offsetMin: number; // minutes from trip start
}

export interface ScheduledTrip {
  start: string; // HH:mm departure from first stop
  days: "daily" | "weekday" | "weekend" | "summer";
}

export interface BusLine {
  id: string;
  code: string; // line code, e.g. "L1", "Exprés"
  name: string;
  color: string; // hex color for the map
  type: "regular" | "express" | "airport" | "school" | "coastal";
  stops: RouteStop[];
  trips: ScheduledTrip[];
  priceFrom: number; // EUR
  durationMin: number;
  popular?: boolean;
}

// Helper to build a list of stops quickly.
function stops(arr: [string, number][]): RouteStop[] {
  return arr.map(([locationId, offsetMin]) => ({ locationId, offsetMin }));
}

export const BUS_LINES: BusLine[] = [
  {
    id: "barcelona-aeroport-tarragona",
    code: "Exprés",
    name: "Aeroport de Barcelona — Tarragona",
    color: "#dc2626",
    type: "airport",
    priceFrom: 14.95,
    durationMin: 75,
    popular: true,
    stops: stops([
      ["aeroport-barcelona", 0],
      ["lhospitalet-de-llobregat", 20],
      ["barcelona", 35],
      ["sitges", 55],
      ["tarragona", 75],
    ]),
    trips: [
      { start: "06:00", days: "daily" },
      { start: "08:30", days: "daily" },
      { start: "11:00", days: "daily" },
      { start: "14:00", days: "daily" },
      { start: "17:30", days: "daily" },
      { start: "20:30", days: "daily" },
      { start: "23:00", days: "daily" },
    ],
  },
  {
    id: "barcelona-aeroport-salou",
    code: "A1",
    name: "Aeroport de Barcelona — Salou",
    color: "#dc2626",
    type: "airport",
    priceFrom: 18.95,
    durationMin: 95,
    popular: true,
    stops: stops([
      ["aeroport-barcelona", 0],
      ["barcelona", 30],
      ["sitges", 55],
      ["tarragona", 80],
      ["vila-seca", 88],
      ["la-pineda", 92],
      ["salou", 95],
    ]),
    trips: [
      { start: "07:00", days: "daily" },
      { start: "09:30", days: "daily" },
      { start: "12:00", days: "daily" },
      { start: "15:30", days: "daily" },
      { start: "18:30", days: "daily" },
      { start: "22:00", days: "daily" },
    ],
  },
  {
    id: "reus-aeroport-salou",
    code: "A2",
    name: "Aeroport de Reus — Salou / Cambrils",
    color: "#ea580c",
    type: "airport",
    priceFrom: 6.5,
    durationMin: 35,
    popular: true,
    stops: stops([
      ["aeroport-reus", 0],
      ["reus", 10],
      ["les-roquetes", 18],
      ["vila-seca", 22],
      ["la-pineda", 26],
      ["salou", 32],
      ["cambrils", 40],
    ]),
    trips: [
      { start: "07:30", days: "summer" },
      { start: "09:45", days: "daily" },
      { start: "12:30", days: "daily" },
      { start: "16:00", days: "daily" },
      { start: "19:00", days: "daily" },
      { start: "22:30", days: "summer" },
    ],
  },
  {
    id: "tarragona-barcelona",
    code: "Exprés",
    name: "Tarragona — Barcelona",
    color: "#16a34a",
    type: "express",
    priceFrom: 12.95,
    durationMin: 90,
    popular: true,
    stops: stops([
      ["tarragona", 0],
      ["sitges", 25],
      ["vilanova-i-la-geltru", 40],
      ["barcelona", 90],
    ]),
    trips: [
      { start: "05:45", days: "weekday" },
      { start: "07:00", days: "daily" },
      { start: "08:15", days: "weekday" },
      { start: "10:30", days: "daily" },
      { start: "13:00", days: "daily" },
      { start: "16:30", days: "daily" },
      { start: "19:00", days: "daily" },
      { start: "21:30", days: "daily" },
    ],
  },
  {
    id: "reus-salou",
    code: "L1",
    name: "Reus — Salou",
    color: "#0891b2",
    type: "regular",
    priceFrom: 3.55,
    durationMin: 35,
    popular: true,
    stops: stops([
      ["reus", 0],
      ["castellvell-del-camp", 6],
      ["les-borges-del-camp", 12],
      ["vila-seca", 20],
      ["la-pineda", 25],
      ["salou", 32],
    ]),
    trips: [
      { start: "06:15", days: "weekday" },
      { start: "07:30", days: "daily" },
      { start: "09:00", days: "daily" },
      { start: "10:30", days: "daily" },
      { start: "12:00", days: "daily" },
      { start: "13:30", days: "daily" },
      { start: "15:00", days: "daily" },
      { start: "16:30", days: "daily" },
      { start: "18:00", days: "daily" },
      { start: "19:30", days: "daily" },
      { start: "21:00", days: "daily" },
      { start: "22:30", days: "weekend" },
    ],
  },
  {
    id: "tarragona-vila-seca-salou",
    code: "L2",
    name: "Tarragona — Vila-seca — Salou",
    color: "#7c3aed",
    type: "regular",
    priceFrom: 2.95,
    durationMin: 28,
    popular: true,
    stops: stops([
      ["tarragona", 0],
      ["torredembarra", 0],
      ["bonavista", 6],
      ["vila-seca", 12],
      ["portaventura", 18],
      ["la-pineda", 22],
      ["salou", 28],
    ]),
    trips: [
      { start: "06:30", days: "daily" },
      { start: "08:00", days: "daily" },
      { start: "09:30", days: "daily" },
      { start: "11:00", days: "daily" },
      { start: "12:30", days: "daily" },
      { start: "14:00", days: "daily" },
      { start: "15:30", days: "daily" },
      { start: "17:00", days: "daily" },
      { start: "18:30", days: "daily" },
      { start: "20:00", days: "daily" },
      { start: "21:30", days: "daily" },
      { start: "23:00", days: "weekend" },
    ],
  },
  {
    id: "horari-de-la-costa",
    code: "Costa",
    name: "Línia de la Costa — Cambrils / Miami Platja",
    color: "#0d9488",
    type: "coastal",
    priceFrom: 2.95,
    durationMin: 55,
    popular: true,
    stops: stops([
      ["tarragona", 0],
      ["salou", 15],
      ["cambrils", 25],
      ["mont-roig-del-camp", 35],
      ["l-hospitalet-de-linfant", 45],
      ["miami-platja", 50],
      ["lametlla-de-mar", 55],
    ]),
    trips: [
      { start: "06:00", days: "summer" },
      { start: "08:00", days: "daily" },
      { start: "10:00", days: "daily" },
      { start: "12:00", days: "daily" },
      { start: "14:00", days: "daily" },
      { start: "16:00", days: "daily" },
      { start: "18:00", days: "daily" },
      { start: "20:00", days: "daily" },
      { start: "22:00", days: "summer" },
    ],
  },
  {
    id: "tarragona-valls",
    code: "L5",
    name: "Tarragona — Valls",
    color: "#ca8a04",
    type: "regular",
    priceFrom: 4.2,
    durationMin: 40,
    stops: stops([
      ["tarragona", 0],
      ["constantí", 8],
      ["la-pobla-de-mafumet", 12],
      ["el-morell", 16],
      ["vilallonga-del-camp", 22],
      ["nulles", 28],
      ["valls", 40],
    ]),
    trips: [
      { start: "06:00", days: "weekday" },
      { start: "08:00", days: "daily" },
      { start: "10:00", days: "daily" },
      { start: "12:30", days: "daily" },
      { start: "15:00", days: "daily" },
      { start: "17:30", days: "daily" },
      { start: "20:00", days: "daily" },
    ],
  },
  {
    id: "reus-tarragona",
    code: "L6",
    name: "Reus — Tarragona",
    color: "#2563eb",
    type: "regular",
    priceFrom: 3.1,
    durationMin: 30,
    popular: true,
    stops: stops([
      ["reus", 0],
      ["castellvell-del-camp", 6],
      ["les-borges-del-camp", 12],
      ["la-secuita", 18],
      ["perafort", 23],
      ["tarragona", 30],
    ]),
    trips: [
      { start: "06:00", days: "weekday" },
      { start: "07:15", days: "daily" },
      { start: "08:30", days: "daily" },
      { start: "10:00", days: "daily" },
      { start: "11:30", days: "daily" },
      { start: "13:00", days: "daily" },
      { start: "14:30", days: "daily" },
      { start: "16:00", days: "daily" },
      { start: "17:30", days: "daily" },
      { start: "19:00", days: "daily" },
      { start: "20:30", days: "daily" },
      { start: "22:00", days: "weekend" },
    ],
  },
  {
    id: "reus-valls",
    code: "L7",
    name: "Reus — Valls",
    color: "#65a30d",
    type: "regular",
    priceFrom: 4.0,
    durationMin: 35,
    stops: stops([
      ["reus", 0],
      ["maspujols", 6],
      ["almoster", 10],
      ["alcover", 18],
      ["la-maso", 26],
      ["valls", 35],
    ]),
    trips: [
      { start: "06:45", days: "weekday" },
      { start: "08:30", days: "daily" },
      { start: "11:00", days: "daily" },
      { start: "14:00", days: "daily" },
      { start: "17:00", days: "daily" },
      { start: "20:00", days: "daily" },
    ],
  },
  {
    id: "vilanova-vilafranca",
    code: "L68",
    name: "Vilanova i la Geltrú — Vilafranca del Penedès",
    color: "#9333ea",
    type: "regular",
    priceFrom: 4.5,
    durationMin: 45,
    popular: true,
    stops: stops([
      ["vilanova-i-la-geltru", 0],
      ["cunit", 12],
      ["cubelles", 18],
      ["canyelles", 28],
      ["olèrdola", 36],
      ["vilafranca-del-penedes", 45],
    ]),
    trips: [
      { start: "06:30", days: "weekday" },
      { start: "08:00", days: "daily" },
      { start: "10:00", days: "daily" },
      { start: "12:30", days: "daily" },
      { start: "15:00", days: "daily" },
      { start: "17:30", days: "daily" },
      { start: "20:00", days: "daily" },
    ],
  },
  {
    id: "tarragona-tortosa",
    code: "L10",
    name: "Tarragona — Tortosa",
    color: "#b45309",
    type: "regular",
    priceFrom: 11.5,
    durationMin: 110,
    stops: stops([
      ["tarragona", 0],
      ["salou", 15],
      ["cambrils", 25],
      ["l-hospitalet-de-linfant", 40],
      ["lametlla-de-mar", 55],
      ["lampolla", 70],
      ["laldea", 85],
      ["camarles", 92],
      ["tortosa", 110],
    ]),
    trips: [
      { start: "06:30", days: "daily" },
      { start: "09:00", days: "daily" },
      { start: "12:00", days: "daily" },
      { start: "15:30", days: "daily" },
      { start: "18:30", days: "daily" },
      { start: "21:00", days: "daily" },
    ],
  },
  {
    id: "mora-tarragona",
    code: "L12",
    name: "Móra d'Ebre — Tarragona",
    color: "#be123c",
    type: "regular",
    priceFrom: 8.75,
    durationMin: 75,
    stops: stops([
      ["mora-debre", 0],
      ["garcia", 8],
      ["mora-la-nova", 14],
      ["ascó", 25],
      ["tivissa", 35],
      ["riudoms", 55],
      ["reus", 62],
      ["tarragona", 75],
    ]),
    trips: [
      { start: "06:00", days: "weekday" },
      { start: "08:30", days: "daily" },
      { start: "12:00", days: "daily" },
      { start: "16:00", days: "daily" },
      { start: "19:30", days: "daily" },
    ],
  },
  {
    id: "tarragona-montblanc",
    code: "L15",
    name: "Tarragona — Montblanc",
    color: "#0f766e",
    type: "regular",
    priceFrom: 5.6,
    durationMin: 50,
    stops: stops([
      ["tarragona", 0],
      ["perafort", 8],
      ["la-secuita", 14],
      ["valls", 28],
      ["nulles", 22],
      ["vilaverd", 38],
      ["montblanc", 50],
    ]),
    trips: [
      { start: "06:30", days: "weekday" },
      { start: "08:30", days: "daily" },
      { start: "11:00", days: "daily" },
      { start: "14:00", days: "daily" },
      { start: "17:00", days: "daily" },
      { start: "20:00", days: "daily" },
    ],
  },
  {
    id: "portaventura-salou",
    code: "L20",
    name: "PortAventura — Salou — Cambrils",
    color: "#db2777",
    type: "regular",
    priceFrom: 3.0,
    durationMin: 25,
    stops: stops([
      ["portaventura", 0],
      ["la-pineda", 6],
      ["salou", 12],
      ["cambrils", 25],
    ]),
    trips: [
      { start: "08:00", days: "summer" },
      { start: "10:00", days: "daily" },
      { start: "12:00", days: "daily" },
      { start: "14:00", days: "daily" },
      { start: "16:00", days: "daily" },
      { start: "18:00", days: "daily" },
      { start: "20:00", days: "daily" },
      { start: "23:00", days: "summer" },
    ],
  },
];

export const LINE_MAP: Record<string, BusLine> = BUS_LINES.reduce(
  (acc, line) => {
    acc[line.id] = line;
    return acc;
  },
  {} as Record<string, BusLine>
);

export function getLine(id: string): BusLine | undefined {
  return LINE_MAP[id];
}

export interface RouteSegmentStop {
  locationId: string;
  name: string;
  arrival: string;
  departure: string;
  lat: number;
  lng: number;
}

export interface RouteOption {
  lineId: string;
  lineCode: string;
  lineName: string;
  color: string;
  type: BusLine["type"];
  originId: string;
  originName: string;
  destinationId: string;
  destinationName: string;
  departure: string;
  arrival: string;
  durationMin: number;
  price: number;
  transfers: number;
  segments: RouteSegmentStop[];
  direct: boolean;
}

function addMinutes(hhmm: string, mins: number): string {
  const [h, m] = hhmm.split(":").map(Number);
  const total = h * 60 + m + mins;
  const hh = Math.floor(total / 60) % 24;
  const mm = total % 60;
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}

function inTimeSlot(hhmm: string, slot: string): boolean {
  if (slot === "any") return true;
  const [h] = hhmm.split(":").map(Number);
  const minutes = h;
  const slots: Record<string, [number, number]> = {
    "00-07": [0, 7],
    "07-10": [7, 10],
    "10-12": [10, 12],
    "12-16": [12, 16],
    "16-18": [16, 18],
    "18-20": [18, 20],
    "20-24": [20, 24],
  };
  const [start, end] = slots[slot] ?? [0, 24];
  return minutes >= start && minutes < end;
}

function dayMatch(tripDays: ScheduledTrip["days"]): boolean {
  // For the search we consider any day valid; in a real app we'd filter by date.
  return true;
}

/**
 * Build the ordered list of segment stops between origin and destination
 * indices on a given line trip.
 */
function buildSegments(
  line: BusLine,
  tripStart: string,
  originIdx: number,
  destIdx: number
): RouteSegmentStop[] {
  const segs: RouteSegmentStop[] = [];
  const start = Math.min(originIdx, destIdx);
  const end = Math.max(originIdx, destIdx);
  const reverse = originIdx > destIdx;
  for (let i = start; i <= end; i++) {
    const stop = line.stops[i];
    const loc = LOCATION_MAP[stop.locationId];
    if (!loc) continue;
    const time = addMinutes(tripStart, stop.offsetMin);
    segs.push({
      locationId: stop.locationId,
      name: loc.name,
      arrival: time,
      departure: time,
      lat: loc.lat,
      lng: loc.lng,
    });
  }
  if (reverse) segs.reverse();
  return segs;
}

function buildOption(
  line: BusLine,
  trip: ScheduledTrip,
  originIdx: number,
  destIdx: number
): RouteOption {
  const origin = line.stops[originIdx];
  const dest = line.stops[destIdx];
  const originLoc = LOCATION_MAP[origin.locationId];
  const destLoc = LOCATION_MAP[dest.locationId];
  const segments = buildSegments(line, trip.start, originIdx, destIdx);
  const duration =
    Math.abs(dest.offsetMin - origin.offsetMin) || line.durationMin;
  const arrival = addMinutes(trip.start, duration);
  return {
    lineId: line.id,
    lineCode: line.code,
    lineName: line.name,
    color: line.color,
    type: line.type,
    originId: origin.locationId,
    originName: originLoc?.name ?? origin.locationId,
    destinationId: dest.locationId,
    destinationName: destLoc?.name ?? dest.locationId,
    departure: trip.start,
    arrival,
    durationMin: duration,
    price: Math.max(
      line.priceFrom,
      Math.round((duration / line.durationMin) * line.priceFrom * 100) / 100
    ),
    transfers: 0,
    segments,
    direct: true,
  };
}

export interface SearchParams {
  originId?: string;
  destinationId?: string;
  timeSlot?: string; // "any" | "00-07" | "07-10" | ...
  routeType?: "any" | "direct" | "transfers";
  days?: ScheduledTrip["days"];
  limit?: number;
}

/**
 * Search bus line options matching the given parameters.
 * If both origin and destination are provided, returns direct options on
 * single lines that pass through both stops (in either direction). If
 * routeType allows transfers, also synthesises transfer options at major
 * hubs (Tarragona, Reus, Salou).
 */
export function searchRoutes(params: SearchParams): RouteOption[] {
  const {
    originId,
    destinationId,
    timeSlot = "any",
    routeType = "any",
    limit = 20,
  } = params;

  const options: RouteOption[] = [];

  // Direct options.
  if (originId && destinationId && originId !== destinationId) {
    for (const line of BUS_LINES) {
      const originIdx = line.stops.findIndex((s) => s.locationId === originId);
      const destIdx = line.stops.findIndex(
        (s) => s.locationId === destinationId
      );
      if (originIdx === -1 || destIdx === -1) continue;
      if (originIdx === destIdx) continue;
      for (const trip of line.trips) {
        if (!dayMatch(trip.days)) continue;
        if (!inTimeSlot(trip.start, timeSlot)) continue;
        options.push(buildOption(line, trip, originIdx, destIdx));
      }
    }
  }

  // Transfer options (synthesised at major hubs) when allowed and no/limited direct.
  const allowTransfers = routeType === "transfers" || routeType === "any";
  if (allowTransfers && originId && destinationId && originId !== destinationId) {
    const hubs = ["tarragona", "reus", "salou"];
    for (const hub of hubs) {
      if (hub === originId || hub === destinationId) continue;
      const leg1Options = directOptions(originId, hub, timeSlot);
      const leg2Options = directOptions(hub, destinationId, timeSlot);
      for (const leg1 of leg1Options.slice(0, 2)) {
        for (const leg2 of leg2Options.slice(0, 2)) {
          // Allow ~15-45 min transfer window.
          const leg1ArrivalMin = toMinutes(leg1.arrival);
          const leg2DepartMin = toMinutes(leg2.departure);
          if (leg2DepartMin <= leg1ArrivalMin) continue;
          const wait = leg2DepartMin - leg1ArrivalMin;
          if (wait > 180) continue;
          options.push({
            ...leg1,
            transfers: 1,
            direct: false,
            durationMin: leg1.durationMin + leg2.durationMin + wait,
            arrival: leg2.arrival,
            price: Math.round((leg1.price + leg2.price) * 100) / 100,
            segments: [...leg1.segments, ...leg2.segments],
          });
        }
      }
    }
  }

  // Sort: direct first, then by departure time.
  options.sort((a, b) => {
    if (a.direct !== b.direct) return a.direct ? -1 : 1;
    return toMinutes(a.departure) - toMinutes(b.departure);
  });

  if (routeType === "direct") {
    return options.filter((o) => o.direct).slice(0, limit);
  }
  if (routeType === "transfers") {
    return options.filter((o) => !o.direct).slice(0, limit);
  }
  return options.slice(0, limit);
}

function directOptions(
  originId: string,
  destinationId: string,
  timeSlot: string
): RouteOption[] {
  const out: RouteOption[] = [];
  for (const line of BUS_LINES) {
    const originIdx = line.stops.findIndex((s) => s.locationId === originId);
    const destIdx = line.stops.findIndex((s) => s.locationId === destinationId);
    if (originIdx === -1 || destIdx === -1 || originIdx === destIdx) continue;
    for (const trip of line.trips) {
      if (!dayMatch(trip.days)) continue;
      if (!inTimeSlot(trip.start, timeSlot)) continue;
      out.push(buildOption(line, trip, originIdx, destIdx));
    }
  }
  return out;
}

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

export function getAllStopLocations(): GeoLocation[] {
  const ids = new Set<string>();
  BUS_LINES.forEach((l) => l.stops.forEach((s) => ids.add(s.locationId)));
  return Array.from(ids)
    .map((id) => LOCATION_MAP[id])
    .filter(Boolean);
}

export function getPopularLines(): BusLine[] {
  return BUS_LINES.filter((l) => l.popular);
}

export { LOCATIONS };
