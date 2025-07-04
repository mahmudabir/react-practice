'use client';

import { useFormState } from 'react-dom';
import type { Hospital } from '@/lib/types';
import type { FormState } from '@/app/hospitals/actions';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

type HospitalFormProps = {
  hospital?: Hospital;
  action: (
    prevState: FormState,
    formData: FormData
  ) => Promise<FormState>;
};

const initialState: FormState = {
  message: '',
};

export function HospitalForm({ hospital, action }: HospitalFormProps) {
  const [state, formAction] = useFormState(action, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && state.errors) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.message,
      });
    }
  }, [state, toast]);

  const getError = (field: string) => state.errors?.[field]?.[0];

  return (
    <form action={formAction}>
      <Card>
        <CardHeader>
          <CardTitle>
            {hospital ? 'Edit Hospital' : 'Create New Hospital'}
          </CardTitle>
          <CardDescription>
            {hospital
              ? 'Update the details of the hospital.'
              : 'Fill out the form to add a new hospital to the system.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Hospital Name</Label>
            <Input
              id="name"
              name="name"
              defaultValue={hospital?.name}
              aria-describedby="name-error"
            />
            {getError('name') && <p id="name-error" className="text-sm text-destructive">{getError('name')}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              defaultValue={hospital?.address}
              aria-describedby="address-error"
            />
            {getError('address') && <p id="address-error" className="text-sm text-destructive">{getError('address')}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" name="city" defaultValue={hospital?.city} aria-describedby="city-error"/>
            {getError('city') && <p id="city-error" className="text-sm text-destructive">{getError('city')}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input id="state" name="state" defaultValue={hospital?.state} aria-describedby="state-error"/>
            {getError('state') && <p id="state-error" className="text-sm text-destructive">{getError('state')}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="zip">ZIP Code</Label>
            <Input id="zip" name="zip" defaultValue={hospital?.zip} aria-describedby="zip-error"/>
            {getError('zip') && <p id="zip-error" className="text-sm text-destructive">{getError('zip')}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              placeholder="XXX-XXX-XXXX"
              defaultValue={hospital?.phone}
              aria-describedby="phone-error"
            />
            {getError('phone') && <p id="phone-error" className="text-sm text-destructive">{getError('phone')}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="beds">Number of Beds</Label>
            <Input
              id="beds"
              name="beds"
              type="number"
              defaultValue={hospital?.beds}
              aria-describedby="beds-error"
            />
            {getError('beds') && <p id="beds-error" className="text-sm text-destructive">{getError('beds')}</p>}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline" asChild>
            <Link href={hospital ? `/hospitals/${hospital.id}` : '/hospitals'}>
              Cancel
            </Link>
          </Button>
          <Button type="submit">
            {hospital ? 'Save Changes' : 'Create Hospital'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
