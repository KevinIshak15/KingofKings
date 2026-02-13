import { Hero } from "@/components/Hero";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Check } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* professional man in suit office */}
      <Hero 
        image="https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=2070&auto=format&fit=crop"
        title="Our Philosophy"
        subtitle="Integrity. Stewardship. Excellence."
        large={false}
      />

      <section className="section-padding bg-white">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
             {/* confident professional headshot */}
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop" 
              alt="Founder Portrait" 
              className="w-full h-[600px] object-cover"
            />
            <div className="absolute inset-0 border-[1rem] border-white/0 hover:border-white/10 transition-all duration-500 pointer-events-none"></div>
          </div>
          
          <div className="space-y-8">
            <div>
              <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-4">The Founder</h2>
              <h3 className="font-serif text-4xl md:text-5xl text-secondary mb-6">A Legacy of Trust</h3>
            </div>
            
            <p className="text-gray-600 leading-relaxed text-lg">
              "Real estate is more than just transactions; it's about stewardship of resources and building a foundation for future generations. My approach combines aggressive market strategy with an unwavering commitment to integrity."
            </p>
            
            <p className="text-gray-600 leading-relaxed">
              With over 15 years in the Greater Toronto Area market, I have navigated every type of cycle. My clients don't just get a realtor; they get a dedicated partner who treats their capital as if it were my own.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              {[
                { title: "Integrity First", desc: "Honest advice, even when it costs us a sale." },
                { title: "Market Mastery", desc: "Deep analytical understanding of local trends." },
                { title: "Stewardship", desc: "Protecting and growing your assets responsibly." },
                { title: "Excellence", desc: "White-glove service at every price point." }
              ].map((item, i) => (
                <div key={i} className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg text-secondary mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
