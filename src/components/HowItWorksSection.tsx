import React from 'react';
import { motion } from 'motion/react';
import { HOW_IT_WORKS_STEPS } from '../data/programData';

export const HowItWorksSection: React.FC = () => {
  return (
    <section id="how-it-works" className="relative py-20 sm:py-28 border-t border-slate-800/60">
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
            Evaluation Pathway
          </p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Four disciplined steps from application to scaled capital.
          </h2>
          <p className="mt-4 text-base text-slate-400 leading-relaxed">
            Every trader moves through the same transparent progression. Performance and
            risk discipline dictate advancement—never upfront fees.
          </p>
        </motion.div>

        {/* Timeline Grid with Connecting Animated Line */}
        <div className="relative mt-14 sm:mt-16">
          {/* Desktop horizontal connecting track */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-7 left-0 right-0 h-px bg-slate-800/90"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: 'left' }}
              className="h-full w-full bg-vertex-gradient opacity-80"
            />
          </div>

          {/* Mobile vertical connecting track */}
          <div
            aria-hidden="true"
            className="lg:hidden absolute top-6 bottom-6 left-6 w-px bg-slate-800/90"
          >
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.0, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: 'top' }}
              className="w-full h-full bg-gradient-to-b from-[#3B82F6] via-[#60A5FA] to-[#D4AF37] opacity-75"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6">
            {HOW_IT_WORKS_STEPS.map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.55,
                  delay: idx * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative pl-16 lg:pl-0"
              >
                {/* Step Node */}
                <div className="absolute left-0 top-0 lg:static flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-[#0B1221] border border-slate-700/80 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.8)] z-10">
                  <span className="font-mono text-sm font-semibold text-gold-gradient tabular-nums">
                    {item.step}
                  </span>
                </div>

                {/* Card Content */}
                <div className="lg:mt-7 glass-panel rounded-2xl p-6 h-full flex flex-col justify-between hover:border-slate-700/90 transition-colors">
                  <div>
                    <h3 className="font-display text-lg font-semibold leading-snug text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-400">
                      {item.description}
                    </p>
                  </div>
                  <p className="mt-5 pt-4 border-t border-slate-800/80 text-xs font-medium text-slate-300">
                    {item.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
