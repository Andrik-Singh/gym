"use server";

import { AiData } from "@/components/MealPlanForm";
import { db } from "@/db";
import { favouriteMealPlans, meal, mealPlan, mealPlanType } from "@/db/schema";
import { auth } from "@/lib/auth";
import { randomUUID } from "crypto";
import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { getAuth } from "../get";
import { success } from "zod";

export const saveMeals = async (data: AiData) => {
  const random = randomUUID();
  try {
    const authData = await auth.api.getSession({
      headers: await headers(),
    });
    if (!authData) {
      return {
        returningData: null,
        success: false,
        error: "Unauthorized user",
      };
    }
    const { user } = authData;
    const { meals } = data;
    const returningPlans = await db
      .insert(mealPlan)
      .values({
        mealPlanId: random,
        userId: user.id,
        showPublic: data.showPublic,
        description: data.description,
        numberOfMealsInADay: data.numberOfMealsInADay,
        tags: data.tags,
        mealPlanName: data.mealPlanName,
        totalProtein: data.totalProtein,
        totalCalories: data.totalCalories,
        totalCarbs: data.totalCarbs,
        totalFats: data.totalFats,
      })
      .returning();
    console.log("plan id", returningPlans[0]);
    for (const types of data.mealPlanType) {
      await db
        .insert(mealPlanType)
        .values({
          mealPlanId: random,
          mealPlanType: types,
        })
        .returning();
    }
    for (const mealDetails of meals) {
      await db.insert(meal).values({
        mealPlanId: random,
        mealName: mealDetails.mealName,
        instructions: mealDetails.instructions,
        ingredients: mealDetails.ingredients,
        mealId: randomUUID(),
        calories: mealDetails.macronutrients.calories,
        protein: mealDetails.macronutrients.protein,
        fats: mealDetails.macronutrients.fats,
        carbs: mealDetails.macronutrients.carbohydrates,
        mealPlanTime: mealDetails.mealName,
      });
    }
    return {
      returningData: returningPlans,
      success: true,
      error: null,
    };
  } catch (error) {
    console.error(error);
    try {
      await db.delete(meal).where(eq(meal.mealPlanId, random));
      await db.delete(mealPlanType).where(eq(mealPlanType.mealPlanId, random));
      await db.delete(mealPlan).where(eq(mealPlan.mealPlanId, random));
    } catch (rollbackError) {
      console.error("Error rolling back:", rollbackError);
    }
    return {
      returningData: null,
      success: false,
      error: "Server error occured",
    };
  }
};
export async function toggleEffect(mealPlanId: string, liked: boolean) {
  try {
    const authData = await getAuth();
    if (!authData) {
      return {
        error: "Unauthorized user",
      };
    }
    const { user } = authData;
    console.log(user)
    console.log(mealPlanId)
    console.log(liked)
    if (liked) {
      await db
        .delete(favouriteMealPlans)
        .where(
          and(
            eq(favouriteMealPlans.mealId, mealPlanId),
            eq(favouriteMealPlans.userId, user.id)
          )
        );
    } else {
      await db.insert(favouriteMealPlans).values({
        mealId: mealPlanId,
        userId: user.id,
      });
    }
    return{
      error:null
    }
  } catch (error) {
    console.error(error)
    return{
      error:"Internal server errror occured"
    }
  }
}
export async function deleteMealPlans(id:string) {
  try {
    const authData=await getAuth()
    if(!authData){
      return{
        success:false,
        error:"Unauthorized"
      }
    }
    await db.delete(mealPlan).where(eq(mealPlan.mealPlanId,id))
    return{
      success:true,
      error:null
    }
  } catch (error) {
    console.error(error)
    return{
      success:false,
      error:"Internal server error occured"
    }    
  }
}
