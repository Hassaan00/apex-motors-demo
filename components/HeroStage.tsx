"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CarArt from "./CarArt";
import { cars, usd } from "@/lib/data";
const picks = [cars[0], cars[2], cars[9], cars[8]];
export default function HeroStage() {
  const [i, setI] = useState(0); const c = picks[i];
  return (
    <div className="relative">
      <div className="absolute inset-x-0 bottom-6 h-40 overflow-hidden"><div className="grid-floor absolute inset-x-[-50%] top-0 h-[300px]" /></div>
      <div className="absolute left-1/2 top-1/2 h-72 w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[90px]" style={{ background: c.hex, opacity: 0.35 }} />
      <AnimatePresence mode="wait">
        <motion.div key={c.id} initial={{ opacity: 0, x: 80 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -80 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} className="relative">
          <div className="aspect-[400/220] w-full lg:origin-left lg:translate-x-6 lg:scale-105"><CarArt hex={c.hex} body={c.body} id={"hero" + c.id} studio={false} /></div>
        </motion.div>
      </AnimatePresence>
      <div className="relative mt-2 flex items-end justify-between gap-4">
        <div><p className="font-mono text-[11px] uppercase tracking-[.25em] text-white/45">{c.year} · {c.color}</p><Link href={`/inventory/${c.id}`} className="font-display text-3xl font-black uppercase italic text-white hover:text-volt-400 sm:text-4xl">{c.make} {c.model}</Link>
          <p className="mt-1 font-mono text-sm text-white/60">{c.hp} HP · 0–60 {c.zero60}s · <span className="text-white">{usd(c.price)}</span></p></div>
        <div className="flex gap-2">{[[ChevronLeft, -1, "Previous car"], [ChevronRight, 1, "Next car"]].map(([I, d, l]: any) => <button key={l} aria-label={l} onClick={() => setI((i + d + picks.length) % picks.length)} className="grid h-11 w-11 place-items-center rounded-md border border-white/15 text-white hover:border-volt-500 hover:bg-volt-500"><I size={18} /></button>)}</div>
      </div>
      <div className="mt-4 flex gap-1.5">{picks.map((p, k) => <button key={p.id} aria-label={`Show ${p.make} ${p.model}`} onClick={() => setI(k)} className={`h-1 flex-1 rounded-full transition ${k === i ? "bg-volt-500" : "bg-white/15"}`} />)}</div>
    </div>
  );
}
