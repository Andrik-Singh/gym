"use server"

import { userDetailSchema, UserDetailType } from "@/lib/zod/UserDetail";
import { getAuth } from "../get";
import { db } from "@/db";
import { UserInfoTable } from "@/db/schema";
import { randomUUID } from "crypto";
import { error } from "console";

export async function saveUserDetail(unsafeData:UserDetailType){
    try {
        const authData=await getAuth()
        if(!authData){
            return{
                data:null,
                error:"Unauthorized user"
            }
        }
        const data=userDetailSchema.safeParse(unsafeData)
        if(!data.success){
            return{
                data:null,
                error:"Inappropriate data parsed"
            }
        }
        const { user }=authData
        const reurningData=await db.insert(UserInfoTable).values({
            userId:user.id,
            steps:data.data.steps,
            weight:data.data.weight,
            height:data.data.height,
            userInfo:randomUUID()
        }).returning()
        console.log(reurningData)
        return{
            data:reurningData,
            error:null
        }        
    } catch (error) {
        console.error(error)
        return{
            error:"Server error occured",
            data:null
        }
    }
}