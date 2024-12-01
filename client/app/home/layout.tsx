import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import { Nav } from "@/components/shared/nav";
import * as LucideIcons from "lucide-react";
interface Links {
  label: string;
  href: string;
  icon?: keyof typeof LucideIcons;
}

const links: Links[] = [
  { label: "Dashboard", href: "/home", icon: "LayoutDashboard" },
  { label: "Profile", href: "#", icon: "User" },
  { label: "Settings", href: "#", icon: "Settings" },
  { label: "API", href: "/api", icon: "AppWindowIcon" },
];

const ClientSidebar = dynamic(() => import("./ClientSidebar"), {
  ssr: false,
});

interface NavLinks {
  label: string;
  href: string;
}

const navlinks: NavLinks[] = [
  { label: "Home", href: "/home" },
  { label: "Posts", href: "/home/posts" },
  { label: "Map", href: "/home/map" },
];
const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 min-h-screen mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen"
      )}
    >
      <ClientSidebar links={links} />

      <div className="flex flex-1">
        <div className="bg-background w-full">
          <Nav links={navlinks} />
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
