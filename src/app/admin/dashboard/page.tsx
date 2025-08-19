'use client';

import { DollarSign, ShoppingCart, Users } from 'lucide-react';
import { DatePicker } from '@/components/ui/date-picker';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { useDashboardData } from '@/hooks/useDashboardData';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { SalesByService } from '@/components/dashboard/SalesByService';
import { SalesChart } from '@/components/dashboard/SalesChart';

const cardColors: { [key: string]: string } = {
  usd: 'bg-green-100',
  eur: 'bg-blue-100',
  ars: 'bg-sky-100',
  mxn: 'bg-emerald-100',
};

const AdminDashboardPage = () => {
  const {
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
  } = useDashboardData();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <DatePicker date={startDate} setDate={setStartDate} />
          <DatePicker date={endDate} setDate={setEndDate} />
        </div>
      </div>
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="sales">Ventas</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {Object.entries(totalRevenueByCurrency).map(([currency, total]) => (
              <MetricCard
                key={currency}
                title={`Ingresos en ${currency.toUpperCase()}`}
                value={`$${total.toFixed(2)}`}
                icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
                subtext="Basado en órdenes pagadas"
                colorClass={cardColors[currency.toLowerCase()] || 'bg-gray-100'}
                loading={loading}
              />
            ))}
            <MetricCard
              title="Órdenes Pendientes"
              value={pendingOrders}
              icon={<ShoppingCart className="h-4 w-4 text-muted-foreground" />}
              subtext="Esperando confirmación de pago"
              colorClass="bg-yellow-100"
              loading={loading}
            />
            <MetricCard
              title="Clientes Únicos"
              value={totalClients}
              icon={<Users className="h-4 w-4 text-muted-foreground" />}
              subtext="Clientes que han realizado órdenes"
              colorClass="bg-purple-100"
              loading={loading}
            />
          </div>
        </TabsContent>
        <TabsContent value="sales" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <SalesByService data={salesByService} loading={loading} />
            <SalesChart data={chartData} loading={loading} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboardPage;
