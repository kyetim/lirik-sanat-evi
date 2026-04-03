'use client'

import { useEffect } from 'react'
import { useTheme } from '@/contexts/ThemeContext'

function buildStyles(theme: 'dark' | 'light') {
  const dark = theme === 'dark'

  // Dark tema renkleri
  const bg           = dark ? '#0a0a0a'              : '#faf9f6'
  const surface      = dark ? '#111111'              : '#f0ead8'
  const headerBg     = dark ? '#0d1b2e'              : '#e8e2d5'
  const fontColor    = dark ? '#f0ead8'              : '#1a1208'
  const inputBg      = dark ? 'rgba(255,255,255,0.05)': 'rgba(0,0,0,0.04)'
  const inputBgHover = dark ? 'rgba(255,255,255,0.08)': 'rgba(0,0,0,0.07)'
  const inputBorder  = dark ? 'rgba(201,168,76,0.3)' : 'rgba(201,168,76,0.4)'
  const placeholder  = dark ? 'rgba(240,234,216,0.4)': 'rgba(26,18,8,0.4)'
  const msgPreBg     = dark ? '#1a1a1a'              : '#ede7d4'
  const borderColor  = dark ? 'rgba(201,168,76,0.2)' : 'rgba(201,168,76,0.35)'
  const shadow       = dark ? '0 8px 40px rgba(0,0,0,0.6)': '0 8px 40px rgba(0,0,0,0.18)'
  const inputBarBg   = dark ? 'rgba(255,255,255,0.03)': 'rgba(0,0,0,0.03)'
  const inputTopBorder = dark ? 'rgba(201,168,76,0.15)': 'rgba(201,168,76,0.25)'

  return `
    /* ── N8n Chat — tema değişkenleri ── */
    :root {
      --chat--color-primary:              #C9A84C;
      --chat--color-primary-shade-50:     #d4b358;
      --chat--color-primary-shade-100:    #b89340;
      --chat--color-secondary:            ${headerBg};

      --chat--color-background:           ${bg};
      --chat--color-font:                 ${fontColor};

      /* Pencere boyutu */
      --chat--window--width:              400px;
      --chat--window--height:             520px;

      /* Header */
      --chat--header--background:         ${headerBg};
      --chat--header--color:              ${fontColor};
      --chat--heading--font-size:         1rem;
      --chat--subtitle--font-size:        0.8rem;
      --chat--subtitle--line-height:      1.5;

      /* Mesaj baloncukları */
      --chat--message--bot--background:   ${surface};
      --chat--message--bot--color:        ${fontColor};
      --chat--message--user--background:  #C9A84C;
      --chat--message--user--color:       #0a0a0a;
      --chat--message--pre--background:   ${msgPreBg};
      --chat--message--font-size:         0.9rem;
      --chat--message--line-height:       1.65;
      --chat--message--bot--border:       1px solid ${borderColor};

      /* Input alanı */
      --chat--textarea--height:           52px;
      --chat--input--background:          ${inputBg};
      --chat--input--border-bottom:       1px solid ${inputBorder};
      --chat--input--placeholder--color:  ${placeholder};
      --chat--input--font-size:           0.9rem;

      /* Toggle butonu */
      --chat--toggle--background:         #C9A84C;
      --chat--toggle--hover--background:  #d4b358;
      --chat--toggle--active--background: #b89340;
      --chat--toggle--color:              #0a0a0a;
      --chat--toggle--size:               52px;
    }

    /* ── Toggle butonu konumu — WhatsApp'ın üzerinde ── */
    .chat-toggle,
    .n8n-chat .chat-toggle,
    [class*="chat-toggle"] {
      bottom: 92px !important;
      right: 20px !important;
      border-radius: 0 !important;
      box-shadow: 0 4px 20px rgba(201,168,76,0.35) !important;
      transition: background 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease !important;
    }
    .chat-toggle:hover,
    .n8n-chat .chat-toggle:hover {
      transform: translateY(-2px) !important;
      box-shadow: 0 6px 28px rgba(201,168,76,0.5) !important;
    }

    /* ── Chat penceresi ── */
    .chat-window,
    .n8n-chat .chat-window,
    [class*="chat-window"] {
      bottom: 158px !important;
      right: 20px !important;
      border-radius: 2px !important;
      border: 1px solid ${borderColor} !important;
      box-shadow: ${shadow} !important;
      font-family: 'Inter', system-ui, sans-serif !important;
    }

    /* Header */
    .chat-window .chat-header,
    .n8n-chat .chat-header {
      padding: 18px 20px !important;
      border-bottom: 1px solid ${inputBorder} !important;
    }

    /* Mesaj listesi alanı — okunabilirlik için padding */
    .chat-window .chat-messages,
    .chat-messages-list,
    .n8n-chat .chat-messages {
      padding: 20px 16px !important;
      gap: 12px !important;
    }

    /* Mesaj baloncukları */
    .chat-message,
    .n8n-chat .chat-message {
      max-width: 82% !important;
      padding: 12px 16px !important;
      line-height: 1.65 !important;
      font-size: 0.9rem !important;
    }

    /* Bot mesaj arka planı */
    .chat-message.chat-message--from-bot,
    .n8n-chat .chat-message--from-bot {
      background: ${surface} !important;
      color: ${fontColor} !important;
      border: 1px solid ${borderColor} !important;
    }

    /* Typing indicator */
    .chat-message-typing,
    .n8n-chat .chat-message-typing {
      background: ${surface} !important;
      border: 1px solid ${borderColor} !important;
    }

    /* Input satırı */
    .chat-input,
    .n8n-chat .chat-input {
      background: ${inputBarBg} !important;
      border-top: 1px solid ${inputTopBorder} !important;
      padding: 12px 16px !important;
    }
    .chat-input textarea,
    .n8n-chat .chat-input textarea {
      background: ${inputBg} !important;
      color: ${fontColor} !important;
      font-size: 0.9rem !important;
      line-height: 1.5 !important;
      padding: 10px 14px !important;
      border-radius: 2px !important;
    }
    .chat-input textarea:hover {
      background: ${inputBgHover} !important;
    }

    /* Gönder butonu */
    .chat-input button[type="submit"],
    .n8n-chat .chat-input button {
      color: #C9A84C !important;
      transition: opacity 0.2s ease !important;
    }
    .chat-input button[type="submit"]:hover {
      opacity: 0.75 !important;
    }

    /* ── Responsive — mobil ── */
    @media (max-width: 640px) {
      .chat-window,
      .n8n-chat .chat-window,
      [class*="chat-window"] {
        width: calc(100vw - 24px) !important;
        right: 12px !important;
        left: 12px !important;
        bottom: 80px !important;
        max-height: 62vh !important;
      }
      .chat-toggle,
      .n8n-chat .chat-toggle,
      [class*="chat-toggle"] {
        bottom: 16px !important;
        right: 16px !important;
      }
    }
    @media (max-width: 400px) {
      .chat-window,
      .n8n-chat .chat-window,
      [class*="chat-window"] {
        max-height: 58vh !important;
      }
    }
  `
}

export default function N8nChat() {
  const { theme } = useTheme()

  useEffect(() => {
    const link = document.createElement('link')
    link.href = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css'
    link.rel = 'stylesheet'
    document.head.appendChild(link)

    const style = document.createElement('style')
    style.id = 'n8n-chat-custom-style'
    style.textContent = buildStyles(theme)
    document.head.appendChild(style)

    const script = document.createElement('script')
    script.type = 'module'
    script.textContent = `
      import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';
      createChat({
        webhookUrl: 'https://kyetim.app.n8n.cloud/webhook/1e0da13d-a16b-47d1-a347-46c5acab0407/chat',
        initialMessages: [
          'Merhaba! 🎵',
          'Ben Lirik Sanat Evi asistanıyım. Dersler, fiyatlar veya deneme dersi hakkında soru sorabilirsiniz.'
        ],
        i18n: {
          en: {
            title: 'Lirik Sanat Evi',
            subtitle: 'Size nasıl yardımcı olabiliriz?',
            footer: '',
            getStarted: 'Yeni Konuşma Başlat',
            inputPlaceholder: 'Mesajınızı yazın...',
            closeButtonTooltip: 'Kapat',
          },
        },
      });
    `
    document.body.appendChild(script)

    return () => {
      if (document.head.contains(link)) document.head.removeChild(link)
      if (document.head.contains(style)) document.head.removeChild(style)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Tema değiştiğinde stil elementini güncelle
  useEffect(() => {
    const style = document.getElementById('n8n-chat-custom-style')
    if (style) {
      style.textContent = buildStyles(theme)
    }
  }, [theme])

  return null
}
