import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const GLIMPSE_1 = {
  title:
    'Combinatorial Coverage Guarantees for Resilient Emergency Shelter Placement: Turán-Inspired Extremal Bounds on Maximum Independent Dominating Sets in Unit-Disk Graphs',
  heading: 'Abstract',
  paragraphs: [
    <>
      This manuscript addresses the critical challenge of optimizing emergency shelter placement in the
      context of India’s diverse and hazard-prone landscape. By modeling shelter locations and population
      centers as nodes in a Unit-Disk Graph (UDG), we investigate the theoretical and practical
      implications of utilizing Independent Dominating Sets (IDS) to ensure maximum coverage with minimum
      resource redundancy. We derive and analyze extremal bounds inspired by Turán-style theory,
      specifically examining the proven relation{' '}
      <span className="rp-hl">
        <i>α</i>(<i>G</i>) ≤ 3.399 · <i>γ</i><sub>c</sub>(<i>G</i>) + 4.874
      </span>{' '}
      for unit-disk graphs, where <i>α</i>(<i>G</i>) represents the independence number and{' '}
      <i>γ</i><sub>c</sub>(<i>G</i>) the connected domination number.
    </>,
    <>
      A Greedy Independent Dominating Set (GIDS) algorithm is proposed and implemented in Python,
      leveraging spatial indexing via KD-Trees for scalability. Experimental results demonstrate that the
      algorithm achieves <span className="rp-hl">100% coverage</span> in both clustered (urban) and sparse
      (rural) density scenarios, while maintaining strict independence constraints to prevent facility
      clustering. Finally, we contextualize these findings within the Indian administrative and disaster
      management framework, utilizing datasets from WorldPop, the Census of India, and the IMD Hazard Atlas
      to propose a resilient, data-driven approach to facility location.
    </>,
  ],
}

const GLIMPSE_2 = {
  title:
    'A Strategic Overview of the Indian Fashion Industry with apropos to Logistics and Sustainable Supply Chain Management',
  heading: 'Abstract',
  paragraphs: [
    <>
      This research study emphasizes the social, environmental, and economic facets of the fashion supply
      chain and attempts to provide a thorough analysis of sustainability challenges. It aims to comprehend
      the effects of many sustainability programs and practices, assess the lessons gained from industry
      mistakes and attempts, and pinpoint areas needing more study and development. Using a qualitative
      approach, the paper thoroughly reviews case studies, industry white papers, and publications in
      peer-reviewed journals. Insights from current sustainability trends are integrated with analyses of
      top brands’ sustainability policies, including Nike, Unilever, and Patagonia. The process involves
      investigating the best methods for incorporating sustainability into fundamental company operations,
      evaluating social and environmental sustainability efforts, and estimating the economic effects of
      these activities. The necessity of combining social, environmental, and ethical standards
      holistically, the significance of expanding sustainability initiatives beyond first-tier suppliers,
      and the crucial role of supply chain openness are some of the major conclusions. Notable instances
      include Nike’s innovations in sustainable materials, Unilever’s circular economy programs, and
      Patagonia’s fair work policies. According to the report, incorporating sustainability into the
      operations has long-term financial advantages, including improved customer loyalty and brand
      reputation. This study offers fresh perspectives on the realworld difficulties and achievements of
      integrating sustainability into the fashion supply chain. It analyses industry standards thoroughly
      and offers feasible recommendations for businesses looking to improve their sustainability
      initiatives. The current collection of knowledge on the sustainability of the fashion supply chain is
      greatly enhanced by the addition of particular case studies and the investigation of cutting-edge
      technology and practices.
    </>,
  ],
}

const GLIMPSE_3 = {
  title:
    'Financial Literacy, Financial Education, and Digital Spending Discipline Among Teenagers: A Synthetic Data Analysis',
  heading: 'Abstract',
  paragraphs: [
    <>
      Digital payments have reduced the practical friction of everyday transactions at the same time that
      adolescents are beginning to form lasting financial habits. This study develops and tests a
      transparent simulation model of how financial literacy, formal financial education, and
      digital-payment frequency may jointly relate to spending discipline among teenagers. A reproducible
      synthetic dataset of 500 adolescents aged 13–18 was generated to represent plausible variation in
      financial literacy, financial self-efficacy, family financial socialization, monthly allowance,
      digital-payment frequency, spending discipline, and impulse buying. The design is explicitly
      methodological: the observations are simulated and are not presented as survey responses from human
      participants. Descriptive analysis, Pearson correlation, group comparisons, and
      heteroskedasticity-robust multiple regression were used to evaluate three hypotheses. In the
      simulated data, financial literacy was strongly associated with spending discipline (<i>r</i> = .65,{' '}
      <i>p</i> &lt; .001). Teenagers assigned exposure to formal financial education had higher mean
      spending-discipline scores than those without such exposure (6.35 vs. 4.96). In the multivariable
      model, financial literacy was positively associated with discipline (<i>b</i> = .512,{' '}
      <i>p</i> &lt; .001), digital-payment frequency was negatively associated with discipline (
      <i>b</i> = −.517, <i>p</i> &lt; .001), and the literacy-by-education interaction was positive (
      <i>b</i> = .258, <i>p</i> = .001). The model explained 54.9% of the variance in simulated spending
      discipline. These results should not be interpreted as population estimates; rather, they demonstrate
      an empirically testable framework for a future adolescent survey. The analysis supports a research
      design in which financial education is evaluated not only for knowledge acquisition but also for its
      potential to strengthen the translation of knowledge into self-regulated digital spending.
    </>,
  ],
}

const GLIMPSE_4 = {
  heading: 'Abstract',
  title: 'The illusion of understanding: AI’s role in cognitive psychology research',
  paragraphs: [
    <>
      As we dive deeper into the realm of cognitive psychology, the allure of artificial intelligence (AI)
      as a tool for understanding the intricacies of human thought and behavior grows ever stronger. Yet,
      amidst the promise of AI-driven insights lies a cautionary tale of oversimplification, misplaced
      trust, and the erosion of human understanding. In this Curmudgeon Corner article, we explore the
      pitfalls and perils of relying too heavily on AI in cognitive psychology research, and urge for a
      more nuanced approach that acknowledges the limitations of these technological marvels.
    </>,
    <>
      The implementation of AI in cognitive psychology research is providing an open opportunity to make
      the analysis do so through vast data mining, hidden patterns, and probably also lead to new
      hypotheses. The possibilities range from prediction of human decision-making by machine-learning
      algorithms to neural networks mimicking the functions of the human brain.
    </>,
    <>
      But beneath the shiny wrapping of technological improvement, there is a fundamental disconnection
      between AI and human cognition. Though AI could perform tasks, including recognizing patterns and
      doing data crunching, it does not grasp most of the subtleties with the contextual awareness of a
      human being. The danger that comes with this simplification of such complex cognitive processes is
      that they are reduced to algorithms and mere equations (Gigerenzer 2023).
    </>,
  ],
}

const GLIMPSE_5 = {
  title:
    'The Algorithmic Strategist: Potential and Limits of Artificial Intelligence in Business Strategy Formulation',
  heading: 'Abstract',
  paragraphs: [
    <>
      The rapid advancement of Artificial Intelligence (AI), particularly in machine learning (ML) and data
      analytics, has ushered in a new era of corporate decision-making. This has sparked a vigorous debate
      within academic and practitioner circles: can AI eventually replace human-driven business strategy?
      This literature review synthesizes existing research to argue that a paradigm shift from AI{' '}
      <i>replacing</i> strategy to AI <i>augmenting</i> strategy is the most accurate and productive
      framework. The review examines the theoretical foundations of strategy, delineates AI’s core
      competencies in data processing, pattern recognition, and predictive modeling, and contrasts them
      with intrinsically human strategic capabilities like creativity, synthesis, and ethical judgment. It
      explores the emergent concept of hybrid intelligence, where human and artificial cognition form a
      synergistic partnership. Furthermore, the paper addresses critical impediments to replacement,
      including the black box problem, data limitations, and the irreplaceable nature of human vision and
      stakeholder management. The conclusion asserts that the future of strategy lies not in autonomous AI
      systems but in strategists who can effectively leverage AI as a powerful co-pilot to navigate an
      increasingly complex and volatile global landscape.
    </>,
  ],
}

const GLIMPSE_6 = {
  title: 'Precision single-particle localization using radial variance transform',
  heading: 'Abstract',
  paragraphs: [
    <>
      We introduce an image transform designed to highlight features with high degree of radial symmetry
      for identification and subpixel localization of particles in microscopy images. The transform is
      based on analyzing pixel value variations in radial and angular directions. We compare the subpixel
      localization performance of this algorithm to other common methods based on radial or mirror
      symmetry (such as fast radial symmetry transform, orientation alignment transform, XCorr, and
      quadrant interpolation), using both synthetic and experimentally obtained data. We find that in all
      cases it achieves the same or lower localization error, frequently reaching the theoretical limit.
    </>,
  ],
}

const GLIMPSE_7 = {
  title:
    'Interpretable Machine Learning for Cervical Cell Classification Using Morphological and Texture Feature Interactions',
  heading: 'Abstract',
  paragraphs: [
    <>
      Cervical cancer is among the most prevalent cancers in women globally, yet early cytological
      detection substantially improves outcomes. Automated machine learning classifiers applied to
      digitised Pap smear images have achieved high accuracy, but the most performant
      architectures—deep convolutional neural networks—provide limited explanations for individual
      classification decisions. This study applies an intrinsically interpretable analytical pipeline to
      the Herlev cervical cell benchmark dataset (917 expert-labelled cells; 7 classes; binary task: 242
      normal versus 675 abnormal). Twenty-two morphological and image texture features were extracted
      from dataset-provided isolated cell images and used to train an L1-regularised logistic regression
      model. A second model extended the feature set with all 231 pairwise interaction terms, yielding
      253 total predictors. Evaluated by stratified 5-fold cross-validation, the individual-feature model
      achieved ROC-AUC = 0.947628, accuracy = 84.84%, sensitivity = 82.67%, and specificity = 90.91%. The
      interaction model achieved ROC-AUC = 0.948797, accuracy = 84.73%, sensitivity = 82.67%, and
      specificity = 90.50%. The AUC difference (Δ = +0.00117) is not material; adding pairwise
      interaction terms did not meaningfully improve classification performance. The scientific
      contribution of the interaction model is interpretability: ranked standardised coefficients from
      the final full-dataset model identify the strongest abnormal-oriented interactions as involving the
      whole-cell-region perimeter combined with shape regularity features, and the strongest
      normal-oriented interactions as involving combinations of image-intensity and texture measurements.
    </>,
  ],
}

const GLIMPSE_8 = {
  title:
    'Job Displacement in the Age of Generative Artificial Intelligence: A Comparative Study of India and Southeast Asia',
  heading: 'Abstract',
  paragraphs: [
    <>
      Generative artificial intelligence (GenAI) is transforming labor markets by automating, augmenting,
      and reorganizing tasks previously performed by people. India and Southeast Asia are particularly
      important cases because they combine rapidly expanding digital industries with large agricultural,
      informal, and low-wage workforces. This research report compares the potential for GenAI-related
      job displacement across India and the ten Association of Southeast Asian Nations (ASEAN) member
      states. It examines how national economic structure, occupational composition, digital
      infrastructure, worker skills, firm capacity, and social protection influence employment outcomes.
    </>,
    <>
      The analysis uses a comparative desk-research design based on recent evidence from the
      International Labour Organization (ILO), the World Bank, and other institutional and sectoral
      sources. ILO estimates indicate that approximately 22.9% of ASEAN employment—nearly 80 million
      workers—is in occupations with more than minimal potential exposure to GenAI. However, only 3.3% of
      employment, equivalent to approximately 11.7 million workers, falls into the highest-exposure
      category, while about 67% of employment has no identified GenAI exposure.
    </>,
  ],
}

const GLIMPSE_9 = {
  title: 'ParkinSense technical research report',
  heading: 'Abstract',
  paragraphs: [
    <>
      ParkinSense is an ankle-worn motion-monitoring prototype designed to explore a practical question:
      can a wearable device record movement locally and provide a caregiver alert workflow without
      continuous internet access? The system uses an ESP32 microcontroller and an inertial sensor,
      described in the project as an MPU9250, to transmit acceleration, angular velocity and a
      suspected-fall flag to an Android application through Bluetooth. The primary application timestamps
      motion readings and stores them in a CSV file. A second application, developed in Flutter,
      processes exported recordings on the phone.
    </>,
    <>
      The prototype uses an orientation threshold and a transition-time rule to identify suspected falls.
      A confirmation screen gives the user 30 seconds to cancel before the application attempts a
      caregiver call. This design addresses the possibility that ordinary lying down may resemble a fall,
      although its effect on false alerts has not yet been quantified.
    </>,
    <>
      A technical review identified an important limitation in the present tremor-analysis pipeline.
      Motion readings are logged every 500 milliseconds, giving a sampling rate of 2 Hz and a Nyquist
      limit of 1 Hz. These recordings cannot resolve the 3–6 Hz oscillations used by the current
      classifier. Accordingly, the existing output cannot establish Parkinsonian tremor or its severity.
    </>,
    <>
      The documented contribution is an integrated prototype for local motion logging and suspected-fall
      alerts. The next evaluation will use controlled mechanical motion, higher-rate raw recordings and
      labelled non-fall events to measure frequency error, false alerts and alert latency. Clinical
      usefulness remains a future validation question, not an established result.
    </>,
  ],
}

const GLIMPSE_10 = {
  title:
    'Developing a Chemical and Structural Understanding of the Surface Oxide in a Niobium Superconducting Qubit',
  heading: 'Abstract',
  paragraphs: [
    <>
      Superconducting thin films of niobium have been extensively employed in transmon qubit
      architectures. Although these architectures have demonstrated remarkable improvements in recent
      years, further improvements in performance through materials engineering will aid in large-scale
      deployment. Here, we use information retrieved from secondary ion mass spectrometry and electron
      microscopy to conduct a detailed assessment of the surface oxide that forms in ambient conditions
      for transmon test qubit devices patterned from a niobium film. We observe that this oxide exhibits
      a varying stoichiometry with NbO and NbO<sub>2</sub> found closer to the niobium film and
      Nb<sub>2</sub>O<sub>5</sub> found closer to the surface. In terms of structural analysis, we find
      that the Nb<sub>2</sub>O<sub>5</sub> region is semicrystalline in nature and exhibits randomly
      oriented grains on the order of 1-2 nm corresponding to monoclinic N-Nb<sub>2</sub>O<sub>5</sub>{' '}
      that are dispersed throughout an amorphous matrix. Using fluctuation electron microscopy, we are
      able to map the relative crystallinity in the Nb<sub>2</sub>O<sub>5</sub> region with nanometer
      spatial resolution. Through this correlative method, we observe that amorphous regions are more
      likely to contain oxygen vacancies and exhibit weaker bonds between the niobium and oxygen atoms.
      Based on these findings, we expect that oxygen vacancies likely serve as a decoherence mechanism in
      quantum systems.
    </>,
  ],
}

const GLIMPSE_11 = {
  title:
    'Recommendation Systems for Personalized Digital Learning Interfaces: Analysis of User Engagement and Learning Progression',
  heading: 'Abstract',
  paragraphs: [
    <>
      Recommendation systems increasingly determine what users see next in digital products, yet
      recommendation quality is often evaluated through prediction accuracy rather than its effect on
      meaningful user outcomes. This study develops a transparent simulation framework to examine how
      recommendation relevance, personalization strength, novelty, and interaction frequency may relate
      to user engagement and learning progression in personalized digital learning interfaces. A
      reproducible synthetic dataset of 500 users was generated to represent plausible variation in prior
      skill, personalization, recommendation relevance, novelty, interaction frequency, click-through
      rate, content completion, engagement, and learning progression. The observations are simulated and
      are not presented as records from real users. Descriptive statistics, Pearson correlations,
      quartile comparisons, and heteroskedasticity-robust multiple regression were used to test three
      hypotheses. In the simulated data, recommendation relevance was strongly associated with engagement
      (r = .65) and moderately associated with learning progression (r = .53). In multivariable analysis,
      recommendation relevance remained the strongest predictor of engagement (b = .426, p &lt; .001),
      while personalization and novelty also contributed positively. Recommendation relevance also
      predicted learning progression (b = .319, p &lt; .001), alongside prior skill. The engagement model
      explained 48.1% of simulated variance, while the learning-progression model explained 34.5%. These
      findings should be interpreted as a methodological demonstration rather than empirical population
      evidence. The framework illustrates how recommender-system evaluation can move beyond accuracy to
      examine whether personalized interface logic improves the quality of user interaction and supports
      more coherent learning pathways.
    </>,
  ],
}

const GLIMPSE_12 = {
  title:
    'Multi-Sensor Fusion of Vibration, Stator Current and Thermal Measurements for Fault Diagnosis and Prognostics of Induction Motors: A Simulation Study',
  heading: 'Abstract',
  paragraphs: [
    <>
      Condition monitoring of induction motors usually relies on a single measurement channel, most often
      vibration or stator current, and each channel is sensitive to only part of the fault spectrum. This
      paper quantifies how much is gained by fusing an accelerometer, a stator current sensor and winding
      temperature measurements, and where that gain comes from. A physically motivated signal model was
      used to generate 1,200 two-second records covering healthy operation, outer-race bearing defects,
      broken rotor bars and stator inter-turn short circuits at severities from incipient to advanced and
      loads from 25 % to 100 %. Eighteen features were extracted and combined through feature-level and
      decision-level fusion with random forest and support vector machine classifiers. Under repeated
      five-fold cross-validation, single sensors reached 41–69 % accuracy, while three-sensor
      feature-level fusion reached 92.3 % (random forest) and product-rule decision fusion 91.6 %
      (support vector machine). Fusion raised accuracy on incipient faults from at most 56 % to 80 %.
      Decision-level fusion was less accurate on clean data but degraded more gracefully when the
      vibration channel was corrupted or lost, retaining 69.7 % accuracy against 50.8 % for feature-level
      fusion. For bearing prognostics, a Mahalanobis health index built from fused features matched, but
      did not improve on, a vibration-only index, because the secondary sensors carry weak bearing
      information. The results indicate that fusion pays off mainly for diagnosis across fault types and
      for resilience to sensor failure, and the full simulation code is provided for reproduction.
    </>,
  ],
}

const GLIMPSE_13 = {
  title:
    'TACTIC tactile circuit construction with audio haptic feedback and computational analysis of circuit verification',
  heading: 'Abstract',
  paragraphs: [
    <>
      Building circuits without sight requires both accessible component identification and feedback about
      the connections that have been made. TACTIC combines tactile modules, keyed connectors and a
      proposed embedded checking system. This study asks whether continuity and supply-current checks
      provide enough information to verify a requested teaching circuit, and what additional information
      the design should collect. A focused review of accessible electronics and circuit-sensing research
      informed the architecture. A reproducible Python model enumerated every placement of three
      identified resistors across four nodes, giving 216 networks evaluated against each of three target
      circuits: series, parallel and two-loop. Nodal analysis calculated source current, while
      component-labelled graph matching established agreement with the requested template. Of 648
      circuit-template cases, a conducting-path check accepted 453, including 448 template mismatches. A
      supply-current window of ±5% reduced acceptance to 17 cases, but 12 still differed from the
      requested component arrangement. These 12 were electrically equivalent arrangements at the source,
      demonstrating that source measurements do not establish internal component order or voltage
      distribution. A separate deterministic sweep of resistor tolerance and added connection resistance
      rejected 30 of 243 correct-template parameter cases under the same current window. These findings
      support a design that combines component and terminal identification with electrical consistency
      checks and an explicit uncertain state. A working prototype is reported, but the results presented
      here are computational, not hardware measurements. No human participants or learning-outcome data
      were used. The contribution is an auditable evaluation of verification limits and a corresponding
      design specification for nonvisual circuit feedback.
    </>,
  ],
}

const GLIMPSE_14 = {
  title: 'Virtue of Poverty Reduction Programs in India - A Review',
  heading: 'Abstract',
  paragraphs: [
    <>
      Poverty has always been a concern to India owing to its large and still growing population. In this
      regard, multiple programmes have been adopted by the Government of India to improve the wellbeing
      of people mostly in rural areas, increase livelihood opportunities and develop the necessary
      infrastructure. This paper discusses the various schemes started by the government with regard to
      their effectiveness in poverty reduction. The study is based on analysis of secondary data and
      focuses on 2 main objectives: to evaluate how the parameters measuring poverty are catered to by
      the identified poverty reduction schemes; to compare the effectiveness of different types of
      poverty reduction programs. The analysis of schemes is based on key socio economic indicators
      namely actualization of targeted benefit, rate of workforce participation, gender inclusion, caste
      inclusion, financial independence, improvement in standard of living, amplification of small scale
      business and transparency of benefit distribution. The paper concludes that schemes which emphasize
      targeted approaches to the audience size and demographic were found to be more effective.
      Furthermore, schemes that are skill-based rather than those that provide direct benefits (eg. cash
      transfers, direct provision of goods) were found to be the most effective. Schemes that rely on
      direct provision of goods, such as electricity, are required to be complemented by other schemes
      which have long-term objectives.
    </>,
  ],
}

export const PAPERS = [
  {
    id: 'p1',
    paper: '/research/paper-1.jpeg',
    glimpse: GLIMPSE_1,
    title: 'Combinatorial Coverage Guarantees for Resilient Emergency Shelter Placement',
    field: 'Graph Theory · Disaster Planning',
    student: 'Aditi Sharma',
    school: 'LSE',
    grade: 'Class of 2028',
    photo: '/students/student-img-5.png',
  },
  {
    id: 'p2',
    glimpse: GLIMPSE_2, 
    title: 'A Strategic Overview of the Indian Fashion Industry with apropos to Logistics and Sustainable Supply Chain Management',
    field: 'Fashion · Supply Chain',
    student: 'Student Name',
    school: 'UCL',
    grade: 'Class of 2027',
    photo: '/students/student-img-2.png',
  },
  {
    id: 'p3',
    glimpse: GLIMPSE_3,
    title: 'Financial Literacy, Financial Education, and Digital Spending Discipline Among Teenagers: A Synthetic Data Analysis',
    field: 'Finance · Data Analysis',
    student: 'Student Name',
    school: 'Duke University',
    grade: 'Class of 2028',
    photo: '/students/student-img-3.png',
  },
  {
    id: 'p4',
    glimpse: GLIMPSE_4,
    title: 'The illusion of understanding: AI’s role in cognitive psychology research',
    field: 'AI · Cognitive Psychology',
    student: 'Student Name',
    school: 'Vanderbilt University',
    grade: 'Class of 2027',
    photo: '/students/profile-image.png',
  },
  {
    id: 'p5',
    glimpse: GLIMPSE_5,
    title: 'The Algorithmic Strategist: Potential and Limits of Artificial Intelligence in Business Strategy Formulation',
    field: 'AI · Business Strategy',
    student: 'Student Name',
    school: 'Cornell University',
    grade: 'Class of 2029',
    photo: '/students/student-img-1.png',
  },
    {
    id: 'p6',
    glimpse: GLIMPSE_6,
    title: 'Precision single-particle localization using radial variance transform',
    field: 'Optics · Image Analysis',
    student: 'Student Name',
    school: 'Dartmouth',
    grade: 'Class of 2028',
    photo: '/students/student-img-6.png',
  },
  {
    id: 'p7',
    glimpse: GLIMPSE_7,
    title: 'Interpretable Machine Learning for Cervical Cell Classification Using Morphological and Texture Feature Interactions',
    field: 'Machine Learning · Healthcare',
    student: 'Student Name',
    school: 'NYU',
    grade: 'Class of 2029',
    photo: '/students/student-img-7.png',
  },
  {
    id: 'p8',
    glimpse: GLIMPSE_8,
    title: 'Job Displacement in the Age of Generative Artificial Intelligence: A Comparative Study of India and Southeast Asia',
    field: 'Economics · Generative AI',
    student: 'Student Name',
    school: 'Brown University',
    grade: 'Class of 2027',
    photo: '/students/profile-image.png',
  },
  {
    id: 'p9',
    glimpse: GLIMPSE_9,
    title: 'ParkinSense technical research report',
    field: 'Engineering · Wearable Health',
    student: 'Student Name',
    school: 'Cornell University',
    grade: 'Class of 2029',
    photo: '/students/student-img-9.png',
  },
    {
    id: 'p10',
    glimpse: GLIMPSE_10,
    title: 'Developing a Chemical and Structural Understanding of the Surface Oxide in a Niobium Superconducting Qubit',
    field: 'Materials · Quantum Computing',
    student: 'Student Name',
    school: 'NYU',
    grade: 'Class of 2028',
    photo: '/students/student-img-10.png',
  },
  {
    id: 'p11',
    glimpse: GLIMPSE_11,
    title: 'Recommendation Systems for Personalized Digital Learning Interfaces: Analysis of User Engagement and Learning Progression',
    field: 'Machine Learning · Education',
    student: 'Student Name',
    school: 'Columbia University',
    grade: 'Class of 2028',
    photo: '/students/student-img-11.png',
  },
  {
    id: 'p12',
    glimpse: GLIMPSE_12,
    title: 'Multi-Sensor Fusion of Vibration, Stator Current and Thermal Measurements for Fault Diagnosis and Prognostics of Induction Motors: A Simulation Study',
    field: 'Engineering · Fault Diagnosis',
    student: 'Student Name',
    school: 'University of Toronto',
    grade: 'Class of 2029',
    photo: '/students/profile-image.png',
  },
  {
    id: 'p13',
    glimpse: GLIMPSE_13,
    title: 'TACTIC tactile circuit construction with audio haptic feedback and computational analysis of circuit verification',
    field: 'Accessibility · Electronics',
    student: 'Student Name',
    school: 'LSE',
    grade: 'Class of 2027',
    photo: '/students/student-img-8.png',
  },
  {
    id: 'p14',
    glimpse: GLIMPSE_14,
    title: 'Virtue of Poverty Reduction Programs in India - A Review',
    field: 'Economics · Public Policy',
    student: 'Student Name',
    school: 'NUS',
    grade: 'Class of 2028',
    photo: '/students/student-img-4.png',
  },
]

const TAGLINE = ['Guided by expertise.', 'Built through inquiry.'] // default green tag text
const INTERVAL = 6500 // ms per slide

const pad = (x) => String(x).padStart(2, '0')
const initials = (name) =>
  name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()

/* ---------- small inline icons ---------- */
const Chevron = ({ dir }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={dir === 'l' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />
  </svg>
)
const Expand = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
  </svg>
)
const Close = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
)
const Spark = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M12 0C12.8 7.5 16.5 11.2 24 12C16.5 12.8 12.8 16.5 12 24C11.2 16.5 7.5 12.8 0 12C7.5 11.2 11.2 7.5 12 0Z" />
  </svg>
)

/* student photo with initials fallback */
function Photo({ src, name }) {
  const [bad, setBad] = useState(false)
  if (bad || !src) return <span className="rp-mono">{initials(name)}</span>
  return <img src={src} alt={name} draggable="false" onError={() => setBad(true)} />
}

/* the paper's first page, drawn as real text (spans only: it lives inside a button) */
function Doc({ g }) {
  return (
    <span className="rp-doc" aria-hidden="true">
      <span className="rp-doc-title">{g.title}</span>
      {g.author && <span className="rp-doc-author"><sup>[1]</sup> {g.author}</span>}
      {g.heading && <span className="rp-doc-head">{g.heading}</span>}
      {g.paragraphs.map((para, k) => (
        <span className="rp-doc-p" key={k}>{para}</span>
      ))}
    </span>
  )
}

export default function HeroPapers() {
  const n = PAPERS.length
  const [cur, setCur] = useState(0)
  const [prev, setPrev] = useState(null)
  const [dir, setDir] = useState(1)
  const [hover, setHover] = useState(false)
  const [focus, setFocus] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)

  const curRef = useRef(0)
  const timer = useRef(0)
  const drag = useRef({ x: 0, y: 0, on: false, moved: false })
  const closeBtn = useRef(null)
  const lastFocus = useRef(null)

  const go = useCallback(
    (to, d) => {
      const target = ((to % n) + n) % n
      if (target === curRef.current) return
      const direction = d ?? (target > curRef.current ? 1 : -1)
      setDir(direction)
      setPrev(curRef.current)
      setCur(target)
      curRef.current = target
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setPrev(null), 950)
    },
    [n]
  )
  const next = useCallback(() => go(curRef.current + 1, 1), [go])
  const back = useCallback(() => go(curRef.current - 1, -1), [go])

  useEffect(() => () => clearTimeout(timer.current), [])

  /* pause autoplay while the tab is hidden */
  useEffect(() => {
    const onVis = () => setHidden(document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  /* viewer: scroll lock, focus, keyboard */
  useEffect(() => {
    if (!open) return
    const old = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeBtn.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'ArrowLeft') back()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = old
      document.removeEventListener('keydown', onKey)
      lastFocus.current?.focus?.()
    }
  }, [open, next, back])

  const openViewer = (e) => {
    lastFocus.current = e.currentTarget
    setOpen(true)
  }

  /* swipe */
  const onDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    drag.current = { x: e.clientX, y: e.clientY, on: true, moved: false }
  }
  const onUp = (e) => {
    const d = drag.current
    if (!d.on) return
    d.on = false
    const dx = e.clientX - d.x
    const dy = e.clientY - d.y
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      d.moved = true
      dx < 0 ? next() : back()
    }
  }
  const onClickCapture = (e) => {
    if (drag.current.moved) {
      drag.current.moved = false
      e.preventDefault()
      e.stopPropagation()
    }
  }

  const onKeyDown = (e) => {
    if (open || n < 2) return
    if (e.key === 'ArrowRight') next()
    else if (e.key === 'ArrowLeft') back()
  }

  const paused = hover || focus || hidden || open
  const now = PAPERS[cur]
  const slides = [prev, cur].filter((i) => i !== null)

  return (
    <div
      className="rp"
      data-paused={paused}
      style={{ '--rp-dir': dir, '--rp-time': INTERVAL + 'ms' }}
      role="region"
      aria-roledescription="carousel"
      aria-label="Student research papers"
      onKeyDown={onKeyDown}
      onPointerEnter={(e) => e.pointerType === 'mouse' && setHover(true)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && setHover(false)}
      onFocus={(e) => {
        try { if (e.target.matches(':focus-visible')) setFocus(true) } catch { /* ignore */ }
      }}
      onBlur={() => setFocus(false)}
    >
      {/* ---------- stage ---------- */}
      <div
        className="rp-stage"
        onPointerDown={onDown}
        onPointerUp={onUp}
        onPointerCancel={() => (drag.current.on = false)}
        onClickCapture={onClickCapture}
      >
        {/* ambient background: blob, orbit ring, sparkles */}
        <div className="rp-bg" aria-hidden="true">
          <span className="rp-blob" />
          <svg className="rp-orbit" viewBox="0 0 400 200" fill="none">
            <ellipse cx="200" cy="100" rx="190" ry="92" stroke="currentColor" strokeWidth="1.3" vectorEffect="non-scaling-stroke" />
            <ellipse cx="200" cy="100" rx="150" ry="62" stroke="currentColor" strokeWidth="1" opacity=".4" transform="rotate(34 200 100)" vectorEffect="non-scaling-stroke" />
            <circle className="rp-orbit-dot" r="4" fill="currentColor">
              <animateMotion dur="16s" repeatCount="indefinite" path="M10,100 A190,92 0 1,1 390,100 A190,92 0 1,1 10,100" />
            </circle>
          </svg>
          <Spark className="rp-sp rp-s1" />
          <Spark className="rp-sp rp-s2" />
          <Spark className="rp-sp rp-s3" />
        </div>

        {slides.map((i) => {
          const p = PAPERS[i]
          const active = i === cur
          const lines = p.tag ?? TAGLINE
          return (
            <div
              key={p.id}
              className={'rp-slide ' + (active ? 'is-active' : 'is-leaving')}
              aria-hidden={!active}
            >
              <div className="rp-pw">
                <div className="rp-tilt">
                  {/* <button
                    type="button"
                    className="rp-paper"
                    onClick={openViewer}
                    tabIndex={active ? 0 : -1}
                    aria-label={'View research paper: ' + p.title}
                  > */}
                    <span className="rp-sheet">
                      {p.glimpse ? (
                        <Doc g={p.glimpse} />
                      ) : (
                        <img src={p.paper} alt={'Research paper: ' + p.title} draggable="false" />
                      )}
                      <span className="rp-shine" />
                    </span>
                    <span className="rp-zoom" aria-hidden="true"><Expand /></span>
                  {/* </button> */}
                </div>
              </div>

              {/* student profile box: photo left, university + class right */}
              <div className="rp-pill" title={p.student}>
                <span className="rp-av"><Photo src={p.photo} name={p.student} /></span>
                <span className="rp-who">
                  <strong className="rp-school">{p.school}</strong>
                  <span className="rp-class">{p.grade}</span>
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* ---------- controls ---------- */}
      {n > 1 && (
        <div className="rp-controls">
          <div className="rp-dots">
            {PAPERS.map((p, i) => (
              <button
                key={p.id}
                type="button"
                className={'rp-dot' + (i === cur ? ' is-on' : '')}
                onClick={() => go(i)}
                aria-label={`Show paper ${i + 1} of ${n}`}
                aria-current={i === cur ? 'true' : undefined}
              >
                <span className="rp-dot-track">
                  <span
                    className="rp-fill"
                    onAnimationEnd={i === cur ? (e) => e.animationName === 'rp-progress' && next() : undefined}
                  />
                </span>
              </button>
            ))}
          </div>

          <div className="rp-right">
            <div className="rp-btns">
              <button type="button" className="rp-btn" onClick={back} aria-label="Previous paper"><Chevron dir="l" /></button>
              <button type="button" className="rp-btn" onClick={next} aria-label="Next paper"><Chevron dir="r" /></button>
            </div>
          </div>
        </div>
      )}

      <span className="rp-sr" aria-live="polite">
        {`Paper ${cur + 1} of ${n}: ${now.title}, by ${now.student}, ${now.grade}, ${now.school}`}
      </span>

      {/* ---------- full-size viewer ---------- */}
      {open && typeof document !== 'undefined' &&
        createPortal(
          <div className="rp-lb" role="dialog" aria-modal="true" aria-label="Research paper viewer" onClick={() => setOpen(false)}>
            <div className="rp-lb-card" onClick={(e) => e.stopPropagation()}>
              <div className="rp-lb-scroll">
                <img src={now.paper} alt={'Research paper: ' + now.title} />
              </div>
              <div className="rp-lb-cap">
                <strong>{now.title}</strong>
                <span>{now.student} · {now.grade} · {now.school}</span>
              </div>
            </div>

            <button ref={closeBtn} type="button" className="rp-lb-x" onClick={() => setOpen(false)} aria-label="Close viewer">
              <Close />
            </button>
            {n > 1 && (
              <>
                <button type="button" className="rp-lb-nav rp-lb-prev" onClick={(e) => { e.stopPropagation(); back() }} aria-label="Previous paper"><Chevron dir="l" /></button>
                <button type="button" className="rp-lb-nav rp-lb-next" onClick={(e) => { e.stopPropagation(); next() }} aria-label="Next paper"><Chevron dir="r" /></button>
              </>
            )}
          </div>,
          document.body
        )}
    </div>
  )
}

















// import { useCallback, useEffect, useRef, useState } from 'react'
// import { createPortal } from 'react-dom'

// /* ---------------------------------------------------------------
//    EDIT HERE: one object per slide.
//    paper   = research paper image   (file inside /public)
//    photo   = student photo          (file inside /public)
//    student = student name (used for alt text / tooltip / fallback initials)
//    school  = university name        (shown in the profile box, bold)
//    grade   = class                  (shown under the university name)
//    tag     = (optional) two lines for the green tag on the paper
// --------------------------------------------------------------- */
// const PAPERS = [
//   {
//     id: 'p1',
//     paper: '/research/paper-1.jpeg',
//     title: 'Combinatorial Coverage Guarantees for Resilient Emergency Shelter Placement',
//     field: 'Graph Theory · Disaster Planning',
//     student: 'Aditi Sharma',
//     school: 'Your University Name',
//     grade: 'Class 12',
//     photo: '/students/pranet-k.png',
//   },
//   {
//     id: 'p2',
//     paper: '/research/paper-1.jpeg',
//     title: 'Replace with your second paper title',
//     field: 'Your Field · Your Topic',
//     student: 'Student Name',
//     school: 'Your University Name',
//     grade: 'Class 11',
//     photo: '/students/pranet-k.png',
//   },
//   {
//     id: 'p3',
//     paper: '/research/paper-1.jpeg',
//     title: 'Replace with your third paper title',
//     field: 'Your Field · Your Topic',
//     student: 'Student Name',
//     school: 'Your University Name',
//     grade: 'Class 12',
//     photo: '/students/pranet-k.png',
//   },
// ]

// const TAGLINE = ['Guided by expertise.', 'Built through inquiry.'] // default green tag text
// const INTERVAL = 6500 // ms per slide

// const pad = (x) => String(x).padStart(2, '0')
// const initials = (name) =>
//   name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()

// /* ---------- small inline icons ---------- */
// const Chevron = ({ dir }) => (
//   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
//     <path d={dir === 'l' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />
//   </svg>
// )
// const Expand = () => (
//   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
//     <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
//   </svg>
// )
// const Close = () => (
//   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
//     <path d="M6 6l12 12M18 6L6 18" />
//   </svg>
// )
// const Spark = ({ className }) => (
//   <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
//     <path fill="currentColor" d="M12 0C12.8 7.5 16.5 11.2 24 12C16.5 12.8 12.8 16.5 12 24C11.2 16.5 7.5 12.8 0 12C7.5 11.2 11.2 7.5 12 0Z" />
//   </svg>
// )

// /* student photo with initials fallback */
// function Photo({ src, name }) {
//   const [bad, setBad] = useState(false)
//   if (bad || !src) return <span className="rp-mono">{initials(name)}</span>
//   return <img src={src} alt={name} draggable="false" onError={() => setBad(true)} />
// }

// export default function HeroPapers() {
//   const n = PAPERS.length
//   const [cur, setCur] = useState(0)
//   const [prev, setPrev] = useState(null)
//   const [dir, setDir] = useState(1)
//   const [hover, setHover] = useState(false)
//   const [focus, setFocus] = useState(false)
//   const [hidden, setHidden] = useState(false)
//   const [open, setOpen] = useState(false)

//   const curRef = useRef(0)
//   const timer = useRef(0)
//   const drag = useRef({ x: 0, y: 0, on: false, moved: false })
//   const closeBtn = useRef(null)
//   const lastFocus = useRef(null)

//   const go = useCallback(
//     (to, d) => {
//       const target = ((to % n) + n) % n
//       if (target === curRef.current) return
//       const direction = d ?? (target > curRef.current ? 1 : -1)
//       setDir(direction)
//       setPrev(curRef.current)
//       setCur(target)
//       curRef.current = target
//       clearTimeout(timer.current)
//       timer.current = setTimeout(() => setPrev(null), 950)
//     },
//     [n]
//   )
//   const next = useCallback(() => go(curRef.current + 1, 1), [go])
//   const back = useCallback(() => go(curRef.current - 1, -1), [go])

//   useEffect(() => () => clearTimeout(timer.current), [])

//   /* pause autoplay while the tab is hidden */
//   useEffect(() => {
//     const onVis = () => setHidden(document.hidden)
//     document.addEventListener('visibilitychange', onVis)
//     return () => document.removeEventListener('visibilitychange', onVis)
//   }, [])

//   /* viewer: scroll lock, focus, keyboard */
//   useEffect(() => {
//     if (!open) return
//     const old = document.body.style.overflow
//     document.body.style.overflow = 'hidden'
//     closeBtn.current?.focus()
//     const onKey = (e) => {
//       if (e.key === 'Escape') setOpen(false)
//       else if (e.key === 'ArrowRight') next()
//       else if (e.key === 'ArrowLeft') back()
//     }
//     document.addEventListener('keydown', onKey)
//     return () => {
//       document.body.style.overflow = old
//       document.removeEventListener('keydown', onKey)
//       lastFocus.current?.focus?.()
//     }
//   }, [open, next, back])

//   const openViewer = (e) => {
//     lastFocus.current = e.currentTarget
//     setOpen(true)
//   }

//   /* swipe */
//   const onDown = (e) => {
//     if (e.pointerType === 'mouse' && e.button !== 0) return
//     drag.current = { x: e.clientX, y: e.clientY, on: true, moved: false }
//   }
//   const onUp = (e) => {
//     const d = drag.current
//     if (!d.on) return
//     d.on = false
//     const dx = e.clientX - d.x
//     const dy = e.clientY - d.y
//     if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.2) {
//       d.moved = true
//       dx < 0 ? next() : back()
//     }
//   }
//   const onClickCapture = (e) => {
//     if (drag.current.moved) {
//       drag.current.moved = false
//       e.preventDefault()
//       e.stopPropagation()
//     }
//   }

//   const onKeyDown = (e) => {
//     if (open || n < 2) return
//     if (e.key === 'ArrowRight') next()
//     else if (e.key === 'ArrowLeft') back()
//   }

//   const paused = hover || focus || hidden || open
//   const now = PAPERS[cur]
//   const slides = [prev, cur].filter((i) => i !== null)

//   return (
//     <div
//       className="rp"
//       data-paused={paused}
//       style={{ '--rp-dir': dir, '--rp-time': INTERVAL + 'ms' }}
//       role="region"
//       aria-roledescription="carousel"
//       aria-label="Student research papers"
//       onKeyDown={onKeyDown}
//       onPointerEnter={(e) => e.pointerType === 'mouse' && setHover(true)}
//       onPointerLeave={(e) => e.pointerType === 'mouse' && setHover(false)}
//       onFocus={(e) => {
//         try { if (e.target.matches(':focus-visible')) setFocus(true) } catch { /* ignore */ }
//       }}
//       onBlur={() => setFocus(false)}
//     >
//       {/* ---------- stage ---------- */}
//       <div
//         className="rp-stage"
//         onPointerDown={onDown}
//         onPointerUp={onUp}
//         onPointerCancel={() => (drag.current.on = false)}
//         onClickCapture={onClickCapture}
//       >
//         {/* ambient background: blob, orbit ring, sparkles */}
//         <div className="rp-bg" aria-hidden="true">
//           <span className="rp-blob" />
//           <svg className="rp-orbit" viewBox="0 0 400 200" fill="none">
//             <ellipse cx="200" cy="100" rx="190" ry="92" stroke="currentColor" strokeWidth="1.3" vectorEffect="non-scaling-stroke" />
//             <ellipse cx="200" cy="100" rx="150" ry="62" stroke="currentColor" strokeWidth="1" opacity=".4" transform="rotate(34 200 100)" vectorEffect="non-scaling-stroke" />
//             <circle className="rp-orbit-dot" r="4" fill="currentColor">
//               <animateMotion dur="16s" repeatCount="indefinite" path="M10,100 A190,92 0 1,1 390,100 A190,92 0 1,1 10,100" />
//             </circle>
//           </svg>
//           <Spark className="rp-sp rp-s1" />
//           <Spark className="rp-sp rp-s2" />
//           <Spark className="rp-sp rp-s3" />
//         </div>

//         {slides.map((i) => {
//           const p = PAPERS[i]
//           const active = i === cur
//           const lines = p.tag ?? TAGLINE
//           return (
//             <div
//               key={p.id}
//               className={'rp-slide ' + (active ? 'is-active' : 'is-leaving')}
//               aria-hidden={!active}
//             >
//               <div className="rp-pw">
//                 <div className="rp-tilt">
//                   <button
//                     type="button"
//                     className="rp-paper"
//                     onClick={openViewer}
//                     tabIndex={active ? 0 : -1}
//                     aria-label={'View research paper: ' + p.title}
//                   >
//                     <span className="rp-sheet">
//                       <img src={p.paper} alt={'Research paper: ' + p.title} draggable="false" />
//                       <span className="rp-shine" />
//                     </span>
//                     <span className="rp-zoom" aria-hidden="true"><Expand /></span>
//                   </button>

//                   {/* <div className="rp-tag">
//                     {lines.map((l) => <span key={l}>{l}</span>)}
//                   </div> */}
//                 </div>
//               </div>

//               {/* student profile box: photo left, university + class right */}
//               <div className="rp-pill" title={p.student}>
//                 <span className="rp-av"><Photo src={p.photo} name={p.student} /></span>
//                 <span className="rp-who">
//                   <strong className="rp-school">{p.school}</strong>
//                   <span className="rp-class">{p.grade}</span>
//                 </span>
//               </div>
//             </div>
//           )
//         })}
//       </div>

//       {/* ---------- controls ---------- */}
//       {n > 1 && (
//         <div className="rp-controls">
//           <div className="rp-dots">
//             {PAPERS.map((p, i) => (
//               <button
//                 key={p.id}
//                 type="button"
//                 className={'rp-dot' + (i === cur ? ' is-on' : '')}
//                 onClick={() => go(i)}
//                 aria-label={`Show paper ${i + 1} of ${n}`}
//                 aria-current={i === cur ? 'true' : undefined}
//               >
//                 <span className="rp-dot-track">
//                   <span
//                     className="rp-fill"
//                     onAnimationEnd={i === cur ? (e) => e.animationName === 'rp-progress' && next() : undefined}
//                   />
//                 </span>
//               </button>
//             ))}
//           </div>

//           <div className="rp-right">
//             <span className="rp-count" aria-hidden="true">
//               <b>{pad(cur + 1)}</b><i>/</i>{pad(n)}
//             </span>
//             <div className="rp-btns">
//               <button type="button" className="rp-btn" onClick={back} aria-label="Previous paper"><Chevron dir="l" /></button>
//               <button type="button" className="rp-btn" onClick={next} aria-label="Next paper"><Chevron dir="r" /></button>
//             </div>
//           </div>
//         </div>
//       )}

//       <span className="rp-sr" aria-live="polite">
//         {`Paper ${cur + 1} of ${n}: ${now.title}, by ${now.student}, ${now.grade}, ${now.school}`}
//       </span>

//       {/* ---------- full-size viewer ---------- */}
//       {open && typeof document !== 'undefined' &&
//         createPortal(
//           <div className="rp-lb" role="dialog" aria-modal="true" aria-label="Research paper viewer" onClick={() => setOpen(false)}>
//             <div className="rp-lb-card" onClick={(e) => e.stopPropagation()}>
//               <div className="rp-lb-scroll">
//                 <img src={now.paper} alt={'Research paper: ' + now.title} />
//               </div>
//               <div className="rp-lb-cap">
//                 <strong>{now.title}</strong>
//                 <span>{now.student} · {now.grade} · {now.school}</span>
//               </div>
//             </div>

//             <button ref={closeBtn} type="button" className="rp-lb-x" onClick={() => setOpen(false)} aria-label="Close viewer">
//               <Close />
//             </button>
//             {n > 1 && (
//               <>
//                 <button type="button" className="rp-lb-nav rp-lb-prev" onClick={(e) => { e.stopPropagation(); back() }} aria-label="Previous paper"><Chevron dir="l" /></button>
//                 <button type="button" className="rp-lb-nav rp-lb-next" onClick={(e) => { e.stopPropagation(); next() }} aria-label="Next paper"><Chevron dir="r" /></button>
//               </>
//             )}
//           </div>,
//           document.body
//         )}
//     </div>
//   )
// }