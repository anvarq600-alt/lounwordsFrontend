type Props = {
  text: string;
  words: string[];
};

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default function HighlightedText({ text, words }: Props) {
  if (!text) return null;
  if (!words.length) return <div className="output-text">{text}</div>;

  const sorted = [...words].sort((a, b) => b.length - a.length);
  const pattern = sorted.map(escapeRegExp).join("|");

  const re = new RegExp(`(^|[^A-Za-z0-9o'g'’‘])(${pattern})(?=[^A-Za-z0-9o'g'’‘]|$)`, "gi");

  const parts: any[] = [];
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

  return <div className="output-text">{parts}</div>;
}
