import { jsPDF } from "jspdf";
import type { FoundWord } from "./types";

export function downloadPDF(found: FoundWord[], title = "Natija", filename="natija.pdf") {
  const doc = new jsPDF();
  doc.setFontSize(14);
  doc.text(title, 10, 10);

  doc.setFontSize(11);
  let y = 20;
  for (const x of found.slice(0, 60)) {
    doc.text(`${x.word} - ${x.count}`, 10, y);
    y += 7;
    if (y > 280) { doc.addPage(); y = 20; }
  }

  doc.save(filename);
}
