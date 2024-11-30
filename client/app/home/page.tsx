"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/shared/sidebar";
// import {
//   IconArrowLeft,
//   IconBrandTabler,
//   IconSettings,
//   IconUserBolt,
// } from "@tabler/icons-react";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Nav } from "@/components/shared/nav";
import { Metrics } from "@/components/shared/metrics";
import { RevenueChart } from "@/components/shared/revenue-chart";
import { ActiveCasesMap } from "@/components/shared/active-cases-map";
import { Schedule } from "@/components/shared/schedule";
import { ModeToggle } from "@/components/shared/modetoggle";
import { ArrowLeft, Settings, User, LayoutDashboard } from "lucide-react";

interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
}

export default function page() {
  const links: Links[] = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <LayoutDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "#",
      icon: (
        <User className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <Settings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <ArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 min-h-screen mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-[60vh]" // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {/* {open ? <Logo /> : <LogoIcon />} */}
            <div className="mt-8 flex flex-col gap-2">
              s
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <ModeToggle />
        </SidebarBody>
      </Sidebar>
      <Dashboard />
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        SwiftAid
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

const Dashboard = () => {
  return (
    <div className="flex flex-1">
      <div className=" bg-background w-full">
        <Nav />
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
