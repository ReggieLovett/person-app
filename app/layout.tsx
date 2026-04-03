import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Person App - CRUD Operations",
  description:
    "A full-stack person management application with Create, Read, Update, and Delete operations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50">
        <nav className="bg-white shadow-md sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Person App
            </Link>
            <div className="flex flex-wrap justify-center sm:justify-end gap-4 md:gap-6 text-sm md:text-base">
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-600 transition font-medium"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-blue-600 transition font-medium"
              >
                About
              </Link>
              <Link
                href="/database"
                className="text-gray-700 hover:text-blue-600 transition font-medium"
              >
                Database
              </Link>
              <Link
                href="/github"
                className="text-gray-700 hover:text-blue-600 transition font-medium"
              >
                GitHub
              </Link>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
