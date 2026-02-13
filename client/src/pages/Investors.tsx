import { Hero } from "@/components/Hero";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useInvestorForm } from "@/hooks/use-forms";
import { insertInvestorSchema, type InsertInvestor } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const interestAreas = [
  "Pre-Construction Condos",
  "Multi-Family Residential",
  "Commercial / Mixed Use",
  "Fix & Flip Opportunities",
  "Land Development"
];

export default function Investors() {
  const { mutate, isPending } = useInvestorForm();
  
  const form = useForm<InsertInvestor>({
    resolver: zodResolver(insertInvestorSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      budgetRange: "",
      areasOfInterest: []
    }
  });

  const onSubmit = (data: InsertInvestor) => {
    mutate(data, {
      onSuccess: () => form.reset()
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* high rise construction */}
      <Hero 
        image="https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2070&auto=format&fit=crop"
        title="Investor Network"
        subtitle="Exclusive Opportunities"
        large={false}
      />

      <section className="section-padding bg-white">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-4">Elite Access</h2>
            <h3 className="font-serif text-4xl text-secondary mb-6">Build Generational Wealth</h3>
            <p className="text-gray-600 leading-relaxed mb-8">
              Real estate has created more millionaires than any other asset class. Our investor network is designed for serious individuals who are ready to deploy capital into high-yield opportunities.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              We specialize in finding off-market deals, distressed assets, and pre-construction allocations that are not available to the general public.
            </p>
            
            <div className="bg-muted p-8">
              <h4 className="font-serif text-xl mb-4">Membership Benefits</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start"><span className="text-primary mr-2">•</span> First look at off-market inventory</li>
                <li className="flex items-start"><span className="text-primary mr-2">•</span> Detailed pro-forma financial analysis</li>
                <li className="flex items-start"><span className="text-primary mr-2">•</span> Access to our power team (lawyers, lenders, contractors)</li>
                <li className="flex items-start"><span className="text-primary mr-2">•</span> Mentorship and strategy planning</li>
              </ul>
            </div>
          </div>

          <div className="bg-secondary p-8 md:p-12 text-white">
            <h3 className="font-serif text-2xl mb-8 text-center text-primary">Apply to Join</h3>
            
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
                  name="budgetRange"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-xs tracking-wider text-gray-400">Budget Range</FormLabel>
                      <FormControl>
                        <Input className="bg-transparent border-white/20 text-white rounded-none h-12 focus:border-primary" placeholder="e.g. $500k - $1M" {...field} value={field.value || ''} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="areasOfInterest"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="uppercase text-xs tracking-wider text-gray-400">Areas of Interest</FormLabel>
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        {interestAreas.map((item) => (
                          <FormField
                            key={item}
                            control={form.control}
                            name="areasOfInterest"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={item}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...(field.value || []), item])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== item
                                              )
                                            )
                                      }}
                                      className="border-primary data-[state=checked]:bg-primary data-[state=checked]:text-secondary"
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal text-sm cursor-pointer">
                                    {item}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  disabled={isPending}
                  className="w-full bg-primary hover:bg-primary/90 text-secondary font-bold uppercase tracking-widest rounded-none h-14 mt-4"
                >
                  {isPending ? "Submitting..." : "Submit Application"}
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
