'use client'
import { useState } from 'react'
import { useLang } from '@/contexts/LanguageContext'

export default function NewsletterForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const { tr } = useLang()
  const f = tr.newsletter

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    const form = e.currentTarget
    const data = new FormData(form)
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.get('email'), website: data.get('website') }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStatus('success')
    } catch {
      setStatus('error') // form yerinde kalır, kullanıcı tekrar deneyebilir
    }
  }

  if (status === 'success') {
    return <p className="text-sm text-gold font-cormorant italic">{f.success}</p>
  }

  return (
    <div className="max-w-md mx-auto">
      <form className="flex" onSubmit={handleSubmit}>
        {/* Honeypot: ekran dışı, klavye ve ekran okuyucudan gizli */}
        <input name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true"
          style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} />
        <input name="email" type="email" placeholder={f.placeholder} required
          className="form-input flex-1 !border-r-0 !w-auto" />
        <button type="submit" disabled={status === 'loading'}
          className="bg-gold border border-gold text-[#0a0a0a] px-8 py-4 text-[11px] font-medium tracking-[2px] uppercase hover:bg-gold-light transition-colors whitespace-nowrap disabled:opacity-60">
          {status === 'loading' ? f.loading : f.cta}
        </button>
      </form>
      {status === 'error' && <p className="text-red-400 text-xs mt-2">{f.error}</p>}
    </div>
  )
}
