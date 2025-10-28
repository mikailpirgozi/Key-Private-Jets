-- Run this SQL directly in Supabase SQL Editor
-- https://supabase.com/dashboard/project/itfibxgmoqsohaobbjyj/sql

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop existing tables if they exist (for clean setup)
DROP TABLE IF EXISTS affiliate_performance CASCADE;
DROP TABLE IF EXISTS contact_submissions CASCADE;
DROP TABLE IF EXISTS newsletter_subscribers CASCADE;
DROP TABLE IF EXISTS leads CASCADE;
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- Leads table
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Contact Information
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  
  -- Flight Details
  from_city TEXT NOT NULL,
  to_city TEXT NOT NULL,
  departure_date DATE NOT NULL,
  passengers INTEGER NOT NULL CHECK (passengers >= 1 AND passengers <= 20),
  aircraft_preference TEXT CHECK (aircraft_preference IN ('light-jets', 'midsize-jets', 'super-midsize-jets', 'heavy-jets')),
  
  -- Additional Info
  message TEXT,
  estimated_budget DECIMAL(10, 2),
  
  -- Lead Quality Scoring
  lead_score INTEGER CHECK (lead_score >= 1 AND lead_score <= 10),
  lead_quality TEXT CHECK (lead_quality IN ('hot', 'warm', 'cold')),
  
  -- Tracking
  source TEXT,
  utm_campaign TEXT,
  utm_medium TEXT,
  utm_source TEXT,
  utm_content TEXT,
  utm_term TEXT,
  landing_page TEXT,
  
  -- Affiliate Management
  affiliate_partner TEXT NOT NULL DEFAULT 'villiers' CHECK (affiliate_partner IN ('villiers', 'jettly', 'nuco')),
  referral_code TEXT,
  commission_status TEXT DEFAULT 'pending' CHECK (commission_status IN ('pending', 'confirmed', 'paid', 'cancelled')),
  commission_amount DECIMAL(10, 2),
  
  -- Lead Status & Response Tracking
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'quoted', 'converted', 'lost')),
  contacted_at TIMESTAMP WITH TIME ZONE,
  quoted_at TIMESTAMP WITH TIME ZONE,
  converted_at TIMESTAMP WITH TIME ZONE,
  response_time_minutes INTEGER,
  
  -- Technical
  ip_address TEXT,
  user_agent TEXT,
  device_type TEXT CHECK (device_type IN ('mobile', 'tablet', 'desktop')),
  
  -- GDPR Compliance
  gdpr_consent BOOLEAN DEFAULT false,
  marketing_consent BOOLEAN DEFAULT false,
  data_retention_expires_at TIMESTAMP WITH TIME ZONE
);

-- Indexes for performance
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_affiliate ON leads(affiliate_partner);
CREATE INDEX idx_leads_source ON leads(source);
CREATE INDEX idx_leads_lead_score ON leads(lead_score DESC);
CREATE INDEX idx_leads_quality ON leads(lead_quality);

-- Updated at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Newsletter subscribers
CREATE TABLE newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  source TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
  gdpr_consent BOOLEAN DEFAULT false,
  unsubscribed_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX idx_newsletter_status ON newsletter_subscribers(status);

-- Contact submissions
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'replied', 'resolved')),
  replied_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_contact_created_at ON contact_submissions(created_at DESC);
CREATE INDEX idx_contact_status ON contact_submissions(status);

-- Affiliate performance tracking
CREATE TABLE affiliate_performance (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  affiliate_partner TEXT NOT NULL CHECK (affiliate_partner IN ('villiers', 'jettly', 'nuco')),
  month DATE NOT NULL,
  leads_sent INTEGER DEFAULT 0,
  leads_converted INTEGER DEFAULT 0,
  total_commission DECIMAL(10, 2) DEFAULT 0,
  avg_response_time_minutes INTEGER,
  conversion_rate DECIMAL(5, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(affiliate_partner, month)
);

CREATE INDEX idx_affiliate_performance_partner ON affiliate_performance(affiliate_partner);
CREATE INDEX idx_affiliate_performance_month ON affiliate_performance(month DESC);

