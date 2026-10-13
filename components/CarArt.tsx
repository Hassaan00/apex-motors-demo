// Studio-lit vector car renders: no photos, just SVG.
const BODY: Record<string, { body: string; glass: string; roofline?: string }> = {
  Coupe: { body: "M28,150 L30,127 Q34,114 62,108 Q112,78 178,72 Q216,70 246,92 L330,104 Q368,110 372,128 L370,150 Z", glass: "M100,105 Q136,83 178,78 Q206,77 232,96 L229,104 Z" },
  SUV: { body: "M26,150 L26,98 Q28,80 52,75 L92,63 L252,61 Q270,62 287,82 L302,97 L350,104 Q373,108 374,125 L372,150 Z", glass: "M62,97 L96,69 L250,67 Q264,68 278,86 L286,97 Z" },
  Sedan: { body: "M28,150 L28,125 Q30,112 52,108 L96,104 Q132,80 172,76 L230,76 Q256,78 281,98 L340,106 Q370,110 372,127 L370,150 Z", glass: "M110,103 Q140,84 172,81 L228,81 Q247,83 266,100 Z" },
  Wagon: { body: "M28,150 L28,112 Q30,90 50,84 L92,74 L232,74 Q257,76 282,98 L340,106 Q370,110 372,127 L370,150 Z", glass: "M50,100 L62,85 L94,79 L230,79 Q248,81 267,100 Z" },
  Convertible: { body: "M28,150 L30,126 Q34,114 62,110 L232,106 L250,86 L256,87 L246,105 L330,106 Q368,110 372,128 L370,150 Z", glass: "M236,105 L250,89 L253,90 L242,105 Z" },
};
function shade(hex: string, f: number) { const n = parseInt(hex.slice(1), 16); const c = [n >> 16, (n >> 8) & 255, n & 255].map((v) => Math.max(0, Math.min(255, Math.round(f > 0 ? v + (255 - v) * f : v * (1 + f))))); return `rgb(${c.join(",")})`; }
function Wheel({ x, id }: { x: number; id: string }) {
  return <g transform={`translate(${x} 150)`}>
    <circle r="27" fill="#0b0b0d" /><circle r="19.5" fill={`url(#${id}rim)`} /><circle r="19.5" fill="none" stroke="#2a2b30" strokeWidth="1.5" />
    {Array.from({ length: 10 }).map((_, i) => <rect key={i} x="-1.6" y="-18" width="3.2" height="13" rx="1.2" fill="#9aa0a8" transform={`rotate(${i * 36})`} />)}
    <circle r="5" fill="#3a3c42" /><circle r="2" fill="#c9ced6" />
    <path d="M-13,-13 A19,19 0 0 1 13,-13" stroke="#ff2d2d" strokeWidth="3" fill="none" opacity=".0" />
  </g>;
}
export default function CarArt({ hex, body, id = "c", studio = true, className = "" }: { hex: string; body: string; id?: string; studio?: boolean; className?: string }) {
  const g = "k" + id.replace(/[^a-z0-9]/gi, ""); const B = BODY[body] || BODY.Sedan;
  return (
    <svg viewBox="0 0 400 220" className={`h-full w-full ${className}`} preserveAspectRatio="xMidYMid meet" role="img" aria-label={`${body} illustration`}>
      <defs>
        <radialGradient id={g + "spot"} cx="50%" cy="20%" r="75%"><stop offset="0" stopColor="#3a3d46" /><stop offset=".55" stopColor="#15161a" /><stop offset="1" stopColor="#0a0a0c" /></radialGradient>
        <linearGradient id={g + "paint"} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={shade(hex, 0.45)} /><stop offset=".35" stopColor={hex} /><stop offset=".7" stopColor={shade(hex, -0.45)} /><stop offset="1" stopColor={shade(hex, -0.75)} /></linearGradient>
        <linearGradient id={g + "glass"} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#5d6672" /><stop offset=".5" stopColor="#14171c" /><stop offset="1" stopColor="#262b33" /></linearGradient>
        <linearGradient id={g + "shine"} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#fff" stopOpacity="0" /><stop offset=".5" stopColor="#fff" stopOpacity=".55" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
        <radialGradient id={g + "rim"}><stop offset="0" stopColor="#4a4d55" /><stop offset=".8" stopColor="#1b1c20" /><stop offset="1" stopColor="#606570" /></radialGradient>
        <radialGradient id={g + "shadow"}><stop offset="0" stopColor="#000" stopOpacity=".85" /><stop offset="1" stopColor="#000" stopOpacity="0" /></radialGradient>
        <linearGradient id={g + "floor"} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1d1e23" /><stop offset="1" stopColor="#0a0a0c" /></linearGradient>
        <clipPath id={g + "clip"}><path d={B.body} /></clipPath>
      </defs>
      {studio && <><rect width="400" height="220" fill={`url(#${g}spot)`} /><rect y="160" width="400" height="60" fill={`url(#${g}floor)`} />
        <ellipse cx="200" cy="40" rx="150" ry="10" fill="#fff" opacity=".05" /></>}
      <ellipse cx="200" cy="176" rx="190" ry="14" fill={`url(#${g}shadow)`} />
      {/* reflection */}
      <g transform="translate(0 352) scale(1 -1)" opacity=".12"><path d={B.body} fill={`url(#${g}paint)`} /></g>
      <path d={B.body} fill={`url(#${g}paint)`} />
      <g clipPath={`url(#${g}clip)`}>
        <rect x="0" y="112" width="400" height="3" fill="#fff" opacity=".18" />
        <rect x="-60" y="60" width="140" height="120" fill={`url(#${g}shine)`} transform="skewX(-30)" opacity=".5" />
        <rect x="0" y="138" width="400" height="14" fill="#000" opacity=".28" />
      </g>
      <path d={B.glass} fill={`url(#${g}glass)`} />
      <path d={B.glass} fill="none" stroke="#000" strokeOpacity=".4" />
      <circle cx="95" cy="150" r="30" fill="#060607" /><circle cx="305" cy="150" r="30" fill="#060607" />
      <Wheel x={95} id={g} /><Wheel x={305} id={g} />
      <ellipse cx="364" cy="119" rx="9" ry="4" fill="#eaf4ff" /><ellipse cx="368" cy="119" rx="24" ry="9" fill="#cfe6ff" opacity=".18" />
      <rect x="28" y="116" width="8" height="6" rx="2" fill="#ff2a2a" /><ellipse cx="30" cy="119" rx="16" ry="7" fill="#ff2a2a" opacity=".22" />
    </svg>
  );
}
