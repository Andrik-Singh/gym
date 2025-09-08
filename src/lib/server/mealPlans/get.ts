"use server"

import { db } from "@/db"
import { getAuth } from "../get"
import { mealPlan } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function getMealByUser() {
   try {
        const data=await getAuth()
        if(!data) return null
        const userId=data.user.id
        const res=await db.select().from(mealPlan).where(eq(mealPlan.userId,userId))
        return {
            data:res,
            error:null
        }
   } catch (error) {
        console.error(error)
        return {
            data:null,
            error:"Failed to fetch meal plan"
        }   
   } 
}
export async function getAllPublicMeals(){
    try {
        const res=await db.select().from(mealPlan).where(eq(mealPlan.showPublic,true))
        return {
            res,
            error:null
        }
    } catch (error) {
         console.error(error)
         return{
            res:null,
            error:"Failed to show meal plans"
         }      
    }
}