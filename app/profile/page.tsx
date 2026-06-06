export default function Profile() {
  return (
    <main className="min-h-screen bg-gray-100">

      <div className="max-w-4xl mx-auto p-8">

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">
            My Profile
          </h1>

          <a
            href="/dashboard"
            className="bg-blue-600 text-white px-5 py-3 rounded-xl"
          >
            Back to Dashboard
          </a>
        </div>

        <div className="bg-white rounded-2xl shadow p-8">

          <div className="flex items-center gap-6 mb-8">

            <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold">
              JD
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                John Doe
              </h2>

              <p className="text-gray-600">
                john@example.com
              </p>

              <p className="text-green-600 font-medium mt-1">
                Pro Plan
              </p>
            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="block font-medium mb-2">
                Full Name
              </label>

              <input
                type="text"
                defaultValue="John Doe"
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                Email Address
              </label>

              <input
                type="email"
                defaultValue="john@example.com"
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                Company
              </label>

              <input
                type="text"
                defaultValue="LeadTools Inc."
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                Phone
              </label>

              <input
                type="text"
                defaultValue="+1 234 567 890"
                className="w-full border rounded-lg p-3"
              />
            </div>

          </div>

          <button className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-xl">
            Save Changes
          </button>

        </div>

        <div className="bg-white rounded-2xl shadow p-8 mt-8">

          <h2 className="text-2xl font-bold mb-6">
            Account Statistics
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="border rounded-xl p-6">
              <h3 className="text-gray-500">
                Websites Processed
              </h3>

              <p className="text-3xl font-bold mt-2">
                12,450
              </p>
            </div>

            <div className="border rounded-xl p-6">
              <h3 className="text-gray-500">
                Emails Found
              </h3>

              <p className="text-3xl font-bold mt-2">
                48,920
              </p>
            </div>

            <div className="border rounded-xl p-6">
              <h3 className="text-gray-500">
                Exports
              </h3>

              <p className="text-3xl font-bold mt-2">
                350
              </p>
            </div>

          </div>

        </div>

      </div>

    </main>
  );
}