import { Link } from "wouter";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { useNewsletterForm } from "@/hooks/use-forms";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertSubscriberSchema, type InsertSubscriber } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Footer() {
  const { mutate, isPending } = useNewsletterForm();
  
  const form = useForm<InsertSubscriber>({
    resolver: zodResolver(insertSubscriberSchema),
    defaultValues: { email: "" }
  });

  const onSubmit = (data: InsertSubscriber) => {
    mutate(data, {
      onSuccess: () => form.reset()
    });
  };

  return (
    <footer className="bg-secondary text-white pt-24 pb-12">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-widest uppercase text-white">
                King Of Kings
              </span>
              <span className="text-[0.6rem] tracking-[0.3em] uppercase text-primary">
                Real Estate Services
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Setting the standard for luxury real estate and investment management across the Greater Toronto Area and cottage country.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Twitter size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg mb-6">Explore</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/services"><span className="hover:text-primary cursor-pointer transition-colors">Real Estate Services</span></Link></li>
              <li><Link href="/management"><span className="hover:text-primary cursor-pointer transition-colors">Property Management</span></Link></li>
              <li><Link href="/investors"><span className="hover:text-primary cursor-pointer transition-colors">Investor Network</span></Link></li>
              <li><Link href="/about"><span className="hover:text-primary cursor-pointer transition-colors">Our Philosophy</span></Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg mb-6">Contact</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>123 Luxury Lane, Toronto, ON</li>
              <li>+1 (416) 555-0123</li>
              <li>concierge@kingofkings.com</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-serif text-lg mb-6">Join The Inner Circle</h4>
            <p className="text-gray-400 text-sm mb-4">Exclusive off-market opportunities delivered to your inbox.</p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                          placeholder="Your Email Address" 
                          className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-primary rounded-none h-12"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  disabled={isPending}
                  className="w-full bg-primary hover:bg-primary/90 text-secondary font-bold uppercase tracking-widest rounded-none h-12"
                >
                  {isPending ? "Joining..." : "Subscribe"}
                </Button>
              </form>
            </Form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} King Of Kings Real Estate Services. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
