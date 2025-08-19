import { useEffect, useState } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Order } from '@/types';

export function useDashboardData() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();

  useEffect(() => {
    const q = query(collection(db, 'orders'));
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

  const filteredOrders = orders.filter((order) => {
    const orderDate = order.createdAt.toDate();
    if (startDate && startDate > orderDate) {
      return false;
    }
    if (endDate && endDate < orderDate) {
      return false;
    }
    return true;
  });

  const totalRevenueByCurrency = filteredOrders
    .filter((order) => order.status === 'paid')
    .reduce((acc, order) => {
      if (!acc[order.currency]) {
        acc[order.currency] = 0;
      }
      acc[order.currency] += order.amount;
      return acc;
    }, {} as { [key: string]: number });

  const pendingOrders = filteredOrders.filter(
    (order) => order.status === 'pending'
  ).length;

  const totalClients = [
    ...new Set(filteredOrders.map((order) => order.userEmail)),
  ].length;

  const salesByService = filteredOrders
    .filter((order) => order.status === 'paid')
    .reduce((acc, order) => {
      if (!acc[order.serviceName]) {
        acc[order.serviceName] = {
          count: 0,
        };
      }
      acc[order.serviceName].count += 1;
      return acc;
    }, {} as { [key: string]: { count: number } });

  const salesLast7Days = filteredOrders
    .filter((order) => order.status === 'paid')
    .reduce((acc, order) => {
      const date = order.createdAt
        .toDate()
        .toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' });
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += 1;
      return acc;
    }, {} as { [key: string]: number });

  const chartData = Object.entries(salesLast7Days)
    .map(([name, sales]) => ({ name, ventas: sales }))
    .slice(-7);

  return {
    loading,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    totalRevenueByCurrency,
    pendingOrders,
    totalClients,
    salesByService,
    chartData,
  };
}
