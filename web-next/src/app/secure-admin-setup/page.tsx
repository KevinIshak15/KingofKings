"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { deleteUser } from "firebase/auth";
import { auth } from "@/lib/firebase.client";
import { ADMIN_EMAIL } from "@/lib/admin";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

export default function SecureAdminSetupPage() {
  const router = useRouter();
  const [adminExists, setAdminExists] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/check-setup")
      .then((r) => r.json())
      .then((data) => setAdminExists(data.adminExists))
      .catch(() => setAdminExists(false));
  }, []);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(data: FormData) {
    setError(null);
    if (!auth) {
      setError("Firebase not configured");
      return;
    }

    try {
      const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password);

      if (user.email?.toLowerCase().trim() !== ADMIN_EMAIL.toLowerCase().trim()) {
        await deleteUser(user);
        setError("Not authorized");
        return;
      }

      const token = await user.getIdToken();
      const res = await fetch("/api/admin/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: token }),
      });

      const body = await res.json();
      if (!res.ok) {
        setError(body.error || "Setup failed");
        return;
      }

      router.push("/listings");
    } catch {
      setError("Setup failed");
    }
  }

  if (adminExists === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <p className="text-gray-500">Checking setup…</p>
      </div>
    );
  }

  if (adminExists) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted px-4">
        <div className="w-full max-w-md bg-white p-8 shadow-sm border border-gray-100 text-center">
          <h1 className="font-serif text-2xl text-secondary mb-4">Admin Already Configured</h1>
          <p className="text-gray-600">An admin account already exists. Use the admin login page to sign in.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <div className="w-full max-w-md bg-white p-8 shadow-sm border border-gray-100">
        <h1 className="font-serif text-2xl text-secondary mb-6">Secure Admin Setup</h1>
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
              {form.formState.isSubmitting ? "Setting up…" : "Create Admin"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
