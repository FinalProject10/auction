import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ["latin"] });

// Dynamically import ChatBubble to avoid SSR issues
const ChatBubble = dynamic(() => import("./components/ChatBubble"), {
  ssr: false,
});

// Dynamically import LoadingProvider to avoid SSR issues
const LoadingProvider = dynamic(() => import("./components/LoadingContext").then(mod => ({ default: mod.LoadingProvider })), {
  ssr: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "AutoBid - Premium Car Auction Platform",
  description: "Join thousands of bidders in our premium car auction platform. Find your dream car or sell your vehicle with confidence.",
  keywords: "car auction, vehicle auction, auto bid, car sales, auction platform",
  authors: [{ name: "AutoBid" }],
  openGraph: {
    title: "AutoBid - Premium Car Auction Platform",
    description: "Join thousands of bidders in our premium car auction platform",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AutoBid - Premium Car Auction Platform",
    description: "Join thousands of bidders in our premium car auction platform",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LoadingProvider>
          {children}
          <ChatBubble />
        </LoadingProvider>
      </body>
    </html>
  );
}
