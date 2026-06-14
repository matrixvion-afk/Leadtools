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
      website.startsWith("http") ? website : `https://${website}`;

    const pagesToCheck = [
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
    ];

    const emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;

    const phoneRegex =
      /(?:\+\d{1,3}[\s-]?)?(?:\(?\d{2,4}\)?[\s-]?)?\d{3,4}[\s-]?\d{3,4}/g;

    // 🔥 PARALLEL PROCESSING (FAST)
    const results = await Promise.all(
      websites.map(async (website: string) => {
        const baseUrl = normalizeWebsite(website);

        const emails = new Set<string>();
        const phones = new Set<string>();

        let facebook = "";
        let linkedin = "";
        let instagram = "";
        let twitter = "";

        const visited = new Set<string>();

        for (const path of pagesToCheck) {
          try {
            const url = `${baseUrl}${path}`;

            if (visited.has(url)) continue;
            visited.add(url);

            const { data } = await axios.get(url, {
              timeout: 8000,
              headers: {
                "User-Agent":
                  "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
              },
            });

            const $ = cheerio.load(data);

            // EMAILS
            const foundEmails = data.match(emailRegex) || [];
            foundEmails.forEach((email: string) =>
              emails.add(email.toLowerCase())
            );

            // PHONES
            const foundPhones = data.match(phoneRegex) || [];
            foundPhones.forEach((phone: string) => {
              const cleaned = phone.replace(/[^\d+]/g, "");

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

            // SOCIAL LINKS
            $("a").each((_, el) => {
              const href = $(el).attr("href") || "";

              if (!facebook && href.includes("facebook.com")) {
                facebook = href;
              }
              if (!linkedin && href.includes("linkedin.com")) {
                linkedin = href;
              }
              if (!instagram && href.includes("instagram.com")) {
                instagram = href;
              }
              if (
                !twitter &&
                (href.includes("twitter.com") || href.includes("x.com"))
              ) {
                twitter = href;
              }

              if (href.startsWith("mailto:")) {
                emails.add(
                  href.replace("mailto:", "").trim().toLowerCase()
                );
              }
            });

            // AUTO DISCOVER MORE PAGES
            $("a").each((_, el) => {
              const href = $(el).attr("href") || "";
              const lower = href.toLowerCase();

              if (
                href.startsWith("/") &&
                pagesToCheck.length < 20 &&
                (lower.includes("contact") ||
                  lower.includes("about") ||
                  lower.includes("team") ||
                  lower.includes("support") ||
                  lower.includes("privacy") ||
                  lower.includes("terms"))
              ) {
                pagesToCheck.push(href);
              }
            });
          } catch {
            continue;
          }
        }

        const cleanEmails = Array.from(emails).filter(
          (e) =>
            !e.includes("example") &&
            !e.includes("test") &&
            !e.includes("gmail") &&
            !e.includes("yahoo")
        );

        return {
          website,
          email: cleanEmails.join(" | ") || "",
          phone: Array.from(phones).join(" | ") || "",
          emails: cleanEmails,
          phones: Array.from(phones),
          facebook,
          linkedin,
          instagram,
          twitter,
        };
      })
    );

    return NextResponse.json(results);
  } catch (err) {
    return NextResponse.json(
      { error: "Extraction failed" },
      { status: 500 }
    );
  }
}