"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { LoginModal } from "@/components/auth/LoginModal";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null; // O un spinner de carga
    }

    return (
        <AuthProvider>
            <CurrencyProvider>
                <Header />
                <main className="flex-grow bg-background">{children}</main>
                <Footer />
                <LoginModal />
            </CurrencyProvider>
        </AuthProvider>
    );
}
