"use client";

import { useState } from "react";

export default function WebsiteExtractor() {
  const [websites, setWebsites] = useState("");
  const [results, setResults] = useState<
    { website: string; email: string }[]
  >([]);

  const handleExtract = () => {
    const sites = websites
      .split("\n")
      .map((site) => site.trim())
      .filter(Boolean);

    const sampleResults = sites.map((site) => ({
      website: site,
      email: `info@${site.replace(
        /^https?:\/\//,
        ""
      )}`,
    }));

    setResults(sampleResults);
  };

  return (
    <main className="min-h-screen bg-gray-100">

      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-600">
            LeadTools
          </h1>

          <a
            href="/"
            className="text-blue-600 font-medium"
          >
            Back to Home
          </a>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-6 py-12">

        <h1 className="text-5xl font-bold mb-4">
          Website Email Extractor
        </h1>

        <p className="text-gray-600 mb-8">
          Enter one website per line and generate sample results.
        </p>

        {/* Input */}
        <div className="bg-white rounded-2xl shadow-lg p-8">

          <label className="font-semibold block mb-3">
            Website List
          </label>

          <textarea
            className="w-full h-52 border rounded-xl p-4"
            placeholder={`company.com
business.com
agency.com`}
            value={websites}
            onChange={(e) =>
              setWebsites(e.target.value)
            }
          />

          <button
            onClick={handleExtract}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold"
          >
            Extract Emails
          </button>

        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">

          <div className="bg-white rounded-xl p-6 shadow">
            <h3 className="text-3xl font-bold">
              {results.length}
            </h3>
            <p className="text-gray-600">
              Websites Processed
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow">
            <h3 className="text-3xl font-bold">
              {results.length}
            </h3>
            <p className="text-gray-600">
              Emails Found
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow">
            <h3 className="text-3xl font-bold">
              98%
            </h3>
            <p className="text-gray-600">
              Accuracy
            </p>
          </div>

        </div>

        {/* Results */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">
              Results
            </h2>

            <button className="border px-4 py-2 rounded-lg">
              Export CSV
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">

              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">
                    Website
                  </th>

                  <th className="text-left p-3">
                    Email
                  </th>
                </tr>
              </thead>

              <tbody>
                {results.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b"
                  >
                    <td className="p-3">
                      {item.website}
                    </td>

                    <td className="p-3">
                      {item.email}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>

        </div>

      </div>

    </main>
  );
}