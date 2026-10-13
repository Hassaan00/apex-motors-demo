import Link from "next/link";
export default function Logo() {
  return <Link href="/" className="flex items-center gap-2.5" aria-label="Apex Motors home">
    <svg width="32" height="32" viewBox="0 0 64 64" aria-hidden><path d="M6 52 L30 10 L36 10 L58 52 L46 52 L33 27 L20 52Z" fill="#ff3b1f" /><path d="M24 44 L42 44 L39 38 L27 38Z" fill="#fff" /></svg>
    <span className="font-display text-[19px] font-bold uppercase italic tracking-[.08em] text-white">Apex<span className="text-volt-500">/</span>Motors</span>
  </Link>;
}
