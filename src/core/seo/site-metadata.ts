import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const siteMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Assignment #2 CSS114",
    template: "%s | Assignment #2 CSS114",
  },
  description: "Landing page scaffold for a matrix eigenvalue and diagonalization assignment tool.",
  applicationName: "Matrix Eigen Analyzer",
  icons: {
    icon: [{ url: "/icon.png", sizes: "512x512", type: "image/png" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "Assignment #2 CSS114",
    description:
      "Architecture scaffold for the matrix eigenvalue and diagonalization landing page.",
    type: "website",
    url: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};
