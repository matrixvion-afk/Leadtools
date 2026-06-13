export default function CompaniesPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Companies</h1>

      <div className="mt-6">
        <input
          type="text"
          placeholder="Search companies..."
          className="w-full border p-3 rounded"
        />
      </div>
    </div>
  );
}