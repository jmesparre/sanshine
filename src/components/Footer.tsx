"use client";

const Footer = () => {
  return (
    <footer className="w-full py-10 px-6 md:px-12 border-t border-black">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-sm text-gray-600 hover:text-gray-900">
            Regresar al inicio
          </button>
          <a href="/Politica-Privacidad-Sanshine.pdf" download className="text-sm text-gray-600 hover:text-gray-900">
            Politicas de Privacidad
          </a>
        </div>
        <div className="flex items-center space-x-6">
          <span className="text-sm text-gray-500">&copy; Sanshine</span>
          <a href="https://www.instagram.com/fernanda.sarro/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors">
            <span className="text-sm text-gray-500">Instagram</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
