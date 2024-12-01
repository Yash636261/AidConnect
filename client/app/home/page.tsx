import React from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/shared/sidebar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Nav } from "@/components/shared/nav";
import dynamic from "next/dynamic";

import * as LucideIcons from "lucide-react";

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
const Schedule = dynamic(() => import("@/components/shared/schedule"), {
  ssr: false,
});
const ModeToggle = dynamic(() => import("@/components/shared/modetoggle"), {
  ssr: false,
});

interface Links {
  label: string;
  href: string;
  icon: keyof typeof LucideIcons;
}

interface NavLinks {
  label: string;
  href: string;
}

const links: Links[] = [
  { label: "Dashboard", href: "/home", icon: "LayoutDashboard" },
  { label: "Profile", href: "#", icon: "User" },
  { label: "Settings", href: "#", icon: "Settings" },
  { label: "API", href: "/api", icon: "AppWindowIcon" },
];
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
      <ClientSidebar links={links} />
      <Dashboard />
    </div>
  );
}

const ClientSidebar = dynamic(() => import("./ClientSidebar"), { ssr: false });

const Dashboard = () => {
  return (
    <div className="flex flex-1">
      <div className="bg-background w-full">
        <Nav links={navlinks} />
        <main className="p-8 space-y-8 max-h-screen overflow-y-scroll">
          <Metrics />
          <div className="grid gap-8 md:grid-cols-2">
            <RevenueChart />
            <ActiveCasesMap />
          </div>
          <Schedule />
        </main>
      </div>
    </div>
  );
};
