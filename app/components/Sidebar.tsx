import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen border-r bg-white">
      <div className="p-4 border-b">
        <h1 className="font-bold text-xl">LeadTools</h1>
      </div>

      <div className="p-4">
        <p className="text-gray-500 text-sm mb-2">
          Prospect & Enrich
        </p>

        <div className="space-y-2">
          <Link
            href="/people"
            className="block p-2 rounded hover:bg-gray-100"
          >
            👤 People
          </Link>

          <Link
            href="/companies"
            className="block p-2 rounded hover:bg-gray-100"
          >
            🏢 Companies
          </Link>
        </div>
      </div>
    </div>
  );
}