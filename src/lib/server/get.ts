"use server"

import { headers } from "next/headers"
import { auth } from "../auth"

export async function getAuth(){
    const data=auth.api.getSession({
        headers:await headers()
    })
    return data
}