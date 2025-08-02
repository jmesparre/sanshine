import type { Metadata } from "next";
import { Rethink_Sans } from "next/font/google";
import ClientLayout from "@/components/layout/ClientLayout";
import "./globals.css";

const rethinkSans = Rethink_Sans({
  subsets: ["latin"],
  variable: "--font-rethink-sans",
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
    <html lang="en">
      <body className={`${rethinkSans.variable} antialiased flex flex-col min-h-screen`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
