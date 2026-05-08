import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const siteMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "EigenScope",
    template: "%s | EigenScope",
  },
  description: "A focused matrix eigenvalue, eigenvector, and diagonalization analysis system.",
  applicationName: "EigenScope",
  icons: {
    icon: [{ url: "/icon.png", sizes: "512x512", type: "image/png" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "EigenScope",
    description: "A focused matrix eigenvalue, eigenvector, and diagonalization analysis system.",
    type: "website",
    url: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};
