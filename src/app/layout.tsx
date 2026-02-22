import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Last Song Ministry | Christian Worship Music by Wylie & Dawna Stevens",
    template: "%s | Last Song Ministry",
  },
  description:
    "Last Song is a Christian music ministry led by Wylie and Dawna Stevens. Husband and wife worship duo sharing faith through gospel music, hymns, and praise at churches and events in Kingman, AZ and beyond.",
  keywords: [
    "Christian music ministry",
    "gospel music",
    "worship duo",
    "Wylie Stevens",
    "Dawna Stevens",
    "Last Song Ministry",
    "church worship music",
    "Christian worship",
    "hymns",
    "praise and worship",
    "Kingman Arizona",
    "gospel duo",
    "church music",
    "revival music",
    "Christian concert",
    "worship leader",
    "faith based music",
    "scripture songs",
  ],
  authors: [{ name: "Wylie & Dawna Stevens" }],
  creator: "Last Song Ministry",
  publisher: "Last Song Ministry",
  metadataBase: new URL("https://lastsong-pro-cvf7.vercel.app"),
  openGraph: {
    title: "Last Song Ministry | Christian Worship Music",
    description:
      "Husband and wife worship duo sharing faith through gospel music, hymns, and praise at churches and events.",
    url: "https://lastsong-pro-cvf7.vercel.app",
    siteName: "Last Song Ministry",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/5M5A7470_new.jpeg",
        width: 1924,
        height: 3473,
        alt: "Wylie and Dawna Stevens - Last Song Ministry",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Last Song Ministry | Christian Worship Music",
    description:
      "Husband and wife worship duo sharing faith through gospel music, hymns, and praise.",
    images: ["/images/5M5A7470_new.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/images/guitar_treeImage.jpeg",
  },
  alternates: {
    canonical: "https://lastsong-pro-cvf7.vercel.app",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  name: "Last Song Ministry",
  description:
    "Christian music ministry led by husband and wife worship duo Wylie and Dawna Stevens, sharing faith through gospel music, hymns, and praise.",
  url: "https://lastsong-pro-cvf7.vercel.app",
  genre: ["Gospel", "Christian", "Worship", "Hymns"],
  member: [
    {
      "@type": "Person",
      name: "Wylie Stevens",
      role: "Vocalist, Guitarist",
    },
    {
      "@type": "Person",
      name: "Dawna Stevens",
      role: "Vocalist",
    },
  ],
  location: {
    "@type": "Place",
    name: "Kingman, Arizona",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kingman",
      addressRegion: "AZ",
      addressCountry: "US",
    },
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-903-556-3650",
    email: "dbstevens04@hotmail.com",
    contactType: "booking",
  },
  image: "https://lastsong-pro-cvf7.vercel.app/images/5M5A7470_new.jpeg",
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
