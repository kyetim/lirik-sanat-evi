'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLang } from '@/contexts/LanguageContext'

type FormData = {
  first_name: string
  last_name: string
  phone: string
  email: string
  instrument: string
  student_age_range: string
  note: string
}

export default function TrialForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [phoneDigits, setPhoneDigits] = useState('')
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<FormData>()
  const { tr } = useLang()
  const f = tr.trial

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '')
    setPhoneDigits(digits)
    setValue('phone', digits ? `+90${digits}` : '', { shouldValidate: true })
  }

  const onSubmit = async (data: FormData) => {
    setStatus('loading')
    try {
      const res = await fetch('/api/trial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      reset()
      setPhoneDigits('')
    } catch {
      setStatus('error')
    }
  }

  const fieldClass = (hasError: boolean) =>
    `form-input ${hasError ? '!border-red-500/60' : ''}`

  return (
    <section id="trial" className="px-5 md:px-16 py-16 md:py-28 bg-bg border-t border-gold/[0.08]">
      <div className="max-w-3xl">
        <div className="section-label">{f.label}</div>
        <h2 className="font-cormorant text-[clamp(38px,5vw,64px)] font-light leading-tight mb-4">
          {f.title1}<br />{f.title2} <em className="italic text-gold">{f.title3}</em>
        </h2>
        <p className="text-sm mb-14 leading-relaxed max-w-lg" style={{ color: 'var(--input-placeholder)' }}>
          {f.desc}
        </p>

        {status === 'success' ? (
          <div className="border border-gold/40 bg-gold/[0.06] p-10">
            <p className="font-cormorant text-2xl text-gold mb-2">{f.successTitle}</p>
            <p className="text-sm" style={{ color: 'var(--input-placeholder)' }}>{f.successDesc}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input {...register('first_name', { required: true })}
                placeholder={f.firstName} className={fieldClass(!!errors.first_name)} />
              <input {...register('last_name', { required: true })}
                placeholder={f.lastName} className={fieldClass(!!errors.last_name)} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Phone with fixed +90 prefix */}
              <div className="flex">
                <input type="hidden" {...register('phone', { required: true })} />
                <span className={`form-input !w-auto border-r-0 text-gold shrink-0 pointer-events-none select-none
                  ${!!errors.phone ? '!border-red-500/60' : ''}`}>
                  +90
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder={f.phone}
                  value={phoneDigits}
                  onChange={handlePhoneChange}
                  className={`form-input flex-1 ${!!errors.phone ? '!border-red-500/60' : ''}`}
                />
              </div>
              <input {...register('email', { required: true })}
                placeholder={f.email} type="email" className={fieldClass(!!errors.email)} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <select {...register('instrument', { required: true })}
                className={fieldClass(!!errors.instrument)}>
                <option value="">{f.instrumentPlaceholder}</option>
                {f.instruments.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
              <select {...register('student_age_range', { required: true })}
                className={fieldClass(!!errors.student_age_range)}>
                <option value="">{f.agePlaceholder}</option>
                {f.ages.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <textarea {...register('note')} placeholder={f.note} rows={3}
              className="form-input resize-none" />
            {status === 'error' && (
              <p className="text-red-400 text-xs">{f.error}</p>
            )}
            <button type="submit" disabled={status === 'loading'}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
              {status === 'loading' ? f.submitting : f.submit}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
