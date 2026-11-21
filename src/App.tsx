import React, { useState } from 'react';
import { MotionConfig } from 'motion/react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { WhyVertexSection } from './components/WhyVertexSection';
import { GrowthPathSection } from './components/GrowthPathSection';
import { ProfitSplitSection } from './components/ProfitSplitSection';
import { RulesAndEligibilitySection } from './components/RulesAndEligibilitySection';
import { FaqSection } from './components/FaqSection';
import { ApplicationFormSection } from './components/ApplicationFormSection';
import { Footer } from './components/Footer';
import { LegalModal } from './components/LegalModal';
import { LegalDocType } from './data/programData';

export default function App() {
  const [activeLegalDoc, setActiveLegalDoc] = useState<LegalDocType | null>(null);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#070B14] text-slate-100 flex flex-col">
        <Navbar />

        <main className="flex-1">
          <HeroSection />
          <HowItWorksSection />
          <WhyVertexSection />
          <GrowthPathSection />
          <ProfitSplitSection />
          <RulesAndEligibilitySection />
          <FaqSection />
          <ApplicationFormSection onOpenLegal={setActiveLegalDoc} />
        </main>

        <Footer onOpenLegal={setActiveLegalDoc} />
        <LegalModal activeDoc={activeLegalDoc} onClose={() => setActiveLegalDoc(null)} />
      </div>
    </MotionConfig>
  );
}
