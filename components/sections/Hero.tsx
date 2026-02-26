'use client'
import { useEffect, useRef } from 'react'
import { useLang } from '@/contexts/LanguageContext'

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const lirRef    = useRef<HTMLDivElement>(null)
  const mouseRef  = useRef({ x: 0.5, y: 0.5 })
  const { tr }    = useLang()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size:   Math.random() * 1.5 + 0.3,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.4 + 0.1,
    }))

    let animId: number
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p.x - p2.x, dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(201,168,76,${0.06 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        })
        const dx = p.x / canvas.width - mouseRef.current.x
        const dy = p.y / canvas.height - mouseRef.current.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 0.15) { p.x += dx * 0.5; p.y += dy * 0.5 }
        p.x += p.speedX; p.y += p.speedY
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(201,168,76,${p.opacity})`
        ctx.fill()
      })
      animId = requestAnimationFrame(draw)
    }
    draw()

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX / canvas.width, y: e.clientY / canvas.height }
      if (lirRef.current) {
        const x = (e.clientX / window.innerWidth  - 0.5) * 20
        const y = (e.clientY / window.innerHeight - 0.5) * 10
        lirRef.current.style.transform = `translateY(calc(-50% + ${y}px)) rotate(${x * 0.3}deg)`
      }
    }
    window.addEventListener('mousemove', onMouseMove)
    const onResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(27,58,107,0.4)_0%,transparent_60%),radial-gradient(ellipse_at_70%_30%,rgba(201,168,76,0.08)_0%,transparent_50%)] bg-bg" />
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Content — centered on mobile, offset right on desktop */}
      <div className="relative z-10 text-center max-w-4xl px-6 md:px-10 md:mr-[280px]">
        <p className="text-[10px] md:text-[11px] tracking-[4px] md:tracking-[5px] uppercase text-gold mb-6 md:mb-8 opacity-0 animate-fade-up"
          style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
          {tr.hero.badge}
        </p>
        <h1 className="font-cormorant text-[clamp(48px,10vw,110px)] font-light leading-[0.95] tracking-tight mb-4 opacity-0 animate-fade-up"
          style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
          {tr.hero.title1} <em className="italic text-gold">{tr.hero.title2}</em><br />{tr.hero.title3}
        </h1>
        <p className="font-cormorant text-[clamp(16px,2.5vw,26px)] font-light italic text-cream/50 mb-10 md:mb-14 opacity-0 animate-fade-up"
          style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}>
          {tr.hero.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center opacity-0 animate-fade-up"
          style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}>
          <a href="#trial"   className="btn-primary">{tr.hero.cta1}</a>
          <a href="#courses" className="btn-secondary">{tr.hero.cta2}</a>
        </div>
      </div>

      {/* Floating Grand Piano — hidden on mobile */}
      <div ref={lirRef}
        className="hidden md:block absolute right-[8%] top-1/2 w-56 lg:w-72 opacity-0 animate-[fadeIn_1.5s_ease_1s_forwards] z-10 transition-transform duration-100"
        style={{ transform: 'translateY(-50%)' }}>
        <svg className="w-full animate-float drop-shadow-[0_0_40px_rgba(201,168,76,0.3)]"
          viewBox="0 0 300 380" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="glow"><feGaussianBlur stdDeviation="4" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e8d080"/><stop offset="50%" stopColor="#C9A84C"/><stop offset="100%" stopColor="#8a6a20"/>
            </linearGradient>
            <radialGradient id="glowBg" cx="50%" cy="45%">
              <stop offset="0%" stopColor="rgba(201,168,76,0.12)"/><stop offset="100%" stopColor="transparent"/>
            </radialGradient>
          </defs>

          {/* Background glow */}
          <ellipse cx="150" cy="200" rx="135" ry="155" fill="url(#glowBg)"/>

          {/* Grand piano body — characteristic D-shape viewed from above-front */}
          <path d="M55 270 L55 165 Q55 65 155 55 Q255 55 265 155 Q268 210 230 255 L55 270Z"
            stroke="url(#goldGrad)" strokeWidth="3" fill="rgba(201,168,76,0.04)" filter="url(#glow)"/>

          {/* Inner body detail */}
          <path d="M72 265 L72 172 Q72 82 155 73 Q240 73 250 158 Q252 205 216 246"
            stroke="url(#goldGrad)" strokeWidth="1.5" fill="none" opacity="0.4"/>

          {/* Open lid — top curve highlighted */}
          <path d="M55 165 Q55 65 155 55 Q255 55 265 155"
            stroke="url(#goldGrad)" strokeWidth="4" fill="none" filter="url(#glow)"/>

          {/* Lid support rod */}
          <line x1="192" y1="68" x2="198" y2="22" stroke="url(#goldGrad)" strokeWidth="2.5"/>
          <circle cx="198" cy="19" r="3.5" fill="url(#goldGrad)" opacity="0.9"/>

          {/* Keyboard casing */}
          <rect x="55" y="270" width="200" height="52"
            stroke="url(#goldGrad)" strokeWidth="2.5" fill="rgba(201,168,76,0.04)" filter="url(#glow)"/>

          {/* White key dividers — 10 keys */}
          {Array.from({length: 9}, (_, i) => (
            <line key={i}
              x1={75 + i * 20} y1={270}
              x2={75 + i * 20} y2={322}
              stroke="url(#goldGrad)" strokeWidth="0.8" opacity="0.5"/>
          ))}

          {/* Black keys — correct pattern: C# D# / F# G# A# / C# D# */}
          {[13, 33, 73, 93, 113, 153, 173].map((o, i) => (
            <rect key={i} x={61 + o} y={270} width="12" height="32"
              stroke="url(#goldGrad)" strokeWidth="1.5" fill="rgba(201,168,76,0.2)"/>
          ))}

          {/* Three legs */}
          <path d="M78 322 Q70 345 62 368" stroke="url(#goldGrad)" strokeWidth="3" strokeLinecap="round"/>
          <path d="M240 322 Q248 345 256 368" stroke="url(#goldGrad)" strokeWidth="3" strokeLinecap="round"/>
          <path d="M158 322 L156 368" stroke="url(#goldGrad)" strokeWidth="2.5" strokeLinecap="round"/>

          {/* Pedal lyre */}
          <path d="M118 365 Q157 375 196 365" stroke="url(#goldGrad)" strokeWidth="2" fill="none" opacity="0.7"/>
          {[132, 155, 178].map((x, i) => (
            <line key={i} x1={x} y1={365} x2={x} y2={372}
              stroke="url(#goldGrad)" strokeWidth="3.5" opacity="0.8" strokeLinecap="round"/>
          ))}

          {/* Animated sparkle dots */}
          {([[55,90,3],[265,130,4],[157,375,2.5]] as [number,number,number][]).map(([cx,cy,dur],i)=>(
            <circle key={i} cx={cx} cy={cy} r="2" fill="#C9A84C" opacity="0.4">
              <animate attributeName="opacity" values="0.4;0.9;0.4" dur={`${dur}s`} repeatCount="indefinite"/>
            </circle>
          ))}
        </svg>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0"
        style={{ animation: 'fadeIn 1s ease 1.5s forwards' }}>
        <div className="w-px h-10 md:h-12 bg-gradient-to-b from-gold to-transparent animate-pulse" />
        <span className="text-[10px] tracking-[3px] uppercase text-cream/40">{tr.hero.scroll}</span>
      </div>
    </section>
  )
}
