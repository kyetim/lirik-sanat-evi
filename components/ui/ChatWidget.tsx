'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/contexts/ThemeContext'

const WEBHOOK_URL =
  'https://kyetim.app.n8n.cloud/webhook/1e0da13d-a16b-47d1-a347-46c5acab0407/chat'

type Role = 'bot' | 'user'
interface Msg {
  id: string
  role: Role
  text: string
}

const INITIAL_MSGS: Msg[] = [
  { id: 'i1', role: 'bot', text: 'Merhaba! 🎵' },
  {
    id: 'i2',
    role: 'bot',
    text: 'Ben Lirik Sanat Evi asistanıyım. Dersler, fiyatlar veya deneme dersi hakkında soru sorabilirsiniz.',
  },
]

function uid() {
  return Math.random().toString(36).slice(2) + Date.now()
}

/* ── İkonlar ── */
function IconChat() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}
function IconX() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}
function IconSend() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  )
}
function IconRefresh() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1 4 1 10 7 10" />
      <path d="M3.51 15a9 9 0 1 0 .49-3.36" />
    </svg>
  )
}

/* ── Typing dots ── */
function TypingDots({ dark }: { dark: boolean }) {
  return (
    <div className="flex justify-start">
      <div
        className="px-4 py-3 max-w-[82%]"
        style={{
          background: dark ? '#111111' : '#f0ead8',
          border: `1px solid ${dark ? 'rgba(201,168,76,0.12)' : 'rgba(201,168,76,0.22)'}`,
        }}
      >
        <div className="flex gap-1.5 items-center h-4">
          {[0, 0.18, 0.36].map((delay, i) => (
            <motion.span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-gold"
              animate={{ opacity: [0.25, 1, 0.25], scale: [0.8, 1.1, 0.8] }}
              transition={{ repeat: Infinity, duration: 1.1, delay }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Ana bileşen ── */
export default function ChatWidget() {
  const { theme } = useTheme()
  const dark = theme === 'dark'

  const [open, setOpen]       = useState(false)
  const [msgs, setMsgs]       = useState<Msg[]>(INITIAL_MSGS)
  const [input, setInput]     = useState('')
  const [loading, setLoading] = useState(false)

  const sessionId   = useRef(uid())
  const bottomRef   = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  /* Scroll to bottom */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs, loading])

  /* Focus input on open */
  useEffect(() => {
    if (open) setTimeout(() => textareaRef.current?.focus(), 280)
  }, [open])

  /* Send mesajı */
  const send = async () => {
    const text = input.trim()
    if (!text || loading) return

    setInput('')
    setMsgs(m => [...m, { id: uid(), role: 'user', text }])
    setLoading(true)

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'sendMessage',
          chatInput: text,
          sessionId: sessionId.current,
        }),
      })
      const data = await res.json()
      const reply =
        data?.output ?? data?.text ?? data?.message ?? 'Bir sorun oluştu, lütfen tekrar deneyin.'
      setMsgs(m => [...m, { id: uid(), role: 'bot', text: reply }])
    } catch {
      setMsgs(m => [
        ...m,
        { id: uid(), role: 'bot', text: 'Bağlantı hatası. Lütfen tekrar deneyin.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  const resetChat = () => {
    sessionId.current = uid()
    setMsgs(INITIAL_MSGS)
    setInput('')
  }

  /* ── Tema renkleri ── */
  const c = {
    windowBg:    dark ? '#0a0a0a'                        : '#faf9f6',
    headerBg:    dark ? '#0d1b2e'                        : '#e8e2d5',
    headerBorder:dark ? 'rgba(201,168,76,0.15)'          : 'rgba(201,168,76,0.28)',
    title:       dark ? '#f0ead8'                        : '#1a1208',
    subtitle:    dark ? 'rgba(240,234,216,0.55)'         : 'rgba(26,18,8,0.52)',
    msgsBg:      dark ? '#0a0a0a'                        : '#faf9f6',
    botBg:       dark ? '#111111'                        : '#f0ead8',
    botBorder:   dark ? 'rgba(201,168,76,0.12)'          : 'rgba(201,168,76,0.22)',
    botText:     dark ? '#f0ead8'                        : '#1a1208',
    inputAreaBg: dark ? '#060606'                        : '#ede7d4',
    inputAreaBorder: dark ? 'rgba(201,168,76,0.13)'     : 'rgba(201,168,76,0.25)',
    inputBg:     dark ? 'rgba(255,255,255,0.05)'         : 'rgba(0,0,0,0.05)',
    inputBorder: dark ? 'rgba(201,168,76,0.2)'           : 'rgba(201,168,76,0.32)',
    inputFocus:  dark ? 'rgba(201,168,76,0.5)'           : 'rgba(201,168,76,0.65)',
    inputText:   dark ? '#f0ead8'                        : '#1a1208',
    inputPh:     dark ? 'rgba(240,234,216,0.35)'         : 'rgba(26,18,8,0.38)',
    winBorder:   dark ? 'rgba(201,168,76,0.18)'          : 'rgba(201,168,76,0.28)',
    winShadow:   dark ? '0 20px 70px rgba(0,0,0,0.65)'  : '0 20px 70px rgba(0,0,0,0.18)',
  }

  return (
    <>
      {/* ── Backdrop (mobile) ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[151] sm:hidden"
            style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(2px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Chat penceresi ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="window"
            className="fixed z-[155] flex flex-col overflow-hidden
              /* mobile: bottom sheet */
              bottom-0 left-0 right-0 rounded-t-2xl
              /* desktop */
              sm:bottom-[164px] sm:right-6 sm:left-auto sm:rounded-none sm:w-[390px]"
            style={{
              height: 'min(520px, 72dvh)',
              background: c.windowBg,
              border: `1px solid ${c.winBorder}`,
              boxShadow: c.winShadow,
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4 flex-shrink-0"
              style={{
                background: c.headerBg,
                borderBottom: `1px solid ${c.headerBorder}`,
              }}
            >
              {/* Sol: başlık + yardımcı ikon */}
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(201,168,76,0.15)', color: '#C9A84C' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.557 1.522 4.82 3.889 6.1-.388 1.32-.828 2.395-1.278 3.285 1.714-.688 3.393-1.695 4.64-2.58C10.72 17 11.35 17 12 17c4.97 0 9-3.186 9-7.115S16.97 3 12 3z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium tracking-wide" style={{ color: c.title }}>
                    Lirik Sanat Evi
                  </p>
                  <p className="text-[11px] mt-0.5" style={{ color: c.subtitle }}>
                    Size nasıl yardımcı olabiliriz?
                  </p>
                </div>
              </div>

              {/* Sağ: aksiyon butonları */}
              <div className="flex items-center gap-3">
                <button
                  onClick={resetChat}
                  title="Yeni konuşma başlat"
                  className="transition-opacity hover:opacity-100 opacity-60"
                  style={{ color: c.title }}
                >
                  <IconRefresh />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="transition-opacity hover:opacity-100 opacity-60"
                  style={{ color: c.title }}
                >
                  <IconX />
                </button>
              </div>
            </div>

            {/* Mesajlar */}
            <div
              className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-3"
              style={{ background: c.msgsBg }}
            >
              {msgs.map(msg => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className="max-w-[82%] px-4 py-2.5 text-[0.875rem] leading-relaxed"
                    style={
                      msg.role === 'user'
                        ? { background: '#C9A84C', color: '#0a0a0a' }
                        : {
                            background: c.botBg,
                            color: c.botText,
                            border: `1px solid ${c.botBorder}`,
                          }
                    }
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {loading && <TypingDots dark={dark} />}

              <div ref={bottomRef} />
            </div>

            {/* Input alanı */}
            <div
              className="flex-shrink-0 px-4 py-3"
              style={{
                background: c.inputAreaBg,
                borderTop: `1px solid ${c.inputAreaBorder}`,
              }}
            >
              <div className="flex items-end gap-2.5">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Mesajınızı yazın..."
                  rows={1}
                  disabled={loading}
                  className="chat-textarea flex-1 resize-none text-[0.875rem] leading-relaxed outline-none transition-colors duration-200 disabled:opacity-50 px-3 py-2.5"
                  style={{
                    background: c.inputBg,
                    color: c.inputText,
                    border: `1px solid ${c.inputBorder}`,
                    maxHeight: '120px',
                    overflowY: 'auto',
                  }}
                  onFocus={e =>
                    (e.target.style.borderColor = c.inputFocus)
                  }
                  onBlur={e =>
                    (e.target.style.borderColor = c.inputBorder)
                  }
                />
                <button
                  onClick={send}
                  disabled={!input.trim() || loading}
                  className="flex-shrink-0 flex items-center justify-center transition-all duration-200
                    disabled:opacity-35 disabled:cursor-not-allowed hover:opacity-85 mb-0.5"
                  style={{
                    width: 38,
                    height: 38,
                    background: '#C9A84C',
                    color: '#0a0a0a',
                  }}
                >
                  <IconSend />
                </button>
              </div>
              <p
                className="text-[10px] mt-2 tracking-wide"
                style={{ color: c.subtitle }}
              >
                Enter ile gönderin · Shift+Enter yeni satır
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Toggle butonu ── */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        className="fixed z-[160] flex items-center justify-center
          bottom-[92px] right-6"
        style={{
          width: 52,
          height: 52,
          background: '#C9A84C',
          color: '#0a0a0a',
          boxShadow: open
            ? '0 6px 28px rgba(201,168,76,0.55)'
            : '0 4px 20px rgba(201,168,76,0.38)',
        }}
        whileHover={{ y: -2, boxShadow: '0 8px 32px rgba(201,168,76,0.6)' }}
        whileTap={{ scale: 0.93 }}
        aria-label={open ? 'Sohbeti kapat' : 'Asistanla sohbet et'}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="x"
              initial={{ rotate: -80, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 80, opacity: 0 }}
              transition={{ duration: 0.16 }}
            >
              <IconX />
            </motion.span>
          ) : (
            <motion.span
              key="chat"
              initial={{ rotate: 80, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -80, opacity: 0 }}
              transition={{ duration: 0.16 }}
            >
              <IconChat />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  )
}
