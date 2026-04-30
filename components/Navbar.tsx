"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const base: React.CSSProperties = {
  padding: "8px 18px",
  borderRadius: 10,
  fontWeight: 600,
  fontSize: 14,
  textDecoration: "none",
  border: "1px solid #e5e7eb",
  background: "white",
  color: "#475569",
  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
  transition: "all 0.15s",
  display: "inline-block",
};

const active: React.CSSProperties = {
  ...base,
  background: "#2563eb",
  borderColor: "#2563eb",
  color: "white",
  boxShadow: "0 4px 12px rgba(37,99,235,0.3)",
};

export default function Navbar() {
  const path = usePathname();

  return (
    <div className="topbar">
      <div className="container topbar-inner">
        <Link href="/" className="brand" style={{ textDecoration: "none", color: "inherit" }}>
          Chet Til So'zlarini Aniqlash
        </Link>

        <nav style={{ display: "flex", gap: 8 }}>
          <Link href="/" style={path === "/" ? active : base}>
            Tahlil
          </Link>
          <Link href="/history" style={path === "/history" ? active : base}>
            Tarix
          </Link>
        </nav>
      </div>
    </div>
  );
}
