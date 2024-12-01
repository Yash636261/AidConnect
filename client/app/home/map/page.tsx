"use client";

import React, { useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";

const DynamicLeafletMap = dynamic(
  () => import("@/components/shared/LeafletMap"),
  {
    ssr: false,
    loading: () => <p>Loading map...</p>,
  }
);
interface Location {
  id: string;
  name: string;
  coordinates: [number, number];
}

interface DashboardProps {
  locations: Location[];
}
interface Links {
  label: string;
  href: string;
  icon: string;
}

const links: Links[] = [
  { label: "Dashboard", href: "#", icon: "LayoutDashboard" },
  { label: "Profile", href: "#", icon: "User" },
  { label: "Settings", href: "#", icon: "Settings" },
  { label: "Logout", href: "#", icon: "ArrowLeft" },
];

const navlinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
const locations: { id: string; name: string; coordinates: [number, number] }[] =
  [
    { id: "1", name: "Chennai", coordinates: [13.0827, 80.2707] },
    { id: "2", name: "Mahabalipuram", coordinates: [12.6269, 80.1927] },
    { id: "3", name: "Kanchipuram", coordinates: [12.8342, 79.7036] },
    { id: "4", name: "Pondicherry", coordinates: [11.9342, 79.8306] },
    { id: "5", name: "Vellore", coordinates: [12.9165, 79.1325] },
  ];

const Dashboard = ({ locations }: DashboardProps) => {
  return (
    <div className="rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 min-h-screen mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden h-screen">
      <div className="flex flex-1 flex-col">
        <div className="bg-background w-full">
          <main className="flex-1 overflow-hidden">
            <div className="h-[95vh] w-full rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
              {/* <ErrorBoundary fallback={<div>Error loading map</div>}> */}
              {/* @ts-ignore */}
              <DynamicLeafletMap locations={locations} />
              {/* </ErrorBoundary> */}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default async function Page() {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/data/stats`);
    const data = response.data;

    // Assuming the API returns locations in the format you need.
    // If not, you may need to transform the data here.
    const locations: Location[] = data.locations || [];

    return <Dashboard locations={locations} />;
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div>Error loading dashboard data</div>;
  }
}
