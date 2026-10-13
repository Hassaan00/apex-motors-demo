import Link from "next/link";
import { ArrowRight, Zap, ShieldCheck, Truck, BadgeDollarSign, Mic, CalendarCheck2, Calculator, Repeat2, Star, Wrench, Bell, Smartphone, Bot, Car as CarIcon } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import HeroStage from "@/components/HeroStage";
import Inventory from "@/components/Inventory";
import { FinanceCalc, TradeIn } from "@/components/Estimators";
import OpenChat from "@/components/OpenChat";
import Phone from "@/components/Phone";
import CarArt from "@/components/CarArt";
import { cars, makes } from "@/lib/data";
export default function Home() {
  return (<>
    <Nav />
    <main id="main">
      <section className="speed relative overflow-hidden pt-[72px]">
        <div className="absolute -left-40 top-0 h-[600px] w-[600px] rounded-full bg-volt-600/10 blur-[140px]" />
        <div className="container-x relative grid min-h-[calc(100svh-72px)] items-center gap-10 py-14 lg:grid-cols-[1fr_1.35fr] [&>*]:min-w-0">
          <div>
            <Reveal><p className="kicker">Miami · Est. 2011 · {cars.length * 14}+ cars sold this year</p></Reveal>
            <Reveal delay={0.06}><h1 className="mt-6 font-display text-[2.6rem] font-black uppercase italic leading-[.88] tracking-tight text-white sm:text-7xl xl:text-[4.9rem]">Drive the<br /><span className="bg-gradient-to-r from-volt-400 via-volt-500 to-volt-300 bg-clip-text text-transparent">exceptional.</span></h1></Reveal>
            <Reveal delay={0.12}><p className="mt-6 max-w-md text-lg leading-relaxed text-white/60">Certified Porsche, AMG, M and exotic stock. Real numbers in seconds, and <span className="font-semibold text-white">Max</span>, our AI sales assistant, books your test drive 24/7, by chat or voice.</p></Reveal>
            <Reveal delay={0.18}><div className="mt-8 flex flex-wrap gap-3"><Link href="/inventory" className="btn-volt">Shop inventory <ArrowRight size={16} /></Link><OpenChat voice className="btn-dark" label="Talk to Max by voice"><Mic size={15} />Talk to Max</OpenChat></div></Reveal>
            <Reveal delay={0.24}><dl className="mt-12 grid max-w-md grid-cols-3 border-t border-white/10 pt-6">{[["172-pt", "certification"], ["5.99%", "APR from"], ["24/7", "AI sales desk"]].map(([a, b]) => <div key={b}><dd className="font-display text-3xl font-black italic text-white">{a}</dd><dt className="font-mono text-[10px] uppercase tracking-[.15em] text-white/45">{b}</dt></div>)}</dl></Reveal>
          </div>
          <Reveal delay={0.1}><HeroStage /></Reveal>
        </div>
      </section>

      <div className="overflow-hidden border-y border-white/10 bg-carbon-900 py-4" aria-hidden><div className="flex w-max animate-marquee gap-14 whitespace-nowrap font-display text-xl font-extrabold uppercase italic text-white/25">{[...Array(3)].flatMap((_, k) => makes.map((m) => <span key={m + k} className="flex items-center gap-14">{m}<span className="text-volt-500">/</span></span>))}</div></div>

      <section className="py-24" id="inventory">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><Reveal><p className="kicker">In stock now</p><h2 className="h2 mt-4">The line-up.</h2></Reveal><Reveal><Link href="/inventory" className="btn-dark">All {cars.length} vehicles <ArrowRight size={15} /></Link></Reveal></div>
          <div className="mt-10"><Inventory limit={6} /></div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-white/10 bg-carbon-900 py-24" id="max">
        <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_70%_40%,rgba(255,59,31,.18),transparent_60%)]" />
        <div className="container-x relative grid items-center gap-14 lg:grid-cols-2">
          <div>
            <Reveal><p className="kicker">Meet Max</p><h2 className="h2 mt-4">Your top<br />salesperson.<br /><span className="text-volt-500">Never off.</span></h2></Reveal>
            <Reveal delay={0.08}><p className="mt-6 max-w-lg text-lg text-white/60">Max knows every car on the lot, every spec and every price. He works out payments, values trade-ins, qualifies buyers and books real test drives straight into the sales diary, with zero double-bookings.</p></Reveal>
            <div className="mt-10 grid gap-3 sm:grid-cols-2">{[[CarIcon, "Live stock answers", "Price, miles, spec and colour, pulled from inventory."], [Calculator, "Finance in seconds", "APR by credit tier, term and down payment."], [Repeat2, "Trade-in valuations", "Instant range, then a firm offer on inspection."], [CalendarCheck2, "Real test drives", "Checks the diary, books, sends a reference."]].map(([I, t, d]: any, i) => <Reveal key={t} delay={i * 0.05}><div className="cut h-full border border-white/10 bg-carbon-950/60 p-5"><I size={20} className="text-volt-500" /><p className="mt-3 font-bold text-white">{t}</p><p className="mt-1 text-sm text-white/50">{d}</p></div></Reveal>)}</div>
          </div>
          <Reveal delay={0.1}>
            <div className="cut border border-white/10 bg-carbon-950 p-5 shadow-2xl">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4"><div className="grid h-10 w-10 place-items-center rounded-md bg-volt-500 text-white"><Bot size={20} /></div><div className="flex-1"><p className="font-bold text-white">Max · Apex Motors</p><p className="font-mono text-[11px] text-emerald-400">● online · replies in 2s</p></div><span className="font-mono text-[10px] text-white/40">EN · ES · DE · FR</span></div>
              <div className="space-y-3 py-4 text-sm">
                <p className="ml-auto w-fit max-w-[85%] rounded-md bg-volt-500 px-3.5 py-2 text-white">Got anything fast under $150k? I'd trade my 2020 X3.</p>
                <p className="w-fit max-w-[85%] rounded-md bg-white/[.06] px-3.5 py-2 text-white/85">The 911 Carrera S at $139,900 with 1,180 miles is the one. Your X3 is worth about $27,300 to $31,500, so you'd be near $1,870 a month over 60 months with good credit.</p>
                <div className="flex items-center gap-3 rounded-md border border-white/10 bg-white/[.03] p-2"><div className="h-14 w-24"><CarArt hex={cars[0].hex} body="Coupe" id="maxdemo" studio={false} /></div><div><p className="font-bold text-white">Porsche 911 Carrera S</p><p className="font-mono text-[11px] text-white/50">443 hp · 3.3s · $139,900</p></div></div>
                <p className="ml-auto w-fit rounded-md bg-volt-500 px-3.5 py-2 text-white">Saturday 10:30?</p>
                <div className="flex items-center gap-3 rounded-md border border-volt-500/40 bg-volt-500/10 p-3"><CalendarCheck2 size={18} className="text-volt-400" /><p className="flex-1 text-white">Test drive booked · Sat 10:30 AM</p><span className="font-mono text-[11px] text-volt-300">APX-8KQ2D</span></div>
              </div>
              <OpenChat className="btn-volt w-full"><Zap size={15} />Try Max live</OpenChat>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24" id="finance"><div className="container-x"><Reveal><p className="kicker">Finance</p><h2 className="h2 mt-4">Know your number.</h2><p className="mt-4 max-w-xl text-white/55">Real payment maths including tax and fees. Soft-pull pre-approval, no impact on your credit score.</p></Reveal><Reveal delay={0.08}><div className="mt-10"><FinanceCalc /></div></Reveal></div></section>
      <section className="pb-24" id="trade"><div className="container-x"><Reveal><p className="kicker">Trade-in</p><h2 className="h2 mt-4">What&apos;s yours worth?</h2></Reveal><Reveal delay={0.08}><div className="mt-10"><TradeIn /></div></Reveal></div></section>

      <section className="border-y border-white/10 bg-carbon-900 py-16"><div className="container-x grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{[[ShieldCheck, "172-point certified", "Every car inspected, detailed and warrantied."], [BadgeDollarSign, "Transparent pricing", "No add-ons, no surprise doc fees."], [Truck, "Delivered anywhere", "Enclosed transport across the US, export to the Gulf & EU."], [Wrench, "Apex Care service", "Factory-trained techs, loaner cars, pickup & drop-off."]].map(([I, t, d]: any) => <div key={t} className="flex gap-4"><I size={26} className="shrink-0 text-volt-500" /><div><p className="font-bold uppercase tracking-wide text-white">{t}</p><p className="mt-1 text-sm text-white/50">{d}</p></div></div>)}</div></section>

      <section className="overflow-hidden py-24"><div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <Reveal><p className="kicker">The Apex app</p><h2 className="h2 mt-4">Your garage.<br />In your pocket.</h2><p className="mt-6 max-w-lg text-lg text-white/60">A branded iOS and Android app: browse live stock, book test drives, get service reminders and talk to Max, all in one place.</p>
          <ul className="mt-7 space-y-3 text-white/75">{[[CarIcon, "Live inventory with price-drop alerts"], [CalendarCheck2, "Test drives and service in two taps"], [Bell, "Oil, tyre and warranty reminders"]].map(([I, t]: any) => <li key={t} className="flex items-center gap-3"><I size={18} className="text-volt-500" />{t}</li>)}</ul>
          <Link href="/app" className="btn-volt mt-9"><Smartphone size={16} />See the app</Link></Reveal>
        <Reveal delay={0.1}><div className="relative flex justify-center"><div className="absolute inset-0 m-auto h-72 w-72 rounded-full bg-volt-500/25 blur-[100px]" />
          <Phone className="rotate-[4deg]"><div className="px-5 pt-3"><p className="font-mono text-[10px] uppercase tracking-widest text-white/45">My garage</p><p className="font-display text-2xl font-black uppercase italic text-white">BMW M4</p></div>
            <div className="h-36 px-2"><CarArt hex={cars[1].hex} body="Coupe" id="appm4" studio={false} /></div>
            <div className="mx-4 rounded-md border border-volt-500/40 bg-volt-500/10 p-3"><p className="flex items-center gap-2 text-[12px] font-bold text-white"><Wrench size={13} className="text-volt-400" />Service due in 640 mi</p><p className="mt-1 text-[11px] text-white/55">Oil + inspection · Book Thu 9:00 AM?</p></div>
            <div className="mx-4 mt-3 grid grid-cols-3 gap-2 text-center">{[["9,800", "miles"], ["82%", "tyres"], ["2y", "warranty"]].map(([a, b]) => <div key={b} className="rounded-md bg-white/[.05] py-2"><p className="text-sm font-bold text-white">{a}</p><p className="text-[9px] uppercase text-white/45">{b}</p></div>)}</div>
          </Phone></div></Reveal>
      </div></section>

      <section className="pb-24"><div className="container-x"><Reveal><p className="kicker">Reviews</p><h2 className="h2 mt-4">4.9 from 1,873 drivers.</h2></Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-3">{[["Messaged at 11pm about the G 63. Max had numbers, my trade value and a Saturday slot booked before I went to bed.", "Marcus T.", "G 63 owner"], ["Habló conmigo en español, me dio la cuota exacta y la prueba quedó reservada. Increíble.", "Daniela R.", "Taycan owner"], ["Best car buying experience I've had. Zero pressure, honest numbers, car shipped to Dubai in two weeks.", "Faisal A.", "Urus S owner"]].map(([q, n, r]) => <figure key={n} className="cut border border-white/10 bg-carbon-900 p-6"><div className="flex gap-0.5 text-volt-500">{[...Array(5)].map((_, k) => <Star key={k} size={14} fill="currentColor" />)}</div><blockquote className="mt-4 text-white/85">“{q}”</blockquote><figcaption className="mt-5 font-mono text-xs uppercase tracking-wider text-white/45">{n} · {r}</figcaption></figure>)}</div></div></section>

      <section className="pb-24"><div className="container-x"><div className="cut relative overflow-hidden bg-volt-500 p-10 sm:p-16">
        <div className="speed absolute inset-0 opacity-60" /><div className="absolute -right-10 bottom-0 hidden h-64 w-[520px] md:block"><CarArt hex="#111215" body="SUV" id="ctag" studio={false} /></div>
        <div className="relative max-w-xl"><h2 className="font-display text-5xl font-black uppercase italic leading-[.9] text-white sm:text-6xl">Keys in hand<br />this weekend.</h2><p className="mt-4 text-lg text-white/85">Tell Max what you want. He&apos;ll handle the rest.</p><div className="mt-7 flex flex-wrap gap-3"><OpenChat className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3.5 text-[13px] font-bold uppercase tracking-[.14em] text-carbon-950"><Zap size={15} />Chat with Max</OpenChat><Link href="/inventory" className="inline-flex items-center gap-2 rounded-md border border-white/50 px-6 py-3.5 text-[13px] font-bold uppercase tracking-[.14em] text-white">Inventory</Link></div></div>
      </div></div></section>
    </main>
    <Footer />
  </>);
}
