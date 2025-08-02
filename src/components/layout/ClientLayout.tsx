"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
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

    return (
        <AuthProvider>
            {isClient && <Header />}
            <main className="flex-grow">{children}</main>
            {isClient && <Footer />}
            <LoginModal />
        </AuthProvider>
    );
}
