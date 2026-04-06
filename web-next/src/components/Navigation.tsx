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
  { href: "/blog", label: "INSIGHTS" },
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
  const isEditorPage = pathname === "/listings/new" || pathname?.startsWith("/listings/edit/");

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 py-2.5 sm:py-3 lg:py-4 pt-[max(0.625rem,env(safe-area-inset-top))]",
        scrolled || isEditorPage ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent",
        isOpen && "max-lg:bg-secondary max-lg:shadow-md max-lg:backdrop-blur-none"
      )}
    >
      <div className="container-wide grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 lg:grid-cols-[minmax(0,auto)_minmax(0,1fr)_auto] lg:gap-x-4 xl:gap-x-6">
        <Link
          href="/"
          className={cn("relative z-50 min-w-0 justify-self-start", isOpen && "max-lg:hidden")}
          tabIndex={isOpen ? -1 : undefined}
          aria-hidden={isOpen ? true : undefined}
        >
          <div className="flex max-w-full flex-nowrap items-center gap-1.5 xs:gap-2 sm:gap-2.5 lg:gap-2.5 xl:gap-3 cursor-pointer group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/royallepage.png"
              alt="Royal LePage"
              className="h-7 xs:h-8 sm:h-9 lg:h-9 xl:h-10 w-auto max-w-[8.5rem] xs:max-w-[9.5rem] sm:max-w-[10rem] object-contain object-left shrink-0 opacity-90"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="King Of Kings Logo" className="h-11 xs:h-12 sm:h-12 lg:h-14 xl:h-16 w-auto shrink-0 transition-transform duration-300 group-hover:scale-105 sm:group-hover:scale-110" />
            <div className="hidden min-w-0 xs:flex flex-col leading-tight">
              <span
                className={cn(
                  "font-serif text-sm sm:text-base lg:text-lg xl:text-xl font-bold tracking-wide lg:tracking-widest uppercase transition-colors",
                  scrolled || isEditorPage ? "text-secondary" : "text-primary"
                )}
              >
                King Of Kings
              </span>
              <span
                className={cn(
                  "hidden 2xl:block text-[0.5rem] sm:text-[0.55rem] tracking-[0.2em] sm:tracking-[0.3em] uppercase mt-0.5 transition-colors",
                  scrolled || isEditorPage ? "text-primary" : "text-white"
                )}
              >
                Real Estate Services
              </span>
            </div>
          </div>
        </Link>

        <nav
          className="relative z-40 hidden min-h-0 min-w-0 justify-center justify-self-stretch overflow-x-auto overflow-y-visible [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden lg:col-start-2 lg:row-start-1 lg:flex lg:items-center lg:gap-2 xl:gap-3 2xl:gap-4"
          aria-label="Main"
        >
          {links.slice(0, 2).map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.href} href={link.href} className="shrink-0 whitespace-nowrap">
                <span className={cn("text-xs xl:text-sm font-medium uppercase tracking-wide xl:tracking-wider cursor-pointer transition-colors hover:text-primary", isActive ? "text-primary border-b-2 border-primary pb-0.5" : scrolled || isEditorPage ? "text-secondary/80" : "text-white/90")}>{link.label}</span>
              </Link>
            );
          })}

          <div
            className="relative shrink-0"
            onMouseEnter={handleServicesMouseEnter}
            onMouseLeave={handleServicesMouseLeave}
          >
            <Link
              href="/services"
              className={cn(
                "whitespace-nowrap flex items-center gap-0.5 xl:gap-1 text-xs xl:text-sm font-medium uppercase tracking-wide xl:tracking-wider transition-colors hover:text-primary",
                isServicesActive ? "text-primary border-b-2 border-primary pb-0.5" : scrolled || isEditorPage ? "text-secondary/80" : "text-white/90"
              )}
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              aria-controls="services-mega-menu"
              id="services-trigger"
            >
              SERVICES
              <ChevronDown className={cn("w-3.5 h-3.5 xl:w-4 xl:h-4 shrink-0 transition-transform", servicesOpen && "rotate-180")} />
            </Link>
          </div>

          <div
            className="relative shrink-0"
            onMouseEnter={handleListingsMouseEnter}
            onMouseLeave={handleListingsMouseLeave}
          >
            <Link
              href="/listings"
              className={cn(
                "whitespace-nowrap flex items-center gap-0.5 xl:gap-1 text-xs xl:text-sm font-medium uppercase tracking-wide xl:tracking-wider transition-colors hover:text-primary",
                isListingsActive ? "text-primary border-b-2 border-primary pb-0.5" : scrolled || isEditorPage ? "text-secondary/80" : "text-white/90"
              )}
              aria-expanded={listingsOpen}
              aria-haspopup="true"
              aria-controls="listings-mega-menu"
              id="listings-trigger"
            >
              LISTINGS
              <ChevronDown className={cn("w-3.5 h-3.5 xl:w-4 xl:h-4 shrink-0 transition-transform", listingsOpen && "rotate-180")} />
            </Link>
          </div>

          {links.slice(2).map((link) => {
            const isActive = pathname === link.href || (link.href === "/blog" && pathname?.startsWith("/blog"));
            return (
              <Link key={link.href} href={link.href} className="shrink-0 whitespace-nowrap">
                <span className={cn("text-xs xl:text-sm font-medium uppercase tracking-wide xl:tracking-wider cursor-pointer transition-colors hover:text-primary", isActive ? "text-primary border-b-2 border-primary pb-0.5" : scrolled || isEditorPage ? "text-secondary/80" : "text-white/90")}>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center justify-end gap-2 justify-self-end lg:col-start-3 lg:row-start-1">
          <Link href="/contact" className="hidden lg:inline-flex">
            <button type="button" className={cn("bg-primary hover:bg-primary/90 px-3 py-2 xl:px-5 xl:py-2.5 2xl:px-6 text-[0.65rem] xl:text-xs font-bold uppercase tracking-wide xl:tracking-widest transition-all duration-300 rounded-md whitespace-nowrap", scrolled || isEditorPage ? "text-secondary" : "text-white")}>Book Consultation</button>
          </Link>
          <button
            type="button"
            className={cn(
              "relative z-[60] lg:hidden",
              isOpen ? "text-primary" : scrolled || isEditorPage ? "text-secondary" : "text-white"
            )}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
          </button>
        </div>
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

      <div
        className={cn(
          "fixed inset-0 top-0 bg-secondary flex flex-col items-center justify-start pb-[max(3rem,env(safe-area-inset-bottom,0px)+1rem)] overflow-y-auto overscroll-contain transition-transform duration-500 ease-in-out lg:hidden z-[55] pt-[max(4.25rem,env(safe-area-inset-top,0px)+3.25rem)]",
          isOpen ? "translate-x-0" : "translate-x-full pointer-events-none"
        )}
        aria-hidden={!isOpen}
      >
        <nav className="flex flex-col items-center space-y-5 sm:space-y-6 w-full max-w-md px-4 sm:px-6">
          <Link href="/" className="text-white text-xl sm:text-2xl font-serif hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>HOME</Link>
          <Link href="/about" className="text-white text-xl sm:text-2xl font-serif hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>ABOUT</Link>

          <div className="w-full">
            <button
              type="button"
              className="flex items-center justify-center gap-2 text-white text-xl sm:text-2xl font-serif hover:text-primary transition-colors w-full"
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              aria-expanded={mobileServicesOpen}
            >
              SERVICES
              <ChevronDown className={cn("w-5 h-5 transition-transform", mobileServicesOpen && "rotate-180")} />
            </button>
            {mobileServicesOpen && (
              <div className="mt-4 pl-6 space-y-4 border-l-2 border-primary/30">
                {SERVICES_MENU.map((cat) => {
                  const subGroups =
                    "subGroups" in cat && Array.isArray(cat.subGroups) ? cat.subGroups : null;
                  return (
                    <div key={cat.id}>
                      <Link href={cat.href} className="text-primary font-serif text-lg block mb-2" onClick={() => { setIsOpen(false); setMobileServicesOpen(false); }}>
                        {cat.label}
                      </Link>
                      {subGroups ? (
                        <div className="space-y-3 pl-2">
                          {subGroups.map((group) => (
                            <div key={group.label}>
                              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-primary/90 mb-2 mt-1 first:mt-0">
                                {group.label}
                              </p>
                              <div className="space-y-2 pl-3 border-l border-primary/25">
                                {group.items.map((sub) => (
                                  <Link
                                    key={`${sub.href}-${sub.label}`}
                                    href={sub.href}
                                    className="text-gray-400 text-base block hover:text-white transition-colors"
                                    onClick={() => { setIsOpen(false); setMobileServicesOpen(false); }}
                                  >
                                    {sub.label}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-2 pl-4">
                          {cat.subItems.map((sub) => (
                            <Link key={sub.href} href={sub.href} className="text-gray-400 text-base block hover:text-white transition-colors" onClick={() => { setIsOpen(false); setMobileServicesOpen(false); }}>
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="w-full">
            <button
              type="button"
              className="flex items-center justify-center gap-2 text-white text-xl sm:text-2xl font-serif hover:text-primary transition-colors w-full"
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

          <Link href="/blog" className="text-white text-xl sm:text-2xl font-serif hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>INSIGHTS</Link>
          <Link href="/contact" className="text-white text-xl sm:text-2xl font-serif hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>CONTACT</Link>
        </nav>
      </div>
    </header>
  );
}
