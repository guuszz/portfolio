import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Gustavo Oliveira · Full-stack developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 25% 30%, rgba(163,230,53,0.15), transparent 50%), radial-gradient(circle at 80% 70%, rgba(163,230,53,0.08), transparent 50%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          fontFamily: "system-ui",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", color: "#a3e635", fontSize: 24, fontFamily: "monospace" }}>
          gusz
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ color: "#a3e635", fontSize: 28, fontFamily: "monospace" }}>
            olá, eu sou
          </div>
          <div style={{ color: "#ededed", fontSize: 96, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1 }}>
            Gustavo Oliveira.
          </div>
          <div style={{ color: "#a3a3a3", fontSize: 40, marginTop: 8, fontWeight: 500 }}>
            Construo coisas para web e mobile.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 24, color: "#a3a3a3", fontSize: 22, fontFamily: "monospace" }}>
            <span>typescript</span>
            <span style={{ color: "#1f1f1f" }}>·</span>
            <span>node.js</span>
            <span style={{ color: "#1f1f1f" }}>·</span>
            <span>react</span>
            <span style={{ color: "#1f1f1f" }}>·</span>
            <span>expo</span>
          </div>
          <div style={{ color: "#a3a3a3", fontSize: 20, fontFamily: "monospace" }}>
            Vitória da Conquista · BA
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
