"use client";

import { useMemo, useState } from "react";

type Company = {
  id: number;
  name: string;
  website: string;
  phone: string;
  industry: string;
  location: string;
  size: string;
};

const sampleCompanies: Company[] = [
  {
    id: 1,
    name: "HubSpot",
    website: "hubspot.com",
    phone: "+1 888 482 7768",
    industry: "Marketing",
    location: "United States",
    size: "1000+",
  },
  {
    id: 2,
    name: "Mailchimp",
    website: "mailchimp.com",
    phone: "+1 800 315 5939",
    industry: "Marketing",
    location: "United States",
    size: "500+",
  },
  {
    id: 3,
    name: "Semrush",
    website: "semrush.com",
    phone: "+1 800 815 9959",
    industry: "Software",
    location: "United States",
    size: "1000+",
  },
  {
    id: 4,
    name: "Ahrefs",
    website: "ahrefs.com",
    phone: "+65 3165 4789",
    industry: "SEO",
    location: "Singapore",
    size: "200+",
  },
];

export default function CompaniesPage() {
  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");
  const [page, setPage] = useState(1);

  const perPage = 10;

  const filtered = useMemo(() => {
    return sampleCompanies.filter((company) => {
      return (
        company.name
          .toLowerCase()
          .includes(search.toLowerCase()) &&
        (industry === "" ||
          company.industry === industry) &&
        (location === "" ||
          company.location === location)
      );
    });
  }, [search, industry, location]);

  const totalPages =
    Math.ceil(filtered.length / perPage) || 1;

  const currentResults = filtered.slice(
    (page - 1) * perPage,
    page * perPage
  );

  const exportCSV = () => {
    const csv = [
      [
        "Company",
        "Website",
        "Phone",
        "Industry",
        "Location",
        "Size",
      ].join(","),

      ...filtered.map((c) =>
        [
          c.name,
          c.website,
          c.phone,
          c.industry,
          c.location,
          c.size,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "companies.csv";
    a.click();
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6">
          Companies
        </h1>

        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <div className="grid md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Search company..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="border rounded-lg p-3"
            />

            <select
              value={industry}
              onChange={(e) =>
                setIndustry(e.target.value)
              }
              className="border rounded-lg p-3"
            >
              <option value="">
                All Industries
              </option>
              <option value="Marketing">
                Marketing
              </option>
              <option value="Software">
                Software
              </option>
              <option value="SEO">SEO</option>
            </select>

            <select
              value={location}
              onChange={(e) =>
                setLocation(e.target.value)
              }
              className="border rounded-lg p-3"
            >
              <option value="">
                All Locations
              </option>
              <option value="United States">
                United States
              </option>
              <option value="Singapore">
                Singapore
              </option>
            </select>

            <button
              onClick={exportCSV}
              className="bg-blue-600 text-white rounded-lg"
            >
              Export CSV
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="text-left p-4">
                  Company
                </th>
                <th className="text-left p-4">
                  Website
                </th>
                <th className="text-left p-4">
                  Phone
                </th>
                <th className="text-left p-4">
                  Industry
                </th>
                <th className="text-left p-4">
                  Location
                </th>
                <th className="text-left p-4">
                  Size
                </th>
              </tr>
            </thead>

            <tbody>
              {currentResults.map((company) => (
                <tr
                  key={company.id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-4 font-medium">
                    {company.name}
                  </td>

                  <td className="p-4">
                    {company.website}
                  </td>

                  <td className="p-4">
                    {company.phone}
                  </td>

                  <td className="p-4">
                    {company.industry}
                  </td>

                  <td className="p-4">
                    {company.location}
                  </td>

                  <td className="p-4">
                    {company.size}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center gap-3 mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="border px-4 py-2 rounded"
          >
            Previous
          </button>

          <span className="px-4 py-2">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="border px-4 py-2 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
}