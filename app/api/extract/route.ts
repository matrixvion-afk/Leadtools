import { NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";

export async function POST(req: Request) {
  try {
    const { websites } = await req.json();

    const results = [];

    for (const website of websites) {
      try {
        const url = website.startsWith("http")
          ? website
          : `https://${website}`;

        const { data } = await axios.get(url, {
          timeout: 10000,
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
          },
        });

        const $ = cheerio.load(data);

        const emailRegex =
          /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;

        const emails = data.match(emailRegex) || [];

        let facebook = "";
        let linkedin = "";
        let instagram = "";
        let twitter = "";

        $("a").each((_, el) => {
          const href = $(el).attr("href") || "";

          if (
            href.includes("facebook.com") &&
            !facebook
          ) {
            facebook = href;
          }

          if (
            href.includes("linkedin.com") &&
            !linkedin
          ) {
            linkedin = href;
          }

          if (
            href.includes("instagram.com") &&
            !instagram
          ) {
            instagram = href;
          }

          if (
            (href.includes("twitter.com") ||
              href.includes("x.com")) &&
            !twitter
          ) {
            twitter = href;
          }
        });

        results.push({
          website,
          email: emails[0] || "",
          facebook,
          linkedin,
          instagram,
          twitter,
        });
      } catch (error) {
        results.push({
          website,
          email: "",
          facebook: "",
          linkedin: "",
          instagram: "",
          twitter: "",
        });
      }
    }

    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Extraction failed",
      },
      {
        status: 500,
      }
    );
  }
}