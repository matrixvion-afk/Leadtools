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
  const [country, setCountry] = useState("USA");
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

    alert("Search started");

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
          keyword: `${keyword} ${country}`,
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
      <h1>Lead Finder</h1>

      <input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Food Wholesalers"
        style={{
          padding: "10px",
          marginRight: "10px",
          color: "#000",
        }}
      />

      <button onClick={handleSearch}>
        {loading ? "Searching..." : "Find Companies"}
      </button>

      {error && (
        <div style={{ color: "red", marginTop: "20px" }}>
          {error}
        </div>
      )}

      <div style={{ marginTop: "20px" }}>
        Results: {results.length}
      </div>
    </div>
  );
}