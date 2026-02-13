import { pgTable, text, serial, timestamp, varchar, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===

// General Contact Form
export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  inquiryType: text("inquiry_type").notNull(), // Buy, Sell, Management, Investment
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Investor Network Application
export const investorApplications = pgTable("investor_applications", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  budgetRange: text("budget_range"),
  areasOfInterest: jsonb("areas_of_interest").$type<string[]>(), // Array of areas
  createdAt: timestamp("created_at").defaultNow(),
});

// Rental Analysis Request (Landlords)
export const rentalAnalysisRequests = pgTable("rental_analysis_requests", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  propertyAddress: text("property_address").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Newsletter/Network Subscribers
export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

// === SCHEMA GENERATION ===

export const insertContactSchema = createInsertSchema(contactSubmissions).omit({ id: true, createdAt: true });
export const insertInvestorSchema = createInsertSchema(investorApplications).omit({ id: true, createdAt: true });
export const insertAnalysisSchema = createInsertSchema(rentalAnalysisRequests).omit({ id: true, createdAt: true });
export const insertSubscriberSchema = createInsertSchema(subscribers).omit({ id: true, createdAt: true });

// === EXPLICIT API TYPES ===

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;

export type InvestorApplication = typeof investorApplications.$inferSelect;
export type InsertInvestor = z.infer<typeof insertInvestorSchema>;

export type RentalAnalysisRequest = typeof rentalAnalysisRequests.$inferSelect;
export type InsertAnalysis = z.infer<typeof insertAnalysisSchema>;

export type Subscriber = typeof subscribers.$inferSelect;
export type InsertSubscriber = z.infer<typeof insertSubscriberSchema>;
