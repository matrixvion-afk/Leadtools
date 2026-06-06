export default function Contact() {
  return (
    <main className="min-h-screen bg-gray-50">

      <div className="max-w-4xl mx-auto px-6 py-20">

        <h1 className="text-5xl font-bold mb-4">
          Contact Us
        </h1>

        <p className="text-gray-600 mb-10">
          Have questions about LeadTools? Send us a message.
        </p>

        <div className="bg-white p-8 rounded-2xl shadow-lg">

          <div className="grid md:grid-cols-2 gap-6">

            <input
              type="text"
              placeholder="Full Name"
              className="border rounded-xl p-4"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="border rounded-xl p-4"
            />

          </div>

          <input
            type="text"
            placeholder="Subject"
            className="border rounded-xl p-4 w-full mt-6"
          />

          <textarea
            placeholder="Your Message"
            className="border rounded-xl p-4 w-full mt-6 h-40"
          />

          <button
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold"
          >
            Send Message
          </button>

        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-10">

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold text-xl">
              Email
            </h3>
            <p className="text-gray-600 mt-2">
              support@leadtools.com
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold text-xl">
              Phone
            </h3>
            <p className="text-gray-600 mt-2">
              +1 (555) 123-4567
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold text-xl">
              Location
            </h3>
            <p className="text-gray-600 mt-2">
              New York, USA
            </p>
          </div>

        </div>

      </div>

    </main>
  );
}