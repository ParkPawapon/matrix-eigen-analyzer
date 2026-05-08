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
