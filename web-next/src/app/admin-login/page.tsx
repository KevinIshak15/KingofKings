"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdmin } from "@/context/AdminContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password required"),
});

type FormData = z.infer<typeof schema>;

export default function AdminLoginPage() {
  const { login } = useAdmin();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(data: FormData) {
    setError(null);
    try {
      await login(data.email, data.password);
      router.push("/listings");
    } catch {
      setError("Not authorized");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <div className="w-full max-w-md bg-white p-8 shadow-sm border border-gray-100">
        <h1 className="font-serif text-2xl text-secondary mb-6">Admin Login</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs tracking-wider text-gray-500">Email</FormLabel>
                  <FormControl>
                    <Input className="h-12 rounded-none border-gray-200" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs tracking-wider text-gray-500">Password</FormLabel>
                  <FormControl>
                    <Input className="h-12 rounded-none border-gray-200" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white h-12 font-bold uppercase tracking-widest rounded-none" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Signing in…" : "Sign In"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
