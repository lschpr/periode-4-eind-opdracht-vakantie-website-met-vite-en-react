import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { vacations } from "./data/vacations.js";
import VacationDetail from "./VacationDetail.jsx";
import BookingForm from "./BookingForm.jsx";
import About from "./About.jsx";
import Contact from "./Contact.jsx";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredVacations = vacations.filter((vacation) =>
    vacation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vacation.country?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Router>
      <div
        style={{
          padding: "40px",
          fontFamily: "'Poppins', sans-serif",
          background: "linear-gradient(135deg, #fff7e6, #e6f3ff)",
          minHeight: "100vh",
          width: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Navigatiebalk */}
        <nav
          style={{
            background: "#ffd700",
            padding: "15px 30px",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <h1 style={{ margin: 0, color: "#0066cc", fontSize: "24px" }}>
            Sunny Travels ☀️
          </h1>
          <div>
            <Link to="/" style={navLinkStyle}>Home</Link>
            <Link to="/about" style={navLinkStyle}>Over ons</Link>
            <Link to="/contact" style={navLinkStyle}>Contact</Link>
          </div>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <input
                  type="text"
                  placeholder="Zoek op bestemming of land..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={searchInputStyle}
                />

                {filteredVacations.length === 0 ? (
                  <p style={{ textAlign: "center", color: "#666", fontSize: "18px" }}>
                    Geen vakanties gevonden.
                  </p>
                ) : (
                  <div style={vacationGridStyle}>
                    {filteredVacations.map((vacation) => (
                      <Link
                        to={`/vacation/${vacation.id}`}
                        key={vacation.id}
                        style={{ textDecoration: "none" }}
                      >
                        <div
                          style={vacationCardStyle}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.transform = "scale(1.05)")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.transform = "scale(1)")
                          }
                        >
                          <img
                            src={new URL(vacation.image, import.meta.url).href}
                            alt={vacation.title}
                            style={imageStyle}
                          />
                          <h2 style={{ color: "#0066cc", fontSize: "20px", margin: "15px 0 10px" }}>
                            {vacation.title}
                          </h2>
                          <p style={{ color: "#666", fontSize: "16px" }}>
                            {vacation.shortDescription}
                          </p>
                          <p style={{ fontWeight: "bold", color: "#ff4500", fontSize: "16px" }}>
                            €{vacation.price} p.p.
                            {vacation.price < 500 && (
                              <span style={{ marginLeft: "10px", color: "#ffd700" }}>
                                ★ Topdeal
                              </span>
                            )}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/vacation/:id" element={<VacationDetail vacations={vacations} />} />
          <Route path="/booking/:id" element={<BookingForm vacations={vacations} />} />
        </Routes>
      </div>
    </Router>
  );
}

const navLinkStyle = {
  marginRight: "30px",
  color: "#0066cc",
  textDecoration: "none",
  fontSize: "18px",
};

const searchInputStyle = {
  marginBottom: "40px",
  padding: "15px",
  width: "100%",
  maxWidth: "600px",
  display: "block",
  marginInline: "auto",
  borderRadius: "8px",
  border: "2px solid #ffd700",
  fontSize: "18px",
};

const vacationGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "30px",
};

const vacationCardStyle = {
  border: "1px solid #ddd",
  borderRadius: "10px",
  padding: "20px",
  background: "white",
  transition: "transform 0.2s",
  cursor: "pointer",
};

const imageStyle = {
  width: "100%",
  height: "200px",
  objectFit: "cover",
  borderRadius: "8px",
};

export default App;
