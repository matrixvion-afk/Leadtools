export default function Admin() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-5xl font-bold">
            Admin Panel
          </h1>

          <a
            href="/dashboard"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl"
          >
            Dashboard
          </a>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-gray-500">Users</h3>
            <p className="text-4xl font-bold mt-2">2,450</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-gray-500">Revenue</h3>
            <p className="text-4xl font-bold mt-2">$48,900</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-gray-500">Subscriptions</h3>
            <p className="text-4xl font-bold mt-2">1,320</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-gray-500">Emails Found</h3>
            <p className="text-4xl font-bold mt-2">980K</p>
          </div>

        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="text-2xl font-bold mb-6">
            Recent Users
          </h2>

          <table className="w-full">

            <thead>
              <tr className="border-b">
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3">Email</th>
                <th className="text-left p-3">Plan</th>
                <th className="text-left p-3">Status</th>
              </tr>
            </thead>

            <tbody>

              <tr className="border-b">
                <td className="p-3">John Smith</td>
                <td className="p-3">john@example.com</td>
                <td className="p-3">Pro</td>
                <td className="p-3 text-green-600">Active</td>
              </tr>

              <tr className="border-b">
                <td className="p-3">Sarah Wilson</td>
                <td className="p-3">sarah@example.com</td>
                <td className="p-3">Starter</td>
                <td className="p-3 text-green-600">Active</td>
              </tr>

              <tr>
                <td className="p-3">David Brown</td>
                <td className="p-3">david@example.com</td>
                <td className="p-3">Enterprise</td>
                <td className="p-3 text-green-600">Active</td>
              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </main>
  );
}