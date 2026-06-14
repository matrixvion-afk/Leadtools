import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  return NextResponse.json({
    success: true,
    hasApiKey: !!apiKey,
    keyPreview: apiKey
      ? apiKey.substring(0, 8) + "..."
      : null,
  });
}