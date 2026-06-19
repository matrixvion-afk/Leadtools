"use client";

import { useState } from "react";

type Company = {
  company: string;
  website: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  facebook?: string;
  address?: string;
};

export default function LeadFinderPage() {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [limit, setLimit] = useState("50");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Company[]>([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    console.log("BUTTON CLICKED");

    if (!keyword) {
      alert("Please enter a keyword");
      return;
    }

    if (!location) {
      alert("Please enter a location");
      return;
    }

    setLoading(true);
    setError("");
    setResults([]);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          keyword,
          location,
          limit: Number(limit),
        }),
      });

      console.log("STATUS:", res.status);

      const data = await res.json();

      console.log("API RESPONSE:", data);

      if (!data?.success) {
        setError(data?.error || data?.details || "Something went wrong");
      } else {
        setResults(data.results || []);
      }
    } catch (err) {
      console.error("FETCH ERROR:", err);
      setError("Failed to fetch leads");
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "#fff",
        padding: "40px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "25px",
          marginBottom: "40px",
          fontSize: "16px",
        }}
      >
        <a href="/lead-finder" style={{ color: "#fff" }}>
          Lead Finder
        </a>

        <a href="/website-extractor" style={{ color: "#fff" }}>
          Extractor
        </a>

        <a href="/pricing" style={{ color: "#fff" }}>
          Pricing
        </a>

        <a href="/contact" style={{ color: "#fff" }}>
          Contact
        </a>

        <a href="/login" style={{ color: "#fff" }}>
          Login
        </a>

        <a href="/register" style={{ color: "#fff" }}>
          Register
        </a>
      </div>

      <h1>Lead Finder</h1>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "20px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Keyword (e.g. Food Wholesalers)"
          style={{
            padding: "10px",
            color: "#000",
            minWidth: "250px",
          }}
        />

        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location (e.g. Texas, USA)"
          style={{
            padding: "10px",
            color: "#000",
            minWidth: "250px",
          }}
        />

        <button
          onClick={handleSearch}
          style={{
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          {loading ? "Searching..." : "Find Companies"}
        </button>
      </div>

      {error && (
        <div style={{ color: "red", marginTop: "20px" }}>
          {error}
        </div>
      )}

      <div style={{ marginTop: "20px" }}>
        Results: {results.length}
      </div>

      {results.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          {results.map((item, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #334155",
                padding: "15px",
                marginBottom: "10px",
                borderRadius: "8px",
              }}
            >
              <h3>{item.company}</h3>

              {item.website && (
                <p>
                  Website:{" "}
                  <a
                    href={item.website}
                    target="_blank"
                    style={{ color: "#60a5fa" }}
                  >
                    {item.website}
                  </a>
                </p>
              )}

              {item.email && <p>Email: {item.email}</p>}
              {item.phone && <p>Phone: {item.phone}</p>}
              {item.address && <p>Address: {item.address}</p>}
              {item.linkedin && <p>LinkedIn: {item.linkedin}</p>}
              {item.facebook && <p>Facebook: {item.facebook}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}