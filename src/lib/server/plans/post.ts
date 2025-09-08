"use server";
import { db } from "@/db";
import { workoutExercises, workoutPlans } from "@/db/schema";
import { SavePlansInput, savePlansSchema } from "@/lib/zod/savePlans";
import { randomUUID } from "crypto";
import { getAuth } from "../get";
export async function SavePlans(
  unsafeData: SavePlansInput,
  plan: {
    day: string;
    exercises: {
      name: string;
      sets: number | null;
      reps: string | null;
      rest: string | null;
    }[];
  }[]
) {
  try {
    const authData = await getAuth();

    if (!authData?.user) {
      return {
        error: "Unauthorized",
        success: false,
        data: null,
      };
    }

    const user = authData.user;
    console.log(user);
    if (!user) {
      return {
        error: "Unauthorized",
        success: false,
        data: null,
      };
    }
    const data = savePlansSchema.parse(unsafeData);
    console.log("Saving Plan:", data);
    console.log("exercises plan", plan);
    const randomId = randomUUID();
    const plans = await db
      .insert(workoutPlans)
      .values({
        planName: data.name,
        nutrition: data.nutrition,
        progression: data.progression,
        numberOfDays: data.numberOfDays,
        description: data.description,
        safety: data.safety,
        userId: user.id,
        planId: randomId,
      } as any)
      .returning();
    console.log("Plans:", plans[0]);
    for (let i = 0; i < plan.length; i++) {
      for (const exercise of plan[i].exercises) {
        const exercises = await db
          .insert(workoutExercises)
          .values({
            planId: randomId,
            exerciseId: randomUUID(),
            exerciseName: exercise.name,
            rest: exercise.rest,
            reps: exercise.reps,
            sets: exercise.sets,
            workDay: i + 1,
          })
          .returning();
        console.log(exercises);
      }
    }
    return {
      success: true,
      error: "",
      data: plans[0],
    };
  } catch (error) {
    console.error("Failed to parse data:", error);
    return {
      error: "Failed to save plan",
      success: false,
      data: null,
    };
  }
}
