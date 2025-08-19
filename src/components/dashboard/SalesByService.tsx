import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Package } from 'lucide-react';

interface SalesByServiceProps {
  data: { [key: string]: { count: number } };
  loading: boolean;
}

export function SalesByService({ data, loading }: SalesByServiceProps) {
  if (loading) {
    return <Skeleton className="h-[200px] w-full" />;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Ventas por Servicio</CardTitle>
        <Package className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Servicio</TableHead>
              <TableHead className="text-right">Ventas</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(data)
              .sort(([, a], [, b]) => b.count - a.count)
              .map(([serviceName, { count }]) => (
                <TableRow key={serviceName}>
                  <TableCell className="font-medium">{serviceName}</TableCell>
                  <TableCell className="text-right">{count}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
