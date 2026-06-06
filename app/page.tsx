export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <nav className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-600">
            LeadTools
          </h1>

          <div className="flex gap-6 font-medium">
            <a href="/" className="hover:text-blue-600">Home</a>
            <a href="/website-extractor" className="hover:text-blue-600">Extractor</a>
            <a href="/pricing" className="hover:text-blue-600">Pricing</a>
            <a href="/contact" className="hover:text-blue-600">Contact</a>
            <a href="/login" className="hover:text-blue-600">Login</a>
            <a href="/register" className="hover:text-blue-600">Register</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h1 className="text-6xl font-bold mb-6">
          Bulk Website Email Extractor
        </h1>

        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Extract publicly available business emails and generate
          targeted leads in minutes.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <a
            href="/register"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold"
          >
            Start Free Trial
          </a>

          <a
            href="/pricing"
            className="border border-gray-300 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold"
          >
            View Pricing
          </a>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">
          Powerful Lead Generation Tools
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <a
            href="/website-extractor"
            className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition block"
          >
            <h3 className="text-2xl font-bold mb-4">
              Website Extractor
            </h3>

            <p className="text-gray-600">
              Extract contact information from thousands of websites.
            </p>
          </a>

          <div className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition">
            <h3 className="text-2xl font-bold mb-4">
              Email Finder
            </h3>

            <p className="text-gray-600">
              Discover publicly available business emails instantly.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition">
            <h3 className="text-2xl font-bold mb-4">
              Lead Generator
            </h3>

            <p className="text-gray-600">
              Build targeted prospect lists in minutes.
            </p>
          </div>

        </div>
      </section>

      {/* Stats */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-6 text-center">

          <div className="bg-white p-8 rounded-2xl shadow">
            <h3 className="text-4xl font-bold text-blue-600">
              25K+
            </h3>
            <p className="text-gray-600 mt-2">
              Customers
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow">
            <h3 className="text-4xl font-bold text-blue-600">
              10M+
            </h3>
            <p className="text-gray-600 mt-2">
              Emails Found
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow">
            <h3 className="text-4xl font-bold text-blue-600">
              500K+
            </h3>
            <p className="text-gray-600 mt-2">
              Websites Scanned
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow">
            <h3 className="text-4xl font-bold text-blue-600">
              99%
            </h3>
            <p className="text-gray-600 mt-2">
              Accuracy
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 text-white py-20 text-center">
        <h2 className="text-4xl font-bold">
          Ready to Generate More Leads?
        </h2>

        <p className="mt-4 text-lg">
          Start extracting business emails today.
        </p>

        <a
          href="/register"
          className="inline-block mt-8 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold"
        >
          Create Free Account
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 text-center">
        <h3 className="text-3xl font-bold">
          LeadTools
        </h3>

        <p className="mt-4 text-gray-400">
          Bulk Website Email Extraction & Lead Generation
        </p>

        <p className="mt-6 text-gray-500">
          © 2026 LeadTools. All Rights Reserved.
        </p>
      </footer>

    </main>
  );
}