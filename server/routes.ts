import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // Contact Form
  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);
      const result = await storage.createContactSubmission(input);
      res.status(201).json(result);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Investor Application
  app.post(api.investors.apply.path, async (req, res) => {
    try {
      const input = api.investors.apply.input.parse(req.body);
      const result = await storage.createInvestorApplication(input);
      res.status(201).json(result);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Rental Analysis Request
  app.post(api.analysis.request.path, async (req, res) => {
    try {
      const input = api.analysis.request.input.parse(req.body);
      const result = await storage.createRentalAnalysisRequest(input);
      res.status(201).json(result);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Newsletter/Network Subscriber
  app.post(api.subscribers.join.path, async (req, res) => {
    try {
      const input = api.subscribers.join.input.parse(req.body);
      const result = await storage.createSubscriber(input);
      res.status(201).json(result);
    } catch (err) {
      if (err instanceof z.ZodError) {
        // Handle unique constraint error specifically if needed, otherwise generic 400
        return res.status(400).json({
          message: "Invalid input or email already subscribed",
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  return httpServer;
}
