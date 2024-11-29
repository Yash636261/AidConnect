"use client";

import Image from "next/image";
import Insights from "./Insights";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import NutritionChart from "@/components/shared/NutritionChart";
import { ArrowLeft, Heart, Share2, X, Check, Info, User } from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type ProductData = {
  productName: string;
  brand: string;
  image_url: string;
  nutriscore_grade: string;
  nutriscore_score: number;
  nutrientLevels: {
    fat: string;
    "saturated-fat": string;
    sugars: string;
    salt: string;
  };
  nutriments: any;
  ingredientsAnalysisTags: string[];
  allergensTags: string[];
  nutriscoreScore: number;
  nutriscoreGrade: string;
};

export default function ProductDetails({ product }: { product: ProductData }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const nutritionScore = product?.nutriscoreScore || 9;
  const maxScore = 100;

  const nutritionPreferences = [
    {
      id: "vegan",
      label: "Vegan",
      allowed: product.ingredientsAnalysisTags?.includes("en:vegan"),
      icon: "🌱",
    },
    {
      id: "vegetarian",
      label: "Vegetarian",
      allowed: product.ingredientsAnalysisTags?.includes("en:vegetarian"),
      icon: "🥬",
    },
    {
      id: "gluten-free",
      label: "Gluten-Free",
      allowed: !product.allergensTags?.includes("en:gluten"),
      icon: "🌾",
    },
    {
      id: "lactose-free",
      label: "Free of Lactose",
      allowed: !product.allergensTags?.includes("en:milk"),
      icon: "🥛",
    },
  ];

  const nutritionLevels = [
    {
      id: "fat",
      label: "Fat",
      level: product.nutrientLevels?.fat || "Unknown",
      icon: "🔥",
      color:
        product.nutrientLevels?.fat === "low"
          ? "bg-green-500"
          : product.nutrientLevels?.fat === "moderate"
          ? "bg-yellow-500"
          : "bg-red-500",
    },
    {
      id: "saturated-fat",
      label: "Saturated Fat",
      level: product.nutrientLevels?.["saturated-fat"] || "Unknown",
      icon: "💧",
      color:
        product.nutrientLevels?.["saturated-fat"] === "low"
          ? "bg-green-500"
          : product.nutrientLevels?.["saturated-fat"] === "moderate"
          ? "bg-yellow-500"
          : "bg-red-500",
    },
    {
      id: "sugar",
      label: "Sugar",
      level: product.nutrientLevels?.sugars || "Unknown",
      icon: "🍯",
      color:
        product.nutrientLevels?.sugars === "low"
          ? "bg-green-500"
          : product.nutrientLevels?.sugars === "moderate"
          ? "bg-yellow-500"
          : "bg-red-500",
    },
    {
      id: "salt",
      label: "Salt",
      level: product.nutrientLevels?.salt || "Unknown",
      icon: "🧂",
      color:
        product.nutrientLevels?.salt === "low"
          ? "bg-green-500"
          : product.nutrientLevels?.salt === "moderate"
          ? "bg-yellow-500"
          : "bg-red-500",
    },
  ];

  const nutriScoreColors = {
    a: "bg-green-500",
    b: "bg-lime-500",
    c: "bg-yellow-500",
    d: "bg-orange-500",
    e: "bg-red-500",
  };

  const goback = () => {
    window.history.back();
  };

  const handleShare = async () => {
    setIsSharing(true);
    try {
      if (navigator.share) {
        await navigator.share({
          title: product.productName,
          text: `Check out this product: ${product.productName} by ${product.brand}`,
          url: window.location.href,
        });
      } else {
        // Fallback for browsers that don't support the Web Share API
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 overflow-hidden rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-4 lg:p-6 border-b dark:border-gray-700">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Go back"
          onClick={goback}
          className="hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <div className="text-center">
          <h1 className="text-2xl font-semibold dark:text-white">
            {product.productName}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">{product.brand}</p>
        </div>
        <div className="flex gap-2">
          <Link href="/profile">
            <div className="hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-full">
              <User className="h-5 w-5" />
            </div>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Share product"
            onClick={handleShare}
            disabled={isSharing}
            className="hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Share2 className={`h-6 w-6 ${isSharing ? "animate-pulse" : ""}`} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
            onClick={() => setIsFavorite(!isFavorite)}
            className="hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Heart
              className={`h-6 w-6 ${
                isFavorite ? "fill-red-500 text-red-500" : ""
              }`}
            />
          </Button>
        </div>
      </div>

      <div className="lg:flex">
        {/* Left Column */}
        <div className="lg:w-1/2 p-4 lg:p-6 lg:border-r dark:border-gray-700">
          {/* Product Info */}
          <div className="flex flex-col md:flex-row gap-4 items-start">
            <div className="w-full md:w-1/2">
              <NutritionChart nutriments={product.nutriments} />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-xl font-semibold mb-4 dark:text-white">
                Nutritional Insights
              </h2>
              <Insights product={product} />
            </div>
          </div>

          {/* Nutri-Score */}
          <div className="mt-8">
            <p className="text-sm font-medium mb-2 dark:text-gray-300">
              NUTRI-SCORE
            </p>
            <div className="flex gap-1">
              {(
                ["a", "b", "c", "d", "e"] as Array<
                  keyof typeof nutriScoreColors
                >
              ).map((grade) => (
                <div
                  key={grade}
                  className={`flex-1 h-10 rounded-md flex items-center justify-center text-white font-bold transition-colors ${
                    grade === product.nutriscoreGrade.toLowerCase()
                      ? nutriScoreColors[grade]
                      : "bg-gray-200 dark:bg-gray-700"
                  }`}
                >
                  {grade.toUpperCase()}
                </div>
              ))}
            </div>
          </div>

          {/* Score Circle */}
          <div className="mt-8 flex flex-col md:flex-row items-center gap-6">
            <div className="relative w-40 h-40">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#eee"
                  strokeWidth="3"
                  className="dark:stroke-gray-700"
                />
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="3"
                  strokeDasharray={`${(nutritionScore / maxScore) * 100}, 100`}
                  className="rotate-90 origin-center transition-all duration-1000 ease-out"
                />
                <text
                  x="18"
                  y="22"
                  className="text-sm font-bold"
                  textAnchor="middle"
                  fill="currentColor"
                >
                  {nutritionScore}
                </text>
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-semibold dark:text-white">
                FoodCheck Score
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                This score helps you to estimate the product quality
              </p>
              <Button
                variant="link"
                className="p-0 h-auto text-green-500 mt-2 hover:underline"
              >
                Show more
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:w-1/2 p-4 lg:p-6">
          {/* Nutrition Preferences */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 dark:text-white">
              Nutrition Preference
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {nutritionPreferences.map((pref) => (
                <Card
                  key={pref.id}
                  className="p-4 flex items-center justify-between hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl" aria-hidden="true">
                      {pref.icon}
                    </span>
                    <span className="font-medium dark:text-gray-200">
                      {pref.label}
                    </span>
                  </div>
                  {pref.allowed ? (
                    <Check
                      className="h-6 w-6 text-green-500"
                      aria-label={`${pref.label} allowed`}
                    />
                  ) : (
                    <X
                      className="h-6 w-6 text-red-500"
                      aria-label={`${pref.label} not allowed`}
                    />
                  )}
                </Card>
              ))}
            </div>
          </div>

          {/* Nutrition Advisor */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 dark:text-white">
              Nutrition Advisor
            </h2>
            <div className="space-y-4">
              {nutritionLevels.map((level) => (
                <Card
                  key={level.id}
                  className="p-4 flex items-center justify-between hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl" aria-hidden="true">
                      {level.icon}
                    </span>
                    <span className="font-medium dark:text-gray-200">
                      {level.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 dark:text-gray-300 capitalize">
                      {level.level}
                    </span>
                    <div
                      className={`w-4 h-4 rounded-full ${level.color}`}
                      aria-hidden="true"
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="mt-8 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg cursor-help transition-colors hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Info className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                  <p>
                    Disclaimer: The information provided may be incomplete or
                    incorrect.
                  </p>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>No liability and no medical advice.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}
