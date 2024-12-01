import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const navigation = [
  { name: "About", href: "#" },
  { name: "Privacy Policy", href: "#" },
  { name: "Licensing", href: "#" },
  { name: "Contact", href: "#" },
];

const socialLinks = [
  { name: "Facebook", href: "#", icon: Facebook },
  { name: "Twitter", href: "#", icon: Twitter },
  { name: "Instagram", href: "#", icon: Instagram },
  { name: "LinkedIn", href: "#", icon: Linkedin },
];

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950 overflow-hidden py-8 md:rounded-t-3xl">
      <div className="container mx-auto px-4 space-y-8">
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <Link
            href="/"
            className="group transition duration-300 ease-in-out transform hover:scale-105"
          >
            <div className="inline-flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-blue-600 dark:text-blue-400"
              >
                <path d="M4.5 9.5V5.5C4.5 4.67157 5.17157 4 6 4H18C18.8284 4 19.5 4.67157 19.5 5.5V9.5" />
                <path d="M4.5 14.5V18.5C4.5 19.3284 5.17157 20 6 20H18C18.8284 20 19.5 19.3284 19.5 18.5V14.5" />
                <path d="M12 4V20" />
              </svg>
              <p className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                AidConnect
              </p>
            </div>
          </Link>
          <nav className="flex flex-wrap justify-center md:justify-end">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition duration-300 ease-in-out"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex justify-center space-x-6">
          {socialLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition duration-300 ease-in-out"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>
        {/* <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Nutrilyze Consultancy, Inc. All
            rights reserved.
          </p>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
