import type { Metadata } from "next";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";

import { CartProvider } from "@/components/cart-context";
import CartDrawer from "@/components/sections/CartDrawer";

export const metadata: Metadata = {
  title: {
    default: "Finesse Club",
    template: "%s | Finesse Club",
  },
  description: "Curadoria e revenda de peças High-End.",
  metadataBase: new URL("https://finesseclub.com.br"),
  openGraph: {
    title: "Finesse Club",
    description: "Curadoria e revenda de peças High-End.",
    url: "https://finesseclub.com.br",
    siteName: "Finesse Club",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 512,
        height: 512,
        alt: "Finesse Club",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Finesse Club",
    description: "Curadoria e revenda de peças High-End.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased bg-black overflow-x-hidden">
        <CartProvider>
          <Script
            id="orchids-browser-logs"
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/orchids-browser-logs.js"
            strategy="afterInteractive"
            data-orchids-project-id="e0354d74-faf5-4977-8775-aa3ee0f7ed6c"
          />
          <ErrorReporter />
          <Script
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
            strategy="afterInteractive"
            data-target-origin="*"
            data-message-type="ROUTE_CHANGE"
            data-include-search-params="true"
            data-only-in-iframe="true"
            data-debug="true"
            data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
          />
          {children}
          <CartDrawer />
          <VisualEditsMessenger />
        </CartProvider>
      </body>
    </html>
  );
}
