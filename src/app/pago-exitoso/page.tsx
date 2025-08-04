import Link from "next/link";

export default function PagoExitosoPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center">
      <h1 className="text-4xl font-bold text-green-600 mb-4">¡Pago Exitoso!</h1>
      <p className="text-lg text-gray-700 mb-8">
        Gracias por tu compra. Hemos recibido tu pago correctamente.
      </p>
      <Link href="/" className="px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors">
        Volver al Inicio
      </Link>
    </div>
  );
}
