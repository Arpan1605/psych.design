/**
 * Mock screens for the sample "Booking a follow-up" case study.
 * Each screen receives the current beat index so it can highlight
 * the part of the UI the story is talking about.
 */
import { motion } from 'framer-motion'
import './screens.css'

const Hi = ({ on, children }: { on: boolean; children: React.ReactNode }) => (
  <motion.div
    className="scr-hi"
    animate={{ boxShadow: on ? '0 0 0 3px var(--highlight)' : '0 0 0 0px rgba(0,0,0,0)' }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
)

export function HomeScreen({ beat }: { beat: number }) {
  return (
    <div className="scr">
      <div className="scr-top">Good morning, Arpan</div>
      <Hi on={beat >= 1}>
        <div className="scr-card scr-card--accent">
          <strong>Time for your follow-up</strong>
          <span>Dr. Shah asked to see you within 2 weeks.</span>
          <button className="scr-btn">Book appointment</button>
        </div>
      </Hi>
      <div className="scr-card"><strong>Lab results</strong><span>2 new reports</span></div>
      <div className="scr-card"><strong>Prescriptions</strong><span>Refill due in 5 days</span></div>
    </div>
  )
}

export function LoginScreen({ beat }: { beat: number }) {
  return (
    <div className="scr">
      <div className="scr-top">Sign in to continue</div>
      <p className="scr-muted">For your security, please sign in again.</p>
      <div className="scr-field">Email<span>arpan@example.com</span></div>
      <Hi on={beat >= 1}>
        <div className="scr-field">Password<span>••••••••</span></div>
      </Hi>
      <Hi on={beat >= 2}>
        <p className="scr-error">Password must be changed every 30 days.</p>
      </Hi>
      <button className="scr-btn">Sign in</button>
    </div>
  )
}

const doctors = ['Dr. Aarav Mehta', 'Dr. Priya Nair', 'Dr. Kabir Shah', 'Dr. Sana Iyer', 'Dr. Rohan Desai', 'Dr. Leela Rao', 'Dr. Vikram Joshi']

export function DoctorScreen({ beat }: { beat: number }) {
  return (
    <div className="scr">
      <div className="scr-top">Choose a doctor</div>
      <Hi on={beat >= 1}><p className="scr-muted">Showing 1–7 of 42 doctors</p></Hi>
      <div className="scr-list">
        {doctors.map((d) => (
          <div key={d} className="scr-row">
            <span className="scr-avatar" aria-hidden />
            {d}
          </div>
        ))}
      </div>
    </div>
  )
}

export function SlotScreen({ beat }: { beat: number }) {
  return (
    <div className="scr">
      <div className="scr-top">Dr. Kabir Shah</div>
      <Hi on={beat >= 1}>
        <div className="scr-card scr-card--good">
          <strong>Earliest: Tue, 3 Dec · 10:30</strong>
          <button className="scr-btn">Take this slot</button>
        </div>
      </Hi>
      <p className="scr-muted">Other times</p>
      <div className="scr-chips">
        {['Wed 11:00', 'Wed 16:15', 'Thu 09:00', 'Fri 12:30'].map((t) => (
          <span key={t} className="scr-chip">{t}</span>
        ))}
      </div>
    </div>
  )
}

export function FormScreen({ beat }: { beat: number }) {
  return (
    <div className="scr">
      <div className="scr-top">Insurance details</div>
      <Hi on={beat >= 1}>
        <div>
          <div className="scr-field">Provider<span>—</span></div>
          <div className="scr-field">Policy number<span>—</span></div>
          <div className="scr-field">Member ID<span>—</span></div>
        </div>
      </Hi>
      <div className="scr-field">Upload card (front)<span>Choose file</span></div>
      <button className="scr-btn scr-btn--disabled">Continue</button>
    </div>
  )
}

export function DoneScreen({ beat }: { beat: number }) {
  return (
    <div className="scr scr--center">
      <motion.div
        className="scr-check"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 16 }}
      >
        ✓
      </motion.div>
      <strong className="scr-title">You're booked</strong>
      <p className="scr-muted">Tue, 3 Dec · 10:30 with Dr. Shah</p>
      <Hi on={beat >= 1}><button className="scr-btn">Add to calendar</button></Hi>
    </div>
  )
}
