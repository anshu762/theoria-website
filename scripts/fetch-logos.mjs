// Downloads university logos from Wikimedia Commons into public/logos/<slug>.svg|png
// Run:  node scripts/fetch-logos.mjs
import { mkdir, writeFile, access } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { RAW_UNIVERSITIES } from '../src/data/mentorUniversities.js'


const UA = 'TheoriaLogoFetcher/1.0 (contact: YOUR-EMAIL-HERE)'   // <- put your real email
const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public', 'logos')
const DELAY = 1500


const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const exists = async (p) => { try { await access(p); return true } catch { return false } }


async function get(url, tries = 4) {
  for (let i = 0; i < tries; i++) {
    let res
    try {
      res = await fetch(url, { headers: { 'User-Agent': UA }, redirect: 'follow' })
    } catch {
      await sleep(2000 * (i + 1))
      continue
    }
    if (res.status === 429 || res.status >= 500) {
      const wait = Number(res.headers.get('retry-after')) * 1000 || 4000 * (i + 1)
      await sleep(wait)
      continue
    }
    return res
  }
  return null
}


async function tryFile(file) {
  const base = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}`
  let res = await get(base)
  await sleep(DELAY)
  if (!res || !res.ok) return null
  let type = (res.headers.get('content-type') || '').toLowerCase()
  if (type.includes('svg')) return { ext: 'svg', buf: Buffer.from(await res.arrayBuffer()) }
  if (type.includes('png')) return { ext: 'png', buf: Buffer.from(await res.arrayBuffer()) }


  // other raster types: ask Wikimedia for a 400px PNG rendering
  res = await get(base + '?width=400')
  await sleep(DELAY)
  if (!res || !res.ok) return null
  type = (res.headers.get('content-type') || '').toLowerCase()
  if (type.includes('png')) return { ext: 'png', buf: Buffer.from(await res.arrayBuffer()) }
  return null
}


async function suggest(term) {
  const url =
    'https://commons.wikimedia.org/w/api.php?action=query&list=search&srnamespace=6&srlimit=6&format=json&srsearch=' +
    encodeURIComponent(term)
  const res = await get(url)
  await sleep(DELAY)
  if (!res || !res.ok) return []
  const j = await res.json()
  return (j?.query?.search || []).map((s) => s.title.replace(/^File:/, '').replace(/ /g, '_'))
}


await mkdir(OUT, { recursive: true })
const ok = []
const missing = []


for (const u of RAW_UNIVERSITIES) {
  if (u.local) { console.log(`own file   ${u.slug}  (${u.local})`); continue }
  if ((await exists(path.join(OUT, u.slug + '.svg'))) || (await exists(path.join(OUT, u.slug + '.png')))) {
    console.log(`have       ${u.slug}`)
    continue
  }
  let saved = null
  for (const f of u.files) {
    saved = await tryFile(f)
    if (saved) { console.log(`DOWNLOADED ${u.slug}.${saved.ext}  <- ${f}`); break }
  }
  if (saved) {
    await writeFile(path.join(OUT, `${u.slug}.${saved.ext}`), saved.buf)
    ok.push(u.slug)
  } else {
    console.log(`MISSING    ${u.slug}`)
    missing.push(u)
  }
}


console.log(`\nDownloaded: ${ok.length}   Missing: ${missing.length}\n`)


for (const u of missing) {
  console.log(`--- ${u.slug}: suggestions ---`)
  const list = await suggest(`${u.full || u.name} logo`)
  list.forEach((f) => console.log('   ' + f))
}
console.log('\nDone. Refresh the site with Ctrl+Shift+R.')