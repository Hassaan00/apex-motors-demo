"use client";
import { useState } from "react";
import { Loader2, Check } from "lucide-react";
import { cars, usd, finance, tradeIn, carName } from "@/lib/data";
function R({ label, v, set, min, max, step, show }: any) {
  return <label className="block"><span className="flex justify-between text-sm"><span className="text-white/55">{label}</span><span className="font-mono font-medium text-white">{show}</span></span>
    <input type="range" min={min} max={max} step={step} value={v} onChange={(e) => set(+e.target.value)} className="mt-2.5 w-full accent-[#ff3b1f]" /></label>;
}
export function FinanceCalc({ carId: c0 = cars[0].id, fixed = false }: { carId?: string; fixed?: boolean }) {
  const [carId, setCar] = useState(c0); const car = cars.find((c) => c.id === carId)!;
  const [down, setDown] = useState(Math.round(car.price * 0.2 / 1000) * 1000); const [months, setMonths] = useState(60); const [tier, setTier] = useState("good"); const [trade, setTrade] = useState(0);
  const f = finance(car.price, down, months, tier, trade);
  const [name, setName] = useState(""); const [contact, setContact] = useState(""); const [busy, setBusy] = useState(false); const [done, setDone] = useState("");
  async function submit(e: React.FormEvent) { e.preventDefault(); setBusy(true); const r = await fetch("/api/finance", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ carId, down, months, tier, tradeIn: trade, name, contact, sessionId: sessionStorage.getItem("apx-session") }) }); const j = await r.json(); setBusy(false); if (j.ok) setDone(j.enquiry.id); }
  return (
    <div className={`cut grid gap-8 border border-white/10 bg-carbon-900 p-6 sm:p-8 ${fixed ? "md:grid-cols-2" : "lg:grid-cols-[1.3fr_1fr]"}`}>
      <div className="space-y-6">
        {!fixed && <select aria-label="Vehicle" value={carId} onChange={(e) => { setCar(e.target.value); const p = cars.find((c) => c.id === e.target.value)!.price; setDown(Math.round(p * 0.2 / 1000) * 1000); }} className="field">{cars.map((c) => <option key={c.id} value={c.id}>{carName(c)} · {usd(c.price)}</option>)}</select>}
        <R label="Down payment" v={down} set={setDown} min={0} max={Math.round(car.price * 0.6)} step={1000} show={usd(down)} />
        <R label="Trade-in credit" v={trade} set={setTrade} min={0} max={80000} step={500} show={usd(trade)} />
        <div><p className="text-sm text-white/55">Term</p><div className="mt-2 grid grid-cols-4 gap-2">{[36, 48, 60, 72].map((m) => <button key={m} onClick={() => setMonths(m)} aria-pressed={months === m} className={`rounded-md border py-2 font-mono text-sm ${months === m ? "border-volt-500 bg-volt-500/15 text-white" : "border-white/10 text-white/60"}`}>{m} mo</button>)}</div></div>
        <div><p className="text-sm text-white/55">Credit</p><div className="mt-2 grid grid-cols-4 gap-2">{["excellent", "good", "fair", "rebuilding"].map((t) => <button key={t} onClick={() => setTier(t)} aria-pressed={tier === t} className={`rounded-md border py-2 text-[12px] capitalize ${tier === t ? "border-volt-500 bg-volt-500/15 text-white" : "border-white/10 text-white/60"}`}>{t}</button>)}</div></div>
      </div>
      <div className="flex flex-col justify-between rounded-md bg-carbon-950 p-6 ring-1 ring-white/10">
        <div><p className="kicker">Est. monthly</p><p className="mt-3 font-display text-5xl font-black italic text-white xl:text-6xl">{usd(f.monthly)}</p><p className="mt-1 font-mono text-xs text-white/45">{f.apr}% APR · {months} months · {carName(car)}</p></div>
        <dl className="mt-6 space-y-2 border-t border-white/10 pt-4 text-sm"><div className="flex justify-between"><dt className="text-white/50">Amount financed</dt><dd className="font-mono">{usd(f.amountFinanced)}</dd></div><div className="flex justify-between"><dt className="text-white/50">Tax & fees (est.)</dt><dd className="font-mono">{usd(f.taxAndFees)}</dd></div><div className="flex justify-between"><dt className="text-white/50">Total interest</dt><dd className="font-mono">{usd(f.totalInterest)}</dd></div></dl>
        {done ? <p className="mt-5 flex items-center gap-2 rounded-md bg-emerald-500/10 p-3 text-sm text-emerald-300"><Check size={16} />Sent. A finance specialist will call you. Ref {done}</p> :
          <form onSubmit={submit} className="mt-5 space-y-2"><div className="grid gap-2 sm:grid-cols-2"><input required aria-label="Name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="field" /><input required aria-label="Phone or email" placeholder="Phone or email" value={contact} onChange={(e) => setContact(e.target.value)} className="field" /></div>
            <button className="btn-volt w-full" disabled={busy}>{busy && <Loader2 size={15} className="animate-spin" />}Get pre-approved</button></form>}
      </div>
    </div>
  );
}
export function TradeIn({ compact = false }: { compact?: boolean }) {
  const [make, setMake] = useState("BMW"); const [model, setModel] = useState("X3"); const [year, setYear] = useState(2020); const [miles, setMiles] = useState(42000); const [cond, setCond] = useState("good");
  const v = tradeIn(make, model, year, miles, cond);
  return (
    <div className={`cut grid gap-6 border border-white/10 bg-carbon-900 p-6 sm:p-8 ${compact ? "" : "md:grid-cols-2"}`}>
      <div className="grid grid-cols-2 gap-3">
        <label className="text-sm text-white/55">Make<input value={make} onChange={(e) => setMake(e.target.value)} className="field mt-1.5" /></label>
        <label className="text-sm text-white/55">Model<input value={model} onChange={(e) => setModel(e.target.value)} className="field mt-1.5" /></label>
        <label className="text-sm text-white/55">Year<select value={year} onChange={(e) => setYear(+e.target.value)} className="field mt-1.5">{Array.from({ length: 15 }).map((_, i) => <option key={i}>{2025 - i}</option>)}</select></label>
        <label className="text-sm text-white/55">Condition<select value={cond} onChange={(e) => setCond(e.target.value)} className="field mt-1.5 capitalize">{["excellent", "good", "fair", "poor"].map((c) => <option key={c} value={c}>{c}</option>)}</select></label>
        <div className="col-span-2"><R label="Mileage" v={miles} set={setMiles} min={0} max={150000} step={1000} show={`${miles.toLocaleString()} mi`} /></div>
      </div>
      <div className="flex flex-col justify-center rounded-md bg-gradient-to-br from-volt-500/20 to-transparent p-6 ring-1 ring-volt-500/30">
        <p className="kicker">Instant trade-in range</p>
        <p className="mt-3 whitespace-nowrap font-display text-3xl font-black italic text-white xl:text-4xl">{usd(v.low)}–{usd(v.high)}</p>
        <p className="mt-2 text-sm text-white/55">{year} {make} {model}. Final offer after a 20-minute inspection, valid 7 days, paid same day.</p>
        <button onClick={() => window.dispatchEvent(new CustomEvent("open-chat", { detail: `I want to trade in my ${year} ${make} ${model} with ${miles} miles, ${cond} condition.` }))} className="btn-dark mt-5 w-fit">Lock it in with Max</button>
      </div>
    </div>
  );
}
