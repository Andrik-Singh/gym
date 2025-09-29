"use client"
import type { AiData } from "./MealPlanForm";
import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Clock,
  Users,
  Target,
  Flame,
  Beef,
  Wheat,
  Droplets,
} from "lucide-react";
import { Button } from "./ui/button";
import { useTransition } from "react";
import { saveMeals } from "@/lib/server/mealPlans/post";
import { useRouter } from "next/navigation";

const MealPlanReview = ({ data ,setComplete}: { data: AiData  | null ,setComplete?:React.Dispatch<React.SetStateAction<boolean>>}) => {
  const router=useRouter()
  const[isSaving,startTransition]=useTransition()
  if (!data) {
    return (
      <div className="flex items-center justify-center w-full min-h-[200px] text-muted-foreground">
        <div className="text-center">
          <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg">No meal plan data found</p>
          <p className="text-sm">
            Please complete the previous steps to generate your meal plan.
          </p>
        </div>
      </div>
    );
  }

  const {
    meals,
    mealPlanName,
    mealPlanType,
    description,
    tags,
    totalCalories,
    totalCarbs,
    totalFats,
    totalProtein,
    numberOfMealsInADay,
  } = data;
  if(isSaving){
    return(
      <div>
        Saving
      </div>
    )
  }
  return (
    <div className="max-w-4xl mx-auto space-y-8 p-6">
      <div className="text-center space-y-4 p-8 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100">
        <h1 className="text-3xl font-bold text-emerald-900 text-balance">
          {mealPlanName}
        </h1>
        {description && (
          <p className="text-emerald-700 text-lg max-w-2xl mx-auto text-pretty">
            {description}
          </p>
        )}
      </div>

      <Card className="border-emerald-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-900">
            <Target className="h-5 w-5" />
            Meal Plan Type
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {mealPlanType.map((planType: string, index: number) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 px-4 py-2 text-sm font-medium"
              >
                {planType
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-emerald-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-900">
            <Users className="h-5 w-5" />
            Dietary Preferences
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {tags.map((tag: string, index: number) => (
              <Badge
                key={index}
                variant="outline"
                className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 px-4 py-2 text-sm"
              >
                {tag
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-emerald-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-900">
            <Flame className="h-5 w-5" />
            Daily Nutrition Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <Flame className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-medium text-orange-800">
                  Calories
                </span>
              </div>
              <p className="text-2xl font-bold text-orange-900">
                {totalCalories}
              </p>
              <p className="text-xs text-orange-600">kcal</p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-xl border border-red-200">
              <div className="flex items-center gap-2 mb-2">
                <Beef className="h-4 w-4 text-red-600" />
                <span className="text-sm font-medium text-red-800">
                  Protein
                </span>
              </div>
              <p className="text-2xl font-bold text-red-900">{totalProtein}</p>
              <p className="text-xs text-red-600">grams</p>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-xl border border-amber-200">
              <div className="flex items-center gap-2 mb-2">
                <Wheat className="h-4 w-4 text-amber-600" />
                <span className="text-sm font-medium text-amber-800">
                  Carbs
                </span>
              </div>
              <p className="text-2xl font-bold text-amber-900">{totalCarbs}</p>
              <p className="text-xs text-amber-600">grams</p>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-xl border border-yellow-200">
              <div className="flex items-center gap-2 mb-2">
                <Droplets className="h-4 w-4 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-800">
                  Fats
                </span>
              </div>
              <p className="text-2xl font-bold text-yellow-900">{totalFats}</p>
              <p className="text-xs text-yellow-600">grams</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-emerald-900 flex items-center gap-2">
          <Clock className="h-6 w-6" />
          Daily Meal Plan ({numberOfMealsInADay} meals)
        </h2>

        <div className="grid gap-6">
          {meals.map(
            (
              meal: {
                MealTime: string;
                ingredients: string[];
                instructions: string;
                macronutrients: Record<string, number>;
                mealName: string;
              },
              index: number
            ) => (
              <Card
                key={index}
                className="border-emerald-100 hover:shadow-lg transition-shadow"
              >
                <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-emerald-900">
                      {meal.mealName}
                    </CardTitle>
                    <Badge
                      variant="secondary"
                      className="bg-emerald-100 text-emerald-800"
                    >
                      {meal.MealTime}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  <div>
                    <h4 className="font-semibold text-emerald-900 mb-3 flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Ingredients
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {meal.ingredients.map(
                        (ingredient: string, idx: number) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 p-2 bg-emerald-50 rounded-lg"
                          >
                            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                            <span className="text-sm text-emerald-800">
                              {ingredient}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-emerald-900 mb-3 flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Instructions
                    </h4>
                    <p className="text-emerald-700 leading-relaxed bg-emerald-50 p-4 rounded-lg">
                      {meal.instructions}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-emerald-900 mb-3 flex items-center gap-2">
                      <Flame className="h-4 w-4" />
                      Nutrition Facts
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {Object.entries(meal.macronutrients).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="bg-white border border-emerald-100 p-3 rounded-lg text-center"
                          >
                            <p className="text-xs text-emerald-600 uppercase tracking-wide font-medium">
                              {key.replace(/([A-Z])/g, " $1").trim()}
                            </p>
                            <p className="text-lg font-bold text-emerald-900">
                              {value}
                            </p>
                            <p className="text-xs text-emerald-500">
                              {key.toLowerCase().includes("calorie")
                                ? "kcal"
                                : "g"}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          )}
        </div>
      </div>
      {setComplete &&
        <footer className="fixed bottom-10 right-10 flex items-center gap-5 ">
          <Button onClick={()=>{
            setComplete(false)
          }}>Edit</Button>
          <Button
          onClick={()=>{
            startTransition(async()=>{
             const res= await saveMeals(data)
             if(res.success){
              router.push("/dashboard/meal-plan")
             }
            })
          }}
          >Save</Button>
        </footer>
      }
    </div>
  );
};

export default MealPlanReview;
