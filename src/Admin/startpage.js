import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const colleges = [
  { name: "Kanpur Institute of Technology", shortName: "kit" ,logo:""},
  { name: "Indian Institute of Technology", shortName: "iit",logo:"" },
  { name: "National Institute of Technology", shortName: "nit" ,logo:""},
];

// Load Inter font from Google Fonts dynamically
function useInterFont() {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);
}

export default function CollegeSelector() {
  useInterFont();
  const [selectedCollege, setSelectedCollege] = useState(null);
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (selectedCollege) {
      navigate(`/${selectedCollege.shortName}-alumni`, {
        state: { ...selectedCollege },
      });
    }
  };

  return (
    <div
      className="vh-100 d-flex align-items-center justify-content-center position-relative"
      style={{
        fontFamily: "'Inter', sans-serif",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1920&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ backgroundColor: "rgba(15, 23, 42, 0.6)" }} // deep navy with opacity
      ></div>

      {/* Content Box */}
      <div
        className="card p-5 shadow-lg position-relative"
        style={{
          maxWidth: "440px",
          zIndex: 10,
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderRadius: "1rem",
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
        }}
      >
        <h1
          className="mb-4"
          style={{
            color: "#1e3a8a", // rich blue
            fontWeight: 700,
            fontSize: "2.25rem",
          }}
        >
          🎓 Select Your College
        </h1>

        <label
          htmlFor="college-select"
          className="form-label mb-3"
          style={{
            color: "#334155", // slate gray
            fontWeight: 600,
            fontSize: "1.1rem",
          }}
        >
          Choose from the list:
        </label>

        <select
          id="college-select"
          className="form-select"
          defaultValue=""
          onChange={(e) => {
            const college = colleges.find((c) => c.shortName === e.target.value);
            setSelectedCollege(college);
          }}
          style={{
            fontSize: "1rem",
            color: "#1e293b",
            borderColor: "#cbd5e1",
            boxShadow: "inset 0 1px 2px rgb(0 0 0 / 0.1)",
            borderRadius: "0.75rem",
            padding: "0.625rem 1rem",
          }}
        >
          <option value="" disabled>
            -- Choose a college --
          </option>
          {colleges.map((college) => (
            <option key={college.shortName} value={college.shortName}>
              {college.name}
            </option>
          ))}
        </select>

        {selectedCollege && (
          <button
            onClick={handleNavigate}
            className="btn w-100 mt-4 d-flex justify-content-center align-items-center gap-2"
            style={{
              background:
                "linear-gradient(90deg, #2563eb 0%, #3b82f6 100%)", // blue gradient
              color: "white",
              fontWeight: 600,
              fontSize: "1.15rem",
              padding: "0.75rem 1.25rem",
              borderRadius: "0.75rem",
              boxShadow: "0 4px 14px rgb(59 130 246 / 0.4)",
              transition: "all 0.3s ease",
              border: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "linear-gradient(90deg, #1e40af 0%, #2563eb 100%)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgb(30 64 175 / 0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "linear-gradient(90deg, #2563eb 0%, #3b82f6 100%)";
              e.currentTarget.style.boxShadow = "0 4px 14px rgb(59 130 246 / 0.4)";
            }}
          >
            Continue to {selectedCollege.shortName.toUpperCase()} Alumni
            <ArrowRight size={22} />
          </button>
        )}
      </div>
    </div>
  );
}
