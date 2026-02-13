import { db } from "./db";
import {
  contactSubmissions,
  investorApplications,
  rentalAnalysisRequests,
  subscribers,
  type InsertContact,
  type InsertInvestor,
  type InsertAnalysis,
  type InsertSubscriber,
  type ContactSubmission,
  type InvestorApplication,
  type RentalAnalysisRequest,
  type Subscriber
} from "@shared/schema";

export interface IStorage {
  createContactSubmission(contact: InsertContact): Promise<ContactSubmission>;
  createInvestorApplication(application: InsertInvestor): Promise<InvestorApplication>;
  createRentalAnalysisRequest(request: InsertAnalysis): Promise<RentalAnalysisRequest>;
  createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
}

export class DatabaseStorage implements IStorage {
  async createContactSubmission(contact: InsertContact): Promise<ContactSubmission> {
    const [submission] = await db.insert(contactSubmissions).values(contact).returning();
    return submission;
  }

  async createInvestorApplication(application: InsertInvestor): Promise<InvestorApplication> {
    const [app] = await db.insert(investorApplications).values(application).returning();
    return app;
  }

  async createRentalAnalysisRequest(request: InsertAnalysis): Promise<RentalAnalysisRequest> {
    const [req] = await db.insert(rentalAnalysisRequests).values(request).returning();
    return req;
  }

  async createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber> {
    const [sub] = await db.insert(subscribers).values(subscriber).returning();
    return sub;
  }
}

export const storage = new DatabaseStorage();
