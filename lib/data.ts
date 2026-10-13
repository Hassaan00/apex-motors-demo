export const brand = {
  name: "Apex Motors", city: "Miami", phone: "+1 (305) 555-0188", email: "sales@apexmotors.co", address: "2200 Biscayne Blvd, Miami, FL 33137",
  hours: "Mon–Sat 9am–8pm, Sun closed (Max answers 24/7)", waLink: "https://wa.me/923322309346",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://apex-motors-demo.vercel.app",
};
export type Body = "Coupe" | "SUV" | "Sedan" | "Wagon" | "Convertible";
export type Car = { id: string; make: string; model: string; trim: string; year: number; price: number; msrp?: number; miles: number; body: Body; fuel: "Gas" | "Electric" | "Hybrid";
  hp: number; zero60: number; top: number; drive: "RWD" | "AWD"; trans: string; color: string; hex: string; interior: string; condition: "New" | "Certified" | "Pre-owned"; features: string[]; tag?: string; stock: string };
export const cars: Car[] = [
  { id: "porsche-911-carrera-s-2024", make: "Porsche", model: "911", trim: "Carrera S", year: 2024, price: 139900, msrp: 146200, miles: 1180, body: "Coupe", fuel: "Gas", hp: 443, zero60: 3.3, top: 191, drive: "RWD", trans: "8-spd PDK", color: "GT Silver Metallic", hex: "#b9bec4", interior: "Black / Bordeaux", condition: "Certified", features: ["Sport Chrono", "PASM", "Bose surround", "Rear-axle steering"], tag: "Just arrived", stock: "AP1024" },
  { id: "bmw-m4-competition-2023", make: "BMW", model: "M4", trim: "Competition xDrive", year: 2023, price: 82500, miles: 9800, body: "Coupe", fuel: "Gas", hp: 503, zero60: 3.4, top: 180, drive: "AWD", trans: "8-spd M Steptronic", color: "Isle of Man Green", hex: "#1f6b4f", interior: "Kyalami Orange", condition: "Certified", features: ["Carbon bucket seats", "M Drive Pro", "Harman Kardon", "Head-up display"], stock: "AP1031" },
  { id: "mercedes-amg-g63-2024", make: "Mercedes-AMG", model: "G 63", trim: "4MATIC", year: 2024, price: 219000, miles: 640, body: "SUV", fuel: "Gas", hp: 577, zero60: 4.4, top: 149, drive: "AWD", trans: "9-spd AMG Speedshift", color: "Obsidian Black", hex: "#16171b", interior: "Macchiato Nappa", condition: "New", features: ["AMG Night Package", "Burmester 3D", "22\" forged wheels", "Massage seats"], tag: "Hot", stock: "AP1040" },
  { id: "range-rover-sport-p530-2024", make: "Land Rover", model: "Range Rover Sport", trim: "P530 First Edition", year: 2024, price: 128400, miles: 2100, body: "SUV", fuel: "Gas", hp: 523, zero60: 4.3, top: 155, drive: "AWD", trans: "8-spd automatic", color: "Varesine Blue", hex: "#2b4a6f", interior: "Light Cloud", condition: "Certified", features: ["Air suspension", "Meridian Signature", "Panoramic roof", "Pixel LED"], stock: "AP1043" },
  { id: "tesla-model-s-plaid-2023", make: "Tesla", model: "Model S", trim: "Plaid", year: 2023, price: 79900, miles: 14200, body: "Sedan", fuel: "Electric", hp: 1020, zero60: 2.0, top: 200, drive: "AWD", trans: "Single-speed", color: "Ultra Red", hex: "#a3141c", interior: "Black", condition: "Pre-owned", features: ["396 mi range", "Full Self-Driving capability", "Yoke + wheel", "22-speaker audio"], tag: "EV", stock: "AP1007" },
  { id: "audi-rs6-avant-2024", make: "Audi", model: "RS 6 Avant", trim: "Performance", year: 2024, price: 124800, miles: 3900, body: "Wagon", fuel: "Gas", hp: 621, zero60: 3.3, top: 190, drive: "AWD", trans: "8-spd tiptronic", color: "Nardo Gray", hex: "#7d8085", interior: "Black Valcona", condition: "Certified", features: ["Ceramic brakes", "Bang & Olufsen 3D", "Dynamic Plus", "Night vision"], stock: "AP1052" },
  { id: "lamborghini-urus-s-2023", make: "Lamborghini", model: "Urus", trim: "S", year: 2023, price: 259000, miles: 5200, body: "SUV", fuel: "Gas", hp: 657, zero60: 3.4, top: 190, drive: "AWD", trans: "8-spd automatic", color: "Giallo Auge", hex: "#e8b912", interior: "Nero Ade", condition: "Pre-owned", features: ["Carbon package", "Bang & Olufsen", "Ambient light", "23\" Taigete wheels"], tag: "Exotic", stock: "AP1060" },
  { id: "mercedes-s580-2024", make: "Mercedes-Benz", model: "S-Class", trim: "S 580 4MATIC", year: 2024, price: 128900, miles: 4100, body: "Sedan", fuel: "Hybrid", hp: 496, zero60: 4.4, top: 130, drive: "AWD", trans: "9-spd automatic", color: "Emerald Green", hex: "#0f3b33", interior: "Macchiato / Magma", condition: "Certified", features: ["Executive rear seats", "MBUX Hyperscreen", "Rear-axle steering", "Burmester 4D"], stock: "AP1066" },
  { id: "porsche-taycan-turbo-2024", make: "Porsche", model: "Taycan", trim: "Turbo", year: 2024, price: 162000, miles: 980, body: "Sedan", fuel: "Electric", hp: 871, zero60: 2.5, top: 162, drive: "AWD", trans: "2-spd", color: "Frozen Blue", hex: "#7aa7c7", interior: "Slate Grey", condition: "New", features: ["800V fast charging", "Passenger display", "Matrix LED", "Burmester"], tag: "EV", stock: "AP1071" },
  { id: "ferrari-roma-2022", make: "Ferrari", model: "Roma", trim: "Coupe", year: 2022, price: 229000, miles: 6100, body: "Coupe", fuel: "Gas", hp: 612, zero60: 3.4, top: 199, drive: "RWD", trans: "8-spd F1 DCT", color: "Rosso Portofino", hex: "#b3121b", interior: "Cuoio", condition: "Pre-owned", features: ["Carbon wheel", "Passenger display", "Suspension lifter", "Daytona seats"], tag: "Exotic", stock: "AP1077" },
  { id: "bmw-x5-m60i-2024", make: "BMW", model: "X5", trim: "M60i xDrive", year: 2024, price: 89900, miles: 2600, body: "SUV", fuel: "Hybrid", hp: 523, zero60: 4.1, top: 155, drive: "AWD", trans: "8-spd Steptronic", color: "Carbon Black", hex: "#1c2230", interior: "Tartufo", condition: "Certified", features: ["Mild hybrid", "Sky Lounge roof", "Bowers & Wilkins", "Driving Assistant Pro"], stock: "AP1083" },
  { id: "lexus-lc500-convertible-2023", make: "Lexus", model: "LC 500", trim: "Convertible", year: 2023, price: 104500, miles: 7300, body: "Convertible", fuel: "Gas", hp: 471, zero60: 4.4, top: 168, drive: "RWD", trans: "10-spd automatic", color: "Structural Blue", hex: "#1f4fbf", interior: "Toasted Caramel", condition: "Pre-owned", features: ["V8 naturally aspirated", "Mark Levinson", "Neck warmers", "Head-up display"], stock: "AP1089" },
];
export const makes = [...new Set(cars.map((c) => c.make))];
export const bodies: Body[] = ["Coupe", "SUV", "Sedan", "Wagon", "Convertible"];
export const DRIVE_TIMES = ["9:00 AM", "10:30 AM", "12:00 PM", "1:30 PM", "3:00 PM", "4:30 PM", "6:00 PM"];
export const TZ = "America/New_York";
export const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");
export const carName = (c: Car) => `${c.year} ${c.make} ${c.model} ${c.trim}`;
export const getCar = (id: string) => cars.find((c) => c.id === id || carName(c).toLowerCase() === String(id).toLowerCase());
export const APR: Record<string, number> = { excellent: 5.99, good: 7.49, fair: 10.9, rebuilding: 14.9 };
export function finance(price: number, down: number, months: number, tier = "good", tradeIn = 0) {
  const apr = APR[tier] ?? APR.good; const principal = Math.max(0, price - down - tradeIn) * 1.0; const taxFees = price * 0.07 + 899;
  const P = principal + taxFees; const r = apr / 1200; const pay = r ? (P * r) / (1 - Math.pow(1 + r, -months)) : P / months;
  return { apr, amountFinanced: Math.round(P), monthly: Math.round(pay), totalInterest: Math.round(pay * months - P), taxAndFees: Math.round(taxFees) };
}
const TIER: [RegExp, number][] = [[/ferrari|lamborghini|mclaren|rolls|bentley|aston/i, 240000], [/porsche|amg|g.?63|range rover|maserati/i, 125000], [/bmw|mercedes|audi|lexus|tesla|land rover|volvo|genesis|cadillac|jaguar/i, 70000], [/./, 38000]];
export function tradeIn(make: string, model: string, year: number, miles: number, condition = "good") {
  const base = TIER.find(([re]) => re.test(make + " " + model))![1];
  const age = Math.max(0, new Date().getFullYear() - year); const dep = Math.pow(0.86, age) * (age === 0 ? 0.9 : 1);
  const expected = Math.max(1, age) * 11000; const mf = Math.max(0.55, 1 - ((miles - expected) / 10000) * 0.025);
  const cf = ({ excellent: 1.06, good: 1, fair: 0.88, poor: 0.72 } as any)[condition] ?? 1;
  const mid = base * dep * mf * cf; return { low: Math.round(mid * 0.92 / 100) * 100, high: Math.round(mid * 1.06 / 100) * 100 };
}
