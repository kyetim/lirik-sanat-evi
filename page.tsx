import Navbar from '@/components/layout/Navbar'
import Cursor from '@/components/ui/Cursor'
import Hero from '@/components/sections/Hero'
import TrialForm from '@/components/sections/TrialForm'

// Marquee items
const INSTRUMENTS = ['Piyano', 'Keman', 'Gitar', 'Viyola', 'Müzik Teorisi', 'Solfej', 'Klasik Müzik', 'Çocuk Müziği']

const COURSES = [
  { icon: '🎹', title: 'Piyano', desc: '5 yaşından yetişkinlere, başlangıçtan ileri seviyeye. Kendi geliştirdiğimiz özel metot ile.', tag: 'Tüm Seviyeler', featured: false },
  { icon: '🎻', title: 'Keman', desc: 'Klasik müziğin kraliçesi. Solfej temelli, akademik bir yaklaşımla.', tag: 'Öne Çıkan', featured: true },
  { icon: '🎸', title: 'Gitar', desc: 'Klasik ve modern teknikler, fingerpicking ve akor çalışmaları.', tag: 'Başlangıç & Orta', featured: false },
  { icon: '🎵', title: 'Müzik Teorisi', desc: 'Tüm enstrümanlara temel oluşturan nota okuma, solfej ve armoni.', tag: 'Temel', featured: false },
  { icon: '🎼', title: 'Çocuk Müziği', desc: '5-10 yaş için özel tasarlanmış, oyun temelli müzik eğitimi.', tag: '5-10 Yaş', featured: false },
  { icon: '🎙', title: 'Şan & Vokal', desc: 'Ses tekniği, nefes egzersizleri ve repertuvar çalışmaları.', tag: 'Yakında', featured: false },
]

const WHY_ITEMS = [
  { num: '01', title: 'Özgün Metotlarımız', desc: 'Kendi geliştirdiğimiz pedagojik metotlarla öğrencilerimiz daha hızlı ve kalıcı öğrenir.' },
  { num: '02', title: 'Bireysel Gelişim Planı', desc: 'Yaş, seviye ve hedeflere göre özelleştirilmiş ders programları oluşturuyoruz.' },
  { num: '03', title: 'Modern Pedagoji', desc: 'Akademik disiplin ile çağdaş öğretim yöntemlerini harmanlıyoruz.' },
  { num: '04', title: 'Konser & Performans', desc: 'Düzenli recital ve konserlerle sahne deneyimi kazandırıyoruz.' },
  { num: '05', title: 'Dijital Takip Sistemi', desc: 'Mobil uygulama ile ders takibi, ödev ve gelişim raporları tek ekranda.' },
  { num: '06', title: 'Ücretsiz Deneme Dersi', desc: 'Karar vermeden önce hem akademimizi hem öğretmeninizi tanıyın.' },
]

export default function Home() {
  return (
    <main>
      <Cursor />
      <Navbar />
      <Hero />

      {/* Marquee */}
      <div className="py-7 border-y border-gold/15 bg-gold/[0.04] overflow-hidden">
        <div className="flex gap-16 animate-marquee whitespace-nowrap">
          {[...INSTRUMENTS, ...INSTRUMENTS].map((item, i) => (
            <span key={i} className="font-cormorant text-base italic text-gold/60 tracking-[2px] flex-shrink-0">
              {item} <span className="text-gold mx-4">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* About */}
      <section id="about" className="grid grid-cols-2 gap-20 px-16 py-28 bg-[#0a0a0a] items-center">
        <div className="relative h-[500px]">
          <div className="absolute top-0 left-0 right-20 bottom-36 bg-navy border border-gold/20 p-10 hover:-translate-y-2 transition-transform duration-500">
            <div className="font-cormorant text-7xl font-light text-gold leading-none">2025</div>
            <div className="text-[10px] tracking-[2px] uppercase text-cream/50 mt-2">Kuruluş Yılı</div>
            <div className="mt-8 h-px bg-gold/20" />
            <p className="mt-6 text-sm leading-relaxed text-cream/60">
              Müziği bir sanat olarak değil, bir yaşam biçimi olarak benimseyen öğrenciler için tasarlanmış bir akademi.
            </p>
          </div>
          <div className="absolute bottom-0 right-0 left-24 top-72 bg-gold/[0.08] border border-gold/40 p-10 hover:-translate-y-2 transition-transform duration-500">
            <div className="font-cormorant text-7xl font-light text-gold leading-none">Mersin</div>
            <div className="text-[10px] tracking-[2px] uppercase text-cream/50 mt-2">Türkiye</div>
          </div>
        </div>
        <div>
          <div className="section-label">Biz Kimiz</div>
          <h2 className="font-cormorant text-[clamp(38px,5vw,64px)] font-light leading-tight mb-6">
            Müzik eğitiminde<br />yeni bir <em className="italic text-gold">standart.</em>
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-gold to-transparent mb-10" />
          <p className="text-sm leading-relaxed text-cream/70 mb-5">
            Lirik Sanat Evi, müzik eğitimini akademik sertliğiyle değil, sanatın sıcaklığıyla harmanlayan Mersin'in prestijli müzik akademisidir.
          </p>
          <p className="text-sm leading-relaxed text-cream/70 mb-5">
            5 yaşından yetişkinlere kadar her öğrenciye özel gelişim planları, uzman öğretmen kadrosu ve modern pedagojik metotlarla müziğinizi bir üst seviyeye taşıyoruz.
          </p>
          <a href="#courses" className="btn-secondary mt-4">Derslerimizi Keşfet</a>
        </div>
      </section>

      {/* Courses */}
      <section id="courses" className="px-16 py-28 bg-navy/[0.06] border-t border-gold/[0.08]">
        <div className="flex justify-between items-end mb-16">
          <div>
            <div className="section-label">Eğitim Programları</div>
            <h2 className="font-cormorant text-[clamp(38px,5vw,64px)] font-light leading-tight">
              Hangi <em className="italic text-gold">enstrüman</em><br />sizi çağırıyor?
            </h2>
          </div>
          <a href="#trial" className="btn-secondary">Tüm Kurslar</a>
        </div>
        <div className="grid grid-cols-3 gap-0.5">
          {COURSES.map((course) => (
            <div key={course.title}
              className={`p-12 border relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 cursor-none
                ${course.featured
                  ? 'bg-gold border-gold'
                  : 'bg-navy border-gold/10 hover:border-gold/40'}`}>
              {!course.featured && (
                <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              )}
              <span className="text-4xl mb-6 block">{course.icon}</span>
              <h3 className={`font-cormorant text-2xl font-normal mb-3 ${course.featured ? 'text-[#0a0a0a]' : 'text-cream'}`}>
                {course.title}
              </h3>
              <p className={`text-xs leading-relaxed mb-7 ${course.featured ? 'text-[#0a0a0a]/80' : 'text-cream/55'}`}>
                {course.desc}
              </p>
              <span className={`inline-block px-4 py-1 border text-[9px] tracking-[2px] uppercase
                ${course.featured ? 'border-black/30 text-[#0a0a0a]' : 'border-gold/30 text-gold'}`}>
                {course.tag}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Teachers */}
      <section id="teachers" className="px-16 py-28 bg-[#0a0a0a]">
        <div className="section-label">Kadromuz</div>
        <h2 className="font-cormorant text-[clamp(38px,5vw,64px)] font-light leading-tight mb-16">
          Uzman <em className="italic text-gold">öğretmenler,</em><br />ilham veren rehberler.
        </h2>
        <div className="grid grid-cols-4 gap-0.5">
          {[
            { symbol: '♪', name: 'Öğretmen Adı', role: 'Piyano Öğretmeni', bio: 'Konservatuvar mezunu, 10+ yıl deneyim' },
            { symbol: '♫', name: 'Öğretmen Adı', role: 'Keman Öğretmeni', bio: 'Uluslararası yarışma ödüllü' },
            { symbol: '🎵', name: 'Öğretmen Adı', role: 'Gitar Öğretmeni', bio: 'Klasik ve modern teknik uzmanı' },
            { symbol: '♩', name: 'Öğretmen Adı', role: 'Müzik Teorisi', bio: 'Armoni ve kompozisyon uzmanı' },
          ].map((t) => (
            <div key={t.role} className="relative aspect-[3/4] bg-navy overflow-hidden group cursor-none">
              <div className="w-full h-full bg-gradient-to-br from-navy to-navy-dark/50 flex items-center justify-center
                              font-cormorant text-7xl text-gold/30">
                {t.symbol}
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/95 to-transparent
                              translate-y-10 group-hover:translate-y-0 transition-transform duration-400">
                <h3 className="font-cormorant text-xl font-normal mb-1">{t.name}</h3>
                <span className="text-[10px] tracking-[2px] uppercase text-gold">{t.role}</span>
                <p className="text-xs text-cream/50 mt-3 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  {t.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why */}
      <section id="why" className="px-16 py-28 bg-navy relative overflow-hidden">
        <div className="absolute -top-48 -right-48 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(201,168,76,0.06)_0%,transparent_70%)] pointer-events-none" />
        <div className="section-label">Neden Lirik Sanat Evi</div>
        <h2 className="font-cormorant text-[clamp(38px,5vw,64px)] font-light leading-tight mb-16">
          Fark yaratan<br />bir <em className="italic text-gold">yaklaşım.</em>
        </h2>
        <div className="grid grid-cols-3 gap-10">
          {WHY_ITEMS.map((item) => (
            <div key={item.num} className="pl-8 border-l-2 border-gold/20 hover:border-gold transition-colors duration-300">
              <div className="font-cormorant text-5xl font-light text-gold/30 leading-none mb-4">{item.num}</div>
              <h3 className="font-cormorant text-xl font-normal mb-3 text-cream">{item.title}</h3>
              <p className="text-xs leading-relaxed text-cream/55">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <TrialForm />

      {/* Newsletter */}
      <section id="register" className="px-16 py-24 bg-navy text-center">
        <div className="section-label justify-center before:hidden">Kayıt</div>
        <h2 className="font-cormorant text-[clamp(38px,5vw,64px)] font-light leading-tight max-w-2xl mx-auto mb-5">
          Aramıza <em className="italic text-gold">katılın.</em>
        </h2>
        <p className="text-sm text-cream/60 max-w-md mx-auto mb-12 leading-relaxed">
          E-posta adresinizi bırakın, yeni dönem başvuruları açıldığında ilk sizi haberdar edelim.
        </p>
        <form className="flex max-w-md mx-auto" onSubmit={async (e) => {
          e.preventDefault()
          const email = (e.target as HTMLFormElement).email.value
          await fetch('/api/newsletter', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) })
        }}>
          <input name="email" type="email" placeholder="E-posta adresiniz" required
            className="flex-1 bg-white/[0.06] border border-gold/30 border-r-0 text-cream px-6 py-4 text-sm font-light outline-none focus:border-gold transition-colors placeholder:text-cream/30" />
          <button type="submit" className="bg-gold border border-gold text-[#0a0a0a] px-8 py-4 text-[10px] font-medium tracking-[2px] uppercase hover:bg-gold-light transition-colors whitespace-nowrap">
            Bildir ✦
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer id="contact" className="px-16 pt-20 pb-10 bg-[#0a0a0a] border-t border-gold/12">
        <div className="grid grid-cols-4 gap-16 mb-16">
          <div>
            <h2 className="font-cormorant text-3xl font-normal text-gold mb-2">Lirik Sanat Evi</h2>
            <em className="font-cormorant italic text-sm text-cream/40">Müziğin dili, sanatın evi.</em>
            <p className="text-xs leading-relaxed text-cream/50 mt-5 max-w-xs">
              Mersin'in prestijli müzik akademisi. Her insan bir melodi taşır.
            </p>
          </div>
          {[
            { title: 'Dersler', links: ['Piyano', 'Keman', 'Gitar', 'Müzik Teorisi', 'Çocuk Müziği'] },
            { title: 'Akademi', links: ['Hakkımızda', 'Öğretmenlerimiz', 'Metotlarımız', 'Konserler'] },
            { title: 'İletişim', links: ['info@liriksanatevi.com', 'Mersin, Türkiye', 'Instagram', 'YouTube'] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-[10px] tracking-[3px] uppercase text-gold mb-6">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-xs text-cream/50 hover:text-gold transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gold/10 pt-8 flex justify-between items-center">
          <p className="text-[11px] text-cream/30">© 2025 Lirik Sanat Evi. Tüm hakları saklıdır. · Mersin, Türkiye</p>
          <p className="text-[11px] text-cream/30">Tasarım & Geliştirme <span className="text-gold">✦</span></p>
        </div>
      </footer>
    </main>
  )
}
