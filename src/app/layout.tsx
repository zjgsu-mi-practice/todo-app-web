import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Todo App",
  description: "A modern todo application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="container mx-auto py-8 px-4">
          <header className="mb-8">
            <div className="flex flex-col items-center gap-2">
              <h1 className="text-4xl font-bold text-center">Todo App</h1>
              <nav className="flex gap-4">
                <Link href="/" className="text-blue-600 hover:underline">Home</Link>
                <Link href="/api-docs" className="text-blue-600 hover:underline">API Docs</Link>
              </nav>
            </div>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
