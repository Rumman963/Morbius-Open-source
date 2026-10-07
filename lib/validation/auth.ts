import { z } from "zod";

const emailSchema = z
  .string()
  .trim()
  .min(1, "Enter your email address.")
  .email("Enter a valid email address.")
  .max(254, "That email address is too long.");

export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Enter your password."),
});

export const signUpSchema = z.object({
  displayName: z
    .string()
    .trim()
    .min(2, "Your name must be at least 2 characters.")
    .max(80, "Your name must be 80 characters or fewer."),
  email: emailSchema,
  password: z.string().min(8, "Choose a password with at least 8 characters."),
});
