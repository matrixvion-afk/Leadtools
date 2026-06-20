import { NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";

export async function POST(req: Request) {
  try {
    const { websites } = await req.json();

    if (!Array.isArray(websites)) {
      return NextResponse.json([]);
    }

    const normalizeWebsite = (website: string) =>
      website.startsWith("http")
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

    const emailRegex =
      /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;

    const results = await Promise.all(
      websites.map(async (website: string) => {
        const baseUrl = normalizeWebsite(website);

        const emails = new Set<string>();

        const visited = new Set<string>();

        for (const path of pagesToCheck) {
          try {
            const url = `${baseUrl}${path}`;

            if (visited.has(url)) continue;
            visited.add(url);

            const response = await axios.get(url, {
              timeout: 10000,
              headers: {
                "User-Agent":
                  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/125 Safari/537.36",
              },
            });

            const data = response.data;

            const $ = cheerio.load(data);

            // EMAILS IN PAGE HTML
            const foundEmails =
              data.match(emailRegex) || [];

            foundEmails.forEach((email: string) => {
              emails.add(email.toLowerCase());
            });

            // MAILTO EMAILS
            $("a").each((_, el) => {
              const href = $(el).attr("href") || "";

              if (href.startsWith("mailto:")) {
                emails.add(
                  href
                    .replace("mailto:", "")
                    .trim()
                    .toLowerCase()
                );
              }
            });
          } catch (error) {
            console.log(
              `FAILED: ${website}`,
              error
            );
            continue;
          }
        }

        const cleanEmails = Array.from(emails);

        console.log("WEBSITE:", website);
        console.log("EMAILS FOUND:", cleanEmails);

        return {
          website,
          email:
            cleanEmails.join(" | ") ||
            "No email found",
          emails: cleanEmails,
        };
      })
    );

    return NextResponse.json(results);
  } catch (err) {
    console.error(err);

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