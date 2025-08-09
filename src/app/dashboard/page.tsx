const DashboardPage = () => {
  const orders = [
    {
      id: "1",
      customer: "Juan Perez",
      service: "Consulta Nutricional",
      amount: "50 USD",
      status: "pendiente",
      date: "2024-07-18",
    },
    {
      id: "2",
      customer: "Maria Garcia",
      service: "Curso de Cocina",
      amount: "100 USD",
      status: "pagado",
      date: "2024-07-17",
    },
    {
      id: "3",
      customer: "Carlos Lopez",
      service: "Taller de Alimentación",
      amount: "75 USD",
      status: "expirado",
      date: "2024-07-16",
    },
  ];

  return (
    <div className="container mx-auto px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-12">
        Panel de Administración
      </h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold font-alegreya text-gray-600 uppercase tracking-wider">
                Cliente
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold font-alegreya text-gray-600 uppercase tracking-wider">
                Servicio
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold font-alegreya text-gray-600 uppercase tracking-wider">
                Monto
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold font-alegreya text-gray-600 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Fecha
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {order.customer}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {order.service}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {order.amount}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <span
                    className={`relative inline-block px-3 py-1 font-semibold leading-tight ${
                      order.status === "pagado"
                        ? "text-green-900"
                        : order.status === "pendiente"
                        ? "text-yellow-900"
                        : "text-red-900"
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`absolute inset-0 ${
                        order.status === "pagado"
                          ? "bg-green-200"
                          : order.status === "pendiente"
                          ? "bg-yellow-200"
                          : "bg-red-200"
                      } opacity-50 rounded-full`}
                    ></span>
                    <span className="relative">{order.status}</span>
                  </span>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {order.date}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardPage;
