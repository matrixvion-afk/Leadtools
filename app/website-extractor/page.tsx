"use client";

import { useState } from "react";

type Result = {
  website: string;
  emails: string[];
  phones: string[];
  facebook?: string;
  linkedin?: string;
  instagram?: string;
  twitter?: string;
};

export default function WebsiteExtractor() {
  const [websites, setWebsites] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);

  const handleExtract = async () => {
    try {
      setLoading(true);

      const sites = websites
        .split("\n")
        .map((site) => site.trim())
        .filter(Boolean);

      const response = await fetch("/api/extract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          websites: sites,
        }),
      });

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error(error);
      alert("Extraction failed");
    } finally {
      setLoading(false);
    }
  };

  const downloadCSV = () => {
    const csv = [
      [
        "Website",
        "Emails",
        "Phones",
        "Facebook",
        "LinkedIn",
        "Instagram",
        "Twitter",
      ].join(","),

      ...results.map((r) =>
        [
          r.website,
          `"${(r.emails || []).join("; ")}"`,
          `"${(r.phones || []).join("; ")}"`,
          r.facebook || "",
          r.linkedin || "",
          r.instagram || "",
          r.twitter || "",
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "website-results.csv";
    link.click();
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="bg-white border-b shadow-sm">
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

      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-5xl font-bold mb-4">
          Website Email Extractor
        </h1>

        <p className="text-gray-600 mb-8">
          Extract public emails, phone numbers and social
          media profiles from websites.
        </p>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <label className="font-semibold block mb-3">
            Website List
          </label>

          <textarea
            className="w-full h-56 border rounded-xl p-4"
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
            disabled={loading}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold disabled:opacity-50"
          >
            {loading
              ? "Extracting..."
              : "Extract Emails"}
          </button>
        </div>

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
              {
                results.filter(
                  (r) => r.emails?.length > 0
                ).length
              }
            </h3>
            <p className="text-gray-600">
              Emails Found
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow">
            <h3 className="text-3xl font-bold">
              {loading ? "..." : "100%"}
            </h3>
            <p className="text-gray-600">
              Processing Status
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">
              Results
            </h2>

            <button
              onClick={downloadCSV}
              className="border px-4 py-2 rounded-lg"
            >
              Export CSV
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">
                    Website
                  </th>

                  <th className="text-left p-3">
                    Emails
                  </th>

                  <th className="text-left p-3">
                    Phones
                  </th>

                  <th className="text-left p-3">
                    Facebook
                  </th>

                  <th className="text-left p-3">
                    LinkedIn
                  </th>

                  <th className="text-left p-3">
                    Instagram
                  </th>

                  <th className="text-left p-3">
                    Twitter/X
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
                      {item.emails?.length
                        ? item.emails.join(", ")
                        : "-"}
                    </td>

                    <td className="p-3">
                      {item.phones?.length
                        ? item.phones.join(", ")
                        : "-"}
                    </td>

                    <td className="p-3">
                      {item.facebook ? (
                        <a
                          href={item.facebook}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600"
                        >
                          Facebook
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>

                    <td className="p-3">
                      {item.linkedin ? (
                        <a
                          href={item.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600"
                        >
                          LinkedIn
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>

                    <td className="p-3">
                      {item.instagram ? (
                        <a
                          href={item.instagram}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600"
                        >
                          Instagram
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>

                    <td className="p-3">
                      {item.twitter ? (
                        <a
                          href={item.twitter}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600"
                        >
                          Twitter
                        </a>
                      ) : (
                        "-"
                      )}
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