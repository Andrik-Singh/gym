"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import {
  Clock,
  Users,
  Target,
  Flame,
  Beef,
  Wheat,
  ChefHat,
  Play,
  Heart,
  Share2,
  BookOpen,
} from "lucide-react";
import { useState, useTransition } from "react";
import { toggleEffect } from "@/lib/server/mealPlans/post";
import SaveButton from "./SaveButton";
import ShareButton from "./ShareButton";

interface MealPlan {
  mealPlanId: string;
  userId: string;
  createdAt: Date | string;
  showPublic: boolean;
  description: string;
  mealPlanName: string;
  numberOfMealsInADay: number;
  tags: string[];
  totalProtein: number;
  totalCarbs: number;
  totalFats: number;
  totalCalories: number;
  mealPlanTypes: string;
  meals: Array<{
    MealTime: string;
    ingredients: string[];
    instructions: string;
    macronutrients: {
      calories: number;
      protein: number;
      carbs: number;
      fats: number;
    };
    mealName: string;
    videoUrl: string | null;
  }>;
}
const tagLabels: Record<
  string,
  { label: string; icon: string; color: string }
> = {
  weight_loss: {
    label: "Weight Loss",
    icon: "🔥",
    color: "bg-red-100 text-red-800 border-red-200",
  },
  muscle_building: {
    label: "Muscle Building",
    icon: "💪",
    color: "bg-blue-100 text-blue-800 border-blue-200",
  },
  maintenance: {
    label: "Maintenance",
    icon: "⚖️",
    color: "bg-green-100 text-green-800 border-green-200",
  },
  bulking: {
    label: "Bulking",
    icon: "📈",
    color: "bg-purple-100 text-purple-800 border-purple-200",
  },
};

const dietTypeLabels: Record<
  string,
  { label: string; icon: string; color: string }
> = {
  paleo: {
    label: "Paleo",
    icon: "🥩",
    color: "bg-orange-100 text-orange-800 border-orange-200",
  },
  keto: {
    label: "Keto",
    icon: "🥑",
    color: "bg-emerald-100 text-emerald-800 border-emerald-200",
  },
  vegan: {
    label: "Vegan",
    icon: "🌱",
    color: "bg-green-100 text-green-800 border-green-200",
  },
  mediterranean: {
    label: "Mediterranean",
    icon: "🫒",
    color: "bg-blue-100 text-blue-800 border-blue-200",
  },
};

export default function MealPlanDisplay({ mealPlan ,hasLiked}: { mealPlan: MealPlan ,hasLiked:boolean}) {
  const [Liked, setLiked] = useState<boolean>(hasLiked);
  const [isSaving,setIsSaving]=useTransition()
  console.log(Liked)
  const macroData = [
    {
      name: "Protein",
      value: mealPlan.totalProtein,
      color: "#ef4444",
      percentage: Math.round(
        ((mealPlan.totalProtein * 4) / mealPlan.totalCalories) * 100
      ),
    },
    {
      name: "Carbs",
      value: mealPlan.totalCarbs,
      color: "#3b82f6",
      percentage: Math.round(
        ((mealPlan.totalCarbs * 4) / mealPlan.totalCalories) * 100
      ),
    },
    {
      name: "Fats",
      value: mealPlan.totalFats,
      color: "#f59e0b",
      percentage: Math.round(
        ((mealPlan.totalFats * 9) / mealPlan.totalCalories) * 100
      ),
    },
  ];

  const dietTypes = mealPlan.mealPlanTypes
    .replace(/[{}]/g, "")
    .split(",")
    .map((type) => type.trim());

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 p-8 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                {mealPlan.mealPlanName}
              </h1>
              <p className="text-emerald-100 text-lg max-w-2xl">
                {mealPlan.description}
              </p>
            </div>
            <div className="flex gap-2">
              <SaveButton id={mealPlan.mealPlanId} hasLiked={hasLiked} meal={true}/>
              <ShareButton/>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <Flame className="w-5 h-5 text-orange-300" />
                <span className="text-sm font-medium text-emerald-100">
                  Total Calories
                </span>
              </div>
              <div className="text-2xl font-bold">{mealPlan.totalCalories}</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-blue-300" />
                <span className="text-sm font-medium text-emerald-100">
                  Meals per Day
                </span>
              </div>
              <div className="text-2xl font-bold">
                {mealPlan.numberOfMealsInADay}
              </div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-green-300" />
                <span className="text-sm font-medium text-emerald-100">
                  Goals
                </span>
              </div>
              <div className="text-sm font-medium">
                {mealPlan.tags.length} Active
              </div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <ChefHat className="w-5 h-5 text-purple-300" />
                <span className="text-sm font-medium text-emerald-100">
                  Diet Types
                </span>
              </div>
              <div className="text-sm font-medium">
                {dietTypes.length} Types
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-600" />
              Fitness Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {mealPlan.tags.map((tag) => {
                const tagInfo = tagLabels[tag] || {
                  label: tag,
                  icon: "🎯",
                  color: "bg-gray-100 text-gray-800 border-gray-200",
                };
                return (
                  <Badge
                    key={tag}
                    variant="outline"
                    className={`${tagInfo.color} px-3 py-1`}
                  >
                    <span className="mr-2">{tagInfo.icon}</span>
                    {tagInfo.label}
                  </Badge>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ChefHat className="w-5 h-5 text-emerald-600" />
              Diet Types
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {dietTypes.map((type) => {
                const typeInfo = dietTypeLabels[type] || {
                  label: type,
                  icon: "🍽️",
                  color: "bg-gray-100 text-gray-800 border-gray-200",
                };
                return (
                  <Badge
                    key={type}
                    variant="outline"
                    className={`${typeInfo.color} px-3 py-1`}
                  >
                    <span className="mr-2">{typeInfo.icon}</span>
                    {typeInfo.label}
                  </Badge>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-600" />
            Macronutrient Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              {macroData.map((macro) => (
                <div
                  key={macro.name}
                  className="flex items-center justify-between p-4 rounded-lg border"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: macro.color }}
                    ></div>
                    <div>
                      <div className="font-medium">{macro.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {macro.percentage}% of calories
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg">{macro.value}g</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={macroData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {macroData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number, name: string) => [
                      `${value}g`,
                      name,
                    ]}
                    labelStyle={{ color: "#374151" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-emerald-600" />
          <h2 className="text-2xl font-bold">Daily Meals</h2>
        </div>

        <div className="grid gap-6">
          {mealPlan.meals.map((meal, index) => {
            
            return (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl text-emerald-800">
                        {meal.mealName}
                      </CardTitle>
                      <p className="text-emerald-600 font-medium">
                        Meal {index + 1}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-emerald-700">
                          {meal.macronutrients.calories}
                        </div>
                        <div className="text-sm text-emerald-600">calories</div>
                      </div>
                      {meal.videoUrl && (
                        <Button
                          size="sm"
                          className="bg-emerald-600 hover:bg-emerald-700"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Watch
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid lg:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Wheat className="w-4 h-4 text-emerald-600" />
                        Ingredients
                      </h4>
                      <ul className="space-y-2">
                        {meal.ingredients.map((ingredient, idx) => (
                          <li
                            key={idx}
                            className="text-sm flex items-start gap-2"
                          >
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></span>
                            {ingredient}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <ChefHat className="w-4 h-4 text-emerald-600" />
                        Instructions
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {meal.instructions}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Beef className="w-4 h-4 text-red-600" />
                        Protein Focus
                      </h4>
                      <div className="space-y-3">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-red-600">
                              {meal.macronutrients.protein}g
                            </div>
                            <div className="text-sm text-red-500">Protein</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="bg-blue-50 border border-blue-200 rounded p-2 text-center">
                            <div className="font-semibold text-blue-600">
                              {meal.macronutrients.carbs}g
                            </div>
                            <div className="text-blue-500">Carbs</div>
                          </div>
                          <div className="bg-orange-50 border border-orange-200 rounded p-2 text-center">
                            <div className="font-semibold text-orange-600">
                              {meal.macronutrients.fats}g
                            </div>
                            <div className="text-orange-500">Fats</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
