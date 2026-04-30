export type FoundWord = {
  word: string;
  count: number;
  origin?: string;
  alternative?: string;
  tokens?: string[]; // matndagi original shakllar (telefonni, kampyuterga)
};

export type AnalyzeResponse = {
  totalTokens?: number;
  found?: FoundWord[];
  fileName?: string;
  text?: string;
  error?: string;
};

export type HistoryItem = {
  _id: string;
  type: "text" | "file";
  fileName?: string;
  sample?: string;
  text?: string;
  createdAt: string;
  stats: { totalTokens: number; foundCount: number; totalOccurrences?: number };
  found: FoundWord[];
};

export type HistoryResponse = {
  items: HistoryItem[];
};
