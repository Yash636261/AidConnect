import React from "react";
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
const ModeToggle = dynamic(() => import("@/components/shared/modetoggle"), {
  ssr: false,
});

interface Links {
  label: string;
  href: string;
  icon: keyof typeof LucideIcons;
}
const links: Links[] = [
  { label: "Dashboard", href: "/home", icon: "LayoutDashboard" },
  { label: "Profile", href: "#", icon: "User" },
  { label: "Settings", href: "#", icon: "Settings" },
  { label: "API", href: "/api", icon: "AppWindowIcon" },
];

export default function Page() {
  return <Dashboard />;
}

const Dashboard = () => {
  const height = "calc(100vh - 36px)";
  return (
    <main className={`p-8 space-y-8 max-h-[95vh] overflow-y-scroll`}>
      <Metrics />
      <div className="grid gap-8 md:grid-cols-2">
        <RevenueChart />
        <ActiveCasesMap />
      </div>
    </main>
  );
};
