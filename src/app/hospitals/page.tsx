import Link from 'next/link';
import { getHospitals } from '@/lib/data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Eye, Pencil } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DeleteHospitalButton } from '@/components/delete-hospital-button';

export default async function HospitalsListPage() {
  const hospitals = await getHospitals();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hospital List</CardTitle>
        <CardDescription>
          A list of all hospitals in your network.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">City</TableHead>
              <TableHead className="hidden sm:table-cell">State</TableHead>
              <TableHead className="hidden md:table-cell">Phone</TableHead>
              <TableHead className="text-right">Beds</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hospitals.length > 0 ? (
              hospitals.map((hospital) => (
                <TableRow key={hospital.id}>
                  <TableCell className="font-medium">{hospital.name}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {hospital.city}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {hospital.state}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {hospital.phone}
                  </TableCell>
                  <TableCell className="text-right">{hospital.beds}</TableCell>
                  <TableCell className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/hospitals/${hospital.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/hospitals/${hospital.id}/edit`}>
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>
                    <DeleteHospitalButton id={hospital.id} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No hospitals found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
