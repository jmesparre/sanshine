"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import dynamic from "next/dynamic";
import AuthButton from "./auth/AuthButton";

const MobileMenu = dynamic(() => import("./layout/MobileMenu"), { ssr: false });

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full px-9 relative z-50">
      {/* Top Bar */}
      <div className="flex justify-between items-center py-4 border-b border-black">
        <div className="text-2xl font-bold tracking-wider">
          <Link href="/">
            <>
              <Image src="/logo.svg" alt="Sanshine Logo" width={150} height={48} className="h-12 block dark:hidden" />
              <Image src="/logo-blanco.svg" alt="Sanshine Logo" width={150} height={48} className="h-12 hidden dark:block" />
            </>
          </Link>
        </div>
        <div className="flex items-center space-x-6">
          <Link href="/contacto" className="text-sm text-gray-600 hover:text-gray-900 hidden md:block">
            Contactame
          </Link>
          <div className="h-6 border-l border-black hidden md:block"></div>
          <AuthButton />
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600 hover:text-gray-900">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>

    

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} />
    </header>
  );
};

export default Header;
