import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { FAQ_ITEMS } from '../data/programData';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" className="relative py-20 sm:py-28 border-t border-slate-800/60">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="text-xs font-semibold tracking-[0.2em] text-[#3B82F6] uppercase">
            Frequently Asked Questions
          </p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Program mechanics, payouts, and compliance clarity.
          </h2>
        </motion.div>

        <div className="mt-12 space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            const panelId = `faq-panel-${idx}`;
            const buttonId = `faq-button-${idx}`;

            return (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.45,
                  delay: idx * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`rounded-2xl border transition-colors ${
                  isOpen
                    ? 'bg-[#0B1221]/90 border-[#3B82F6]/40 shadow-[0_12px_36px_-18px_rgba(59,130,246,0.2)]'
                    : 'bg-[#0A0F1D]/65 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <button
                  id={buttonId}
                  type="button"
                  onClick={() => toggleIndex(idx)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded-2xl"
                >
                  <span className="font-display text-base sm:text-lg font-medium text-white">
                    {item.question}
                  </span>
                  <span
                    className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 transition-all duration-200 ${
                      isOpen
                        ? 'bg-[#3B82F6]/15 border-[#3B82F6]/40 text-[#60A5FA] rotate-45'
                        : 'bg-slate-900/70 border-slate-800 text-slate-400 rotate-0'
                    }`}
                    aria-hidden="true"
                  >
                    <Plus className="w-4 h-4" />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 text-sm sm:text-[15px] leading-relaxed text-slate-300 border-t border-slate-800/60">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
