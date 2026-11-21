import React from 'react';
import { motion } from 'motion/react';

interface Candle {
  x: number;
  high: number;
  low: number;
  open: number;
  close: number;
  bullish: boolean;
}

const CANDLES: Candle[] = [
  { x: 34, high: 186, low: 218, open: 208, close: 194, bullish: true },
  { x: 64, high: 174, low: 206, open: 194, close: 181, bullish: true },
  { x: 94, high: 178, low: 205, open: 182, close: 197, bullish: false },
  { x: 124, high: 162, low: 200, open: 196, close: 169, bullish: true },
  { x: 154, high: 146, low: 180, open: 170, close: 154, bullish: true },
  { x: 184, high: 150, low: 182, open: 155, close: 171, bullish: false },
  { x: 214, high: 138, low: 175, open: 170, close: 145, bullish: true },
  { x: 244, high: 120, low: 156, open: 146, close: 128, bullish: true },
  { x: 274, high: 124, low: 152, open: 129, close: 142, bullish: false },
  { x: 304, high: 102, low: 146, open: 141, close: 110, bullish: true },
  { x: 334, high: 88, low: 124, open: 111, close: 94, bullish: true },
  { x: 364, high: 92, low: 120, open: 95, close: 108, bullish: false },
  { x: 394, high: 70, low: 112, open: 107, close: 78, bullish: true },
  { x: 424, high: 56, low: 92, open: 79, close: 64, bullish: true },
];

const CURVE_PATH =
  'M 20 212 C 62 198, 92 188, 124 172 C 156 156, 184 166, 214 148 C 244 130, 274 138, 304 114 C 334 90, 364 102, 394 82 C 414 70, 434 62, 456 52';

const AREA_PATH = `${CURVE_PATH} L 456 240 L 20 240 Z`;

/**
 * Stylized institutional chart graphic illustrating price structure,
 * drawdown threshold guardrails, and steady execution trajectory.
 */
export const HeroChartGraphic: React.FC = () => {
  return (
    <div className="relative w-full">
      {/* Ambient layered glow behind chart card */}
      <div
        aria-hidden="true"
        className="absolute -inset-4 bg-gradient-to-tr from-[#3B82F6]/15 via-transparent to-[#D4AF37]/12 rounded-3xl blur-2xl pointer-events-none"
      />

      <div className="relative glass-panel rounded-2xl p-5 sm:p-6 overflow-hidden">
        {/* Top institutional header row */}
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div>
            <p className="text-xs font-medium tracking-wider text-slate-400 uppercase">
              Desk Risk &amp; Execution Model
            </p>
            <p className="mt-1 font-display text-base sm:text-lg font-semibold text-white">
              Structured Capital Curve
            </p>
          </div>
          <div className="text-right font-mono tabular-nums">
            <span className="text-xs text-slate-400 block">Profit Allocation</span>
            <span className="text-sm font-semibold text-gold-gradient">50% / 50%</span>
          </div>
        </div>

        {/* SVG Chart Viewport */}
        <div className="relative mt-4">
          <svg
            viewBox="0 0 476 250"
            className="w-full h-auto overflow-visible"
            role="img"
            aria-label="Stylized institutional candlestick and risk trajectory chart"
          >
            <defs>
              <linearGradient id="equityAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.28" />
                <stop offset="70%" stopColor="#3B82F6" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="equityLineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="65%" stopColor="#60A5FA" />
                <stop offset="100%" stopColor="#D4AF37" />
              </linearGradient>
            </defs>

            {/* Horizontal institutional grid lines */}
            {[50, 95, 140, 185, 230].map((y) => (
              <line
                key={y}
                x1="12"
                y1={y}
                x2="464"
                y2={y}
                stroke="rgba(148, 163, 184, 0.08)"
                strokeWidth="1"
              />
            ))}

            {/* Vertical grid lines */}
            {[64, 154, 244, 334, 424].map((x) => (
              <line
                key={x}
                x1={x}
                y1="26"
                x2={x}
                y2="236"
                stroke="rgba(148, 163, 184, 0.06)"
                strokeWidth="1"
              />
            ))}

            {/* Max Drawdown reference guardrail */}
            <line
              x1="12"
              y1="216"
              x2="464"
              y2="216"
              stroke="rgba(212, 175, 55, 0.35)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <text
              x="18"
              y="210"
              fill="#D4AF37"
              fontSize="9.5"
              fontFamily="JetBrains Mono, monospace"
              opacity="0.85"
            >
              DRAWDOWN GUARDRAIL
            </text>

            {/* Area Fill */}
            <motion.path
              d={AREA_PATH}
              fill="url(#equityAreaGrad)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.25 }}
            />

            {/* Candlesticks */}
            {CANDLES.map((c, idx) => {
              const bodyTop = Math.min(c.open, c.close);
              const bodyHeight = Math.max(Math.abs(c.close - c.open), 5);
              const fill = c.bullish ? '#3B82F6' : '#475569';
              const stroke = c.bullish ? '#60A5FA' : '#64748B';

              return (
                <motion.g
                  key={c.x}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.15 + idx * 0.045,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {/* Wick */}
                  <line
                    x1={c.x}
                    y1={c.high}
                    x2={c.x}
                    y2={c.low}
                    stroke={stroke}
                    strokeWidth="1.4"
                    strokeOpacity="0.85"
                  />
                  {/* Candle body */}
                  <rect
                    x={c.x - 5.5}
                    y={bodyTop}
                    width="11"
                    height={bodyHeight}
                    rx="2"
                    fill={fill}
                    fillOpacity={c.bullish ? 0.85 : 0.65}
                    stroke={stroke}
                    strokeWidth="0.8"
                  />
                </motion.g>
              );
            })}

            {/* Smooth Equity Trend Curve */}
            <motion.path
              d={CURVE_PATH}
              fill="none"
              stroke="url(#equityLineGrad)"
              strokeWidth="2.4"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.35, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Terminal focus node */}
            <motion.g
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 1.3 }}
            >
              <circle cx="456" cy="52" r="8" fill="#D4AF37" fillOpacity="0.18" />
              <circle cx="456" cy="52" r="3.5" fill="#D4AF37" stroke="#070B14" strokeWidth="1.5" />
            </motion.g>
          </svg>
        </div>

        {/* Bottom parameter strip (unboxed typographic metadata, zero pill clutter) */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-left">
          <div>
            <p className="text-[11px] text-slate-400">Evaluation Fee</p>
            <p className="mt-0.5 font-mono text-sm font-semibold text-white tabular-nums">$0.00</p>
          </div>
          <div>
            <p className="text-[11px] text-slate-400">Risk Mandate</p>
            <p className="mt-0.5 font-mono text-sm font-semibold text-slate-200 tabular-nums">
              Strict Cap
            </p>
          </div>
          <div>
            <p className="text-[11px] text-slate-400">Model</p>
            <p className="mt-0.5 font-mono text-sm font-semibold text-[#D4AF37] tabular-nums">
              Performance
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
