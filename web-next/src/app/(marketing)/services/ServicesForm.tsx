"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAnalysisForm } from "@/hooks/use-forms";
import { insertAnalysisSchema, type InsertAnalysis } from "@/lib/api-types";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ServicesForm() {
  const { mutate, isPending } = useAnalysisForm();
  const form = useForm<InsertAnalysis>({
    resolver: zodResolver(insertAnalysisSchema),
    defaultValues: { name: "", email: "", phone: "", propertyAddress: "" },
  });

  const onSubmit = (data: InsertAnalysis) => {
    mutate(data, { onSuccess: () => form.reset() });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem>
              <FormLabel className="uppercase text-xs tracking-wider text-gray-400">Full Name</FormLabel>
              <FormControl><Input className="bg-transparent border-white/20 text-white rounded-none h-12 focus:border-primary" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem>
              <FormLabel className="uppercase text-xs tracking-wider text-gray-400">Email Address</FormLabel>
              <FormControl><Input className="bg-transparent border-white/20 text-white rounded-none h-12 focus:border-primary" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        <FormField control={form.control} name="phone" render={({ field }) => (
          <FormItem>
            <FormLabel className="uppercase text-xs tracking-wider text-gray-400">Phone Number</FormLabel>
            <FormControl><Input className="bg-transparent border-white/20 text-white rounded-none h-12 focus:border-primary" {...field} value={field.value || ""} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="propertyAddress" render={({ field }) => (
          <FormItem>
            <FormLabel className="uppercase text-xs tracking-wider text-gray-400">Property Address</FormLabel>
            <FormControl><Input className="bg-transparent border-white/20 text-white rounded-none h-12 focus:border-primary" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <Button type="submit" disabled={isPending} className="w-full bg-primary hover:bg-primary/90 text-secondary font-bold uppercase tracking-widest rounded-none h-14 mt-4">
          {isPending ? "Submitting..." : "Get Free Evaluation"}
        </Button>
      </form>
    </Form>
  );
}
