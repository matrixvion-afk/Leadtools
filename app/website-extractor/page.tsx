export default function WebsiteExtractor() {
  return (
    <main className="min-h-screen bg-gray-50">

      {/* Pricing */}
      <section
        id="pricing"
        className="max-w-7xl mx-auto px-6 py-24"
      >
        <h2 className="text-5xl font-bold text-center">
          Pricing Plans
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mt-16">

          <div className="border rounded-2xl p-8">
            <h3 className="text-2xl font-bold">Starter</h3>

            <div className="text-5xl font-bold mt-4">
              Free
            </div>

            <p className="mt-2 text-gray-600">
              100 searches/day
            </p>

            <a
              href="/website-extractor"
              className="block w-full mt-8 bg-gray-900 text-white py-3 rounded-xl text-center"
            >
              Get Started Free
            </a>
          </div>

          <div className="bg-blue-600 text-white rounded-2xl p-8 scale-105">
            <h3 className="text-2xl font-bold">
              Professional
            </h3>

            <div className="text-5xl font-bold mt-4">
              Free
            </div>

            <p className="mt-2">
              5,000 searches/day
            </p>

            <a
              href="/website-extractor"
              className="block w-full mt-8 bg-white text-blue-600 py-3 rounded-xl text-center font-bold"
            >
              Start Free
            </a>
          </div>

          <div className="border rounded-2xl p-8">
            <h3 className="text-2xl font-bold">
              Enterprise
            </h3>

            <div className="text-5xl font-bold mt-4">
              Free
            </div>

            <p className="mt-2 text-gray-600">
              Unlimited searches
            </p>

            <a
              href="/website-extractor"
              className="block w-full mt-8 bg-blue-600 text-white py-3 rounded-xl text-center"
            >
              Start Free
            </a>
          </div>

        </div>
      </section>

    </main>
  );
}