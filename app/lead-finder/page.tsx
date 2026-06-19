"use client";

import { useState } from "react";

type Company = {
  company: string;
  website: string;
  email?: string;
};

export default function LeadFinderPage() {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [limit] = useState("300");
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
      {/* Top Menu */}
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

      {/* Search */}
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
          }}
        />

        <button
          onClick={handleSearch}
          style={{
            padding: "12px 20px",
            background: "#2563eb",
            color: "#fff",
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
          fontSize: "18px",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        Results: {results.length}
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div
          style={{
            overflowX: "auto",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              background: "#1e293b",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    border: "1px solid #334155",
                    padding: "12px",
                    textAlign: "left",
                  }}
                >
                  Company Name
                </th>

                <th
                  style={{
                    border: "1px solid #334155",
                    padding: "12px",
                    textAlign: "left",
                  }}
                >
                  Website
                </th>

                <th
                  style={{
                    border: "1px solid #334155",
                    padding: "12px",
                    textAlign: "left",
                  }}
                >
                  Email
                </th>
              </tr>
            </thead>

            <tbody>
              {results.map((item, index) => (
                <tr key={index}>
                  <td
                    style={{
                      border: "1px solid #334155",
                      padding: "12px",
                    }}
                  >
                    {item.company}
                  </td>

                  <td
                    style={{
                      border: "1px solid #334155",
                      padding: "12px",
                    }}
                  >
                    <a
                      href={item.website}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        color: "#60a5fa",
                      }}
                    >
                      {item.website}
                    </a>
                  </td>

                  <td
                    style={{
                      border: "1px solid #334155",
                      padding: "12px",
                    }}
                  >
                    {item.email || "No email found"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}