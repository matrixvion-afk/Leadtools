"use client"; import { useEffect, useMemo, useState } from "react"; type Company = { website: string; emails: string[]; phones: string[]; facebook?: string; linkedin?: string; instagram?: string; twitter?: string; }; export default function CompaniesPage() { const [companies, setCompanies] = useState<Company[]>([]); const [search, setSearch] = useState(""); const [page, setPage] = useState(1); const perPage = 10; useEffect(() => { const saved = localStorage.getItem( "leadtools_results" );
if (saved) {
  setCompanies(JSON.parse(saved));
}
}, []); const filtered = useMemo(() => { return companies.filter((company) => company.website .toLowerCase() .includes(search.toLowerCase()) ); }, [companies, search]); const totalPages = Math.ceil(filtered.length / perPage) || 1; const currentResults = filtered.slice( (page - 1) * perPage, page * perPage ); const exportCSV = () => { const csv = [ [ "Website", "Emails", "Phones", "Facebook", "LinkedIn", "Instagram", "Twitter", ].join(","),
...filtered.map((c) =>
    [
      c.website,
      `"${(c.emails || []).join("; ")}"`,
      `"${(c.phones || []).join("; ")}"`,
      c.facebook || "",
      c.linkedin || "",
      c.instagram || "",
      c.twitter || "",
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
}; return ( <main className="min-h-screen bg-gray-100"> <div className="max-w-7xl mx-auto p-6"> <div className="flex justify-between items-center mb-6"> <h1 className="text-4xl font-bold"> Companies </h1>
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
      className="w-full border rounded-lg p-3 mb-6"
    />

    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="text-left p-4">
              Website
            </th>

            <th className="text-left p-4">
              Emails Found
            </th>

            <th className="text-left p-4">
              Phones
            </th>

            <th className="text-left p-4">
              Socials
            </th>
          </tr>
        </thead>

        <tbody>
          {currentResults.map((company, index) => (
            <tr
              key={index}
              className="border-b"
            >
              <td className="p-4">
                {company.website}
              </td>

              <td className="p-4">
                {company.emails?.length
                  ? company.emails.join(", ")
                  : "-"}
              </td>

              <td className="p-4">
                {company.phones?.length
                  ? company.phones.join(", ")
                  : "-"}
              </td>

              <td className="p-4 space-x-2">
                {company.facebook && (
                  <a
                    href={company.facebook}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Facebook
                  </a>
                )}

                {company.linkedin && (
                  <a
                    href={company.linkedin}
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn
                  </a>
                )}

                {company.instagram && (
                  <a
                    href={company.instagram}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Instagram
                  </a>
                )}

                {company.twitter && (
                  <a
                    href={company.twitter}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Twitter
                  </a>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="flex gap-4 mt-6">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="border px-4 py-2 rounded"
      >
        Previous
      </button>

      <span>
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
); }