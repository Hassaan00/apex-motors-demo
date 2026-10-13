import { NextResponse } from "next/server";
import { saveFinance, upsertLead } from "@/lib/store";
import { getCar, carName, finance } from "@/lib/data";
export const dynamic = "force-dynamic";
export async function POST(req: Request) {
  const b = await req.json().catch(() => null); const c = getCar(b?.carId || "");
  const price = c?.price || +b?.price; if (!price || !b?.name || !b?.contact) return NextResponse.json({ ok: false, error: "Name, contact and price are required" }, { status: 400 });
  const f = finance(price, +b.down || 0, +b.months || 60, b.tier || "good", +b.tradeIn || 0);
  const e = await saveFinance({ carId: c?.id, car: c ? carName(c) : "Custom", price, down: +b.down || 0, months: +b.months || 60, tier: b.tier || "good", tradeIn: +b.tradeIn || 0, monthly: f.monthly, apr: f.apr, name: String(b.name).slice(0, 80), contact: String(b.contact).slice(0, 120), source: "form" });
  await upsertLead(b.sessionId || e.id, { name: e.name, [String(b.contact).includes("@") ? "email" : "phone"]: e.contact, financing: "finance", creditTier: e.tier, monthlyTarget: e.monthly, interested: c ? [c.id] : undefined }, "form").catch(() => {});
  return NextResponse.json({ ok: true, enquiry: e });
}
