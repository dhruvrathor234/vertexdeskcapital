export type LegalDocType = 'privacy' | 'terms' | 'risk';

export interface TimelineStep {
  step: string;
  title: string;
  description: string;
  detail: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName:
    | 'ShieldCheck'
    | 'Scale'
    | 'Laptop'
    | 'Activity'
    | 'FileCheck2'
    | 'TrendingUp';
}

export interface GrowthTier {
  tier: string;
  stage: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  accent: 'slate' | 'blue' | 'indigo' | 'gold';
}

export interface RuleCardItem {
  title: string;
  summary: string;
  metric: string;
  iconName: 'ArrowDownToLine' | 'AlertTriangle' | 'Sliders' | 'CalendarClock' | 'Lock';
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const NAV_LINKS = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Program', href: '#program' },
  { label: 'Profit Split', href: '#profit-split' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Apply', href: '#apply' },
] as const;

export const HERO_STATS = [
  {
    value: '50/50',
    numericTarget: 50,
    prefix: '',
    suffix: '/50',
    label: 'Profit Split',
    sublabel: 'Equal alignment on every verified payout',
  },
  {
    value: '$0',
    numericTarget: 0,
    prefix: '$',
    suffix: '',
    label: 'Zero Upfront Cost to Qualify',
    sublabel: 'No evaluation or onboarding fees charged',
  },
  {
    value: 'Multi-Firm',
    numericTarget: null,
    prefix: '',
    suffix: '',
    label: 'Funded Accounts',
    sublabel: 'Capital pathways across vetted partner desks',
  },
  {
    value: '100%',
    numericTarget: 100,
    prefix: '',
    suffix: '%',
    label: 'Transparent Payouts',
    sublabel: 'Documented settlement and written terms',
  },
] as const;

export const HOW_IT_WORKS_STEPS: TimelineStep[] = [
  {
    step: '01',
    title: 'Apply and get shortlisted',
    description:
      'Submit your trading background, primary markets, and risk approach through our brief intake form. Our desk reviews every application individually for discipline and consistency.',
    detail: 'Manual desk screening · 48h review window',
  },
  {
    step: '02',
    title: 'Prove your edge on a free demo account under strict risk rules',
    description:
      'Shortlisted traders receive access to a zero-cost simulated evaluation account. Demonstrate controlled drawdown, position sizing discipline, and repeatable execution.',
    detail: 'Zero evaluation fee · Institutional risk parameters',
  },
  {
    step: '03',
    title: 'Get a funded starter account on successful evaluation',
    description:
      'Once your evaluation metrics and risk compliance are verified, we sign a written profit-share agreement and allocate a funded starter account through a partner firm.',
    detail: 'Written agreement · 50/50 net profit split',
  },
  {
    step: '04',
    title: 'Scale to larger funded accounts as you hit consistency targets',
    description:
      'Traders who protect capital and deliver steady risk-adjusted performance over consecutive payout cycles become eligible for structured tier upgrades and multi-firm capacity.',
    detail: 'Performance-gated scaling · Expanded capital allocation',
  },
];

export const WHY_VERTEX_FEATURES: FeatureItem[] = [
  {
    id: 'no-fees',
    title: 'No Evaluation Fees',
    description:
      'You never pay for challenges, resets, or desk access. Capital allocation is earned strictly through verified execution and risk control.',
    iconName: 'ShieldCheck',
  },
  {
    id: 'profit-share',
    title: '50/50 Profit Share',
    description:
      'An equal, transparent split on realized net profits. Your incentives and the desk’s risk mandate remain fully aligned from day one.',
    iconName: 'Scale',
  },
  {
    id: 'own-device',
    title: 'Your Own Platform and Device',
    description:
      'Trade directly from your established workspace, preferred charting tools, and personal hardware without restrictive office hours.',
    iconName: 'Laptop',
  },
  {
    id: 'risk-support',
    title: 'Risk Support and Monitoring',
    description:
      'Structured drawdown guardrails and periodic performance reviews help identify execution drift before minor slumps compound.',
    iconName: 'Activity',
  },
  {
    id: 'written-agreements',
    title: 'Written Agreements',
    description:
      'Every funded relationship is governed by clear, written documentation outlining split mechanics, payout schedules, and risk boundaries.',
    iconName: 'FileCheck2',
  },
  {
    id: 'scale-up',
    title: 'Scale-Up Path',
    description:
      'Consistent adherence to risk parameters unlocks larger partner allocations over time without adding personal capital exposure.',
    iconName: 'TrendingUp',
  },
];

export const GROWTH_PATH_TIERS: GrowthTier[] = [
  {
    tier: 'Stage 01',
    stage: 'Evaluation',
    title: 'Demo',
    subtitle: 'Skill Verification',
    description:
      'Zero-cost simulated environment designed to audit drawdown control, lot sizing, and strategy consistency.',
    highlights: ['No evaluation fee', 'Strict daily & max drawdown', 'Verified trade log'],
    accent: 'slate',
  },
  {
    tier: 'Stage 02',
    stage: 'Initial Capital',
    title: 'Starter Funded',
    subtitle: 'Live Capital Onboarding',
    description:
      'Your first partner-backed funded allocation following a clean evaluation pass and written desk agreement.',
    highlights: ['50/50 profit share', 'Scheduled payouts', 'Desk risk oversight'],
    accent: 'blue',
  },
  {
    tier: 'Stage 03',
    stage: 'Expansion',
    title: 'Mid-Tier Funded',
    subtitle: 'Consistency Progression',
    description:
      'Expanded account allocation unlocked after consecutive disciplined cycles without rule violations or excess variance.',
    highlights: ['Higher buying power', 'Multi-session flexibility', 'Priority desk review'],
    accent: 'indigo',
  },
  {
    tier: 'Stage 04',
    stage: 'Institutional',
    title: 'Large Funded',
    subtitle: 'Senior Desk Allocation',
    description:
      'Top-tier multi-firm funded capacity reserved for proven traders demonstrating sustained capital preservation.',
    highlights: ['Multi-firm diversification', 'Maximum capital tier', 'Direct desk coordination'],
    accent: 'gold',
  },
];

export const RULES_AND_STANDARDS: RuleCardItem[] = [
  {
    title: 'Daily Loss Limit',
    metric: 'Hard Equity Stop',
    summary:
      'Strict maximum daily drawdown based on prior-day balance or equity. Exceeding the daily threshold automatically terminates the account.',
    iconName: 'ArrowDownToLine',
  },
  {
    title: 'Max Drawdown',
    metric: 'Capital Floor',
    summary:
      'Non-negotiable overall account drawdown floor designed to protect partner firm capital during unfavorable market regimes.',
    iconName: 'AlertTriangle',
  },
  {
    title: 'Lot Size Discipline',
    metric: 'Proportional Risk',
    summary:
      'Position sizing must remain consistent with your stated strategy. Gambling, martingale pyramiding, or sudden oversized bets are prohibited.',
    iconName: 'Sliders',
  },
  {
    title: 'News-Time Rules',
    metric: 'Event Windows',
    summary:
      'Execution around high-impact macroeconomic releases must follow the specific blackout or holding restrictions of the assigned partner firm.',
    iconName: 'CalendarClock',
  },
  {
    title: 'No Copy Trading or Account Sharing',
    metric: 'Single Operator',
    summary:
      'All trades must be executed independently by the approved applicant. Signal mirroring, third-party bots, or shared logins result in immediate disqualification.',
    iconName: 'Lock',
  },
];

export const ELIGIBILITY_REQUIREMENTS = [
  {
    title: 'Proven Track Record',
    detail:
      'Verifiable live or demo trading history demonstrating a coherent, repeatable edge across changing market conditions.',
  },
  {
    title: 'Disciplined Risk Management',
    detail:
      'Defined stop-loss methodology, bounded per-trade risk, and emotional composure during normal losing streaks.',
  },
  {
    title: 'Own KYC and Government ID',
    detail:
      'Ability to complete personal identity verification directly with funding partner firms in your own legal name.',
  },
  {
    title: 'No Existing Conflicting Account',
    detail:
      'Clean standing with major proprietary trading partners—no active bans, IP conflicts, or overlapping restricted accounts.',
  },
] as const;

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Is there any fee?',
    answer:
      'No. Vertex Desk Capital does not charge application fees, demo evaluation fees, or monthly platform subscriptions to prove your skill. Access is earned strictly through performance and risk discipline.',
  },
  {
    question: 'How are payouts made and when is my share sent?',
    answer:
      'Payout schedules follow the cycle of the underlying funding partner firm (typically bi-weekly or monthly once profit and consistency conditions are satisfied). Upon verified settlement from the partner firm, your 50% share is transferred promptly via bank transfer or approved digital rails as specified in your written agreement.',
  },
  {
    question: 'Who completes KYC?',
    answer:
      'The funded trader completes KYC directly using their own valid government-issued identification and proof of address as required by the third-party funding firm. Accounts must remain strictly in your own legal name with no third-party identity use.',
  },
  {
    question: 'Can I trade from my own device?',
    answer:
      'Yes. You trade remotely from your personal computer and preferred charting environment. However, you must maintain a consistent personal IP/device profile and strictly avoid VPN masking or account sharing.',
  },
  {
    question: 'What happens if I breach the rules?',
    answer:
      'If a hard rule such as the daily loss limit, maximum drawdown, or prohibited news-window execution is breached, the account is closed immediately under partner firm terms. Traders are not personally liable for trading losses on the funded account, though repeated or reckless breaches may end desk eligibility.',
  },
  {
    question: 'Is the profit split fixed?',
    answer:
      'Yes. The program operates on a transparent, flat 50/50 split of realized net profits between the trader and Vertex Desk Capital, documented in writing before live funded trading begins.',
  },
  {
    question: 'How do I move up to larger accounts?',
    answer:
      'Progression from Starter Funded to Mid-Tier and Large Funded allocations is milestone-based. Traders who achieve consecutive clean payout cycles while staying well within risk thresholds are reviewed for higher capital tiers and multi-firm accounts.',
  },
  {
    question: 'Is this a job or salary?',
    answer:
      'No. This is an independent, performance-based trading partnership—not an employment contract. There is no fixed salary, hourly wage, or guaranteed income; compensation comes exclusively from your 50% share of generated net profits.',
  },
];

export const LEGAL_DOCUMENTS: Record<
  LegalDocType,
  { title: string; updated: string; sections: { heading: string; body: string }[] }
> = {
  privacy: {
    title: 'Privacy Policy',
    updated: 'Effective November 2026',
    sections: [
      {
        heading: '1. Information Collected',
        body: 'When you submit a trader application or inquiry to Vertex Desk Capital, we collect the contact information, trading history summary, market preferences, and biographical details you voluntarily provide.',
      },
      {
        heading: '2. Purpose of Processing',
        body: 'Submitted data is used strictly to evaluate trader eligibility, coordinate demo evaluations, communicate onboarding updates, and prepare written profit-sharing documentation if shortlisted.',
      },
      {
        heading: '3. Data Protection & Third Parties',
        body: 'We do not sell, rent, or distribute applicant information to third-party marketers. Where necessary for funded account provisioning, relevant details are shared only with vetted funding partner firms subject to your consent and their compliance onboarding.',
      },
      {
        heading: '4. Retention & Contact',
        body: 'You may request access to, correction of, or deletion of your application records at any time by contacting vertexdeskcapital@gmail.com.',
      },
    ],
  },
  terms: {
    title: 'Terms and Conditions',
    updated: 'Effective November 2026',
    sections: [
      {
        heading: '1. Program Structure',
        body: 'Vertex Desk Capital operates an application-based trader evaluation and capital backing program. Submission of an application does not guarantee shortlisting, demo issuance, or funded account allocation.',
      },
      {
        heading: '2. Independent Relationship',
        body: 'Participants engage strictly on an independent, performance-based basis governed by individual written agreements. Nothing on this website creates an employer-employee relationship, fixed salary obligation, or fiduciary advisory arrangement.',
      },
      {
        heading: '3. Partner Firm Compliance',
        body: 'All funded accounts are issued by third-party proprietary trading firms and remain governed by each firm’s prevailing trading rules, drawdown calculations, KYC procedures, and payout policies.',
      },
      {
        heading: '4. Prohibited Conduct',
        body: 'Account sharing, copy trading across unrelated participants, automated latency arbitrage, prohibited high-impact news exploitation, or falsification of identity documents results in immediate termination from the program.',
      },
    ],
  },
  risk: {
    title: 'Risk Disclosure',
    updated: 'Effective November 2026',
    sections: [
      {
        heading: '1. Substantial Risk of Loss',
        body: 'Trading foreign exchange, commodities, indices, and digital assets carries a high level of risk and may not be suitable for all individuals. Leverage can amplify both gains and losses rapidly.',
      },
      {
        heading: '2. No Profit Guarantees',
        body: 'Vertex Desk Capital makes no representation, warranty, or promise regarding potential earnings, payout frequency, or trading success. Past performance is not indicative of future results.',
      },
      {
        heading: '3. Not a Broker or Investment Advisor',
        body: 'Vertex Desk Capital is not a licensed broker-dealer, asset manager, or financial advisor. We do not accept public deposits, manage client funds, or provide personalized investment recommendations.',
      },
      {
        heading: '4. Illustrative Examples',
        body: 'Any profit-split calculator values, tier structures, or chart graphics presented on this website are strictly illustrative and do not represent typical, average, or expected trading outcomes.',
      },
    ],
  },
};
