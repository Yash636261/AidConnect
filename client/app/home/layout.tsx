import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import { Nav } from "@/components/shared/nav";
const ClientSidebar = dynamic(() => import("./ClientSidebar"), { ssr: false });

import * as LucideIcons from "lucide-react";

interface NavLinks {
  label: string;
  href: string;
}
const navlinks: NavLinks[] = [
  { label: "Home", href: "/home" },
  { label: "Posts", href: "/home/posts" },
  { label: "Map", href: "/home/map" },
];
interface Links {
  label: string;
  href: string;
  icon: keyof typeof LucideIcons;
}
const links: Links[] = [
  { label: "Dashboard", href: "/home", icon: "LayoutDashboard" },
  {
    label: "Availability of Resources",
    href: "/home/availability",
    icon: "Store",
  },
  { label: "Profile", href: "#", icon: "User" },
  { label: "Settings", href: "#", icon: "Settings" },
  { label: "API", href: "/api", icon: "AppWindowIcon" },
];
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" rounded-md flex flex-col md:flex-row bg-[#E9EDF4] dark:bg-neutral-800 w-full flex-1 min-h-screen mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden h-screen">
      <ClientSidebar links={links} />
      <div
        className={cn(
          "rounded-md flex flex-col md:flex-row bg-[#E9EDF4] dark:bg-neutral-800 w-full flex-1 min-h-screen mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
          "h-screen"
        )}
      >
        <div className="flex flex-1">
          <div className="bg-background w-full">
            <Nav links={navlinks} />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
