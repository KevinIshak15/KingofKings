import { Hero } from "@/components/Hero";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContactForm } from "@/hooks/use-forms";
import { insertContactSchema, type InsertContact } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Contact() {
  const { mutate, isPending } = useContactForm();
  
  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      inquiryType: "Buy",
      message: ""
    }
  });

  const onSubmit = (data: InsertContact) => {
    mutate(data, {
      onSuccess: () => form.reset()
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* modern office reception */}
      <Hero 
        image="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
        title="Contact Us"
        subtitle="Let's Start a Conversation"
        large={false}
      />

      <section className="section-padding bg-white">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-12">
            <div>
              <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-4">Get In Touch</h2>
              <h3 className="font-serif text-4xl text-secondary mb-6">We Are At Your Service</h3>
              <p className="text-gray-600 leading-relaxed">
                Whether you are ready to list your property, looking for your dream home, or seeking investment advice, our team is ready to assist you with the highest level of professionalism.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="text-primary w-6 h-6 mr-4 mt-1" />
                <div>
                  <h4 className="font-serif text-lg text-secondary">Office Location</h4>
                  <p className="text-gray-500">123 Luxury Lane, Suite 100<br/>Toronto, ON M5V 2T6</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="text-primary w-6 h-6 mr-4 mt-1" />
                <div>
                  <h4 className="font-serif text-lg text-secondary">Phone</h4>
                  <p className="text-gray-500">+1 (416) 555-0123</p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="text-primary w-6 h-6 mr-4 mt-1" />
                <div>
                  <h4 className="font-serif text-lg text-secondary">Email</h4>
                  <p className="text-gray-500">concierge@kingofkings.com</p>
                </div>
              </div>
            </div>
            
            <div className="h-64 bg-gray-100 w-full relative">
               <iframe 
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2887.268297008107!2d-79.3870566!3d43.6425662!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b34d68bf33a9b%3A0x15edd8c4de1c7581!2sCN%20Tower!5e0!3m2!1sen!2sca!4v1678901234567!5m2!1sen!2sca" 
                 width="100%" 
                 height="100%" 
                 style={{border:0}} 
                 allowFullScreen 
                 loading="lazy" 
                 referrerPolicy="no-referrer-when-downgrade"
               />
            </div>
          </div>

          <div className="bg-secondary p-8 md:p-12 text-white">
            <h3 className="font-serif text-2xl mb-8 text-primary">Send a Message</h3>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-xs tracking-wider text-gray-400">Full Name</FormLabel>
                      <FormControl>
                        <Input className="bg-transparent border-white/20 text-white rounded-none h-12 focus:border-primary" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase text-xs tracking-wider text-gray-400">Email</FormLabel>
                        <FormControl>
                          <Input className="bg-transparent border-white/20 text-white rounded-none h-12 focus:border-primary" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase text-xs tracking-wider text-gray-400">Phone</FormLabel>
                        <FormControl>
                          <Input className="bg-transparent border-white/20 text-white rounded-none h-12 focus:border-primary" {...field} value={field.value || ''} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="inquiryType"
                  render={({ field }) => (
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
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-xs tracking-wider text-gray-400">Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          className="bg-transparent border-white/20 text-white rounded-none min-h-[120px] focus:border-primary" 
                          placeholder="How can we help you?"
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
                  className="w-full bg-primary hover:bg-primary/90 text-secondary font-bold uppercase tracking-widest rounded-none h-14 mt-4"
                >
                  {isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
