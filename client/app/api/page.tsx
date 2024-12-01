import React from "react";
import { Nav } from "@/components/shared/nav";
import dynamic from "next/dynamic";

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
  //   { label: "Dashboard", href: "#" },
  //   { label: "Profile", href: "#" },
  //   { label: "Settings", href: "#" },
  //   { label: "Logout", href: "#" },
  //   { label: "API", href: "/api" },
];

export default function Page() {
  return <Dashboard />;
}

const ClientSidebar = dynamic(() => import("./ClientSidebar"), {
  ssr: false,
});

const Dashboard = () => {
  return <main className="p-8 space-y-8 max-h-screen overflow-y-scroll"></main>;
};
