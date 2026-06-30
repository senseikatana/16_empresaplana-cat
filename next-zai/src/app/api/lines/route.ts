import { NextResponse } from "next/server";
import { BUS_LINES, getPopularLines } from "@/lib/routes";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    ok: true,
    lines: BUS_LINES,
    popular: getPopularLines(),
  });
}
