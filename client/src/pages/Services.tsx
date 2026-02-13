import { Hero } from "@/components/Hero";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAnalysisForm } from "@/hooks/use-forms";
import { insertAnalysisSchema, type InsertAnalysis } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Services() {
  const { mutate, isPending } = useAnalysisForm();
  
  const form = useForm<InsertAnalysis>({
    resolver: zodResolver(insertAnalysisSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      propertyAddress: ""
    }
  });

  const onSubmit = (data: InsertAnalysis) => {
    mutate(data, {
      onSuccess: () => form.reset()
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* luxury living room */}
      <Hero 
        image="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974&auto=format&fit=crop"
        title="Real Estate Services"
        subtitle="Buying. Selling. Investing."
        large={false}
      />

      {/* Services Grid */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
            <div className="order-2 lg:order-1 space-y-8">
              <h3 className="font-serif text-3xl md:text-4xl text-secondary">For Sellers</h3>
              <p className="text-gray-600 leading-relaxed">
                We employ a cinematic marketing approach that elevates your property above the competition. From professional staging and twilight photography to targeted digital campaigns, we ensure your home is seen by the right buyers.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center text-gray-700"><span className="w-1.5 h-1.5 bg-primary mr-3"></span>Professional Staging & Styling</li>
                <li className="flex items-center text-gray-700"><span className="w-1.5 h-1.5 bg-primary mr-3"></span>4K Video Tours & Drone Footage</li>
                <li className="flex items-center text-gray-700"><span className="w-1.5 h-1.5 bg-primary mr-3"></span>Global Luxury Network Exposure</li>
                <li className="flex items-center text-gray-700"><span className="w-1.5 h-1.5 bg-primary mr-3"></span>Strategic Pricing Analysis</li>
              </ul>
            </div>
            {/* luxury interior design */}
            <div className="order-1 lg:order-2 h-[400px] bg-[url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop')] bg-cover bg-center" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* luxury kitchen */}
            <div className="h-[400px] bg-[url('https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
            <div className="space-y-8">
              <h3 className="font-serif text-3xl md:text-4xl text-secondary">For Buyers</h3>
              <p className="text-gray-600 leading-relaxed">
                Whether you are looking for your forever home or an investment property, we provide data-driven insights to help you make confident decisions. We identify value where others miss it.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center text-gray-700"><span className="w-1.5 h-1.5 bg-primary mr-3"></span>Off-Market Access</li>
                <li className="flex items-center text-gray-700"><span className="w-1.5 h-1.5 bg-primary mr-3"></span>Neighborhood Analytics</li>
                <li className="flex items-center text-gray-700"><span className="w-1.5 h-1.5 bg-primary mr-3"></span>Negotiation Expertise</li>
                <li className="flex items-center text-gray-700"><span className="w-1.5 h-1.5 bg-primary mr-3"></span>Pre-Construction VIP Access</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Evaluation Form */}
      <section className="py-24 bg-secondary text-white">
        <div className="container-wide max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-4">What's Your Home Worth?</h2>
            <h3 className="font-serif text-4xl text-white">Request a Property Evaluation</h3>
          </div>

          <div className="bg-white/5 p-8 md:p-12 border border-white/10">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase text-xs tracking-wider text-gray-400">Email Address</FormLabel>
                        <FormControl>
                          <Input className="bg-transparent border-white/20 text-white rounded-none h-12 focus:border-primary" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-xs tracking-wider text-gray-400">Phone Number</FormLabel>
                      <FormControl>
                        <Input className="bg-transparent border-white/20 text-white rounded-none h-12 focus:border-primary" {...field} value={field.value || ''} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="propertyAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-xs tracking-wider text-gray-400">Property Address</FormLabel>
                      <FormControl>
                        <Input className="bg-transparent border-white/20 text-white rounded-none h-12 focus:border-primary" {...field} />
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
                  {isPending ? "Submitting..." : "Get Free Evaluation"}
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
