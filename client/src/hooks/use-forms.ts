import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type InsertContact, type InsertInvestor, type InsertAnalysis, type InsertSubscriber } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

// POST /api/contact
export function useContactForm() {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (data: InsertContact) => {
      const res = await fetch(api.contact.submit.path, {
        method: api.contact.submit.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to submit form");
      }
      
      return api.contact.submit.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "We will be in touch shortly.",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  });
}

// POST /api/investors
export function useInvestorForm() {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (data: InsertInvestor) => {
      const res = await fetch(api.investors.apply.path, {
        method: api.investors.apply.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to submit application");
      }
      
      return api.investors.apply.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Application Received",
        description: "Thank you for your interest in our exclusive network.",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  });
}

// POST /api/analysis
export function useAnalysisForm() {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (data: InsertAnalysis) => {
      const res = await fetch(api.analysis.request.path, {
        method: api.analysis.request.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to request analysis");
      }
      
      return api.analysis.request.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Request Submitted",
        description: "Your comprehensive rental analysis is being prepared.",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  });
}

// POST /api/subscribers
export function useNewsletterForm() {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (data: InsertSubscriber) => {
      const res = await fetch(api.subscribers.join.path, {
        method: api.subscribers.join.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to subscribe");
      }
      
      return api.subscribers.join.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Subscribed",
        description: "Welcome to our inner circle.",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  });
}
