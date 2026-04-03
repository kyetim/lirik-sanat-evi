<div align="center">

# ♩ Lirik Sanat Evi

**Mersin Müzik Akademisi — Web Sitesi**  
*Mersin Music Academy — Official Website*

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=nextdotjs)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white)](https://supabase.com)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com)
[![License](https://img.shields.io/badge/License-Private-C9A84C?style=flat-square)](#)

---

*Müziğin dili, sanatın evi.*  
*Music's language, art's home.*

</div>

---

## 📋 İçindekiler / Table of Contents

- [Türkçe](#-türkçe)
  - [Proje Hakkında](#proje-hakkında)
  - [Özellikler](#özellikler)
  - [Teknoloji Yığını](#teknoloji-yığını)
  - [Proje Yapısı](#proje-yapısı)
  - [Kurulum](#kurulum)
  - [Ortam Değişkenleri](#ortam-değişkenleri)
  - [Deploy](#deploy)
- [English](#-english)
  - [About the Project](#about-the-project)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Project Structure](#project-structure)
  - [Getting Started](#getting-started)
  - [Environment Variables](#environment-variables)
  - [Deployment](#deployment)

---

## 🇹🇷 Türkçe

### Proje Hakkında

**Lirik Sanat Evi**, Mersin'in prestijli müzik akademisi için geliştirilmiş modern, tek sayfalık (SPA) bir tanıtım ve müşteri edinme web sitesidir. Akademinin hizmetlerini tanıtmak, deneme dersi taleplerini toplamak ve potansiyel öğrencilerle iletişim kurmak amacıyla tasarlanmıştır.

Site, minimal ve zarif bir tasarım anlayışıyla; altın, lacivert ve krem renk paleti üzerine inşa edilmiştir.

### Özellikler

| Özellik | Açıklama |
|---|---|
| 🌙 **Dark / Light Mod** | Kullanıcı tercihi localStorage'da saklanır |
| 🌐 **TR / EN Dil Desteği** | Tüm içerik çift dilli, Context API ile yönetilir |
| 🤖 **AI Chatbot** | n8n webhook + `@n8n/chat` entegrasyonu |
| 📋 **Deneme Dersi Formu** | react-hook-form + Supabase + n8n e-posta bildirimi |
| 📰 **Bülten Kaydı** | E-posta toplama, Supabase'e kayıt |
| 💬 **WhatsApp Butonu** | Hazır mesajlı doğrudan WhatsApp bağlantısı |
| 🎞 **Framer Motion** | Sayfa geçişleri, fade-up ve marquee animasyonları |
| 📱 **Tam Responsive** | Mobil öncelikli tasarım, tüm ekran boyutlarında uyumlu |
| ✦ **Özel Cursor** | Masaüstünde özel imleç animasyonu |
| ⚡ **App Router** | Next.js 14 App Router, SEO meta verileri |

**Sayfa Bölümleri:**
```
Hero → Hakkımızda → Dersler → Öğretmenler → Neden Lirik →
Öğrenci Yorumları → Fiyatlar → Deneme Dersi Formu → Bülten → Footer
```

### Teknoloji Yığını

| Katman | Teknoloji |
|---|---|
| **Framework** | [Next.js 14](https://nextjs.org) (App Router) |
| **Dil** | [TypeScript 5](https://www.typescriptlang.org) |
| **Stil** | [Tailwind CSS 3](https://tailwindcss.com) |
| **Animasyon** | [Framer Motion 12](https://www.framer.com/motion) |
| **Veritabanı** | [Supabase](https://supabase.com) (PostgreSQL) |
| **Form Yönetimi** | [React Hook Form 7](https://react-hook-form.com) |
| **Otomasyon** | [n8n](https://n8n.io) (webhook, e-posta bildirimi) |
| **Chatbot** | [@n8n/chat](https://www.npmjs.com/package/@n8n/chat) |
| **Deploy** | [Vercel](https://vercel.com) |

### Proje Yapısı

```
lirik-sanat-evi/
├── app/
│   ├── api/                    # Route Handlers
│   │   ├── newsletter/         # Bülten kayıt endpoint'i
│   │   └── trial/              # Deneme dersi form endpoint'i
│   ├── fonts/                  # Yerel font dosyaları
│   ├── globals.css             # Global stiller, tema değişkenleri
│   ├── layout.tsx              # Root layout, metadata, N8nChat
│   └── page.tsx                # Ana sayfa
│
├── components/
│   ├── layout/
│   │   └── Navbar.tsx          # Navigasyon, tema & dil toggle
│   ├── sections/
│   │   ├── Hero.tsx            # Hero bölümü
│   │   ├── HomeContent.tsx     # Tüm bölümlerin birleştiği ana bileşen
│   │   ├── NewsletterForm.tsx  # Bülten formu
│   │   └── TrialForm.tsx       # Deneme dersi formu
│   └── ui/
│       ├── Cursor.tsx          # Özel imleç
│       ├── N8nChat.tsx         # AI chatbot widget
│       └── WhatsAppButton.tsx  # WhatsApp kayan butonu
│
├── contexts/
│   ├── ThemeContext.tsx         # Dark/light mod yönetimi
│   └── LanguageContext.tsx     # TR/EN dil yönetimi
│
├── lib/
│   └── translations.ts         # Tüm TR/EN metin içerikleri
│
└── components/Providers.tsx    # ThemeProvider + LanguageProvider wrapper
```

### Kurulum

**Gereksinimler:** Node.js 18+, npm

```bash
# 1. Repoyu klonlayın
git clone https://github.com/kyetim/lirik-sanat-evi.git
cd lirik-sanat-evi

# 2. Bağımlılıkları yükleyin
npm install

# 3. Ortam değişkenlerini ayarlayın
cp .env.example .env.local
# .env.local dosyasını doldurun (aşağıya bakın)

# 4. Geliştirme sunucusunu başlatın
npm run dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

```bash
npm run build    # Production build
npm run start    # Production sunucusu
npm run lint     # ESLint kontrolü
```

### Ortam Değişkenleri

`.env.local` dosyası oluşturun:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# n8n Webhook (deneme dersi e-posta bildirimi)
N8N_TRIAL_WEBHOOK_URL=https://your-n8n-instance/webhook/your-webhook-id
```

> **Not:** `NEXT_PUBLIC_` önekli değişkenler tarayıcıda görünür. Gizli anahtarları bu şekilde isimlendirmeyin.

### Deploy

Proje **Vercel** üzerinde otomatik deploy ile yapılandırılmıştır:

- `main` branch'e her push → otomatik production deployment
- PR açıldığında → preview deployment oluşturulur

```bash
# Manuel deploy (Vercel CLI)
npm i -g vercel
vercel --prod
```

---

## 🇬🇧 English

### About the Project

**Lirik Sanat Evi** is a modern, single-page marketing and lead-generation website built for a prestigious music academy in Mersin, Turkey. It is designed to showcase the academy's services, collect free trial lesson requests, and facilitate communication with prospective students.

The site follows a minimal, elegant design language built on a gold, navy, and cream colour palette.

### Features

| Feature | Description |
|---|---|
| 🌙 **Dark / Light Mode** | User preference persisted in localStorage |
| 🌐 **TR / EN Language** | All content is bilingual, managed via Context API |
| 🤖 **AI Chatbot** | n8n webhook + `@n8n/chat` integration |
| 📋 **Trial Lesson Form** | react-hook-form + Supabase + n8n email notification |
| 📰 **Newsletter Signup** | Email collection, saved to Supabase |
| 💬 **WhatsApp Button** | Direct WhatsApp link with a pre-filled message |
| 🎞 **Framer Motion** | Page transitions, fade-up and marquee animations |
| 📱 **Fully Responsive** | Mobile-first design, adapted for all screen sizes |
| ✦ **Custom Cursor** | Animated custom cursor on desktop |
| ⚡ **App Router** | Next.js 14 App Router with SEO metadata |

**Page Sections:**
```
Hero → About → Courses → Teachers → Why Lirik →
Testimonials → Pricing → Trial Lesson Form → Newsletter → Footer
```

### Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 14](https://nextjs.org) (App Router) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org) |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com) |
| **Animation** | [Framer Motion 12](https://www.framer.com/motion) |
| **Database** | [Supabase](https://supabase.com) (PostgreSQL) |
| **Form Management** | [React Hook Form 7](https://react-hook-form.com) |
| **Automation** | [n8n](https://n8n.io) (webhook, email notification) |
| **Chatbot** | [@n8n/chat](https://www.npmjs.com/package/@n8n/chat) |
| **Deployment** | [Vercel](https://vercel.com) |

### Project Structure

```
lirik-sanat-evi/
├── app/
│   ├── api/                    # Route Handlers
│   │   ├── newsletter/         # Newsletter subscription endpoint
│   │   └── trial/              # Trial lesson form endpoint
│   ├── fonts/                  # Local font files
│   ├── globals.css             # Global styles, CSS theme variables
│   ├── layout.tsx              # Root layout, metadata, N8nChat
│   └── page.tsx                # Home page
│
├── components/
│   ├── layout/
│   │   └── Navbar.tsx          # Navigation, theme & language toggles
│   ├── sections/
│   │   ├── Hero.tsx            # Hero section
│   │   ├── HomeContent.tsx     # Main component composing all sections
│   │   ├── NewsletterForm.tsx  # Newsletter form
│   │   └── TrialForm.tsx       # Trial lesson form
│   └── ui/
│       ├── Cursor.tsx          # Custom cursor
│       ├── N8nChat.tsx         # AI chatbot widget
│       └── WhatsAppButton.tsx  # Floating WhatsApp button
│
├── contexts/
│   ├── ThemeContext.tsx         # Dark/light mode management
│   └── LanguageContext.tsx     # TR/EN language management
│
├── lib/
│   └── translations.ts         # All TR/EN text content
│
└── components/Providers.tsx    # ThemeProvider + LanguageProvider wrapper
```

### Getting Started

**Requirements:** Node.js 18+, npm

```bash
# 1. Clone the repository
git clone https://github.com/kyetim/lirik-sanat-evi.git
cd lirik-sanat-evi

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Fill in .env.local (see below)

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

```bash
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint check
```

### Environment Variables

Create a `.env.local` file:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# n8n Webhook (trial lesson email notification)
N8N_TRIAL_WEBHOOK_URL=https://your-n8n-instance/webhook/your-webhook-id
```

> **Note:** Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Do not name secret keys this way.

### Deployment

The project is configured for **automatic deployment on Vercel**:

- Every push to `main` → automatic production deployment
- On pull request open → preview deployment is created

```bash
# Manual deploy via Vercel CLI
npm i -g vercel
vercel --prod
```

---

<div align="center">

**Lirik Sanat Evi** · Mersin, Türkiye  
[info@liriksanatevi.com](mailto:info@liriksanatevi.com) · [Instagram](https://instagram.com/liriksanatevi) · [YouTube](https://youtube.com/@liriksanatevi)

*© 2025 Lirik Sanat Evi. Tüm hakları saklıdır. / All rights reserved.*

</div>
