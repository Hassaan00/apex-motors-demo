import { Search, Heart, CalendarDays, Home as HomeIcon, User, Wrench, Bell, Car as CarIcon, Apple, Play, Check, Zap, Droplets, Gauge, KeyRound, ChevronRight } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Phone from "@/components/Phone";
import CarArt from "@/components/CarArt";
import Reveal from "@/components/Reveal";
import { cars } from "@/lib/data";
export const metadata = { title: "The Apex app", description: "Browse live inventory, book test drives, get service reminders and chat with Max in a branded iOS and Android app." };
const k = (n: number) => "$" + Math.round(n / 1000) + "k";
function Tab({ a }: { a: number }) { return <div className="absolute inset-x-0 bottom-0 flex justify-around border-t border-white/10 bg-carbon-950/95 px-4 pb-6 pt-3">{[HomeIcon, Search, KeyRound, Wrench, User].map((I, i) => <I key={i} size={19} className={i === a ? "text-volt-500" : "text-white/35"} />)}</div>; }
export default function AppPage() {
  const c = cars;
  return (<><Nav /><main id="main" className="overflow-hidden pb-24 pt-32">
    <section className="container-x text-center"><Reveal><p className="kicker justify-center">iOS · Android · Your brand</p><h1 className="h2 mx-auto mt-4 max-w-4xl">The showroom<br /><span className="text-volt-500">never closes.</span></h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60">A native app for your buyers and owners: live inventory, two-tap test drives, service reminders and Max built in. Owners who use it book service 2.7× more often.</p>
      <div className="mt-8 flex justify-center gap-3">{[[Apple, "App Store"], [Play, "Google Play"]].map(([I, l]: any) => <span key={l} className="flex items-center gap-2.5 rounded-md border border-white/15 bg-white/[.04] px-5 py-2.5 text-left"><I size={22} /><span><span className="block text-[9px] uppercase tracking-widest text-white/50">Get it on</span><span className="block text-sm font-bold">{l}</span></span></span>)}</div></Reveal></section>
    <section className="relative mt-20"><div className="absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-volt-500/15 blur-[120px]" />
      <div className="container-x relative grid justify-items-center gap-14 md:grid-cols-3">
        <Reveal><figure><Phone>
          <div className="px-5 pt-2"><p className="font-mono text-[10px] uppercase tracking-widest text-white/45">Apex Motors</p><p className="font-display text-2xl font-black uppercase italic text-white">In stock</p>
            <div className="mt-3 flex items-center gap-2 rounded-md bg-white/[.07] px-3 py-2 text-[11px] text-white/40"><Search size={13} />Porsche, SUV, under $150k…</div>
            <div className="mt-3 flex gap-1.5 text-[10px] font-bold uppercase">{["All", "SUV", "Coupe", "EV"].map((x, i) => <span key={x} className={`rounded px-2.5 py-1 ${i === 0 ? "bg-volt-500 text-white" : "bg-white/[.07] text-white/60"}`}>{x}</span>)}</div></div>
          <div className="mt-3 space-y-2.5 px-4">{[c[0], c[2], c[8]].map((x) => <div key={x.id} className="flex items-center gap-2 rounded-md border border-white/10 bg-white/[.04] p-2"><div className="h-14 w-24 shrink-0"><CarArt hex={x.hex} body={x.body} id={"a1" + x.id} studio={false} /></div><div className="min-w-0 flex-1"><p className="truncate text-[12px] font-bold text-white">{x.make} {x.model}</p><p className="font-mono text-[10px] text-white/45">{x.year} · {(x.miles / 1000).toFixed(1)}k mi</p><p className="text-[12px] font-bold text-volt-400">{k(x.price)}</p></div><Heart size={14} className={x.id === c[2].id ? "fill-volt-500 text-volt-500" : "text-white/30"} /></div>)}
            <div className="flex items-center gap-2 rounded-md bg-volt-500/15 p-2.5 text-[11px] text-white"><Bell size={13} className="text-volt-400" />Price drop: Taycan Turbo −$4,000</div></div>
          <Tab a={0} /></Phone><figcaption className="mt-6 text-center"><p className="font-bold uppercase tracking-wide">Live inventory</p><p className="text-sm text-white/50">Saved cars & price-drop alerts</p></figcaption></figure></Reveal>
        <Reveal delay={0.08}><figure><Phone>
          <div className="px-5 pt-2"><p className="font-display text-2xl font-black uppercase italic text-white">Test drive</p></div>
          <div className="h-28 px-3"><CarArt hex={c[6].hex} body="SUV" id="a2urus" studio={false} /></div>
          <div className="px-4"><p className="text-sm font-bold text-white">Lamborghini Urus S</p><p className="font-mono text-[10px] text-white/45">2023 · Giallo Auge · #AP1060</p>
            <div className="mt-3 flex justify-between text-center">{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d, i) => <span key={d} className={`w-9 rounded py-1.5 text-[10px] ${i === 5 ? "bg-volt-500 text-white" : "bg-white/[.06] text-white/55"}`}>{d}<span className="block text-[13px] font-bold">{12 + i}</span></span>)}</div>
            <div className="mt-3 grid grid-cols-3 gap-1.5">{["9:00", "10:30", "12:00", "1:30", "3:00", "4:30"].map((t, i) => <span key={t} className={`rounded py-1.5 text-center font-mono text-[11px] ${i === 1 ? "border border-volt-500 bg-volt-500/15 text-white" : i === 3 ? "text-white/20 line-through" : "bg-white/[.06] text-white/60"}`}>{t}</span>)}</div>
            <div className="mt-4 rounded-md bg-volt-500 py-3 text-center text-[12px] font-bold uppercase tracking-widest text-white">Confirm · Sat 10:30</div>
            <p className="mt-2 flex items-center justify-center gap-1 text-[10px] text-emerald-400"><Check size={11} />Licence verified · insured</p></div>
          <Tab a={2} /></Phone><figcaption className="mt-6 text-center"><p className="font-bold uppercase tracking-wide">Test-drive booking</p><p className="text-sm text-white/50">Live diary, synced with the sales desk</p></figcaption></figure></Reveal>
        <Reveal delay={0.16}><figure><Phone>
          <div className="px-5 pt-2"><p className="font-mono text-[10px] uppercase tracking-widest text-white/45">My garage · BMW M4</p><p className="font-display text-2xl font-black uppercase italic text-white">Service</p></div>
          <div className="mx-4 mt-3 rounded-md border border-volt-500/40 bg-gradient-to-br from-volt-500/20 to-transparent p-3"><p className="flex items-center gap-2 text-[12px] font-bold text-white"><Bell size={13} className="text-volt-400" />Oil service due in 640 mi</p><p className="mt-1 text-[11px] text-white/60">Free pickup & loaner car included</p><div className="mt-2.5 rounded bg-white py-2 text-center text-[11px] font-bold uppercase text-carbon-950">Book Thu 9:00 AM</div></div>
          <div className="mt-3 space-y-2 px-4">{[[Droplets, "Engine oil", "Due soon", 18], [Gauge, "Tyres · 82%", "Good", 82], [Zap, "Battery", "Healthy", 94], [Wrench, "Brake fluid", "Mar 2027", 70]].map(([I, t, s, p]: any) => <div key={t} className="rounded-md bg-white/[.05] p-2.5"><div className="flex items-center gap-2 text-[11px]"><I size={13} className="text-volt-400" /><span className="flex-1 text-white">{t}</span><span className="text-white/45">{s}</span><ChevronRight size={12} className="text-white/30" /></div><div className="mt-1.5 h-1 rounded-full bg-white/10"><div className={`h-1 rounded-full ${p < 30 ? "bg-volt-500" : "bg-emerald-400"}`} style={{ width: `${p}%` }} /></div></div>)}</div>
          <Tab a={3} /></Phone><figcaption className="mt-6 text-center"><p className="font-bold uppercase tracking-wide">Service reminders</p><p className="text-sm text-white/50">Mileage-based, with one-tap booking</p></figcaption></figure></Reveal>
      </div></section>
    <section className="container-x mt-28 grid gap-4 md:grid-cols-3">{[["Your badge on the icon", "Fully branded, published under your developer account."], ["Plugged into your DMS", "Syncs inventory, service history and Max's lead desk."], ["Live in 6 weeks", "Design, build, store approval and analytics, done for you."]].map(([t, d]) => <div key={t} className="cut border border-white/10 bg-carbon-900 p-7"><CarIcon size={20} className="text-volt-500" /><p className="mt-3 font-display text-xl font-black uppercase italic text-white">{t}</p><p className="mt-2 text-sm text-white/55">{d}</p></div>)}</section>
  </main><Footer /></>);
}
