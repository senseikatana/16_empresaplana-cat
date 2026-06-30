import { NextRequest, NextResponse } from "next/server";
import { searchRoutes, type SearchParams } from "@/lib/routes";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const originId = searchParams.get("originId") || undefined;
  const destinationId = searchParams.get("destinationId") || undefined;
  const timeSlot = searchParams.get("timeSlot") || "any";
  const routeType = (searchParams.get("routeType") as SearchParams["routeType"]) || "any";
  const limit = Number(searchParams.get("limit") || 20);

  if (!originId || !destinationId) {
    return NextResponse.json(
      { ok: false, error: "originId and destinationId are required" },
      { status: 400 }
    );
  }

  const options = searchRoutes({
    originId,
    destinationId,
    timeSlot,
    routeType,
    limit,
  });

  return NextResponse.json({ ok: true, count: options.length, options });
}
