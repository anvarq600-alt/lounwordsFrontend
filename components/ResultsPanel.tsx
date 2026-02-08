import type { FoundWord } from "@/lib/types";

export default function ResultsTable({ found }: { found: FoundWord[] }) {
  if (!found?.length) {
    return <p style={{ color: "#64748b" }}>Natija yo‘q (lug‘atda topilmadi).</p>;
  }

  return (
    <div className="table-wrap">
      <table className="result-table">
        <thead>
          <tr>
            <th>#</th>
            <th>So‘z</th>
            <th>Uchrash soni</th>
            <th>Kelib chiqishi</th>
          </tr>
        </thead>

        <tbody>
          {found.map((x, i) => (
            <tr key={`${x.word}-${i}`}>
              <td>{i + 1}</td>

              <td>
                <span className="word-pill">{x.word}</span>
              </td>

              <td>{x.count}</td>

              <td>
                <span className="origin-pill">{x.origin || "Noma’lum"}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <style jsx>{`
        .origin-pill {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
          background: linear-gradient(135deg, #dbeafe, #d1fae5);
          color: #0f172a;
          border: 1px solid #e5e7eb;
          white-space: nowrap;
        }
      `}</style>
    </div>
  );
}
