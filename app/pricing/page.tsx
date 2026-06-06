export default function Pricing() {
  return (
    <main className="min-h-screen bg-gray-50">

      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="text-center">
          <h1 className="text-5xl font-bold">
            Pricing Plans
          </h1>

          <p className="mt-4 text-gray-600">
            Choose the plan that fits your business.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 mt-16">

          {/* Starter */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold">
              Starter
            </h2>

            <div className="text-5xl font-bold mt-6">
              Free
            </div>

            <p className="text-gray-500 mt-2">
              100 Searches / Day
            </p>

            <ul className="mt-8 space-y-4">
              <li>✓ Email Extraction</li>
              <li>✓ CSV Export</li>
              <li>✓ Dashboard Access</li>
              <li>✓ Basic Support</li>
            </ul>

            <button className="w-full mt-8 bg-gray-900 text-white py-3 rounded-xl">
              Get Started
            </button>
          </div>

          {/* Professional */}
          <div className="bg-blue-600 text-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold">
              Professional
            </h2>

            <div className="text-5xl font-bold mt-6">
              $99
            </div>

            <p className="mt-2">
              5,000 Searches / Day
            </p>

            <ul className="mt-8 space-y-4">
              <li>✓ Bulk Extraction</li>
              <li>✓ CSV Export</li>
              <li>✓ API Access</li>
              <li>✓ Priority Support</li>
            </ul>

            <button className="w-full mt-8 bg-white text-blue-600 py-3 rounded-xl font-bold">
              Choose Plan
            </button>
          </div>

          {/* Business */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold">
              Business
            </h2>

            <div className="text-5xl font-bold mt-6">
              $499
            </div>

            <p className="text-gray-500 mt-2">
              20,000 Searches / Day
            </p>

            <ul className="mt-8 space-y-4">
              <li>✓ Team Access</li>
              <li>✓ Advanced Filters</li>
              <li>✓ API Access</li>
              <li>✓ Priority Support</li>
            </ul>

            <button className="w-full mt-8 bg-blue-600 text-white py-3 rounded-xl">
              Choose Plan
            </button>
          </div>

          {/* Enterprise */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-blue-600">
            <h2 className="text-2xl font-bold">
              Enterprise
            </h2>

            <div className="text-5xl font-bold mt-6">
              $2,000
            </div>

            <p className="text-gray-500 mt-2">
              50,000 Searches / Day
            </p>

            <ul className="mt-8 space-y-4">
              <li>✓ Unlimited Team Members</li>
              <li>✓ Dedicated Infrastructure</li>
              <li>✓ API Access</li>
              <li>✓ Premium Support</li>
              <li>✓ Custom Integrations</li>
            </ul>

            <button className="w-full mt-8 bg-gray-900 text-white py-3 rounded-xl">
              Contact Sales
            </button>
          </div>

        </div>

      </div>

    </main>
  );
}