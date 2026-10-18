import { useEffect } from 'react'
import { initAnalytics, track } from './analytics'
import { EMAIL, mailUrl, waUrl } from './config'

const STEPS = [
  {
    title: 'Send the message',
    body: 'WhatsApp opens with a short form. Add your name, area, hotel, age and symptoms, then share your location pin.',
  },
  {
    title: 'We confirm',
    body: 'We contact doctors near you and reply with who is coming, the arrival time and the price.',
  },
  {
    title: 'The doctor visits you',
    body: 'Treatment where you are. If you need a hospital, the doctor will advise and help arrange it.',
  },
]

const AREAS = [
  'Canggu',
  'Pererenan',
  'Seminyak',
  'Kerobokan',
  'Legian',
  'Kuta',
  'Denpasar',
  'Sanur',
  'Jimbaran',
  'Nusa Dua',
  'Uluwatu',
  'Ubud',
]

const REASONS = [
  'Fever',
  'Bali belly',
  'Vomiting & dehydration',
  'Food poisoning',
  'Mild allergic reaction',
  'Ear, throat & chest infection',
  'Minor injuries & cuts',
  'Sunburn & heat exhaustion',
  'Motorbike scrapes',
  'Prescriptions',
]

const year = new Date().getFullYear()

const FAQS = [
  {
    q: 'How fast will a doctor arrive?',
    a: 'It depends on traffic and your location. We give you an estimated arrival time before confirming, and never promise a time we cannot keep.',
  },
  {
    q: 'How much does it cost?',
    a: 'You are told the price before the doctor is sent. You pay the doctor directly.',
  },
  {
    q: 'Will my travel insurance cover it?',
    a: 'Many policies do. Check with your insurer, and keep the receipt and medical report.',
  },
  {
    q: 'Who are the doctors, and is my information private?',
    a: 'Independent licensed doctors and clinics in Bali. We coordinate the visit; medical care is provided by the doctor. Your details are shared only with the doctor handling your case.',
  },
]

function WhatsAppLink({ location, className, children }) {
  return (
    <a
      className={className}
      href={waUrl}
      target="_blank"
      rel="noopener"
      onClick={() => track('whatsapp_click', { button_location: location, transport_type: 'beacon' })}
    >
      {children}
    </a>
  )
}

function EmailLine({ location }) {
  if (!EMAIL) return null
  return (
    <p className="alt-contact">
      Prefer another way?{' '}
      <a
        href={mailUrl}
        onClick={() => track('email_click', { button_location: location, transport_type: 'beacon' })}
      >
        Email
      </a>
    </p>
  )
}

export default function App() {
  useEffect(() => initAnalytics(), [])

  useEffect(() => {
    const seen = {}
    if (!('IntersectionObserver' in window)) return undefined
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !seen[entry.target.id]) {
          seen[entry.target.id] = 1
          track('section_view', { section: entry.target.id })
        }
      })
    }, { threshold: 0.5 })
    document.querySelectorAll('section[id]').forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <header className="nav">
        <div className="wrap">
          <div className="brand">
            <img src="/logo.png" alt="Bali Doctor Now logo" width="44" height="44" />
            <span>
              <span className="n1">Bali</span> <span className="n2">Doctor</span> <span className="n3">Now</span>
            </span>
          </div>
          <WhatsAppLink location="header" className="btn sm">WhatsApp</WhatsAppLink>
        </div>
      </header>

      <div className="top">
        <div className="wrap">
          <div className="sos">
            <b>Emergency?</b> Chest pain, breathing trouble, severe bleeding or serious accident: call <b>112</b> or go to the nearest hospital ER now.
          </div>
          <div className="hero">
            <h1>A doctor at your hotel or villa in Bali.</h1>
            <p className="lead">Tap the button, send the short message, and we reply with the doctor, arrival time and price.</p>
            <WhatsAppLink location="hero" className="btn">Message us on WhatsApp</WhatsAppLink>
            <EmailLine location="hero" />
            <ul className="trust">
              <li>English-speaking</li>
              <li>Price confirmed first</li>
              <li>Licensed doctors</li>
            </ul>
          </div>
        </div>
      </div>

      <main>
        <section className="s" id="how">
          <div className="wrap">
            <h2>How it works</h2>
            <div className="steps">
              {STEPS.map((step, index) => (
                <div className="card" key={step.title}>
                  <span className="num">{index + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="s alt" id="areas">
          <div className="wrap">
            <h2>Areas we serve</h2>
            <ul className="chips t">
              {AREAS.map((area) => <li key={area}>{area}</li>)}
            </ul>
            <p className="note">
              <b>Further areas</b> (Tabanan & Tanah Lot, Kintamani, Sidemen, Candidasa, Amed): message us first and we will confirm if a doctor can reach you. We currently cannot reach Lovina and North Bali.
            </p>
          </div>
        </section>

        <section className="s" id="treat">
          <div className="wrap">
            <h2>Common reasons to call</h2>
            <ul className="chips">
              {REASONS.map((reason) => <li key={reason}>{reason}</li>)}
            </ul>
          </div>
        </section>

        <section className="s alt" id="faq">
          <div className="wrap">
            <h2>Questions</h2>
            <div className="card faq">
              {FAQS.map((item) => (
                <details
                  key={item.q}
                  onToggle={(event) => {
                    if (event.currentTarget.open) track('faq_open', { question: item.q })
                  }}
                >
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <div className="band">
          <h2>Need a doctor now?</h2>
          <p>Send us a message and we will get back to you with a doctor and price.</p>
          <WhatsAppLink location="bottom_cta" className="btn">Message us on WhatsApp</WhatsAppLink>
          <EmailLine location="bottom_cta" />
        </div>
      </main>

      <footer>
        <div className="wrap">
          <p>
            <b>In an emergency call 112.</b> This website coordinates travelers and independent doctors. It does not give medical advice and is not a substitute for emergency care.
          </p>
          <p>&copy; {year} Bali Doctor Now</p>
        </div>
      </footer>

      <div className="pill">
        <WhatsAppLink location="floating_bar" className="btn">Message us on WhatsApp</WhatsAppLink>
      </div>
    </>
  )
}
