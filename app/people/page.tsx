"use client";

import { useState } from "react";

export default function PeoplePage() {
  const [search, setSearch] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedEmailStatus, setSelectedEmailStatus] = useState("");
  const [selectedJobTitle, setSelectedJobTitle] = useState("");

  const clearAll = () => {
    setSearch("");
    setSelectedLocation("");
    setSelectedEmailStatus("");
    setSelectedJobTitle("");
  };

  const saveSearch = () => {
    localStorage.setItem(
      "savedSearch",
      JSON.stringify({
        search,
        selectedLocation,
        selectedEmailStatus,
        selectedJobTitle,
      })
    );

    alert("Search Saved Successfully");
  };

  const people = [
    {
      name: "John Smith",
      title: "Founder",
      location: "United States",
      email: "john@example.com",
      status: "Verified",
    },
    {
      name: "Sarah Johnson",
      title: "Marketing Director",
      location: "Canada",
      email: "sarah@example.com",
      status: "Verified",
    },
    {
      name: "Michael Brown",
      title: "Sales Manager",
      location: "United States",
      email: "michael@example.com",
      status: "Unverified",
    },
  ];

  const filteredPeople = people.filter((person) => {
    return (
      (search === "" ||
        person.name.toLowerCase().includes(search.toLowerCase())) &&
      (selectedLocation === "" ||
        person.location === selectedLocation) &&
      (selectedEmailStatus === "" ||
        person.status === selectedEmailStatus) &&
      (selectedJobTitle === "" ||
        person.title === selectedJobTitle)
    );
  });

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}

      <div className="w-80 bg-white border-r p-4">
        <h2 className="font-semibold text-lg mb-4">
          Find People
        </h2>

        <div className="space-y-3">
          <div className="border rounded p-3 cursor-pointer hover:bg-gray-50">
            Job Titles
          </div>

          <div className="border rounded p-3 cursor-pointer hover:bg-gray-50">
            People Lookalikes
          </div>

          <div className="border rounded p-3 cursor-pointer hover:bg-gray-50">
            Company
          </div>

          <div className="border rounded p-3 cursor-pointer hover:bg-gray-50">
            Location
          </div>

          <div className="border rounded p-3 cursor-pointer hover:bg-gray-50">
            Industry & Keywords
          </div>

          <div className="pt-4 flex gap-2">
            <button
              onClick={clearAll}
              className="px-4 py-2 border rounded"
            >
              Clear All
            </button>

            <button className="px-4 py-2 bg-blue-600 text-white rounded">
              View 60+ Filters
            </button>
          </div>
        </div>
      </div>

      {/* Main */}

      <div className="flex-1 p-6 overflow-auto">
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Search people..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded px-4 py-2 w-96"
          />

          <button
            onClick={saveSearch}
            className="border px-4 py-2 rounded"
          >
            Save Search
          </button>
        </div>

        <div className="mb-6 text-sm text-gray-600">
          <strong>Selected:</strong>{" "}
          {selectedLocation || "No Location"} |{" "}
          {selectedEmailStatus || "No Email Status"} |{" "}
          {selectedJobTitle || "No Job Title"}
        </div>

        <div className="bg-white border rounded-xl p-6">
          <h3 className="font-semibold text-lg mb-6">
            Quick Filters
          </h3>

          {/* Locations */}

          <div className="mb-6">
            <p className="font-medium mb-2">
              Locations
            </p>

            <div className="flex gap-2">
              <button
                onClick={() =>
                  setSelectedLocation("United States")
                }
                className={`px-3 py-1 rounded-full border ${
                  selectedLocation === "United States"
                    ? "bg-blue-600 text-white"
                    : ""
                }`}
              >
                United States
              </button>

              <button
                onClick={() => setSelectedLocation("Canada")}
                className={`px-3 py-1 rounded-full border ${
                  selectedLocation === "Canada"
                    ? "bg-blue-600 text-white"
                    : ""
                }`}
              >
                Canada
              </button>
            </div>
          </div>

          {/* Email Status */}

          <div className="mb-6">
            <p className="font-medium mb-2">
              Email Status
            </p>

            <div className="flex gap-2">
              <button
                onClick={() =>
                  setSelectedEmailStatus("Verified")
                }
                className={`px-3 py-1 rounded-full border ${
                  selectedEmailStatus === "Verified"
                    ? "bg-green-600 text-white"
                    : ""
                }`}
              >
                Verified
              </button>

              <button
                onClick={() =>
                  setSelectedEmailStatus("Unverified")
                }
                className={`px-3 py-1 rounded-full border ${
                  selectedEmailStatus === "Unverified"
                    ? "bg-green-600 text-white"
                    : ""
                }`}
              >
                Unverified
              </button>

              <button
                onClick={() =>
                  setSelectedEmailStatus("Unavailable")
                }
                className={`px-3 py-1 rounded-full border ${
                  selectedEmailStatus === "Unavailable"
                    ? "bg-green-600 text-white"
                    : ""
                }`}
              >
                Unavailable
              </button>
            </div>
          </div>

          {/* Job Titles */}

          <div className="mb-6">
            <p className="font-medium mb-2">
              Job Titles
            </p>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() =>
                  setSelectedJobTitle("Founder")
                }
                className={`px-3 py-1 rounded-full border ${
                  selectedJobTitle === "Founder"
                    ? "bg-purple-600 text-white"
                    : ""
                }`}
              >
                Founder
              </button>

              <button
                onClick={() =>
                  setSelectedJobTitle("Sales Manager")
                }
                className={`px-3 py-1 rounded-full border ${
                  selectedJobTitle === "Sales Manager"
                    ? "bg-purple-600 text-white"
                    : ""
                }`}
              >
                Sales Manager
              </button>

              <button
                onClick={() =>
                  setSelectedJobTitle(
                    "Marketing Director"
                  )
                }
                className={`px-3 py-1 rounded-full border ${
                  selectedJobTitle ===
                  "Marketing Director"
                    ? "bg-purple-600 text-white"
                    : ""
                }`}
              >
                Marketing Director
              </button>
            </div>
          </div>
        </div>

        {/* Results */}

        <div className="mt-6 bg-white border rounded-xl p-6">
          <h3 className="font-semibold text-lg mb-4">
            Results ({filteredPeople.length})
          </h3>

          <div className="space-y-3">
            {filteredPeople.map((person, index) => (
              <div
                key={index}
                className="border rounded p-4"
              >
                <h4 className="font-semibold">
                  {person.name}
                </h4>

                <p>{person.title}</p>

                <p>{person.location}</p>

                <p>{person.email}</p>

                <p>{person.status}</p>
              </div>
            ))}

            {filteredPeople.length === 0 && (
              <p className="text-gray-500">
                No matching people found.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}