import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "JS To TS Converter",
  description: "Convert JavaScript/JSON objects to Typescript types",
  authors: { url: "https://chofter.com", name: "Shane O'Sullivan" },
  applicationName: "JS To TS Converter",
  keywords: ["Typescript", "Javascript", "JSON", "convert", "types"],
};

const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <link rel="icon" href="/favicon_ts.ico" sizes="any" />
        <meta
          name="google-site-verification"
          content={googleSiteVerification}
        />
        {children}
      </body>
    </html>
  );
}
