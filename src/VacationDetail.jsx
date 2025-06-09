import { useParams, Link } from "react-router-dom";

function VacationDetail({ vacations }) {
  const { id } = useParams();
  const vacation = vacations.find((v) => v.id === parseInt(id));

  if (!vacation) return <p style={{ textAlign: "center", fontSize: "18px" }}>Vakantie niet gevonden!</p>;

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
      <Link
        to="/"
        style={{
          color: "#0066cc",
          textDecoration: "none",
          fontSize: "16px",
          display: "inline-block",
          marginBottom: "20px",
        }}
      >
        ← Terug naar overzicht
      </Link>
      <div style={{ display: "flex", gap: "40px" }}>
        <div style={{ flex: 1 }}>
          <img
            src={new URL(vacation.image, import.meta.url).href}
            alt={vacation.title}
            style={{ width: "100%", borderRadius: "10px", height: "400px", objectFit: "cover" }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <h1 style={{ color: "#0066cc", fontSize: "28px" }}>{vacation.title}</h1>
          <p style={{ color: "#666", fontSize: "16px", lineHeight: "1.6" }}>
            {vacation.fullDescription || vacation.shortDescription}
          </p>
          <p style={{ fontWeight: "bold", color: "#ff4500", fontSize: "20px", margin: "20px 0" }}>
            €{vacation.price} p.p.
          </p>
          <Link to={`/booking/${vacation.id}`}>
            <button
              style={{
                background: "#ffd700",
                border: "none",
                padding: "15px 30px",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "18px",
                color: "#0066cc",
              }}
            >
              Boek nu
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default VacationDetail;