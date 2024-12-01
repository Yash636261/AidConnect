// import React from "react";

// const page = () => {
//   const height = "calc(100vh - 36px)";
//   return (
//     <main className={`p-8 space-y-8 max-h-[95vh] overflow-y-scroll`}>
//       posts
//     </main>
//   );
// };

// export default page;

"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Nav } from "@/components/shared/nav";
import dynamic from "next/dynamic";
// import { ClientSidebar } from "@/components/shared/sidebar";

const DynamicLeafletMap = dynamic(
  () => import("@/components/shared/LeafletMap"),
  {
    ssr: false,
    loading: () => <p>Loading map...</p>,
  }
);

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

export default function Page() {
  const [mapLocations, setMapLocations] = useState(locations);

  return (
    <div className="rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 min-h-screen mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden h-screen">
      {/* <ClientSidebar links={links} /> */}
      <div
        className={cn(
          "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 min-h-screen mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
          "h-screen"
        )}
      >
        <div className="flex flex-1 flex-col">
          <div className="bg-background w-full">
            <main className=" flex-1 overflow-hidden">
              <div className="h-[95vh] w-full rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                <DynamicLeafletMap locations={mapLocations} />
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
