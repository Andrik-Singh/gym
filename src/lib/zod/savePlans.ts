import z from "zod";
export const savePlansSchema =z.object({
    name:z.string().min(3,{message:"Name must be at least 3 characters"}).max(50,{message:"Name must be at most 50 characters"}),
    description:z.string().min(10,{message:"Description must be at least 10 characters"}).max(200,{message:"Description must be at most 200 characters"}),
    isPublic:z.boolean(),
    numberOfDays:z.number().min(1,{message:"Number of days must be at least 1"}).max(7,{message:"Number of days must be at most 7"}),
    progression:z.string().optional(),
    safety:z.string().optional(),
    nutrition:z.string().optional(),
})
export type SavePlansInput = z.infer<typeof savePlansSchema>;