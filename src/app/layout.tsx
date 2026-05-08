import type { Metadata } from "next";
import { Archivo_Black, Space_Mono, Work_Sans } from "next/font/google";
import { AppProvider } from "@/core/providers/app-provider";
import { skipLinkTargetId } from "@/core/accessibility/accessibility.constants";
import { siteMetadata } from "@/core/seo/site-metadata";
import { SiteFooter } from "@/shared/components/layout/site-footer";
import { SiteHeader } from "@/shared/components/layout/site-header";
import "./globals.css";

export const metadata: Metadata = siteMetadata;

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  variable: "--font-display",
  weight: "400",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${archivoBlack.variable} ${workSans.variable} ${spaceMono.variable}`}>
        <AppProvider>
          <a className="skip-link" href={`#${skipLinkTargetId}`}>
            Skip to content
          </a>
          <SiteHeader />
          <main id={skipLinkTargetId}>{children}</main>
          <SiteFooter />
        </AppProvider>
      </body>
    </html>
  );
}
