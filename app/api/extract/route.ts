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

        const emails = new Set<string>();
        const phones = new Set<string>();

        let facebook = "";
        let linkedin = "";
        let instagram = "";
        let twitter = "";

        const pagesToCheck = new Set<string>([
          "",
          "/contact",
          "/contact-us",
          "/about",
          "/about-us",
          "/team",
          "/company",
          "/support",
          "/privacy",
          "/privacy-policy",
          "/terms",
          "/terms-of-service",
        ]);

        const visited = new Set<string>();

        for (const initialPath of Array.from(pagesToCheck)) {
          try {
            const startUrl = `${baseUrl}${initialPath}`;

            if (visited.has(startUrl)) continue;

            visited.add(startUrl);

            const { data } = await axios.get(startUrl, {
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
              const href =
                $(el).attr("href") || "";

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

              if (
                href.startsWith("mailto:")
              ) {
                emails.add(
                  href
                    .replace("mailto:", "")
                    .trim()
                    .toLowerCase()
                );
              }

              if (
                href.startsWith("/") &&
                pagesToCheck.size < 15
              ) {
                const lower =
                  href.toLowerCase();

                if (
                  lower.includes("contact") ||
                  lower.includes("about") ||
                  lower.includes("team") ||
                  lower.includes("support") ||
                  lower.includes("privacy") ||
                  lower.includes("terms")
                ) {
                  pagesToCheck.add(href);
                }
              }
            });
          } catch {
            continue;
          }
        }

        results.push({
          website,
          emails: Array.from(emails),
          phones: Array.from(phones),
          facebook,
          linkedin,
          instagram,
          twitter,
        });
      } catch {
        results.push({
          website,
          emails: [],
          phones: [],
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
      {
        error: "Extraction failed",
      },
      {
        status: 500,
      }
    );
  }
}