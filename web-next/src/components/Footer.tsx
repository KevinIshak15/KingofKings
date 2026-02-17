"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { SITE_PHONE, SITE_PHONE_TEL } from "@/lib/site";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

export function Footer() {
  const { isAdmin, logout } = useAdmin();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.push("/");
  }
  return (
    <footer className="bg-secondary text-white pt-24 pb-12">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24 mb-16">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="King Of Kings Logo" className="h-10 w-auto" />
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold tracking-widest uppercase text-white leading-none group-hover:text-primary transition-colors">King Of Kings</span>
                <span className="text-[0.55rem] tracking-[0.3em] uppercase text-primary mt-1">Real Estate Services</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">Setting the standard for luxury real estate and investment management across the Greater Toronto Area and cottage country.</p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-primary transition-colors"><Instagram size={20} /></a>
              <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-primary transition-colors"><Linkedin size={20} /></a>
              <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-primary transition-colors"><Facebook size={20} /></a>
              <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-primary transition-colors"><Twitter size={20} /></a>
            </div>
          </div>
          <div>
            <h4 className="font-serif text-lg mb-6">Explore</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/services" className="hover:text-primary transition-colors">Services</Link></li>
              <li><Link href="/services/real-estate" className="hover:text-primary transition-colors">Real Estate</Link></li>
              <li><Link href="/property-management" className="hover:text-primary transition-colors">Property Management</Link></li>
              <li><Link href="/services/investments" className="hover:text-primary transition-colors">Investments</Link></li>
              <li><Link href="/services/developments" className="hover:text-primary transition-colors">Developments</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-lg mb-6">Contact</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>123 Luxury Lane, Toronto, ON</li>
              <li><a href={SITE_PHONE_TEL} className="hover:text-primary transition-colors">{SITE_PHONE}</a></li>
              <li><a href="mailto:concierge@kingofkings.com" className="text-primary hover:text-primary/80 transition-colors">concierge@kingofkings.com</a></li>
            </ul>
            <Link href="/contact" className="inline-block mt-4 text-primary font-medium text-sm uppercase tracking-wider hover:text-primary/80 transition-colors">
              Get in touch
            </Link>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} King Of Kings Real Estate Services. All rights reserved.</p>
          <div className="flex flex-wrap justify-center items-center gap-6">
            {isAdmin && (
              <>
                <span className="text-primary/70">Admin</span>
                <button type="button" onClick={handleLogout} className="hover:text-white transition-colors">
                  Logout
                </button>
              </>
            )}
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
