"use client";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full py-10 px-6 md:px-12 border-t border-black">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
          <Link href="/kit" className="text-sm text-gray-600 hover:text-gray-900">Servicios</Link>
          <Link href="/contacto" className="text-sm text-gray-600 hover:text-gray-900">Contactame</Link>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-sm text-gray-600 hover:text-gray-900">
            Regresar al inicio
          </button>
        </div>
        <div className="flex items-center space-x-6">
          <span className="text-sm text-gray-500">&copy; Sanshine</span>
          <span className="text-sm text-gray-500">Instagram</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
