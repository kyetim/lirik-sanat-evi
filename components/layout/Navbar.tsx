'use client'
import { useState, useEffect } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import { useLang } from '@/contexts/LanguageContext'

const SECTION_IDS = ['hero', 'about', 'courses', 'pricing', 'teachers', 'why', 'trial']

export default function Navbar() {
  const [scrolled, setScrolled]         = useState(false)
  const [menuOpen, setMenuOpen]         = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const { theme, toggle: toggleTheme }  = useTheme()
  const { lang, toggle: toggleLang, tr } = useLang()

  // Scroll shrink
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    SECTION_IDS.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  // Close menu on resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const links = [
    { href: '#about',    label: tr.nav.about,    id: 'about' },
    { href: '#courses',  label: tr.nav.courses,  id: 'courses' },
    { href: '#pricing',  label: tr.nav.pricing,  id: 'pricing' },
    { href: '#teachers', label: tr.nav.teachers, id: 'teachers' },
    { href: '#why',      label: tr.nav.why,      id: 'why' },
    { href: '#trial',    label: tr.nav.contact,  id: 'trial' },
  ]

  const linkClass = (id: string) =>
    `text-[11px] tracking-[2px] uppercase transition-colors duration-300
    ${activeSection === id ? 'text-gold' : 'text-cream/60 hover:text-gold'}`

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
      ${scrolled ? 'py-4 backdrop-blur-md border-b border-gold/10' : 'py-5 md:py-7'}
      bg-bg/90`}>
      <div className="flex items-center justify-between px-5 md:px-16">
        {/* Logo */}
        <a href="#hero" className="font-cormorant text-xl md:text-2xl font-normal text-gold tracking-wide">
          Lirik <em className="italic">Sanat Evi</em>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className={linkClass(link.id)}>{link.label}</a>
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div className="flex items-center gap-2 md:gap-3">
          <button onClick={toggleLang}
            className="text-[11px] tracking-[2px] uppercase border border-gold/30 px-2.5 py-1.5 text-cream/60 hover:border-gold hover:text-gold transition-all duration-300 w-9 text-center"
            title={lang === 'tr' ? 'Switch to English' : "Türkçe'ye geç"}>
            {lang === 'tr' ? 'EN' : 'TR'}
          </button>

          <button onClick={toggleTheme}
            className="border border-gold/30 p-1.5 text-cream/60 hover:border-gold hover:text-gold transition-all duration-300"
            aria-label="Toggle theme">
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>

          <a href="#trial" className="hidden md:inline-block btn-primary text-[11px] py-2.5 px-5">
            {tr.nav.cta}
          </a>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(o => !o)}
            className="md:hidden border border-gold/30 p-1.5 text-cream/60 hover:border-gold hover:text-gold transition-all"
            aria-label="Menu">
            {menuOpen ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-bg/95 backdrop-blur-md border-t border-gold/10 px-5 py-6 flex flex-col gap-5">
          {links.map((link) => (
            <a key={link.href} href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`${linkClass(link.id)} text-sm`}>
              {link.label}
            </a>
          ))}
          <a href="#trial" onClick={() => setMenuOpen(false)} className="btn-primary text-center mt-2">
            {tr.nav.cta}
          </a>
        </div>
      )}
    </nav>
  )
}
