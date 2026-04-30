import type { AnalyzeResponse, HistoryResponse } from "./types";

const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function analyzeText(text: string): Promise<AnalyzeResponse> {
  const res = await fetch(`${BASE}/api/analyze/text`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  return res.json();
}

export async function analyzeFile(file: File): Promise<AnalyzeResponse> {
  const fd = new FormData();
  fd.append("file", file);

  const res = await fetch(`${BASE}/api/analyze/file`, {
    method: "POST",
    body: fd,
  });

  return res.json();
}

export async function fetchHistory(limit = 20): Promise<HistoryResponse> {
  const res = await fetch(`${BASE}/api/history?limit=${limit}`);
  return res.json();
}
