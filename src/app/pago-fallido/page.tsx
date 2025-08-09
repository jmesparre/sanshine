import Link from "next/link";

export default function PagoFallidoPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold text-red-400 mb-4">Error en el Pago</h1>
      <p className="text-lg text-gray-700 mb-8">
        Lamentablemente, no pudimos procesar tu pago. Por favor, intenta de nuevo.
      </p>
      <Link href="/" className="px-6 py-3  rounded-lg border-1 border-black hover:font-medium transition-colors">
        Volver al Inicio
      </Link>
    </div>
  );
}
