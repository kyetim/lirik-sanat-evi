import type { Metadata } from 'next'
import './globals.css'
import Providers from '@/components/Providers'

export const metadata: Metadata = {
  title: 'Lirik Sanat Evi — Mersin Müzik Akademisi',
  description: 'Mersin\'in prestijli müzik akademisi. Piyano, Keman, Gitar ve daha fazlası. 5 yaşından yetişkinlere özel müzik eğitimi.',
  keywords: 'müzik akademisi, müzik kursu, piyano kursu, keman kursu, Mersin, müzik eğitimi',
  openGraph: {
    title: 'Lirik Sanat Evi — Mersin Müzik Akademisi',
    description: 'Müziğin dili, sanatın evi.',
    locale: 'tr_TR',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
