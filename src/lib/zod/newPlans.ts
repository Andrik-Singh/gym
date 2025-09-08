import { z } from "zod";

export const workoutPlanSchema = z.object({
  age: z.number().min(13, { message: "Minimum age is 13" }).max(80, { message: "Maximum age is 80" }),
  gender: z.enum(["male", "female", "other"], { 
    message: "Please select a gender"
  }),
  height: z.number()
    .min(100, { message: "Minimum height must be 100cm" })
    .max(250, { message: "Maximum height must be 250cm" }), 
  weight: z.number()
    .min(30, { message: "Minimum weight must be 30kg" })
    .max(400, { message: "Maximum weight must be 400kg" }),  
  healthGoals: z.array(z.string())
    .min(1, { message: "Please select at least one health goal" }),
  goal: z.enum(["muscle_gain", "fat_loss", "strength", "endurance", "general"], {
    message: "Please select a primary goal"
  }),
  experience: z.enum(["beginner", "intermediate", "advanced"], {
    message: "Please select your experience level" 
  }),
  daysPerWeek: z.number()
    .min(3, { message: "Minimum 3 days required" })
    .max(7, { message: "There are only 7 days in a week" }),
  sessionDuration: z.number()
    .min(20, { message: "Minimum session duration is 20 minutes" })
    .max(180, { message: "Maximum session time is 3 hours" }), 
  equipment: z.array(
    z.enum(["none", "dumbbells", "barbell", "bands", "machines"])
  ).min(1, { message: "Please select at least one equipment option" }),
  injuries: z.string().optional(),
});

export type WorkoutPlanInput = z.infer<typeof workoutPlanSchema>;