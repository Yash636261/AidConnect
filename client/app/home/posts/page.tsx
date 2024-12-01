import React from "react";
import SocialMediaFeed from "@/components/shared/SocialMediaFeed";

const page = () => {
  const height = "calc(100vh - 36px)";
  return (
    <main className={`p-8 space-y-8 max-h-[95vh] overflow-y-scroll`}>
      <SocialMediaFeed />
    </main>
  );
};

export default page;
