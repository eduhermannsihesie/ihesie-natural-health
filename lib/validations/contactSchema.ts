import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),

  email: z
    .string()
    .email("Enter a valid email"),

  phone: z
    .string()
    .min(7, "Phone number is required"),

  location: z
    .string()
    .min(2, "Location is required"),

  message: z
    .string()
    .min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactSchema>;