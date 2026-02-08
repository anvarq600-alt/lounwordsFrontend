type Props = {
  mode: "text" | "file";
  setMode: (m: "text" | "file") => void;
};

export default function ModeTabs({ mode, setMode }: Props) {
  return (
    <div className="big-tabs">
      <button
        className={`big-tab ${mode === "file" ? "active" : ""}`}
        onClick={() => setMode("file")}
      >
        Fayl yuklash
      </button>
      <button
        className={`big-tab ${mode === "text" ? "active" : ""}`}
        onClick={() => setMode("text")}
      >
        Matn kiritish
      </button>
    </div>
  );
}
