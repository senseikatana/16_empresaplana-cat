import { NextResponse } from "next/server";
import { LOCATIONS, searchLocations } from "@/lib/locations";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";
  const limit = Number(searchParams.get("limit") || 200);
  const results = q ? searchLocations(q, limit) : LOCATIONS.slice(0, limit);
  return NextResponse.json({ ok: true, count: results.length, locations: results });
}
