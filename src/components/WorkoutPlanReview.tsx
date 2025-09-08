"use client";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { Target } from "lucide-react";
import WorkoutCard from "./WorkoutCard";
import { Button } from "./ui/button";
import SaveForm from "./SaveForm";
import { useStore } from "@/lib/zustand/context";
export const workingDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const WorkoutPlanReview = ({
  workoutPlan,
  setIsComplete,
}: {
  workoutPlan: {
    plan: {
      day: string;
      exercises: {
        name: string;
        sets: number | null;
        reps: string | null;
        rest: string | null;
      }[];
    }[];
    progression: string;
    safety: string;
    nutrition: string;
  };
  setIsComplete?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { numberOfDays } = useStore((state) => state);
  const [isDirty, setIsDirty] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  console.log(numberOfDays);
  useEffect(() => {
    const handleBeforeUnload = (e:BeforeUnloadEvent) => {
      if (submitting || isDirty) {
        e.preventDefault();
        e.returnValue = "";
        return "Are you sure you want to leave? Your changes may not be saved.";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty, submitting]);
  useEffect(() => {
    const handlePopState = () => {
      if (submitting || isDirty) {
        if (
          !window.confirm(
            "Are you sure you want to leave? Your changes may not be saved."
          )
        ) {
          window.history.pushState(null, "", window.location.pathname);
          return false;
        }
      }
      return true;
    };
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [submitting, isDirty, router]);
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8 relative">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Target className="h-8 w-8 text-emerald-600" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
            Weekly Workout Plan
          </h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Your personalized AI-generated workout schedule designed to maximize
          your fitness goals
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {workoutPlan?.plan.map((dayPlan, index) => (
          <WorkoutCard
            dayPlan={dayPlan}
            index={index}
            key={index}
          ></WorkoutCard>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <div className="text-center p-4 rounded-lg bg-white/50 backdrop-blur-sm">
          <div className="text-2xl font-bold text-emerald-600">
            {numberOfDays || 0}
          </div>
          <div className="text-sm text-muted-foreground">Workout Days</div>
        </div>
        <div className="text-center p-4 rounded-lg bg-white/50 backdrop-blur-sm">
          <div className="text-2xl font-bold text-emerald-600">
            {workoutPlan?.plan.reduce(
              (total, day) => total + day.exercises.length,
              0
            ) || 0}
          </div>
          <div className="text-sm text-muted-foreground">Total Exercises</div>
        </div>
        <div className="text-center p-4 rounded-lg bg-white/50 backdrop-blur-sm">
          <div className="text-2xl font-bold text-emerald-600">
            {Math.round(
              (workoutPlan?.plan.reduce(
                (total, day) => total + day.exercises.length,
                0
              ) || 0) /
                (workoutPlan?.plan.filter((plan) => {
                  if (plan.exercises.length > 1) return true;
                }).length || 1)
            )}
          </div>
          <div className="text-sm text-muted-foreground">Avg per Day</div>
        </div>
        <div className="text-center p-4 rounded-lg bg-white/50 backdrop-blur-sm">
          <div className="text-2xl font-bold text-emerald-600">AI</div>
          <div className="text-sm text-muted-foreground">Powered</div>
        </div>
      </div>
      {setIsComplete && (
        <div className="fixed bottom-4 right-4 flex items-center gap-4 z-10">
          <Button
            onClick={() => setIsComplete(false)}
            variant="outline"
            className="bg-white/90 backdrop-blur-sm border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all duration-300 shadow-lg"
          >
            Edit more
          </Button>
          <SaveForm workoutPlan={workoutPlan} />
        </div>
      )}
    </div>
  );
};

export default WorkoutPlanReview;
