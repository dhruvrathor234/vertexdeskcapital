import React from 'react';
import { motion } from 'motion/react';
import {
  Activity,
  FileCheck2,
  Laptop,
  Scale,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import { FeatureItem, WHY_VERTEX_FEATURES } from '../data/programData';

const ICON_MAP: Record<FeatureItem['iconName'], React.ComponentType<{ className?: string }>> = {
  ShieldCheck,
  Scale,
  Laptop,
  Activity,
  FileCheck2,
  TrendingUp,
};

export const WhyVertexSection: React.FC = () => {
  return (
    <section id="program" className="relative py-20 sm:py-28 border-t border-slate-800/60">
      {/* Subtle radial backlight */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[420px] rounded-full bg-[#3B82F6]/6 blur-[160px] pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] text-[#D4AF37] uppercase">
              Why Vertex Desk Capital
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Institutional alignment built for serious independent traders.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-400 max-w-md leading-relaxed">
            No retail challenge gimmicks. Every structure is designed around capital
            preservation, clear legal terms, and symmetric upside.
          </p>
        </motion.div>

        {/* 6 Feature Cards */}
        <div className="mt-12 sm:mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_VERTEX_FEATURES.map((feature, idx) => {
            const Icon = ICON_MAP[feature.iconName];
            return (
              <motion.article
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -4 }}
                className="group relative glass-panel rounded-2xl p-7 transition-all duration-200 hover:border-[#3B82F6]/45 hover:shadow-[0_24px_48px_-24px_rgba(59,130,246,0.25)]"
              >
                {/* Hover top hairline accent */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#3B82F6]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />

                <div className="w-11 h-11 rounded-xl bg-[#0D162B] border border-slate-700/80 flex items-center justify-center text-[#60A5FA] group-hover:text-[#D4AF37] group-hover:border-[#D4AF37]/40 transition-colors">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>

                <h3 className="mt-6 font-display text-lg font-semibold text-white">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  {feature.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
