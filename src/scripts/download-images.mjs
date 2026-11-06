import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const BASE = 'https://cdn.univisory.org/images';
const OUT = 'public/images';

const files = [
  'research/research-icon.webp',
  'research/rp-1.webp', 'research/rp-2.webp', 'research/rp-3.webp',

  'mentors/IITG_logo.webp', 'mentors/iit-kplogo.webp', 'mentors/IIT_Delhi_logo.webp',
  'mentors/iit-kharaglogo.webp', 'mentors/NIT_Durgapur_Logo.webp', 'mentors/iim-calcutta-logo.webp',
  'mentors/IIT_Bombay_logo.webp', 'mentors/iit-chennai.webp', 'mentors/iit-bhu-logo.webp',
  'mentors/iit-roorkee-logo.svg', 'mentors/nit-wrangal-logo.webp', 'mentors/IIM_Ahmedabad_Logo.webp',
  'mentors/IIM_Bangalore_Logo.webp', 'mentors/IIM_Indore_Logo.webp',
  'mentors/Indian_Institute_of_Management_Mumbai_Logo.svg',

  ...[1, 2, 3, 4, 5, 6, 7, 8].map((n) => `elite/${n}.webp`),
  'elite/Northwestern.png', 'elite/BrownUniversity.png', 'elite/NUS.png', 'elite/MIT.png',
  'elite/GeorgiaInstituite.png', 'elite/CarnegieUniverisity.png', 'elite/YaleUniversity.png',
  'elite/bold_cornell_logo.svg',
];

let ok = 0;
const failed = [];

for (const f of files) {
  try {
    const res = await fetch(`${BASE}/${f}`, {
      headers: { Referer: 'https://www.univisory.org/', 'User-Agent': 'Mozilla/5.0' },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const dest = path.join(OUT, f);
    await mkdir(path.dirname(dest), { recursive: true });
    await writeFile(dest, Buffer.from(await res.arrayBuffer()));
    ok++;
    console.log('✔', f);
  } catch (e) {
    failed.push(`${f} (${e.message})`);
    console.log('✖', f, e.message);
  }
}

console.log(`\nDone: ${ok}/${files.length} downloaded.`);
if (failed.length) console.log('Failed:\n' + failed.join('\n'));