import { z } from "zod";

// Create Article Schema
export const createArticleSchema = z.object({
  title: z
    .string({
      required_error: "title is required",
      invalid_type_error: "title should be of type string",
    })
    .min(2, { message: "title should be at least 2 character" })
    .max(200, { message: "title should be at less than 200 character" }),
  description: z.string().min(2).min(10).max(500),
});

// Create User Schema
export const registerSchema = z.object({
  username: z.string().min(2).max(100), //.optional(),
  email: z
    .string()
    .min(3)
    .max(100)
    .regex(/^[^\s@]+@([^\s@]+\.)+[^\s@\.]{2,}$/)
    .email(),
  password: z.string().min(6).max(50),
});

export const loginSchema = z.object({
  email: z
    .string()
    .min(3)
    .max(100)
    .regex(/^[^\s@]+@([^\s@]+\.)+[^\s@\.]{2,}$/)
    .email(),
  password: z.string().max(50),
});
