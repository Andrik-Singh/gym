"use server"

import { db } from "@/db"
import { workOutLogs } from "@/db/schema"
import { auth } from "@/lib/auth"
import { error } from "console"
import { randomUUID } from "crypto"
import { headers } from "next/headers"
import { success } from "zod"

export async function logExercise(data:{
    exerciseId:string,
    weight:number,
    sets:number,
    reps:string,

}){
    try {
        console.log(data)
        const authData=await auth.api.getSession({
            headers:await headers()
        })
        if(!authData){
            return {
                success:false,
                error:"Not authorized",
            }
        }
        const returnData=await db.insert(workOutLogs).values({
            exerciseId:data.exerciseId,
            userId:authData.user.id,
            weight:data.weight,
            sets:data.sets,
            reps:data.reps,
            logId:randomUUID()
        }).returning()
        console.log(returnData)
        return{
            success:true,
            error:""
        }
    } catch (error) {
        console.error(error)
        return{
            success:false,
            error:"Failed to log exercise",
        }
    }
}