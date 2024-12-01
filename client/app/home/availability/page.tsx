import { Metadata } from 'next'
import AvailabilityStats  from '@/components/shared/availability-and-ngos'


export const metadata: Metadata = {
  title: 'Availability and NGOs | Disaster Relief Dashboard',
  description: 'View resource availability and information about NGOs involved in disaster relief efforts.',
}

export default function AvailabilityAndNGOsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Availability and NGOs</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <AvailabilityStats />
       
      </div>
    </div>
  )
}
