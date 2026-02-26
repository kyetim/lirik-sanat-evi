'use client'
import { useState } from 'react'
import { useLang } from '@/contexts/LanguageContext'

export default function NewsletterForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')
  const { tr } = useLang()
  const f = tr.newsletter

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    const email = (e.target as HTMLFormElement).email.value
    await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    setStatus('success')
  }

  if (status === 'success') {
    return <p className="text-sm text-gold font-cormorant italic">{f.success}</p>
  }

  return (
    <form className="flex max-w-md mx-auto" onSubmit={handleSubmit}>
      <input name="email" type="email" placeholder={f.placeholder} required
        className="form-input flex-1 !border-r-0 !w-auto" />
      <button type="submit" disabled={status === 'loading'}
        className="bg-gold border border-gold text-[#0a0a0a] px-8 py-4 text-[11px] font-medium tracking-[2px] uppercase hover:bg-gold-light transition-colors whitespace-nowrap disabled:opacity-60">
        {status === 'loading' ? f.loading : f.cta}
      </button>
    </form>
  )
}
