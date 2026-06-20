import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiKey = process.env.SERPER_API_KEY;

    const res = await fetch(
      "https://google.serper.dev/maps",
      {
        method: "POST",
        headers: {
          "X-API-KEY": apiKey || "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          q: "food wholesalers new york",
        }),
      }
    );

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
    });
  }
}