import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HospitalsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center justify-between p-4 sm:p-6 border-b">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Hospitals</h1>
          <p className="text-muted-foreground">Manage your hospital network.</p>
        </div>
        <Button asChild>
          <Link href="/hospitals/new">
            <Plus className="mr-2 h-4 w-4" />
            New Hospital
          </Link>
        </Button>
      </header>
      <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
    </div>
  );
}
