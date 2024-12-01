import React from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import PostsTable from "@/components/shared/posts-table";

const Metrics = dynamic(() => import("@/components/shared/metrics"), {
  ssr: false,
});
const NeedsChart = dynamic(() => import("@/components/shared/needs-chart"), {
  ssr: false,
});
const ActiveCasesMap = dynamic(
  () => import("@/components/shared/active-cases-map"),
  { ssr: false }
);
const UrgencyLevelPieChart = dynamic(
  () => import("@/components/shared/urgency-level-pie-chart"),
  { ssr: false }
);
const SentimentAnalysisChart = dynamic(
  () => import("@/components/shared/sentiment-analysis-chart"),
  { ssr: false }
);
const SourceDistributionChart = dynamic(
  () => import("@/components/shared/source-distribution-chart"),
  { ssr: false }
);

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
    <main className="p-8 space-y-8 max-h-screen overflow-y-scroll bg-[#E9EDF4] dark:bg-gray-950">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="flex items-center space-x-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m0 0V9a4 4 0 118 0v3m-4 4h.01M12 20h.01M8 20h.01M16 20h.01M9 16h.01M15 16h.01M19 16h.01M5 16h.01"
          />
        </svg>
        <div>
          <p className="font-bold">Chennai Floods</p>
          <p>Heavy rains!!</p>
        </div>
      </div>
      <Metrics data={data} />
      <div className="grid gap-8 md:grid-cols-2">
        <NeedsChart needs={data.needs} />
        <ActiveCasesMap locations={data.locations} />
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        <UrgencyLevelPieChart urgencyLevels={data.urgencyLevels} />
        <SentimentAnalysisChart sentiments={data.sentiments} />
        <SourceDistributionChart  sourceCounts={data.sourceCounts} />
      </div>
      <PostsTable posts={data?.posts} />
    </main>
  );
};
