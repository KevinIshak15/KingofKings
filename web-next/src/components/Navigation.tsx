"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { ServicesMegaMenu } from "./ServicesMegaMenu";
import { ListingsMegaMenu } from "./ListingsMegaMenu";
import { SERVICES_MENU } from "@/lib/services-menu";
import { LISTINGS_MENU } from "@/lib/listings-menu";

const links = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "ABOUT" },
  { href: "/blog", label: "BLOG" },
  { href: "/contact", label: "CONTACT" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [listingsOpen, setListingsOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileListingsOpen, setMobileListingsOpen] = useState(false);
  const servicesTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const listingsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (scrolled) {
      setServicesOpen(false);
      setListingsOpen(false);
    }
  }, [scrolled]);

  const handleServicesMouseEnter = () => {
    if (servicesTimeoutRef.current) {
      clearTimeout(servicesTimeoutRef.current);
      servicesTimeoutRef.current = null;
    }
    setServicesOpen(true);
  };

  const handleServicesMouseLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => setServicesOpen(false), 100);
  };

  const handleListingsMouseEnter = () => {
    if (listingsTimeoutRef.current) {
      clearTimeout(listingsTimeoutRef.current);
      listingsTimeoutRef.current = null;
    }
    setListingsOpen(true);
  };

  const handleListingsMouseLeave = () => {
    listingsTimeoutRef.current = setTimeout(() => setListingsOpen(false), 100);
  };

  const isServicesActive = pathname?.startsWith("/services");
  const isListingsActive = pathname?.startsWith("/listings");

  return (
    <header className={cn("fixed top-0 w-full z-50 transition-all duration-300 py-4", scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent")}>
      <div className="container-wide flex items-center justify-between gap-8">
        <Link href="/" className="z-50 shrink-0">
          <div className="flex items-center gap-3 cursor-pointer group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="King Of Kings Logo" className="h-12 w-auto transition-transform duration-300 group-hover:scale-110" />
            <div className="flex flex-col">
              <span className={cn("font-serif text-xl font-bold tracking-widest uppercase transition-colors leading-none whitespace-nowrap", scrolled ? "text-secondary" : "text-primary")}>King Of Kings</span>
              <span className={cn("text-[0.55rem] tracking-[0.3em] uppercase mt-1 transition-colors whitespace-nowrap", scrolled ? "text-primary" : "text-white")}>Real Estate Services</span>
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {links.slice(0, 2).map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.href} href={link.href} className="whitespace-nowrap">
                <span className={cn("text-sm font-medium uppercase tracking-wider cursor-pointer transition-colors hover:text-primary", isActive ? "text-primary border-b-2 border-primary pb-0.5" : scrolled ? "text-secondary/80" : "text-white/90")}>{link.label}</span>
              </Link>
            );
          })}

          <div
            className="relative"
            onMouseEnter={handleServicesMouseEnter}
            onMouseLeave={handleServicesMouseLeave}
          >
            <Link
              href="/services"
              className={cn(
                "whitespace-nowrap flex items-center gap-1 text-sm font-medium uppercase tracking-wider transition-colors hover:text-primary",
                isServicesActive ? "text-primary border-b-2 border-primary pb-0.5" : scrolled ? "text-secondary/80" : "text-white/90"
              )}
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              aria-controls="services-mega-menu"
              id="services-trigger"
            >
              SERVICES
              <ChevronDown className={cn("w-4 h-4 transition-transform", servicesOpen && "rotate-180")} />
            </Link>
          </div>

          <div
            className="relative"
            onMouseEnter={handleListingsMouseEnter}
            onMouseLeave={handleListingsMouseLeave}
          >
            <Link
              href="/listings"
              className={cn(
                "whitespace-nowrap flex items-center gap-1 text-sm font-medium uppercase tracking-wider transition-colors hover:text-primary",
                isListingsActive ? "text-primary border-b-2 border-primary pb-0.5" : scrolled ? "text-secondary/80" : "text-white/90"
              )}
              aria-expanded={listingsOpen}
              aria-haspopup="true"
              aria-controls="listings-mega-menu"
              id="listings-trigger"
            >
              LISTINGS
              <ChevronDown className={cn("w-4 h-4 transition-transform", listingsOpen && "rotate-180")} />
            </Link>
          </div>

          {links.slice(2).map((link) => {
            const isActive = pathname === link.href || (link.href === "/blog" && pathname?.startsWith("/blog"));
            return (
              <Link key={link.href} href={link.href} className="whitespace-nowrap">
                <span className={cn("text-sm font-medium uppercase tracking-wider cursor-pointer transition-colors hover:text-primary", isActive ? "text-primary border-b-2 border-primary pb-0.5" : scrolled ? "text-secondary/80" : "text-white/90")}>{link.label}</span>
              </Link>
            );
          })}
          <Link href="/contact">
            <button className={cn("bg-primary hover:bg-primary/90 px-6 py-2.5 text-xs font-bold uppercase tracking-widest transition-all duration-300 rounded-md", scrolled ? "text-secondary" : "text-white")}>Book Consultation</button>
          </Link>
        </nav>

        <button className="lg:hidden z-50 text-primary" onClick={() => setIsOpen(!isOpen)} aria-label={isOpen ? "Close menu" : "Open menu"}>
          {isOpen ? <X className="h-8 w-8" /> : <Menu className={cn("h-8 w-8", scrolled ? "text-secondary" : "text-white")} />}
        </button>
      </div>

      <ServicesMegaMenu
        isOpen={servicesOpen}
        onClose={() => setServicesOpen(false)}
        onMouseEnter={handleServicesMouseEnter}
        onMouseLeave={handleServicesMouseLeave}
        scrolled={scrolled}
      />

      <ListingsMegaMenu
        isOpen={listingsOpen}
        onClose={() => setListingsOpen(false)}
        onMouseEnter={handleListingsMouseEnter}
        onMouseLeave={handleListingsMouseLeave}
        scrolled={scrolled}
      />

      <div className={cn("fixed inset-0 bg-secondary flex flex-col items-center justify-start pt-32 pb-12 overflow-y-auto transition-transform duration-500 ease-in-out lg:hidden z-40", isOpen ? "translate-x-0" : "translate-x-full")}>
        <nav className="flex flex-col items-center space-y-6 w-full max-w-md px-6">
          <Link href="/" className="text-white text-2xl font-serif hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>HOME</Link>
          <Link href="/about" className="text-white text-2xl font-serif hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>ABOUT</Link>

          <div className="w-full">
            <button
              type="button"
              className="flex items-center justify-center gap-2 text-white text-2xl font-serif hover:text-primary transition-colors w-full"
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              aria-expanded={mobileServicesOpen}
            >
              SERVICES
              <ChevronDown className={cn("w-5 h-5 transition-transform", mobileServicesOpen && "rotate-180")} />
            </button>
            {mobileServicesOpen && (
              <div className="mt-4 pl-6 space-y-4 border-l-2 border-primary/30">
                {SERVICES_MENU.map((cat) => (
                  <div key={cat.id}>
                    <Link href={cat.href} className="text-primary font-serif text-lg block mb-2" onClick={() => { setIsOpen(false); setMobileServicesOpen(false); }}>
                      {cat.label}
                    </Link>
                    <div className="space-y-2 pl-4">
                      {cat.subItems.map((sub) => (
                        <Link key={sub.href} href={sub.href} className="text-gray-400 text-base block hover:text-white transition-colors" onClick={() => { setIsOpen(false); setMobileServicesOpen(false); }}>
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="w-full">
            <button
              type="button"
              className="flex items-center justify-center gap-2 text-white text-2xl font-serif hover:text-primary transition-colors w-full"
              onClick={() => setMobileListingsOpen(!mobileListingsOpen)}
              aria-expanded={mobileListingsOpen}
            >
              LISTINGS
              <ChevronDown className={cn("w-5 h-5 transition-transform", mobileListingsOpen && "rotate-180")} />
            </button>
            {mobileListingsOpen && (
              <div className="mt-4 pl-6 space-y-4 border-l-2 border-primary/30">
                {LISTINGS_MENU.map((cat) => (
                  <Link
                    key={cat.id}
                    href={cat.href}
                    className="text-primary font-serif text-lg block"
                    onClick={() => { setIsOpen(false); setMobileListingsOpen(false); }}
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/blog" className="text-white text-2xl font-serif hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>BLOG</Link>
          <Link href="/contact" className="text-white text-2xl font-serif hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>CONTACT</Link>
        </nav>
      </div>
    </header>
  );
}
