"use client";
import type React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Save, Dumbbell, Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SavePlansInput, savePlansSchema } from "@/lib/zod/savePlans";
import { useStore } from "@/lib/zustand/context";
import { SavePlans } from "@/lib/server/plans/post";
import { useRouter } from "next/navigation";
interface WorkoutPlan {
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
}
const SaveForm = ({ workoutPlan }: { workoutPlan: WorkoutPlan }) => {
  const router=useRouter()
  const { numberOfDays }: { numberOfDays: number } = useStore((state) => state);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SavePlansInput>({
    defaultValues: {
      isPublic: false,
      safety: workoutPlan?.safety,
      nutrition: workoutPlan?.nutrition,
      progression: workoutPlan?.progression,
      numberOfDays: numberOfDays || 1,
    },
    resolver: zodResolver(savePlansSchema),
  });

  const onSubmit = async (unsafeData: SavePlansInput) => {
    const res= await SavePlans(unsafeData, workoutPlan?.plan);
    if(res.success){
      router.push("/dashboard/workout-plans")
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-lg hover:shadow-xl transition-all duration-300">
          <Save className="w-4 h-4 mr-2" />
          Save Plan
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
          <Dumbbell className="w-6 h-6 text-emerald-600" />
          Save Workout Plan
        </DialogTitle>
        <DialogDescription className="text-muted-foreground mb-6">
          Save your custom workout plan for future training sessions.
        </DialogDescription>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="plan-name" className="text-sm font-medium">
              Plan Name *
            </Label>
            <Input
              id="plan-name"
              type="text"
              {...register("name")}
              placeholder="e.g., Upper Body Strength"
              className="w-full"
            />
            {errors?.name && (
              <p className="text-red-500">{errors?.name?.message} </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Brief description of your workout plan..."
              {...register("description")}
              className="w-full min-h-[80px] resize-none"
            />
            {errors?.description && (
              <p className="text-red-500">{errors?.description?.message} </p>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <Checkbox 
            onCheckedChange={(check:boolean)=>{
              setValue("isPublic",check)
            }}
            id="public-plan" />
            <Label
              htmlFor="public-plan"
              className="text-sm font-medium cursor-pointer"
            >
              Make this plan public for others to use
            </Label>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              disabled={isSubmitting}
              type="submit"
              className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSubmitting ? (
                <div>
                  <Loader className="animate-spin"></Loader>
                  <p>Saving data</p>
                </div>
              ) : (
                "Save plan"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SaveForm;
