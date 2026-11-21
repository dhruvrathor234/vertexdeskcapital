import React from 'react';

interface BrandLogoProps {
  className?: string;
}

/**
 * Minimal geometric "VX" monogram SVG (sharp upward vertex/peak)
 * paired with the VERTEX / DESK CAPITAL institutional wordmark.
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({ className = '' }) => {
  return (
    <div className={`inline-flex items-center gap-3 whitespace-nowrap shrink-0 select-none ${className}`}>
      <svg
        width="34"
        height="34"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <defs>
          <linearGradient id="vx-blue-gold" x1="4" y1="30" x2="32" y2="6" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="65%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#D4AF37" />
          </linearGradient>
        </defs>
        {/* Subtle institutional frame */}
        <rect
          x="1"
          y="1"
          width="34"
          height="34"
          rx="9"
          fill="#0B1120"
          stroke="rgba(148, 163, 184, 0.22)"
          strokeWidth="1"
        />
        {/* Upward geometric Vertex peak ("V" inverted into sharp summit + intersecting "X" stroke) */}
        <path
          d="M8.5 26L16.5 10L21.5 20L27.5 10"
          stroke="url(#vx-blue-gold)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Intersecting X lower precision leg */}
        <path
          d="M19 26L27.5 15.5"
          stroke="#D4AF37"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M22.2 18.8L27.5 26"
          stroke="#E2E8F0"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      <div className="flex flex-col leading-none">
        <span className="font-display text-[15px] sm:text-base font-bold tracking-[0.14em] text-white">
          VERTEX
        </span>
        <span className="mt-1 text-[9px] font-medium tracking-[0.26em] text-slate-400 uppercase">
          DESK CAPITAL
        </span>
      </div>
    </div>
  );
};
