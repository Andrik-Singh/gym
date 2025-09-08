"use server"

import { db } from "@/db"
import { workoutPlans } from "@/db/schema"
import { and, eq } from "drizzle-orm"
import { getAuth } from "../get"
import { success } from "zod"
export async function deletePlans(id:string){
    try {
        const data=await getAuth()
        if(!data?.user) throw new Error("Unauthorized")
        await db.delete(workoutPlans).where(
            and(
                eq(workoutPlans.planId, id),
                eq(workoutPlans.userId,data?.user?.id)
            )
        )
        return {
            success:true,
            error:""
        }
    } catch (error) {
        console.error(error)
        return {
            success:false,
            error:error
        }
    }
}