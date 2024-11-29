"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDown, Brain, Lightbulb, Puzzle, Target } from "lucide-react";
import Image from "next/image";
import Img1 from "/public/Images/img1.png";

export default function Story() {
  const [activeSection, setActiveSection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const sections = [
    {
      title: "The Problem",
      content:
        "Disasters often leave victims stranded without immediate help due to delayed data collection and response coordination, costing precious lives.",
      icon: Puzzle,
      image: "/img1.jpg",
      stats: [
        { value: "20M+", label: "people displaced by disasters annually" },
        { value: "6 hours", label: "average delay in initial relief response" },
      ],
    },
    {
      title: "Why We Need a Solution",
      content:
        "Rapid and accurate data collection is critical during disasters to ensure timely aid and reduce the chaos caused by misinformation.",
      icon: Lightbulb,
      image: "/img2.jpg",
      stats: [
        { value: "2X", label: "faster relief with real-time data" },
        { value: "85%", label: "reduction in misinformation spread" },
      ],
    },
    {
      title: "Our Solution",
      content:
        "SwiftAid is an AI-powered disaster response platform that collects, analyzes, and visualizes real-time data to prioritize victims and streamline aid delivery.",
      icon: Brain,
      image: "/img3.jpg",
      stats: [
        { value: "100K+", label: "data points analyzed per minute" },
        { value: "95%", label: "accuracy in victim prioritization" },
      ],
    },
    {
      title: "How It Helps",
      content:
        "SwiftAid enables responders to make informed decisions, prioritize relief efforts, and save lives by delivering aid where it’s needed most, faster than ever before.",
      icon: Target,
      image: "/img4.jpg",
      stats: [
        { value: "50%", label: "reduction in response time" },
        { value: "90%", label: "user satisfaction rate among responders" },
      ],
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = containerRef.current?.scrollHeight || 0;
      const sectionHeight = fullHeight / sections.length;
      const currentSection = Math.floor(
        (scrollPosition + windowHeight / 2) / sectionHeight
      );
      setActiveSection(Math.min(currentSection, sections.length - 1));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections.length]);

  const backgroundOpacity = useTransform(scrollYProgress, [0, 1], [0.1, 0.5]);
  const backgroundScaleY = useTransform(scrollYProgress, [0, 1], [1, 1.5]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-white dark:bg-gray-900">
      <motion.div
        className="absolute inset-0 "
        style={{
          opacity: backgroundOpacity,
          scaleY: backgroundScaleY,
          originY: 0,
        }}
      />
      <div
        ref={containerRef}
        className="relative z-10 mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8"
      >
        {sections.map((section, index) => (
          <motion.div
            key={index}
            className="mb-40 flex items-center justify-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: activeSection >= index ? 1 : 0,
              y: activeSection >= index ? 0 : 50,
            }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="w-full max-w-4xl bg-blue-200 backdrop-blur-lg shadow-xl overflow-hidden rounded-3xl">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2">
                  <Image
                    src={section.image}
                    alt={section.title}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="md:w-1/2 p-6">
                  <CardHeader>
                    <CardTitle className="flex items-center text-3xl font-bold mb-4">
                      <section.icon className="mr-2 h-8 w-8 text-primary" />
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
                      {section.content}
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      {section.stats.map((stat, statIndex) => (
                        <div key={statIndex} className="text-center">
                          <div className="text-3xl font-bold text-primary">
                            {stat.value}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
