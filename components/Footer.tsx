"use client";

import Link from "next/link";
import { Instagram, Twitter, Facebook } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-black text-white pt-20 pb-10 px-6 md:px-12 border-t border-neutral-800 relative z-10">
      <div className="max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-24 mb-20">
          {/* Brand Column */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold uppercase tracking-tighter">Ownstar</h2>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-xs">
              Redefiniendo el streetwear moderno con diseños minimalistas y calidad premium. Diseñado para la nueva generación.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500">
              {t.footer.explore}
            </h3>
            <nav className="flex flex-col gap-4">
              <Link
                href="/shop"
                className="text-sm hover:text-neutral-400 transition-colors uppercase tracking-wide w-fit"
              >
                {t.header.shop}
              </Link>
              <Link
                href="/about"
                className="text-sm hover:text-neutral-400 transition-colors uppercase tracking-wide w-fit"
              >
                {t.header.about}
              </Link>
              <Link
                href="/account"
                className="text-sm hover:text-neutral-400 transition-colors uppercase tracking-wide w-fit"
              >
                {t.header.account}
              </Link>
            </nav>
          </div>

          {/* Support */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500">
              {t.footer.help}
            </h3>
            <nav className="flex flex-col gap-4">
              <Link
                href="/faq"
                className="text-sm hover:text-neutral-400 transition-colors uppercase tracking-wide w-fit"
              >
                {t.footer.faq}
              </Link>
              <Link
                href="/shipping"
                className="text-sm hover:text-neutral-400 transition-colors uppercase tracking-wide w-fit"
              >
                {t.footer.shipping}
              </Link>
              <Link
                href="/contact"
                className="text-sm hover:text-neutral-400 transition-colors uppercase tracking-wide w-fit"
              >
                {t.footer.contact}
              </Link>
              <Link
                href="/terms"
                className="text-sm hover:text-neutral-400 transition-colors uppercase tracking-wide w-fit"
              >
                {t.footer.terms}
              </Link>
            </nav>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500">
              {t.footer.newsletter}
            </h3>
            <p className="text-sm text-neutral-400">
              {t.footer.newsletter_desc}
            </p>
            <form className="space-y-4">
              <input
                type="email"
                placeholder={t.hero.email_placeholder}
                className="w-full bg-transparent border-b border-neutral-700 py-2 text-sm focus:border-white focus:outline-none transition-colors placeholder:text-neutral-600 uppercase"
              />
              <button
                type="submit"
                className="text-xs font-bold uppercase tracking-widest hover:text-neutral-400 transition-colors"
              >
                {t.footer.subscribe_btn}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-neutral-600 uppercase tracking-wider">
            © {new Date().getFullYear()} Ownstar. {t.footer.rights}
          </p>
          
          {/* Socials */}
          <div className="flex gap-6">
            <Link href="https://instagram.com/ownstar.co" target="_blank" className="text-neutral-400 hover:text-white transition-colors">
              <Instagram className="w-5 h-5" />
            </Link>
          </div>
          
          <div className="flex gap-4">
             {/* Payment Icons Placeholder */}
             <div className="flex gap-2 opacity-50">
               <div className="w-8 h-5 bg-neutral-800 rounded-sm" />
               <div className="w-8 h-5 bg-neutral-800 rounded-sm" />
               <div className="w-8 h-5 bg-neutral-800 rounded-sm" />
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

