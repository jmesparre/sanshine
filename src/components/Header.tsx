"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "./ui/button";
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

  return (
    <header className="bg-white w-full px-6 relative z-50">
      {/* Top Bar */}
      <div className="flex justify-between items-center py-4 border-b border-gray-200">
        <div className="text-2xl font-bold tracking-wider">
          <Link href="/">
            <Image src="/logo.svg" alt="Sanshine Logo" width={150} height={48} className="h-12" />
          </Link>
        </div>
        <div className="flex items-center space-x-6">
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
      </div>

      {/* Sub Navigation */}
      <nav className="flex justify-between items-center py-4">
        <NavLink href="/consultas" number="01">Consultas</NavLink>
        <NavLink href="/workshops" number="02">Workshops</NavLink>
        <NavLink href="/programas-detox" number="03">Programas Detox</NavLink>
        <NavLink href="/productos" number="04">Productos</NavLink>
        <NavLink href="/mentorias" number="05">Mentorias</NavLink>
        <NavLink href="/limpieza-epatica" number="06">Limpieza Epática</NavLink>
      </nav>
    </header>
  );
};

export default Header;
