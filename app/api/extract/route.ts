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
          "/privacy",
        ];

        const allEmails = new Set<string>();
        const allPhones = new Set<string>();

        let facebook = "";
        let linkedin = "";
        let instagram = "";
        let twitter = "";

        for (const page of pagesToCheck) {
          try {
            const pageUrl = `${baseUrl}${page}`;

            const { data } = await axios.get(pageUrl, {
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

            const emails = data.match(emailRegex) || [];
            const phones = data.match(phoneRegex) || [];

            emails.forEach((e) =>
              allEmails.add(e.toLowerCase())
            );

            phones.forEach((p) =>
              allPhones.add(p.trim())
            );

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

              if (
                href.startsWith("mailto:")
              ) {
                const email = href
                  .replace("mailto:", "")
                  .trim();

                if (email) {
                  allEmails.add(
                    email.toLowerCase()
                  );
                }
              }
            });
          } catch {
            continue;
          }
        }

        results.push({
          website,
          emails: Array.from(allEmails),
          phones: Array.from(allPhones),
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