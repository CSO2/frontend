import type { Metadata } from "next";
import "./globals.css";
import Navigation from "./components/ui/Navigation";
import Footer from "./components/ui/Footer";
import LiveChatWidget from "./components/ui/LiveChatWidget";

export const metadata: Metadata = {
  title: "CS02 - Build Your Dream PC",
  description: "Premium computer components and custom PC builds. Build your dream. Forge your power.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <LiveChatWidget />
      </body>
    </html>
  );
}
