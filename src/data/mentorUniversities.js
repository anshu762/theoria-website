// Logo sources are tried in this order:
//   1) /public/logos/<slug>.svg   (your own self-hosted file, if you add one)
//   2) Wikimedia Commons candidates listed in `files` (first one that loads wins)
//   3) the gradient initials badge (`mono`)
const commons = (file, width = 128) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${file}?width=${width}`

const RAW = [
  {
    name: 'University of California', mono: 'UC', slug: 'university-of-california',
    files: ['Seal_of_the_University_of_California.svg', 'University_of_California_seal.svg', 'Seal_of_the_University_of_California,_Berkeley.svg'],
  },
  {
    name: 'University of Cambridge', mono: 'CU', slug: 'university-of-cambridge',
    files: ['Coat_of_Arms_of_the_University_of_Cambridge.svg', 'University_of_Cambridge_coat_of_arms.svg', 'University_of_Cambridge_logo.svg'],
  },
  {
    name: 'California Institute of Technology', mono: 'CT', slug: 'caltech',
    files: ['Caltech_Logo.svg', 'Seal_of_the_California_Institute_of_Technology.svg'],
  },
  {
    name: 'University of Oxford', mono: 'OX', slug: 'university-of-oxford',
    files: ['Oxford-University-Circlet.svg', 'Oxford_University_Coat_Of_Arms.svg'],
  },
  {
    name: 'Cornell University', mono: 'CO', slug: 'cornell-university',
    files: ['Cornell_University_seal.svg', 'Cornell_University_Seal.svg'],
  },
  {
    name: 'Yale University', mono: 'YU', slug: 'yale-university',
    files: ['Yale_University_Shield_1.svg', 'Yale_Coat_of_Arms.svg'],
  },
  {
    name: 'Princeton University', mono: 'PU', slug: 'princeton-university',
    files: ['Princeton_shield.svg', 'Princeton_seal.svg'],
  },
  {
    name: 'Stanford University', mono: 'SU', slug: 'stanford-university',
    files: ['Stanford_University_seal_2003.svg', 'Stanford_Cardinal_logo.svg'],
  },
  {
    name: 'Massachusetts Institute of Technology', mono: 'MIT', slug: 'mit',
    files: ['MIT_logo.svg', 'Seal_of_the_Massachusetts_Institute_of_Technology.svg'],
  },
  {
    name: 'Harvard University', mono: 'HU', slug: 'harvard-university',
    files: ['Harvard_shield_wreath.svg', 'Harvard_University_shield.svg'],
  },
]

export const MENTOR_UNIVERSITIES = RAW.map((u) => ({
  ...u,
  sources: [`/logos/${u.slug}.svg`, ...u.files.map((f) => commons(f))],
}))