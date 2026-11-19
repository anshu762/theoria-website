// Logo sources are tried in this order:
//   1) /public/logos/<slug>.svg   (your own self-hosted file, if you add one)
//   2) /public/logos/<slug>.png   (same, if you only have a PNG)
//   3) Wikimedia Commons candidates listed in `files` (first one that loads wins)
//   4) the university's own website icon (`site`), only for entries that have it
//   5) the gradient initials badge (`mono`)
const commons = (file, width = 128) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${file}?width=${width}`

const favicon = (site) =>
  `https://www.google.com/s2/favicons?domain=${site}&sz=128`

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
    name: 'Caltech', mono: 'CT', slug: 'caltech',
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
    name: 'MIT', mono: 'MIT', slug: 'mit',
    files: ['MIT_logo.svg', 'Seal_of_the_Massachusetts_Institute_of_Technology.svg'],
  },
  {
    name: 'Harvard University', mono: 'HU', slug: 'harvard-university',
    files: ['Harvard_shield_wreath.svg', 'Harvard_University_shield.svg'],
  },

  // ───────── newly added ─────────
  {
    name: 'CMU', mono: 'CM', slug: 'carnegie-mellon-university', site: 'cmu.edu',
    files: ['Carnegie_Mellon_University_seal.svg', 'Carnegie_Mellon_wordmark.svg', 'Carnegie_Mellon_University_(logo).svg'],
  },
  {
    name: 'University of Michigan', mono: 'UM', slug: 'university-of-michigan', site: 'umich.edu',
    files: ['Seal_of_the_University_of_Michigan.svg', 'University_of_Michigan_logo.svg'],
  },
  {
    name: 'University of Toronto', mono: 'UT', slug: 'university-of-toronto', site: 'utoronto.ca',
    files: ['University_of_Toronto_coat_of_arms.svg', 'Utoronto_coa.svg', 'University_of_Toronto_logo.svg'],
  },
  {
    name: 'UBC', mono: 'UBC', slug: 'university-of-british-columbia', site: 'ubc.ca',
    files: ['UBC_Coat_of_Arms.svg', 'University_of_British_Columbia_coat_of_arms.svg', 'UBC_logo.svg'],
  },
  {
    name: 'University of Wisconsin', mono: 'UW', slug: 'university-of-wisconsin', site: 'wisc.edu',
    files: ['Seal_of_the_University_of_Wisconsin-Madison.svg', 'University_of_Wisconsin-Madison_seal.svg', 'Wisconsin_Badgers_logo.svg'],
  },
  {
    name: 'LSE', mono: 'LSE', slug: 'lse', site: 'lse.ac.uk',
    files: ['LSE_Logo.svg', 'London_School_of_Economics_Logo.svg'],
  },
  {
    name: 'UCL', mono: 'UCL', slug: 'ucl', site: 'ucl.ac.uk',
    files: ['UCL_logo.svg', 'University_College_London_logo.svg', 'UCL_Coat_of_Arms.svg'],
  },
  {
    name: 'Trinity College Dublin', mono: 'TCD', slug: 'tcd', site: 'tcd.ie',
    files: ['Trinity_College_Dublin_Coat_of_Arms.svg', 'Trinity_College_Dublin_coat_of_arms.svg', 'Trinity_College_Dublin_Logo.svg'],
  },
  {
    name: 'Bocconi University', mono: 'BU', slug: 'bocconi-university', site: 'unibocconi.eu',
    files: ['Bocconi_University_logo.svg', 'Logo_Bocconi.svg', 'Bocconi_University_Logo.svg'],
  },
  {
    name: 'ESSEC Business School', mono: 'ES', slug: 'essec', site: 'essec.edu',
    files: ['Logo_ESSEC.svg', 'ESSEC_Logo.svg', 'ESSEC_Business_School_logo.svg'],
  },
  {
    name: 'TU Delft', mono: 'TUD', slug: 'tu-delft', site: 'tudelft.nl',
    files: ['TU_Delft_logo.svg', 'TU_Delft_Logo.svg', 'Logo_TU_Delft.svg'],
  },
  {
    name: 'NUS', mono: 'NUS', slug: 'nus', site: 'nus.edu.sg',
    files: ['NUS_coat_of_arms.svg', 'National_University_of_Singapore.svg', 'NUS_logo.svg'],
  },
  {
    name: 'NTU', mono: 'NTU', slug: 'ntu', site: 'ntu.edu.sg',
    files: ['NTU_Singapore_Logo.svg', 'Nanyang_Technological_University_coat_of_arms.svg', 'NTU_logo.svg'],
  },
  {
    name: 'SMU', mono: 'SMU', slug: 'smu', site: 'smu.edu.sg',
    files: ['Singapore_Management_University_logo.svg', 'SMU_Logo.svg', 'Singapore_Management_University_Logo.svg'],
  },
  {
    name: 'HKU', mono: 'HKU', slug: 'hku', site: 'hku.hk',
    files: ['HKU_Logo.svg', 'University_of_Hong_Kong_Logo.svg', 'HKU_coat_of_arms.svg'],
  },
  {
    name: 'HKUST', mono: 'UST', slug: 'hkust', site: 'ust.hk',
    files: ['HKUST_Logo.svg', 'HKUST_logo.svg', 'Hong_Kong_University_of_Science_and_Technology_logo.svg'],
  },
]

export const MENTOR_UNIVERSITIES = RAW.map((u) => ({
  ...u,
  sources: [
    `/logos/${u.slug}.svg`,
    `/logos/${u.slug}.png`,
    ...u.files.map((f) => commons(f)),
    ...(u.site ? [favicon(u.site)] : []),
  ],
}))