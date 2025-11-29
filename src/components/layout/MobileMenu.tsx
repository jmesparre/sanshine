"use client";

import { motion, AnimatePresence } from "framer-motion";
import AuthButton from "../auth/AuthButton";
import { useOutsideClick } from "@/hooks/useOutsideClick";

const NavLink = ({ href, number, children, className }: { href: string; number?: string; children: React.ReactNode; className?: string }) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: "smooth",
            });
        }
    };

    return (
        <a href={href} onClick={handleClick} className={className || "text-gray-600 hover:text-gray-900 transition-colors duration-300 flex items-center space-x-2"}>
            <span>{children}</span>
            {number && <span className="text-xs text-gray-400">{number}</span>}
        </a>
    );
};

const MobileMenu = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const ref = useOutsideClick(onClose);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.1 }}
                    className="absolute top-full right-0 mt-2 bg-background border border-black mr-5 dark:bg-gray-800 rounded-md shadow-lg"
                >
                    <nav className="flex flex-col space-y-4 px-8 py-8  text-md">
                        <NavLink href="#taller-ig" number="01">Taller de Inteligencia Gastro Intestinal</NavLink>
                        <NavLink href="#plan-antiinflamatorio" number="02">Plan de Alimentación Antiinflamatorio</NavLink>
                        <NavLink href="#detox-grupal" number="03">Detox Solar Grupal</NavLink>
                        <NavLink href="#detox-individual" number="04">Detox Solar Individual</NavLink>
                        <NavLink href="#servicio-nuevo-1" number="05">Formación en Teorías para Crear Salud</NavLink>
                        <NavLink href="#servicio-nuevo-2" number="06">Salud Orgánica Limpieza Hepática Profunda</NavLink>
                        <div className="border-t border-black pt-4">
                            <NavLink href="#contacto" className="text-sm text-gray-600 hover:text-gray-900">
                                Contactame
                            </NavLink>
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
