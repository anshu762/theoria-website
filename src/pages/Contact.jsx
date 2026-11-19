import { Fragment, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CONTACT_INFO } from '../data/contactInfo'

/* Same Google Apps Script endpoint and field names as the UniVisory form */
const ENDPOINT =
  'https://script.google.com/macros/s/AKfycbxtfXQsgcGp9gDCwJnR_GyW2Rjm99VLUy6Sqqt1MVLt7Y2VRXZ39K50OG2gr3lZ61-e/exec'

const BOARD_OPTS = [
  { value: 'cambridge', label: 'Cambridge / IB' },
  { value: 'icse', label: 'ICSE' },
  { value: 'cbse', label: 'CBSE' },
  { value: 'other', label: 'Other' },
]

const CLASS_OPTS = [
  { value: 'middle school', label: 'Middle School' },
  { value: '9th', label: '9th' },
  { value: '10th', label: '10th' },
  { value: '11th', label: '11th' },
  { value: '12th', label: '12th' },
]

const STEP1 = [
  { name: 'parent_name', label: "Parent's Name", type: 'text', ph: "Enter Parent's Name", req: true, half: true, ac: 'name' },
  { name: 'parent_phone', label: "Parent's Phone Number", type: 'tel', ph: "Enter Parent's Phone Number", req: true, half: true, ac: 'tel' },
  { name: 'email', label: "Parent's Email", type: 'email', ph: "Enter Parent's Email", req: true, half: true, ac: 'email' },
  { name: 'current_city', label: 'Current City', type: 'text', ph: 'Enter Current City', req: true, half: true, ac: 'address-level2' },
  { name: 'about_us', label: 'Where did you hear about us?', type: 'text', ph: 'Tell us where you heard about us', req: true },
]

const STEP2 = [
  { name: 'student_name', label: "Student's Name", type: 'text', ph: "Enter Student's Name", req: true, half: true },
  { name: 'student_phone', label: "Student's Phone Number", type: 'tel', ph: "Enter Student's Phone Number", req: false, half: true },
  { name: 'school_name', label: 'School Name', type: 'text', ph: "Enter School's Name", req: true },
  { name: 'board', label: 'Board', type: 'select', ph: 'Select Board', options: BOARD_OPTS, req: true, half: true },
  { name: 'class', label: 'Class', type: 'select', ph: 'Select Class', options: CLASS_OPTS, req: true, half: true },
  { name: 'dream_university', label: 'Dream University', type: 'text', ph: 'Enter Dream University', req: false },
]

const OTHER = { name: 'other_board', label: 'Specify other board', type: 'text', ph: 'Specify other board', req: false }

const EMPTY = {
  parent_name: '', parent_phone: '', email: '', current_city: '', about_us: '',
  student_name: '', student_phone: '', school_name: '', board: '', other_board: '',
  class: '', dream_university: '',
}

/* ---------- validation ---------- */
const digits = (s) => s.replace(/\D/g, '')
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_RE = /^[+\d\s\-().]+$/
const phoneOk = (s) => {
  const n = digits(s).length
  return PHONE_RE.test(s) && n >= 7 && n <= 15
}

function validate(step, v) {
  const fields = step === 1 ? STEP1 : STEP2
  const e = {}
  for (const f of fields) {
    const val = v[f.name].trim()
    if (f.req && !val) {
      e[f.name] = f.type === 'select' ? 'Please select an option.' : 'This field is required.'
      continue
    }
    if (!val) continue
    if (f.type === 'email' && !EMAIL_RE.test(val)) e[f.name] = 'Please enter a valid email address.'
    if (f.type === 'tel' && !phoneOk(val)) e[f.name] = 'Please enter a valid phone number.'
  }
  if (step === 2) {
    const sn = v.student_name.trim().toLowerCase()
    if (!e.student_name && sn && sn === v.parent_name.trim().toLowerCase()) {
      e.student_name = "Student's name and Parent's name cannot be the same."
    }
    if (!e.student_phone && v.student_phone.trim() && digits(v.student_phone) === digits(v.parent_phone)) {
      e.student_phone = "Student's phone number and Parent's phone number cannot be the same."
    }
  }
  return e
}

/* ---------- one field ---------- */
function Field({ f, value, error, onChange }) {
  const id = 'cf-' + f.name
  const errId = id + '-err'
  const common = {
    id,
    name: f.name,
    value,
    onChange,
    required: f.req,
    'aria-invalid': error ? 'true' : 'false',
    'aria-describedby': error ? errId : undefined,
  }
  return (
    <div className={'cf-field ' + (f.half ? 'cf-half' : 'cf-full')}>
      <label htmlFor={id}>
        {f.label}
        {f.req && <span className="cf-req" aria-hidden="true">{' *'}</span>}
      </label>
      {f.type === 'select' ? (
        <select {...common}>
          <option value="">{f.ph}</option>
          {f.options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      ) : (
        <input
          {...common}
          type={f.type}
          placeholder={f.ph}
          autoComplete={f.ac}
          inputMode={f.type === 'tel' ? 'tel' : undefined}
        />
      )}
      {error && <p className="cf-err" id={errId}>{error}</p>}
    </div>
  )
}

export default function Contact() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [v, setV] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [phase, setPhase] = useState('idle') // idle | sending | done
  const [status, setStatus] = useState(null) // { type: 'loading'|'success'|'error', msg }
  const boxRef = useRef(null)
  const formRef = useRef(null)
  const timer = useRef(null)
  const ctrl = useRef(null)

  useEffect(
    () => () => {
      clearTimeout(timer.current)
      if (ctrl.current) ctrl.current.abort()
    },
    []
  )

  const set = (name) => (e) => {
    const val = e.target.value
    setV((p) => {
      const n = { ...p, [name]: val }
      if (name === 'board' && val !== 'other') n.other_board = ''
      return n
    })
    setErrors((p) => (p[name] ? { ...p, [name]: undefined } : p))
  }

  const keepBoxInView = () =>
    requestAnimationFrame(() => {
      const el = boxRef.current
      if (el && el.getBoundingClientRect().top < 0) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    })

  const focusFirst = (fields, errs) => {
    const f = fields.find((x) => errs[x.name])
    if (!f) return
    requestAnimationFrame(() => {
      const el = formRef.current && formRef.current.querySelector('[name="' + f.name + '"]')
      if (el) el.focus()
    })
  }

  const goNext = () => {
    const errs = validate(1, v)
    setErrors(errs)
    if (Object.keys(errs).length) {
      setStatus({ type: 'error', msg: 'Please fill out all required Parent Details before proceeding.' })
      focusFirst(STEP1, errs)
      return
    }
    setStatus(null)
    setStep(2)
    keepBoxInView()
  }

  const goBack = () => {
    if (phase !== 'idle') return
    setStatus(null)
    setErrors({})
    setStep(1)
    keepBoxInView()
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (phase !== 'idle') return
    if (step === 1) { goNext(); return } // Enter key on step 1 = Next

    const e1 = validate(1, v)
    if (Object.keys(e1).length) {
      setErrors(e1)
      setStep(1)
      setStatus({ type: 'error', msg: 'Please fill out all required Parent Details before proceeding.' })
      focusFirst(STEP1, e1)
      return
    }
    const e2 = validate(2, v)
    setErrors(e2)
    if (Object.keys(e2).length) {
      setStatus({ type: 'error', msg: 'Please check the highlighted fields.' })
      focusFirst(STEP2, e2)
      return
    }

    clearTimeout(timer.current)
    setPhase('sending')
    setStatus({ type: 'loading', msg: 'Please wait... Submitting your application' })

    const fd = new FormData()
    Object.keys(EMPTY).forEach((k) => fd.append(k, v[k].trim())) // all 12 original field names, always

    const c = new AbortController()
    ctrl.current = c
    const t = setTimeout(() => c.abort(), 30000)

    try {
      const res = await fetch(ENDPOINT, { method: 'POST', body: fd, signal: c.signal })
      if (!res.ok) throw new Error('Network response was not ok')
      const data = await res.json()
      if (data && (data.result === 'error' || data.status === 'error' || data.success === false)) {
        throw new Error('Submission rejected')
      }
      clearTimeout(t)
      setPhase('done')
      setStatus({ type: 'success', msg: 'Success! Your application has been submitted.' })
      const name = v.parent_name.trim()
      timer.current = setTimeout(() => navigate('/thank-you', { state: { name } }), 900)
    } catch (err) {
      clearTimeout(t)
      console.error('Contact form error:', err)
      setPhase('idle')
      setStatus({ type: 'error', msg: 'Oops! There was an error submitting your form. Please try again.' })
      timer.current = setTimeout(() => setStatus(null), 5000)
    }
  }

  const fields = step === 1 ? STEP1 : STEP2
  const { phone, email } = CONTACT_INFO
  const phoneHref = phone ? 'tel:' + phone.replace(/[^+\d]/g, '') : ''
  const waHref = phone ? 'https://wa.me/' + phone.replace(/\D/g, '') : ''
  const busy = phase !== 'idle'

  return (
    <div className="page cf-page">
      <div className="cf-wrap">
        <div className="cf-head">
          <h1>
            Get in <span className="cf-accent">touch</span>
          </h1>
          <p>Tell us about you and your child, and we’ll get back to you soon.</p>
        </div>

        <div className="cf-box" ref={boxRef}>
          <div className="cf-progress" role="group" aria-label="Form progress">
            <div className="cf-steps">
              <span
                className={'cf-dot ' + (step === 1 ? 'is-active' : 'is-done')}
                aria-current={step === 1 ? 'step' : undefined}
              >
                {step === 1 ? (
                  '1'
                ) : (
                  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                    <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              <span className={'cf-line' + (step === 2 ? ' is-full' : '')}>
                <i />
              </span>
              <span
                className={'cf-dot' + (step === 2 ? ' is-active' : '')}
                aria-current={step === 2 ? 'step' : undefined}
              >
                2
              </span>
            </div>
            <p className="cf-plabel">Step {step} of 2</p>
          </div>

          <form ref={formRef} onSubmit={onSubmit} noValidate>
            <div className="cf-step" key={step}>
              <h2 className="cf-step-title">{step === 1 ? 'Parent Details' : 'Student Details'}</h2>

              <div className="cf-grid">
                {fields.map((f) => (
                  <Fragment key={f.name}>
                    <Field f={f} value={v[f.name]} error={errors[f.name]} onChange={set(f.name)} />
                    {f.name === 'class' && v.board === 'other' && (
                      <Field f={OTHER} value={v.other_board} error={errors.other_board} onChange={set('other_board')} />
                    )}
                  </Fragment>
                ))}
              </div>

              <div className="cf-live" role="status" aria-live="polite">
                {status && <div className={'cf-status ' + status.type}>{status.msg}</div>}
              </div>

              <div className="cf-actions">
                {step === 1 ? (
                  <button type="button" className="cf-btn cf-btn-primary" onClick={goNext}>
                    Next Step →
                  </button>
                ) : (
                  <>
                    <button type="button" className="cf-btn cf-btn-ghost" onClick={goBack} disabled={busy}>
                      ← Previous
                    </button>
                    <button type="submit" className="cf-btn cf-btn-primary" disabled={busy}>
                      {phase === 'sending' ? (
                        <>
                          Submitting <span className="cf-spin" aria-hidden="true" />
                        </>
                      ) : phase === 'done' ? (
                        '✓ Submitted!'
                      ) : (
                        'Submit Application'
                      )}
                    </button>
                  </>
                )}
              </div>
            </div>
          </form>
        </div>

       {(phone || email) && (
          <p className="cf-reach">
            Prefer to talk?{' '}
            {email && <a href={'mailto:' + email}>{email}</a>}
            {email && phone && ' · '}
            {phone && <a href={phoneHref}>{phone}</a>}
            {phone && ' · '}
            {phone && (
              <a href={waHref} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            )}
          </p>
        )}
      </div>
    </div>
  )
}