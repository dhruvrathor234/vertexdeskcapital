import React from 'react';
import { motion } from 'motion/react';
import {
  AlertTriangle,
  ArrowDownToLine,
  CalendarClock,
  CheckCircle2,
  Info,
  Lock,
  Sliders,
} from 'lucide-react';
import {
  ELIGIBILITY_REQUIREMENTS,
  RULES_AND_STANDARDS,
  RuleCardItem,
} from '../data/programData';

const RULE_ICONS: Record<
  RuleCardItem['iconName'],
  React.ComponentType<{ className?: string }>
> = {
  ArrowDownToLine,
  AlertTriangle,
  Sliders,
  CalendarClock,
  Lock,
};

export const RulesAndEligibilitySection: React.FC = () => {
  return (
    <>
      {/* Section 7: Rules and Standards */}
      <section className="relative py-20 sm:py-28 border-t border-slate-800/60">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-6"
          >
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.2em] text-[#3B82F6] uppercase">
                Rules &amp; Standards
              </p>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Capital protection comes before everything else.
              </h2>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Risk boundaries are strictly enforced across both simulated evaluations and
              live partner-backed accounts.
            </p>
          </motion.div>

          {/* 5 Rule Cards */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RULES_AND_STANDARDS.map((rule, idx) => {
              const Icon = RULE_ICONS[rule.iconName];
              const isWide = idx === 4;
              return (
                <motion.div
                  key={rule.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.07,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`glass-panel rounded-2xl p-6 sm:p-7 ${
                    isWide ? 'md:col-span-2 lg:col-span-2' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#0D162B] border border-slate-700/80 flex items-center justify-center text-[#D4AF37] shrink-0">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <span className="font-mono text-[11px] font-medium text-slate-400">
                      {rule.metric}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-lg font-semibold text-white">
                    {rule.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-400">
                    {rule.summary}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Partner Firm Terms Note */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="mt-8 rounded-2xl border border-slate-800 bg-[#0A101E]/80 px-6 py-4 flex items-start sm:items-center gap-3.5"
          >
            <Info className="w-4 h-4 text-[#60A5FA] shrink-0 mt-0.5 sm:mt-0" aria-hidden="true" />
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Note: Specific drawdown percentages, permitted instruments, and news-window
              restrictions follow the assigned third-party funding partner firm’s prevailing
              terms and conditions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 8: Who We Are Looking For */}
      <section className="relative py-20 sm:py-28 border-t border-slate-800/60">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5"
            >
              <p className="text-xs font-semibold tracking-[0.2em] text-[#D4AF37] uppercase">
                Who We Are Looking For
              </p>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Selectivity protects both the trader and the desk.
              </h2>
              <p className="mt-4 text-base text-slate-400 leading-relaxed">
                We partner with independent operators who treat trading as a structured
                craft. You do not need to trade high frequency—you need repeatable risk
                control and verifiable compliance readiness.
              </p>
            </motion.div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {ELIGIBILITY_REQUIREMENTS.map((req, idx) => (
                <motion.div
                  key={req.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="glass-panel rounded-2xl p-6"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2
                      className="w-5 h-5 text-[#3B82F6] shrink-0"
                      aria-hidden="true"
                    />
                    <h3 className="font-display text-base font-semibold text-white">
                      {req.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    {req.detail}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
