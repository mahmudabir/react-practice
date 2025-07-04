import type { Hospital } from './types';

// In-memory store for hospitals
let hospitals: Hospital[] = [
  {
    id: '1',
    name: 'General Hospital',
    address: '123 Main St',
    city: 'Metropolis',
    state: 'NY',
    zip: '10001',
    phone: '212-555-1234',
    beds: 500,
  },
  {
    id: '2',
    name: 'City Health Clinic',
    address: '456 Oak Ave',
    city: 'Gotham',
    state: 'NJ',
    zip: '07001',
    phone: '973-555-5678',
    beds: 250,
  },
  {
    id: '3',
    name: 'Sunrise Medical Center',
    address: '789 Pine Ln',
    city: 'Star City',
    state: 'CA',
    zip: '90210',
    phone: '310-555-9012',
    beds: 320,
  },
  {
    id: '4',
    name: 'Hopewell Community Hospital',
    address: '101 River Rd',
    city: 'Central City',
    state: 'MO',
    zip: '63001',
    phone: '314-555-3456',
    beds: 180,
  },
];

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getHospitals(): Promise<Hospital[]> {
  await delay(500);
  return [...hospitals];
}

export async function getHospitalById(id: string): Promise<Hospital | undefined> {
  await delay(300);
  return hospitals.find(h => h.id === id);
}

export async function addHospital(hospitalData: Omit<Hospital, 'id'>): Promise<Hospital> {
  await delay(500);
  const newHospital: Hospital = {
    id: Date.now().toString(),
    ...hospitalData,
  };
  hospitals.push(newHospital);
  return newHospital;
}

export async function updateHospital(id: string, updates: Partial<Omit<Hospital, 'id'>>): Promise<Hospital | null> {
  await delay(500);
  const hospitalIndex = hospitals.findIndex(h => h.id === id);
  if (hospitalIndex === -1) {
    return null;
  }
  hospitals[hospitalIndex] = { ...hospitals[hospitalIndex], ...updates };
  return hospitals[hospitalIndex];
}

export async function deleteHospital(id: string): Promise<boolean> {
  await delay(500);
  const initialLength = hospitals.length;
  hospitals = hospitals.filter(h => h.id !== id);
  return hospitals.length < initialLength;
}
