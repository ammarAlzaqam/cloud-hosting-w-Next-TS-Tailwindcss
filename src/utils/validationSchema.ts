import { z } from "zod";

//?~start article schema
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

// Update Article
export const updateArticleSchema = z.object({
  title: z
    .string({
      required_error: "title is required",
      invalid_type_error: "title should be of type string",
    })
    .min(2, { message: "title should be at least 2 character" })
    .max(200, { message: "title should be at less than 200 character" })
    .optional(),
  description: z.string().min(2).min(10).max(500).optional(),
});
//?#end article schema

//?~start user schema
// Create User Schema
export const registerSchema = z.object({
  username: z.string().min(2).max(100),
  email: z
    .string()
    .min(3)
    .max(100)
    .regex(/^[^\s@]+@([^\s@]+\.)+[^\s@\.]{2,}$/)
    .email(),
  password: z.string().min(6).max(50),
});

// Login User schema
export const loginSchema = z.object({
  email: z
    .string()
    .min(3)
    .max(100)
    .regex(/^[^\s@]+@([^\s@]+\.)+[^\s@\.]{2,}$/)
    .email(),
  password: z.string().max(50),
});

// update User schema
export const updateUserSchema = z.object({
  username: z.string().min(2).max(100).optional(),
  email: z
    .string()
    .min(3)
    .max(100)
    .regex(/^[^\s@]+@([^\s@]+\.)+[^\s@\.]{2,}$/)
    .email()
    .optional(),
  password: z.string().min(6).max(50).optional(),
});
//?#end user schema

export const createCommentSchema = z.object({
  text: z.string().max(200),
  articleId: z.string(),
});
