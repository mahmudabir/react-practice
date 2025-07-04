'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { addHospital, deleteHospital, updateHospital } from '@/lib/data';

const hospitalSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long.'),
  address: z.string().min(5, 'Address must be at least 5 characters long.'),
  city: z.string().min(2, 'City must be at least 2 characters long.'),
  state: z.string().min(2, 'State must be at least 2 characters long.'),
  zip: z.string().regex(/^\d{5}$/, 'Must be a 5-digit ZIP code.'),
  phone: z.string().regex(/^\d{3}-\d{3}-\d{4}$/, 'Phone must be in XXX-XXX-XXXX format.'),
  beds: z.coerce.number().int().min(1, 'There must be at least 1 bed.'),
});

export type FormState = {
  message: string;
  errors?: Record<string, string[] | undefined>;
};

export async function createHospitalAction(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = hospitalSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      message: 'Validation failed. Please check your input.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await addHospital(validatedFields.data);
  } catch (error) {
    return {
      message: 'Failed to create hospital. Please try again.',
    };
  }

  revalidatePath('/hospitals');
  revalidatePath('/');
  redirect('/hospitals');
}

export async function updateHospitalAction(id: string, prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = hospitalSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      message: 'Validation failed. Please check your input.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await updateHospital(id, validatedFields.data);
  } catch (error) {
    return {
      message: 'Failed to update hospital. Please try again.',
    };
  }

  revalidatePath('/hospitals');
  revalidatePath(`/hospitals/${id}`);
  revalidatePath('/');
  redirect(`/hospitals/${id}`);
}


export async function deleteHospitalAction(id: string) {
    try {
        await deleteHospital(id);
        revalidatePath('/hospitals');
        revalidatePath('/');
        return { message: 'Hospital deleted successfully.' };
    } catch (error) {
        return { message: 'Failed to delete hospital.' };
    }
}
