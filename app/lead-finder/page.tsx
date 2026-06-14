"use client";

import { useState } from "react";

type Company = {
  company: string;
  website: string;
  email: string;
  phone: string;
  linkedin: string;
};

export default function LeadFinderPage() {
  const [keyword, setKeyword] = useState("");
  const [country, setCountry] = useState("India");
  const [limit, setLimit] = useState("500");
  const [loading, setLoading] = useState(false);

  const [results, setResults] = useState<Company[]>([]);

  const handleSearch = async () => {
    setLoading(true);

    // Demo Data
    setTimeout(() => {
      setResults([
        {
          company: "ABC Textiles",
          website: "https://abctextiles.com",
          email: "info@abctextiles.com",
          phone: "+91 9999999999",
          linkedin: "https://linkedin.com/company/abctextiles",
        },
        {
          company: "XYZ Manufacturers",
          website: "https://xyzmanufacturers.com",
          email: "sales@xyzmanufacturers.com",
          phone: "+91 8888888888",
          linkedin: "https://linkedin.com/company/xyz",
        },
      ]);

      setLoading(false);
    }, 1500);
  };

  const downloadCSV = () => {
    if (!results.length) return;

    const headers = [
      "Company",
      "Website",
      "Email",
      "Phone",
      "LinkedIn",
    ];

    const rows = results.map((r) => [
      r.company,
      r.website,
      r.email,
      r.phone,
      r.linkedin,
    ]);

    const csv =
      [headers, ...rows]
        .map((row) => row.join(","))
        .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "lead-results.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
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
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontSize: "40px",
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
          Lead Finder
        </h1>

        <p
          style={{
            color: "#94a3b8",
            marginBottom: "30px",
          }}
        >
          Find companies, websites, emails and business contacts.
        </p>

        <div
          style={{
            background: "#1e293b",
            padding: "20px",
            borderRadius: "12px",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr auto",
              gap: "15px",
            }}
          >
            <input
              type="text"
              placeholder="Textile Manufacturers India"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              style={{
                padding: "12px",
                borderRadius: "8px",
                border: "none",
              }}
            />

            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              style={{
                padding: "12px",
                borderRadius: "8px",
              }}
            >
              <option>India</option>
              <option>USA</option>
              <option>Canada</option>
              <option>UK</option>
              <option>Australia</option>
              <option>Germany</option>
              <option>UAE</option>
            </select>

            <select
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              style={{
                padding: "12px",
                borderRadius: "8px",
              }}
            >
              <option>100</option>
              <option>500</option>
              <option>1000</option>
            </select>

            <button
              onClick={handleSearch}
              disabled={loading}
              style={{
                background: "#2563eb",
                color: "#fff",
                border: "none",
                padding: "12px 20px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              {loading ? "Searching..." : "Find Companies"}
            </button>
          </div>
        </div>

        {results.length > 0 && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <h2>Results ({results.length})</h2>

              <button
                onClick={downloadCSV}
                style={{
                  background: "#16a34a",
                  color: "#fff",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Download CSV
              </button>
            </div>

            <div
              style={{
                overflowX: "auto",
                background: "#1e293b",
                borderRadius: "12px",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                }}
              >
                <thead>
                  <tr>
                    <th style={{ padding: "12px" }}>Company</th>
                    <th style={{ padding: "12px" }}>Website</th>
                    <th style={{ padding: "12px" }}>Email</th>
                    <th style={{ padding: "12px" }}>Phone</th>
                    <th style={{ padding: "12px" }}>LinkedIn</th>
                  </tr>
                </thead>

                <tbody>
                  {results.map((item, index) => (
                    <tr key={index}>
                      <td style={{ padding: "12px" }}>
                        {item.company}
                      </td>

                      <td style={{ padding: "12px" }}>
                        {item.website}
                      </td>

                      <td style={{ padding: "12px" }}>
                        {item.email}
                      </td>

                      <td style={{ padding: "12px" }}>
                        {item.phone}
                      </td>

                      <td style={{ padding: "12px" }}>
                        {item.linkedin}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}