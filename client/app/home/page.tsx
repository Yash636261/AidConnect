import React from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import PostsTable from "@/components/shared/posts-table";

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

export default async function Page() {
  try {
    const response = await axios.get("http://localhost:8000/api/data/stats");
    const data = response.data;

    return <Dashboard data={data} />;
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div>Error loading dashboard data</div>;
  }
}

const Dashboard = ({ data }: any) => {
  const height = "calc(100vh - 36px)";
  return (
    <main className="p-8 space-y-8 max-h-screen overflow-y-scroll">
      <Metrics data={data} />
      <div className="grid gap-8 md:grid-cols-2">
        <RevenueChart needs={data.needs} />
        <ActiveCasesMap locations={data.locations} />
      </div>

      <PostsTable posts={data?.posts} />
      {/* <Schedule /> */}
    </main>
  );
};
