import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import AuthSessionProvider  from "@/components/providers/session-provider";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/navbar/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AuthVerse",
  description: "Blog Application For Authentication Demo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthSessionProvider>
          <ThemeProvider>
            <Navbar />
            {children}
            <Toaster richColors />
          </ThemeProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
