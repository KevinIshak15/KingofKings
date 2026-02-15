import { z } from "zod";

/** API input schemas - must match Express API contract */
export const insertContactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  inquiryType: z.enum(["Buy", "Sell", "Management", "Investment"]),
  message: z.string().min(1),
});
export type InsertContact = z.infer<typeof insertContactSchema>;

export const insertInvestorSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  budgetRange: z.string().optional(),
  areasOfInterest: z.array(z.string()).optional(),
});
export type InsertInvestor = z.infer<typeof insertInvestorSchema>;

export const insertAnalysisSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  propertyAddress: z.string().min(1),
});
export type InsertAnalysis = z.infer<typeof insertAnalysisSchema>;

export const insertSubscriberSchema = z.object({
  email: z.string().email(),
});
export type InsertSubscriber = z.infer<typeof insertSubscriberSchema>;

export const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";
