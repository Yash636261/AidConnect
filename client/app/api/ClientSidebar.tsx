"use client";

import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/shared/sidebar";
import Link from "next/link";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import * as LucideIcons from "lucide-react";

const ModeToggle = dynamic(() => import("@/components/shared/modetoggle"), {
  ssr: false,
});

interface Links {
  label: string;
  href: string;
  icon?: keyof typeof LucideIcons;
}

interface LogoProps {
  name: string;
  open: boolean;
}

const Logo: React.FC<LogoProps> = ({ name, open }) => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      {open && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-medium text-black dark:text-white whitespace-pre"
        >
          {name}
        </motion.span>
      )}
    </Link>
  );
};

export default function ClientSidebar({ links }: { links: Links[] }) {
  const [open, setOpen] = useState(false);

  return (
    <Sidebar open={true} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <Logo name="SwiftAid" open={open} />
          <div className="mt-8 flex flex-col gap-2">
            {links.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
          </div>
        </div>
        <ModeToggle />
      </SidebarBody>
    </Sidebar>
  );
}
