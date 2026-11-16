/* ---------------------------------------------------------------
   Hero carousel content: the ONLY file you edit to change slides.
   Order here = order on screen (student, mentor, student, mentor…)

   student → photo, university, cls
   mentor  → photo, phd (field only)

   Photos: placeholders below need internet. For production, put real,
   consented photos in /public/hero/ and use e.g. '/hero/student-1.jpg'
   (or import them from src/assets).
---------------------------------------------------------------- */

export const HERO_AUTOPLAY_MS = 6000

export const HERO_SLIDES = [
  { type: 'student', photo: '/pranet-k.png', university: 'Duke University',                   cls: 'Class of 2029' },
  { type: 'student', photo: 'ronak-m.png', university: 'Vanderbilt University', cls: 'Class of 2028' },
]