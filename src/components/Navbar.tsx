import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { NAV_LINKS } from '../data/programData';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#070B14]/82 backdrop-blur-xl border-b border-slate-800/80 shadow-[0_12px_36px_-18px_rgba(0,0,0,0.85)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 sm:h-[72px] flex items-center justify-between gap-8">
        {/* Zone 1: Brand Mark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setMobileOpen(false);
          }}
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded-lg"
          aria-label="Vertex Desk Capital Home"
        >
          <BrandLogo />
        </a>

        {/* Zone 2: Primary Nav Links (Desktop) */}
        <nav aria-label="Primary Navigation" className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="relative py-1 text-sm font-medium text-slate-300 hover:text-white transition-colors whitespace-nowrap shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded"
            >
              {item.label}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-[#3B82F6] to-[#D4AF37] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"
              />
            </a>
          ))}
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#apply"
            onClick={(e) => handleNavClick(e, '#apply')}
            className="hidden sm:inline-block cta-gradient-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
          >
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[11px] bg-[#0B1221] hover:bg-[#0F172A] text-xs font-semibold tracking-wide text-white transition-colors whitespace-nowrap shrink-0">
              Apply Now
              <ArrowUpRight className="w-3.5 h-3.5 text-[#D4AF37]" aria-hidden="true" />
            </span>
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl border border-slate-800 bg-[#0B1221]/80 text-slate-200 hover:text-white hover:border-slate-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Animated Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden border-b border-slate-800/90 bg-[#070B14]/95 backdrop-blur-2xl"
          >
            <nav aria-label="Mobile Navigation" className="max-w-7xl mx-auto px-5 py-5 flex flex-col gap-1">
              {NAV_LINKS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="flex items-center justify-between px-3 py-3 rounded-xl text-sm font-medium text-slate-200 hover:text-white hover:bg-slate-800/50 transition-colors min-h-[44px]"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-500" aria-hidden="true" />
                </a>
              ))}
              <div className="pt-3 mt-2 border-t border-slate-800/80">
                <a
                  href="#apply"
                  onClick={(e) => handleNavClick(e, '#apply')}
                  className="block w-full cta-gradient-border"
                >
                  <span className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-[11px] bg-[#0B1221] text-sm font-semibold text-white">
                    Apply Now
                    <ArrowUpRight className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
                  </span>
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
