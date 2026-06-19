import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { keyword, location, limit } = await req.json();

    const searchQuery = `${keyword} in ${location}`;

    const apiKey = process.env.GOOGLE_PLACES_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        success: false,
        error: "Missing API key",
      });
    }

    // =====================================================
    // STEP 1: GOOGLE PLACES SEARCH (PAGINATION)
    // =====================================================
    let allPlaces: any[] = [];
    let nextPageToken: string | undefined;

    for (let i = 0; i < 3; i++) {
      let url =
        `https://maps.googleapis.com/maps/api/place/textsearch/json` +
        `?query=${encodeURIComponent(searchQuery)}&key=${apiKey}`;

      if (nextPageToken) {
        url += `&pagetoken=${nextPageToken}`;
        await new Promise((r) => setTimeout(r, 2000));
      }

      const res = await fetch(url);
      const data = await res.json();

      console.log("GOOGLE STATUS:", data.status);
      console.log("GOOGLE RESULTS:", data.results?.length);
      console.log("GOOGLE FULL:", JSON.stringify(data));
      console.log("GOOGLE RESPONSE:", data);

      allPlaces = [...allPlaces, ...(data.results || [])];

      nextPageToken = data.next_page_token;

      if (!nextPageToken) break;
    }

    const places = allPlaces.slice(0, limit || 20);

    // =====================================================
    // STEP 2: GET WEBSITE
    // =====================================================
    const enrichedPlaces = await Promise.all(
      places.map(async (place: any) => {
        try {
          if (!place.place_id) {
            return { ...place, website: "" };
          }

          const detailsUrl =
            `https://maps.googleapis.com/maps/api/place/details/json` +
            `?place_id=${place.place_id}&fields=website&key=${apiKey}`;

          const res = await fetch(detailsUrl);
          const data = await res.json();

          return {
            ...place,
            website: data.result?.website || "",
          };
        } catch {
          return {
            ...place,
            website: "",
          };
        }
      })
    );

    const websites = enrichedPlaces
      .map((p: any) => p.website)
      .filter(Boolean);

    // =====================================================
    // STEP 3: CALL EMAIL EXTRACTOR
    // =====================================================
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      "http://localhost:3000";

    const extractRes = await fetch(
      `${baseUrl}/api/extract-emails`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ websites }),
      }
    );

    const extracted = await extractRes.json();

    // =====================================================
    // STEP 4: COMBINE RESULTS
    // =====================================================
    const finalResults = enrichedPlaces.map(
      (p: any, i: number) => ({
        company: p.name || "",
        address: p.formatted_address || "",
        rating: p.rating || null,
        website: p.website || "",
        emails: extracted[i]?.emails || [],
        phones: extracted[i]?.phones || [],
        facebook: extracted[i]?.facebook || "",
        linkedin: extracted[i]?.linkedin || "",
        instagram: extracted[i]?.instagram || "",
      })
    );

    return NextResponse.json({
      success: true,
      count: finalResults.length,
      results: finalResults,
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: "Lead generation failed",
      details: err?.message || "Unknown error",
    });
  }
}