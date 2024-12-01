import React from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/shared/sidebar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Nav } from "@/components/shared/nav";
import Maptool from "@/components/shared/disaster-map";
import dynamic from "next/dynamic";
import PostsTable from '@/components/shared/posts-table';
import NeedsChart from '@/components/shared/needs-chart';


const Metrics = dynamic(() => import("@/components/shared/metrics"), {
  ssr: false,
});
const RevenueChart = dynamic(
  () => import("@/components/shared/revenue-chart"),
  { ssr: false }
);
const ActiveCasesMap = dynamic(
  () => import("@/components/shared/active-cases-map"),
  { ssr: false }
);
const ModeToggle = dynamic(() => import("@/components/shared/modetoggle"), {
  ssr: false,
});



interface NavLinks {
  label: string;
  href: string;
}

const navlinks: NavLinks[] = [
  // { label: "Dashboard", href: "#" },
  // { label: "Profile", href: "#" },
  // { label: "Settings", href: "#" },
  // { label: "Logout", href: "#" },
  // { label: "API", href: "/api" },
];

export default function Page() {
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 min-h-screen mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen"
      )}
    >
  
      <Dashboard />
    </div>
  );
}

const ClientSidebar = dynamic(() => import("./ClientSidebar"), { ssr: false });
const data = {
  totalPosts: 1000,
  urgencyLevels: { high: 300, moderate: 500, low: 200 },
  sentiments: { desperate: 200, hopeful: 300, urgent: 400, supportive: 100 },
  verifiedPosts: 800,
  needs: { boats: 150, rescue: 200, food: 300, medical: 250, volunteers: 100 },
  posts: [
    { id: 1, username: 'RaviKumar', location: 'Anna Nagar', urgencyLevel: 'High', sentiment: 'Desperate', needs: ['Boats', 'Rescue', 'Medical aid', 'Food'], timestamp: '2024-11-01T10:00:00Z' },
    { id: 2, username: 'PriyaReddy', location: 'T Nagar', urgencyLevel: 'Moderate', sentiment: 'Hopeful', needs: ['Volunteers', 'Supplies', 'Donations'], timestamp: '2024-11-01T12:30:00Z' },
    // ... more posts
  ],
  locations: [
    { id: '001', lat: 13.0827, lng: 80.2707, urgencyLevel: 'High', needs: ['Boats', 'Rescue'] },
    { id: '002', lat: 13.0569, lng: 80.2425, urgencyLevel: 'Moderate', needs: ['Volunteers', 'Supplies'] },
    // ... more locations
  ],
}

const Dashboard = () => {
  const height = "calc(100vh - 36px)";
  return (
    <div className="flex flex-1">
      <div className="bg-background w-full">
        <Nav links={navlinks} />
        <main className="p-8 space-y-8 max-h-screen overflow-y-scroll">
          <Metrics />
          <div className="grid gap-8 md:grid-cols-2">
            <RevenueChart />
            <ActiveCasesMap />
            {/* <Maptool locations={data?.locations}/> */}
          </div>
          {/* <NeedsChart data={data.needs} /> */}

          <PostsTable posts={data.posts} />
          {/* <Schedule /> */}
        </main>
      </div>
    </div>
     
  );
};
