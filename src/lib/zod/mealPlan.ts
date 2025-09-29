import { error } from "console";
import z from "zod";
export const mealPlanSchema = z.object({
  mealPlanName: z
    .string()
    .min(3, { error: "Meal plan name should be at least 3 characters long" }),
  description: z
    .string()
    .min(10, { error: "Description should be at least 10 characters long" }),
  numberOfMealsInADay: z
    .number()
    .min(3, { error: "There should be at least 3 meals in a day" })
    .max(10, { error: "There can be at most 10 meals in a day" }),
  showPublic: z.boolean(),
  totalProtein: z
    .number()
    .min(20, { error: "Minimum 30 gm of protein is required" })
    .max(360, { error: "Maximum of 360 gm is too much" }),
  totalCalories: z
    .number()
    .min(1000, { error: "Minimum number of calories is 1000" }),
  totalCarbs: z
    .number()
    .min(20, { error: "Minimum 30 gm of carbs is required" })
    .max(360, { error: "Maximum of 360 gm is too much" }),
  totalFats: z
    .number()
    .min(20, { error: "Minimum 30 gm of fats is required" })
    .max(360, { error: "Maximum of 360 gm is too much" }),
  tags: z
    .array(
      z.enum([
        "weight_loss",
        "strength_gain",
        "muscle_building",
        "endurance",
        "flexibility",
      ])
    )
    .min(1, { error: "Choose at least one" }),
  mealPlanType: z.array(
    z.enum([
      "vegan",
      "vegetarian",
      "non_vegetarian",
      "keto",
      "paleo",
      "mediterranean",
      "low_carb",
      "high_protein",
    ])
  ).min(1,{error:"Choose one major Meal Plan Type"}),
});
export const MealSchema=z.object({
  MealTime:z.string(),
    ingredients:z.array(z.string()),
    instructions:z.string(),
    macronutrients:z.object({
      calories:z.number(),
      protein:z.number(),
      fats:z.number(),
      carbohydrates:z.number()
    }),
    mealName:z.string()
})
export const AiPlanSchema=mealPlanSchema.extend({
  meals:z.array(MealSchema)
})
export type MealPlanInputSchema = z.infer<typeof mealPlanSchema>;
export type AiPlanSchema = z.infer<typeof AiPlanSchema>;
