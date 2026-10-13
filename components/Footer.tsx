import Link from "next/link";
import Logo from "./Logo";
import { brand, makes } from "@/lib/data";
export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-carbon-950" id="privacy">
      <div className="container-x grid gap-10 py-16 md:grid-cols-4">
        <div className="md:col-span-2"><Logo /><p className="mt-5 max-w-sm text-sm leading-relaxed text-white/50">Hand-picked performance and luxury cars, 172-point certified, delivered nationwide and exported worldwide. Your data is processed under GDPR and CCPA; we never sell it.</p></div>
        <div><p className="text-xs font-bold uppercase tracking-[.2em] text-volt-400">Makes</p><ul className="mt-4 space-y-2 text-sm text-white/60">{makes.slice(0, 7).map((m) => <li key={m}><Link href={`/inventory?make=${encodeURIComponent(m)}`} className="hover:text-white">{m}</Link></li>)}</ul></div>
        <div><p className="text-xs font-bold uppercase tracking-[.2em] text-volt-400">Showroom</p><ul className="mt-4 space-y-2 text-sm text-white/60"><li>{brand.address}</li><li>{brand.hours}</li><li>{brand.phone}</li><li>{brand.email}</li><li><a href={brand.waLink} className="text-volt-400 hover:text-white">WhatsApp us</a></li></ul></div>
      </div>
      <div className="container-x flex flex-col justify-between gap-2 border-t border-white/10 py-6 text-xs text-white/35 sm:flex-row"><p>© {new Date().getFullYear()} Apex Motors. Demo concept, vehicles and prices are illustrative.</p><p><Link href="/app" className="hover:text-white">Mobile app</Link> · <Link href="/admin" className="hover:text-white">Sales dashboard</Link></p></div>
    </footer>
  );
}
