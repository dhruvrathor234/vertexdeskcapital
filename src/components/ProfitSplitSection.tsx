import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Calculator, Info } from 'lucide-react';

const PRESET_AMOUNTS = [1000, 2500, 5000, 10000, 25000];

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const ProfitSplitSection: React.FC = () => {
  const [rawAmount, setRawAmount] = useState<string>('5000');

  const parsedAmount = useMemo(() => {
    const cleaned = parseFloat(rawAmount);
    if (!Number.isFinite(cleaned) || cleaned < 0) return 0;
    return Math.min(cleaned, 10000000);
  }, [rawAmount]);

  const traderShare = parsedAmount * 0.5;
  const deskShare = parsedAmount * 0.5;

  return (
    <section id="profit-split" className="relative py-20 sm:py-28 border-t border-slate-800/60">
      <div
        aria-hidden="true"
        className="absolute right-0 top-1/3 w-[440px] h-[440px] rounded-full bg-[#D4AF37]/6 blur-[150px] pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Visual 50/50 Model Explanation */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <p className="text-xs font-semibold tracking-[0.2em] text-[#D4AF37] uppercase">
              Profit Split Architecture
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Pure <span className="text-gold-gradient">50/50</span> alignment on every payout.
            </h2>
            <p className="mt-4 text-base text-slate-400 leading-relaxed">
              Vertex Desk Capital absorbs the evaluation overhead, risk infrastructure, and
              partner firm coordination. In return, net realized payouts from funded
              accounts are divided evenly—half to you, half to the desk.
            </p>

            {/* Clear Visual 50/50 Bar */}
            <div className="mt-8 glass-panel rounded-2xl p-6">
              <div className="flex items-center justify-between text-xs font-medium text-slate-300">
                <span>Trader Share (50%)</span>
                <span>Vertex Desk Share (50%)</span>
              </div>

              <div className="mt-3 h-3.5 w-full rounded-full overflow-hidden bg-slate-900 flex border border-slate-800">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: 'left' }}
                  className="w-1/2 h-full bg-gradient-to-r from-[#2563EB] to-[#3B82F6]"
                />
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: 'left' }}
                  className="w-1/2 h-full bg-gradient-to-r from-[#B08A22] to-[#D4AF37]"
                />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4 pt-4 border-t border-slate-800/80 text-xs">
                <div>
                  <span className="block text-slate-400">You Bring</span>
                  <span className="mt-1 block font-semibold text-white">
                    Execution &amp; Risk Control
                  </span>
                </div>
                <div>
                  <span className="block text-slate-400">Desk Provides</span>
                  <span className="mt-1 block font-semibold text-white">
                    Capital Access &amp; Oversight
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Payout Split Calculator */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="glass-panel rounded-2xl p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-800/80">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0D162B] border border-slate-700/80 flex items-center justify-center text-[#3B82F6]">
                    <Calculator className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-white">
                      Profit-Share Calculator
                    </h3>
                    <p className="text-xs text-slate-400">
                      Enter a net payout figure to preview the 50/50 split
                    </p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#D4AF37]">
                  <Info className="w-3.5 h-3.5" aria-hidden="true" />
                  Illustrative example only
                </span>
              </div>

              {/* Input & Presets */}
              <div className="mt-6">
                <label
                  htmlFor="payout-amount-input"
                  className="block text-xs font-medium text-slate-300"
                >
                  Hypothetical Net Payout Amount (USD)
                </label>
                <div className="mt-2 relative">
                  <span
                    aria-hidden="true"
                    className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-lg text-slate-400"
                  >
                    $
                  </span>
                  <input
                    id="payout-amount-input"
                    type="number"
                    min="0"
                    max="10000000"
                    step="100"
                    value={rawAmount}
                    onChange={(e) => setRawAmount(e.target.value)}
                    placeholder="5000"
                    className="w-full pl-9 pr-4 py-3.5 rounded-xl bg-[#070B14] border border-slate-700/80 text-white font-mono text-xl font-semibold tabular-nums focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/25 transition-all"
                  />
                </div>

                {/* Quick Presets */}
                <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Preset payout amounts">
                  {PRESET_AMOUNTS.map((preset) => {
                    const active = parsedAmount === preset;
                    return (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setRawAmount(String(preset))}
                        className={`px-3 py-1.5 rounded-lg font-mono text-xs font-medium tabular-nums transition-colors cursor-pointer whitespace-nowrap ${
                          active
                            ? 'bg-[#3B82F6]/20 border border-[#3B82F6]/60 text-white'
                            : 'bg-[#0B1221] border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                        }`}
                      >
                        ${preset.toLocaleString('en-US')}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Live Calculated Shares */}
              <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl bg-[#070B14]/90 border border-[#3B82F6]/30 p-5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-300">Trader Share</span>
                    <span className="font-mono text-[#60A5FA] font-semibold">50%</span>
                  </div>
                  <div className="mt-3 font-mono text-2xl sm:text-3xl font-bold text-white tabular-nums">
                    {formatCurrency(traderShare)}
                  </div>
                  <p className="mt-1.5 text-[11px] text-slate-400">
                    Settled directly per written agreement
                  </p>
                </div>

                <div className="rounded-xl bg-[#070B14]/90 border border-[#D4AF37]/30 p-5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-300">Vertex Desk Share</span>
                    <span className="font-mono text-[#D4AF37] font-semibold">50%</span>
                  </div>
                  <div className="mt-3 font-mono text-2xl sm:text-3xl font-bold text-gold-gradient tabular-nums">
                    {formatCurrency(deskShare)}
                  </div>
                  <p className="mt-1.5 text-[11px] text-slate-400">
                    Supports capital backing &amp; risk desk
                  </p>
                </div>
              </div>

              <p className="mt-5 text-[11px] leading-relaxed text-slate-500">
                Illustrative example only. Figures reflect a hypothetical net payout after
                applicable partner firm splits or transaction fees and do not represent
                guaranteed or expected trading returns.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
