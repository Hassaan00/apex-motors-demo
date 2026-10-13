"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, Zap } from "lucide-react";
import Logo from "./Logo";
const links = [["Inventory", "/inventory"], ["SUVs", "/inventory?body=SUV"], ["Electric", "/inventory?fuel=Electric"], ["Finance", "/#finance"], ["Trade-in", "/#trade"], ["App", "/app"]];
export default function Nav() {
  const [s, setS] = useState(false); const [m, setM] = useState(false);
  useEffect(() => { const f = () => setS(window.scrollY > 20); f(); window.addEventListener("scroll", f); return () => window.removeEventListener("scroll", f); }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition ${s ? "border-b border-white/10 bg-carbon-950/85 backdrop-blur-xl" : ""}`}>
      <nav className="container-x flex h-[72px] items-center justify-between" aria-label="Main">
        <Logo />
        <div className="hidden items-center gap-7 lg:flex">{links.map(([l, h]) => <Link key={l} href={h} className="text-[12px] font-semibold uppercase tracking-[.16em] text-white/60 transition hover:text-white">{l}</Link>)}</div>
        <div className="flex items-center gap-2">
          <a href="tel:+13055550188" className="hidden text-[13px] text-white/60 hover:text-white xl:block">(305) 555-0188</a>
          <button onClick={() => window.dispatchEvent(new Event("open-chat"))} className="hidden items-center gap-2 rounded-md bg-volt-500 px-4 py-2 text-[12px] font-bold uppercase tracking-[.12em] text-white transition hover:bg-volt-400 md:flex"><Zap size={14} />Ask Max</button>
          <button className="rounded-md p-2 text-white lg:hidden" aria-label="Menu" aria-expanded={m} onClick={() => setM(!m)}>{m ? <X /> : <Menu />}</button>
        </div>
      </nav>
      {m && <div className="border-t border-white/10 bg-carbon-950/95 px-5 pb-6 pt-2 lg:hidden">{links.map(([l, h]) => <Link key={l} href={h} onClick={() => setM(false)} className="block border-b border-white/5 py-3 font-semibold uppercase tracking-wider text-white/80">{l}</Link>)}</div>}
    </header>
  );
}
