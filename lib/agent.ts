export const agentCfg = {
  name: "Max", role: "AI sales assistant · 24/7", fab: "Ask Max", sessionKey: "apx-session", phone: "+1 (305) 555-0188",
  greeting: "Hey, I'm Max 🏁 Apex's AI sales assistant. Ask me anything about our stock, get finance or trade-in numbers, or book a test drive in seconds. Type, or tap the mic to talk.",
  langs: {
    en: { label: "EN", bcp: "en-US", listen: "Listening…", tryText: "Show me SUVs under 150k and book a test drive Saturday" },
    es: { label: "ES", bcp: "es-US", listen: "Escuchando…", tryText: "Quiero probar el Porsche 911 el sábado" },
    de: { label: "DE", bcp: "de-DE", listen: "Ich höre zu…", tryText: "Was kostet der Audi RS 6 im Monat?" },
    fr: { label: "FR", bcp: "fr-FR", listen: "Je vous écoute…", tryText: "Je cherche une voiture électrique" },
  } as Record<string, { label: string; bcp: string; listen: string; tryText: string }>,
  quick: ["What SUVs do you have?", "Monthly payment on the 911?", "Value my 2019 BMW X3", "Book a test drive Saturday", "Electric under $100k?"],
  voices: /Alex|Daniel|Aaron|Guy|Davis|Google US English|Natural|Neural|Premium|Enhanced/i,
  spell: [/APX[-‑]/g, "A P X "] as [RegExp, string],
};
