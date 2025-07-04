import { createHospitalAction } from '@/app/hospitals/actions';
import { HospitalForm } from '@/components/hospital-form';

export default function NewHospitalPage() {
  return <HospitalForm action={createHospitalAction} />;
}
