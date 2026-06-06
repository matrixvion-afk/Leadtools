export default function Settings() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-8">

        <h1 className="text-4xl font-bold mb-8">
          Account Settings
        </h1>

        <div className="space-y-6">

          <div>
            <label className="block font-semibold mb-2">
              Full Name
            </label>

            <input
              type="text"
              defaultValue="John Smith"
              className="w-full border rounded-xl p-4"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Email Address
            </label>

            <input
              type="email"
              defaultValue="john@example.com"
              className="w-full border rounded-xl p-4"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              New Password
            </label>

            <input
              type="password"
              placeholder="••••••••"
              className="w-full border rounded-xl p-4"
            />
          </div>

          <button className="bg-blue-600 text-white px-8 py-4 rounded-xl">
            Save Changes
          </button>

        </div>

      </div>

    </main>
  );
}