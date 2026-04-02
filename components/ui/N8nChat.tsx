'use client'

import { useEffect } from 'react'

export default function N8nChat() {
  useEffect(() => {
    // CSS'i yükle
    const link = document.createElement('link')
    link.href = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css'
    link.rel = 'stylesheet'
    document.head.appendChild(link)

    // Tema override stili — siteyle uyumlu koyu altın tema
    const style = document.createElement('style')
    style.textContent = `
      /* Renk değişkenleri */
      :root {
        --chat--color-primary:              #C9A84C;
        --chat--color-primary-shade-50:     #d4b358;
        --chat--color-primary-shade-100:    #b89340;
        --chat--color-secondary:            #0d1b2e;
        --chat--color-background:           #0a0a0a;
        --chat--color-font:                 #f0ead8;

        --chat--window--width:              360px;
        --chat--window--height:             500px;

        --chat--header--background:         #0d1b2e;
        --chat--header--color:              #f0ead8;
        --chat--heading--font-size:         1rem;
        --chat--subtitle--font-size:        0.75rem;
        --chat--subtitle--line-height:      1.4;

        --chat--message--bot--background:   #111111;
        --chat--message--bot--color:        #f0ead8;
        --chat--message--user--background:  #C9A84C;
        --chat--message--user--color:       #0a0a0a;
        --chat--message--pre--background:   #1a1a1a;

        --chat--textarea--height:           50px;
        --chat--input--background:          rgba(255,255,255,0.05);
        --chat--input--border-bottom:       1px solid rgba(201,168,76,0.3);
        --chat--input--placeholder--color:  rgba(240,234,216,0.4);

        --chat--toggle--background:         #C9A84C;
        --chat--toggle--hover--background:  #d4b358;
        --chat--toggle--active--background: #b89340;
        --chat--toggle--color:              #0a0a0a;
        --chat--toggle--size:               52px;
      }

      /* WhatsApp butonunun üzerine binmemesi için yukarı taşı */
      .n8n-chat .chat-toggle {
        bottom: 90px !important;
        right: 20px !important;
        border-radius: 0 !important;
        box-shadow: 0 4px 20px rgba(201,168,76,0.35) !important;
      }
      .n8n-chat .chat-window {
        bottom: 155px !important;
        right: 20px !important;
        border-radius: 0 !important;
        border: 1px solid rgba(201,168,76,0.2) !important;
        box-shadow: 0 8px 40px rgba(0,0,0,0.6) !important;
      }
      .n8n-chat .chat-message-typing {
        background: #111111 !important;
      }
      .n8n-chat .chat-input {
        background: rgba(255,255,255,0.03) !important;
        border-top: 1px solid rgba(201,168,76,0.15) !important;
      }
    `
    document.head.appendChild(style)

    // Chat widget'ı başlat
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
  }, [])

  return null
}
