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
    const [submission] = await db!.insert(contactSubmissions).values(contact).returning();
    return submission;
  }

  async createInvestorApplication(application: InsertInvestor): Promise<InvestorApplication> {
    const [app] = await db!.insert(investorApplications).values(application).returning();
    return app;
  }

  async createRentalAnalysisRequest(request: InsertAnalysis): Promise<RentalAnalysisRequest> {
    const [req] = await db!.insert(rentalAnalysisRequests).values(request).returning();
    return req;
  }

  async createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber> {
    const [sub] = await db!.insert(subscribers).values(subscriber).returning();
    return sub;
  }
}

/** In-memory storage when no database is configured. Data is not persisted. */
export class MockStorage implements IStorage {
  private id = 1;

  private nextId() {
    return this.id++;
  }

  async createContactSubmission(contact: InsertContact): Promise<ContactSubmission> {
    const now = new Date();
    return { id: this.nextId(), ...contact, createdAt: now } as ContactSubmission;
  }

  async createInvestorApplication(application: InsertInvestor): Promise<InvestorApplication> {
    const now = new Date();
    return { id: this.nextId(), ...application, createdAt: now } as InvestorApplication;
  }

  async createRentalAnalysisRequest(request: InsertAnalysis): Promise<RentalAnalysisRequest> {
    const now = new Date();
    return { id: this.nextId(), ...request, createdAt: now } as RentalAnalysisRequest;
  }

  async createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber> {
    const now = new Date();
    return { id: this.nextId(), ...subscriber, createdAt: now } as Subscriber;
  }
}

export const storage = db ? new DatabaseStorage() : new MockStorage();

if (!db) {
  console.log("[storage] Running without database — using in-memory mock (data will not persist)");
}
