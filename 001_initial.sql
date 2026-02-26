-- Deneme dersi talepleri
CREATE TABLE trial_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  instrument TEXT NOT NULL,
  student_age_range TEXT NOT NULL,
  note TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'enrolled', 'cancelled'))
);

-- Bülten aboneleri
CREATE TABLE newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  email TEXT UNIQUE NOT NULL
);

-- RLS
ALTER TABLE trial_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Herkes form gönderebilir (insert), sadece admin okuyabilir
CREATE POLICY "Anyone can submit trial request" ON trial_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can subscribe newsletter" ON newsletter_subscribers FOR INSERT WITH CHECK (true);
