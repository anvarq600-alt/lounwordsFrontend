"use client";
import { useState } from "react";

type Props = {
  text: string;
  words: string[];
};

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default function HighlightedText({ text, words }: Props) {
  const [expanded, setExpanded] = useState(false);

  if (!text) return null;

  const sorted = [...new Set(words)].sort((a, b) => b.length - a.length);

  let parts: React.ReactNode[] = [];

  if (sorted.length > 0) {
    const pattern = sorted.map(escapeRegExp).join("|");
    const re = new RegExp(
      `(^|[^A-Za-z0-9o'g'''])(${pattern})(?=[^A-Za-z0-9o'g''']|$)`,
      "gi"
    );

    let lastIndex = 0;
    for (const m of text.matchAll(re)) {
      const idx = m.index ?? 0;
      const boundary = m[1] ?? "";
      const word = m[2] ?? "";
      const wordStart = idx + boundary.length;
      const wordEnd = wordStart + word.length;
      parts.push(text.slice(lastIndex, idx));
      parts.push(boundary);
      parts.push(<mark key={`${wordStart}-${wordEnd}`}>{text.slice(wordStart, wordEnd)}</mark>);
      lastIndex = wordEnd;
    }
    parts.push(text.slice(lastIndex));
  } else {
    parts = [text];
  }

  const isLong = text.length > 800;

  return (
    <div>
      <div
        className="output-text"
        style={{
          maxHeight: expanded || !isLong ? "none" : 220,
          overflow: "hidden",
          position: "relative",
        }}
      >
        {parts}

        {/* Gradient overlay — yig'ilganda */}
        {isLong && !expanded && (
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            height: 60,
            background: "linear-gradient(to bottom, transparent, white)",
            pointerEvents: "none",
          }} />
        )}
      </div>

      {isLong && (
        <button
          onClick={() => setExpanded((p) => !p)}
          style={{
            marginTop: 8,
            padding: "6px 16px",
            borderRadius: 8,
            border: "1px solid #e5e7eb",
            background: "white",
            fontSize: 13,
            fontWeight: 600,
            color: "#2563eb",
            cursor: "pointer",
          }}
        >
          {expanded ? "▲ Yig'ish" : "▼ To'liq ko'rish"}
        </button>
      )}
    </div>
  );
}
