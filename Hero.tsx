'use client'
import { useEffect, useRef } from 'react'

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const lirRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5 + 0.3,
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
        p.x += p.speedX
        p.y += p.speedY
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
        const x = (e.clientX / window.innerWidth - 0.5) * 20
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
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(27,58,107,0.4)_0%,transparent_60%),radial-gradient(ellipse_at_70%_30%,rgba(201,168,76,0.08)_0%,transparent_50%)] bg-[#0a0a0a]" />
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl px-10" style={{ marginRight: '280px' }}>
        <p className="text-[10px] tracking-[5px] uppercase text-gold mb-8 opacity-0 animate-fade-up" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
          Mersin Müzik Akademisi
        </p>
        <h1 className="font-cormorant text-[clamp(56px,9vw,110px)] font-light leading-[0.95] tracking-tight mb-4 opacity-0 animate-fade-up"
          style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
          Müziğin <em className="italic text-gold">dili,</em><br />sanatın evi.
        </h1>
        <p className="font-cormorant text-[clamp(18px,2.5vw,26px)] font-light italic text-cream/50 mb-14 opacity-0 animate-fade-up"
          style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}>
          Her insan bir melodi taşır
        </p>
        <div className="flex gap-5 justify-center opacity-0 animate-fade-up" style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}>
          <a href="#trial" className="btn-primary">Deneme Dersi Al</a>
          <a href="#courses" className="btn-secondary">Derslerimizi Keşfet</a>
        </div>
      </div>

      {/* Floating Lir */}
      <div ref={lirRef} className="absolute right-[8%] top-1/2 w-72 opacity-0 animate-[fadeIn_1.5s_ease_1s_forwards] z-10 transition-transform duration-100"
        style={{ transform: 'translateY(-50%)' }}>
        <svg className="w-full animate-float drop-shadow-[0_0_40px_rgba(201,168,76,0.3)]"
          viewBox="0 0 300 380" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="glow"><feGaussianBlur stdDeviation="4" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e8d080"/><stop offset="50%" stopColor="#C9A84C"/><stop offset="100%" stopColor="#8a6a20"/>
            </linearGradient>
            <radialGradient id="glowBg" cx="50%" cy="50%">
              <stop offset="0%" stopColor="rgba(201,168,76,0.1)"/><stop offset="100%" stopColor="transparent"/>
            </radialGradient>
          </defs>
          <ellipse cx="150" cy="190" rx="140" ry="160" fill="url(#glowBg)"/>
          <path d="M95 280 Q50 240 50 160 Q50 60 150 50 Q250 60 250 160 Q250 240 205 280" stroke="url(#goldGrad)" strokeWidth="4" fill="none" filter="url(#glow)"/>
          <path d="M120 270 Q90 235 90 160 Q90 90 150 80 Q210 90 210 160 Q210 235 180 270" stroke="url(#goldGrad)" strokeWidth="2" fill="none" opacity="0.6"/>
          {[108,126,144,162,180,198].map((x, i) => (
            <line key={i} x1={x} y1={290 - Math.abs(i-2.5)*8} x2={x} y2={120 - Math.abs(i-2.5)*6} stroke="url(#goldGrad)" strokeWidth="1.5" opacity="0.8"/>
          ))}
          <path d="M95 285 Q150 310 205 285" stroke="url(#goldGrad)" strokeWidth="3.5" fill="none" filter="url(#glow)"/>
          <circle cx="150" cy="50" r="12" fill="none" stroke="url(#goldGrad)" strokeWidth="3" filter="url(#glow)"/>
          <circle cx="150" cy="50" r="5" fill="url(#goldGrad)"/>
          <path d="M50 160 Q35 150 40 135 Q45 125 55 130" stroke="url(#goldGrad)" strokeWidth="2.5" fill="none"/>
          <path d="M250 160 Q265 150 260 135 Q255 125 245 130" stroke="url(#goldGrad)" strokeWidth="2.5" fill="none"/>
          {[[70,100,3],[230,80,4],[150,330,2.5]].map(([cx,cy,dur],i)=>(
            <circle key={i} cx={cx} cy={cy} r="2" fill="#C9A84C" opacity="0.4">
              <animate attributeName="opacity" values="0.4;0.9;0.4" dur={`${dur}s`} repeatCount="indefinite"/>
            </circle>
          ))}
        </svg>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0"
        style={{ animation: 'fadeIn 1s ease 1.5s forwards' }}>
        <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent animate-pulse" />
        <span className="text-[9px] tracking-[3px] uppercase text-cream/40">Kaydır</span>
      </div>
    </section>
  )
}
