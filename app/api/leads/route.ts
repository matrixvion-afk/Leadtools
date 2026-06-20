import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { keyword, location } = await req.json();

    const serperApiKey = process.env.SERPER_API_KEY;

    if (!serperApiKey) {
      return NextResponse.json({
        success: false,
        error: "Missing SERPER_API_KEY",
      });
    }

    const blockedDomains = [
      "yelp.com",
      "indeed.com",
      "glassdoor.com",
      "wikipedia.org",
      "eater.com",
    ];

    const searches = [
      `${keyword} wholesalers ${location}`,
      `${keyword} suppliers ${location}`,
      `${keyword} distributors ${location}`,
      `${keyword} manufacturers ${location}`,
      `${keyword} exporters ${location}`,
      `${keyword} importers ${location}`,
      `${keyword} companies ${location}`,
    ];

    let allCompanies: any[] = [];
    const seenWebsites = new Set<string>();

    // ==========================================
    // SEARCH COMPANIES
    // ==========================================
    for (const searchQuery of searches) {
      try {
        const serperRes = await fetch(
          "https://google.serper.dev/search",
          {
            method: "POST",
            headers: {
              "X-API-KEY": serperApiKey,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              q: searchQuery,
              num: 100,
            }),
          }
        );

        const serperData = await serperRes.json();

        const organic = serperData?.organic || [];

        for (const item of organic) {
          const website = item.link || "";

          if (!website) continue;

          const isBlocked = blockedDomains.some((domain) =>
            website.toLowerCase().includes(domain)
          );

          if (isBlocked) continue;

          if (seenWebsites.has(website)) continue;

          seenWebsites.add(website);

          allCompanies.push({
            company: item.title || "",
            website,
          });
        }
      } catch (err) {
        console.error("Search failed:", searchQuery, err);
      }
    }

    const websites = allCompanies
      .map((c) => c.website)
      .filter(Boolean);

    // ==========================================
    // EMAIL EXTRACTION
    // ==========================================
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
        body: JSON.stringify({
          websites,
        }),
      }
    );

    const extracted = await extractRes.json();

    // ==========================================
    // FINAL RESULTS
    // ==========================================
    const finalResults = allCompanies.map(
      (company: any, index: number) => ({
        company: company.company,
        website: company.website,
        email:
          extracted[index]?.emails?.join(" | ") ||
          "No email found",
      })
    );

    return NextResponse.json({
      success: true,
      count: finalResults.length,
      results: finalResults,
    });
  } catch (err: any) {
    console.error(err);

    return NextResponse.json({
      success: false,
      error: "Lead generation failed",
      details: err?.message || "Unknown error",
    });
  }
}