"use server";
import { db } from "@/db";
import { favouritePlans, workoutExercises, workoutPlans } from "@/db/schema";
import { SavePlansInput, savePlansSchema } from "@/lib/zod/savePlans";
import { randomUUID } from "crypto";
import { getAuth } from "../get";
import { and, eq } from "drizzle-orm";
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
    const data = savePlansSchema.parse(unsafeData);
    console.log(data)
    console.log("Saving Plan:", data);
    const randomId = randomUUID();
    const plans = await db
      .insert(workoutPlans)
      .values({
        planId: randomId,
        planName: data.name,
        nutrition: data.nutrition,
        progression: data.progression,
        numberOfDays: data.numberOfDays,
        safety: data.safety,
        showPublic: data.isPublic,
        description: data.description,
        userId: user.id,
      })
      .returning();
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
export async function toggleFavouritePlans(id: string, liked: boolean) {
  try {
    const authData = await getAuth();
    if (!authData) {
      return {
        error: "Unauthorized user",
      };
    }
    const { user } = authData;
    console.log(liked);
    if (liked) {
      await db
        .delete(favouritePlans)
        .where(
          and(
            eq(favouritePlans.planId, id),
            eq(favouritePlans.userId, user.id)
          )
        );
    } else {
      await db.insert(favouritePlans).values({
        planId: id,
        userId: user.id,
      });
    }
    return {
      error: null,
    };
  } catch (error) {
    return{
      error:"Internal server error occured"
    }
  }
}
