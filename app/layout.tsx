import type { Metadata } from "next";
import "./globals.css";
import Navigation from "./components/ui/Navigation";
import Footer from "./components/ui/Footer";
import LiveChatWidget from "./components/ui/LiveChatWidget";
import ThemeProvider from "./components/providers/ThemeProvider";
import { AuthProvider } from "@/lib/contexts/AuthContext";
import { ReactQueryProvider } from "@/lib/contexts/ReactQueryProvider";
import { Toaster } from "react-hot-toast";

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const stored = localStorage.getItem('theme-storage');
                  if (stored) {
                    const { state } = JSON.parse(stored);
                    if (state?.theme === 'dark') {
                      document.documentElement.classList.add('dark');
                    } else {
                      document.documentElement.classList.remove('dark');
                    }
                  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <ReactQueryProvider>
          <AuthProvider>
            <ThemeProvider>
              <Navigation />
              <main className="min-h-screen w-full">
                {children}
              </main>
              <Footer />
              <LiveChatWidget />
              <Toaster position="top-right" />
            </ThemeProvider>
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
