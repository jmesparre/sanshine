import type { Metadata } from "next";
import { Rubik, Alegreya } from "next/font/google";
import ClientLayout from "@/components/layout/ClientLayout";
import "./globals.css";

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
});

const alegreya = Alegreya({
  subsets: ["latin"],
  variable: "--font-alegreya",


});

export const metadata: Metadata = {
  title: "Plataforma de Pagos - Fernanda Sarro",
  description: "Plataforma de pagos para los servicios de nutrición de Fernanda Sarro.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="overflow-x-hidden" lang="en">
      <body className={`${rubik.variable} ${alegreya.variable} antialiased  flex flex-col min-h-screen`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
