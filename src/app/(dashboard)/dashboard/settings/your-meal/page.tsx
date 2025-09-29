import { getMealByUser } from "@/lib/server/mealPlans/get";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";
import EmptyMealCard from "@/components/Empty-Meal-Card";
const page = async () => {
  const res = await getMealByUser();
  console.log(res);
  if (!res || !res.data) notFound();
  if(res.data.length === 0){
    return(
      <EmptyMealCard></EmptyMealCard>
    )
  }
  return (
    <div className="md:pl-20 md:pr-10 px-5 grid gap-5 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-5">
      {res?.data.map((data) => {
        const type=data.mealPlanTypes.slice(1,-1).split(",")
        return (
          <Card
            key={data.mealPlanId}
            className="w-full max-w-lg rounded-2xl shadow-md bg-white dark:bg-black"
          >
            <CardHeader>
              <CardTitle className="text-xl font-bold">
                {data.mealPlanName}
              </CardTitle>
              <p className="text-sm text-gray-500">
                {new Date(data.createdAt).toLocaleDateString()} •{" "}
                {data.numberOfMealsInADay} meals/day
              </p>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {data.tags.map((tag: string) => (
                  <Badge key={tag} variant="secondary" className="capitalize">
                    {tag.replace("_", " ")}
                  </Badge>
                ))}
                {type.map((t: string) => (
                  <Badge
                    key={t}
                    className="bg-emerald-500 text-white capitalize"
                  >
                    {t}
                  </Badge>
                ))}
              </div>
              <div className="text-lg font-semibold text-emerald-600">
                {data.totalCalories} kcal
              </div>
              <div className="space-y-3">
                <MacroBar
                  label="Protein"
                  value={data.totalProtein}
                  max={
                    data.totalProtein +
                    data.totalCarbs +
                    data.totalFats
                  }
                  color="bg-rose-500"
                />
                <MacroBar
                  label="Carbs"
                  value={data.totalCarbs}
                  max={
                    data.totalProtein +
                    data.totalCarbs +
                    data.totalFats
                  }
                  color="bg-yellow-500"
                />
                <MacroBar
                  label="Fats"
                  value={data.totalFats}
                  max={
                    data.totalProtein +
                    data.totalCarbs +
                    data.totalFats
                  }
                  color="bg-blue-500"
                />
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {data.description}
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href={`/dashboard/meal-plan/${data.mealPlanId}`}>
                  See full Details
                </Link>
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};
function MacroBar({
  label,
  value,
  max,
  color,
}: {
  label: string;
  value: number;
  max: number;
  color: string;
}) {
  const percent = Math.min((value / max) * 100, 100);
  return (
    <div>
      <div className="flex justify-between text-sm font-medium mb-1">
        <span>{label}</span>
        <span>{value}g</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className={`h-2 ${color}`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
export default page;
