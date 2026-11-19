import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import LibraryToggle from '../components/LibraryToggle'

const d = (ms) => ({ '--d': ms + 'ms' })
const IMG = (file) => `${import.meta.env.BASE_URL}projects/${file}`

/* ───────── PROJECT DATA (edit text / image names here) ─────────
   section options:  paras: ['text', …]   list: ['item', …]   chips: ['IRIS', …]
   images go in  public/projects/  (a tidy placeholder shows until the file exists) */
const PROJECTS = [
  {
    id: 'shape-morphing-wing',
    no: '01',
    title: 'Shape morphing wing',
    image: IMG('shape-morphing-wing.png'),
    alt: 'Fusion 360 model of the sectioned shape morphing wing',
    pos: '50% 50%',
    brief:
      'A 3D sectioned wing model that morphs its shape, leaner for take-off and cruising and thicker for landing, to reduce overall fuel consumption.',
    sections: [
      {
        label: 'Problem statement',
        paras: [
          'Commercial aircrafts burns a lot of fuel in a single flight, significant amount of fuel gets consumed while take off (20%). Due to rigid wing design a lot of fuel gets wasted in order to overcome air-drag.',
        ],
      },
      {
        label: 'Solution',
        paras: [
          'We build a 3D sectioned model of a wing that can morph its shape (gets leaner while taking off and cruising) and thicker while landing in order to reduce the overall consumption of the fuel.',
        ],
      },
      {
        label: 'Innovation',
        paras: [
          "The Flaps and the structural shape of the wing was designed in way that there's no open gaps between the wings and the flap, resulting in a significant amount of turbulence reduction hence the increased overall efficiency. Simulations were also done to justify the claim.",
        ],
      },
      { label: 'Competition', chips: ['IRIS'] },
    ],
  },
  {
    id: 'tactic',
    no: '02',
    title: 'TACTIC: Electronics kit for visually impaired',
    image: IMG('tactic-kit.png'),
    alt: 'TACTIC tactile circuit teaching kit: power supply, component blocks, analyzer module and circuit examples',
    pos: '50% 50%',
    brief:
      'A modular kit of tactile, puzzle-like blocks with an ESP32-based analyzer that gives real-time audio feedback, so blind students can learn electronics independently.',
    sections: [
      {
        label: 'Problem statement',
        paras: [
          'Blind students face significant difficulty learning practical electronics because conventional kits rely heavily on visual identification, wiring diagrams, and colour-coded components. There is a need for a hands-on, tactile and audio-guided electronics learning system that allows them to learn independently.',
        ],
      },
      {
        label: 'Solution',
        paras: [
          'We are developing a modular electronics kit using tactile, puzzle-like blocks that can be physically connected to build circuits.',
          'An ESP32-based analyzer detects the selected components/voltage and provides real-time audio feedback, making the learning process accessible to blind students.',
        ],
      },
      {
        label: 'Innovation',
        paras: [
          'The system combines tactile circuit construction, electronic identification, automated analysis and embedded voice feedback in a single educational platform.',
          'Students can learn electronics through touch, physical interaction and audio instead of depending on visual instructions.',
        ],
      },
      {
        label: 'Competitions to apply for',
        paras: [
          'IRIS National Fair — primary target for the student innovation/research project.',
          'If the project qualifies through the appropriate pathway, Regeneron ISEF can be a longer-term international target; other suitable student innovation competitions can also be considered.',
        ],
      },
    ],
  },
  {
    id: 'leprosy-glove',
    no: '03',
    title: 'Glove for leprosy patients',
    image: IMG('leprosy-glove.png'),
    alt: 'Wearable glove with ESP32, vibration motor, buzzer and FSR pressure sensors',
    pos: '50% 50%',
    brief:
      'A low-cost wearable with pressure sensors and an ESP32 that alerts leprosy patients with vibration or sound when potentially harmful pressure is detected.',
    sections: [
      {
        label: 'Problem statement',
        paras: [
          'Leprosy can cause loss of protective sensation in the hands, making patients unaware of excessive pressure, squeezing, or minor injuries. Repeated unnoticed pressure can lead to wounds and serious complications.',
        ],
      },
      {
        label: 'Solution',
        paras: [
          'A low-cost wearable device using pressure sensors and ESP32 continuously monitors pressure on vulnerable areas of the hand. When potentially harmful pressure is detected, it provides an immediate vibration and/or audible alert.',
        ],
      },
      {
        label: 'Innovation',
        paras: [
          'Instead of measuring pressure merely as a value, the system considers pressure intensity and duration to identify potentially harmful exposure. Its modular, low-cost design can be adapted into a glove or finger-worn device.',
        ],
      },
      {
        label: 'Competitions to apply for',
        paras: [
          'INSPIRE-MANAK • CBSE National Science Exhibition • IRIS National Fair • Anveshana • Conrad Challenge — with potential for higher-level health-tech and assistive-technology competitions as the prototype and validation mature.',
        ],
      },
    ],
  },

  /* ───────── NEW PROJECTS ───────── */
  {
    id: 'hybrid-engine',
    no: '04',
    title: 'Hybrid engine (Ramjet + Scramjet)',
    image: IMG('hybrid-engine.png'),
    alt: 'Ramjet and scramjet engine model',
    pos: '50% 50%',
    brief:
      'Ramjet and scramjet engines designed in Fusion 360 and simulated in ANSYS at Mach 5 and Mach 15, with a 3D engine model that morphs its shape to the speed it operates at.',
    sections: [
      {
        label: 'Problem statement',
        paras: [
          'High-speed aircraft require propulsion systems capable of operating across supersonic and hypersonic regimes. Ramjets and Scramjets offer better efficiency at these speeds. This project designs and simulates both engines to compare their behavior under Mach 5 and Mach 15 conditions.',
        ],
      },
      {
        label: 'Solution',
        list: [
          'Design Ramjet and Scramjet engines in Fusion 360.',
          'Simulate both designs in ANSYS 2025 R2.',
          'Evaluate behavior at Mach 5 and Mach 15.',
          'Compare airflow compression, heat rise, thrust behavior, and stability.',
        ],
      },
      {
        label: 'Innovation',
        paras: [
          '3D model of an engine which has been designed that can morph it’s shape based upon the operational speed it’s supposed to achieve.',
        ],
      },
      { label: 'Competition', chips: ['IRIS'] },
    ],
  },
  {
    id: 'winglets',
    no: '05',
    title: 'Different winglets profile comparison',
    image: IMG('winglets.png'),
    alt: 'Comparison of different winglet profiles',
    pos: '50% 50%',
    brief:
      'A comparison study of different winglet profiles to find the optimal one, reducing wingtip vortices and induced drag while improving the lift-to-drag ratio.',
    sections: [
      {
        label: 'Problem statement',
        list: [
          'Wings generate lift → pressure difference (high below, low above).',
          'Air curls around the tip → creates wingtip vortices.',
          'These vortices = energy loss → induced drag.',
        ],
      },
      {
        label: 'Solution',
        list: [
          'Winglets reduce vortex strength.',
          'Increase effective wingspan without physically extending wing.',
          'Improve Lift-to-Drag ratio (L/D).',
        ],
      },
      {
        label: 'Innovation',
        paras: [
          'Comparison study of different winglets and find the optimal out of all.',
        ],
      },
      { label: 'Competition', chips: ['IRIS'] },
    ],
  },
  {
    id: 'sweat-tracker',
    no: '06',
    title: 'Digital sweat tracker',
    image: IMG('sweat-tracker.png'),
    alt: 'Wrist-worn digital sweat tracker',
    pos: '50% 50%',
    brief:
      'A compact wrist-band that reads heart-rate data, sends it to a phone over BLE and warns the user before sweating starts.',
    sections: [
      {
        label: 'Problem statement',
        paras: [
          'Users often experience sudden sweating without advance indication. This project aims to create a small wearable system that picks up early physiological changes and notifies the user before sweating begins.',
        ],
      },
      {
        label: 'Solution',
        list: [
          'Develop a wrist-worn device that reads heart-rate data.',
          'Transfer this data to a mobile device through BLE.',
          'Analyze short-term variations to estimate when sweating is about to trigger.',
          'Provide an early alert so the user can take action.',
        ],
      },
      {
        label: 'Innovation',
        paras: ['A compact wrist-band system that warns the user before sweating starts.'],
      },
      { label: 'Competitions', chips: ['IRIS'] },
    ],
  },
  {
    id: 'cataract-model',
    no: '07',
    title: 'ML-based cataract prediction model',
    image: IMG('cataract-model.png'),
    alt: 'Machine learning cataract prediction from eye images',
    pos: '50% 50%',
    brief:
      'An offline machine-learning model that classifies eye images as cataract or normal, giving a quick preliminary screening without any medical-grade equipment.',
    sections: [
      {
        label: 'Problem statement',
        paras: [
          'Cataract is one of the leading causes of vision impairment worldwide, especially in regions with limited access to specialized healthcare. Early detection is crucial but often delayed due to lack of screening tools and awareness. There is a need for an automated system that can analyze eye images and provide quick preliminary assessments.',
        ],
      },
      {
        label: 'Solution',
        list: [
          'Develop a system to classify eye images as cataract or normal.',
          'Use machine learning for pattern recognition in eye images.',
          'Enable batch processing of images from a local directory.',
          'Create a simple and accessible screening tool.',
        ],
      },
      {
        label: 'Innovation',
        paras: [
          'An ML model that can run completely offline and by looking at the subject image of an eye this model predicts the likelihood of the individual to develop cataract or not, without the need of any medical grade equipment.',
        ],
      },
      { label: 'Competition', chips: ['IRIS'] },
    ],
  },
  {
    id: 'ornithopter',
    no: '08',
    title: '3D model of an ornithopter',
    image: IMG('ornithopter.png'),
    alt: '3D model of an ornithopter',
    pos: '50% 50%',
    brief:
      'A completely new 3D ornithopter model that is quieter than drones, can glide to save power and generates more lift per stroke.',
    sections: [
      {
        label: 'Problem statement',
        paras: [
          'Traditional Drones have a problem of being to noisy and they also require continuous power to keep them flying.',
        ],
      },
      {
        label: 'Solution',
        paras: [
          'Designed an ornithopter that produces less noise and can glide like an aircraft (reduces overall power consumption and hence increases flight time).',
        ],
      },
      {
        label: 'Innovation',
        paras: [
          'Developed a completely novel 3D model from scratch that has improved degree of motion resulting in elevated lift generation per stroke.',
        ],
      },
      { label: 'Competition', chips: ['IRIS'] },
    ],
  },
  {
    id: 'gids-shelter',
    no: '09',
    title: 'GIDS-based shelter allocation system',
    image: IMG('gids-shelter.png'),
    alt: 'GIS and graph-based emergency shelter allocation system',
    pos: '50% 50%',
    brief:
      'A GIS and graph-based emergency shelter placement system that uses a Greedy Independent Dominating Set on a Unit-Disk Graph to choose shelters and assign people to them.',
    sections: [
      {
        label: 'Problem statement',
        paras: [
          'During a disaster such as an earthquake, cyclone, flood, fire, or building collapse, a large number of people may suddenly require safe shelter. The major challenge is not only identifying affected population, but also deciding which shelters should be opened and how people should be assigned to them efficiently.',
          'Traditional approaches may rely on fixed shelter lists or simple nearest-shelter logic, which can lead to overcrowding, poor coverage, and inefficient shelter selection.',
        ],
      },
      {
        label: 'Solution',
        paras: [
          'We developed a GIS and graph-based emergency shelter placement system that models the affected region using geographic coordinates and population nodes.',
          'The system:',
          'Disaster Scenario → Affected Population → Candidate Shelters → Shelter Evaluation → GIDS-based Selection → Ranking → Recommendation',
          'The core algorithm uses a Greedy Independent Dominating Set (GIDS) approach on a Unit-Disk Graph to select a set of shelters that provides broad population coverage while avoiding unnecessary clustering of selected shelters.',
        ],
      },
      {
        label: 'Innovation',
        paras: [
          'The system first determines which shelters should form the overall emergency shelter network, and then assigns individuals to appropriate shelters based on their actual location.',
        ],
      },
      {
        label: 'Competitions',
        chips: ['IRSI', 'GIS (geospatial innovation competitions)'],
      },
    ],
  },
  {
    id: 'fanklet',
    no: '10',
    title: 'Fanklet (fall detecting anklet)',
    image: IMG('fanklet.png'),
    alt: 'Fanklet, an ESP32-based fall detecting anklet',
    pos: '50% 50%',
    brief:
      'A low-cost ESP32 anklet that detects falls and analyses tremor patterns offline, with a companion app and an SOS call feature.',
    sections: [
      {
        label: 'Problem statement',
        paras: [
          'Parkinson’s-related tremors and falls can significantly affect a person’s safety and independence. Existing monitoring systems can be expensive, complex, or dependent on continuous internet connectivity.',
        ],
      },
      {
        label: 'Solution',
        paras: [
          'A wearable ESP32-based fanklet continuously monitors acceleration and gyroscope data, while a mobile app records and analyzes the data for tremor patterns, activity, and fall events, with an SOS call feature for emergencies.',
        ],
      },
      {
        label: 'Innovation',
        paras: [
          'The system combines real-time fall detection, tremor analysis, and offline data processing in a low-cost wearable ecosystem, allowing long-term sensor data to be analyzed without relying on cloud services.',
        ],
      },
      {
        label: 'Competitions to apply for',
        chips: [
          'IRIS National Fair',
          'CBSE Science Exhibition',
          'INSPIRE Awards–MANAK',
          'India International Science Festival (IISF)',
          'Conrad Challenge',
        ],
      },
    ],
  },
  {
    id: 'cabinwatch',
    no: '11',
    title: 'CabinWatch',
    image: IMG('cabinwatch.png'),
    alt: 'CabinWatch in-vehicle occupant and temperature monitoring system',
    pos: '50% 50%',
    brief:
      'A standalone retrofit system that detects children or pets left in a parked car and alerts locally and by SMS when the cabin temperature crosses a threshold.',
    sections: [
      {
        label: 'Problem statement',
        paras: [
          'Children and pets left inside parked vehicles can be exposed to rapidly rising cabin temperatures, creating a serious risk of heat stress and heat stroke. Existing occupant-monitoring solutions are often integrated into premium/OEM vehicle systems and are difficult to retrofit into existing vehicles.',
        ],
      },
      {
        label: 'Solution',
        paras: [
          'A standalone retrofit system that uses onboard computer vision to detect an occupant and an environmental sensor to monitor cabin temperature. When an occupant is detected and the temperature crosses a predefined threshold, the system provides a local alert and sends an SMS notification to a predefined mobile number.',
        ],
      },
      {
        label: 'Innovation',
        paras: [
          'The system combines edge-based occupant detection and temperature monitoring into a single decision-making mechanism without depending on the vehicle’s OEM electronics or cloud infrastructure. A software-based cooldown mechanism prevents repeated SMS alerts while continuous monitoring continues.',
        ],
      },
      {
        label: 'Competition to apply for',
        paras: [
          'Suitable competitions can include Smart India Hackathon (SIH), e-Yantra Innovation Challenge, iDEX / Defence Innovation challenges where the problem statement aligns, and relevant hardware/IoT innovation competitions focused on public safety, automotive technology, or assistive technology.',
        ],
      },
    ],
  },
  {
    id: 'neurocalm',
    no: '12',
    title: 'NeuroCalm',
    image: IMG('neurocalm.png'),
    alt: 'NeuroCalm wearable stress sensing system',
    pos: '50% 50%',
    brief:
      'A wearable that combines heart rate, GSR, temperature and finger pressure into a real-time Stress Index and triggers a haptic alert at a set threshold.',
    sections: [
      {
        label: 'Problem statement',
        paras: [
          'People experiencing stress may show physiological changes such as increased heart rate, skin conductance, temperature, and muscle/finger pressure. These changes are often difficult to recognize early through subjective observation alone.',
        ],
      },
      {
        label: 'Solution',
        paras: [
          'NeuroCalm is a wearable sensing system that continuously measures HR, GSR, temperature, and finger pressure using MAX30102, GSR, MAX30205, and FSR sensors, then generates a real-time Stress Index.',
        ],
      },
      {
        label: 'Innovation',
        paras: [
          'Instead of relying on a single physiological signal, NeuroCalm combines multiple independent biosignals to estimate stress more robustly and triggers a haptic motor when the detected stress level crosses a defined threshold.',
        ],
      },
      {
        label: 'Competitions to apply for',
        list: [
          'Smart India Hackathon (SIH) — hardware/IoT & healthcare-oriented challenges',
          'e-Yantra / IIT Bombay competitions — embedded systems & robotics',
          'Anveshana / INSPIRE-type innovation programs — student innovation & prototyping',
          'IIC / Institution Innovation Council competitions — health-tech and social-impact prototypes',
        ],
      },
    ],
  },
  {
    id: 'heat-stroke',
    no: '13',
    title: 'Heat stroke prediction model',
    image: IMG('heat-stroke.png'),
    alt: 'ESP32-based heat stroke prediction device',
    pos: '50% 50%',
    brief:
      'An ESP32-based edge device that tracks body temperature against a personal baseline and calculates a real-time heat-stress risk score without the cloud.',
    sections: [
      {
        label: 'Problem statement',
        paras: [
          'Heat stress can develop progressively, while conventional monitoring may not continuously track changes in body temperature. There is a need for a compact system that can identify abnormal temperature trends early.',
        ],
      },
      {
        label: 'Solution',
        paras: [
          'An ESP32-based edge device uses the MAX30205 temperature sensor to continuously monitor temperature and establish an individual baseline. It analyzes temperature change, rate, and rising trends to calculate a real-time risk score.',
        ],
      },
      {
        label: 'Innovation',
        paras: [
          'Instead of relying only on a fixed temperature threshold, the system combines baseline deviation + temperature delta + rate of change + trend analysis into a lightweight on-device risk model, enabling real-time edge processing without cloud dependency.',
        ],
      },
      {
        label: 'Competition to apply for',
        paras: [
          'ATL Marathon / ATL Tinkering Lab challenges, CBSE innovation competitions, INSPIRE Awards–MANAK, Smart India Hackathon (SIH), and relevant hardware/IoT innovation challenges.',
        ],
      },
    ],
  },

    {
    id: 'agritech',
    no: '14',
    title: 'Agritech',
    image: IMG('Agritech.jpeg'),
    alt: 'Agritech app splash screen: leaf logo on a green background with the tagline Smart Farming Solutions',
    pos: '50% 30%',
    brief:
      'An end-to-end Agritech AI system that works in low-connectivity settings, is explainable and multilingual, and shows measurable sustainability impact, with two publishable papers, a working app and small farmer/community pilots.',
    sections: [
      {
        label: 'Overview',
        paras: [
          'Build an end-to-end Agritech AI system that works in low-connectivity settings, is explainable and multilingual, and demonstrates measurable sustainability impact. The work yields two publishable papers with mentors from India and the USA, a working app, optional hardware integration (IoT baseline; drone stretch), and small but real farmer/community pilots.',
        ],
      },
      {
        label: 'Primary outcome for admissions',
        paras: [
          'Two research papers (India + USA co-authors), quantifiable results, open artifacts (code/data), and real-world users.',
          'This signals research depth, systems thinking, and social impact—exactly what top CSE programs value.',
        ],
      },
      {
        label: 'Deliverables',
        list: [
          'Paper A (India-focused, HCI/Systems/AI for low-resource settings). Title (working): AgriVision-Lite: Offline-First, Explainable, Multilingual Mobile AI for Crop Care. Core contributions: on-device ML + cloud fallback, Grad-CAM explainability, multilingual UI, small usability study, multi-modal fusion (image + weather + soil).',
          'Paper B (International methods/systems). Title (working): AgriVision-X: Edge-Enabled Segmentation and Selective Treatment for Sustainable Precision Agriculture. Core contributions: lesion segmentation, selective action estimation (dose/area), optional edge inference (IoT/Drone), sustainability metrics.',
          'App (Android; Flutter or native): Works fully offline; hybrid inference; multilingual + voice; explainable predictions; advisory cards; data consent and privacy.',
          'Hardware path (choose at least one): IoT baseline (ESP32 + soil/ambient sensors via BLE) for fusion and validation. Drone stretch (DJI/Pixhawk + RGB; optional Jetson/Coral) for field stress mapping. Satellite imagery can substitute if drone access is hard.',
          'Open artifacts: Clean GitHub repo, model card, anonymized sample dataset, short demo video, bilingual spray-sheet/export.',
        ],
      },
      {
        label: 'System scope: Mobile app (must-have)',
        list: [
          'Camera capture and gallery import.',
          'On-device disease classification (TFLite int8; sub-100 ms on mid-range phone; ≤10 MB model).',
          'Result card with diagnosis, confidence, and 3-step action plan (cultural → organic → chemical).',
          'Hybrid inference: default on-device; cloud fallback for a heavier model when online.',
          'Explainability: Grad-CAM heatmap overlay + one-line “why” message in local language.',
          'Multi-modal inputs: image + soil moisture + weather for improved recommendations.',
          'Basic irrigation advisor (simple ET-based rule at first; upgrade to small ML regressor).',
          'Multilingual UI (English + Kannada/Hindi); optional voice prompts for accessibility.',
          'Local datastore for fields, observations, predictions, treatments; offline-first sync.',
          'Privacy and consent flows; delete-my-data; no PII to cloud by default; signed updates.',
        ],
      },
      {
        label: 'System scope: ML core (research engine)',
        list: [
          'Task 1: Image classification (MobileNet/EfficientNet-Lite; robust augmentations).',
          'Task 2: Lesion segmentation (U-Net/DeepLab-Mobile) to localize disease—enables selective actions and stronger XAI.',
          'Task 3: Fusion model (late fusion baseline): image + soil + weather.',
          'Calibration: temperature scaling; report ECE so probabilities are trustworthy.',
          'Model card + A/B ability inside app (opt-in to try newer model; instant rollback).',
        ],
      },
      {
        label: 'System scope: Hardware paths',
        list: [
          'IoT baseline (recommended even if no drone): ESP32 + capacitive soil moisture + temp/humidity (DHT22) + optional pH. BLE to app, simple quality checks (range/debounce/calibration prompts).',
          'Drone stretch (optional): RGB mosaic capture → inference → hotspot polygons. If hardware spraying is not feasible, simulate selective spraying (coordinates + dose plan). Satellite imagery (e.g., public aerial datasets) can substitute the drone until you get access.',
        ],
      },
      {
        label: 'System scope: Precision/mapping and outputs',
        list: [
          'Stress polygon viewer: load GeoJSON hotspots (from drone/satellite/segmentation) on a map view.',
          'Spray sheet export (PDF): compute estimated dose from lesion area/field area; bilingual, units verified.',
        ],
      },
      {
        label: 'System scope: Analytics, evaluation, ethics',
        list: [
          'Developer metrics panel (local only): latency, model version, device model, prediction counts.',
          'In-app surveys: SUS and 2–3 trust questions about XAI.',
          'Consent, anonymization, and responsible data handling baked in.',
        ],
      },
      {
        label: 'Novelty (what makes this “research” and not just an app)',
        list: [
          'Offline-first hybrid ML with calibrated cloud fallback (systems novelty for low connectivity regions).',
          'Explainable AI presented in farmer-friendly way (Grad-CAM + local-language rationale).',
          'Multi-modal fusion (image + environment) showing measurable accuracy and calibration gains.',
          'Lesion segmentation → selective action estimation (dose/area), quantifying chemical savings.',
          'Optional edge AI (IoT/drone/Coral/Jetson), or satellite-first substitute, for scalable precision.',
          'Formal evaluation: calibration (ECE), latency/size tradeoffs, HCI metrics (SUS, trust), and sustainability metrics (estimated % reduction in chemical/water).',
        ],
      },
      {
        label: 'Evaluation metrics (quote these in SOP/CV)',
        list: [
          'On-device latency: <100 ms on mid-range Android; model size ≤10 MB.',
          'Accuracy/F1: per-class F1 ≥0.85 on your local test set (include data from your region).',
          'Calibration: ECE ≤0.08 (before/after temperature scaling).',
          'Fusion uplift: ≥ +3 F1 points vs. image-only baseline.',
          'Segmentation quality: IoU/Dice on lesion masks; show qualitative Grad-CAM vs. mask alignment.',
          'Usability: SUS ≥70; ≥70% participants report XAI increased trust/understanding.',
          'Sync reliability: zero data loss in airplane-mode tests; crash-free rate ≥99.5%.',
          'IoT BLE reliability: packet loss ≤3% indoors / ≤8% outdoors.',
          'Sustainability proxy: estimated pesticide reduction ≥10–20% from selective dosing on trials.',
        ],
      },
      {
        label: 'Datasets and data plan',
        list: [
          'Public: PlantVillage, PlantDoc (images); Agriculture-Vision or similar for aerial/satellite; open weather sources for features.',
          'Local: collect 300–500 images in your crops/region; annotate at least 200; keep a small held-out local test set.',
          'IoT: log soil moisture and temp/humidity alongside image samples for fusion experiments.',
        ],
      },
    ],
  },
]
/* ──────────────────────────────────────────────────────────────── */

/* image with a tidy placeholder if the file is missing */
function Pic({ src, alt, pos }) {
  const [bad, setBad] = useState(false)
  if (bad) {
    return (
      <div className="pj-ph" role="img" aria-label={alt}>
        <span>Image coming soon</span>
      </div>
    )
  }
  return (
    <img
      src={src}
      alt={alt}
      style={pos ? { objectPosition: pos } : undefined}
      loading="lazy"
      decoding="async"
      onError={() => setBad(true)}
    />
  )
}

const Arrow = ({ dir }) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d={dir === 'left' ? 'M19 12H5M11 6l-6 6 6 6' : 'M5 12h14M13 6l6 6-6 6'} />
  </svg>
)

/* ───────────────────────── popup ───────────────────────── */
function ProjectModal({ index, onChange, onClose }) {
  const [closing, setClosing] = useState(false)
  const dlgRef = useRef(null)
  const bodyRef = useRef(null)
  const progRef = useRef(null)
  const closeRef = useRef(null)
  const timer = useRef(null)
  const p = PROJECTS[index]
  const total = PROJECTS.length

  const requestClose = useCallback(() => {
    if (timer.current) return
    setClosing(true)
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    timer.current = setTimeout(onClose, reduce ? 0 : 220)
  }, [onClose])

  const go = useCallback((n) => onChange((index + n + total) % total), [index, onChange, total])

  /* lock page scroll (no layout jump) + focus the close button */
  useEffect(() => {
    const html = document.documentElement
    const prev = { o: html.style.overflow, g: html.style.scrollbarGutter }
    html.style.overflow = 'hidden'
    html.style.scrollbarGutter = 'stable'
    closeRef.current && closeRef.current.focus({ preventScroll: true })
    return () => {
      html.style.overflow = prev.o
      html.style.scrollbarGutter = prev.g
      clearTimeout(timer.current)
    }
  }, [])

  /* Esc closes, arrows switch project, Tab stays inside the popup */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); requestClose(); return }
      if (e.key === 'ArrowLeft' && !e.altKey && !e.ctrlKey && !e.metaKey) { go(-1); return }
      if (e.key === 'ArrowRight' && !e.altKey && !e.ctrlKey && !e.metaKey) { go(1); return }
      if (e.key !== 'Tab' || !dlgRef.current) return
      const f = dlgRef.current.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])')
      if (!f.length) return
      const first = f[0], last = f[f.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [requestClose, go])

  /* new project -> scroll back to the top */
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = 0
    if (progRef.current) progRef.current.style.transform = 'scaleX(0)'
  }, [index])

  const onScroll = (e) => {
    const el = e.currentTarget
    const max = el.scrollHeight - el.clientHeight
    if (progRef.current) progRef.current.style.transform = `scaleX(${max > 0 ? el.scrollTop / max : 0})`
  }

  return createPortal(
    <div className={'pj-modal' + (closing ? ' is-closing' : '')}>
      <div className="pj-modal-bg" onClick={requestClose} />

      <div className="pj-dlg" role="dialog" aria-modal="true" aria-labelledby="pj-dlg-title" ref={dlgRef}>
        <div className="pj-dlg-head">
          <span className="pj-dlg-no" aria-hidden="true">{p.no}</span>
          <div className="pj-dlg-ttl">
            <span className="pj-dlg-kicker">Research project {index + 1} of {total}</span>
            <h3 id="pj-dlg-title">{p.title}</h3>
          </div>
          <button type="button" className="pj-x" ref={closeRef} onClick={requestClose} aria-label="Close project details">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
          <span className="pj-prog" ref={progRef} aria-hidden="true" />
        </div>

        <div className="pj-dlg-body" ref={bodyRef} onScroll={onScroll}>
          <div className="pj-content" key={p.id}>
            <div className="pj-hero" style={{ '--i': 0 }}>
              <Pic src={p.image} alt={p.alt} pos={p.pos} />
            </div>

            <div className="pj-secs">
              {p.sections.map((s, i) => (
                <section className="pj-sec" key={s.label} style={{ '--i': Math.min(i + 1, 6) }}>
                  <div className="pj-sec-main">
                    <h4>{s.label}</h4>
                    {s.chips && (
                      <div className="pj-chips">
                        {s.chips.map((c) => <span className="pj-chip" key={c}>{c}</span>)}
                      </div>
                    )}
                    {s.paras && s.paras.map((t, k) => <p key={k}>{t}</p>)}
                    {s.list && s.list.map((t, k) => <p className="pj-li" key={'li' + k}>{t}</p>)}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>

        <div className="pj-dlg-foot">
          <button type="button" className="pj-nav" onClick={() => go(-1)} aria-label="Previous project">
            <Arrow dir="left" /><span className="pj-lbl">Previous</span>
          </button>
          <span className="pj-count" aria-hidden="true">{index + 1} / {total}</span>
          <button type="button" className="pj-nav" onClick={() => go(1)} aria-label="Next project">
            <span className="pj-lbl">Next</span><Arrow dir="right" />
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}

/* ───────────────────────── page ───────────────────────── */
export default function Projects() {
  const [active, setActive] = useState(null)
  const trigger = useRef(null)

  const openModal = (i, e) => { trigger.current = e.currentTarget; setActive(i) }
  const closeModal = useCallback(() => {
    setActive(null)
    requestAnimationFrame(() => trigger.current && trigger.current.focus({ preventScroll: true }))
  }, [])

  return (
    <div className="page lib-page pj-page">
      <section className="pj-section">
        <div className="shell">
          <div className="vt-bar">
            <div className="pj-title rv">
              <h1>Research <span className="pj-title-x">projects</span></h1>
            </div>
            <LibraryToggle current="projects" />
          </div>

          <ul className="pj-grid">
            {PROJECTS.map((p, i) => (
              <li className="rv" key={p.id} style={d((i % 3) * 110)}>
                <article className="pj-card">
                  <div className="pj-thumb">
                    <Pic src={p.image} alt={p.alt} pos={p.pos} />
                    {/* <span className="pj-badge">Project {p.no}</span> */}
                  </div>
                  <div className="pj-card-body">
                    <h3>{p.title}</h3>
                    <p>{p.brief}</p>
                    <button
                      type="button"
                      className="pj-more"
                      onClick={(e) => openModal(i, e)}
                      aria-haspopup="dialog"
                      aria-label={`View more about ${p.title}`}
                    >
                      <span>View more</span>
                      <i aria-hidden="true">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                      </i>
                    </button>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {active !== null && (
        <ProjectModal index={active} onChange={setActive} onClose={closeModal} />
      )}
    </div>
  )
}