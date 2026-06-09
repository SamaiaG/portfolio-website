import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePageTitle } from '../hooks/usePageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Button from '../components/Button'
import './contact.css'

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID

function FormField({ label, type = 'text', value, onChange, multiline }) {
  const [focused, setFocused] = useState(false)

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '12px',
    border: `1px solid ${focused ? 'rgb(46, 42, 53)' : 'rgba(46, 42, 53, 0.18)'}`,
    fontFamily: 'var(--font-body)',
    fontSize: '20px',
    lineHeight: 1.55,
    color: 'var(--color-text)',
    backgroundColor: '#fff',
    outline: 'none',
    resize: multiline ? 'vertical' : 'none',
    transition: 'border-color 0.18s ease',
    boxSizing: 'border-box',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <label style={{ fontFamily: 'var(--font-body)', fontSize: '16px', fontWeight: 500, color: 'var(--color-text)' }}>
        {label}{' '}<span style={{ color: 'var(--color-accent)' }}>•</span>
      </label>
      {multiline ? (
        <textarea value={value} onChange={onChange} required rows={6} style={inputStyle}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
      ) : (
        <input type={type} value={value} onChange={onChange} required style={inputStyle}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
      )}
    </div>
  )
}

export default function Contact() {
  usePageTitle('Contact · Samaia Gahramanov')
  const navigate = useNavigate()
  const [form, setForm] = useState({ Name: '', Email: '', Message: '' })
  const [status, setStatus] = useState('idle')

  const set = key => e => setForm(f => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('submitting')
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
      <Navbar />

      <main className="container contact-page" style={{ paddingTop: '140px', paddingBottom: '80px', maxWidth: '600px' }}>

        {status === 'success' ? (
          <div style={{ paddingTop: '40px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: '3rem', color: 'var(--color-text)', margin: '0 0 16px' }}>
              Message sent!
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.4rem', lineHeight: 1.65, color: 'var(--color-text-muted)', margin: '0 0 32px' }}>
              Thanks for reaching out. I'll get back to you within 1–2 days.
            </p>
            <Button variant="primary" onClick={() => navigate(-1)}>Go back</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: '3rem', color: 'var(--color-text)', margin: 0 }}>
                Let's get in touch!
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.4rem', lineHeight: 1.65, color: 'var(--color-text-muted)', margin: 0 }}>
                Have a question, idea, or opportunity? Leave a message and I'll get back to you.
                I usually reply within 1–2 days.
              </p>
            </div>

            <FormField label="Your name" value={form.Name} onChange={set('Name')} />
            <FormField label="Email address" type="email" value={form.Email} onChange={set('Email')} />
            <FormField label="Your message" multiline value={form.Message} onChange={set('Message')} />

            {status === 'error' && (
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#c0392b', margin: 0 }}>
                Something went wrong. Please try again or email me directly at samaiagahramanov@gmail.com
              </p>
            )}

            <div style={{ marginTop: '30px' }}>
              <Button variant="primary" type="submit" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Sending…' : 'Send your message →'}
              </Button>
            </div>

          </form>
        )}
      </main>

      <Footer />
    </div>
  )
}
