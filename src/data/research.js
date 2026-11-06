import { img } from '../config.js';

const M = img('mentors/');
const webp = (name, base) => ({ name, src: `${M}${base}.webp` });
const file = (name, f) => ({ name, src: `${M}${f}` });

export const mentorLogos = [
  webp('IIT Guwahati', 'IITG_logo'),
  webp('IIT Kanpur', 'iit-kplogo'),
  webp('IIT Delhi', 'IIT_Delhi_logo'),
  webp('IIT Kharagpur', 'iit-kharaglogo'),
  webp('NIT Durgapur', 'NIT_Durgapur_Logo'),
  webp('IIM Calcutta', 'iim-calcutta-logo'),
  webp('IIT Bombay', 'IIT_Bombay_logo'),
  webp('IIT Madras', 'iit-chennai'),
  webp('IIT BHU Varanasi', 'iit-bhu-logo'),
  file('IIT Roorkee', 'iit-roorkee-logo.svg'),
  webp('NIT Wrangal', 'nit-wrangal-logo'),
  file('IIM Ahmedabad', 'IIM_Ahmedabad_Logo.webp'),
  file('IIM Bangalore', 'IIM_Bangalore_Logo.webp'),
  file('IIM Indore', 'IIM_Indore_Logo.webp'),
  file('IIM Mumbai', 'Indian_Institute_of_Management_Mumbai_Logo.svg'),
];

export const whyResearch = [
  ['Elevate Your Field:', 'Research in high school propels you beyond the classroom, allowing you to contribute original insights and advancements to your chosen field.'],
  ['Ignite Your Passion:', 'High school research cultivates your passion by providing a platform to explore topics of personal interest in-depth, fostering a lifelong love for learning and discovery.'],
  ['Distinguish Your Application:', 'Engaging in research during high school sets your college application apart, showcasing your initiative, intellectual curiosity, and commitment to academic excellence.'],
  ['Gain Insights from Experts:', 'Through high school research, you have the opportunity to collaborate with subject experts, gaining invaluable mentorship and deepening your understanding of complex topics.'],
];

export const programColumns = ['Category', 'Research Fellowship', 'Research Mentorship', 'Research Scholar'];

export const programRows = [
  ['Mentor Profile', 'Professor with ongoing research', 'IIM/IIT PhD Scholar', 'PhD Scholar'],
  ['Duration (including publication)', 'Approx. 6 months', '2-5 months', '1-2 months'],
  ['Mode of Research', 'Remote/On-site', 'Remote', 'Remote'],
  ['Sessions with Mentor', 'Depends on project', 'Weekly', 'On demand'],
  ["Sessions with UniVisory's Counsellor", 'Based on Requirement', 'Monthly', 'Once at Onboarding'],
  ['Internship Status', 'Yes', 'NA', 'NA'],
  ['LORs', 'Personalised', 'Personalised', 'NA'],
  ['Publication Output', 'IF 3+ Journal', 'IF 3+ Journal', 'IF 1+ Journal'],
  ['Conference Presentation', 'Depends on Research Project', 'Included', 'NA'],
];