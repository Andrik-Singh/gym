"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "@/db";
import { workoutPlans } from "@/db/schema";
import { auth } from "@/lib/auth";
import { WorkoutPlanInput } from "@/lib/zod/newPlans";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { WorkoutPlan } from "@/components/NewPlanForm";

export default async function getPlans(id?:string) {
  try {
    const authenticatedData = await auth.api.getSession({
      headers: await headers(),
    });
    let data
    if (!authenticatedData?.user) {
      return {
        success: false,
        error: "Unauthorized",
        data: [],
      };
    }
    if(!id){
      data = await db
      .select()
      .from(workoutPlans)
      .where(eq(workoutPlans.userId, authenticatedData.user.id));
    }
    else{
      data = await db
      .select()
      .from(workoutPlans)
      .where(eq(workoutPlans.planId, id));
    }
    console.log(data);
    return {
      success: true,
      data,
      error: "",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Internal Server occured",
      data: [],
    };
  }
}
export async function getAiAdvice(data: WorkoutPlanInput) {
  if (!process.env.GEMINI_API_KEY) {
    return {
      success: false,
      error: { message: "GEMINI_API_KEY is not set" },
    };
  }

  try {
    const prompt =`Create a personalized workout plan for the user based on the following information:

Personal Details:
- Age: ${data.age}
- Height: ${data.height}
- Weight: ${data.weight}
- Gender: ${data.gender}

Fitness Goals:
- Primary Goal: ${data.goal}
- Experience Level: ${data.experience}
- Health Goals: ${data.healthGoals.join(", ")}

Schedule:
- Days per week: ${data.daysPerWeek}
- Session duration: ${data.sessionDuration} minutes

Available Equipment:
${
  data.equipment.length > 0
    ? data.equipment.join(", ")
    : "No equipment available"
}

Health Considerations:
${data.injuries || "No injuries or health concerns reported"}

CRITICAL INSTRUCTION:
- ONLY include actual workout days in the "plan". 
- Do NOT create "Day X" entries for rest days.
- If rest days are important, explain how to take them in the "progression" or "safety" fields instead.
- The number of objects in "plan" MUST equal the number of workout days per week (not counting rest days).

CRITICAL: You must respond with ONLY valid JSON. No markdown, no backticks, no explanations.

Rules for JSON output:
- ALL string values must be in quotes
- ALL numbers must be numeric (no quotes around numbers)
- For variable reps, use a string like "8-12" or "AMRAP" (As Many Reps As Possible)
- No trailing commas
- No comments

JSON structure:
{
  "plan": [
    {
      "day": "Day 1",
      "exercises": [
        {
          "name": "Exercise Name",
          "sets": 3,
          "reps": "12",
          "rest": "60s"
        }
      ]
    }
  ],
  "progression": "How the user should increase intensity over time, including how to schedule rest days",
  "safety": "Any safety notes based on health info",
  "nutrition": "Recommended nutritional guidance aligned with goals"
}`
;

    const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAi.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: `
You are a JSON generator for workout plans. 
CRITICAL RULES:
1. Return ONLY valid JSON - no markdown, no backticks, no explanations
2. ALL string values must be quoted
3. ALL numeric values must be unquoted numbers
4. For variable reps, use strings like "8-12" or "AMRAP"
5. Never use unquoted text like "as many as possible"
6. Validate JSON structure before responding
7. Rest days shouldn't count on total number of days 
  `,
    });

    const result = await model.generateContent(prompt);
    const raw = result.response.text().trim();
    let cleaned = raw;
    cleaned = cleaned.replace(/^```(?:json)?\s*|\s*```$/g, "");
    cleaned = cleaned.replace(/:\s*as many as possible/g, ': "AMRAP"');
    cleaned = cleaned.replace(/:\s*(\d+)\s*reps/g, ': "$1"');
    cleaned = cleaned.replace(/,\s*}/g, '}'); 
    cleaned = cleaned.replace(/,\s*]/g, ']'); 

    let planJson: WorkoutPlan | null = null;
    try {
      planJson = JSON.parse(cleaned);
    } catch (parseError) {
      console.error("JSON parse failed:", parseError);
      console.log("Raw output:", raw);
      console.log("Cleaned output:", cleaned);
      try {
        let fixedJson = cleaned;
        fixedJson = fixedJson.replace(/:\s*([a-zA-Z][^,}\]]*)/g, (match, value) => {
          if (value.startsWith('"') || ['null', 'true', 'false'].includes(value.toLowerCase()) || /^\d+(\.\d+)?$/.test(value)) {
            return match;
          }
          return `: "${value.trim()}"`;
        });
        
        planJson = JSON.parse(fixedJson);
        console.log("Successfully parsed with aggressive fixing");
      } catch (secondParseError) {
        return {
          success: false,
          error: {
            message: "Failed to parse Gemini output as JSON",
            rawOutput: raw,
            cleanedOutput: cleaned,
          },
        };
      }
    }

    const tokens = await model.countTokens({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });
    console.log("Token count:", tokens);
    
    return {
      success: true,
      data: planJson as WorkoutPlan,
    };
  } catch (err) {
    console.error("getAiAdvice error:", err);
    return {
      success: false,
      error: {
        message: "Server error while generating workout plan",
        details: err instanceof Error ? err.message : String(err),
      },
    };
  }
}