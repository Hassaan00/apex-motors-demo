import { ImageResponse } from "next/og";
export const runtime = "edge";
export const alt = "Apex Motors, premium and performance cars";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OG() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "linear-gradient(120deg,#09090b 0%,#17191d 60%,#ff3b1f 140%)", fontFamily: "sans-serif" }}>
      <div style={{ fontSize: 34, color: "#fff", fontWeight: 800, fontStyle: "italic", letterSpacing: 4 }}>APEX/MOTORS</div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 110, color: "#fff", fontWeight: 900, fontStyle: "italic", lineHeight: 0.9 }}>DRIVE THE</div>
        <div style={{ fontSize: 110, color: "#ff3b1f", fontWeight: 900, fontStyle: "italic", lineHeight: 0.95 }}>EXCEPTIONAL.</div>
        <div style={{ fontSize: 28, color: "#c9cdd3", marginTop: 26 }}>Miami · Porsche, AMG, M, exotics & EVs · Test drives booked 24/7 by AI</div>
      </div>
    </div>, size);
}
