import type { Metadata } from "next";
import { AppProvider } from "@/core/providers/app-provider";
import { skipLinkTargetId } from "@/core/accessibility/accessibility.constants";
import { siteMetadata } from "@/core/seo/site-metadata";
import { SiteFooter } from "@/shared/components/layout/site-footer";
import { SiteHeader } from "@/shared/components/layout/site-header";
import "./globals.css";

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
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
