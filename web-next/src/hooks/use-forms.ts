"use client";

import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { API_BASE, type InsertContact, type InsertAnalysis, type InsertSubscriber } from "@/lib/api-types";

export function useContactForm() {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (data: InsertContact) => {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to submit");
      }
      return res.json();
    },
    onSuccess: () => toast({ title: "Message Sent", description: "We will be in touch shortly." }),
    onError: (e: Error) => toast({ variant: "destructive", title: "Error", description: e.message }),
  });
}

export function useAnalysisForm() {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (data: InsertAnalysis) => {
      const res = await fetch(`${API_BASE}/api/analysis`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to submit");
      }
      return res.json();
    },
    onSuccess: () => toast({ title: "Request Submitted", description: "Your rental analysis is being prepared." }),
    onError: (e: Error) => toast({ variant: "destructive", title: "Error", description: e.message }),
  });
}

export function useNewsletterForm() {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (data: InsertSubscriber) => {
      const res = await fetch(`${API_BASE}/api/subscribers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to subscribe");
      }
      return res.json();
    },
    onSuccess: () => toast({ title: "Subscribed", description: "Welcome to our inner circle." }),
    onError: (e: Error) => toast({ variant: "destructive", title: "Error", description: e.message }),
  });
}
