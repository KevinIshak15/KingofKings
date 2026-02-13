import { motion } from "framer-motion";
import { Link } from "wouter";

interface HeroProps {
  image: string;
  title: string;
  subtitle: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  overlayOpacity?: string;
  large?: boolean;
}

export function Hero({ 
  image, 
  title, 
  subtitle, 
  primaryCta, 
  secondaryCta,
  overlayOpacity = "bg-black/40",
  large = false
}: HeroProps) {
  return (
    <div className={`relative w-full ${large ? 'h-screen' : 'h-[60vh]'} overflow-hidden flex items-center justify-center`}>
      {/* Background Image Parallax Effect could go here */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{ backgroundImage: `url(${image})` }}
      />
      
      {/* Overlay */}
      <div className={`absolute inset-0 ${overlayOpacity}`} />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-primary font-bold tracking-[0.2em] uppercase text-sm md:text-base mb-4">
            {subtitle}
          </h2>
          <h1 className="text-white font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
            {title}
          </h1>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            {primaryCta && (
              <Link href={primaryCta.href}>
                <button className="bg-primary text-secondary hover:bg-white transition-all duration-300 px-8 py-4 font-bold uppercase tracking-widest text-sm min-w-[200px]">
                  {primaryCta.label}
                </button>
              </Link>
            )}
            {secondaryCta && (
              <Link href={secondaryCta.href}>
                <button className="border border-white text-white hover:bg-white hover:text-secondary transition-all duration-300 px-8 py-4 font-bold uppercase tracking-widest text-sm min-w-[200px]">
                  {secondaryCta.label}
                </button>
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
