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
  title: "Nutricion Sanshine",
  description: "Transforma tu salud desde la raíz con Nutrición Funcional Depurativa. Fernanda Sarro, nutricionista, te guía con detox y planes integrativos para tu bienestar. Agenda tu consulta y paga de forma segura en nuestra plataforma.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="overflow-x-hidden" lang="es">
      <body className={`${rubik.variable} ${alegreya.variable} antialiased  flex flex-col min-h-screen`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
