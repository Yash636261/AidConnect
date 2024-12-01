"use client";

import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/shared/sidebar";
import Link from "next/link";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import * as LucideIcons from "lucide-react";
import { SignOutButton, SignedIn } from "@clerk/nextjs";

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
  const animate = true; // Define the animate variable

  return (
    <Sidebar open={open} setOpen={setOpen}>
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
        <SignedIn>
          <SignOutButton>
            <button className="flex items-center justify-start gap-2 group/sidebar py-2">
              <LucideIcons.LogOut className="w-5 h-5 text-neutral-700 dark:text-neutral-200" />

              <motion.span
                animate={{
                  display: animate
                    ? open
                      ? "inline-block"
                      : "none"
                    : "inline-block",
                  opacity: animate ? (open ? 1 : 0) : 1,
                }}
                className="text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
              >
                LogOut
              </motion.span>
            </button>
          </SignOutButton>
        </SignedIn>
      </SidebarBody>
    </Sidebar>
  );
}
