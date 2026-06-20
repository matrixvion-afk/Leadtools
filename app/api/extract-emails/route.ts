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
      "/sales",
      "/wholesale",
      "/distributors",
      "/dealer",
      "/dealers",
      "/customer-service",
      "/help",
      "/faq",
      "/staff",
      "/management",
      "/leadership",
      "/privacy",
      "/terms",
      "/shipping",
      "/returns",
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

            // Search visible page text only
            const pageText = $("body").text();

            const foundEmails =
              pageText.match(emailRegex) || [];

            foundEmails.forEach((email: string) => {
              emails.add(email.trim().toLowerCase());
            });

            // Search mailto links
            $("a").each((_, el) => {
              const href = $(el).attr("href") || "";

              if (href.startsWith("mailto:")) {
                const email = href
                  .replace("mailto:", "")
                  .split("?")[0]
                  .trim()
                  .toLowerCase();

                if (email) {
                  emails.add(email);
                }
              }
            });
          } catch (error: any) {
            console.log(
              `FAILED: ${website} ${path}`,
              error?.message || error
            );
          }
        }

        const cleanEmails = Array.from(emails).filter(
          (email) =>
            email &&
            email.includes("@") &&
            email.length < 80 &&
            !email.endsWith(".png") &&
            !email.endsWith(".jpg") &&
            !email.endsWith(".jpeg") &&
            !email.endsWith(".svg") &&
            !email.endsWith(".webp") &&
            !email.includes("@2x") &&
            !email.includes("logo") &&
            !email.includes("brainbean") &&
            !email.endsWith("@brainbean.in") &&
            !email.includes("example.com") &&
            !email.includes("placeholder") &&
            !email.includes("noreply") &&
            !email.includes("no-reply") &&
            !email.includes(".js") &&
            !email.includes(".css") &&
            !email.includes("webpack") &&
            !email.includes("chunk") &&
            !email.includes("tracking") &&
            !email.includes("analytics") &&
            !email.includes("google") &&
            !email.includes("facebook") &&
            !email.includes("instagram") &&
            !email.includes("twitter")
        );

        const finalEmails = cleanEmails.filter(
          (email) =>
            email.startsWith("info@") ||
            email.startsWith("sales@") ||
            email.startsWith("contact@") ||
            email.startsWith("support@") ||
            email.startsWith("admin@") ||
            email.startsWith("orders@") ||
            email.startsWith("customerservice@")
        );

        console.log("WEBSITE:", website);
        console.log("EMAILS FOUND:", cleanEmails);

        return {
          website,
          email:
            (
              finalEmails.length > 0
                ? finalEmails
                : cleanEmails
            )
              .slice(0, 3)
              .join(" | ") || "No email found",

          emails:
            finalEmails.length > 0
              ? finalEmails
              : cleanEmails,
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