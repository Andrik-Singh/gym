import * as z from 'zod'
export const signupSchema=z.object({
    email:z.email({error: "Invalid email address"}),
    password:z.string().min(8,{error: "Password must be at least 8 characters long"}).max(100,{error: "Password must be at most 100 characters long"}),
    confirmPassword:z.string().min(8,{error: "Password must be at least 8 characters long"}).max(100,{error: "Password must be at most 100 characters long"})
}).refine((data) => data.password === data.confirmPassword, {
    error: "Passwords don't match",
    path: ["confirmPassword"],
})