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

      const data = await res.json();

      if (!data?.success) {
        setError(data?.error || data?.details || "Something went wrong");
      } else {
        setResults(data.results || []);
      }
    } catch (err) {
      console.error(err);
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
      {/* Menu */}
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

      {/* Title */}
      <h1
        style={{
          fontSize: "42px",
          marginBottom: "25px",
          color: "#60a5fa",
          fontWeight: "bold",
        }}
      >
        Lead Finder
      </h1>

      {/* Search Section */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "25px",
          flexWrap: "wrap",
        }}
      >
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Keyword (e.g. Food Wholesalers)"
          style={{
            padding: "12px",
            background: "#ffffff",
            color: "#000000",
            border: "2px solid #3b82f6",
            borderRadius: "8px",
            minWidth: "280px",
            outline: "none",
          }}
        />

        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location (e.g. Texas, USA)"
          style={{
            padding: "12px",
            background: "#ffffff",
            color: "#000000",
            border: "2px solid #3b82f6",
            borderRadius: "8px",
            minWidth: "280px",
            outline: "none",
          }}
        />

        <button
          onClick={handleSearch}
          style={{
            padding: "12px 20px",
            background: "#2563eb",
            color: "#ffffff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {loading ? "Searching..." : "Find Companies"}
        </button>
      </div>

      {error && (
        <div
          style={{
            color: "#ef4444",
            marginBottom: "20px",
          }}
        >
          {error}
        </div>
      )}

      <div
        style={{
          marginBottom: "20px",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        Results: {results.length}
      </div>

      {results.length > 0 && (
        <div>
          {results.map((item, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #334155",
                background: "#1e293b",
                padding: "16px",
                marginBottom: "12px",
                borderRadius: "10px",
              }}
            >
              <h3
                style={{
                  color: "#60a5fa",
                  marginBottom: "10px",
                }}
              >
                {item.company}
              </h3>

              {item.website && (
                <p>
                  Website:{" "}
                  <a
                    href={item.website}
                    target="_blank"
                    rel="noreferrer"
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