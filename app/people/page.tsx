export default function PeoplePage() {
  return (
    <div className="flex h-screen bg-gray-50">
      
      {/* Filters Sidebar */}
      <div className="w-80 bg-white border-r p-4">
        <h2 className="font-semibold text-lg mb-4">
          Find People
        </h2>

        <div className="space-y-3">

          <div className="border rounded p-3 cursor-pointer">
            Job Titles
          </div>

          <div className="border rounded p-3 cursor-pointer">
            People Lookalikes
          </div>

          <div className="border rounded p-3 cursor-pointer">
            Company
          </div>

          <div className="border rounded p-3 cursor-pointer">
            Location
          </div>

          <div className="border rounded p-3 cursor-pointer">
            Industry & Keywords
          </div>

          <div className="pt-4 flex gap-2">
            <button className="px-4 py-2 border rounded">
              Clear All
            </button>

            <button className="px-4 py-2 bg-blue-600 text-white rounded">
              View 60+ Filters
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}

      <div className="flex-1 p-6">

        <div className="flex gap-4 mb-6">

          <input
            type="text"
            placeholder="Search people..."
            className="border rounded px-4 py-2 w-96"
          />

          <button className="border px-4 py-2 rounded">
            Save Search
          </button>

        </div>

        <div className="bg-white border rounded-xl p-6">

          <h3 className="font-semibold text-lg mb-6">
            Quick Filters
          </h3>

          <div className="mb-6">
            <p className="font-medium mb-2">
              Locations
            </p>

            <div className="flex gap-2">
              <span className="border px-3 py-1 rounded-full">
                United States
              </span>

              <span className="border px-3 py-1 rounded-full">
                Canada
              </span>
            </div>
          </div>

          <div className="mb-6">
            <p className="font-medium mb-2">
              Email Status
            </p>

            <div className="flex gap-2">
              <span className="border px-3 py-1 rounded-full">
                Verified
              </span>

              <span className="border px-3 py-1 rounded-full">
                Unverified
              </span>

              <span className="border px-3 py-1 rounded-full">
                Unavailable
              </span>
            </div>
          </div>

          <div>
            <p className="font-medium mb-2">
              Job Titles
            </p>

            <div className="flex flex-wrap gap-2">
              <span className="border px-3 py-1 rounded-full">
                Founder
              </span>

              <span className="border px-3 py-1 rounded-full">
                Sales Manager
              </span>

              <span className="border px-3 py-1 rounded-full">
                Marketing Director
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}