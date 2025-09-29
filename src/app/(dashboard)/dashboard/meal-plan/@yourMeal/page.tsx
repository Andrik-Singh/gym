import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getMealByUser } from "@/lib/server/mealPlans/get";
import { MealPlanType } from "@/lib/types";
import { Calendar, MedalIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const page = async () => {
  const res = await getMealByUser();
  if (!res || !res.data) redirect("/login");

  return (
    <div className="bg-amber-50">
      {res?.data?.length == 0 && (
        <>
          <div className="flex flex-col items-center justify-center p-6 text-center space-y-4 rounded-xl border border-dashed border-gray-300 bg-gray-50">
            <p className="text-lg font-medium text-gray-700">
              No meal plan found
            </p>
            <p className="text-sm text-gray-500">
              You don’t have any meal plans yet. Start by creating one to track
              your meals.
            </p>
            <Link
              href="/dashboard/create-meal-plan"
              className="px-4 py-2 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors"
            >
              + Create Meal Plan
            </Link>
          </div>
        </>
      )}
      <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
        {res?.data?.map((meal: MealPlanType, index) => {
          const mealPlanType = meal.mealPlanTypes.slice(1, -1).split(",");
          return (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/50 backdrop-blur-sm hover:bg-white/80"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                      <MedalIcon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold text-foreground group-hover:text-emerald-700 dark:text-emerald-200 transition-colors">
                        {meal.mealPlanName}
                      </CardTitle>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span className="font-medium">
                    {meal.numberOfMealsInADay} meals
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>
                    Created{" "}
                    {new Date(meal.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <CardDescription>{meal.description}</CardDescription>
                <div className="flex gap-5 items-center">
                  {meal.tags.map((badge: string) => (
                    <Badge key={badge}>{badge}</Badge>
                  ))}
                </div>
                <div className="flex gap-5 items-center">
                  {mealPlanType.map((badge: string) => (
                    <Badge variant={"secondary"} key={badge}>
                      {badge}
                    </Badge>
                  ))}
                </div>
                <div className="pt-2">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="w-full group-hover:bg-emerald-50 group-hover:border-emerald-200 bg-transparent dark:bg-gray-950 dark:hover:bg-emerald-800"
                  >
                    <Link href={`/dashboard/meal-plan/${meal.mealPlanId}`}>
                      View Plan
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default page;
