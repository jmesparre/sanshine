"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import AuthButton from "../auth/AuthButton";

const NavLink = ({ href, number, children }: { href: string; number: string; children: React.ReactNode }) => (
    <Link href={href} className="text-gray-600 hover:text-gray-900 transition-colors duration-300 flex items-center space-x-2">
        <span>{children}</span>
        <span className="text-xs text-gray-400">{number}</span>
    </Link>
);

const MobileMenu = ({ isOpen }: { isOpen: boolean }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className="md:hidden"
                >
                    <nav className="flex flex-col space-y-4 py-4">
                        <NavLink href="/consultas" number="01">Taller de Inteligencia Gastro Intestinal</NavLink>
                        <NavLink href="/workshops" number="02">Detox Solar Grupal</NavLink>
                        <NavLink href="/programas-detox" number="03">Detox Solar Individual</NavLink>
                        <NavLink href="/productos" number="04">Productos</NavLink>
                        <NavLink href="/mentorias" number="05">Mentorias</NavLink>
                        <NavLink href="/limpieza-epatica" number="06">Limpieza Epática</NavLink>
                        <div className="border-t border-gray-200 pt-4">
                            <Link href="/contacto" className="text-sm text-gray-600 hover:text-gray-900">
                                Contactame
                            </Link>
                            <div className="mt-4">
                                <AuthButton />
                            </div>
                        </div>
                    </nav>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MobileMenu;
