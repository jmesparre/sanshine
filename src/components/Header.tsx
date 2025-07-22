"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LoginForm } from "./login-form";

const NavLink = ({ href, number, children }: { href: string; number: string; children: React.ReactNode }) => (
  <Link href={href} className="text-gray-600 hover:text-gray-900 transition-colors duration-300 flex items-center space-x-2">
    <span>{children}</span>
    <span className="text-xs text-gray-400">{number}</span>
  </Link>
);

const Header = () => {
  const { user, loading, logOut } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white w-full px-9 relative z-50">
      {/* Top Bar */}
      <div className="flex justify-between items-center py-4 border-b border-gray-200">
        <div className="text-2xl font-bold tracking-wider">
          <Link href="/">
            <Image src="/logo.svg" alt="Sanshine Logo" width={150} height={48} className="h-12" />
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/contacto" className="text-sm text-gray-600 hover:text-gray-900">
            Contactame
          </Link>
          <div className="h-6 border-l border-gray-300"></div>
          {!loading &&
            (user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm">{user.displayName}</span>
                <button onClick={logOut} className="text-sm text-gray-600 hover:text-gray-900">
                  Log out
                </button>
              </div>
            ) : (
              <>
                <Button variant="outline" onClick={() => setIsModalOpen(true)}>
                  Iniciar Sesión
                </Button>
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Login</DialogTitle>
                      <DialogDescription>
                        Inicia sesión para continuar.
                      </DialogDescription>
                    </DialogHeader>
                    <LoginForm />
                  </DialogContent>
                </Dialog>
              </>
            ))}
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600 hover:text-gray-900">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Sub Navigation */}
      <nav className="hidden md:flex justify-between items-center py-4">
        <NavLink href="/consultas" number="01">Consultas</NavLink>
        <NavLink href="/workshops" number="02">Workshops</NavLink>
        <NavLink href="/programas-detox" number="03">Programas Detox</NavLink>
        <NavLink href="/mentorias" number="04">Mentorias</NavLink>
        <NavLink href="/limpieza-epatica" number="05">Limpieza Epática</NavLink>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden"
          >
            <nav className="flex flex-col space-y-4 py-4">
              <NavLink href="/consultas" number="01">Consultas</NavLink>
              <NavLink href="/workshops" number="02">Workshops</NavLink>
              <NavLink href="/programas-detox" number="03">Programas Detox</NavLink>
              <NavLink href="/productos" number="04">Productos</NavLink>
              <NavLink href="/mentorias" number="05">Mentorias</NavLink>
              <NavLink href="/limpieza-epatica" number="06">Limpieza Epática</NavLink>
              <div className="border-t border-gray-200 pt-4">
                <Link href="/contacto" className="text-sm text-gray-600 hover:text-gray-900">
                  Contactame
                </Link>
                {!loading &&
                  (user ? (
                    <div className="flex flex-col space-y-2 mt-4">
                      <span className="text-sm">{user.displayName}</span>
                      <button onClick={logOut} className="text-sm text-gray-600 hover:text-gray-900 text-left">
                        Log out
                      </button>
                    </div>
                  ) : (
                    <div className="mt-4">
                      <Button variant="outline" onClick={() => { setIsModalOpen(true); setIsMobileMenuOpen(false); }}>
                        Iniciar Sesión
                      </Button>
                    </div>
                  ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
