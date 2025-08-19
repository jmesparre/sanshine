import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface SalesChartProps {
  data: { name: string; ventas: number }[];
  loading: boolean;
}

export function SalesChart({ data, loading }: SalesChartProps) {
  if (loading) {
    return <Skeleton className="h-[400px] w-full" />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ventas en los Últimos 7 Días</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="ventas" fill="#8884d8" name="Nº de Ventas" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
