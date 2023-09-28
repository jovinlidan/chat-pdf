import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/components/providers";
import dynamic from "next/dynamic";
import { Toaster } from "react-hot-toast";
// const Toaster = dynamic(
//   async () => {
//     const { Toaster } = await import("react-hot-toast");
//     return Toaster;
//   },
//   {
//     ssr: false,
//   }
// );

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chat PDF",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <Providers>
        <html lang="en">
          <body className={inter.className}>
            {children}
            <Toaster />
          </body>
        </html>
      </Providers>
    </ClerkProvider>
  );
}
