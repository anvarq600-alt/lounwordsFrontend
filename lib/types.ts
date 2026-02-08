export type FoundWord = {
  word: string;
  count: number;
  origin?: string; // ✅ yangi
};

export type AnalyzeResponse = {
  totalTokens?: number;
  found?: FoundWord[];
  fileName?: string;
  text?: string; // ✅ highlight uchun (backend qaytaryapti)
  error?: string;
};
