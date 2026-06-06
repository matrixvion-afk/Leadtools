export default function Billing() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-6xl mx-auto">

        <div className="mb-10">
          <h1 className="text-5xl font-bold">
            Billing & Plans
          </h1>

          <p className="text-gray-600 mt-3">
            Manage your subscription and credits.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {/* Starter */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold">
              Starter
            </h2>

            <p className="text-5xl font-bold mt-6">
              $19
            </p>

            <p className="text-gray-500">
              per month
            </p>

            <ul className="mt-8 space-y-3">
              <li>✓ 10,000 Credits</li>
              <li>✓ CSV Export</li>
              <li>✓ Email Support</li>
            </ul>

            <button className="w-full mt-8 bg-blue-600 text-white py-3 rounded-xl">
              Choose Plan
            </button>
          </div>

          {/* Pro */}
          <div className="bg-blue-600 text-white rounded-2xl shadow-xl p-8 scale-105">
            <h2 className="text-2xl font-bold">
              Professional
            </h2>

            <p className="text-5xl font-bold mt-6">
              $49
            </p>

            <p>
              per month
            </p>

            <ul className="mt-8 space-y-3">
              <li>✓ 50,000 Credits</li>
              <li>✓ API Access</li>
              <li>✓ Priority Support</li>
              <li>✓ Bulk Export</li>
            </ul>

            <button className="w-full mt-8 bg-white text-blue-600 py-3 rounded-xl font-bold">
              Current Plan
            </button>
          </div>

          {/* Enterprise */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold">
              Enterprise
            </h2>

            <p className="text-5xl font-bold mt-6">
              $99
            </p>

            <p className="text-gray-500">
              per month
            </p>

            <ul className="mt-8 space-y-3">
              <li>✓ Unlimited Credits</li>
              <li>✓ Dedicated Manager</li>
              <li>✓ API Access</li>
              <li>✓ Premium Support</li>
            </ul>

            <button className="w-full mt-8 bg-gray-900 text-white py-3 rounded-xl">
              Contact Sales
            </button>
          </div>

        </div>

        {/* Current Usage */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-10">

          <h2 className="text-2xl font-bold mb-6">
            Current Usage
          </h2>

          <div className="space-y-4">

            <div>
              <div className="flex justify-between mb-2">
                <span>Email Credits</span>
                <span>35,000 / 50,000</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-4">
                <div className="bg-blue-600 h-4 rounded-full w-[70%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span>API Requests</span>
                <span>7,500 / 10,000</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-4">
                <div className="bg-green-600 h-4 rounded-full w-[75%]"></div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </main>
  );
}