import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { Providers } from "./components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Providers>
          <nav>
            <ul className="flex flex-row justify-around">
              <Link href="/">Home</Link>
              <Link href="/infinite-scroll-examples">infinite-scroll-examples</Link>
              <Link href="/page2">page2</Link>
            </ul>
          </nav>

          <main className="flex flex-col container mx-auto px-4 ">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
