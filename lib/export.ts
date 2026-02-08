import type { FoundWord } from "./types";

export function downloadCSV(found: FoundWord[], filename = "loanwords.csv") {
  const header = "word,count\n";
  const rows = found.map(x => `${x.word},${x.count}`).join("\n");
  const csv = header + rows;

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
}
