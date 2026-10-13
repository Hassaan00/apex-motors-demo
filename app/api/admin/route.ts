import { NextResponse } from "next/server";
import { listLeads, listDrives, listFinance, storageName } from "@/lib/store";
export const dynamic = "force-dynamic";
const mask = (s?: string) => (s ? s.replace(/^(.{2}).*(@.*)$/, "$1•••$2").replace(/^(\+?[\d() ]{3}).*(\d{2})$/, "$1•••$2") : undefined);
export async function GET() {
  const [leads, drives, fin] = await Promise.all([listLeads(), listDrives(), listFinance()]);
  return NextResponse.json({ storage: storageName, leads: leads.slice(0, 100).map((l) => ({ ...l, email: mask(l.email), phone: mask(l.phone) })), drives: drives.slice(0, 100).map((d) => ({ ...d, email: mask(d.email), phone: mask(d.phone) })), finance: fin.slice(0, 100).map((f) => ({ ...f, contact: mask(f.contact) })) });
}
