import { mkdir, writeFile, access } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { RAW_UNIVERSITIES } from '../src/data/mentorUniversities.js'

// Wikimedia asks scripts to identify themselves. Put your real email below.
const UA = 'TheoriaLogoFetcher/1.0 (contact: YOUR-EMAIL-HERE)'

const OUT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../public/logos')
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const exists = (p) => access(p).then(() => true, () => false)

async function get(url, tries = 4) {
  for (let i = 0; i < tries; i++) {
    const res = await fetch(url, { headers: { 'User-Agent': UA }, redirect: 'follow' })
    if (res.status === 429 || res.status >= 500) {
      await sleep(4000 * (i + 1))
      continue
    }
    return res
  }
  return null
}

async function suggest(name) {
  const url =
    'https://commons.wikimedia.org/w/api.php?action=query&list=search&srnamespace=6&srlimit=6&format=json&srsearch=' +
    encodeURIComponent(`${name} logo`)
  const res = await get(url)
  if (!res || !res.ok) return []
  const data = await res.json()
  return (data?.query?.search || []).map((s) => s.title.replace(/^File:/, '').replace(/ /g, '_'))
}

await mkdir(OUT, { recursive: true })
const missing = []

for (const u of RAW_UNIVERSITIES) {
  const svg = path.join(OUT, `${u.slug}.svg`)
  const png = path.join(OUT, `${u.slug}.png`)

  if ((await exists(svg)) || (await exists(png))) {
    console.log(`have     ${u.slug}`)
    continue
  }

  let saved = false
  for (const f of u.files) {
    const url = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(f)}?width=400`
    const res = await get(url)
    await sleep(1200)
    if (!res || !res.ok) continue

    const type = res.headers.get('content-type') || ''
    const ext = type.includes('svg') ? 'svg' : type.includes('png') ? 'png' : null
    if (!ext) continue

    await writeFile(path.join(OUT, `${u.slug}.${ext}`), Buffer.from(await res.arrayBuffer()))
    console.log(`saved    ${u.slug}.${ext}   <- ${f}`)
    saved = true
    break
  }

  if (!saved) {
    console.log(`MISSING  ${u.slug}`)
    missing.push(u)
  }
}

if (missing.length) {
  console.log('\n──────── still missing ────────')
  for (const u of missing) {
    console.log(`\n${u.name}   (slug: ${u.slug})`)
    const s = await suggest(u.name)
    await sleep(1200)
    if (s.length) s.forEach((x) => console.log(`   suggestion: ${x}`))
    else console.log('   no suggestions found')
  }
  console.log('\nFor each one: either add the correct file name to `files` in mentorUniversities.js and run again,')
  console.log('or save the logo yourself as public/logos/<slug>.png (256px+) or <slug>.svg.')
} else {
  console.log('\nAll logos downloaded.')
}