'use client'
import Image from 'next/image'
import { useLang } from '@/contexts/LanguageContext'
import Hero from './Hero'
import TrialForm from './TrialForm'
import NewsletterForm from './NewsletterForm'
import Navbar from '@/components/layout/Navbar'
import Cursor from '@/components/ui/Cursor'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

// Öğretmen fotoğrafları hazır olduğunda buraya ekleyin:
// 'Piyano Öğretmeni': '/images/teachers/piano.jpg'
const TEACHER_IMAGES: Record<string, string> = {}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  )
}

function YouTubeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
    </svg>
  )
}

export default function HomeContent() {
  const { tr } = useLang()
  const a  = tr.about
  const c  = tr.courses
  const te = tr.teachers
  const w  = tr.why
  const tm = tr.testimonials
  const p  = tr.pricing
  const n  = tr.newsletter
  const f  = tr.footer

  return (
    <main>
      <Cursor />
      <Navbar />
      <Hero />

      {/* Marquee */}
      <div className="py-6 md:py-7 border-y border-gold/15 bg-gold/[0.04] overflow-hidden">
        <div className="flex gap-10 md:gap-16 animate-marquee whitespace-nowrap">
          {[...tr.marquee, ...tr.marquee].map((item, i) => (
            <span key={i} className="font-cormorant text-sm md:text-base italic text-gold/60 tracking-[2px] flex-shrink-0">
              {item} <span className="text-gold mx-3 md:mx-4">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* About */}
      <section id="about" className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 px-5 md:px-16 py-16 md:py-28 bg-bg items-center">
        <div className="relative h-64 md:h-[500px]">
          <div className="absolute top-0 left-0 right-0 md:right-20 bottom-0 md:bottom-36 bg-navy border border-gold/20 p-6 md:p-10 hover:-translate-y-2 transition-transform duration-500">
            <div className="font-cormorant text-5xl md:text-7xl font-light text-gold leading-none">2025</div>
            <div className="text-[11px] tracking-[2px] uppercase text-cream/50 mt-2">{a.founding}</div>
            <div className="mt-5 md:mt-8 h-px bg-gold/20" />
            <p className="mt-4 md:mt-6 text-sm leading-relaxed text-cream/60 line-clamp-4 md:line-clamp-none">{a.p1}</p>
          </div>
          <div className="hidden md:block absolute bottom-0 right-0 left-24 top-72 bg-gold/[0.08] border border-gold/40 p-10 hover:-translate-y-2 transition-transform duration-500">
            <div className="font-cormorant text-7xl font-light text-gold leading-none">Mersin</div>
            <div className="text-[11px] tracking-[2px] uppercase text-cream/50 mt-2">Türkiye</div>
          </div>
        </div>
        <div>
          <div className="section-label">{a.label}</div>
          <h2 className="font-cormorant text-[clamp(32px,5vw,64px)] font-light leading-tight mb-5 md:mb-6">
            {a.title1}<br />{a.title2} <em className="italic text-gold">{a.title3}</em>
          </h2>
          <div className="w-12 md:w-16 h-px bg-gradient-to-r from-gold to-transparent mb-6 md:mb-10" />
          <p className="text-sm leading-relaxed text-cream/70 mb-4 md:mb-5">{a.p1}</p>
          <p className="text-sm leading-relaxed text-cream/70 mb-4 md:mb-5">{a.p2}</p>
          <a href="#courses" className="btn-secondary mt-2 md:mt-4">{a.cta}</a>
        </div>
      </section>

      {/* Courses */}
      <section id="courses" className="px-5 md:px-16 py-16 md:py-28 bg-navy/[0.06] border-t border-gold/[0.08]">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6 mb-10 md:mb-16">
          <div>
            <div className="section-label">{c.label}</div>
            <h2 className="font-cormorant text-[clamp(32px,5vw,64px)] font-light leading-tight">
              {c.title1} <em className="italic text-gold">{c.title2}</em><br />{c.title3}
            </h2>
          </div>
          <a href="#trial" className="btn-secondary self-start sm:self-auto">{c.cta}</a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0.5">
          {c.items.map((course) => (
            <div key={course.title}
              className={`p-8 md:p-12 border relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 cursor-none
                ${course.featured ? 'bg-gold border-gold' : 'bg-navy border-gold/10 hover:border-gold/40'}`}>
              {!course.featured && (
                <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
              <span className="text-3xl md:text-4xl mb-4 md:mb-6 block">{course.icon}</span>
              <h3 className={`font-cormorant text-xl md:text-2xl font-normal mb-2 md:mb-3 ${course.featured ? 'text-[#0a0a0a]' : 'text-cream'}`}>
                {course.title}
              </h3>
              <p className={`text-xs leading-relaxed mb-5 md:mb-7 ${course.featured ? 'text-[#0a0a0a]/80' : 'text-cream/55'}`}>
                {course.desc}
              </p>
              <span className={`inline-block px-3 md:px-4 py-1 border text-[10px] tracking-[2px] uppercase
                ${course.featured ? 'border-black/30 text-[#0a0a0a]' : 'border-gold/30 text-gold'}`}>
                {course.tag}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="px-5 md:px-16 py-16 md:py-28 bg-bg border-t border-gold/[0.08]">
        <div className="section-label">{p.label}</div>
        <h2 className="font-cormorant text-[clamp(32px,5vw,64px)] font-light leading-tight mb-4">
          {p.title1} <em className="italic text-gold">{p.title2}</em><br />{p.title3}
        </h2>
        <p className="text-sm text-cream/60 max-w-lg mb-12 md:mb-16 leading-relaxed">{p.desc}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5">
          {p.items.map((plan) => (
            <div key={plan.name}
              className={`relative p-8 md:p-10 border flex flex-col
                ${plan.featured
                  ? 'bg-gold border-gold'
                  : 'bg-navy/[0.04] border-gold/10 hover:border-gold/40 transition-colors duration-300'}`}>

              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0a0a0a] border border-gold/60 px-4 py-1 text-[10px] tracking-[3px] uppercase text-gold whitespace-nowrap">
                  {plan.cta}
                </div>
              )}

              <div className="mb-8">
                <p className={`text-[11px] tracking-[3px] uppercase mb-4 ${plan.featured ? 'text-[#0a0a0a]/70' : 'text-gold/70'}`}>
                  {plan.name}
                </p>
                <div className="flex items-end gap-1">
                  <span className={`font-cormorant text-5xl md:text-6xl font-light leading-none ${plan.featured ? 'text-[#0a0a0a]' : 'text-cream'}`}>
                    {plan.currency}{plan.price}
                  </span>
                  <span className={`text-xs mb-1 ${plan.featured ? 'text-[#0a0a0a]/60' : 'text-cream/50'}`}>
                    {plan.per}
                  </span>
                </div>
                <div className={`mt-2 text-[11px] tracking-[1px] ${plan.featured ? 'text-[#0a0a0a]/70' : 'text-cream/50'}`}>
                  {plan.duration} · {plan.sessions}
                </div>
              </div>

              <div className={`h-px mb-8 ${plan.featured ? 'bg-black/20' : 'bg-gold/15'}`} />

              <ul className="space-y-3 flex-1 mb-10">
                {plan.features.map((feat) => (
                  <li key={feat} className={`flex items-start gap-3 text-xs leading-relaxed ${plan.featured ? 'text-[#0a0a0a]/80' : 'text-cream/65'}`}>
                    <span className={`mt-0.5 flex-shrink-0 ${plan.featured ? 'text-[#0a0a0a]' : 'text-gold'}`}>✦</span>
                    {feat}
                  </li>
                ))}
              </ul>

              <a href="#trial"
                className={`text-center text-[11px] tracking-[2px] uppercase py-3.5 transition-all duration-300
                  ${plan.featured
                    ? 'bg-[#0a0a0a] text-gold hover:bg-[#111]'
                    : 'border border-gold/40 text-cream/70 hover:border-gold hover:text-gold'}`}>
                {p.cta}
              </a>
            </div>
          ))}
        </div>
        <p className="text-xs text-cream/35 mt-6">{p.note}</p>
      </section>

      {/* Teachers */}
      <section id="teachers" className="px-5 md:px-16 py-16 md:py-28 bg-bg border-t border-gold/[0.08]">
        <div className="section-label">{te.label}</div>
        <h2 className="font-cormorant text-[clamp(32px,5vw,64px)] font-light leading-tight mb-10 md:mb-16">
          <em className="italic text-gold">{te.title1}</em> {te.title2}<br />{te.title3}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0.5">
          {te.items.map((teacher) => {
            const imageSrc = TEACHER_IMAGES[teacher.role]
            return (
              <div key={teacher.role} className="relative aspect-[3/4] bg-navy overflow-hidden group cursor-none">
                {imageSrc ? (
                  <Image
                    src={imageSrc}
                    alt={teacher.name}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-navy to-navy/50 flex items-center justify-center font-cormorant text-5xl md:text-7xl text-gold/30">
                    {teacher.symbol}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 translate-y-3 md:translate-y-10 group-hover:translate-y-0 transition-transform">
                  <h3 className="font-cormorant text-base md:text-xl font-normal mb-0.5 md:mb-1 text-cream">{teacher.name}</h3>
                  <span className="text-[10px] md:text-[11px] tracking-[2px] uppercase text-gold">{teacher.role}</span>
                  <p className="text-xs text-cream/50 mt-2 md:mt-3 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity delay-100 hidden md:block">
                    {teacher.bio}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Why */}
      <section id="why" className="px-5 md:px-16 py-16 md:py-28 bg-navy relative overflow-hidden">
        <div className="absolute -top-48 -right-48 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(201,168,76,0.06)_0%,transparent_70%)] pointer-events-none" />
        <div className="section-label">{w.label}</div>
        <h2 className="font-cormorant text-[clamp(32px,5vw,64px)] font-light leading-tight mb-10 md:mb-16">
          {w.title1}<br />{w.title2} <em className="italic text-gold">{w.title3}</em>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {w.items.map((item) => (
            <div key={item.num} className="pl-6 md:pl-8 border-l-2 border-gold/20 hover:border-gold transition-colors duration-300">
              <div className="font-cormorant text-4xl md:text-5xl font-light text-gold/30 leading-none mb-3 md:mb-4">{item.num}</div>
              <h3 className="font-cormorant text-lg md:text-xl font-normal mb-2 md:mb-3 text-cream">{item.title}</h3>
              <p className="text-xs leading-relaxed text-cream/55">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="px-5 md:px-16 py-16 md:py-28 bg-bg border-t border-gold/[0.08]">
        <div className="section-label">{tm.label}</div>
        <h2 className="font-cormorant text-[clamp(32px,5vw,64px)] font-light leading-tight mb-10 md:mb-16">
          {tm.title1} <em className="italic text-gold">{tm.title2}</em><br />{tm.title3}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tm.items.map((item, i) => (
            <div key={i}
              className="p-8 md:p-10 border border-gold/10 bg-navy/[0.04] hover:border-gold/30 transition-colors duration-300 flex flex-col">
              <div className="flex gap-1 mb-6">
                {Array.from({ length: 5 }, (_, s) => (
                  <span key={s} className="text-gold text-xs">✦</span>
                ))}
              </div>
              <p className="font-cormorant text-lg md:text-xl italic text-cream/80 leading-relaxed flex-1 mb-8">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="border-t border-gold/10 pt-5">
                <p className="text-sm font-medium text-cream">{item.name}</p>
                <p className="text-[11px] tracking-[2px] uppercase text-gold/60 mt-1">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <TrialForm />

      {/* Newsletter */}
      <section id="register" className="px-5 md:px-16 py-16 md:py-24 bg-navy text-center">
        <div className="section-label justify-center before:hidden">{n.label}</div>
        <h2 className="font-cormorant text-[clamp(32px,5vw,64px)] font-light leading-tight max-w-2xl mx-auto mb-4 md:mb-5">
          {n.title1} <em className="italic text-gold">{n.title2}</em>
        </h2>
        <p className="text-sm text-cream/60 max-w-md mx-auto mb-8 md:mb-12 leading-relaxed">{n.desc}</p>
        <NewsletterForm />
      </section>

      {/* Footer */}
      <footer id="contact" className="px-5 md:px-16 pt-14 md:pt-20 pb-8 md:pb-10 bg-bg border-t border-gold/[0.12]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 mb-10 md:mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <h2 className="font-cormorant text-2xl md:text-3xl font-normal text-gold mb-2">Lirik Sanat Evi</h2>
            <em className="font-cormorant italic text-sm text-cream/40">{f.tagline}</em>
            <p className="text-xs leading-relaxed text-cream/50 mt-4 md:mt-5 max-w-xs">{f.desc}</p>
          </div>

          {/* Nav columns */}
          {f.cols.map((col) => (
            <div key={col.title}>
              <h4 className="text-[11px] tracking-[3px] uppercase text-gold mb-4 md:mb-6">{col.title}</h4>
              <ul className="space-y-2 md:space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-xs text-cream/50 hover:text-gold transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact + Social icons */}
          <div>
            <h4 className="text-[11px] tracking-[3px] uppercase text-gold mb-4 md:mb-6">{f.contact.title}</h4>
            <ul className="space-y-2 md:space-y-3 mb-6">
              <li>
                <a href={`mailto:${f.contact.email}`}
                  className="text-xs text-cream/50 hover:text-gold transition-colors break-all">
                  {f.contact.email}
                </a>
              </li>
              <li>
                <span className="text-xs text-cream/50">{f.contact.address}</span>
              </li>
            </ul>
            <div className="flex gap-2">
              {f.social.map((s) => (
                <a key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="border border-gold/30 p-2 text-cream/50 hover:border-gold hover:text-gold transition-all duration-300">
                  {s.icon === 'instagram' ? <InstagramIcon /> : <YouTubeIcon />}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gold/10 pt-6 md:pt-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[12px] text-cream/30">{f.copy}</p>
          <p className="text-[12px] text-cream/30">{f.dev} <span className="text-gold">✦</span></p>
        </div>
      </footer>

      {/* WhatsApp floating button */}
      <WhatsAppButton />
    </main>
  )
}
