import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { keyword, location, limit = 50 } = await req.json();

    const serperApiKey = process.env.SERPER_API_KEY;

    if (!serperApiKey) {
      return NextResponse.json({
        success: false,
        error: "Missing SERPER_API_KEY",
      });
    }

    // ==========================================
    // STEP 1: SEARCH COMPANIES USING SERPER
    // ==========================================
    const searchQuery = `${keyword} ${location}`;

    const serperRes = await fetch("https://google.serper.dev/search", {
      method: "POST",
      headers: {
        "X-API-KEY": serperApiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: searchQuery,
        num: limit,
      }),
    });

    const serperData = await serperRes.json();

    console.log("SERPER RESPONSE:", serperData);

    const organic = serperData?.organic || [];

    const companies = organic.map((item: any) => ({
      company: item.title || "",
      website: item.link || "",
    }));

    const websites = companies
      .map((c: any) => c.website)
      .filter(Boolean);

    // ==========================================
    // STEP 2: EXTRACT EMAILS
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
    // STEP 3: FINAL RESULTS
    // ==========================================
    const finalResults = companies.map(
      (company: any, index: number) => ({
        company: company.company,
        website: company.website,
        email:
          extracted[index]?.emails?.[0] ||
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