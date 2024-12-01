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
      <Metrics data={data} />
      <div className="grid gap-8 md:grid-cols-2">
        <NeedsChart needs={data.needs} />
        <ActiveCasesMap locations={data.locations} />
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        <UrgencyLevelPieChart urgencyLevels={data.urgencyLevels} />
        <SentimentAnalysisChart sentiments={data.sentiments} />
        <SourceDistributionChart sources={data.sources} />
      </div>
      <PostsTable posts={data?.posts} />
    </main>
  );
};
