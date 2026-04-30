import type { FoundWord } from "@/lib/types";

interface Props {
  found: FoundWord[];
  totalTokens: number;
}

export default function StatsPanel({ found, totalTokens }: Props) {
  if (!found.length) return null;

  const totalFound = found.reduce((s, f) => s + f.count, 0);
  const percent = totalTokens > 0 ? ((totalFound / totalTokens) * 100).toFixed(1) : "0";

  // Tillar bo'yicha guruhlash
  const byOrigin: Record<string, number> = {};
  for (const f of found) {
    const key = f.origin || "Noma'lum";
    byOrigin[key] = (byOrigin[key] || 0) + f.count;
  }
  const originList = Object.entries(byOrigin).sort((a, b) => b[1] - a[1]);

  const COLORS = ["#2563eb", "#7c3aed", "#059669", "#d97706", "#dc2626", "#0891b2"];

  return (
    <div className="card section" id="stats">
      <h3 style={{ margin: 0, fontWeight: 900, fontSize: 18 }}>Statistika</h3>
      <p style={{ marginTop: 6, color: "#64748b", fontSize: 13 }}>Tahlil natijalari bo'yicha umumiy ko'rsatkichlar</p>

      {/* Asosiy kartochkalar */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginTop: 16 }}>
        <StatCard label="Jami so'zlar" value={totalTokens} color="#2563eb" />
        <StatCard label={`Uchrashlar (${found.length} noyob)`} value={totalFound} color="#7c3aed" />
        <StatCard label="Xorijiy ulushi" value={`${percent}%`} color="#059669" />
      </div>

      {/* Tillar bo'yicha taqsimot */}
      {originList.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#334155", marginBottom: 10 }}>
            Tillar bo'yicha taqsimot
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {originList.map(([origin, count], i) => {
              const pct = Math.round((count / totalFound) * 100);
              return (
                <div key={origin}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
                    <span style={{ fontWeight: 600 }}>{origin}</span>
                    <span style={{ color: "#64748b" }}>{count} ta ({pct}%)</span>
                  </div>
                  <div style={{ background: "#f1f5f9", borderRadius: 999, height: 8, overflow: "hidden" }}>
                    <div style={{
                      width: `${pct}%`,
                      height: "100%",
                      borderRadius: 999,
                      background: COLORS[i % COLORS.length],
                      transition: "width 0.6s ease",
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Eng ko'p uchragan top-5 */}
      {found.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#334155", marginBottom: 10 }}>
            Eng ko'p ishlatilingan so'zlar (top {Math.min(5, found.length)})
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {found.slice(0, 5).map((f, i) => (
              <div key={f.word} style={{
                padding: "6px 14px",
                borderRadius: 999,
                background: `${COLORS[i % COLORS.length]}18`,
                border: `1px solid ${COLORS[i % COLORS.length]}44`,
                fontSize: 13,
                fontWeight: 700,
                color: COLORS[i % COLORS.length],
              }}>
                {f.word} <span style={{ fontWeight: 400 }}>×{f.count}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: string | number; color: string }) {
  return (
    <div style={{
      background: `${color}10`,
      border: `1px solid ${color}30`,
      borderRadius: 12,
      padding: "14px 16px",
    }}>
      <div style={{ fontSize: 26, fontWeight: 900, color }}>{value}</div>
      <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>{label}</div>
    </div>
  );
}
