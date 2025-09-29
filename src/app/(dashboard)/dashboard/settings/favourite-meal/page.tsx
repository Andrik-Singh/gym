import { favoutiteMeals } from "@/lib/server/mealPlans/get";
import { notFound } from "next/navigation";
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import EmptyMealCard from "@/components/Empty-Meal-Card";
const page = async () => {
  const res = await favoutiteMeals();
  if (!res || !res.data) notFound();
  if (res.data.length === 0) {
  return (
   <EmptyMealCard/>
  );
}

  const grouped = Object.values(
    res.data.reduce((acc, curr) => {
      const type = curr.mealPlanType.mealPlanId;

      if (!acc[type]) {
        acc[type] = [];
      }

      acc[type].push(curr);

      return acc;
    }, {} as Record<string, typeof res.data>)
  );
  console.log(grouped);
  const newGrouped = grouped.map((data) => {
    const { mealPlan } = data[0];
    const newType = {
      mealPlan,
      type: [] as string[],
    };
    for (const type of data) {
      newType.type.push(type.mealPlanType.mealPlanType);
    }
    return newType;
  });
  console.log(newGrouped);
  return (
    <div className="md:pl-20 md:pr-10 px-5 grid gap-5 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-5 dark:text-secondary" >
      {newGrouped.map((data) => (
        <Card key={data.mealPlan.mealPlanId} className="w-full max-w-lg rounded-2xl shadow-md bg-white hover:scale-105 hover:bg-emerald-300 transition-all dark:bg-black dark:hover:bg-amber-950">
          <CardHeader>
            <CardTitle className="text-xl font-bold">
              {data.mealPlan.mealPlanName}
            </CardTitle>
            <p className="text-sm text-gray-500">
              {new Date(data.mealPlan.createdAt).toLocaleDateString()} •{" "}
              {data.mealPlan.numberOfMealsInADay} meals/day
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {data.mealPlan.tags.map((tag: string) => (
                <Badge key={tag} variant="secondary" className="capitalize">
                  {tag.replace("_", " ")}
                </Badge>
              ))}
              {data.type.map((t: string) => (
                <Badge key={t} className="bg-emerald-500 text-white capitalize">
                  {t}
                </Badge>
              ))}
            </div>
            <div className="text-lg font-semibold text-emerald-600">
              {data.mealPlan.totalCalories} kcal
            </div>
            <div className="space-y-3">
              <MacroBar
                label="Protein"
                value={data.mealPlan.totalProtein}
                max={data.mealPlan.totalProtein+data.mealPlan.totalCarbs+data.mealPlan.totalFats}
                color="bg-rose-500"
              />
              <MacroBar
                label="Carbs"
                value={data.mealPlan.totalCarbs}
                max={data.mealPlan.totalProtein+data.mealPlan.totalCarbs+data.mealPlan.totalFats}
                color="bg-yellow-500"
              />
              <MacroBar
                label="Fats"
                value={data.mealPlan.totalFats}
                max={data.mealPlan.totalProtein+data.mealPlan.totalCarbs+data.mealPlan.totalFats}
                color="bg-blue-500"
              />
            </div>
            <p className="text-sm text-gray-600 leading-relaxed dark:text-gray-100">
              {data.mealPlan.description}
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href={`/dashboard/meal-plan/${data.mealPlan.mealPlanId}`}>
                See full Details
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
function MacroBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const percent = Math.min((value / max) * 100, 100);
  return (
    <div>
      <div className="flex justify-between text-sm font-medium mb-1">
        <span>{label}</span>
        <span>{value}g</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-2 ${color}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
export default page;
