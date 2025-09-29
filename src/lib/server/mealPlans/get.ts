"use server";

import { db } from "@/db";
import { getAuth } from "../get";
import { favouriteMealPlans, meal, mealPlan, mealPlanType } from "@/db/schema";
import { and, eq, or, sql } from "drizzle-orm";
import { AiPlanSchema, MealPlanInputSchema } from "@/lib/zod/mealPlan";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { MealPlanType } from "@/lib/types";
import { success } from "zod";
import { error } from "console";
import { use } from "react";
export async function getMealByUser() {
  try {
    const data = await getAuth();
    if (!data) return null;
    const userId = data.user.id;
    const res: MealPlanType[] = await db
      .select({
        mealPlanId: mealPlan.mealPlanId,
        userId: mealPlan.userId,
        createdAt: mealPlan.createdAt,
        showPublic: mealPlan.showPublic,
        description: mealPlan.description,
        mealPlanName: mealPlan.mealPlanName,
        numberOfMealsInADay: mealPlan.numberOfMealsInADay,
        tags: mealPlan.tags,
        totalProtein: mealPlan.totalProtein,
        totalCarbs: mealPlan.totalCarbs,
        totalFats: mealPlan.totalFats,
        totalCalories: mealPlan.totalCalories,
        mealPlanTypes: sql<string>`ARRAY_AGG(${mealPlanType.mealPlanType})`,
      })
      .from(mealPlan)
      .leftJoin(
        mealPlanType,
        sql`${mealPlan.mealPlanId} = ${mealPlanType.mealPlanId}`
      )
      .groupBy(mealPlan.mealPlanId)
      .where(eq(mealPlan.userId, userId))
      .orderBy(mealPlan.createdAt);
    return {
      data: res,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      error: "Failed to fetch meal plan",
    };
  }
}
export async function getAllPublicMeals(query?: string) {
  try {
    const data = await getAuth();
    if (!data) {
      return {
        data: null,
        error: "Unauthorized user",
      };
    }
    const { user } = data;
    let res: MealPlanType[] = [];
    if (!query) {
      res = await db
        .select({
          mealPlanId: mealPlan.mealPlanId,
          userId: mealPlan.userId,
          createdAt: mealPlan.createdAt,
          showPublic: mealPlan.showPublic,
          description: mealPlan.description,
          mealPlanName: mealPlan.mealPlanName,
          numberOfMealsInADay: mealPlan.numberOfMealsInADay,
          tags: mealPlan.tags,
          totalProtein: mealPlan.totalProtein,
          totalCarbs: mealPlan.totalCarbs,
          totalFats: mealPlan.totalFats,
          totalCalories: mealPlan.totalCalories,
          mealPlanTypes: sql<string>`ARRAY_AGG(${mealPlanType.mealPlanType})`,
        })
        .from(mealPlan)
        .leftJoin(
          mealPlanType,
          sql`${mealPlan.mealPlanId} = ${mealPlanType.mealPlanId}`
        )
        .groupBy(mealPlan.mealPlanId)
        .where(eq(mealPlan.showPublic, true));
    } else {
      res = await db
        .select({
          mealPlanId: mealPlan.mealPlanId,
          userId: mealPlan.userId,
          createdAt: mealPlan.createdAt,
          showPublic: mealPlan.showPublic,
          description: mealPlan.description,
          mealPlanName: mealPlan.mealPlanName,
          numberOfMealsInADay: mealPlan.numberOfMealsInADay,
          tags: mealPlan.tags,
          totalProtein: mealPlan.totalProtein,
          totalCarbs: mealPlan.totalCarbs,
          totalFats: mealPlan.totalFats,
          totalCalories: mealPlan.totalCalories,
          mealPlanTypes: sql<string>`ARRAY_AGG(${mealPlanType.mealPlanType})`,
        })
        .from(mealPlan)
        .leftJoin(
          mealPlanType,
          sql`${mealPlan.mealPlanId} = ${mealPlanType.mealPlanId}`
        )
        .groupBy(mealPlan.mealPlanId)
        .where(
          and(
            or(eq(mealPlan.userId, user.id), eq(mealPlan.showPublic, true)),
            eq(mealPlan.mealPlanId, query)
          )
        );
    }
    console.log("popular meal", res);
    return {
      data: res,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      error: "Failed to show meal plans",
    };
  }
}
export async function getAllMeals(id: string) {
  try {
    const res = await db.select().from(meal).where(eq(meal.mealPlanId, id));
    const data = res.reduce((acc, curr) => {
      if (!acc[curr.mealPlanId]) {
        acc[curr.mealPlanId] = [];
      }
      acc[curr.mealPlanId].push(curr);

      return acc;
    }, {} as Record<string, typeof res>);
    return {
      data: Object.values(data),
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      error: "Internal server error occured",
    };
  }
}
export async function favoutiteMeals() {
  try {
    const data = await getAuth();
    if (!data) {
      return {
        data: null,
        error: "Unauthorized user",
      };
    }
    const { user } = data;
    const res = await db
      .select()
      .from(mealPlan)
      .innerJoin(
        favouriteMealPlans,
        eq(favouriteMealPlans.mealId, mealPlan.mealPlanId)
      )
      .innerJoin(mealPlanType, eq(mealPlanType.mealPlanId, mealPlan.mealPlanId))
      .where(eq(favouriteMealPlans.userId, user.id));
    for (const meal of res) {
      const type = await db
        .select()
        .from(mealPlanType)
        .where(eq(mealPlanType.mealPlanId, meal.mealPlan.mealPlanId));
      type.map((type) => {
        console.log("type", meal);
      });
    }
    return {
      data: res,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      error: "Server error occured",
    };
  }
}
export async function checkLike(id: string) {
  try {
    const data = await getAuth();
    if (!data) {
      return {
        data: null,
        error: "Unauthorized user",
      };
    }
    const { user } = data;
    const res = await db
      .select()
      .from(favouriteMealPlans)
      .where(
        and(
          eq(favouriteMealPlans.userId, user.id),
          eq(favouriteMealPlans.mealId, id)
        )
      );
    return {
      data: res,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      error: "Internal server error",
    };
  }
}
export async function getAiMealPlans(data: MealPlanInputSchema) {
  if (!process.env.GEMINI_API_KEY) {
    return {
      success: false,
      error: { message: "GEMINI_API_KEY is not set" },
    };
  }

  try {
    const prompt = `You are a nutritionist AI. Generate a structured JSON meal plan that strictly follows the given specifications.

Meal Plan Details:
- Meal Plan Name: ${data.mealPlanName}
- Description: ${data.description}
- Number of Meals: ${data.numberOfMealsInADay}

Nutritional Targets (daily total):
- Calories: ${data.totalCalories}
- Protein: ${data.totalProtein} g
- Carbohydrates: ${data.totalCarbs} g
- Fats: ${data.totalFats} g

Tags: ${data.tags.join(", ")}
Meal Plan Type: ${data.mealPlanType.join(", ")}

### Requirements:
1. The plan must include exactly ${
      data.numberOfMealsInADay
    } meals (Breakfast, Lunch, Dinner).
2. Each meal should collectively contribute toward the nutritional targets.  
   - Approximate per meal:  
     - Calories: ${Math.round(data.totalCalories / data.numberOfMealsInADay)}  
     - Protein: ${Math.round(data.totalProtein / data.numberOfMealsInADay)} g  
     - Carbohydrates: ${Math.round(
       data.totalCarbs / data.numberOfMealsInADay
     )} g  
     - Fats: ${Math.round(data.totalFats / data.numberOfMealsInADay)} g  
   - Small adjustments are allowed for balance and practicality.
3. Use only ingredients that comply with **vegetarian + paleo** diets.  
   - Allowed: vegetables, fruits, nuts, seeds, eggs (optional if paleo interpretation permits).  
   - Avoid: grains, legumes, dairy, processed foods.  
4. Ensure meals support **the tags provided** by prioritizing high-quality proteins and nutrient-dense carbs/fats.
5. For each meal, include:  
   - "mealName": a short descriptive title  
   - "ingredients": array of items with exact quantities (e.g., "1 cup spinach", "2 eggs")  
   - "instructions": simple cooking steps  
   - "macronutrients": numeric breakdown (calories, protein, carbohydrates, fats)  
   - "MealTime": Breakfast, Lunch, or Dinner  
6.  Ensure **variety and practicality**; do not suggest exotic, unavailable, or far-fetched ingredients..  
7. If eggs are used, note they are optional and provide a nut/seed alternative.  

### JSON Output Rules:
- Follow **exact JSON format** below.  
- All strings must be quoted.  
- All numbers must be numeric (no quotes).  
- No comments, no trailing commas.  
- Do not wrap JSON in Markdown fences.  

### CRITICAL: Use these EXACT field names:
{
  "mealPlanName": "string",
  "description": "string", 
  "numberOfMealsInADay": number,
  "totalCalories": number,
  "totalProtein": number,
  "totalCarbs": number,
  "totalFats": number,
  "tags": ["array", "of", "strings"],
  "mealPlanType": ["array", "of", "strings"],
  "meals": [
    {
      "mealName": "Spinach & Egg Power Bowl",
      "ingredients": [
        "2 cups spinach",
        "2 large eggs", 
        "1/4 avocado",
        "1 tbsp pumpkin seeds"
      ],
      "instructions": "Step 1:

Peel and dice onion. Heat olive oil in a skillet over medium heat. Add onion and garlic and cook 3 minutes, until softened.

Step 2:

Add ground beef, dried oregano and worcestershire sauce. Cook, breaking up the meat with a wooden spoon, until cooked through, about 7 minutes.

Step 3:

Add frozen spinach and cook, stirring, until heated through, about 5 minutes.

Step 4:

In a small bowl, whisk eggs until even in color. Push beef mixture to the side of the pan, and add the egg to the other side. Cook, stirring slowly, until eggs have set, then mix into the beef mixture. Season with salt and pepper to taste.",
      "macronutrients": {
        "calories": 650,
        "protein": 45,
        "carbohydrates": 40,
        "fats": 30
      },
      "MealTime": "Breakfast",
      "videoUrl":"url of youtube video or null"
    }
  ]
}
    `;

    const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const modelNames = [
      "gemini-2.5-flash", // Best price-performance, current stable
      "gemini-2.0-flash", // Next-gen features, stable
      "gemini-1.5-flash", // Legacy but still supported stable
      "gemini-2.5-pro", // Most powerful but more expensive
      "gemini-1.5-pro", // Legacy pro model
    ];
    let model;
    let modelError;
    for (const modelName of modelNames) {
      try {
        model = genAi.getGenerativeModel({
          model: modelName,
          systemInstruction: `
    You are a JSON generator for meal plans. 
    CRITICAL RULES:
    1. Return ONLY valid JSON - no markdown, no backticks, no explanations
    2. ALL string values must be quoted
    3. ALL numeric values must be unquoted numbers
    4. Use EXACT field names as specified in the prompt
    5. Never use unquoted text like "as many as possible"
    6. Always include the "showPublic" field as false
    7. Use "numberOfMealsInADay" not "numberOfMeals"
    8. Use "totalCarbs" not "totalCarbohydrates"
    9. Validate JSON structure before responding
    10. Ensure **variety and practicality**; do not suggest exotic, unavailable, or far-fetched ingredients.
      `,
        });
        console.log("Using model", modelName);
        break;
      } catch (err) {
        console.log(
          `Model ${modelName} failed during setup:`,
          err instanceof Error ? err.message : String(err)
        );
        modelError = err;
        model = undefined;
        continue;
      }
    }
    if (!model) {
      return {
        success: false,
        error: {
          message: "No supported Gemini model found",
          details:
            modelError instanceof Error
              ? modelError.message
              : String(modelError),
        },
      };
    }

    const result = await model.generateContent(prompt);
    const raw = result.response.text().trim();

    // Clean up fences and trailing commas
    const cleaned = raw
      .replace(/^```(?:json)?\s*|\s*```$/g, "")
      .replace(/,\s*([}\]])/g, "$1");
    let parsedJson;
    try {
      parsedJson = JSON.parse(cleaned);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      console.error("Raw response:", raw);
      console.error("Cleaned response:", cleaned);
      throw new Error(`Invalid JSON response from AI: ${parseError}`);
    }
    const planJson: AiPlanSchema = AiPlanSchema.parse(parsedJson);

    return {
      success: true,
      data: {
        ...planJson,
        showPublic: data.showPublic,
      },
    };
  } catch (err) {
    console.error("getAiMealPlans error:", err);
    return {
      success: false,
      error: {
        message: "Failed to generate meal plan",
        details: err instanceof Error ? err.message : String(err),
      },
      data: null,
    };
  }
}
export async function getMealDetails(name: string) {
  const query = name.replace(/\s+/g, ",");
  try {
    const res = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(
        query
      )}&number=5&apiKey=${process.env.SPOON_API_KEY as string}`
    );
    const data = res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
