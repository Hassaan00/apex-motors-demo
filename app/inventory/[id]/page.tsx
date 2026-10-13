import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Zap, Timer, Gauge, Cog, Fuel, Palette, Armchair, Check, ShieldCheck, MessageCircle, Bot } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CarArt from "@/components/CarArt";
import CarCard from "@/components/CarCard";
import DriveForm from "@/components/DriveForm";
import { FinanceCalc, TradeIn } from "@/components/Estimators";
import OpenChat from "@/components/OpenChat";
import { cars, getCar, usd, carName, brand, finance } from "@/lib/data";
export function generateStaticParams() { return cars.map((c) => ({ id: c.id })); }
export function generateMetadata({ params }: { params: { id: string } }): Metadata { const c = getCar(params.id); if (!c) return {}; return { title: `${carName(c)} for sale`, description: `${carName(c)} in ${c.color}, ${c.miles.toLocaleString()} miles, ${c.hp} hp, ${usd(c.price)}. ${c.condition}, in stock in Miami.` }; }
export default function Page({ params }: { params: { id: string } }) {
  const c = getCar(params.id); if (!c) notFound();
  const similar = cars.filter((x) => x.id !== c.id && (x.body === c.body || Math.abs(x.price - c.price) < 40000)).slice(0, 3);
  const ld = { "@context": "https://schema.org", "@type": "Car", name: carName(c), brand: c.make, model: c.model, vehicleModelDate: c.year, color: c.color, mileageFromOdometer: { "@type": "QuantitativeValue", value: c.miles, unitCode: "SMI" }, offers: { "@type": "Offer", price: c.price, priceCurrency: "USD", availability: "https://schema.org/InStock" } };
  const specs = [[Zap, "Power", `${c.hp} hp`], [Timer, "0–60 mph", `${c.zero60} s`], [Gauge, "Top speed", `${c.top} mph`], [Cog, "Drivetrain", `${c.drive} · ${c.trans}`], [Fuel, "Fuel", c.fuel], [Palette, "Exterior", c.color], [Armchair, "Interior", c.interior], [ShieldCheck, "Condition", `${c.condition} · ${c.miles.toLocaleString()} mi`]];
  return (<><Nav /><main id="main" className="pb-24 pt-24">
    <div className="container-x"><Link href="/inventory" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/50 hover:text-white"><ArrowLeft size={14} />Inventory</Link></div>
    <section className="speed relative mt-4 overflow-hidden border-y border-white/10 bg-gradient-to-b from-carbon-900 to-carbon-950">
      <div className="absolute left-1/2 top-1/2 h-72 w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[110px]" style={{ background: c.hex, opacity: 0.35 }} />
      <div className="container-x relative grid items-center gap-8 py-10 lg:grid-cols-[1fr_1.5fr]">
        <div><p className="kicker">{c.condition} · Stock #{c.stock}</p><h1 className="mt-4 font-display text-5xl font-black uppercase italic leading-[.9] text-white sm:text-6xl">{c.make}<br />{c.model}</h1><p className="mt-2 text-lg text-white/60">{c.year} · {c.trim}</p>
          <p className="mt-6 font-display text-5xl font-black text-white">{usd(c.price)}</p>{c.msrp && <p className="font-mono text-sm text-white/45">MSRP {usd(c.msrp)} · save {usd(c.msrp - c.price)}</p>}<p className="mt-1 font-mono text-sm text-volt-300">≈ {usd(finance(c.price, c.price * 0.2, 72, "excellent").monthly)}/mo · 20% down · 72 mo</p></div>
        <div className="aspect-[400/220]"><CarArt hex={c.hex} body={c.body} id={c.id + "big"} studio={false} /></div>
      </div>
    </section>
    <div className="container-x mt-12 grid gap-12 lg:grid-cols-[1.6fr_1fr]">
      <div>
        <h2 className="font-display text-3xl font-black uppercase italic text-white">Specs</h2>
        <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-md bg-white/10 sm:grid-cols-4">{specs.map(([I, k, v]: any) => <div key={k} className="bg-carbon-900 p-4"><I size={16} className="text-volt-500" /><dt className="mt-3 font-mono text-[10px] uppercase tracking-[.18em] text-white/45">{k}</dt><dd className="mt-0.5 text-sm font-semibold text-white">{v}</dd></div>)}</dl>
        <h2 className="mt-12 font-display text-3xl font-black uppercase italic text-white">Highlights</h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">{[...c.features, "172-point inspection passed", "Clean history report"].map((f) => <li key={f} className="flex items-center gap-3 text-white/75"><Check size={16} className="text-volt-500" />{f}</li>)}</ul>
        <h2 className="mt-14 font-display text-3xl font-black uppercase italic text-white">Finance this car</h2><div className="mt-5"><FinanceCalc carId={c.id} fixed /></div>
        <h2 className="mt-14 font-display text-3xl font-black uppercase italic text-white">Value your trade-in</h2><div className="mt-5"><TradeIn /></div>
      </div>
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="cut border border-white/10 bg-carbon-900 p-6">
          <h2 className="font-display text-2xl font-black uppercase italic text-white">Book a test drive</h2><p className="mb-4 mt-1 text-sm text-white/50">Live diary · 45 minutes · bring your licence</p>
          <DriveForm carId={c.id} title={`${c.make} ${c.model}`} />
          <div className="mt-3 grid grid-cols-2 gap-2"><OpenChat msg={`Tell me more about the ${carName(c)}. What would my monthly payment be?`} className="btn-dark !px-3 !py-2.5 !text-[11px]"><Bot size={14} />Ask Max</OpenChat><a href={`${brand.waLink}?text=${encodeURIComponent("Hi, is the " + carName(c) + " still available?")}`} className="btn-dark !px-3 !py-2.5 !text-[11px]"><MessageCircle size={14} />WhatsApp</a></div>
        </div>
      </aside>
    </div>
    <div className="container-x mt-24"><h2 className="h2">Also consider</h2><div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{similar.map((s) => <CarCard key={s.id} c={s} />)}</div></div>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
  </main><Footer /></>);
}
