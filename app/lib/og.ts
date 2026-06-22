import { ImageResponse } from "next/server";

export function createArticleOgImage(article: { title: string; excerpt?: string; category?: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px",
          boxSizing: "border-box",
          background: "linear-gradient(135deg, #0f172a 0%, #0e3a56 100%)",
          color: "#ffffff",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div
            style={{
              background: "rgba(255, 255, 255, 0.16)",
              borderRadius: "9999px",
              padding: "10px 18px",
              textTransform: "uppercase",
              fontSize: "18px",
              letterSpacing: "0.24em",
              fontWeight: 700,
            }}
          >
            {article.category || "News"}
          </div>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: "20px", minHeight: 0 }}>
          <div style={{ fontSize: "72px", fontWeight: 800, lineHeight: 1.02, letterSpacing: "-0.03em", maxWidth: "1040px" }}>
            {article.title}
          </div>
          {article.excerpt ? (
            <div style={{ fontSize: "28px", fontWeight: 500, color: "#cbd5e1", maxWidth: "1040px", marginTop: "16px" }}>
              {article.excerpt}
            </div>
          ) : null}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "32px" }}>
          <div>
            <div style={{ fontSize: "20px", color: "#94a3b8", marginBottom: "8px" }}>NECT</div>
            <div style={{ fontSize: "18px", color: "#94a3b8" }}>National Engineering Coordinating Team</div>
          </div>
          <div style={{ fontSize: "18px", color: "#93c5fd" }}>nect.gov.gh</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
