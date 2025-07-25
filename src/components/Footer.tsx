"use client";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white w-full py-10 px-12 border-t border-gray-200">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-6">
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
