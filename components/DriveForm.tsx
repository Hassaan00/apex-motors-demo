"use client";
import { useEffect, useState } from "react";
import { Loader2, KeyRound } from "lucide-react";
export default function DriveForm({ carId, title }: { carId: string; title: string }) {
  const days = Array.from({ length: 12 }).map((_, i) => new Date(Date.now() + (i + 1) * 864e5)).filter((d) => d.getDay() !== 0).slice(0, 8).map((d) => d.toLocaleDateString("en-CA", { timeZone: "America/New_York" }));
  const [date, setDate] = useState(days[0]); const [free, setFree] = useState<string[] | null>(null); const [time, setTime] = useState("");
  const [name, setName] = useState(""); const [phone, setPhone] = useState(""); const [busy, setBusy] = useState(false); const [done, setDone] = useState<any>(null); const [err, setErr] = useState("");
  useEffect(() => { setFree(null); setTime(""); fetch(`/api/availability?car=${carId}&date=${date}`).then((r) => r.json()).then((j) => setFree(j.free || [])); }, [date, carId]);
  async function submit(e: React.FormEvent) { e.preventDefault(); setBusy(true); setErr("");
    const r = await fetch("/api/drives", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ carId, date, time, name, phone, sessionId: sessionStorage.getItem("apx-session") }) });
    const j = await r.json(); setBusy(false); if (j.ok) setDone(j.drive); else setErr(j.error); }
  if (done) return <div className="rounded-md border border-volt-500/40 bg-volt-500/10 p-5"><KeyRound className="text-volt-400" /><p className="mt-3 font-display text-2xl font-bold uppercase italic text-white">Keys are waiting</p><p className="mt-1 text-sm text-white/60">{title} · {done.date} at {done.time}. Ref <span className="font-mono text-volt-300">{done.ref}</span></p></div>;
  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="flex gap-1.5 overflow-x-auto pb-1">{days.map((d) => { const dt = new Date(d + "T12:00:00"); return <button type="button" key={d} onClick={() => setDate(d)} aria-pressed={date === d} className={`w-14 shrink-0 rounded-md border py-2 text-center ${date === d ? "border-volt-500 bg-volt-500 text-white" : "border-white/10 text-white/60"}`}><span className="block font-mono text-[9px] uppercase">{dt.toLocaleDateString("en-US", { weekday: "short" })}</span><span className="block text-lg font-bold">{dt.getDate()}</span></button>; })}</div>
      <div className="grid grid-cols-3 gap-1.5" aria-live="polite">{free === null ? <p className="col-span-3 text-sm text-white/40">Checking live availability…</p> : free.length ? free.map((t) => <button type="button" key={t} onClick={() => setTime(t)} aria-pressed={time === t} className={`rounded-md border py-2 font-mono text-[12px] ${time === t ? "border-volt-500 bg-volt-500/15 text-white" : "border-white/10 text-white/60"}`}>{t}</button>) : <p className="col-span-3 text-sm text-white/50">No slots, try another day.</p>}</div>
      <div className="grid grid-cols-2 gap-2"><input required aria-label="Full name" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} className="field" /><input required aria-label="Phone" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="field" /></div>
      {err && <p className="text-sm text-rose-300">{err}</p>}
      <button disabled={!time || busy} className="btn-volt w-full disabled:opacity-40">{busy ? <Loader2 size={15} className="animate-spin" /> : <KeyRound size={15} />}Book test drive</button>
    </form>
  );
}
