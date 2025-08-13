'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { collection, onSnapshot, query, orderBy, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Order } from '@/types';

const AdminDashboardPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredOrders = orders.filter((order) => {
    const searchTermMatch = order.userName.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch = statusFilter === 'all' || order.status === statusFilter;
    return searchTermMatch && statusMatch;
  });

  const handleStatusChange = async (order: Order, newStatus: 'pending' | 'paid' | 'cancelled') => {
    const orderRef = doc(db, 'orders', order.id);
    try {
      await updateDoc(orderRef, {
        status: newStatus,
      });
      console.log(`Order ${order.id} status updated to ${newStatus}`);

      if (newStatus === 'paid') {
        const updatedOrder = { ...order, status: newStatus };
        await fetch('/api/send-confirmation-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedOrder),
        });
      }
    } catch (error) {
      console.error('Error updating order status or sending email: ', error);
    }
  };

  useEffect(() => {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const ordersData: Order[] = [];
        querySnapshot.forEach((doc) => {
          ordersData.push({ id: doc.id, ...doc.data() } as Order);
        });
        setOrders(ordersData);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching orders: ', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className='m-auto text-center pt-10'>Cargando órdenes...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Panel de Administración</h1>
      
      <nav className="flex space-x-4 mb-6 border-b pb-2">
        <Link href="/admin/dashboard" className="text-blue-600 hover:text-blue-800 font-semibold">
          Gestión de Órdenes
        </Link>
        <Link href="/admin/dashboard/services" className="text-blue-600 hover:text-blue-800 font-semibold">
          Editar Contenido de Servicios
        </Link>
      </nav>

      <h2 className="text-xl font-semibold mb-4">Gestión de Órdenes</h2>
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Buscar por cliente..."
          className="p-2 border border-gray-600 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="p-2 border border-gray-600 rounded"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">Todos los estados</option>
          <option value="pending">Pendiente</option>
          <option value="paid">Pagada</option>
          <option value="cancelled">Cancelada</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Cliente</th>
              <th className="py-2 px-4 border-b">Servicio</th>
              <th className="py-2 px-4 border-b">Fecha</th>
              <th className="py-2 px-4 border-b">Monto</th>
              <th className="py-2 px-4 border-b">Estado</th>
              <th className="py-2 px-4 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td className="py-2 px-4 border-b">{order.userName}</td>
                <td className="py-2 px-4 border-b">{order.serviceName}</td>
                <td className="py-2 px-4 border-b">
                  {new Date(order.createdAt.seconds * 1000).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b">
                  {order.amount} {order.currency}
                </td>
                <td className="py-2 px-4 border-b">{order.status}</td>
                <td className="py-2 px-4 border-b">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order, e.target.value as 'pending' | 'paid' | 'cancelled')
                    }
                    className="p-2 border rounded"
                  >
                    <option value="pending">Pendiente</option>
                    <option value="paid">Pagada</option>
                    <option value="cancelled">Cancelada</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
