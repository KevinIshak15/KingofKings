"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContactForm } from "@/hooks/use-forms";
import { insertContactSchema, type InsertContact } from "@/lib/api-types";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface ContactFormProps {
  submitLabel?: string;
}

export function ContactForm({ submitLabel = "Send Message" }: ContactFormProps) {
  const { mutate, isPending } = useContactForm();
  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: { name: "", email: "", phone: "", inquiryType: "Buy", message: "" },
  });

  const onSubmit = (data: InsertContact) => {
    mutate(data, { onSuccess: () => form.reset() });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField control={form.control} name="name" render={({ field }) => (
          <FormItem>
            <FormLabel className="uppercase text-xs tracking-wider text-gray-400">Full Name</FormLabel>
            <FormControl><Input className="bg-transparent border-white/20 text-white rounded-none h-12 focus:border-primary" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem>
              <FormLabel className="uppercase text-xs tracking-wider text-gray-400">Email</FormLabel>
              <FormControl><Input className="bg-transparent border-white/20 text-white rounded-none h-12 focus:border-primary" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="phone" render={({ field }) => (
            <FormItem>
              <FormLabel className="uppercase text-xs tracking-wider text-gray-400">Phone</FormLabel>
              <FormControl><Input className="bg-transparent border-white/20 text-white rounded-none h-12 focus:border-primary" {...field} value={field.value || ""} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        <FormField control={form.control} name="inquiryType" render={({ field }) => (
          <FormItem>
            <FormLabel className="uppercase text-xs tracking-wider text-gray-400">I am interested in</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-transparent border-white/20 text-white rounded-none h-12 focus:border-primary focus:ring-0">
                  <SelectValue placeholder="Select inquiry type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-secondary text-white border-white/10">
                <SelectItem value="Buy">Buying a Property</SelectItem>
                <SelectItem value="Sell">Selling a Property</SelectItem>
                <SelectItem value="Management">Property Management</SelectItem>
                <SelectItem value="Investment">Investment Opportunities</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="message" render={({ field }) => (
          <FormItem>
            <FormLabel className="uppercase text-xs tracking-wider text-gray-400">Message</FormLabel>
            <FormControl>
              <Textarea className="bg-transparent border-white/20 text-white rounded-none min-h-[120px] focus:border-primary placeholder:text-gray-500" placeholder="How can we help you?" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <Button type="submit" disabled={isPending} className="w-full bg-primary hover:bg-primary/90 text-secondary font-bold uppercase tracking-widest rounded-none h-14 mt-4">
          {isPending ? "Sending..." : submitLabel}
        </Button>
      </form>
    </Form>
  );
}
