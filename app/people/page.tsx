export default function PeoplePage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">People</h1>

      <div className="mt-6">
        <input
          type="text"
          placeholder="Search people..."
          className="w-full border p-3 rounded"
        />
      </div>
    </div>
  );
}