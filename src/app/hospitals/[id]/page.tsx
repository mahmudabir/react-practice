import { getHospitalById } from '@/lib/data';
import { notFound } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Pencil } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default async function HospitalDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const hospital = await getHospitalById(params.id);

  if (!hospital) {
    notFound();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{hospital.name}</CardTitle>
        <CardDescription>
          Detailed information for {hospital.name}.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Address</h3>
            <p>{hospital.address}</p>
            <p>
              {hospital.city}, {hospital.state} {hospital.zip}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Contact</h3>
            <p>{hospital.phone}</p>
          </div>
        </div>
        <Separator />
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Capacity</h3>
          <p>{hospital.beds} Beds</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href="/hospitals">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to List
          </Link>
        </Button>
        <Button asChild>
          <Link href={`/hospitals/${hospital.id}/edit`}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
