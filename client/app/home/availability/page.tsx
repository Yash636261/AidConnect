import { Metadata } from "next";
import AvailabilityStats from "@/components/shared/availability-and-ngos";

export const metadata: Metadata = {
  title: "Availability and NGOs | Disaster Relief Dashboard",
  description:
    "View resource availability and information about NGOs involved in disaster relief efforts.",
};

export default function AvailabilityAndNGOsPage() {
  return (
    <div className=" mx-auto px-4 py-8 p-8 space-y-8 max-h-[95vh] overflow-y-scroll no-scrollbar">
      <h1 className="text-3xl font-bold mb-8">Availability and NGOs</h1>
      <div className="">
        <AvailabilityStats />
      </div>
    </div>
  );
}
