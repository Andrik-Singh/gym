"use server";
import { db } from "@/db";
import { workoutExercises } from "@/db/schema";
import { eq } from "drizzle-orm";
type ExerciseItem = {
  exerciseId: string;
  exerciseName: string;
  sets: number | null;
  reps: string | null;
  rest: string | null;
};

type GroupedExercises = Record<
  number,
  {
    workDay: number;
    planId: string;
    exercises: ExerciseItem[];
  }
>;

export async function getExercises(planId: string) {
  try {
    const exercise = await db
      .select()
      .from(workoutExercises)
      .where(eq(workoutExercises.planId, planId));
    console.log(exercise);
    const groupedByDays = exercise.reduce((acc, curr) => {
      if (!curr.workDay || !curr.planId) return acc;
      const days = curr.workDay;
      if (!acc[days]) {
        acc[days] = {
          workDay: days,
          planId: curr.planId,
          exercises: [],
        };
      }
      acc[days].exercises.push({
        exerciseId: curr.exerciseId,
        exerciseName: curr.exerciseName,
        sets: curr.sets,
        reps: curr.reps,
        rest: curr.rest,
      });
      return acc;
    }, {} as GroupedExercises);
    return groupedByDays;
  } catch (error) {
    return error;
  }
}
