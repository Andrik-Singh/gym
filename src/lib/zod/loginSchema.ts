import * as z from 'zod';
export const loginSchema = z.object({
    email:z.email({error: "Invalid email address"}).nonempty({error: "Email is required"}),
    password:z.string().min(8,{error: "Password must be at least 8 characters long"}).max(100,{error: "Password must be at most 100 characters long"}),
})