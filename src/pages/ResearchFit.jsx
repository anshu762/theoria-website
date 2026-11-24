import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ENDPOINT ='https://script.google.com/macros/s/AKfycby1j7MWKkpMUEQTj8cateCQJO7YDBnyLdQvY_sQnHf1h1gmQccbSAThrks308k9mBhA/exec'

const TABS = [
  { id: 'rf-student', label: 'Student Details' },
  { id: 'rf-academic', label: 'Academic Direction' },
  { id: 'rf-questions', label: 'Written Questions' },
  { id: 'rf-submit', label: 'Submit' },
]

const STUDENT_FIELDS = [
  { label: 'Students full name', name: 'student_full_name', type: 'text', auto: 'name' },
  { label: 'Current grade / graduation year', name: 'grade_year', type: 'text' },
  { label: 'Students email', name: 'student_email', type: 'email', auto: 'email' },
  { label: 'Students phone', name: 'student_phone', type: 'tel', auto: 'tel' },
  { label: 'Parent/guardian full name', name: 'parent_full_name', type: 'text' },
  { label: 'Parent/guardian email', name: 'parent_email', type: 'email' },
  { label: 'Parent/guardian phone', name: 'parent_phone', type: 'tel' },
  { label: 'City / State / Country', name: 'location', type: 'text' },
]

/* v = value that is sent, l = label that is shown, other = name of the "please specify" box */
const PRIMARY_FIELD = [
  'Biology / Pre-Med / Health Science',
  'Neuroscience / Psychology',
  'Engineering / Aerospace',
  'Computer Science / AI / Data Science',
  'Economics / Business / Finance',
  'Law / Policy / International Relations',
  'Chemistry / Pharmaceutical Science',
  { v: 'Other', l: 'Other:', other: 'primary_field_other' },
]
const TARGET_RANGE = [
  'Ivy League / Top 10',
  'Top 20 US universities',
  'Top 50 US universities',
  { v: 'Specific schools', l: 'Specific schools:', other: 'target_range_other' },
]
const HELP_WITH = [
  'Build serious academic depth',
  'Develop a publishable research project',
  'Work with a credible researcher/mentor',
  'Strengthen college applications',
  'Clarify field or major direction',
  'Create a stronger essay/application narrative',
  'Prepare for competitions or applied projects',
  'Improve research, writing, and analysis skills',
]

const QUESTIONS = [
  {
    name: 'q1',
    title: '1. Why are you drawn to your field of interest?',
    text: 'Tell us what first sparked your interest and why it matters to you personally. This could be a personal experience, a class, a book, a problem you noticed, a family influence, a future career goal, or a question you have not been able to stop thinking about.',
    help: 'Suggested length: 150–250 words',
    range: [150, 250],
  },
  {
    name: 'q2',
    title: '2. What academic question, problem, or topic do you genuinely wish you understood more deeply?',
    text: 'Describe a question or problem within your field that you would be excited to explore through research. This does not need to be a polished research proposal. We are looking for curiosity, seriousness of thought, and whether your interests could develop into a strong mentor-guided project.',
    help: 'Suggested length: 150–250 words',
    range: [150, 250],
  },
  {
    name: 'q3',
    title: '3. What do you feel is currently missing from your college application profile?',
    text: 'Tell us what your profile still needs in order to become more competitive for your target universities. This could be stronger academic depth, real research experience, a more distinctive project, a clearer personal story, credible mentorship, stronger essays, or a publication-quality academic output.',
    help: 'Suggested length: 100–200 words',
    range: [100, 200],
  },
]

/* NOTE: the shown label (l) and the sent value (v) differ in the original form; both kept as written */
const START = [
  { v: 'Immediately / within 2 weeks', l: 'Immediately / within 1 week' },
  { v: 'Within 1 month', l: 'Within 2 weeks' },
  { v: 'In the next 2-3 months', l: 'In the next 1–2 months' },
  'Not sure yet',
]
const PARENT_CALL = ['Yes', 'Likely, but I need to confirm', 'No', 'I am not sure']
const CALL_TIME = ['Weekday morning', 'Weekday afternoon', 'Weekday evening', 'Weekend']

const words = (s) => (s.trim() ? s.trim().split(/\s+/).length : 0)
const reduced = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

/* ---------- small inline icons ---------- */
const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9.5" />
    <path d="M7.8 12.4l3 3 5.4-6" />
  </svg>
)
const AlertIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9.5" />
    <path d="M12 7.5v5.5M12 16.4v.1" />
  </svg>
)

const Req = () => <span className="rf-req" aria-hidden="true">*</span>

/* ---------- reusable pieces ---------- */
function Field({ label, name, type = 'text', auto, placeholder }) {
  const id = 'rf-in-' + name
  return (
    <div className="rf-field">
      <label className="rf-label" htmlFor={id}>{label} <Req /></label>
      <input id={id} type={type} name={name} required autoComplete={auto} placeholder={placeholder} />
    </div>
  )
}

function Group({ id, label, children, aside }) {
  return (
    <div className="rf-field" role="group" aria-labelledby={id}>
      <div className="rf-label rf-label-row">
        <span id={id}>{label} <Req /></span>
        {aside}
      </div>
      {children}
    </div>
  )
}

function Chips({ name, type = 'radio', options, soft, stack, required, onChange }) {
  return (
    <div className={'rf-chips' + (stack ? ' is-stack' : '')}>
      {options.map((o, i) => {
        const opt = typeof o === 'string' ? { v: o, l: o } : o
        return (
          <label className={'rf-chip' + (soft ? ' is-soft' : '')} key={opt.v}>
            <input type={type} name={name} value={opt.v} required={required && i === 0} onChange={onChange} />
            <span className="rf-chip-t">{opt.l}</span>
            {opt.other && (
              <input
                type="text"
                className="rf-other"
                name={opt.other}
                placeholder="Please specify"
                aria-label={opt.l.replace(':', '') + ' - please specify'}
                onFocus={(e) => {
                  const r = e.currentTarget.closest('label')?.querySelector('input[type="radio"]')
                  if (r) r.checked = true
                }}
              />
            )}
          </label>
        )
      })}
    </div>
  )
}

function SectionHead({ title, note }) {
  return (
    <div className="rf-sh">
      <h2>{title}</h2>
      <span>{note}</span>
    </div>
  )
}

/* ---------------------------------------------------------------
   Page
--------------------------------------------------------------- */
export default function ResearchFit() {
  const navigate = useNavigate()
  const formRef = useRef(null)
  const wrapRef = useRef(null)
  const helpRef = useRef(null)
  const statusRef = useRef(null)

  const [active, setActive] = useState(TABS[0].id)
  const [counts, setCounts] = useState({ q1: 0, q2: 0, q3: 0 })
  const [helpCount, setHelpCount] = useState(0)
  const [helpErr, setHelpErr] = useState(false)
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState({ type: '', text: '' })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  /* sections fade in as they scroll into view (own observer; skipped for reduced motion) */
  useLayoutEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return undefined
    if (reduced() || !('IntersectionObserver' in window)) return undefined
    wrap.dataset.armed = '1'
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px -6% 0px' }
    )
    wrap.querySelectorAll('.rf-reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  /* highlight the tab of the section being read */
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-30% 0px -60% 0px' }
    )
    TABS.forEach((t) => {
      const el = document.getElementById(t.id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  const goTo = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'start' })
    setActive(id)
  }

  /* "Select up to 3" */
  const onHelp = (e) => {
    const n = formRef.current.querySelectorAll('input[name="help_with"]:checked').length
    if (n > 3) {
      e.target.checked = false
      return
    }
    setHelpCount(n)
    if (n > 0) setHelpErr(false)
  }

  const onWords = (e) => {
    const { name, value } = e.target
    setCounts((c) => ({ ...c, [name]: words(value) }))
  }

    const onSubmit = async (e) => {
    e.preventDefault()
    if (sending) return
    const form = formRef.current
    const formData = new FormData(form)

    if (!formData.getAll('help_with').length) {
      setHelpErr(true)
      helpRef.current?.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'center' })
      return
    }

    setSending(true)
    setStatus({ type: 'busy', text: 'Sending...' })

    const dataPayload = Object.fromEntries(formData.entries())
    dataPayload.help_with = formData.getAll('help_with')
    const appsScriptPayload = { ...dataPayload, formType: 'research-fit' }


    /* read the name BEFORE anything can reset the form */
    const name = String(formData.get('student_full_name') || '').trim()

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
        body: JSON.stringify(appsScriptPayload),
      })
      const raw = await res.text()
      let reply = null
      try {
        reply = JSON.parse(raw)
      } catch (parseErr) {
        reply = null
      }
      if (!res.ok || !reply || reply.result !== 'success') {
        throw new Error((reply && reply.message) || 'Unexpected response from the server')
      }
    } catch (err) {
      console.error('Error sending to Google Apps Script:', err)
      setStatus({ type: 'err', text: 'Submission failed. Please try again.' })
      setSending(false)
      requestAnimationFrame(() =>
        statusRef.current?.scrollIntoView({ block: 'nearest', behavior: reduced() ? 'auto' : 'smooth' })
      )
      return
    }

    /* success: go to the thank-you page (button stays disabled until the page changes) */
    navigate('/thank-you', { state: { name } })
  }

  return (
    <div className="rf-page">
      <div className="rf-wrap" ref={wrapRef}>
        {/* ---------- hero ---------- */}
        <div className="rf-hero rf-reveal">
          <svg className="rf-mark" viewBox="0 0 120 100" aria-hidden="true"><use href="#ic" /></svg>
          <div className="rf-hero-in">
            <div>
              <h1>Research Fit Application</h1>
              <p className="rf-sub">
                For students seeking serious mentor-guided research, intellectual depth, and a stronger academic profile.
              </p>
            </div>
            <div className="rf-panel">
              <h2>Purpose</h2>
              <p>
                This application helps our team understand your field fit, research motivation, academic profile gaps, and
                whether Theoria can support a meaningful research direction.
              </p>
            </div>
          </div>
        </div>

        {/* ---------- tabs ---------- */}
        <nav className="rf-tabs rf-reveal" aria-label="Application sections">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              className={'rf-tab' + (active === t.id ? ' is-on' : '')}
              aria-current={active === t.id ? 'true' : undefined}
              onClick={() => goTo(t.id)}
            >
              {t.label}
            </button>
          ))}
        </nav>

        <form ref={formRef} onSubmit={onSubmit} noValidate={false}>
          {/* ---------- Section 1 ---------- */}
          <div id="rf-student" className="rf-sec rf-reveal" role="group" aria-label="Student and family details">
            <SectionHead
              title="Section 1 · Student & Family Details"
              note="Please complete these basics so our team can review fit and coordinate the Research Fit Call."
            />
            <div className="rf-sb">
              <div className="rf-bar" />
              <div className="rf-grid2">
                {STUDENT_FIELDS.map((f) => (
                  <Field key={f.name} {...f} />
                ))}
              </div>
            </div>
          </div>

          {/* ---------- Section 2 ---------- */}
          <div id="rf-academic" className="rf-sec rf-reveal" role="group" aria-label="Academic direction">
            <SectionHead title="Section 2 · Academic Direction" note="Tell us where your interests and goals align" />
            <div className="rf-sb">
              <div className="rf-bar" />
              <div className="rf-stack">
                <Group id="rf-g-field" label="Primary field of interest">
                  <Chips name="primary_field" options={PRIMARY_FIELD} required />
                </Group>
                <Group id="rf-g-target" label="Target university range">
                  <Chips name="target_range" options={TARGET_RANGE} required />
                </Group>
                <div ref={helpRef} className={'rf-helpwrap' + (helpErr ? ' has-err' : '')}>
                  <Group
                    id="rf-g-help"
                    label="What are you hoping Theoria helps with? Select up to 3."
                    aside={<span className={'rf-count' + (helpCount === 3 ? ' is-full' : '')}>{helpCount} / 3 selected</span>}
                  >
                    <Chips name="help_with" type="checkbox" options={HELP_WITH} soft onChange={onHelp} />
                    {helpErr && (
                      <p className="rf-err" role="alert">Please select at least one option (up to 3).</p>
                    )}
                  </Group>
                </div>
              </div>
            </div>
          </div>

          {/* ---------- Section 3 ---------- */}
          <div id="rf-questions" className="rf-sec rf-reveal" role="group" aria-label="Written application questions">
            <SectionHead title="Section 3 · Written Application Questions" note="These questions matter most" />
            <div className="rf-sb">
              <div className="rf-bar" />
              <div className="rf-grid3">
                {QUESTIONS.map((q) => {
                  const n = counts[q.name]
                  const ok = n >= q.range[0] && n <= q.range[1]
                  return (
                    <div className="rf-qc" key={q.name}>
                      <div>
                        <h3>{q.title}</h3>
                        <p>{q.text}</p>
                      </div>
                      <div>
                        <div className="rf-qmeta">
                          <span>{q.help}</span>
                          <span className={'rf-wc' + (ok ? ' is-ok' : '')} aria-live="off">{n} {n === 1 ? 'word' : 'words'}</span>
                        </div>
                        <textarea
                          name={q.name}
                          required
                          placeholder="Type your answer here..."
                          aria-label={q.title}
                          onInput={onWords}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* ---------- Section 4 ---------- */}
          <div className="rf-sec rf-reveal" role="group" aria-label="Readiness and parent involvement">
            <SectionHead title="Section 4 · Readiness & Parent Involvement" note="Tell us about timing and availability" />
            <div className="rf-sb">
              <div className="rf-bar" />
              <div className="rf-grid3">
                <Group id="rf-g-start" label="How soon would you want to begin if selected?">
                  <Chips name="start_time" options={START} stack required />
                </Group>
                <Group id="rf-g-parent" label="Can at least one parent/guardian attend the Research Fit Call?">
                  <Chips name="parent_call" options={PARENT_CALL} stack required />
                </Group>
                <Group id="rf-g-call" label="Preferred call availability">
                  <Chips name="call_time" options={CALL_TIME} stack required />
                </Group>
              </div>
            </div>
          </div>

          {/* ---------- Section 5 ---------- */}
          <div className="rf-sec rf-reveal" role="group" aria-label="Applicant statement">
            <SectionHead title="Section 5 · Applicant Statement" note="Agreement and signature" />
            <div className="rf-sb">
              <div className="rf-bar" />
              <p className="rf-statement">
                I understand that Theoria is application-based and that mentor availability depends on field fit, timeline,
                and academic readiness. I also understand that if I am selected for a Research Fit Call, at least one
                parent/guardian should attend so the team can properly walk through fit, expectations, timeline, and next
                steps.
              </p>
              <div className="rf-grid2">
                <Field label="Student signature" name="signature" />
                <Field label="Date" name="date" placeholder="YYYY-MM-DD" />
              </div>
            </div>
          </div>

          {/* ---------- Submit ---------- */}
          <div id="rf-submit" className="rf-submit rf-reveal">
            <div className="rf-submit-t">
              <strong>Research Fit</strong>
              <span>Secure your review with one click.</span>
            </div>
            <button className="rf-btn" type="submit" disabled={sending}>
              {sending ? <><i className="rf-spin" aria-hidden="true" />Sending...</> : <>Send application <Arrow /></>}
            </button>
            <div ref={statusRef} className={'rf-status' + (status.type ? ' is-' + status.type : '')} role="status" aria-live="polite">
              {status.type === 'ok' && <CheckIcon />}
              {status.type === 'err' && <AlertIcon />}
              {status.text && <span>{status.text}</span>}
            </div>
          </div>
        </form>

        <p className="rf-cap rf-reveal">Theoria – UniVisory Research Academy | Research Fit Application</p>
      </div>
    </div>
  )
}