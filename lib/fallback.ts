import { brand, cars, usd, carName } from "./data";
export type Lang = "en" | "es" | "de" | "fr";
export function detectLang(t: string): Lang {
  const s = t.toLowerCase();
  if (/\b(hola|precio|coche|carro|cuánto|cuanto|gracias|quiero|prueba)\b|¿/.test(s)) return "es";
  if (/\b(hallo|probefahrt|preis|auto|danke|ich|möchte|wie viel)\b/.test(s)) return "de";
  if (/\b(bonjour|prix|voiture|essai|merci|je|voudrais|combien)\b/.test(s)) return "fr";
  return "en";
}
export const busy: Record<Lang, string> = { en: "Sorry, the showroom is busy right now. Could you send that again in a few seconds?", es: "Disculpe, hay mucha actividad. ¿Puede repetirlo en unos segundos?", de: "Entschuldigung, gerade ist viel los. Bitte in ein paar Sekunden noch einmal senden.", fr: "Désolé, beaucoup de demandes. Pouvez-vous renvoyer dans quelques secondes ?" };
export function fallback(msg: string): string {
  const l = detectLang(msg); const s = msg.toLowerCase();
  if (l === "es") return "Hola, soy Max de Apex Motors. Dígame qué auto busca y su presupuesto, y le reservo una prueba de manejo.";
  if (l === "de") return "Hallo, ich bin Max von Apex Motors. Welches Auto und welches Budget? Ich buche gern eine Probefahrt.";
  if (l === "fr") return "Bonjour, je suis Max d'Apex Motors. Quelle voiture et quel budget ? Je peux réserver un essai.";
  const c = cars.find((x) => s.includes(x.model.toLowerCase()) || s.includes(x.make.toLowerCase().split("-")[0]));
  if (c) return `Yes, we have the ${carName(c)} in ${c.color} at ${usd(c.price)}, ${c.miles.toLocaleString()} miles. Want to book a test drive?`;
  if (/test|drive|book|appoint/.test(s)) return "Happy to set up a test drive. Which car, and which day works? We're open Mon–Sat 9am to 8pm.";
  if (/financ|loan|lease|monthly|apr|credit/.test(s)) return "We offer financing from 5.99% APR for excellent credit, 36 to 72 months. Try the finance calculator, or tell me the car and your down payment.";
  if (/trade|sell my/.test(s)) return "We buy and take trades on all makes. Share year, make, model and miles and I'll give you an instant estimate range.";
  if (/suv/.test(s)) return "SUVs in stock: " + cars.filter((x) => x.body === "SUV").map((x) => `${x.make} ${x.model} ${usd(x.price)}`).join(", ") + ".";
  if (/ev|electric/.test(s)) return "EVs in stock: " + cars.filter((x) => x.fuel === "Electric").map((x) => `${x.make} ${x.model} ${usd(x.price)}`).join(", ") + ".";
  if (/where|address|hour|open/.test(s)) return `We're at ${brand.address}, open ${brand.hours}.`;
  return "I'm Max, Apex Motors' AI sales assistant. Ask me about any car in stock, financing or your trade-in, and I can book a test drive in seconds.";
}
