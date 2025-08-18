import Link from "next/link";

export default function PagoPendientePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-center">
      <h1 className="text-4xl font-bold text-yellow-600 mb-4">Pago Pendiente</h1>
      <p className="text-lg text-gray-700 mb-8">
        Tu pago está siendo procesado. Recibirás una confirmación por mail en breve
      </p>
      <Link href="/" className="px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors">
        Volver al Inicio
      </Link>
    </div>
  );
}
