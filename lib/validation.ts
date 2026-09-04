import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254).transform((value) => value.toLowerCase()),
  phone: z.string().trim().min(8).max(30),
  address: z.string().trim().min(2).max(160),
  formationSubject: z.string().trim().min(2).max(180),
  password: z.string().min(8).max(72),
});

export const loginSchema = z.object({
  email: z.string().trim().email().transform((value) => value.toLowerCase()),
  password: z.string().min(1).max(72),
});

export const forgotPasswordSchema = z.object({
  email: z.string().trim().email().transform((value) => value.toLowerCase()),
});

export const resetPasswordSchema = z.object({
  token: z.string().regex(/^[a-f0-9]{64}$/),
  password: z.string().min(8).max(72),
  confirmPassword: z.string().min(8).max(72),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Les mots de passe ne correspondent pas.",
});

export const reservationSchema = z.object({
  formationTitle: z.string().trim().min(2).max(180),
});
