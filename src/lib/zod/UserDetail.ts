import z from "zod";

export const userDetailSchema = z.object({
  weight: z.coerce.number()
    .min(30, { message: "Minimum weight is 30kg" })
    .max(450, { message: "Maximum weight can be 450kg" }),
    
  height: z.coerce.number()
    .min(50, { message: "Minimum height is 50cm" })
    .max(350, { message: "Maximum height can be 350cm" }),
    
  steps: z.coerce.number()
    .positive({ message: "The steps must be positive" }),
});

export type UserDetailType = z.infer<typeof userDetailSchema>;
