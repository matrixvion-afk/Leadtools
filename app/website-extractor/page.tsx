export default function Home() {
  return (
    <main className="min-h-screen bg-white">

      {/* Navbar */}
      <nav className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

          <h1 className="text-3xl font-bold text-blue-600">
            LeadTools
          </h1>

          <div className="hidden md:flex gap-8 font-medium">
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#testimonials">Reviews</a>
            <a href="#faq">FAQ</a>
          </div>

          <a
            href="/website-extractor"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
          >
            Start Free Trial
          </a>

        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100">

        <div className="max-w-7xl mx-auto px-6 py-24 text-center">

          <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            #1 Lead Generation Platform
          </div>

          <h1 className="text-6xl font-bold leading-tight">
            Bulk Website
            <span className="text-blue-600"> Email Extractor</span>
          </h1>

          <p className="max-w-3xl mx-auto text-xl text-gray-600 mt-8">
            Extract publicly available business contact information
            from thousands of websites and generate targeted leads
            faster than ever.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">

            <a
              href="/website-extractor"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold"
            >
              Start Free Trial
            </a>

            <button className="border border-gray-300 px-8 py-4 rounded-xl font-semibold">
              Watch Demo
            </button>

          </div>

          {/* Dashboard Preview */}
          <div className="max-w-5xl mx-auto mt-20 bg-white rounded-3xl shadow-2xl border p-8">

            <div className="grid md:grid-cols-3 gap-4">

              <div className="bg-blue-50 rounded-xl p-5">
                <h3 className="text-3xl font-bold">12,450</h3>
                <p className="text-gray-600">Emails Found</p>
              </div>

              <div className="bg-green-50 rounded-xl p-5">
                <h3 className="text-3xl font-bold">3,220</h3>
                <p className="text-gray-600">Websites Scanned</p>
              </div>

              <div className="bg-purple-50 rounded-xl p-5">
                <h3 className="text-3xl font-bold">98%</h3>
                <p className="text-gray-600">Accuracy</p>
              </div>

            </div>

            <div className="border rounded-xl mt-8 overflow-hidden">

              <table className="w-full">

                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left p-4">Website</th>
                    <th className="text-left p-4">Email</th>
                  </tr>
                </thead>

                <tbody>

                  <tr className="border-t">
                    <td className="p-4">company.com</td>
                    <td className="p-4">info@company.com</td>
                  </tr>

                  <tr className="border-t">
                    <td className="p-4">agency.com</td>
                    <td className="p-4">contact@agency.com</td>
                  </tr>

                  <tr className="border-t">
                    <td className="p-4">business.com</td>
                    <td className="p-4">sales@business.com</td>
                  </tr>

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </section>

      {/* Features */}
      <section
        id="features"
        className="max-w-7xl mx-auto px-6 py-24"
      >
        <h2 className="text-5xl font-bold text-center">
          Powerful Lead Generation Tools
        </h2>

        <p className="text-center text-gray-600 mt-4">
          Everything you need to build targeted prospect lists.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-16">

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-5xl mb-4">🌐</div>
            <h3 className="text-2xl font-bold">
              Website Extractor
            </h3>
            <p className="mt-4 text-gray-600">
              Extract contact information from thousands
              of websites automatically.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-5xl mb-4">📧</div>
            <h3 className="text-2xl font-bold">
              Email Finder
            </h3>
            <p className="mt-4 text-gray-600">
              Discover publicly available business
              email addresses instantly.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-5xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold">
              Lead Generator
            </h3>
            <p className="mt-4 text-gray-600">
              Build highly targeted lead lists
              in just a few clicks.
            </p>
          </div>

        </div>
      </section>

      {/* Stats */}
      <section className="bg-blue-600 text-white py-20">

        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8 text-center">

          <div>
            <h3 className="text-5xl font-bold">25K+</h3>
            <p className="mt-2">Customers</p>
          </div>

          <div>
            <h3 className="text-5xl font-bold">10M+</h3>
            <p className="mt-2">Emails Found</p>
          </div>

          <div>
            <h3 className="text-5xl font-bold">500K+</h3>
            <p className="mt-2">Websites Scanned</p>
          </div>

          <div>
            <h3 className="text-5xl font-bold">99%</h3>
            <p className="mt-2">Uptime</p>
          </div>

        </div>

      </section>

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
              $19
            </div>
            <p className="mt-2 text-gray-600">
              10,000 credits/month
            </p>
          </div>

          <div className="bg-blue-600 text-white rounded-2xl p-8 scale-105">
            <h3 className="text-2xl font-bold">
              Professional
            </h3>
            <div className="text-5xl font-bold mt-4">
              $49
            </div>
            <p className="mt-2">
              50,000 credits/month
            </p>
          </div>

          <div className="border rounded-2xl p-8">
            <h3 className="text-2xl font-bold">
              Enterprise
            </h3>
            <div className="text-5xl font-bold mt-4">
              $99
            </div>
            <p className="mt-2 text-gray-600">
              Unlimited credits
            </p>
          </div>

        </div>

      </section>

      {/* Testimonials */}
      <section
        id="testimonials"
        className="bg-gray-50 py-24"
      >

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-5xl font-bold text-center">
            What Customers Say
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-16">

            <div className="bg-white p-8 rounded-2xl shadow">
              ⭐⭐⭐⭐⭐
              <p className="mt-4">
                Amazing lead generation platform.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow">
              ⭐⭐⭐⭐⭐
              <p className="mt-4">
                Saved us hours of manual work.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow">
              ⭐⭐⭐⭐⭐
              <p className="mt-4">
                Great ROI and excellent results.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="max-w-5xl mx-auto px-6 py-24"
      >

        <h2 className="text-5xl font-bold text-center">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6 mt-12">

          <div className="border rounded-xl p-6">
            <h3 className="font-bold">
              How does it work?
            </h3>
            <p className="mt-2 text-gray-600">
              Enter websites and generate lead data.
            </p>
          </div>

          <div className="border rounded-xl p-6">
            <h3 className="font-bold">
              Is there a free trial?
            </h3>
            <p className="mt-2 text-gray-600">
              Yes, every account starts with free credits.
            </p>
          </div>

        </div>

      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">

        <div className="max-w-7xl mx-auto px-6 text-center">

          <h2 className="text-3xl font-bold">
            LeadTools
          </h2>

          <p className="mt-4 text-gray-400">
            Bulk Website Email Extraction & Lead Generation Platform
          </p>

          <p className="mt-6 text-gray-500">
            © 2026 LeadTools. All Rights Reserved.
          </p>

        </div>

      </footer>

    </main>
  );
}