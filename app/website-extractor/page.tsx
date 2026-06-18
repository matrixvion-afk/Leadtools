const handleExtract = async () => {
  try {
    setLoading(true);

    const sites = websites
      .split("\n")
      .map((site) => site.trim())
      .filter(Boolean);

    const response = await fetch("/api/extract-emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        websites: sites,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(error);
      throw new Error("Extraction failed");
    }

    const data = await response.json();
    setResults(data);
  } catch (error) {
    console.error(error);
    alert("Extraction failed");
  } finally {
    setLoading(false);
  }
};