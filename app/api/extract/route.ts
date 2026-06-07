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

        for (const path of Array.from(pagesToCheck)) {
          try {
            const url = `${baseUrl}${path}`;

            if (visited.has(url)) continue;
            visited.add(url);

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
              /(?:\+\d{1,3}[\s-]?)?(?:\(?\d{2,4}\)?[\s-]?)?\d{3,4}[\s-]?\d{3,4}/g;

            const foundEmails =
              data.match(emailRegex) || [];

            const foundPhones =
              data.match(phoneRegex) || [];

            foundEmails.forEach((email: string) => {
              emails.add(email.toLowerCase());
            });

            foundPhones.forEach((phone: string) => {
              const cleaned = phone.replace(
                /[^\d+]/g,
                ""
              );

              if (
                cleaned.length >= 8 &&
                cleaned.length <= 15 &&
                !cleaned.startsWith("2026") &&
                !cleaned.startsWith("2025") &&
                !cleaned.startsWith("2024")
              ) {
                phones.add(phone.trim());
              }
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
                pagesToCheck.size < 20
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

          email:
            Array.from(emails).join(" | ") ||
            "",

          phone:
            Array.from(phones).join(" | ") ||
            "",

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
          email: "",
          phone: "",
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