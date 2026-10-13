import { NextResponse } from "next/server";
import { brand, cars, DRIVE_TIMES, TZ, getCar, usd, carName, finance, tradeIn, APR } from "@/lib/data";
import { fallback, detectLang, busy } from "@/lib/fallback";
import { groq, Busy, CONFIRM_RE, dayList, weekday } from "@/lib/groq";
import { availability, createDrive, SlotTaken, upsertLead, saveFinance, type Drive } from "@/lib/store";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const catalog = cars.map((c) => `${c.id}: ${usd(c.price)}, ${c.miles.toLocaleString()}mi, ${c.body}, ${c.condition}`).join("\n");
const system = () => `You are Max, the sharp, friendly AI sales assistant at ${brand.name}, a premium car showroom at ${brand.address}. Phone ${brand.phone}. Hours ${brand.hours}.
INVENTORY (only these exist; use search_inventory for specs and details):
${catalog}
FINANCE: APR by credit: excellent ${APR.excellent}%, good ${APR.good}%, fair ${APR.fair}%, rebuilding ${APR.rebuilding}%. Terms 36-72 months. Use estimate_finance for payments, estimate_trade_in for trade values (estimates subject to inspection). We ship nationwide and export to the Gulf and Europe.
DATES (${TZ}): ${dayList(TZ, ["Sun"], 14)}. Test-drive times Mon-Sat: ${DRIVE_TIMES.join(", ")}.
RULES: Always answer the question first (e.g. search and name matching cars) and only ask for name/contact when booking. Find out what they want (body style, budget, must-haves), how they'll pay (cash, finance, lease), any trade-in, and timeline (1-2 questions at a time). Call save_lead whenever you learn any of these or their name/contact. Recommend 1-3 real cars via search_inventory. Before offering or accepting a test-drive time ALWAYS call check_availability. Collect full name and phone or email, summarise and ask to confirm; only after a clear yes call create_test_drive, then give the reference. Never say it is booked unless create_test_drive returned ok.
STYLE: reply in the user's language. 1-3 short spoken-style sentences, plain text, no markdown, lists or URLs. Prices in USD.`;
const ids = cars.map((c) => c.id);
const tools = [
  { type: "function", function: { name: "search_inventory", description: "Search cars in stock", parameters: { type: "object", properties: { query: { type: "string", description: "make/model words" }, body: { type: "string", enum: ["Coupe", "SUV", "Sedan", "Wagon", "Convertible"] }, fuel: { type: "string", enum: ["Gas", "Electric", "Hybrid"] }, maxPrice: { type: "number" }, minPrice: { type: "number" } } } } },
  { type: "function", function: { name: "check_availability", description: "Free test-drive times", parameters: { type: "object", properties: { carId: { type: "string", enum: ids }, date: { type: "string", description: "YYYY-MM-DD" } }, required: ["carId", "date"] } } },
  { type: "function", function: { name: "create_test_drive", description: "Book test drive after explicit confirmation", parameters: { type: "object", properties: { carId: { type: "string", enum: ids }, date: { type: "string" }, time: { type: "string", enum: DRIVE_TIMES }, name: { type: "string" }, phone: { type: "string" }, email: { type: "string" }, notes: { type: "string" } }, required: ["carId", "date", "time", "name"] } } },
  { type: "function", function: { name: "estimate_finance", description: "Monthly payment estimate", parameters: { type: "object", properties: { carId: { type: "string", enum: ids }, down: { type: "number" }, months: { type: "number", enum: [36, 48, 60, 72] }, credit: { type: "string", enum: ["excellent", "good", "fair", "rebuilding"] }, tradeInValue: { type: "number" } }, required: ["carId"] } } },
  { type: "function", function: { name: "estimate_trade_in", description: "Trade-in value range", parameters: { type: "object", properties: { make: { type: "string" }, model: { type: "string" }, year: { type: "number" }, miles: { type: "number" }, condition: { type: "string", enum: ["excellent", "good", "fair", "poor"] } }, required: ["make", "model", "year", "miles"] } } },
  { type: "function", function: { name: "save_lead", description: "Save buyer requirements", parameters: { type: "object", properties: { budget: { type: "number" }, bodyType: { type: "string" }, financing: { type: "string", description: "cash, finance, lease" }, creditTier: { type: "string" }, monthlyTarget: { type: "number" }, tradeIn: { type: "string" }, timeline: { type: "string" }, name: { type: "string" }, phone: { type: "string" }, email: { type: "string" }, notes: { type: "string" } } } } },
];
function search(a: any) {
  const q = String(a.query || "").toLowerCase().split(/\s+/).filter((w) => w.length > 1);
  return cars.filter((c) => (!a.body || c.body === a.body) && (!a.fuel || c.fuel === a.fuel) && (!a.maxPrice || c.price <= a.maxPrice * 1.08) && (!a.minPrice || c.price >= a.minPrice * 0.92)
    && (!q.length || q.some((w) => (c.make + " " + c.model + " " + c.trim + " " + c.color).toLowerCase().includes(w)))).slice(0, 4);
}
export async function POST(req: Request) {
  const t0 = Date.now();
  let messages: { role: "user" | "assistant"; content: string }[] = []; let channel: "chat" | "voice" = "chat"; let sessionId = "";
  try { const b = await req.json(); channel = b.channel === "voice" ? "voice" : "chat"; sessionId = String(b.sessionId || "").slice(0, 40);
    messages = (b.messages || []).slice(-12).map((m: any) => ({ role: m.role === "assistant" ? "assistant" : "user", content: String(m.content).slice(0, 1500) })); } catch {}
  const last = [...messages].reverse().find((m) => m.role === "user")?.content || "";
  const key = process.env.GROQ_API_KEY;
  let booking: Drive | undefined; let cardIds: string[] = [];
  const card = () => booking && { ref: booking.ref, title: "Test drive confirmed", href: `/inventory/${booking.carId}`, lines: [["Car", booking.car.replace(/^\d{4} /, "")], ["When", `${weekday(booking.date).slice(0, 3)} ${booking.date} · ${booking.time}`], ["Driver", booking.name], ["Where", "Apex Motors, Biscayne Blvd"]] };
  const items = () => [...new Set(cardIds)].slice(0, 3).map((id) => { const c = getCar(id)!; return { id, title: `${c.make} ${c.model}`, sub: `${c.year} · ${c.trim} · ${c.miles.toLocaleString()} mi`, price: usd(c.price), href: `/inventory/${id}`, art: { hex: c.hex, body: c.body } }; });
  const out = (reply: string, source: string) => NextResponse.json({ reply, source, booking: card(), items: items() });
  if (key) {
    try {
      const confirmed = CONFIRM_RE.test(last);
      const convo: any[] = [{ role: "system", content: system() }, ...messages]; let corrected = false; let pending: any = null;
      for (let i = 0; i < 6; i++) {
        const msg = await groq(key, convo, tools, 0, t0 + 52000);
        if (!msg) break;
        if (msg.tool_calls?.length) {
          convo.push({ role: "assistant", content: msg.content || "", tool_calls: msg.tool_calls });
          for (const tc of msg.tool_calls) {
            let result: any; let a: any = {};
            try { a = JSON.parse(tc.function.arguments || "{}"); } catch {}
            try {
              const n = tc.function.name;
              if (n === "search_inventory") { const r = search(a); cardIds = r.map((c) => c.id); result = { count: r.length, results: r.map((c) => ({ id: c.id, name: carName(c), price: usd(c.price), miles: c.miles, color: c.color, hp: c.hp, zero60: c.zero60, condition: c.condition, features: c.features.join(", ") })), note: r.length ? undefined : "No exact match; suggest the closest cars from inventory." };
                if (sessionId && r.length) await upsertLead(sessionId, { interested: r.map((c) => c.id) }, channel).catch(() => {}); }
              else if (n === "check_availability") result = await availability(a.carId, a.date);
              else if (n === "estimate_finance") { const c = getCar(a.carId); if (!c) throw new Error("unknown car"); const months = a.months || 60; const down = a.down ?? Math.round(c.price * 0.2); const tier = a.credit || "good";
                const f = finance(c.price, down, months, tier, a.tradeInValue || 0); result = { car: carName(c), price: c.price, down, months, credit: tier, ...f, note: "Estimate incl. ~7% tax & fees, subject to credit approval" };
                await saveFinance({ carId: c.id, car: carName(c), price: c.price, down, months, tier, tradeIn: a.tradeInValue, monthly: f.monthly, apr: f.apr, source: channel }).catch(() => {});
                if (sessionId) await upsertLead(sessionId, { financing: "finance", creditTier: tier, interested: [c.id] }, channel).catch(() => {}); }
              else if (n === "estimate_trade_in") { const r = tradeIn(a.make, a.model, a.year, a.miles, a.condition); result = { ...r, note: "Instant estimate, final offer after a 20-minute inspection" };
                if (sessionId) await upsertLead(sessionId, { tradeIn: `${a.year} ${a.make} ${a.model}, ${a.miles} mi`, tradeInValue: `${usd(r.low)}–${usd(r.high)}` }, channel).catch(() => {}); }
              else if (n === "save_lead") { const l = await upsertLead(sessionId, a, channel); result = { ok: true, score: l.score }; }
              else if (n === "create_test_drive") {
                if (!confirmed) { pending = a; result = { ok: false, error: "needs_confirmation", message: "Not booked yet. Summarise and ask the user to confirm first." }; }
                else if (booking) result = { ok: true, ref: booking.ref };
                else { booking = await createDrive({ ...a, source: channel }); cardIds = [];
                  await upsertLead(sessionId, { name: a.name, phone: a.phone, email: a.email, drives: [booking.ref], interested: [booking.carId] }, channel).catch(() => {});
                  result = { ok: true, ref: booking.ref, weekday: weekday(booking.date), testDrive: booking }; }
              } else result = { error: "unknown tool" };
            } catch (e: any) { result = e instanceof SlotTaken ? { ok: false, error: "slot_taken", message: "That slot was just taken. Check availability again and offer alternatives." } : { ok: false, error: e?.message || "failed" }; }
            convo.push({ role: "tool", tool_call_id: tc.id, content: JSON.stringify(result) });
          }
          continue;
        }
        const reply = (msg.content || "").trim();
        if (reply && !booking && pending && !/\?\s*$/.test(reply)) return out(`Just to confirm: a test drive of the ${getCar(pending.carId) ? carName(getCar(pending.carId)!) : "car"} on ${pending.date} at ${pending.time}, for ${pending.name}${pending.phone || pending.email ? " (" + (pending.phone || pending.email) + ")" : ""}. Shall I book it?`, "groq");
        if (reply && !booking && !corrected && /\b(confirmed|booked|is set|reserved|all set)\b|confirmad|bestätigt|gebucht|confirmé|réservé/i.test(reply) && !/\?\s*$/.test(reply)) {
          corrected = true; convo.push({ role: "assistant", content: reply }, { role: "system", content: "Correction: nothing is booked yet (create_test_drive has not succeeded). Do not claim a booking. Continue: check availability, collect full name and phone/email, summarise and ask the user to confirm." }); continue;
        }
        if (reply && !booking && corrected && /\b(confirmed|booked|reserved|all set)\b/i.test(reply) && !/\?\s*$/.test(reply)) return out("Perfect, I have everything I need. Shall I go ahead and lock in this test drive for you?", "groq");
        if (reply) return out(reply, "groq");
        break;
      }
      if (booking) return out(`You're all set! Your test-drive reference is ${booking.ref}.`, "groq");
    } catch (e) { console.error("chat error", e); if (booking) return out(`You're all set! Your test-drive reference is ${booking.ref}.`, "groq"); if (e instanceof Busy) return out(busy[detectLang(last)], "busy"); }
  }
  return out(fallback(last), "fallback");
}
