"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface HeroProps {
  image: string;
  title: string;
  subtitle: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  overlayOpacity?: string;
  large?: boolean;
  badgeText?: string;
  badgeTagline?: string;
}

export function Hero({ image, title, subtitle, primaryCta, secondaryCta, overlayOpacity = "bg-black/40", large = false, badgeText, badgeTagline }: HeroProps) {
  return (
    <div className={`relative w-full ${large ? "h-screen" : "h-[60vh]"} overflow-hidden flex items-center justify-center`}>
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className={`absolute inset-0 ${overlayOpacity}`} />
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="flex flex-col items-center">
          {large && (badgeText || badgeTagline) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="mb-8 px-8 py-6 rounded-lg bg-black/70 backdrop-blur-sm border border-white/10 shadow-2xl"
            >
              {badgeText && <p className="text-primary font-serif text-2xl md:text-3xl font-bold tracking-wide">{badgeText}</p>}
              {badgeTagline && <p className="text-white text-sm md:text-base mt-2 font-medium">{badgeTagline}</p>}
            </motion.div>
          )}
          {large && !badgeText && !badgeTagline && (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 1 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="King of Kings Logo" className="h-32 md:h-48 w-auto mb-8 drop-shadow-[0_0_15px_rgba(200,166,70,0.5)]" />
            </motion.div>
          )}
          <h2 className="text-white font-bold tracking-[0.2em] uppercase text-sm md:text-base mb-4">{subtitle}</h2>
          <h1 className="text-white font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">{title}</h1>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            {primaryCta && (
              <Link href={primaryCta.href}>
                <button className="bg-primary text-white hover:bg-primary/90 transition-all duration-300 px-8 py-4 font-bold uppercase tracking-widest text-sm min-w-[200px] rounded-md">{primaryCta.label}</button>
              </Link>
            )}
            {secondaryCta && (
              secondaryCta.href.startsWith("tel:") ? (
                <a href={secondaryCta.href} className="border border-white text-white hover:bg-white hover:text-secondary transition-all duration-300 px-8 py-4 font-bold uppercase tracking-widest text-sm min-w-[200px] rounded-md inline-block text-center">
                  {secondaryCta.label}
                </a>
              ) : (
                <Link href={secondaryCta.href}>
                  <button className="border border-white text-white hover:bg-white hover:text-secondary transition-all duration-300 px-8 py-4 font-bold uppercase tracking-widest text-sm min-w-[200px] rounded-md">{secondaryCta.label}</button>
                </Link>
              )
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
