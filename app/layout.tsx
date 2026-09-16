import "./globals.css";
import type { Metadata, Viewport } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://klikbekal.local"),
  title: {
    default: "KlikBekal | Pulsa & Pembayaran Digital",
    template: "%s | KlikBekal",
  },
  description: "Website isi pulsa, paket data, e-wallet, token listrik, game, dan pembayaran digital dalam satu tempat.",
  applicationName: "KlikBekal",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "KlikBekal",
    description: "Website isi pulsa, paket data, e-wallet, token listrik, game, dan pembayaran digital dalam satu tempat.",
    url: "https://klikbekal.local",
    siteName: "KlikBekal",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "KlikBekal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KlikBekal",
    description: "Website isi pulsa, paket data, e-wallet, token listrik, game, dan pembayaran digital dalam satu tempat.",
    images: ["/twitter-image"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Root layout harus netral. Jangan taruh Header/Footer di sini.
  return (
    <html lang="id" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-PC162D40HT"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PC162D40HT');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
