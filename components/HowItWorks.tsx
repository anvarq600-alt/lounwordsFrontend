export default function HowItWorks() {
  return (
    <div className="how">
      <h3>Qanday ishlaydi?</h3>

      <div className="steps">
        <div className="step">
          <div className="step-badge" style={{ background: "#2563eb" }}>1</div>
          <p className="step-title">Fayl yuklang</p>
          <p className="step-desc">
            PDF, DOCX yoki TXT formatidagi faylni yuklang yoki matnni to‘g‘ridan-to‘g‘ri kiriting
          </p>
        </div>

        <div className="step">
          <div className="step-badge" style={{ background: "#16a34a" }}>2</div>
          <p className="step-title">Tahlil qilish</p>
          <p className="step-desc">
            Sistema avtomatik ravishda matndagi chet til so‘zlarini aniqlaydi
          </p>
        </div>

        <div className="step">
          <div className="step-badge" style={{ background: "#7c3aed" }}>3</div>
          <p className="step-title">Natijalarni oling</p>
          <p className="step-desc">
            Topilgan so‘zlar ro‘yxati va batafsil statistikani ko‘ring
          </p>
        </div>
      </div>
    </div>
  );
}
