export default function Dashboard() {
  return (
    <main className="min-h-screen bg-gray-100 flex">

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r min-h-screen p-6">

        <h1 className="text-3xl font-bold text-blue-600 mb-10">
          LeadTools
        </h1>

        <nav className="space-y-4">

          <a
            href="/dashboard"
            className="block p-3 rounded-lg bg-blue-600 text-white"
          >
            Dashboard
          </a>

          <a
            href="/website-extractor"
            className="block p-3 rounded-lg hover:bg-gray-100"
          >
            Email Extractor
          </a>

          <a
            href="/billing"
            className="block p-3 rounded-lg hover:bg-gray-100"
          >
            Billing
          </a>

          <a
            href="/settings"
            className="block p-3 rounded-lg hover:bg-gray-100"
          >
            Settings
          </a>

          <a
            href="/profile"
            className="block p-3 rounded-lg hover:bg-gray-100"
          >
            Profile
          </a>

          <a
            href="/contact"
            className="block p-3 rounded-lg hover:bg-gray-100"
          >
            Support
          </a>

          <a
            href="/"
            className="block p-3 rounded-lg hover:bg-gray-100"
          >
            Home
          </a>

        </nav>

      </aside>

      {/* Content */}
      <section className="flex-1 p-8">

        <div className="flex justify-between items-center mb-8">

          <div>
            <h1 className="text-4xl font-bold">
              Dashboard
            </h1>

            <p className="text-gray-600 mt-2">
              Welcome back to LeadTools
            </p>
          </div>

          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl">
            Upgrade Plan
          </button>

        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-gray-500">
              Total Websites
            </h3>

            <p className="text-4xl font-bold mt-2">
              12,450
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-gray-500">
              Emails Found
            </h3>

            <p className="text-4xl font-bold mt-2">
              48,920
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-gray-500">
              Exports
            </h3>

            <p className="text-4xl font-bold mt-2">
              350
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-gray-500">
              Accuracy
            </h3>

            <p className="text-4xl font-bold mt-2">
              98%
            </p>
          </div>

        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow p-6 mb-8">

          <h2 className="text-2xl font-bold mb-6">
            Recent Activity
          </h2>

          <table className="w-full">

            <thead>
              <tr className="border-b">
                <th className="text-left p-3">Website</th>
                <th className="text-left p-3">Email</th>
                <th className="text-left p-3">Status</th>
              </tr>
            </thead>

            <tbody>

              <tr className="border-b">
                <td className="p-3">google.com</td>
                <td className="p-3">info@google.com</td>
                <td className="p-3 text-green-600">
                  Completed
                </td>
              </tr>

              <tr className="border-b">
                <td className="p-3">microsoft.com</td>
                <td className="p-3">info@microsoft.com</td>
                <td className="p-3 text-green-600">
                  Completed
                </td>
              </tr>

              <tr>
                <td className="p-3">openai.com</td>
                <td className="p-3">info@openai.com</td>
                <td className="p-3 text-green-600">
                  Completed
                </td>
              </tr>

            </tbody>

          </table>

        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">

          <a
            href="/website-extractor"
            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg"
          >
            <h3 className="text-xl font-bold">
              New Extraction
            </h3>

            <p className="text-gray-600 mt-2">
              Start extracting emails now.
            </p>
          </a>

          <a
            href="/billing"
            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg"
          >
            <h3 className="text-xl font-bold">
              Manage Billing
            </h3>

            <p className="text-gray-600 mt-2">
              Upgrade or change your plan.
            </p>
          </a>

          <a
            href="/contact"
            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg"
          >
            <h3 className="text-xl font-bold">
              Contact Support
            </h3>

            <p className="text-gray-600 mt-2">
              Need help? Contact our team.
            </p>
          </a>

        </div>

      </section>

    </main>
  );
}