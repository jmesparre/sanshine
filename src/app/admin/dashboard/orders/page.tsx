'use client';

import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Order } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const translateStatus = (status: 'pending' | 'paid' | 'cancelled') => {
    switch (status) {
      case 'pending':
        return 'Pendiente';
      case 'paid':
        return 'Pagada';
      case 'cancelled':
        return 'Cancelada';
      default:
        return status;
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    const orderRef = doc(db, 'orders', orderId);
    try {
      await deleteDoc(orderRef);
      console.log(`Order ${orderId} deleted`);
    } catch (error) {
      console.error('Error deleting order: ', error);
    }
    setIsDeleteDialogOpen(false);
    setOrderToDelete(null);
  };

  const openDeleteDialog = (order: Order) => {
    setOrderToDelete(order);
    setIsDeleteDialogOpen(true);
  };

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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Gestión de Órdenes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <Input
              type="text"
              placeholder="Buscar por cliente..."
              className="max-w-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="pending">Pendiente</SelectItem>
                <SelectItem value="paid">Pagada</SelectItem>
                <SelectItem value="cancelled">Cancelada</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Servicio</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Monto</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.userName}</TableCell>
                  <TableCell>{order.serviceName}</TableCell>
                  <TableCell>
                    {order.createdAt && order.createdAt.seconds
                      ? new Date(order.createdAt.seconds * 1000).toLocaleDateString()
                      : 'Fecha no disponible'}
                  </TableCell>
                  <TableCell>
                    {order.amount} {order.currency}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        order.status === 'paid'
                          ? 'default'
                          : order.status === 'pending'
                          ? 'secondary'
                          : 'destructive'
                      }
                    >
                      {translateStatus(order.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleStatusChange(order, 'pending')}>
                          Marcar como Pendiente
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(order, 'paid')}>
                          Marcar como Pagada
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(order, 'cancelled')}>
                          Marcar como Cancelada
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openDeleteDialog(order)}>
                          Borrar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro de que quieres borrar esta orden?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto borrará permanentemente la orden de la base de
              datos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOrderToDelete(null)}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => orderToDelete && handleDeleteOrder(orderToDelete.id)}>
              Borrar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default OrdersPage;
