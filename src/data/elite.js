const E = 'https://univisory.org/cdn/images/elite/';

// zoom: 'sm' | 'lg' replicates the original "fix-small-univ-logo" / "scale-2" tweaks
export const leftMentors = [
  { img: `${E}1.webp`, alt: 'Mentor 1', logo: `${E}Northwestern.png`, logoAlt: 'Northwestern', zoom: 'lg' },
  { img: `${E}2.webp`, alt: 'Mentor 2', logo: `${E}BrownUniversity.png`, logoAlt: 'Brown' },
  { img: `${E}5.webp`, alt: 'Mentor 3', logo: `${E}NUS.png`, logoAlt: 'NUS', zoom: 'sm' },
  { img: `${E}6.webp`, alt: 'Mentor 4', logo: `${E}MIT.png`, logoAlt: 'MIT' },
];

export const rightMentors = [
  { img: `${E}3.webp`, alt: 'Mentor 5', logo: `${E}GeorgiaInstituite.png`, logoAlt: 'Georgia Tech', zoom: 'sm' },
  { img: `${E}4.webp`, alt: 'Mentor 6', logo: `${E}CarnegieUniverisity.png`, logoAlt: 'Carnegie Mellon' },
  { img: `${E}7.webp`, alt: 'Mentor 7', logo: `${E}YaleUniversity.png`, logoAlt: 'Yale', zoom: 'sm' },
  { img: `${E}8.webp`, alt: 'Mentor 8', logo: `${E}bold_cornell_logo.svg`, logoAlt: 'Cornell' },
];

export const whoItsFor = [
  'Targeting Ivies, Oxbridge, or top 20 global universities',
  'Academically strong & intellectually curious students',
  'Ready to commit to 3-5 months of serious research work',
  'Looking to not just follow, but lead in their field',
];

export const eliteFeatures = [
  {
    title: 'Mentorship from World Class Researchers',
    text: 'Work hands-on with active PhDs, postdocs, and professors from institutions like MIT, Columbia, Harvard, Yale, and UC Berkeley; not teaching assistants or interns.',
  },
  {
    title: 'Research That Actually Means Something',
    text: 'Forget "broad" or "general interest" projects. You’ll build deep, original research or tech prototypes in your specific field of interest; guided by experts driving real innovation.',
  },
  {
    title: 'Letters of Recommendation with Serious Weight',
    text: 'Your mentor doesn’t just write you a LOR; they vouch for your thinking, collaboration, and academic potential. That’s the kind of letter admissions officers can’t ignore.',
  },
  {
    title: 'Outcomes That Open Doors',
    bullets: [
      ['Publication-ready papers', ' for Scopus-indexed journals'],
      ['Submission-worthy entries', ' for global research contests'],
      ['Functional models', ' or tools that demonstrate engineering, tech, or data science talent'],
      ['IP and patent opportunities', ' where applicable'],
    ],
  },
  {
    title: 'Strategic Admissions Advantage',
    bullets: [
      ['Your essays', ' (Common App, UCAS, etc.)'],
      ['Your activity section', ' with real, measurable outcomes'],
      ['Your interviews', ' with insider insights if your mentor is from your dream university'],
      ['Your mentor LOR', ' will add the highest possible credibility'],
    ],
  },
];

export const caseStudies = [
  {
    id: 'Rohan', name: 'Rohan',
    title: 'CASE STUDY 1: Rohan | Singapore | Electrical Engineering | Class of 2029',
    background: 'Student from Singapore with a 1550 SAT and 8 A*s. Passionate about Electrical Engineering and sustainability. Strong in Olympiads and coding.',
    research: 'Mentored by MIT Postdoc in EECS\nProject: “AI-Optimized Battery Management for Rural Microgrids”; ML models to improve charge-discharge efficiency in lithium-ion batteries.',
    impact: 'Built a TensorFlow-based simulation; presented at MIT outreach symposium. Paper published in a peer-reviewed engineering journal.',
    outcome: 'Admitted to Princeton University (B.S.E. Electrical Engineering) ; REA',
    reflection: '“This was the first time I felt my work could actually matter. I feel Princeton knew that I wasn’t just researching to apply, but to actually solve a real problem, and that made all the difference.” ~ Rohan',
  },
  {
    id: 'Nisha', name: 'Nisha',
    title: 'CASE STUDY 2: Nisha | India | Economics | Class of 2029',
    background: 'IBDP student with SAT 1570. Strong interest in economic justice and policy reform. Ran a local women’s cooperative initiative.',
    research: 'Mentored by Columbia Economics Postdoc\nProject: “Impact of Informal Labor Markets on Urban Female Employment in Tier-1 Cities”; Regression-based study using NSSO & CMIE data.',
    impact: 'Published in a recognized development economics journal. Cited in UPenn supplemental; informed her Common App personal statement.',
    outcome: 'Admitted to University of Pennsylvania (College of Arts & Sciences)',
    reflection: '“I’ve never felt so intellectually stretched. Working under Prof. **** *** really changed the way I think and write, and I know this is something I will carry forward to college as well. Thank you so much UniVisory.” ~ Nisha',
  },
  {
    id: 'Aarav', name: 'Aarav',
    title: 'CASE STUDY 3: Aarav | India | AI for Social Good | Class of 2029',
    background: 'High-achieving student with interests in AI and public impact. Built basic NLP tools and volunteered with legal NGOs.',
    research: 'Mentored by Stanford AI Researcher\nProject: “FairJustice: GPT-based Legal Assistant for Acid-Attack Survivors”; NLP tool mapping Indian legal rights for easier access.',
    impact: 'Published in a social impact AI journal. Used by Delhi-based NGO as pilot. Research cited in Stanford essays and counselor LOR.',
    outcome: 'Admitted to Stanford University (Symbolic Systems)',
    reflection: '“I never imagined coding could help me create something so unique and powerful at such a young age. I learnt so much from sir throughout the entire process, and this definitely played a big role in my admit. So excited to meet him on campus.” ~ Aarav',
  },
  {
    id: 'Mira', name: 'Mira',
    title: 'CASE STUDY 4: Mira | Malaysia | Env. Science + Data Science | Class of 2029',
    background: 'High-scoring IB student. Active in local climate campaigns. Passionate about green tech and urban sustainability.',
    research: 'Mentored by UC Berkeley Postdoc in Environmental Data Science\nProject: “AI-Based Urban Carbon Tracker Using Satellite and IoT Data”',
    impact: 'Research paper presented at the SIAM Conference (Seattle, US). Final paper published in a youth sustainability journal.',
    outcome: 'Admitted to UC Berkeley (Environmental Engineering)',
    reflection: '“This project felt so different. I felt like a real researcher actually doing something big. It made me believe in myself more, and I think that confidence helped me go through the entire application cycle without being anxious. And the rest is history.” ~ Mira',
  },
  {
    id: 'Tanvi', name: 'Tanvi',
    title: 'CASE STUDY 5: Tanvi | India | Economics + Business | Class of 2029',
    background: '1560 SAT. Led a school finance club and managed a microloan project. Aspired for UChicago and LSE in Business + Development Economics.',
    research: "Mentored by Harvard Kennedy School PhD\nProject: “Digital Microfinance and Women's Economic Mobility in Tier-2 Indian Cities”",
    impact: 'Published in a peer-reviewed development journal. Invited to speak at youth policy summit by a leading Indian think tank.',
    outcome: 'Admitted to University of Chicago (Economics)',
    reflection: '“I never imagined I would ever be able to build something real and publish before college. It wouldn’t have been possible without Prof. ****** ***. Now I have a paper published in one of the most reputed journals, and an admit to my dream university” ~ Tanvi',
  },
  {
    id: 'Aditya', name: 'Aditya',
    title: 'CASE STUDY 6: Aditya | India | Computer Science | Class of 2028',
    background: '1580 SAT, national Olympiad medalist. Aspired for MIT/CMU. Wanted to move beyond coding to real AI research.',
    research: 'Mentored by CMU Postdoc in AI/CS\nProject: “AI-Driven Deepfake Detection Using Temporal Signal Inconsistencies”; Used CNN + LSTM for real-time video verification.',
    impact: 'Paper published in a leading high school CS journal. GitHub repo forked 1.3k+ times. LOR from mentor termed it “PhD-level work.”',
    outcome: 'Admitted to MIT (Computer Science ; CSAIL)',
    reflection: '“I’ve obviously been coding, but this was actually the first time I felt like a scientist working on something that could actually make a difference. The passion in my work is not just mine but his as well, and it was quite visible in my application to MIT.” ~ Aditya',
  },
  {
    id: 'Anika', name: 'Anika',
    title: 'CASE STUDY 7: Anika | UAE | Architecture | Class of 2028',
    background: 'Passionate about architecture and climate-conscious design. Math + arts blend, interned with a local architect.',
    research: 'Mentored by Cornell AAP Postdoc\nProject: “Biomimicry in Low-Cost Climate Adaptive Architecture”; Parametric simulations using Rhino, Grasshopper, Ladybug tools.',
    impact: 'Research published in a recognized youth architecture journal. Portfolio cited by Cornell faculty during review.',
    outcome: 'Admitted to Cornell University (B.Arch ; 5-Year Program)',
    reflection: '“I was stuck on making portfolios with structures and buildings, but this project changed everything about my application and made it stand out because I never thought I could integrate climate models, theory, and tech with architecture.” ~ Anika',
  },
  {
    id: 'Rehaan', name: 'Rehaan',
    title: 'CASE STUDY 8: Rehaan | Singapore | Psychology | Class of 2028',
    background: 'IB Psychology student. Ran mental health workshops. Interested in cognitive science and behavioral research.',
    research: 'Mentored by Yale PhD in Cognitive Psychology\nProject: “Digital Media Exposure and Teen Attention Span: A Stroop-Based Analysis”',
    impact: 'Published in a behavioral science journal. Research used by school wellness center for awareness campaign.',
    outcome: 'Admitted to Yale University (Cognitive Science)',
    reflection: '“It was honestly very strange and exciting to see my survey data actually make sense. Prof. ***** ****’s made me feel like I was actually researching at Yale, and that’s something I envisioned in my essays. Surprisingly, the admissions officers envisioned my research there too.” ~ Rehaan',
  },
];