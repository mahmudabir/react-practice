import { getHospitals } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, BedDouble, Building, Users } from 'lucide-react';
import type { ChartConfig } from '@/components/ui/chart';
import { DashboardChart } from '@/components/dashboard-chart';

export default async function DashboardPage() {
  const hospitals = await getHospitals();

  const totalHospitals = hospitals.length;
  const totalBeds = hospitals.reduce((sum, hospital) => sum + hospital.beds, 0);
  const averageBeds = totalHospitals > 0 ? totalBeds / totalHospitals : 0;

  const chartData = hospitals.map((h) => ({
    name: h.name.split(' ')[0], // Use first word of name for brevity
    beds: h.beds,
  }));

  const chartConfig = {
    beds: {
      label: 'Beds',
      color: 'hsl(var(--primary))',
    },
  } satisfies ChartConfig;

  return (
    <div className="flex flex-col">
      <header className="p-4 sm:p-6">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's a summary of your hospital network.
        </p>
      </header>
      <main className="flex-1 space-y-6 p-4 pt-0 sm:p-6 sm:pt-0">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Hospitals
              </CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalHospitals}</div>
              <p className="text-xs text-muted-foreground">
                Currently managed facilities
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Beds</CardTitle>
              <BedDouble className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalBeds.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Across all facilities
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Average Beds per Hospital
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(averageBeds)}
              </div>
              <p className="text-xs text-muted-foreground">
                Average capacity
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5" />
              Beds per Hospital
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DashboardChart chartData={chartData} chartConfig={chartConfig} />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
