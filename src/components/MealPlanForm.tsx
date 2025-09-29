"use client";

import type React from "react";
import { FormProvider, Path, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { Progress } from "./ui/progress";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type MealPlanInputSchema, mealPlanSchema } from "@/lib/zod/mealPlan";
import {
  MealMacros,
  MealPlanTags,
  MealPlanType,
} from "./MealPlansStepComponent";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { getAiMealPlans } from "@/lib/server/mealPlans/get";
import MealPlanReview from "./MealPlanReview";

type FormData = MealPlanInputSchema;
export type MealPlan = {
  meals: {
    MealTime: string;
    ingredients: string[];
    instructions: string;
    macronutrients: Record<string, number>;
    mealName: string;
    videoUrl?:string | null
  }[];
};
export type AiData = FormData & MealPlan;

type Steps = {
  title: string;
  component: React.FC;
  fields: Path<FormData>[];
};

const steps: Steps[] = [
  {
    title: "Macros",
    component: MealMacros,
    fields: ["totalProtein", "totalCalories", "totalCarbs", "totalFats"],
  },
  { title: "Tags", component: MealPlanTags, fields: ["tags"] },
  { title: "MealType", component: MealPlanType, fields: ["mealPlanType"] },
];

const MealPlanForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [complete, setComplete] = useState(false);
  const [aiData, setAiData] = useState<AiData | null>(null);

  const methods = useForm<FormData>({
    resolver: zodResolver(mealPlanSchema),
    mode: "onChange",
    defaultValues: {
      mealPlanName: "",
      description: "",
      numberOfMealsInADay: 1,
      tags: [],
      showPublic: false,
    },
  });

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    trigger,
    setValue,
    watch,
  } = methods;

  const onSubmit = async (unsafeData: FormData) => {
    try {
      console.log("Form data:", unsafeData);
      setError("root", { message: "" });
      const response = await getAiMealPlans(unsafeData);
      console.log("API Response:", response);

      if (!response.success) {
        const errorMessage =
          response.error?.message || "Failed to generate meal plan";
        setError("root", { message: errorMessage });
        return;
      }
      if (!response.data) {
        setError("root", { message: "No meal plan data received" });
        return;
      }

      setAiData(response.data);
      setComplete(true);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      setError("root", { message: errorMessage });
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const nextStep = async () => {
    const isValid = await trigger(steps[currentStep].fields);
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;
  const CurrentStepComponent = steps[currentStep].component;
  const isLastStep = currentStep === steps.length - 1;

  const [
    totalCalories,
    totalCarbs,
    totalProtein,
    totalFats,
    tags,
    numberOfMealsInADay,
    mealPlanType,
  ] = watch([
    "totalCalories",
    "totalCarbs",
    "totalProtein",
    "totalFats",
    "tags",
    "numberOfMealsInADay",
    "mealPlanType",
  ]);
  useEffect(() => {
    setValue(
      "description",
      `This is a meal plan which has ${totalCalories || 0} calories, ${
        totalCarbs || 0
      } gm carbs, ${totalProtein || 0} gm protein, ${
        totalFats || 0
      } gm fats. It is for people with ${
        tags.join(",").replaceAll("_", " ") || "no tags"
      }. ${numberOfMealsInADay || 1} meals in one day. Types: ${
        mealPlanType || "none"
      }.`
    );
  }, [
    totalCalories,
    totalCarbs,
    totalProtein,
    totalFats,
    tags,
    numberOfMealsInADay,
    mealPlanType,
    setValue,
  ]);
  useEffect(() => {
    const beforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", beforeUnload);
    return () => {
      window.removeEventListener("beforeunload", beforeUnload);
    };
  }, [isDirty]);
  useEffect(() => {
    const beforeUnload = () => {
      if (isDirty) {
        return !window.confirm("You haven't submitted the form. Leave anyway?");
      }
      return true;
    };
    window.addEventListener("popstate", beforeUnload);
    return () => {
      window.removeEventListener("popstate", beforeUnload);
    };
  }, [isDirty]);

  if (complete) {
    return (
      <FormProvider {...methods}>
        <MealPlanReview data={aiData} setComplete={setComplete} />;
      </FormProvider>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 ">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-balance">
            Fitness Plan Builder
          </h1>
          <p className="text-muted-foreground text-pretty">
            Create your personalized workout plan in just a few steps
          </p>
        </div>
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />

          <div className="flex justify-between mt-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex flex-col items-center space-y-1 ${
                  index <= currentStep
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                    index < currentStep
                      ? "bg-primary text-primary-foreground"
                      : index === currentStep
                      ? "bg-primary/20 text-primary border-2 border-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {index < currentStep ? "✓" : index + 1}
                </div>
                <span className="text-xs font-medium hidden sm:block">
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <CurrentStepComponent />
            {Object.keys(errors).length > 0 && (
              <div className="max-w-2xl mx-auto">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="text-red-800 font-medium mb-2">
                    Please fix the following errors:
                  </h3>
                  <ul className="text-red-700 text-sm space-y-1">
                    {Object.entries(errors).map(([field, error]) => (
                      <li key={field}>
                        • {field}: {error?.message || "This field is required"}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {errors.root && (
              <div className="max-w-2xl mx-auto">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="text-red-800 font-medium mb-2">
                    Error generating workout plan:
                  </h3>
                  <p className="text-red-700 text-sm">{errors?.root.message}</p>
                </div>
              </div>
            )}
            <div className="flex justify-between max-w-2xl mx-auto">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0 || isSubmitting}
                className="flex items-center gap-2 bg-transparent"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>

              {isLastStep ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button type="button">Open Dialog</Button>
                  </DialogTrigger>
                  <DialogContent className={isSubmitting ? "opacity-50" : ""}>
                    <DialogHeader>
                      <DialogTitle>Enter your details</DialogTitle>
                    </DialogHeader>
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="grid gap-4"
                    >
                      <div className="grid gap-3">
                        <Label htmlFor="mealPlanName">Name</Label>
                        <Input id="mealPlanName" {...register("mealPlanName")} />
                      </div>

                      <div className="grid gap-3">
                        <Label htmlFor="meals">Number of meals in a day</Label>
                        <Input
                          id="meals"
                          min={1}
                          max={7}
                          {...register("numberOfMealsInADay", {
                            setValueAs: (value) => Number(value),
                          })}
                          type="number"
                        />
                        {errors.numberOfMealsInADay && (
                          <p>{errors.numberOfMealsInADay.message}</p>
                        )}
                      </div>

                      <div className="flex gap-3">
                        <Checkbox 
                        onCheckedChange={(check:boolean)=>{
                          console.log(check)
                          setValue("showPublic",check)
                        }}
                        />
                        <Label htmlFor="show">
                          Tick this to show it in public
                        </Label>
                      </div>

                      <div className="grid gap-3">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" {...register("description")} />
                      </div>

                      <DialogFooter>
                        <DialogClose asChild>
                          <Button
                            disabled={isSubmitting}
                            type="button"
                            variant="outline"
                          >
                            Cancel
                          </Button>
                        </DialogClose>
                        <Button disabled={isSubmitting} type="submit">
                          Save changes
                        </Button>
                      </DialogFooter>
                    </form>

                    {errors.root && (
                      <DialogDescription>{errors.root.message}</DialogDescription>
                    )}
                  </DialogContent>
                </Dialog>
              ) : (
                <Button
                  type="button"
                  disabled={isSubmitting}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    nextStep();
                  }}
                  className="flex items-center gap-2"
                >
                  {isSubmitting ? "Processing..." : "Next"}
                  <ChevronRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default MealPlanForm;
