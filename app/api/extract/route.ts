import { NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";

export async function POST(req: Request) {
  try {
    const { websites } = await req.json();

    const results = [];

    for (const website of websites) {
      try {
        const baseUrl = website.startsWith("http")
          ? website
          : `https://${website}`;

        const pagesToCheck = [
          "",
          "/contact",
          "/contact-us",
          "/about",
          "/about-us",
          "/team",
          "/company",
          "/support",
        ];

        const emails = new Set<string>();
        const phones = new Set<string>();

        let facebook = "";
        let linkedin = "";
        let instagram = "";
        let twitter = "";

        for (const path of pagesToCheck) {
          try {
            const url = `${baseUrl}${path}`;

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

            const phoneRegex =
              /(\+?\d[\d\s().-]{7,}\d)/g;

            const foundEmails =
              data.match(emailRegex) || [];

            const foundPhones =
              data.match(phoneRegex) || [];

            foundEmails.forEach((e: string) => {
              emails.add(e.toLowerCase());
            });

            foundPhones.forEach((p: string) => {
              phones.add(p.trim());
            });

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

              if (href.startsWith("mailto:")) {
                emails.add(
                  href
                    .replace("mailto:", "")
                    .trim()
                    .toLowerCase()
                );
              }
            });
          } catch {
            continue;
          }
        }

        results.push({
          website,
          email: Array.from(emails)[0] || "",
          phone: Array.from(phones)[0] || "",
          facebook,
          linkedin,
          instagram,
          twitter,
        });
      } catch {
        results.push({
          website,
          email: "",
          phone: "",
          facebook: "",
          linkedin: "",
          instagram: "",
          twitter: "",
        });
      }
    }

    return NextResponse.json(results);
  } catch {
    return NextResponse.json(
      { error: "Extraction failed" },
      { status: 500 }
    );
  }
}