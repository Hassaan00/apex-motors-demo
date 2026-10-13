"use client";
import { useMemo, useState } from "react";
import { cars, makes, bodies } from "@/lib/data";
import CarCard from "./CarCard";
export default function Inventory({ init = {} as Record<string, string>, limit }: { init?: Record<string, string>; limit?: number }) {
  const [body, setBody] = useState(init.body || "all"); const [make, setMake] = useState(init.make || "all"); const [fuel, setFuel] = useState(init.fuel || "all");
  const [max, setMax] = useState(init.max || "0"); const [cond, setCond] = useState("all"); const [sort, setSort] = useState("featured");
  const list = useMemo(() => { const l = cars.filter((c) => (body === "all" || c.body === body) && (make === "all" || c.make === make) && (fuel === "all" || c.fuel === fuel) && (max === "0" || c.price <= +max) && (cond === "all" || c.condition === cond));
    return sort === "low" ? [...l].sort((a, b) => a.price - b.price) : sort === "high" ? [...l].sort((a, b) => b.price - a.price) : sort === "hp" ? [...l].sort((a, b) => b.hp - a.hp) : sort === "miles" ? [...l].sort((a, b) => a.miles - b.miles) : l; }, [body, make, fuel, max, cond, sort]);
  return (
    <div>
      <div className="flex gap-2 overflow-x-auto pb-2" role="group" aria-label="Body style">
        {["all", ...bodies].map((b) => <button key={b} onClick={() => setBody(b)} aria-pressed={body === b} className={`shrink-0 rounded-md border px-4 py-2 text-[12px] font-bold uppercase tracking-[.14em] transition ${body === b ? "border-volt-500 bg-volt-500 text-white" : "border-white/10 text-white/60 hover:border-white/30 hover:text-white"}`}>{b === "all" ? "All" : b}</button>)}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-5">
        <select aria-label="Make" value={make} onChange={(e) => setMake(e.target.value)} className="field"><option value="all">All makes</option>{makes.map((m) => <option key={m}>{m}</option>)}</select>
        <select aria-label="Fuel" value={fuel} onChange={(e) => setFuel(e.target.value)} className="field"><option value="all">Any fuel</option><option>Gas</option><option>Hybrid</option><option>Electric</option></select>
        <select aria-label="Max price" value={max} onChange={(e) => setMax(e.target.value)} className="field"><option value="0">Any price</option>{[90000, 130000, 170000, 250000].map((m) => <option key={m} value={m}>Under ${m / 1000}k</option>)}</select>
        <select aria-label="Condition" value={cond} onChange={(e) => setCond(e.target.value)} className="field"><option value="all">New & used</option><option>New</option><option>Certified</option><option>Pre-owned</option></select>
        <select aria-label="Sort" value={sort} onChange={(e) => setSort(e.target.value)} className="field col-span-2 md:col-span-1"><option value="featured">Sort: Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option><option value="hp">Most powerful</option><option value="miles">Lowest miles</option></select>
      </div>
      <p className="mt-5 font-mono text-xs uppercase tracking-[.2em] text-white/45">{list.length} vehicles in stock</p>
      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{(limit ? list.slice(0, limit) : list).map((c) => <CarCard key={c.id} c={c} />)}</div>
      {!list.length && <div className="mt-6 border border-dashed border-white/15 p-10 text-center text-white/60">Nothing matches. <button onClick={() => window.dispatchEvent(new CustomEvent("open-chat", { detail: "Nothing matched my filters, what's the closest you have?" }))} className="text-volt-400 underline underline-offset-4">Ask Max to find one</button>.</div>}
    </div>
  );
}
