import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  subtext?: string;
  colorClass?: string;
  loading: boolean;
}

export function MetricCard({
  title,
  value,
  icon,
  subtext,
  colorClass = 'bg-gray-100',
  loading,
}: MetricCardProps) {
  if (loading) {
    return <Skeleton className="h-[120px] w-full" />;
  }

  return (
    <Card className={colorClass}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {subtext && (
          <p className="text-xs text-muted-foreground">{subtext}</p>
        )}
      </CardContent>
    </Card>
  );
}
