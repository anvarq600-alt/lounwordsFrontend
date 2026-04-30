"use client";

import { useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import ModeTabs from "@/components/ModeTabs";
import TextMode from "@/components/TextMode";
import FileMode from "@/components/FileMode";
import HighlightedText from "@/components/HighlightedText";
import HowItWorks from "@/components/HowItWorks";
import ResultsTable from "@/components/ResultsPanel";
import StatsPanel from "@/components/StatsPanel";
import { analyzeFile, analyzeText } from "@/lib/api";
import type { FoundWord } from "@/lib/types";

export default function Page() {
  const [mode, setMode] = useState<"text" | "file">("file");
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [found, setFound] = useState<FoundWord[]>([]);
  const [totalTokens, setTotalTokens] = useState(0);
  const [resultText, setResultText] = useState("");

  const canRun = mode === "text" ? !!text.trim() : !!file;
  const runningRef = useRef(false);

  const run = async () => {
    if (runningRef.current) return;
    runningRef.current = true;
    setLoading(true);
    setError("");
    setFound([]);
    setTotalTokens(0);
    setResultText("");

    try {
      const data =
        mode === "text"
          ? await analyzeText(text)
          : await analyzeFile(file as File);

      if (data?.error) throw new Error(data.error);

      setFound((data.found || []) as FoundWord[]);
      setTotalTokens(data.totalTokens || 0);

      // backend text qaytarsa – o‘sha, aks holda text mode’da kiritilgan matn
      if (typeof (data as any).text === "string") setResultText((data as any).text);
      else if (mode === "text") setResultText(text);
    } catch (e: any) {
      setError(e?.message || "Xatolik yuz berdi");
    } finally {
      setLoading(false);
      runningRef.current = false;
    }
  };

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="hero">
        <div className="container">
          <h1>O‘zbek tilida boshqa tillardan o‘tgan so‘zlarni avtomatik aniqlash algoritmi va dasturlarini yaratish</h1>
          <p>Matnlaringizdan chet tildan kirib kelgan so‘zlarni tez va oson aniqlang</p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 28 }}>
            {[
              { icon: "📄", label: "PDF va DOCX fayllari" },
              { icon: "🔤", label: "Kirill va Latin yozuvi" },
              { icon: "🌍", label: "395+ xorijiy so'z lug'ati" },
              { icon: "📊", label: "Batafsil statistika" },
              { icon: "⬇️", label: "CSV eksport" },
            ].map((f) => (
              <div
                key={f.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  padding: "8px 14px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  fontSize: 13,
                  fontWeight: 600,
                  backdropFilter: "blur(4px)",
                }}
              >
                <span>{f.icon}</span>
                <span>{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN */}
      <main className="container">
        {/* INPUT CARD */}
        <div className="card section">
          <ModeTabs mode={mode} setMode={setMode} />

          {mode === "file" ? (
            <FileMode file={file} setFile={setFile} />
          ) : (
            <TextMode text={text} setText={setText} />
          )}

          <button className="btn-main" onClick={run} disabled={!canRun || loading}>
            {loading ? "🔍 Tekshirilmoqda..." : "Aniqlash"}
          </button>

          {error && <p style={{ color: "#dc2626", marginTop: 10 }}>{error}</p>}
        </div>


        {/* STATISTIKA */}
        <StatsPanel found={found} totalTokens={totalTokens} />

        {/* RESULTS TABLE */}
        <div className="card section">
          <h3 style={{ margin: 0, fontWeight: 900, fontSize: 18 }}>Topilgan so‘zlar</h3>
          <p style={{ marginTop: 6, color: "#64748b", fontSize: 13 }}>
            Natijalar jadval ko‘rinishida
          </p>
          <div style={{ marginTop: 12 }}>
            <ResultsTable found={found} />
          </div>
        </div>

        {/* HIGHLIGHT */}
        {resultText ? (
          <div className="card section">
            <h3 style={{ margin: 0, fontWeight: 900, fontSize: 18 }}>Ajratib ko‘rsatish</h3>
            <p style={{ marginTop: 6, color: "#64748b", fontSize: 13 }}>
              Matndagi topilgan so‘zlar highlight qilinadi
            </p>
            <div style={{ marginTop: 12 }}>
              <HighlightedText
              text={resultText}
              words={found.flatMap((x) => x.tokens?.length ? x.tokens : [x.word])}
            />
            </div>
          </div>
        ) : null}
        {/* HOW IT WORKS */}
        <div className="section">
          <HowItWorks />
        </div>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        © 2026 Chet Til So‘zlarini Aniqlash. Barcha huquqlar himoyalangan.
      </footer>
    </>
  );
}
