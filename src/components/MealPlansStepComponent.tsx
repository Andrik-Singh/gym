"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import {
  Flame,
  Zap,
  Beef,
  Wheat,
  Droplets,
} from "lucide-react";
import { Label } from "./ui/label";

export const MealMacros = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const totalCalories = watch("totalCalories");
  const totalProtein = watch("totalProtein");
  const totalCarbs = watch("totalCarbs");
  const totalFats = watch("totalFats");
  const calculatedCalories = totalProtein * 4 + totalCarbs * 4 + totalFats * 9;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
          <Flame className="w-6 h-6 text-emerald-600" />
          Nutrition Targets
        </h2>
        <p className="text-muted-foreground">
          Set your daily macro and calorie goals
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-emerald-200 hover:border-emerald-300 transition-colors">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Flame className="w-5 h-5 text-orange-500" />
              Total Calories
            </CardTitle>
            <CardDescription>Daily caloric intake target</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Input
                type="number"
                {...register("totalCalories", { valueAsNumber: true })}
                className="text-lg font-medium"
                placeholder="2000"
              />
              {calculatedCalories > 0 && (
                <p className="text-sm text-muted-foreground">
                  Calculated from macros: {Math.round(calculatedCalories)} cal
                  {Math.abs(calculatedCalories - totalCalories) > 50 && (
                    <span className="text-amber-600 ml-1">
                      ⚠️ Mismatch detected
                    </span>
                  )}
                </p>
              )}
              {errors.totalCalories && (
                <p className="text-sm text-red-600">
                  {errors.totalCalories.message as string}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
        <Card className="border-emerald-200 hover:border-emerald-300 transition-colors">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Beef className="w-5 h-5 text-red-500" />
              Protein
            </CardTitle>
            <CardDescription>Daily protein intake (grams)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Input
                type="number"
                {...register("totalProtein", { valueAsNumber: true })}
                className="text-lg font-medium"
                placeholder="150"
              />
              <div className="flex gap-2">
                <Badge variant="outline" className="text-xs">
                  4 cal/g
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {totalProtein * 4} cal
                </Badge>
              </div>
              {errors.totalProtein && (
                <p className="text-sm text-red-600">
                  {errors.totalProtein.message as string}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
        <Card className="border-emerald-200 hover:border-emerald-300 transition-colors">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Wheat className="w-5 h-5 text-amber-500" />
              Carbohydrates
            </CardTitle>
            <CardDescription>Daily carb intake (grams)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Input
                type="number"
                {...register("totalCarbs", { valueAsNumber: true })}
                className="text-lg font-medium"
                placeholder="200"
              />
              <div className="flex gap-2">
                <Badge variant="outline" className="text-xs">
                  4 cal/g
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {totalCarbs * 4} cal
                </Badge>
              </div>
              {errors.totalCarbs && (
                <p className="text-sm text-red-600">
                  {errors.totalCarbs.message as string}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
        <Card className="border-emerald-200 hover:border-emerald-300 transition-colors">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Droplets className="w-5 h-5 text-blue-500" />
              Fats
            </CardTitle>
            <CardDescription>Daily fat intake (grams)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Input
                type="number"
                {...register("totalFats", { valueAsNumber: true })}
                className="text-lg font-medium"
                placeholder="70"
              />
              <div className="flex gap-2">
                <Badge variant="outline" className="text-xs">
                  9 cal/g
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {totalFats * 9} cal
                </Badge>
              </div>
              {errors.totalFats && (
                <p className="text-sm text-red-600">
                  {errors.totalFats.message as string}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="border-emerald-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-emerald-600" />
            Macro Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-2">
              <div className="text-2xl font-bold text-red-500">
                {Math.round(((totalProtein * 4) / calculatedCalories) * 100) ||
                  0}
                %
              </div>
              <div className="text-sm text-muted-foreground">Protein</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-amber-500">
                {Math.round(((totalCarbs * 4) / calculatedCalories) * 100) || 0}
                %
              </div>
              <div className="text-sm text-muted-foreground">Carbs</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-blue-500">
                {Math.round(((totalFats * 9) / calculatedCalories) * 100) || 0}%
              </div>
              <div className="text-sm text-muted-foreground">Fats</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const MealPlanTags = () => {
  const {
    watch,
    setValue,
  } = useFormContext();
  const selectedTags = watch("tags") || [];

  const tagOptions = [
    {
      value: "weight_loss",
      label: "Weight Loss",
      icon: "🔥",
      color: "bg-red-100 text-red-800 border-red-200",
    },
    {
      value: "strength_gain",
      label: "Strength Gain",
      icon: "💪",
      color: "bg-blue-100 text-blue-800 border-blue-200",
    },
    {
      value: "muscle_building",
      label: "Muscle Building",
      icon: "🏋️",
      color: "bg-purple-100 text-purple-800 border-purple-200",
    },
    {
      value: "endurance",
      label: "Endurance",
      icon: "🏃",
      color: "bg-green-100 text-green-800 border-green-200",
    },
    {
      value: "flexibility",
      label: "Flexibility",
      icon: "🧘",
      color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    },
  ];
  const handleTagChange = (value: string, check: boolean) => {
    const current = selectedTags || [];
    if (check) {
      setValue("tags", [...current, value]);
    } else {
      setValue(
        "tags",
        current.filter((id: string) => id !== value)
      );
    }
  };
  return (
    <Card className="max-w-4xl mx-auto space-y-6">
      <CardHeader>
        <CardTitle>
          Select What you would want your meal prep to be focused on
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5 mb-5">
          {tagOptions.map((tag) => (
            <div
              key={tag.value}
              className="flex items-center space-x-4 p-3 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200 ease-in-out shadow-sm hover:shadow-md"
            >
              <Checkbox
                id={tag.value}
                checked={selectedTags?.includes(tag.value)}
                onCheckedChange={(checked: boolean) =>
                  handleTagChange(tag.value, checked)
                }
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 transition-colors duration-150"
                aria-label={`Toggle ${tag.label}`}
              />
              <Label
                htmlFor={tag.value}
                className="flex items-center gap-3 cursor-pointer flex-1 py-2"
              >
                <span className="text-xl text-gray-600 dark:text-gray-300">
                  {tag.icon}
                </span>
                <span className="text-base font-medium text-gray-900 dark:text-gray-100">
                  {tag.label}
                </span>
              </Label>
            </div>
          ))}
        </div>
        {selectedTags.length > 0 && (
          <Card className="border-emerald-200 bg-emerald-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium text-emerald-800">
                  Selected tags:
                </span>
                {selectedTags.map((tag: string) => {
                  const typeOption = tagOptions.find((t) => t.value === tag);
                  return (
                    <Badge key={tag} className="bg-emerald-600 text-white">
                      {typeOption?.icon} {typeOption?.label}
                    </Badge>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};

export const MealPlanType = () => {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const selectedTypes = watch("mealPlanType") || [];

  const typeOptions = [
    {
      value: "vegan",
      label: "Vegan",
      icon: "🌱",
      description: "Plant-based only",
    },
    {
      value: "vegetarian",
      label: "Vegetarian",
      icon: "🥗",
      description: "No meat, includes dairy",
    },
    {
      value: "non_vegetarian",
      label: "Non-Vegetarian",
      icon: "🍖",
      description: "Includes all foods",
    },
    {
      value: "keto",
      label: "Keto",
      icon: "🥑",
      description: "High fat, low carb",
    },
    {
      value: "paleo",
      label: "Paleo",
      icon: "🦴",
      description: "Whole foods, no processed",
    },
    {
      value: "mediterranean",
      label: "Mediterranean",
      icon: "🫒",
      description: "Heart-healthy fats",
    },
    {
      value: "low_carb",
      label: "Low Carb",
      icon: "🥩",
      description: "Reduced carbohydrates",
    },
    {
      value: "high_protein",
      label: "High Protein",
      icon: "💪",
      description: "Protein-focused meals",
    },
  ];
  const handlePlanChange = (value: string, check: boolean) => {
    const current = selectedTypes || [];
    if (check) {
      setValue("mealPlanType", [...current, value]);
    } else {
      setValue(
        "mealPlanType",
        current.filter((id: string) => id !== value)
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Meal Plan Type</h2>
        <p className="text-muted-foreground">
          Choose your dietary preferences and restrictions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {typeOptions.map((type) => (
          <div
            key={type.value}
            className="flex items-center space-x-4 p-3 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200 ease-in-out shadow-sm hover:shadow-md"
          >
            <Checkbox
              id={type.value}
              checked={selectedTypes?.includes(type.value)}
              onCheckedChange={(checked: boolean) =>
                handlePlanChange(type.value, checked)
              }
              className="h-5 w-5 text-blue-600 focus:ring-blue-500 transition-colors duration-150"
              aria-label={`Toggle ${type.label}`}
            />
            <Label
              htmlFor={type.value}
              className="flex items-center gap-3 cursor-pointer flex-1 py-2"
            >
              <span className="text-xl text-gray-600 dark:text-gray-300">
                {type.icon}
              </span>
              <span className="text-base font-medium text-gray-900 dark:text-gray-100">
                {type.label}
              </span>
            </Label>
          </div>
        ))}
      </div>

      {selectedTypes.length > 0 && (
        <Card className="border-emerald-200 bg-emerald-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-emerald-800">
                Selected types:
              </span>
              {selectedTypes.map((type: string) => {
                const typeOption = typeOptions.find((t) => t.value === type);
                return (
                  <Badge key={type} className="bg-emerald-600 text-white">
                    {typeOption?.icon} {typeOption?.label}
                  </Badge>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {errors.mealPlanType && (
        <div className="text-center">
          <p className="text-sm text-red-600">
            {errors.mealPlanType.message as string}
          </p>
        </div>
      )}
    </div>
  );
};
