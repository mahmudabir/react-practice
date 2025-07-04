import { notFound } from 'next/navigation';
import { getHospitalById } from '@/lib/data';
import { updateHospitalAction } from '@/app/hospitals/actions';
import { HospitalForm } from '@/components/hospital-form';

export default async function EditHospitalPage({
  params,
}: {
  params: { id: string };
}) {
  // Access id property after destructuring params to avoid Next.js sync API usage error
  const { id } = await params;
  const hospital = await getHospitalById(id);

  if (!hospital) {
    notFound();
  }
  
  const updateAction = updateHospitalAction.bind(null, hospital.id);

  return <HospitalForm hospital={hospital} action={updateAction} />;
}
