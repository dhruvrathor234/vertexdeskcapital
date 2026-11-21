import React from 'react';
import { Mail, Send } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { LegalDocType, NAV_LINKS } from '../data/programData';

interface FooterProps {
  onOpenLegal: (doc: LegalDocType) => void;
}

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12.031 2c-5.516 0-9.969 4.453-9.969 9.969 0 1.766.469 3.484 1.344 5l-1.406 5.156 5.281-1.375c1.469.797 3.109 1.219 4.75 1.219 5.516 0 9.969-4.453 9.969-9.969S17.547 2 12.031 2zm5.813 14.125c-.25.703-1.438 1.344-2 1.422-.531.078-1.203.109-1.938-.125-.453-.141-1.031-.344-1.766-.656-3.094-1.344-5.109-4.469-5.266-4.672-.156-.203-1.266-1.688-1.266-3.219s.797-2.281 1.078-2.594c.281-.313.609-.391.813-.391.203 0 .406 0 .578.016.188 0 .438-.078.688.531.25.609.859 2.094.938 2.25.078.156.125.344.031.547-.094.203-.141.328-.281.5-.141.172-.297.391-.422.516-.141.141-.281.297-.125.578.156.281.703 1.156 1.516 1.875 1.047.938 1.922 1.234 2.203 1.375.281.141.438.109.609-.078.172-.188.703-.813.891-1.094.188-.281.375-.234.625-.141.25.094 1.609.766 1.891.906.281.141.469.203.531.328.063.125.063.719-.188 1.422z" />
  </svg>
);

const SOCIAL_LINKS = [
  {
    name: 'WhatsApp',
    href: 'https://wa.me/919319799796',
    external: true,
    icon: <WhatsAppIcon className="w-4 h-4" />,
  },
  {
    name: 'Telegram',
    href: '#apply',
    external: false,
    icon: (
      <Send className="w-4 h-4" aria-hidden="true" />
    ),
  },
  {
    name: 'Instagram',
    href: '#apply',
    external: false,
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    name: 'X',
    href: '#apply',
    external: false,
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: '#apply',
    external: false,
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

export const Footer: React.FC<FooterProps> = ({ onOpenLegal }) => {
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-slate-800/80 bg-[#050810]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand & Contact Us Column */}
          <div className="md:col-span-5">
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              aria-label="Back to top"
              className="inline-block"
            >
              <BrandLogo />
            </a>
            <p className="mt-5 text-sm leading-relaxed text-slate-400 max-w-sm">
              Performance-based capital backing for disciplined independent traders.
              Zero upfront evaluation fees. Transparent 50/50 profit sharing.
            </p>

            {/* Contact Us Details */}
            <div className="mt-6 space-y-2.5">
              <p className="text-xs font-semibold tracking-[0.18em] text-slate-300 uppercase">
                Contact Us
              </p>
              <div className="flex flex-col gap-2.5">
                <a
                  href="mailto:vertexdeskcapital@gmail.com"
                  className="inline-flex items-center gap-2.5 text-sm text-slate-300 hover:text-white transition-colors w-fit"
                >
                  <Mail className="w-4 h-4 text-[#60A5FA] shrink-0" aria-hidden="true" />
                  <span>vertexdeskcapital@gmail.com</span>
                </a>
                <a
                  href="https://wa.me/919319799796"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-sm text-slate-300 hover:text-white transition-colors w-fit group"
                >
                  <span className="w-5 h-5 rounded-md bg-[#25D366]/15 border border-[#25D366]/40 flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366]/25 transition-colors shrink-0">
                    <WhatsAppIcon className="w-3.5 h-3.5" />
                  </span>
                  <span className="font-mono tabular-nums">+919319799796</span>
                  <span className="text-xs text-slate-500 group-hover:text-slate-300 transition-colors">
                    · WhatsApp Desk
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-semibold tracking-[0.18em] text-slate-300 uppercase">
              Program
            </h3>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Social */}
          <div className="md:col-span-4">
            <h3 className="text-xs font-semibold tracking-[0.18em] text-slate-300 uppercase">
              Compliance &amp; Channels
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('privacy')}
                  className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('terms')}
                  className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Terms and Conditions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('risk')}
                  className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Risk Disclosure
                </button>
              </li>
            </ul>

            <div className="mt-6 flex items-center gap-2.5">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target={social.external ? '_blank' : undefined}
                  rel={social.external ? 'noopener noreferrer' : undefined}
                  onClick={
                    social.external
                      ? undefined
                      : (e) => handleSmoothScroll(e, social.href)
                  }
                  aria-label={
                    social.external
                      ? `Contact us on ${social.name} (+919319799796)`
                      : `${social.name} (contact desk)`
                  }
                  title={social.name}
                  className={`w-9 h-9 rounded-xl border bg-[#0B1120] flex items-center justify-center transition-colors ${
                    social.name === 'WhatsApp'
                      ? 'border-[#25D366]/35 text-[#25D366] hover:bg-[#25D366]/15 hover:border-[#25D366]/60'
                      : 'border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Mandatory Compliance Disclaimer */}
        <div className="pt-8 space-y-4">
          <p className="text-xs leading-relaxed text-slate-500">
            Trading in financial markets involves substantial risk of loss and is not
            suitable for everyone. Past performance is not indicative of future results.
            Vertex Desk Capital is not a broker and does not offer investment advice or
            accept public deposits. Funded accounts are provided by third-party
            proprietary trading firms and are subject to their terms and conditions.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600">
            <p>&copy; {new Date().getFullYear()} Vertex Desk Capital. All rights reserved.</p>
            <p>Independent Performance-Based Trading Program</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
