"use client";

import Link from "next/link";
import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { LISTINGS_MENU } from "@/lib/listings-menu";

interface ListingsMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  scrolled: boolean;
}

export function ListingsMegaMenu({ isOpen, onClose, onMouseEnter, onMouseLeave, scrolled }: ListingsMegaMenuProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeCategory = LISTINGS_MENU[activeIndex];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "ArrowDown" && activeIndex < LISTINGS_MENU.length - 1) {
        e.preventDefault();
        setActiveIndex((i) => i + 1);
      }
      if (e.key === "ArrowUp" && activeIndex > 0) {
        e.preventDefault();
        setActiveIndex((i) => i - 1);
      }
    },
    [isOpen, onClose, activeIndex]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isOpen) setActiveIndex(0);
  }, [isOpen]);

  const menuBg = scrolled ? "bg-white shadow-lg border-t border-gray-100" : "bg-white shadow-xl border-t border-gray-100";

  if (!isOpen) return null;

  return (
    <div
      id="listings-mega-menu"
      ref={containerRef}
      className={cn("absolute left-0 right-0 top-full pt-0 z-40", menuBg)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="menu"
      aria-label="Listings submenu"
    >
      <div className="container-wide py-8">
        <div className="flex gap-0">
          <div className="w-56 shrink-0 border-r border-gray-200 pr-6">
            <nav className="flex flex-col gap-0.5" role="navigation">
              {LISTINGS_MENU.map((item, i) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={onClose}
                  role="menuitem"
                  tabIndex={0}
                  onMouseEnter={() => setActiveIndex(i)}
                  onFocus={() => setActiveIndex(i)}
                  className={cn(
                    "block px-4 py-3 text-sm font-medium uppercase tracking-wider transition-colors rounded",
                    i === activeIndex ? "text-primary bg-primary/5" : "text-secondary/80 hover:text-primary hover:bg-gray-50"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-1 pl-10 min-w-0" key={activeCategory.id}>
            <div className="max-w-xl">
              <h3 className="font-serif text-xl text-secondary mb-2">{activeCategory.label}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">{activeCategory.description}</p>
              <Link
                href={activeCategory.href}
                onClick={onClose}
                className="inline-flex items-center text-secondary font-bold text-xs uppercase tracking-widest hover:text-primary transition-colors group"
              >
                View Listings
                <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
