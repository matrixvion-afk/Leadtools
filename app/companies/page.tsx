"use client";

import { useEffect, useMemo, useState } from "react";

type Result = {
  website: string;
  emails: string[];
  phones: string[];
  facebook?: string;
  linkedin?: string;
  instagram?: string;
  twitter?: string;
};

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Result[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  useEffect(() => {
    const stored = localStorage.getItem("leadtools_results");

    if (stored) {
      setCompanies(JSON.parse(stored));
    }
  }, []);

  const filteredCompanies = useMemo(() => {
    return companies.filter((company) =>
      company.website
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [companies, search]);

  const totalPages = Math.ceil(
    filteredCompanies.length / itemsPerPage
  );

  const paginatedCompanies = filteredCompanies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const exportCSV = () => {
    const csv = [
      ["Website", "Emails", "Phones"].join(","),

      ...filteredCompanies.map((company) =>
        [
          company.website,
          `"${company.emails.join("; ")}"`,
          `"${company.phones.join("; ")}"`,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "companies.csv";
    link.click();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Companies
        </h1>

        <button
          onClick={exportCSV}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Export CSV
        </button>
      </div>

      <input
        type="text"
        placeholder="Search company..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="border p-3 rounded w-full mb-6"
      />

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="text-left p-3">
                Website
              </th>

              <th className="text-left p-3">
                Emails Found
              </th>

              <th className="text-left p-3">
                Phones
              </th>

              <th className="text-left p-3">
                Socials
              </th>
            </tr>
          </thead>

          <tbody>
            {paginatedCompanies.map(
              (company, index) => (
                <tr
                  key={index}
                  className="border-b"
                >
                  <td className="p-3">
                    {company.website}
                  </td>

                  <td className="p-3">
                    {company.emails.length}
                  </td>

                  <td className="p-3">
                    {company.phones.length}
                  </td>

                  <td className="p-3 space-x-2">
                    {company.linkedin && (
                      <a
                        href={company.linkedin}
                        target="_blank"
                        className="text-blue-600"
                      >
                        LinkedIn
                      </a>
                    )}

                    {company.facebook && (
                      <a
                        href={company.facebook}
                        target="_blank"
                        className="text-blue-600"
                      >
                        Facebook
                      </a>
                    )}

                    {company.instagram && (
                      <a
                        href={company.instagram}
                        target="_blank"
                        className="text-pink-600"
                      >
                        Instagram
                      </a>
                    )}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      <div className="flex gap-2 mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() =>
            setCurrentPage((p) => p - 1)
          }
          className="border px-4 py-2 rounded"
        >
          Previous
        </button>

        <span className="px-4 py-2">
          Page {currentPage} of {totalPages || 1}
        </span>

        <button
          disabled={
            currentPage === totalPages
          }
          onClick={() =>
            setCurrentPage((p) => p + 1)
          }
          className="border px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}