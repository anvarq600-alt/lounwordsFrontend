type Props = {
  text: string;
  setText: (v: string) => void;
};

export default function TextMode({ text, setText }: Props) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Matn kiriting</label>
      <textarea
        className="w-full border rounded p-3 min-h-[180px] outline-none focus:ring-2 focus:ring-black"
        placeholder="Matnni shu yerga joylang..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <p className="text-xs text-gray-500">
        Masalan: “Internet, telefon, marketing…” kabi so‘zlar.
      </p>
    </div>
  );
}
