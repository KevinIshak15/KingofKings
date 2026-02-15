"use client";

import Link from "next/link";
import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SERVICES_MENU } from "@/lib/services-menu";

interface ServicesMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  scrolled: boolean;
}

export function ServicesMegaMenu({ isOpen, onClose, onMouseEnter, onMouseLeave, scrolled }: ServicesMegaMenuProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeCategory = SERVICES_MENU[activeIndex];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "ArrowDown" && activeIndex < SERVICES_MENU.length - 1) {
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
      id="services-mega-menu"
      ref={containerRef}
      className={cn("absolute left-0 right-0 top-full pt-0 z-40", menuBg)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="menu"
      aria-label="Services submenu"
    >
      <div className="container-wide py-8">
        <div className="flex gap-0">
          <div className="w-56 shrink-0 border-r border-gray-200 pr-6">
            <nav className="flex flex-col gap-0.5" role="navigation">
              {SERVICES_MENU.map((item, i) => (
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
              {"subGroups" in activeCategory && activeCategory.subGroups ? (
                <div className="space-y-6">
                  {activeCategory.subGroups.map((group) => (
                    <div key={group.label}>
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">{group.label}</p>
                      <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                        {group.items.map((sub) => (
                          <Link
                            key={`${activeCategory.id}-${group.label}-${sub.label}`}
                            href={sub.href}
                            className="block text-sm text-gray-600 hover:text-primary transition-colors py-2 -my-1 rounded hover:bg-gray-50/50"
                            onClick={onClose}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                  {activeCategory.subItems.map((sub) => (
                    <Link
                      key={`${activeCategory.id}-${sub.label}`}
                      href={sub.href}
                      className="block text-sm text-gray-600 hover:text-primary transition-colors py-2 -my-1 rounded hover:bg-gray-50/50"
                      onClick={onClose}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
              <div className="flex flex-wrap gap-6 mt-6">
              <Link
                href={activeCategory.href}
                onClick={onClose}
                className="inline-flex items-center text-secondary font-bold text-xs uppercase tracking-widest hover:text-primary transition-colors group"
              >
                Explore {activeCategory.label}
                <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link href="/services" onClick={onClose} className="text-gray-500 text-xs uppercase tracking-widest hover:text-primary transition-colors">
                View all services
              </Link>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
