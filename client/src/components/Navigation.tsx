import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/management", label: "Management" },
  { href: "/investors", label: "Investors" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
      )}
    >
      <div className="container-wide flex items-center justify-between">
        <Link href="/" className="z-50">
          <div className="flex items-center gap-3 cursor-pointer group">
            <img 
              src="/static/logo.png" 
              alt="King Of Kings Logo" 
              className="h-12 w-auto transition-transform duration-300 group-hover:scale-110" 
            />
            <div className="flex flex-col">
              <span className={cn(
                "font-serif text-xl font-bold tracking-widest uppercase transition-colors leading-none",
                scrolled ? "text-secondary" : "text-white"
              )}>
                King Of Kings
              </span>
              <span className={cn(
                "text-[0.55rem] tracking-[0.3em] uppercase transition-colors mt-1",
                scrolled ? "text-primary" : "text-primary"
              )}>
                Real Estate Services
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-8">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <span className={cn(
                "text-sm font-medium uppercase tracking-wider cursor-pointer transition-colors hover:text-primary",
                location === link.href ? "text-primary" : (scrolled ? "text-secondary" : "text-white/90")
              )}>
                {link.label}
              </span>
            </Link>
          ))}
          <Link href="/contact">
            <button className="bg-primary hover:bg-white hover:text-primary text-secondary px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 border border-primary">
              Book Consultation
            </button>
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden z-50 text-primary"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-8 w-8" /> : <Menu className={cn("h-8 w-8", scrolled ? "text-secondary" : "text-white")} />}
        </button>

        {/* Mobile Menu */}
        <div className={cn(
          "fixed inset-0 bg-secondary flex flex-col items-center justify-center space-y-8 transition-transform duration-500 ease-in-out lg:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}>
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <span 
                className="text-white text-2xl font-serif cursor-pointer hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
