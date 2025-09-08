"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  PersonalStep,
  GoalsStep,
  HealthGoalStep,
  ScheduleStep,
  EquipmentStep,
  InjuryStep,
} from "./StepComponents";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { WorkoutPlanInput, workoutPlanSchema } from "@/lib/zod/newPlans";
import WorkoutPlanReview from "./WorkoutPlanReview";
import { getAiAdvice } from "@/lib/server/plans/get";
import { useStore } from "@/lib/zustand/context";

type Exercise = {
  name: string;
  sets: number | null;
  reps: string | null; 
  rest: string | null;
};

type PlanDay = {
  day: string;
  exercises: Exercise[];
};

export type WorkoutPlan = {
  plan: PlanDay[];
  progression: string;
  safety: string;
  nutrition: string;
};

const steps = [
  { title: "Personal Info", component: PersonalStep },
  { title: "Goals", component: GoalsStep },
  { title: "Health Goals", component: HealthGoalStep },
  { title: "Schedule", component: ScheduleStep },
  { title: "Equipment", component: EquipmentStep },
  { title: "Health", component: InjuryStep },
];

export default function FitnessFormPage() {
  const { setNumberOfDays } = useStore((state)=> state)
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [submitError, setSubmitError] = useState<string | null>(null); 
  const [aiPlans, setAiPlans] = useState<WorkoutPlan>({
    plan: [],
    progression: "",
    safety: "",
    nutrition: "",
  });

  const methods = useForm<WorkoutPlanInput>({
    defaultValues: {
      equipment: [],
      healthGoals: [],
      injuries: "",
    },
    resolver: zodResolver(workoutPlanSchema),
    mode: "onChange", 
  });

  const {
    handleSubmit,
    trigger,
    formState: { errors },
    
  } = methods;

  const nextStep = async () => {
    let fieldsToValidate: (keyof WorkoutPlanInput)[] = [];

    switch (currentStep) {
      case 0:
        fieldsToValidate = ["age", "height", "weight", "gender"];
        break;
      case 1:
        fieldsToValidate = ["goal", "experience"];
        break;
      case 2:
        fieldsToValidate = ["healthGoals"];
        break;
      case 3:
        fieldsToValidate = ["daysPerWeek", "sessionDuration"];
        break;
      case 4:
        fieldsToValidate = ["equipment"];
        break;
      case 5:
        fieldsToValidate = ["injuries"];
        break;
    }

    const isValid = await trigger(fieldsToValidate);
    
    if (isValid) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
      setSubmitError(null); 
    } else {
      setIsSubmitting(true);
      setTimeout(() => setIsSubmitting(false), 100);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setSubmitError(null); 
    }
  };

  const onSubmit = async (data: WorkoutPlanInput) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      console.log("Form submitted:", data);
      const res = await getAiAdvice(data);
      console.log("AI response:", res);
      
      if (!res.success) {
        if (res.error) {
          setSubmitError(res.error.message || "Failed to generate workout plan");
        } else {
          setSubmitError("Unknown error occurred");
        }
        return; 
      }
      
      if (res.data) {
        setAiPlans(res.data);
        setIsComplete(true);
      } else {
        setSubmitError("No workout plan data received");
      }
      setNumberOfDays(data?.daysPerWeek)
    } catch (error) {
      console.error("Submit error:", error);
      setSubmitError(
        error instanceof Error 
          ? error.message 
          : "An unexpected error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;
  const CurrentStepComponent = steps[currentStep].component;
  const isLastStep = currentStep === steps.length - 1;

  if (isComplete) {
    return <WorkoutPlanReview setIsComplete={setIsComplete} workoutPlan={aiPlans} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
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
            {submitError && (
              <div className="max-w-2xl mx-auto">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="text-red-800 font-medium mb-2">
                    Error generating workout plan:
                  </h3>
                  <p className="text-red-700 text-sm">{submitError}</p>
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
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex items-center gap-2"
                >
                  {isSubmitting ? "Generating..." : "Complete Setup"}
                  <CheckCircle className="w-4 h-4" />
                </Button>
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
}