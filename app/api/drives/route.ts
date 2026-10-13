import { NextResponse } from "next/server";
import { createDrive, SlotTaken, upsertLead } from "@/lib/store";
export const dynamic = "force-dynamic";
export async function POST(req: Request) {
  const b = await req.json().catch(() => null);
  if (!b) return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  try { const d = await createDrive({ ...b, source: "form" }); await upsertLead(b.sessionId || d.ref, { name: d.name, phone: d.phone, email: d.email, drives: [d.ref], interested: [d.carId] }, "form").catch(() => {}); return NextResponse.json({ ok: true, drive: d }); }
  catch (e: any) { if (e instanceof SlotTaken) return NextResponse.json({ ok: false, error: "Sorry, that slot was just taken. Please pick another time." }, { status: 409 }); return NextResponse.json({ ok: false, error: e?.message || "Could not book" }, { status: 400 }); }
}
