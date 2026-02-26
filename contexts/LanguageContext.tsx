'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { t, Lang } from '@/lib/translations'

type Translations = typeof t[Lang]

const LanguageContext = createContext<{
  lang: Lang
  toggle: () => void
  tr: Translations
}>({
  lang: 'tr',
  toggle: () => {},
  tr: t['tr'],
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('tr')

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Lang | null
    if (saved === 'tr' || saved === 'en') setLang(saved)
  }, [])

  useEffect(() => {
    localStorage.setItem('lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  const toggle = () => setLang(l => l === 'tr' ? 'en' : 'tr')

  return (
    <LanguageContext.Provider value={{ lang, toggle, tr: t[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLang = () => useContext(LanguageContext)
