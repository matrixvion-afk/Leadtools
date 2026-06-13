export default function LeadFinderPage() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Lead Finder</h1>

      <input
        type="text"
        placeholder="Food Wholesalers USA"
        style={{
          width: "400px",
          padding: "10px",
          border: "1px solid #ccc",
        }}
      />

      <button
        style={{
          marginLeft: "10px",
          padding: "10px 20px",
        }}
      >
        Search
      </button>
    </div>
  );
}