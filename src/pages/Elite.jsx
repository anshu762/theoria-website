import usePageTitle from '../hooks/usePageTitle.js';
import Marquee from '../components/Marquee.jsx';
import EliteHero from '../components/elite/EliteHero.jsx';
import ProgramIntro from '../components/elite/ProgramIntro.jsx';
import WhatMakesElite from '../components/elite/WhatMakesElite.jsx';
import MentorsGlimpse from '../components/elite/MentorsGlimpse.jsx';
import CaseStudies from '../components/elite/CaseStudies.jsx';
import CTA from '../components/CTA.jsx';

export default function Elite() {
  usePageTitle('Elite Research Mentorship - Theoria');
  return (
    <>
      <EliteHero />
      <Marquee />
      <ProgramIntro />
      <WhatMakesElite />
      <MentorsGlimpse />
      <CaseStudies />
      <CTA />
    </>
  );
}
