import { useRef, useState } from 'react'
import PageHead from '../components/PageHead'
import Note from '../components/Note'
import { CONTACT_EMAIL } from '../config'

const d = (ms) => ({ '--d': ms + 'ms' })
const num = { background: 'none', color: '#9CA9DF', WebkitTextFillColor: '#9CA9DF' }

export default function Apply() {
  const [toast, setToast] = useState({ show: false, msg: '' })
  const timer = useRef(null)

  const say = (msg) => {
    setToast({ show: true, msg })
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setToast((t) => ({ ...t, show: false })), 5000)
  }

  // Opens the visitor's email app. Nothing is sent by the website itself.
  const onSubmit = (e) => {
    e.preventDefault()
    const body = [...new FormData(e.target).entries()].map(([k, v]) => k + ': ' + v).join('\n')
    say('Your email app will open. Nothing is sent until you press send in your email app.')
    window.location.href =
      'mailto:' + CONTACT_EMAIL +
      '?subject=' + encodeURIComponent('Theoria research fit enquiry') +
      '&body=' + encodeURIComponent(body)
  }

  return (
    <>
      <div className="page">
        <PageHead
          eyebrow="Begin your Theoria journey"
          title="Tell us what you"
          accent="want to explore."
          intro="A thoughtful first conversation begins with the student's questions, readiness and ambitions, not a predetermined program sale."
        />

        <section>
          <div className="shell split" style={{ alignItems: 'start' }}>
            <div className="rv">
              <h2>Research fit enquiry</h2>
              <p>Complete the fields below to prepare an enquiry. This static prototype does not submit data to a server; the production form should connect securely to Theoria's CRM.</p>
              <form className="formgrid" onSubmit={onSubmit}>
                <input required name="name" placeholder="Student or parent name" aria-label="Student or parent name" />
                <input required type="email" name="email" placeholder="Email address" aria-label="Email address" />
                <input name="grade" placeholder="Student grade / year" aria-label="Student grade or year" />
                <select name="pathway" aria-label="Pathway of interest" defaultValue="">
                  <option value="">Pathway of interest</option>
                  <option>Scholar</option><option>Elite</option><option>Fellowship</option><option>Not sure yet</option>
                </select>
                <textarea name="interests" placeholder="What questions, fields or projects interest the student?" aria-label="Interests"></textarea>
                <button className="btn" type="submit">Prepare enquiry email <span className="arr">→</span></button>
              </form>
            </div>

            <div className="mutedbox rv" style={d(150)}>
              <div className="eyebrow">What happens next</div>
              <div className="step"><b style={num}>01</b><div><strong>Understand the student</strong><p>Interests, experience, readiness and available time.</p></div></div>
              <div className="step"><b style={num}>02</b><div><strong>Define possible research directions</strong><p>Academic feasibility and potential project scope.</p></div></div>
              <div className="step"><b style={num}>03</b><div><strong>Recommend a pathway</strong><p>Scholar, Elite or Fellowship, based on fit.</p></div></div>
              <Note>Production contact address, data policy and application terms require confirmation.</Note>
            </div>
          </div>
        </section>
      </div>

      <div className={'toast' + (toast.show ? ' show' : '')} role="status">{toast.msg}</div>
    </>
  )
}