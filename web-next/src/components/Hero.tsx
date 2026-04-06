"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HeroProps {
  image: string;
  title: string;
  subtitle: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  adminSlot?: React.ReactNode;
  overlayOpacity?: string;
  large?: boolean;
  badgeText?: string;
  badgeTagline?: string;
}

export function Hero({ image, title, subtitle, primaryCta, secondaryCta, adminSlot, overlayOpacity = "bg-black/40", large = false, badgeText, badgeTagline }: HeroProps) {
  const heightClass = large
    ? "min-h-[100svh] min-h-[100dvh] sm:min-h-screen"
    : "min-h-[48svh] min-h-[48dvh] sm:min-h-[52vh] md:min-h-[60vh]";
  return (
    <div
      className={cn(
        "relative w-full flex flex-col",
        heightClass,
        large ? "overflow-x-hidden overflow-y-visible" : "overflow-hidden items-center justify-center"
      )}
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className={`absolute inset-0 ${overlayOpacity}`} />
      <div
        className={cn(
          "relative z-10 w-full mx-auto flex flex-col text-center px-3.5 xs:px-4 sm:px-6",
          large
            ? "max-w-5xl justify-start items-center pt-[max(6.75rem,env(safe-area-inset-top,0px)+4.75rem)] sm:pt-[max(7.25rem,env(safe-area-inset-top,0px)+5rem)] lg:pt-[max(7.75rem,env(safe-area-inset-top,0px)+5.25rem)] xl:pt-[max(8rem,env(safe-area-inset-top,0px)+5.5rem)] pb-16 sm:pb-20 md:pb-24 space-y-4 sm:space-y-5 md:space-y-6"
            : "max-w-4xl items-center justify-center py-10 sm:py-12 pt-[max(5.5rem,env(safe-area-inset-top,0px)+0.5rem)] pb-10 sm:pt-[max(5.75rem,env(safe-area-inset-top,0px)+0.5rem)] space-y-5 sm:space-y-8 w-full"
        )}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex w-full max-w-4xl flex-col items-center"
        >
          {large && (badgeText || badgeTagline) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="mb-6 sm:mb-8 px-5 py-4 sm:px-8 sm:py-6 rounded-lg bg-black/70 backdrop-blur-sm border border-white/10 shadow-2xl max-w-[95vw]"
            >
              {badgeText && <p className="text-primary font-serif text-xl sm:text-2xl md:text-3xl font-bold tracking-wide">{badgeText}</p>}
              {badgeTagline && <p className="text-white text-xs sm:text-sm md:text-base mt-2 font-medium">{badgeTagline}</p>}
            </motion.div>
          )}
          {large && !badgeText && !badgeTagline && (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 1 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="King of Kings Logo"
                className="h-[5.5rem] xs:h-24 sm:h-28 md:h-32 lg:h-36 xl:h-40 w-auto max-h-[22vh] sm:max-h-[20vh] object-contain mb-4 sm:mb-5 drop-shadow-[0_0_15px_rgba(200,166,70,0.5)]"
              />
            </motion.div>
          )}
          <h2 className="text-white font-bold tracking-[0.12em] xs:tracking-[0.2em] uppercase text-[0.65rem] xs:text-xs sm:text-sm md:text-base px-1 leading-snug">{subtitle}</h2>
          <h1 className="text-white font-serif text-[1.65rem] leading-[1.2] xs:text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-6xl font-bold px-1 sm:px-2">
            {title}
          </h1>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full max-w-md sm:max-w-none sm:w-auto px-1 pt-2 pb-[max(1rem,env(safe-area-inset-bottom,0px))]">
            {primaryCta && (
              <Link href={primaryCta.href} className="w-full sm:w-auto">
                <button type="button" className="w-full sm:w-auto sm:min-w-[200px] bg-primary text-white hover:bg-primary/90 transition-all duration-300 px-5 sm:px-8 py-3.5 sm:py-4 font-bold uppercase tracking-wider sm:tracking-widest text-xs sm:text-sm rounded-md">{primaryCta.label}</button>
              </Link>
            )}
            {secondaryCta && (
              secondaryCta.href.startsWith("tel:") ? (
                <a href={secondaryCta.href} className="w-full sm:w-auto sm:min-w-[200px] border border-white text-white hover:bg-white hover:text-secondary transition-all duration-300 px-5 sm:px-8 py-3.5 sm:py-4 font-bold uppercase tracking-wider sm:tracking-widest text-xs sm:text-sm rounded-md inline-block text-center">
                  {secondaryCta.label}
                </a>
              ) : (
                <Link href={secondaryCta.href} className="w-full sm:w-auto">
                  <button type="button" className="w-full sm:w-auto sm:min-w-[200px] border border-white text-white hover:bg-white hover:text-secondary transition-all duration-300 px-5 sm:px-8 py-3.5 sm:py-4 font-bold uppercase tracking-wider sm:tracking-widest text-xs sm:text-sm rounded-md">{secondaryCta.label}</button>
                </Link>
              )
            )}
            {adminSlot}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
