"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import HighlightedText from "@/components/HighlightedText";
import { fetchHistory } from "@/lib/api";
import type { HistoryItem, FoundWord } from "@/lib/types";

function exportCsv(found: FoundWord[], label: string) {
  const BOM = "﻿";
  const header = ["#", "So'z", "Uchrash soni", "Kelib chiqishi", "O'zbek muqobili"];
  const rows = found.map((x, i) => [
    i + 1, x.word, x.count, x.origin || "Noma'lum", x.alternative || "",
  ]);
  const csv =
    BOM +
    [header, ...rows]
      .map((row) => row.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${label}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("uz-UZ", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const th: React.CSSProperties = {
  textAlign: "left", padding: "8px 12px",
  fontSize: 12, fontWeight: 700, color: "#475569",
  borderBottom: "1px solid #e5e7eb",
};
const td: React.CSSProperties = {
  padding: "8px 12px", fontSize: 13, color: "#0f172a",
};

function HistoryCard({ item }: { item: HistoryItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="card" style={{ marginBottom: 12 }}>
      <div
        style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}
        onClick={() => setOpen((p) => !p)}
      >
        <span style={{
          padding: "4px 10px",
          borderRadius: 999,
          fontSize: 12,
          fontWeight: 700,
          background: item.type === "file" ? "#e0f2fe" : "#fef9c3",
          color: item.type === "file" ? "#0369a1" : "#78350f",
        }}>
          {item.type === "file" ? "Fayl" : "Matn"}
        </span>

        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 14 }}>
            {item.fileName || (item.sample ? `"${item.sample.slice(0, 60)}..."` : "Matn tahlili")}
          </div>
          <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>
            {formatDate(item.createdAt)}
          </div>
        </div>

        <div style={{ display: "flex", gap: 16, textAlign: "center" }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 900, color: "#7c3aed" }}>
              {item.stats?.totalOccurrences ?? item.stats?.foundCount ?? 0}
            </div>
            <div style={{ fontSize: 11, color: "#64748b" }}>uchrash</div>
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 900, color: "#2563eb" }}>
              {item.stats?.foundCount ?? 0}
            </div>
            <div style={{ fontSize: 11, color: "#64748b" }}>noyob so'z</div>
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 900, color: "#475569" }}>
              {item.stats?.totalTokens ?? 0}
            </div>
            <div style={{ fontSize: 11, color: "#64748b" }}>jami so'z</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {item.found?.length > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                const label = item.fileName
                  ? item.fileName.replace(/\.[^.]+$/, "")
                  : `tahlil-${item._id.slice(-6)}`;
                exportCsv(item.found, label);
              }}
              style={{
                padding: "5px 10px",
                borderRadius: 8,
                border: "1px solid #e5e7eb",
                background: "white",
                fontSize: 12,
                fontWeight: 600,
                color: "#334155",
                cursor: "pointer",
              }}
            >
              ⬇ CSV
            </button>
          )}
          <span style={{ fontSize: 18, color: "#94a3b8", transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
            ▾
          </span>
        </div>
      </div>

      {open && (
        <div style={{ marginTop: 14, borderTop: "1px solid #e5e7eb", paddingTop: 14 }}>
          {!item.found?.length ? (
            <p style={{ color: "#94a3b8", fontSize: 13, margin: 0 }}>Topilgan so'zlar yo'q.</p>
          ) : (
            <>
              <div style={{ overflowX: "auto", borderRadius: 8, border: "1px solid #e5e7eb" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr style={{ background: "#f8fafc" }}>
                      <th style={th}>#</th>
                      <th style={th}>So'z</th>
                      <th style={th}>Uchrashlar</th>
                      <th style={th}>Kelib chiqishi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.found.slice(0, 10).map((f, i) => (
                      <tr key={f.word} style={{ borderTop: "1px solid #f1f5f9" }}>
                        <td style={td}>{i + 1}</td>
                        <td style={td}>
                          <span style={{ fontWeight: 700, color: "#1d4ed8" }}>{f.word}</span>
                        </td>
                        <td style={td}>{f.count}</td>
                        <td style={td}>
                          <span style={{
                            padding: "2px 8px", borderRadius: 999, fontSize: 11,
                            fontWeight: 600, background: "#dbeafe", color: "#1e40af",
                          }}>
                            {f.origin || "Noma'lum"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {item.found.length > 10 && (
                <p style={{ margin: "10px 0 0", fontSize: 12, color: "#64748b" }}>
                  Yana <b>{item.found.length - 10} ta</b> so'z bor — to'liq ro'yxat uchun CSV yuklab oling.
                </p>
              )}

              {/* Ajratib ko'rsatish */}
              {item.text && (
                <div style={{ marginTop: 16 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#334155", marginBottom: 8 }}>
                    Ajratib ko'rsatish
                  </div>
                  <div style={{
                    background: "#f8fafc",
                    border: "1px solid #e5e7eb",
                    borderRadius: 10,
                    padding: "12px 14px",
                  }}>
                    <HighlightedText
                      text={item.text}
                      words={item.found.flatMap((f) => f.tokens?.length ? f.tokens : [f.word])}
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default function HistoryPage() {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchHistory(50)
      .then((d) => setItems(d.items || []))
      .catch(() => setError("Tarix yuklanmadi."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />

      <section className="hero" style={{ padding: "40px 0" }}>
        <div className="container">
          <h1 style={{ fontSize: 38, margin: 0 }}>Tahlil tarixi</h1>
          <p style={{ margin: "10px 0 0", opacity: 0.9 }}>
            Oldingi barcha tahlillar ro'yxati
          </p>
        </div>
      </section>

      <main className="container" style={{ paddingTop: 20, paddingBottom: 40 }}>
        {loading && (
          <div className="card" style={{ textAlign: "center", padding: 40, color: "#64748b" }}>
            Yuklanmoqda...
          </div>
        )}

        {error && (
          <div className="card" style={{ color: "#dc2626", padding: 20 }}>
            {error}
          </div>
        )}

        {!loading && !error && items.length === 0 && (
          <div className="card" style={{ textAlign: "center", padding: 40, color: "#64748b" }}>
            Hozircha tahlil yo'q. Bosh sahifadan matn yoki fayl tahlil qiling.
          </div>
        )}

        {items.map((item) => (
          <HistoryCard key={String(item._id)} item={item} />
        ))}
      </main>

      <footer className="footer">
        © 2026 Chet Til So'zlarini Aniqlash. Barcha huquqlar himoyalangan.
      </footer>
    </>
  );
}
