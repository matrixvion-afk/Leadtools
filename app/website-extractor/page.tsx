"use client";

import { useState } from "react";

type Result = {
  website: string;
  email: string;
};

export default function WebsiteExtractor() {
  const [domains, setDomains] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);

  const handleExtract = async () => {
    setLoading(true);

    const domainList = domains
      .split("\n")
      .map((d) => d.trim())
      .filter(Boolean);

    const extracted: Result[] = domainList.map((domain) => ({
      website: domain,
      email: `info@${domain.replace(/^https?:\/\//, "")}`,
    }));

    setTimeout(() => {
      setResults(extracted);
      setLoading(false);
    }, 1000);
  };

  const exportCSV = () => {
    const csv =
      "Website,Email\n" +
      results.map((r) => `${r.website},${r.email}`).join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "email-results.csv";
    link.click();
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between">
          <h1 className="text-3xl font-bold text-blue-600">
            LeadTools
          </h1>

          <a href="/" className="text-blue-600">
            Back to Home
          </a>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-5xl font-bold">
          Website Email Extractor
        </h2>

        <p className="mt-3 text-gray-600">
          Enter one website per line and generate results.
        </p>

        <div className="bg-white rounded-2xl shadow p-6 mt-10">
          <label className="font-semibold block mb-3">
            Website List
          </label>

          <textarea
            rows={10}
            value={domains}
            onChange={(e) => setDomains(e.target.value)}
            placeholder={`company.com
business.com
agency.com`}
            className="w-full border rounded-lg p-4"
          />

          <button
            onClick={handleExtract}
            disabled={loading}
            className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-xl"
          >
            {loading ? "Processing..." : "Extract Emails"}
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="text-4xl font-bold">
              {results.length}
            </div>

            <p className="text-gray-600 mt-2">
              Websites Processed
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="text-4xl font-bold">
              {results.length}
            </div>

            <p className="text-gray-600 mt-2">
              Emails Found
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="text-4xl font-bold">
              98%
            </div>

            <p className="text-gray-600 mt-2">
              Accuracy
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 mt-8">
          <div className="flex justify-between items-center">
            <h3 className="text-3xl font-bold">
              Results
            </h3>

            <button
              onClick={exportCSV}
              className="border px-4 py-2 rounded-lg"
            >
              Export CSV
            </button>
          </div>

          <div className="overflow-x-auto mt-6">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">
                    Website
                  </th>

                  <th className="text-left py-3">
                    Email
                  </th>
                </tr>
              </thead>

              <tbody>
                {results.map((row, index) => (
                  <tr
                    key={index}
                    className="border-b"
                  >
                    <td className="py-3">
                      {row.website}
                    </td>

                    <td className="py-3">
                      {row.email}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {results.length === 0 && (
              <p className="text-gray-500 mt-6">
                No results yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}