import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { HERO_STATS } from '../data/programData';
import { HeroChartGraphic } from './HeroChartGraphic';

interface AnimatedCounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  prefix = '',
  suffix = '',
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(target);

  useEffect(() => {
    if (!inView) return;
    if (target === 0) {
      setDisplay(0);
      return;
    }

    const duration = 900;
    const startTime = performance.now();
    let frameId = 0;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(target * eased));
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [inView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display}
      {suffix}
    </span>
  );
};

export const HeroSection: React.FC = () => {
  const scrollToSection = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="top"
      className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden"
    >
      {/* Subtle architectural background glows */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-institutional-grid [mask-image:radial-gradient(ellipse_75%_65%_at_50%_20%,#000_40%,transparent_100%)] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -top-32 left-1/4 w-[520px] h-[520px] rounded-full bg-[#3B82F6]/12 blur-[140px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute top-24 right-1/6 w-[380px] h-[380px] rounded-full bg-[#D4AF37]/8 blur-[130px] pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        {/* Two-column Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Copy & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 xl:col-span-6"
          >
            <p className="text-xs sm:text-sm font-medium tracking-wider text-slate-400">
              Performance-Based Proprietary Program · 50/50 Model
            </p>

            <h1 className="mt-4 font-display text-4xl sm:text-5xl xl:text-[58px] font-bold tracking-tight leading-[1.08] text-white">
              Trade Skill.{' '}
              <span className="text-gold-gradient">Share Success.</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-300 max-w-xl">
              Vertex Desk Capital backs high-skilled traders with funded accounts. No
              salary. No fee to prove yourself. Pure 50/50 profit sharing.
            </p>

            {/* Primary & Ghost CTAs */}
            <div className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#apply"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('#apply');
                }}
                className="cta-gradient-border inline-block text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
              >
                <span className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-7 py-3.5 rounded-[11px] bg-[#0D1526] hover:bg-[#131F38] text-sm font-semibold text-white transition-colors whitespace-nowrap">
                  Apply as a Trader
                  <ArrowRight className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
                </span>
              </a>

              <a
                href="#how-it-works"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('#how-it-works');
                }}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-slate-700/80 bg-slate-900/40 hover:bg-slate-800/60 hover:border-slate-600 text-sm font-semibold text-slate-200 hover:text-white transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
              >
                See How It Works
                <ChevronDown className="w-4 h-4 text-slate-400" aria-hidden="true" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Stylized Animated Trading Chart Graphic */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 xl:col-span-6"
          >
            <HeroChartGraphic />
          </motion.div>
        </div>

        {/* Full-Width Glass Stats Strip Below Hero Split */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 sm:mt-16 glass-panel rounded-2xl p-6 sm:p-7"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-slate-800/80">
            {HERO_STATS.map((stat, index) => (
              <div
                key={stat.label}
                className={`${index > 0 ? 'lg:pl-7' : ''} ${
                  index < HERO_STATS.length - 1 ? 'lg:pr-7' : ''
                }`}
              >
                <div className="font-display text-2xl sm:text-[26px] font-bold tracking-tight text-gold-gradient">
                  {stat.numericTarget !== null ? (
                    <AnimatedCounter
                      target={stat.numericTarget}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                    />
                  ) : (
                    stat.value
                  )}
                </div>
                <p className="mt-1.5 text-sm font-semibold text-white">{stat.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-400">{stat.sublabel}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
