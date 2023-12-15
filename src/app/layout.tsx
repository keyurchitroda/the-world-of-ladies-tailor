import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { Providers } from "@/components/Providers";
import AddToCart from "./addtocart/page";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en">
        <body className={inter.className} suppressHydrationWarning={true}>
          <Toaster position="top-center" reverseOrder={false} />
          <Providers>
            <Navbar />
            <AddToCart />
            {children}
          </Providers>
          <Footer />
        </body>
      </html>
    </>
  );
}
