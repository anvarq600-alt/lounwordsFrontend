import "./globals.css";

export const metadata = {
  title: "Loanword Detector",
  description: "O‘zbek matnidan chet tilidan kirgan so‘zlarni aniqlash",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz">
      <body>{children}</body>
    </html>
  );
}
