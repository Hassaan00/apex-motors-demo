import { putNew, readAll, keys, Exists, storageName } from "./kv";
import { getCar, carName, DRIVE_TIMES, TZ } from "./data";
import { normTime, ref, weekday } from "./groq";
export { storageName };
export type Drive = { ref: string; carId: string; car: string; date: string; time: string; name: string; email?: string; phone?: string; notes?: string; source: "chat" | "voice" | "form"; createdAt: string };
export type Lead = { id: string; name?: string; email?: string; phone?: string; budget?: number; bodyType?: string; interested?: string[]; financing?: string; creditTier?: string; monthlyTarget?: number; tradeIn?: string; tradeInValue?: string; timeline?: string; notes?: string; drives?: string[]; score: number; source: string; createdAt: string; updatedAt: string };
export type FinanceEnq = { id: string; carId?: string; car?: string; price: number; down: number; months: number; tier: string; tradeIn?: number; monthly: number; apr: number; name?: string; contact?: string; source: string; createdAt: string };
const D = "drives/v1/", L = "leads/v2/", F = "finance/v1/";
const slot = (cid: string, t: string) => `${cid}_${t.replace(/[^0-9APM]/gi, "")}`;
export const today = () => new Date().toLocaleDateString("en-CA", { timeZone: TZ });
const isOpen = (d: string) => new Date(d + "T12:00:00Z").getUTCDay() !== 0;
export class SlotTaken extends Error {}
export async function availability(carId: string, date: string) {
  const c = getCar(carId); date = String(date || "").slice(0, 10);
  if (!c) return { error: "unknown car id" };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return { error: "date must be YYYY-MM-DD" };
  if (!isOpen(date)) return { carId: c.id, date, weekday: weekday(date), free: [], note: "Closed on Sundays" };
  if (date < today()) return { carId: c.id, date, free: [], note: "date is in the past" };
  const taken = new Set((await keys(D + date + "/")).map((k) => k.split("/").pop()!.replace(/\.json$/, "")));
  return { carId: c.id, car: carName(c), date, weekday: weekday(date), free: DRIVE_TIMES.filter((t) => !taken.has(slot(c.id, t))) };
}
export async function createDrive(i: Partial<Drive>): Promise<Drive> {
  const c = getCar(i.carId || ""); const date = String(i.date || "").slice(0, 10); const time = normTime(i.time || "", DRIVE_TIMES);
  if (!c || !time || !/^\d{4}-\d{2}-\d{2}$/.test(date) || date < today() || !isOpen(date)) throw new Error("Invalid car, date or time (closed Sundays). Valid times: " + DRIVE_TIMES.join(", "));
  if (!i.name || !(i.email || i.phone)) throw new Error("Name and phone or email are required");
  const d: Drive = { ref: ref("APX"), carId: c.id, car: carName(c), date, time, name: String(i.name).slice(0, 80), email: i.email?.slice(0, 120), phone: i.phone?.slice(0, 40), notes: i.notes?.slice(0, 400), source: i.source || "form", createdAt: new Date().toISOString() };
  try { await putNew(`${D}${date}/${slot(c.id, time)}.json`, d); } catch (e) { if (e instanceof Exists) throw new SlotTaken(); throw e; }
  return d;
}
export const listDrives = async () => (await readAll<Drive>(D)).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
export const listFinance = async () => (await readAll<FinanceEnq>(F)).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
export async function saveFinance(f: Omit<FinanceEnq, "id" | "createdAt">) { const e = { ...f, id: ref("FIN"), createdAt: new Date().toISOString() }; await putNew(F + e.id + ".json", e); return e; }
export function scoreLead(l: Partial<Lead>) {
  let s = 0; if (l.budget) s += l.budget >= 150000 ? 22 : l.budget >= 70000 ? 18 : 12; if (l.bodyType) s += 5; if (l.interested?.length) s += 8;
  const t = (l.timeline || "").toLowerCase();
  if (/now|today|asap|this week|immediate|weekend|urgent|saturday|tomorrow/.test(t)) s += 25; else if (/month|30 days|soon/.test(t)) s += 16; else if (t) s += 5;
  const f = (l.financing || "").toLowerCase(); if (/cash/.test(f)) s += 15; else if (/pre-?approv|approved|lease|finance|loan/.test(f)) s += 10;
  if (l.tradeIn) s += 5; if (l.name) s += 3; if (l.phone || l.email) s += 7; if (l.drives?.length) s += 15;
  return Math.min(100, s);
}
// Leads are stored as append-only events (one blob per update) so concurrent updates never overwrite each other.
function mergeLead(id: string, evs: any[]): Lead {
  evs = [...evs].sort((a, b) => String(a._at).localeCompare(String(b._at)));
  const m: any = { id, score: 0, source: evs[0]?._source || "chat", createdAt: evs[0]?._at, updatedAt: evs[evs.length - 1]?._at };
  for (const e of evs) for (const [k, v] of Object.entries(e)) { if (k.startsWith("_") || k === "id") continue;
    if (ARR.includes(k)) m[k] = [...new Set([...(m[k] || []), ...((v as any[]) || [])])]; else m[k] = v; }
  m.score = scoreLead(m); return m as Lead;
}
const ARR = ["interested", "drives"];
export async function listLeads() {
  const evs = await readAll<any>(L); const by = new Map<string, any[]>();
  for (const e of evs) { if (!e?.id) continue; by.set(e.id, [...(by.get(e.id) || []), e]); }
  return [...by.entries()].map(([id, es]) => mergeLead(id, es)).sort((a, b) => b.score - a.score || String(b.updatedAt).localeCompare(String(a.updatedAt)));
}
export async function upsertLead(sessionId: string, patch: Partial<Lead>, source = "chat") {
  const id = (sessionId || ref("S")).replace(/[^a-zA-Z0-9-]/g, "").slice(0, 40);
  const clean = Object.fromEntries(Object.entries(patch).filter(([, v]) => v !== undefined && v !== null && v !== "" && !(Array.isArray(v) && !v.length)));
  const ev = { ...clean, id, _source: source, _at: new Date().toISOString() };
  await putNew(`${L}${id}/${Date.now()}-${Math.random().toString(36).slice(2, 7)}.json`, ev);
  return mergeLead(id, await readAll<any>(`${L}${id}/`));
}
