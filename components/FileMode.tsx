"use client";

import { useState } from "react";

type Props = {
  file: File | null;
  setFile: (f: File | null) => void;
};

export default function FileMode({ file, setFile }: Props) {
  const [dragOver, setDragOver] = useState(false);

  return (
    <div
      className={`dropzone ${dragOver ? "dragover" : ""}`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        const f = e.dataTransfer.files?.[0];
        if (f) setFile(f);
      }}
    >
      <div className="drop-icon">⬆️</div>

      <h4>Faylni yuklang yoki bu yerga tashlang</h4>
      <p>PDF, DOCX yoki TXT formatidagi fayllar qabul qilinadi</p>

      <label style={{ display: "inline-flex" }}>
        <input
          type="file"
          accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <span className="btn-main" style={{ marginTop: 14 }}>
          Fayl tanlash
        </span>
      </label>

      <div style={{ marginTop: 10, fontSize: 12, color: "#64748b" }}>
        {file ? (
          <span>
            Tanlandi: <b>{file.name}</b>
          </span>
        ) : (
          <span>Hozircha fayl tanlanmagan.</span>
        )}
      </div>
    </div>
  );
}
