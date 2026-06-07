import { NextResponse } from "next/server";
import { chromium } from "playwright";

export async function POST(req: Request) {
  try {
    const { websites } = await req.json();

    const browser = await chromium.launch({
      headless: true,
    });

    const results = [];

    for (const website of websites) {
      try {
        const page = await browser.newPage();

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

            await page.goto(url, {
              waitUntil: "networkidle",
              timeout: 20000,
            });

            const html = await page.content();

            const emailRegex =
              /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;

            const phoneRegex =
              /(\+?\d[\d\s().-]{7,}\d)/g;

            const foundEmails =
              html.match(emailRegex) || [];

            const foundPhones =
              html.match(phoneRegex) || [];

            foundEmails.forEach((e: string) => {
              emails.add(e.toLowerCase());
            });

            foundPhones.forEach((p: string) => {
              phones.add(p.trim());
            });

            const links = await page.$$eval(
              "a",
              (anchors) =>
                anchors.map(
                  (a) => a.href || ""
                )
            );

            for (const link of links) {
              if (
                link.includes("facebook.com") &&
                !facebook
              ) {
                facebook = link;
              }

              if (
                link.includes("linkedin.com") &&
                !linkedin
              ) {
                linkedin = link;
              }

              if (
                link.includes("instagram.com") &&
                !instagram
              ) {
                instagram = link;
              }

              if (
                (link.includes("twitter.com") ||
                  link.includes("x.com")) &&
                !twitter
              ) {
                twitter = link;
              }

              if (link.startsWith("mailto:")) {
                emails.add(
                  link
                    .replace("mailto:", "")
                    .trim()
                    .toLowerCase()
                );
              }
            }
          } catch {
            continue;
          }
        }

        await page.close();

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

    await browser.close();

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