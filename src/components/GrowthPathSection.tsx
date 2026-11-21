import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Check } from 'lucide-react';
import { GROWTH_PATH_TIERS } from '../data/programData';

export const GrowthPathSection: React.FC = () => {
  // Progressive vertical step offsets on desktop to create an authentic staircase silhouette
  const stepMargins = ['lg:mt-24', 'lg:mt-16', 'lg:mt-8', 'lg:mt-0'];

  return (
    <section className="relative py-20 sm:py-28 border-t border-slate-800/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <p className="text-xs font-semibold tracking-[0.2em] text-[#3B82F6] uppercase">
            Trader Growth Path
          </p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            A structured progression ladder earned through consistency.
          </h2>
          <p className="mt-4 text-base text-slate-400 leading-relaxed">
            Capital expands systematically as you demonstrate controlled drawdown and
            repeatable risk-adjusted returns across consecutive cycles.
          </p>
        </motion.div>

        {/* Visual Staircase Grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-end">
          {GROWTH_PATH_TIERS.map((tier, idx) => {
            const isTopTier = tier.accent === 'gold';
            return (
              <motion.div
                key={tier.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.55,
                  delay: idx * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`${stepMargins[idx]} relative`}
              >
                <div
                  className={`glass-panel rounded-2xl p-6 transition-all duration-200 ${
                    isTopTier
                      ? 'border-[#D4AF37]/40 shadow-[0_24px_60px_-24px_rgba(212,175,55,0.22)]'
                      : 'hover:border-slate-700'
                  }`}
                >
                  {/* Step level bar */}
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className={isTopTier ? 'text-[#D4AF37] font-semibold' : 'text-[#60A5FA]'}>
                      {tier.tier}
                    </span>
                    <span className="text-slate-500">{tier.stage}</span>
                  </div>

                  {/* Ascending ladder meter */}
                  <div className="mt-4 flex items-center gap-1.5" aria-hidden="true">
                    {[0, 1, 2, 3].map((bar) => (
                      <span
                        key={bar}
                        className={`h-1 flex-1 rounded-full ${
                          bar <= idx
                            ? isTopTier
                              ? 'bg-[#D4AF37]'
                              : 'bg-[#3B82F6]'
                            : 'bg-slate-800'
                        }`}
                      />
                    ))}
                  </div>

                  <h3 className="mt-5 font-display text-xl font-bold text-white flex items-center justify-between">
                    <span>{tier.title}</span>
                    {isTopTier && <ArrowUpRight className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-slate-400">{tier.subtitle}</p>

                  <p className="mt-4 text-sm leading-relaxed text-slate-300">
                    {tier.description}
                  </p>

                  <ul className="mt-6 pt-5 border-t border-slate-800/80 space-y-2.5">
                    {tier.highlights.map((hl) => (
                      <li key={hl} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <Check
                          className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${
                            isTopTier ? 'text-[#D4AF37]' : 'text-[#3B82F6]'
                          }`}
                          aria-hidden="true"
                        />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
