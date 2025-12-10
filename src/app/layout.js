import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from '@next/third-parties/google'


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  // Basic Metadata
  title: {
    default: "LabelX - Train AI, Earn Crypto Rewards | LBLX Token",
    template: "%s | LabelX"
  },
  description: "Earn real cryptocurrency by labeling data for AI. Complete simple tasks and receive instant LBLX token payouts to your wallet. Join 10,000+ users earning on Binance Smart Chain.",
  keywords: [
    "labelx",
    "LBLX token",
    "earn crypto",
    "data labeling",
    "AI training",
    "Web3 jobs",
    "crypto rewards",
    "blockchain",
    "BSC",
    "Binance Smart Chain",
    "passive income crypto",
    "micro tasks crypto"
  ],
  authors: [{ name: "LabelX Team", url: "https://label-x.xyz" }],
  creator: "LabelX",
  publisher: "LabelX",
  
  // Canonical URL
  metadataBase: new URL("https://label-x.xyz"),
  alternates: {
    canonical: "https://label-x.xyz"
  },

  // Open Graph (Facebook, LinkedIn, WhatsApp)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://label-x.xyz",
    siteName: "LabelX",
    title: "LabelX - Train AI, Earn Crypto Rewards",
    description: "Earn real cryptocurrency by labeling data for AI. Complete simple tasks and receive instant LBLX token payouts to your wallet. ",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "LabelX - Train AI, Earn Crypto",
        type: "image/png"
      }
    ]
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    site: "@AI_UR_Alfredo",
    creator: "@AI_UR_Alfredo",
    title: "LabelX - Train AI, Earn Crypto Rewards",
    description: "Earn real cryptocurrency by labeling data for AI. Complete simple tasks and get instant LBLX token payouts. ",
    images: ["/og.png"]
  },

  // Icons & Favicons
  icons: {
    icon: [
      { url: "/t-logo.png", sizes: "32x32", type: "image/png" },
      { url: "/t-logo.png", sizes: "16x16", type: "image/png" }
    ],
    apple: [
      { url: "/t-logo.png", sizes: "180x180", type: "image/png" }
    ],
    shortcut: "/t-logo.png"
  },

  // App Manifest
  manifest: "/manifest.json",

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },

  // Additional Meta Tags
  other: {
    "theme-color": "#FF7A1A",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "application-name": "LabelX",
    "msapplication-TileColor": "#FF7A1A",
    "msapplication-config": "/browserconfig.xml"
  },

  // Category
  category: "technology"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Additional Schema.org JSON-LD for rich results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "LabelX",
              "url": "https://label-x.xyz",
              "description": "Earn real cryptocurrency by labeling data for AI. Complete simple tasks and receive instant LBLX token payouts.",
              "publisher": {
                "@type": "Organization",
                "name": "LabelX",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://label-x.xyz/t-logo.png"
                },
                "sameAs": [
                  "https://x.com/AI_UR_Alfredo"
                ]
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://label-x.xyz/?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
      <GoogleAnalytics gaId="G-TH31SVJNKC" />
    </html>
  );
}
