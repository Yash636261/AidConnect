"use client";

import { Card } from "@/components/ui/card";

interface NutrimentsProps {
  nutriments: {
    carbohydrates: number;
    fat: number;
    proteins: number;
    energy: number;
    "energy-kcal": number;
    [key: string]: number;
  };
}

export default function NutritionChart({ nutriments }: NutrimentsProps) {
  // Calculate total macros for percentages
  const totalMacros =
    nutriments.carbohydrates + nutriments.fat + nutriments.proteins;
  
  let fatPercentage = Math.round((nutriments.fat / totalMacros) * 100) || 0;
  let carbsPercentage = Math.round((nutriments.carbohydrates / totalMacros) * 100) || 0;
  let proteinPercentage = Math.round((nutriments.proteins / totalMacros) * 100) || 0;

  // Check if all percentages are 0
  const allZero = fatPercentage === 0 && carbsPercentage === 0 && proteinPercentage === 0;

  // If all are zero, set equal parts for visual representation
  if (allZero) {
    fatPercentage = carbsPercentage = proteinPercentage = 33;
  }

  // Calculate stroke dasharray and offset
  const circumference = 754; // 2 * π * 120
  const fatDash = (fatPercentage / 100) * circumference;
  const carbsDash = (carbsPercentage / 100) * circumference;
  const proteinDash = (proteinPercentage / 100) * circumference;

  return (
    <Card className="p-6">
      <div className="space-y-6">
        {/* Calories Circle */}
        <div className="relative w-64 h-64 mx-auto">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="128"
              cy="128"
              r="120"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="16"
            />
            <circle
              cx="128"
              cy="128"
              r="120"
              className="stroke-current"
              fill="none"
              strokeWidth="16"
              strokeLinecap="round"
              strokeDasharray={`${proteinDash} ${circumference - proteinDash}`}
              strokeDashoffset="0"
              style={{ stroke: allZero ? "#9CA3AF" : "rgb(34, 197, 94)" }}
            />
            <circle
              cx="128"
              cy="128"
              r="120"
              className="stroke-current"
              fill="none"
              strokeWidth="16"
              strokeLinecap="round"
              strokeDasharray={`${carbsDash} ${circumference - carbsDash}`}
              strokeDashoffset={-proteinDash}
              style={{ stroke: allZero ? "#D1D5DB" : "rgb(251, 146, 60)" }}
            />
            <circle
              cx="128"
              cy="128"
              r="120"
              className="stroke-current"
              fill="none"
              strokeWidth="16"
              strokeLinecap="round"
              strokeDasharray={`${fatDash} ${circumference - fatDash}`}
              strokeDashoffset={-(proteinDash + carbsDash)}
              style={{ stroke: allZero ? "#F3F4F6" : "rgb(239, 68, 68)" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-4xl font-bold">
              {nutriments["energy-kcal"]}
            </span>
            <span className="text-lg text-muted-foreground">Calories</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span>Fat</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-400" />
            <span>Carbs</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span>Protein</span>
          </div>
        </div>

        {/* Macronutrient Details */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-muted p-3 rounded-lg">
            <div className="font-semibold text-red-500">Fat</div>
            <div>{nutriments.fat}g</div>
            {!allZero && <div className="text-sm text-muted-foreground">{fatPercentage}%</div>}
          </div>
          <div className="bg-muted p-3 rounded-lg">
            <div className="font-semibold text-orange-400">Carbs</div>
            <div>{nutriments.carbohydrates}g</div>
            {!allZero && <div className="text-sm text-muted-foreground">{carbsPercentage}%</div>}
          </div>
          <div className="bg-muted p-3 rounded-lg">
            <div className="font-semibold text-green-500">Protein</div>
            <div>{nutriments.proteins}g</div>
            {!allZero && <div className="text-sm text-muted-foreground">{proteinPercentage}%</div>}
          </div>
        </div>
      </div>
    </Card>
  );
}