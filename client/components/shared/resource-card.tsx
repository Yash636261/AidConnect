"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface ResourceCardProps {
  title: string;
  available: number;
  total: number;
  dateRange?: string;
  unit?: string;
}

export default function ResourceCard({
  title,
  available,
  total,
  dateRange = "Data from 1-12 Apr, 2024",
  unit = "",
}: ResourceCardProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate the progress
    const percentage = (available / total) * 100;
    setProgress(percentage);
  }, [available, total]);

  // SVG arc calculation
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeWidth = 12;
  const center = radius + strokeWidth;
  const size = center * 2;

  // Calculate the arc path
  const startAngle = -135;
  const endAngle = 135;
  const angleRange = endAngle - startAngle;
  const progressAngle = startAngle + (angleRange * progress) / 100;

  const startPoint = polarToCartesian(center, center, radius, startAngle);
  const endPoint = polarToCartesian(center, center, radius, progressAngle);

  const largeArcFlag = progressAngle - startAngle <= 180 ? "0" : "1";

  const pathData = [
    "M",
    startPoint.x,
    startPoint.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    1,
    endPoint.x,
    endPoint.y,
  ].join(" ");

  return (
    <Card className="w-full max-w-md bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-900 dark:to-black  rounded-2xl shadow-md hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </h3>
        </div>
        {/* <Button variant="outline" size="sm">
          View Report
        </Button> */}
      </CardHeader>
      <CardContent className="pt-4 flex justify-center">
        <div className="relative">
          <svg width={size} height={size} className="transform">
            {/* Progress arc */}
            <path
              d={pathData}
              fill="none"
              stroke="url(#gradient)"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
            {/* Gradient definition */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#4ade80" />
              </linearGradient>
            </defs>
            {/* End dot */}
            <circle
              cx={endPoint.x}
              cy={endPoint.y}
              r={strokeWidth / 2}
              fill="white"
              stroke="#4ade80"
              strokeWidth="2"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {unit}
              {available.toLocaleString()}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              of {unit}
              {total.toLocaleString()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Helper function to convert polar coordinates to cartesian
function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}
