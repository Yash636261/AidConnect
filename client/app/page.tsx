"use client";

import { useState } from "react";
import { Menu, X, User, LogOut, Scan } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import FAQ from "@/components/shared/FAQ";
import Footer from "@/components/shared/Footer";
import Story from "@/components/shared/Story";

const menuItems = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];

import { useEffect } from "react";
import Image from "next/image";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
const images = ["/Images/img5.jpg"];

const page = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <Header />
      <div className="relative isolate pt-14 sm:px-6 lg:px-8 min-h-[80vh] flex justify-center items-center">
        <div className="absolute left-1/2 top-1/2 -z-50 h-32 w-[100px] -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-gradient-to-br from-orange-600 to-yellow-600 opacity-80 blur-[200px] md:w-[600px]" />
        <div className="mx-auto max-w-7xl flex justify-center items-center">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-2/5 lg:pr-8">
              <div className="hidden sm:mb-8 sm:flex">
                <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 dark:text-gray-300 dark:ring-gray-300/10 dark:hover:ring-gray-300/20">
                  We are excited to share our latest API support.{" "}
                  <Link
                    href="/doc"
                    className="font-semibold text-orange-600 dark:text-orange-400"
                  >
                    <span aria-hidden="true" className="absolute inset-0" />
                    Read more <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>
              <div className="text-left">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                  Accelerating Relief, Saving Lives
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                  Revolutionizing disaster response with AI-powered
                  intelligence. Delivering real-time insights to ensure aid
                  reaches those in need faster than ever before.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <Link
                    href={"/home"}
                    className="group flex h-10 items-center justify-center rounded-md border border-orange-600 bg-gradient-to-b from-orange-400 via-orange-500 to-orange-600 px-4 text-neutral-50 shadow-[inset_0_1px_0px_0px_#fdba74] active:[box-shadow:none]"
                  >
                    <span className="block group-active:[transform:translate3d(0,1px,0)]">
                      Get started
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="lg:w-3/5 mt-10 lg:mt-0">
              <div className="relative w-full h-[400px] sm:h-[500px] rounded-lg overflow-hidden">
                {images.map((src, index) => (
                  <Image
                    key={src}
                    src="/landing.jpg"
                    alt={`Product ${index + 1}`}
                    fill
                    className={`object-cover transition-opacity duration-1000 ${index === currentImage ? "opacity-100" : "opacity-0"
                      }`}
                    priority={index === 0}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Story />
      <FAQ />
      <Footer />
    </div>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between py-4 px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <Link href="/" className="text-xl font-bold text-primary">
            <span>Aid</span>
            <span className="text-orange-500">Connect</span>
          </Link>
        </div>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <div className="hidden lg:block">
              <Button asChild>
                <Link href="/home">Log in</Link>
              </Button>
            </div>
          </SignInButton>
        </SignedOut>
        <div className="lg:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 z-50 origin-top-right transition lg:hidden">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-background shadow-lg ring-1 ring-black/5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                    <span className="text-xl font-bold text-primary">
                      Nutrilyze
                    </span>
                  </div>
                  <div className="-mr-2">
                    <Button variant="ghost" size="icon" onClick={toggleMenu}>
                      <X className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-4">
                    {menuItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center rounded-md p-3 text-sm font-semibold text-foreground hover:bg-muted"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                </div>
                <div className="mt-6">
                  <Button asChild className="w-full">
                    <Link href="/sign-up">Log in</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default page;
