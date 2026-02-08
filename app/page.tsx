"use client";

import { useState } from "react";
import ModeTabs from "@/components/ModeTabs";
import TextMode from "@/components/TextMode";
import FileMode from "@/components/FileMode";
import HighlightedText from "@/components/HighlightedText";

import HowItWorks from "@/components/HowItWorks";
import ResultsTable from "@/components/ResultsPanel";
import { analyzeFile, analyzeText } from "@/lib/api";
import type { FoundWord } from "@/lib/types";

export default function Page() {
  const [mode, setMode] = useState<"text" | "file">("file");
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [found, setFound] = useState<FoundWord[]>([]);
  const [resultText, setResultText] = useState("");

  const canRun = mode === "text" ? !!text.trim() : !!file;

  const run = async () => {
    setLoading(true);
    setError("");
    setFound([]);
    setResultText("");

    try {
      const data =
        mode === "text"
          ? await analyzeText(text)
          : await analyzeFile(file as File);

      if (data?.error) throw new Error(data.error);

      setFound((data.found || []) as FoundWord[]);

      // backend text qaytarsa – o‘sha, aks holda text mode’da kiritilgan matn
      if (typeof (data as any).text === "string") setResultText((data as any).text);
      else if (mode === "text") setResultText(text);
    } catch (e: any) {
      setError(e?.message || "Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* TOP BAR */}
      <div className="topbar">
        <div className="container topbar-inner">
          <div className="brand">Chet Til So‘zlarini Aniqlash</div>
          <button className="avatar-btn" title="Profile" aria-label="Profile">👤</button>
        </div>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="container">
          <h1>Chet Til So‘zlarini Aniqlash</h1>
          <p>Matnlaringizdan chet tildan kirib kelgan so‘zlarni tez va oson aniqlang</p>

          <div className="hero-actions">
            <button className="hero-btn" onClick={run} disabled={!canRun || loading}>
              🔎 Avtomatik tahlil
            </button>
            <button
              className="hero-btn"
              onClick={() => document.getElementById("stats")?.scrollIntoView({ behavior: "smooth" })}
            >
              📈 Batafsil statistika
            </button>
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
              <HighlightedText text={resultText} words={found.map((x) => x.word)} />
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
