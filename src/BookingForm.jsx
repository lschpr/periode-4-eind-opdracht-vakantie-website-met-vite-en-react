import { useState } from "react";
import { useParams, Link } from "react-router-dom";

function BookingForm({ vacations }) {
  const { id } = useParams();
  const vacation = vacations.find((v) => v.id === parseInt(id));
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    persons: 1,
    departureDate: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (!vacation) return <p style={{ textAlign: "center", fontSize: "18px" }}>Vakantie niet gevonden!</p>;

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <Link
        to={`/vacation/${id}`}
        style={{
          color: "#0066cc",
          textDecoration: "none",
          fontSize: "16px",
          display: "inline-block",
          marginBottom: "20px",
        }}
      >
        ← Terug naar details
      </Link>
      <h2 style={{ color: "#0066cc", fontSize: "24px" }}>Boeking voor {vacation.title}</h2>

      {submitted ? (
        <p style={{ color: "#0066cc", fontSize: "18px", textAlign: "center" }}>
          ✅ Bedankt voor je boeking!
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          <input
            type="text"
            placeholder="Naam"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            style={{
              padding: "15px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "16px",
            }}
          />
          <input
            type="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            style={{
              padding: "15px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "16px",
            }}
          />
          <input
            type="number"
            placeholder="Aantal personen"
            value={formData.persons}
            onChange={(e) => setFormData({ ...formData, persons: e.target.value })}
            min="1"
            required
            style={{
              padding: "15px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "16px",
            }}
          />
          <input
            type="date"
            value={formData.departureDate}
            onChange={(e) => setFormData({ ...formData, departureDate: e.target.value })}
            required
            style={{
              padding: "15px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "16px",
            }}
          />
          <button
            type="submit"
            style={{
              background: "#ffd700",
              border: "none",
              padding: "15px",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "18px",
              color: "#0066cc",
              gridColumn: "span 2",
            }}
          >
            Bevestig boeking
          </button>
        </form>
      )}
    </div>
  );
}

export default BookingForm;