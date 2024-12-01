
import dynamic from "next/dynamic";
const ClientSidebar = dynamic(() => import("./ClientSidebar"), { ssr: false });

import * as LucideIcons from "lucide-react";
interface Links {
    label: string;
    href: string;
    icon: keyof typeof LucideIcons;
  }
const links: Links[] = [
    { label: "Dashboard", href: "/home", icon: "LayoutDashboard" },
    {label:"Availability of Resources", href:"/home/availability", icon:"Calendar"},
    { label: "Profile", href: "#", icon: "User" },
    { label: "Settings", href: "#", icon: "Settings" },
    { label: "API", href: "/api", icon: "AppWindowIcon" },
    { label: "Logout", href: "#", icon: "ArrowLeft" },
  ];
export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (

         
          <div className=" rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 min-h-screen mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden h-screen">
                <ClientSidebar links={links} />
            {children}
          </div>
              

    );
  }
  
