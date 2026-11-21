import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Check, CheckCircle2, Loader2, Mail, MessageSquare } from 'lucide-react';
import { LegalDocType } from '../data/programData';

export interface TraderApplicationPayload {
  fullName: string;
  email: string;
  messenger: string;
  country: string;
  experienceYears: string;
  markets: string[];
  monthlyReturnRange: string;
  bio: string;
  acceptedTerms: boolean;
  submittedAt: string;
}

interface ApplicationApiResponse {
  ok: boolean;
  delivery?: 'smtp' | 'resend' | 'webhook' | 'direct_action_fallback';
  recipient?: string;
  mailtoHref?: string;
  whatsappHref?: string;
  error?: string;
}

const MARKET_OPTIONS = ['Gold', 'Forex', 'Crypto', 'Indices'] as const;

const EXPERIENCE_OPTIONS = [
  'Less than 1 year',
  '1–2 years',
  '3–5 years',
  '5+ years',
] as const;

const RETURN_RANGE_OPTIONS = [
  'Focused on consistency (0%–3%)',
  '3%–6% average',
  '6%–10% average',
  '10%+ (high-volatility strategy)',
] as const;

async function submitTraderApplication(
  payload: TraderApplicationPayload,
): Promise<ApplicationApiResponse> {
  const response = await fetch('/api/apply', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = (await response.json()) as ApplicationApiResponse;
  if (!response.ok || !data.ok) {
    throw new Error(data.error || 'Failed to submit application. Please try again.');
  }
  return data;
}

interface ApplicationFormSectionProps {
  onOpenLegal: (doc: LegalDocType) => void;
}

interface FloatingInputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (val: string) => void;
  error?: string;
  required?: boolean;
  autoComplete?: string;
}

const FloatingField: React.FC<FloatingInputProps> = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  error,
  required = true,
  autoComplete,
}) => {
  return (
    <div>
      <div className="relative group">
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder=" "
          required={required}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          className={`peer w-full px-4 pt-6 pb-2.5 rounded-xl bg-[#070B14]/90 border text-sm text-white placeholder-transparent transition-all duration-200 focus:outline-none focus:ring-2 ${
            error
              ? 'border-rose-500/70 focus:border-rose-400 focus:ring-rose-500/20'
              : 'border-slate-700/80 focus:border-[#3B82F6] focus:ring-[#3B82F6]/25 focus:shadow-[0_0_24px_-6px_rgba(59,130,246,0.35)]'
          }`}
        />
        <label
          htmlFor={id}
          className="pointer-events-none absolute left-4 top-2 text-[11px] font-medium text-slate-400 transition-all duration-200
            peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-400
            peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-[#60A5FA]"
        >
          {label}
        </label>
      </div>
      {error && (
        <p className="mt-1.5 text-xs text-rose-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export const ApplicationFormSection: React.FC<ApplicationFormSectionProps> = ({
  onOpenLegal,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [messenger, setMessenger] = useState('');
  const [country, setCountry] = useState('');
  const [experienceYears, setExperienceYears] = useState('');
  const [markets, setMarkets] = useState<string[]>(['Gold', 'Forex']);
  const [monthlyReturnRange, setMonthlyReturnRange] = useState('');
  const [bio, setBio] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    applicantName: string;
    delivery: ApplicationApiResponse['delivery'];
    mailtoHref?: string;
    whatsappHref?: string;
  } | null>(null);

  const toggleMarket = (market: string) => {
    setMarkets((prev) =>
      prev.includes(market) ? prev.filter((m) => m !== market) : [...prev, market],
    );
    setErrors((prev) => ({ ...prev, markets: '' }));
  };

  const validate = (): boolean => {
    const nextErrors: Record<string, string> = {};
    if (fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full legal name.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (messenger.trim().length < 3) {
      nextErrors.messenger = 'Provide a valid WhatsApp number or Telegram handle.';
    }
    if (country.trim().length < 2) {
      nextErrors.country = 'Please enter your country of residence.';
    }
    if (!experienceYears) {
      nextErrors.experienceYears = 'Select your years of live or demo experience.';
    }
    if (markets.length === 0) {
      nextErrors.markets = 'Select at least one primary market.';
    }
    if (!monthlyReturnRange) {
      nextErrors.monthlyReturnRange = 'Select a historical return range.';
    }
    if (bio.trim().length < 20) {
      nextErrors.bio =
        'Share at least a brief overview of your trading strategy and risk rules (20+ characters).';
    }
    if (!acceptedTerms) {
      nextErrors.acceptedTerms = 'You must acknowledge the terms and risk disclosure.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const payload: TraderApplicationPayload = {
        fullName: fullName.trim(),
        email: email.trim(),
        messenger: messenger.trim(),
        country: country.trim(),
        experienceYears,
        markets,
        monthlyReturnRange,
        bio: bio.trim(),
        acceptedTerms,
        submittedAt: new Date().toISOString(),
      };
      const result = await submitTraderApplication(payload);
      setSubmissionResult({
        applicantName: payload.fullName,
        delivery: result.delivery,
        mailtoHref: result.mailtoHref,
        whatsappHref: result.whatsappHref,
      });
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : 'Submission failed. Please try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFullName('');
    setEmail('');
    setMessenger('');
    setCountry('');
    setExperienceYears('');
    setMarkets(['Gold', 'Forex']);
    setMonthlyReturnRange('');
    setBio('');
    setAcceptedTerms(false);
    setErrors({});
    setSubmitError(null);
    setSubmissionResult(null);
  };

  return (
    <section id="apply" className="relative py-20 sm:py-28 border-t border-slate-800/60">
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[640px] h-[360px] rounded-full bg-[#3B82F6]/10 blur-[160px] pointer-events-none"
      />

      <div className="relative max-w-5xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="text-xs font-semibold tracking-[0.2em] text-[#D4AF37] uppercase">
            Trader Application
          </p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Apply for evaluation access.
          </h2>
          <p className="mt-4 text-base text-slate-400 leading-relaxed">
            Applications are sent directly to our review desk at{' '}
            <a
              href="mailto:vertexdeskcapital@gmail.com"
              className="text-slate-200 hover:text-white underline underline-offset-4"
            >
              vertexdeskcapital@gmail.com
            </a>
            . Shortlisted candidates receive instructions for a zero-fee demo evaluation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 glass-panel rounded-2xl p-6 sm:p-10"
        >
          <AnimatePresence mode="wait">
            {submissionResult ? (
              <motion.div
                key="success-state"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="py-10 text-center max-w-lg mx-auto"
              >
                <div className="w-14 h-14 mx-auto rounded-2xl bg-[#3B82F6]/15 border border-[#3B82F6]/40 flex items-center justify-center text-[#60A5FA]">
                  <CheckCircle2 className="w-7 h-7" aria-hidden="true" />
                </div>
                <h3 className="mt-6 font-display text-2xl font-bold text-white">
                  Application Received
                </h3>
                <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                  Thank you,{' '}
                  <span className="text-white font-semibold">
                    {submissionResult.applicantName}
                  </span>
                  .{' '}
                  {submissionResult.delivery === 'direct_action_fallback'
                    ? 'Your application details have been prepared. Click below to send a copy directly via Email or WhatsApp if you would like instant confirmation.'
                    : 'Your trader profile has been sent directly to vertexdeskcapital@gmail.com for desk review.'}
                </p>

                {submissionResult.delivery === 'direct_action_fallback' && (
                  <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                    {submissionResult.mailtoHref && (
                      <a
                        href={submissionResult.mailtoHref}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#3B82F6] hover:bg-[#2563EB] text-xs font-semibold text-white transition-colors w-full sm:w-auto"
                      >
                        <Mail className="w-4 h-4" aria-hidden="true" />
                        Send to vertexdeskcapital@gmail.com
                      </a>
                    )}
                    {submissionResult.whatsappHref && (
                      <a
                        href={submissionResult.whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-[#25D366]/50 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-xs font-semibold text-white transition-colors w-full sm:w-auto"
                      >
                        <MessageSquare className="w-4 h-4 text-[#25D366]" aria-hidden="true" />
                        Send via WhatsApp (+919319799796)
                      </a>
                    )}
                  </div>
                )}

                <p className="mt-5 text-xs text-slate-400">
                  No fees are required at any stage of review.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-7 px-6 py-2.5 rounded-xl border border-slate-700 hover:border-slate-500 text-xs font-semibold text-slate-200 hover:text-white transition-colors cursor-pointer"
                >
                  Submit Another Application
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                noValidate
                className="space-y-6"
              >
                {/* Row 1: Identity */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FloatingField
                    id="app-full-name"
                    label="Full Name"
                    value={fullName}
                    onChange={(val) => {
                      setFullName(val);
                      setErrors((p) => ({ ...p, fullName: '' }));
                    }}
                    error={errors.fullName}
                    autoComplete="name"
                  />
                  <FloatingField
                    id="app-email"
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(val) => {
                      setEmail(val);
                      setErrors((p) => ({ ...p, email: '' }));
                    }}
                    error={errors.email}
                    autoComplete="email"
                  />
                </div>

                {/* Row 2: Contact & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FloatingField
                    id="app-messenger"
                    label="WhatsApp / Telegram (@handle or number)"
                    value={messenger}
                    onChange={(val) => {
                      setMessenger(val);
                      setErrors((p) => ({ ...p, messenger: '' }));
                    }}
                    error={errors.messenger}
                  />
                  <FloatingField
                    id="app-country"
                    label="Country of Residence"
                    value={country}
                    onChange={(val) => {
                      setCountry(val);
                      setErrors((p) => ({ ...p, country: '' }));
                    }}
                    error={errors.country}
                    autoComplete="country-name"
                  />
                </div>

                {/* Row 3: Experience & Average Monthly Return */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="app-experience"
                      className="block text-xs font-medium text-slate-300 mb-2"
                    >
                      Trading Experience (Years)
                    </label>
                    <select
                      id="app-experience"
                      value={experienceYears}
                      onChange={(e) => {
                        setExperienceYears(e.target.value);
                        setErrors((p) => ({ ...p, experienceYears: '' }));
                      }}
                      aria-invalid={Boolean(errors.experienceYears)}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#070B14]/90 border border-slate-700/80 text-sm text-white focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/25 transition-all"
                    >
                      <option value="" disabled className="bg-[#0A0E1A] text-slate-400">
                        Select experience level
                      </option>
                      {EXPERIENCE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#0A0E1A] text-white">
                          {opt}
                        </option>
                      ))}
                    </select>
                    {errors.experienceYears && (
                      <p className="mt-1.5 text-xs text-rose-400" role="alert">
                        {errors.experienceYears}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="app-return-range"
                      className="block text-xs font-medium text-slate-300 mb-2"
                    >
                      Average Monthly Return Range (Historical / Self-Reported)
                    </label>
                    <select
                      id="app-return-range"
                      value={monthlyReturnRange}
                      onChange={(e) => {
                        setMonthlyReturnRange(e.target.value);
                        setErrors((p) => ({ ...p, monthlyReturnRange: '' }));
                      }}
                      aria-invalid={Boolean(errors.monthlyReturnRange)}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#070B14]/90 border border-slate-700/80 text-sm text-white focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/25 transition-all"
                    >
                      <option value="" disabled className="bg-[#0A0E1A] text-slate-400">
                        Select typical range
                      </option>
                      {RETURN_RANGE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#0A0E1A] text-white">
                          {opt}
                        </option>
                      ))}
                    </select>
                    {errors.monthlyReturnRange && (
                      <p className="mt-1.5 text-xs text-rose-400" role="alert">
                        {errors.monthlyReturnRange}
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 4: Interactive Multi-Select Markets Traded */}
                <div>
                  <span className="block text-xs font-medium text-slate-300 mb-2.5">
                    Markets Traded (Select all that apply)
                  </span>
                  <div className="flex flex-wrap gap-2.5" role="group" aria-label="Markets Traded">
                    {MARKET_OPTIONS.map((market) => {
                      const selected = markets.includes(market);
                      return (
                        <button
                          key={market}
                          type="button"
                          onClick={() => toggleMarket(market)}
                          aria-pressed={selected}
                          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium border transition-all cursor-pointer whitespace-nowrap min-h-[40px] ${
                            selected
                              ? 'bg-[#3B82F6]/20 border-[#3B82F6]/70 text-white shadow-[0_0_20px_-6px_rgba(59,130,246,0.45)]'
                              : 'bg-[#070B14]/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                          }`}
                        >
                          <span
                            className={`w-4 h-4 rounded flex items-center justify-center border ${
                              selected
                                ? 'bg-[#3B82F6] border-[#3B82F6] text-white'
                                : 'border-slate-600'
                            }`}
                            aria-hidden="true"
                          >
                            {selected && <Check className="w-3 h-3" />}
                          </span>
                          {market}
                        </button>
                      );
                    })}
                  </div>
                  {errors.markets && (
                    <p className="mt-1.5 text-xs text-rose-400" role="alert">
                      {errors.markets}
                    </p>
                  )}
                </div>

                {/* Row 5: Short Bio */}
                <div>
                  <div className="relative">
                    <textarea
                      id="app-bio"
                      rows={4}
                      value={bio}
                      onChange={(e) => {
                        setBio(e.target.value);
                        setErrors((p) => ({ ...p, bio: '' }));
                      }}
                      placeholder=" "
                      aria-invalid={Boolean(errors.bio)}
                      className={`peer w-full px-4 pt-6 pb-3 rounded-xl bg-[#070B14]/90 border text-sm text-white placeholder-transparent transition-all duration-200 focus:outline-none focus:ring-2 resize-y ${
                        errors.bio
                          ? 'border-rose-500/70 focus:border-rose-400 focus:ring-rose-500/20'
                          : 'border-slate-700/80 focus:border-[#3B82F6] focus:ring-[#3B82F6]/25 focus:shadow-[0_0_24px_-6px_rgba(59,130,246,0.35)]'
                      }`}
                    />
                    <label
                      htmlFor="app-bio"
                      className="pointer-events-none absolute left-4 top-2 text-[11px] font-medium text-slate-400 transition-all duration-200
                        peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-400
                        peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-[#60A5FA]"
                    >
                      Short Bio &amp; Strategy Overview (sessions, risk per trade, style)
                    </label>
                  </div>
                  {errors.bio && (
                    <p className="mt-1.5 text-xs text-rose-400" role="alert">
                      {errors.bio}
                    </p>
                  )}
                </div>

                {/* Terms & Risk Disclosure Checkbox */}
                <div className="pt-1">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={acceptedTerms}
                      onChange={(e) => {
                        setAcceptedTerms(e.target.checked);
                        setErrors((p) => ({ ...p, acceptedTerms: '' }));
                      }}
                      className="mt-0.5 h-4 w-4 rounded border-slate-600 bg-[#070B14] text-[#3B82F6] focus:ring-[#3B82F6] focus:ring-offset-[#070B14] cursor-pointer"
                    />
                    <span className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      I confirm that all submitted details are accurate, that I will trade
                      independently in my own legal name, and that I have read the{' '}
                      <button
                        type="button"
                        onClick={() => onOpenLegal('terms')}
                        className="text-[#60A5FA] hover:text-white underline underline-offset-2 cursor-pointer"
                      >
                        Terms &amp; Conditions
                      </button>{' '}
                      and{' '}
                      <button
                        type="button"
                        onClick={() => onOpenLegal('risk')}
                        className="text-[#60A5FA] hover:text-white underline underline-offset-2 cursor-pointer"
                      >
                        Risk Disclosure
                      </button>
                      .
                    </span>
                  </label>
                  {errors.acceptedTerms && (
                    <p className="mt-1.5 text-xs text-rose-400" role="alert">
                      {errors.acceptedTerms}
                    </p>
                  )}
                </div>

                {submitError && (
                  <div
                    role="alert"
                    className="rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-xs sm:text-sm text-rose-300"
                  >
                    {submitError}
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <p className="text-xs text-slate-400">
                    Performance-based selection · Zero application or evaluation cost.
                  </p>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="cta-gradient-border inline-block cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
                  >
                    <span className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-3.5 rounded-[11px] bg-[#0D1526] hover:bg-[#131F38] text-sm font-semibold text-white transition-colors whitespace-nowrap">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-[#60A5FA]" aria-hidden="true" />
                          Submitting Application...
                        </>
                      ) : (
                        <>
                          Submit Trader Application
                          <ArrowRight className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
