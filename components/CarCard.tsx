import Link from "next/link";
import { Gauge, Zap, Timer, ArrowRight } from "lucide-react";
import CarArt from "./CarArt";
import { usd, finance, type Car } from "@/lib/data";
export default function CarCard({ c }: { c: Car }) {
  const est = finance(c.price, Math.round(c.price * 0.2), 72, "excellent").monthly;
  return (
    <article className="cut group relative overflow-hidden border border-white/10 bg-gradient-to-b from-carbon-800/60 to-carbon-900 transition duration-300 hover:border-volt-500/60">
      <Link href={`/inventory/${c.id}`} className="absolute inset-0 z-10" aria-label={`${c.year} ${c.make} ${c.model}, ${usd(c.price)}`} />
      <div className="flex items-center justify-between px-5 pt-4 font-mono text-[10px] uppercase tracking-[.2em] text-white/45"><span>{c.condition} · #{c.stock}</span>{c.tag && <span className="bg-volt-500 px-2 py-0.5 font-bold text-white">{c.tag}</span>}</div>
      <div className="relative h-44 px-2 transition duration-500 group-hover:translate-x-1.5 group-hover:scale-[1.03]"><CarArt hex={c.hex} body={c.body} id={c.id} studio={false} /></div>
      <div className="px-5 pb-5">
        <p className="font-mono text-[11px] text-white/45">{c.year} · {c.miles.toLocaleString()} mi · {c.color}</p>
        <h3 className="mt-1 font-display text-2xl font-extrabold uppercase italic leading-none tracking-tight text-white">{c.make} <span className="text-white/90">{c.model}</span></h3>
        <p className="text-sm text-white/55">{c.trim}</p>
        <div className="mt-4 grid grid-cols-3 gap-px overflow-hidden rounded bg-white/10 text-center">
          {[[Zap, `${c.hp} hp`], [Timer, `${c.zero60}s`], [Gauge, `${c.top} mph`]].map(([I, v]: any) => <div key={v} className="bg-carbon-900 py-2"><I size={13} className="mx-auto text-volt-400" /><p className="mt-1 text-[12px] font-semibold text-white">{v}</p></div>)}
        </div>
        <div className="mt-4 flex items-end justify-between">
          <div><p className="font-display text-2xl font-bold text-white">{usd(c.price)}</p><p className="text-[11px] text-white/45">or {usd(est)}/mo est.</p></div>
          <span className="grid h-10 w-10 place-items-center rounded-md bg-white/5 text-white transition group-hover:bg-volt-500"><ArrowRight size={17} /></span>
        </div>
      </div>
    </article>
  );
}
