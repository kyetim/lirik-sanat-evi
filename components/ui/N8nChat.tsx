'use client'

import { useEffect } from 'react'

export default function N8nChat() {
  useEffect(() => {
    // CSS'i yükle
    const link = document.createElement('link')
    link.href = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css'
    link.rel = 'stylesheet'
    document.head.appendChild(link)

    // Chat widget'ı başlat
    const script = document.createElement('script')
    script.type = 'module'
    script.textContent = `
      import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';
      createChat({
        webhookUrl: 'https://kyetim.app.n8n.cloud/webhook/1e0da13d-a16b-47d1-a347-46c5acab0407/chat',
        initialMessages: [
          'Merhaba! 👋',
          'Ben Lirik Sanat Evi asistanıyım. Size nasıl yardımcı olabilirim?'
        ],
        i18n: {
          en: {
            title: 'Lirik Sanat Evi',
            subtitle: 'Derslerimiz hakkında bilgi alın',
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
      if (document.head.contains(link)) {
        document.head.removeChild(link)
      }
    }
  }, [])

  return null
}
