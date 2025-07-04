import { notFound } from 'next/navigation';
import { getHospitalById } from '@/lib/data';
import { updateHospitalAction } from '@/app/hospitals/actions';
import { HospitalForm } from '@/components/hospital-form';

export default async function EditHospitalPage({
  params,
}: {
  params: { id: string };
}) {
  const hospital = await getHospitalById(params.id);

  if (!hospital) {
    notFound();
  }
  
  const updateAction = updateHospitalAction.bind(null, hospital.id);

  return <HospitalForm hospital={hospital} action={updateAction} />;
}
