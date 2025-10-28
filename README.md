# KeyPrivateJet.com - Luxury Private Jet Charter Lead Generation Platform

## 🎯 PROJECT OVERVIEW

KeyPrivateJet is a premium lead generation website connecting high-net-worth clients with top-tier private jet charter operators. The platform features a sophisticated booking flow, real-time lead capture, and seamless integration with affiliate partners including Villiers Jets, Jettly, and NuCo Jets.

## 🛠️ TECH STACK

- **Framework:** Next.js 14.2+ (App Router)
- **Language:** TypeScript 5.0+ (strict mode)
- **Styling:** Tailwind CSS 3.4+ with Shadcn/ui components
- **Database:** Supabase (PostgreSQL)
- **Email:** Resend.com
- **Hosting:** Vercel
- **Phone:** Ringba tracking
- **Analytics:** Google Analytics 4, Vercel Analytics
- **Error Monitoring:** Sentry
- **Forms:** React Hook Form + Zod validation
- **Icons:** Lucide React
- **Fonts:** Playfair Display (headings), Inter (body)

## 🎨 DESIGN SYSTEM

### Color Palette
```css
/* Primary Colors - Deep Navy Luxury */
--primary-50: #F5F7FA
--primary-100: #E8EDF5
--primary-900: #0A2540 /* Main Brand Color */
--primary-950: #061628

/* Accent Colors - Classic Gold */
--gold-50: #FEFAED
--gold-400: #F5C13C
--gold-500: #D4AF37 /* Main Gold */
--gold-600: #C9A030

/* Neutral */
--slate-50 to --slate-950 (Shadcn defaults)
```

### Typography
```typescript
// Primary Fonts
font-family: 'Playfair Display', serif; // Headings (H1-H6)
font-family: 'Inter', sans-serif;        // Body text, UI elements

// Font Weights
Playfair: 400 (regular), 600 (semibold), 700 (bold)
Inter: 300 (light), 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
```

### Design Principles

1. **Luxury First:** High-end aesthetic with generous whitespace
2. **Mobile-First:** 58% of traffic is mobile
3. **Performance:** < 3s page load, 90+ Lighthouse score
4. **Conversions:** Clear CTAs, trust signals, social proof
5. **Accessibility:** WCAG 2.1 AA compliance

## 📁 PROJECT STRUCTURE

```
keyprivatejet/
├── app/
│   ├── (marketing)/              # Marketing pages group
│   │   ├── layout.tsx            # Marketing layout with header/footer
│   │   ├── page.tsx              # Homepage
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   ├── empty-legs/
│   │   │   └── page.tsx
│   │   ├── routes/
│   │   │   ├── page.tsx          # All routes overview
│   │   │   └── [route]/
│   │   │       └── page.tsx      # Dynamic route pages (nyc-to-miami)
│   │   ├── charter/
│   │   │   ├── page.tsx          # All cities overview
│   │   │   └── [city]/
│   │   │       └── page.tsx      # City landing pages (new-york)
│   │   └── aircraft/
│   │       ├── page.tsx          # All aircraft overview
│   │       └── [category]/
│   │           └── page.tsx      # Aircraft categories (light-jets)
│   │
│   ├── api/
│   │   ├── lead/
│   │   │   └── route.ts          # POST /api/lead - Main lead submission
│   │   ├── contact/
│   │   │   └── route.ts          # POST /api/contact - Contact form
│   │   └── newsletter/
│   │       └── route.ts          # POST /api/newsletter - Email signup
│   │
│   ├── legal/
│   │   ├── privacy/
│   │   │   └── page.tsx
│   │   ├── terms/
│   │   │   └── page.tsx
│   │   └── cookies/
│   │       └── page.tsx
│   │
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Global styles
│   ├── providers.tsx             # Context providers
│   ├── not-found.tsx             # 404 page
│   └── error.tsx                 # Error boundary
│
├── components/
│   ├── ui/                       # Shadcn/ui components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── form.tsx
│   │   ├── select.tsx
│   │   ├── calendar.tsx
│   │   ├── popover.tsx
│   │   ├── dialog.tsx
│   │   ├── sheet.tsx             # Mobile menu
│   │   ├── separator.tsx
│   │   ├── badge.tsx
│   │   └── avatar.tsx
│   │
│   ├── sections/                 # Homepage sections
│   │   ├── hero.tsx              # Hero with video background
│   │   ├── why-choose.tsx        # Benefits section
│   │   ├── how-it-works.tsx      # 3-step process
│   │   ├── popular-routes.tsx    # Route cards
│   │   ├── aircraft-categories.tsx
│   │   ├── testimonials.tsx      # Customer reviews
│   │   ├── trust-badges.tsx      # Social proof
│   │   └── cta-section.tsx       # Final call-to-action
│   │
│   ├── forms/
│   │   ├── quote-form.tsx        # Main lead capture form
│   │   ├── contact-form.tsx      # Contact page form
│   │   └── newsletter-form.tsx   # Email signup
│   │
│   ├── layout/
│   │   ├── header.tsx            # Main navigation
│   │   ├── footer.tsx            # Footer with links
│   │   ├── mobile-nav.tsx        # Mobile menu
│   │   ├── sticky-cta.tsx        # Mobile sticky button
│   │   └── cookie-banner.tsx     # GDPR cookie consent
│   │
│   └── shared/
│       ├── route-card.tsx        # Reusable route display
│       ├── aircraft-card.tsx     # Reusable aircraft display
│       ├── city-card.tsx         # Reusable city display
│       ├── price-display.tsx     # Price formatting component
│       ├── loading-spinner.tsx   # Loading states
│       └── error-boundary.tsx    # Error handling
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts             # Supabase browser client
│   │   ├── server.ts             # Supabase server client
│   │   └── types.ts              # Database types
│   │
│   ├── email/
│   │   ├── resend.ts             # Resend client
│   │   └── templates/
│   │       ├── lead-notification.tsx      # Email to admin
│   │       ├── affiliate-notification.tsx # Email to partner
│   │       └── customer-confirmation.tsx  # Email to customer
│   │
│   ├── data/
│   │   ├── cities.ts             # 20 major US cities
│   │   ├── routes.ts             # 50+ popular routes with pricing
│   │   ├── aircraft.ts           # 4 categories with specs
│   │   ├── testimonials.ts       # Customer reviews
│   │   └── faqs.ts               # Common questions
│   │
│   ├── rate-limit.ts             # API rate limiting
│   ├── utils.ts                  # Utility functions
│   ├── validations.ts            # Zod schemas
│   ├── constants.ts              # App constants
│   └── analytics.ts              # Analytics tracking functions
│
├── types/
│   ├── index.ts                  # Global TypeScript types
│   ├── lead.ts                   # Lead-related types
│   └── database.ts               # Supabase generated types
│
├── config/
│   ├── site.ts                   # Site configuration
│   ├── affiliates.ts             # Affiliate partner config
│   └── navigation.ts             # Navigation menu structure
│
├── hooks/
│   ├── use-lead-form.ts          # Lead form logic
│   ├── use-analytics.ts          # Analytics tracking
│   └── use-mobile.ts             # Mobile detection
│
├── public/
│   ├── images/
│   │   ├── jets/                 # Aircraft photos
│   │   ├── cities/               # City skylines
│   │   ├── hero/                 # Hero backgrounds
│   │   └── logos/                # Partner logos
│   ├── videos/
│   │   └── hero-bg.mp4           # Hero video background
│   └── favicon/                  # Favicon files
│
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql
│
├── .github/
│   └── workflows/
│       └── ci.yml                # CI/CD pipeline
│
├── .env.local                    # Environment variables (gitignored)
├── .env.example                  # Example env file
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── components.json               # Shadcn config
├── package.json
└── README.md                     # This file
```

## 🗄️ DATABASE SCHEMA (Supabase)

### Tables

```sql
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
  aircraft_preference TEXT CHECK (aircraft_preference IN ('light', 'midsize', 'super-midsize', 'heavy', 'ultra-long-range', 'vip-airliner')),
  
  -- Additional Info
  message TEXT,
  estimated_budget DECIMAL(10, 2),
  
  -- Lead Quality Scoring
  lead_score INTEGER CHECK (lead_score >= 1 AND lead_score <= 10),
  lead_quality TEXT CHECK (lead_quality IN ('hot', 'warm', 'cold')),
  
  -- Tracking
  source TEXT, -- 'organic', 'google_ads', 'facebook', etc.
  utm_campaign TEXT,
  utm_medium TEXT,
  utm_source TEXT,
  utm_content TEXT,
  utm_term TEXT,
  landing_page TEXT,
  
  -- Affiliate Management
  affiliate_partner TEXT NOT NULL CHECK (affiliate_partner IN ('villiers', 'jettly', 'nuco')),
  referral_code TEXT,
  commission_status TEXT DEFAULT 'pending' CHECK (commission_status IN ('pending', 'confirmed', 'paid', 'cancelled')),
  commission_amount DECIMAL(10, 2),
  
  -- Lead Status & Response Tracking
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'quoted', 'converted', 'lost')),
  contacted_at TIMESTAMP WITH TIME ZONE,
  quoted_at TIMESTAMP WITH TIME ZONE,
  converted_at TIMESTAMP WITH TIME ZONE,
  response_time_minutes INTEGER, -- Time to first contact
  
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

-- RLS Policies (for admin access only)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Newsletter subscribers
CREATE TABLE newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  source TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
  gdpr_consent BOOLEAN DEFAULT false,
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  CONSTRAINT valid_status CHECK (status IN ('active', 'unsubscribed'))
);

CREATE INDEX idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX idx_newsletter_status ON newsletter_subscribers(status);

-- Contact form submissions
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
  affiliate_partner TEXT NOT NULL,
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

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## 🔐 ENVIRONMENT VARIABLES

Create `.env.local` file with:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxxx...

# Resend Email
RESEND_API_KEY=re_xxxxxxxxxxxx

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://keyprivatejet.com
NEXT_PUBLIC_SITE_NAME="KeyPrivateJet"
NODE_ENV=production # or development

# Email Recipients
ADMIN_EMAIL=info@keyprivatejet.com
ADMIN_NAME="KeyPrivateJet Team"

# Affiliate Partner Emails
VILLIERS_EMAIL=leads@villiersjets.com
VILLIERS_REFERRAL_CODE=KPJ-VILLIERS-2025
JETTLY_EMAIL=affiliates@jettly.com
JETTLY_REFERRAL_CODE=KPJ-JETTLY-2025
NUCO_EMAIL=charter@nucojets.com
NUCO_REFERRAL_CODE=KPJ-NUCO-2025

# Phone (Ringba)
NEXT_PUBLIC_PHONE=+18555558888
NEXT_PUBLIC_PHONE_DISPLAY="(855) 555-8888"
RINGBA_API_KEY=rb_xxxxxxxxxxxx

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_FB_PIXEL_ID=XXXXXXXXXXXXXXXX

# Error Monitoring
NEXT_PUBLIC_SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
SENTRY_AUTH_TOKEN=xxxxx

# Rate Limiting
RATE_LIMIT_MAX_REQUESTS=10
RATE_LIMIT_WINDOW_MS=60000 # 1 minute

# GDPR & Data Retention
DATA_RETENTION_DAYS=730 # 2 years
COOKIE_CONSENT_REQUIRED=true

# Optional - Staging
NEXT_PUBLIC_STAGING_URL=https://staging.keyprivatejet.com
```

## 📦 DEPENDENCIES

```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "typescript": "^5.0.0",

    "@supabase/supabase-js": "^2.45.0",
    "resend": "^3.5.0",

    "react-hook-form": "^7.53.0",
    "@hookform/resolvers": "^3.9.0",
    "zod": "^3.23.0",

    "tailwindcss": "^3.4.0",
    "@radix-ui/react-*": "latest",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.5.0",

    "lucide-react": "^0.441.0",
    "date-fns": "^3.6.0",

    "@react-email/components": "^0.0.22",
    "@react-email/render": "^0.0.17",

    "@vercel/analytics": "^1.3.0",
    "@sentry/nextjs": "^8.0.0",
    "sharp": "^0.33.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.0",
    "eslint": "^8.57.0",
    "eslint-config-next": "14.2.0",
    "prettier": "^3.0.0",
    "prettier-plugin-tailwindcss": "^0.5.0"
  }
}
```

## 🚀 GETTING STARTED

```bash
# Install dependencies
pnpm install

# Install Shadcn components
npx shadcn-ui@latest init
npx shadcn-ui@latest add button input form select card calendar popover dialog sheet separator badge avatar

# Setup Supabase
# 1. Create account at supabase.com
# 2. Create new project
# 3. Copy connection details to .env.local
# 4. Run migrations from supabase/migrations/

# Setup Resend
# 1. Create account at resend.com
# 2. Verify domain (optional for production)
# 3. Copy API key to .env.local

# Setup Sentry (Error Monitoring)
# 1. Create account at sentry.io
# 2. Create new Next.js project
# 3. Copy DSN to .env.local

# Run development server
pnpm dev

# Open http://localhost:3000
```

## 📄 KEY PAGES & ROUTES

### Marketing Pages

- `/` - Homepage with hero, form, popular routes
- `/about` - About KeyPrivateJet
- `/contact` - Contact form
- `/empty-legs` - Empty leg deals

### Dynamic Pages

- `/routes/[route]` - e.g., `/routes/new-york-to-miami`
- `/charter/[city]` - e.g., `/charter/new-york`
- `/aircraft/[category]` - e.g., `/aircraft/light-jets`

### Legal Pages

- `/legal/privacy` - Privacy Policy (GDPR compliant)
- `/legal/terms` - Terms of Service
- `/legal/cookies` - Cookie Policy

### API Endpoints

- `POST /api/lead` - Submit lead form (rate limited)
- `POST /api/contact` - Submit contact form (rate limited)
- `POST /api/newsletter` - Newsletter signup (rate limited)

## 🎯 CORE FEATURES

### 1. Lead Capture System

- **Primary Form:** Quote request with flight details
- **Validation:** Client-side (React Hook Form + Zod) and server-side
- **Multi-step Flow:**
  1. Collect flight details (from/to, date, passengers)
  2. Collect contact info (name, email, phone)
  3. GDPR consent checkboxes
  4. Submit and confirmation
- **Success Actions:**
  - Save to Supabase
  - Calculate lead score (1-10)
  - Send email to admin
  - Send email to affiliate partner
  - Send confirmation to customer
  - Track in Google Analytics
  - Display thank you message

### 2. Email Automation

Three email templates:

1. **Admin Notification** - Alert team of new lead with score
2. **Affiliate Notification** - Send lead to charter partner with referral code
3. **Customer Confirmation** - Confirm request received with next steps

### 3. Analytics & Tracking

- **Google Analytics 4:** Page views, events, conversions
- **Vercel Analytics:** Performance metrics
- **UTM Tracking:** Campaign attribution
- **Conversion Tracking:**
  - Form submissions
  - Phone clicks (Ringba)
  - Email clicks
  - Route views
  - Lead quality scores

### 4. SEO Optimization

- **Dynamic Metadata:** Title, description, OG tags per page
- **Structured Data:** JSON-LD schema for rich snippets
- **Sitemap:** Auto-generated for all pages
- **robots.txt:** Search engine directives
- **Semantic HTML:** Proper heading hierarchy
- **Performance:** Fast loading, optimized images

### 5. Mobile Optimization

- **Responsive Design:** Mobile-first approach
- **Sticky CTA:** Phone button on mobile
- **Touch Targets:** Minimum 44px touch areas
- **Fast Loading:** Optimized for 3G connections
- **Progressive Enhancement:** Works without JavaScript

### 6. Security & Rate Limiting

- **API Rate Limiting:** 10 requests per minute per IP
- **Input Validation:** Zod schemas on all endpoints
- **SQL Injection Protection:** Supabase parameterized queries
- **XSS Protection:** React auto-escaping
- **CSRF Protection:** Next.js built-in tokens
- **Error Monitoring:** Sentry integration

### 7. GDPR Compliance

- **Cookie Consent Banner:** Required for EU visitors
- **Data Retention Policy:** 2 years, then auto-delete
- **Privacy Policy:** Comprehensive and up-to-date
- **Opt-in Marketing:** Separate consent for marketing emails
- **Right to be Forgotten:** Email admin to request deletion
- **Data Export:** Available upon request

## 🎨 COMPONENT PATTERNS

### Button Usage
```tsx
// Primary CTA
<Button className="bg-gold-500 hover:bg-gold-600 text-primary-900">
  Get Free Quote
</Button>

// Secondary action
<Button variant="outline" className="border-gold-500 text-gold-500">
  Learn More
</Button>

// Ghost button
<Button variant="ghost">
  View Details
</Button>
```

### Card Layout
```tsx
<Card className="overflow-hidden border-primary-100 hover:shadow-lg transition-shadow">
  <CardHeader>
    <CardTitle className="font-playfair text-2xl">Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
  <CardFooter>
    {/* Actions */}
  </CardFooter>
</Card>
```

### Form Pattern
```tsx
<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
    <FormField
      control={form.control}
      name="fieldName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Label</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <Button type="submit">Submit</Button>
  </form>
</Form>
```

## 📊 PERFORMANCE TARGETS

- **First Contentful Paint (FCP):** < 1.8s
- **Largest Contentful Paint (LCP):** < 2.5s
- **Time to Interactive (TTI):** < 3.8s
- **Cumulative Layout Shift (CLS):** < 0.1
- **Total Blocking Time (TBT):** < 300ms
- **Lighthouse Score:** 90+ (all categories)

## 🔒 SECURITY CONSIDERATIONS

- **Input Validation:** All forms validated client and server-side
- **SQL Injection:** Supabase client handles parameterization
- **XSS Protection:** React escapes by default
- **CSRF:** Next.js API routes use CSRF tokens
- **Rate Limiting:** 10 requests/minute on API routes
- **Environment Variables:** Never commit to git
- **Email Validation:** Verify format and disposable domains
- **Phone Validation:** Format check, no fake numbers
- **Error Handling:** Never expose sensitive data in errors
- **HTTPS Only:** Enforce in production

## 🧪 TESTING CHECKLIST

### Functionality Testing

- [ ] All forms submit successfully
- [ ] Emails send to correct recipients
- [ ] Supabase records created correctly
- [ ] Phone tracking works (Ringba)
- [ ] All links work (no 404s)
- [ ] Mobile navigation works
- [ ] Form validation shows errors
- [ ] Success messages display
- [ ] Rate limiting works
- [ ] GDPR consent saves correctly

### Browser Testing

- [ ] Chrome (desktop & mobile)
- [ ] Safari (desktop & mobile)
- [ ] Firefox
- [ ] Edge

### Device Testing

- [ ] iPhone (Safari)
- [ ] Android (Chrome)
- [ ] iPad
- [ ] Desktop (1920px+)
- [ ] Laptop (1366px)

### Performance Testing

- [ ] Lighthouse score 90+
- [ ] Page load < 3s on 3G
- [ ] Images optimized
- [ ] No console errors
- [ ] Analytics tracking works
- [ ] Sentry error tracking works

## 📈 CONVERSION OPTIMIZATION

### Key Metrics to Track

- **Form Submissions:** Target 2-5% conversion rate
- **Phone Clicks:** Track via Ringba
- **Email Clicks:** Track via UTM parameters
- **Page Views:** Popular routes, aircraft pages
- **Bounce Rate:** Target < 60%
- **Time on Site:** Target > 2 minutes
- **Lead Quality Score:** Average 6+ out of 10

### A/B Testing Ideas (Future)

- Form length (short vs detailed)
- CTA button text
- Hero video vs static image
- Pricing display (hourly vs total)
- Social proof placement

## 🚢 DEPLOYMENT

### Pre-Launch Checklist

- [ ] All environment variables set in Vercel
- [ ] Domain configured and SSL active
- [ ] Database migrations run
- [ ] Email templates tested
- [ ] Analytics tracking verified
- [ ] Sitemap submitted to Google
- [ ] Google Search Console setup
- [ ] Privacy Policy & Terms published
- [ ] 404 page styled
- [ ] Favicon uploaded
- [ ] Sentry error tracking configured
- [ ] Rate limiting tested
- [ ] GDPR cookie banner working

### Deployment Steps

```bash
# 1. Build locally to check for errors
pnpm run build

# 2. Commit to git
git add .
git commit -m "feat: initial production build"
git push origin main

# 3. Deploy to Vercel
vercel --prod

# 4. Point domain in Vercel dashboard
# 5. Verify all functionality works in production
```

### Post-Launch Tasks

- [ ] Submit sitemap to Google Search Console
- [ ] Submit to Bing Webmaster Tools
- [ ] Create Google My Business listing
- [ ] Monitor error logs (Vercel + Sentry)
- [ ] Set up uptime monitoring (UptimeRobot)
- [ ] Test lead flow end-to-end
- [ ] Monitor analytics for first 24 hours
- [ ] Setup automated Supabase backups
- [ ] Configure Vercel Edge Config for feature flags

## 🤝 AFFILIATE PARTNER INTEGRATION

### Villiers Jets

- **Commission:** 30% profit share
- **Lead Delivery:** Email to leads@villiersjets.com
- **Tracking:** Include lead ID and referral code in subject line
- **Referral Code:** KPJ-VILLIERS-2025

### Jettly

- **Commission:** Up to $30,000 per booking
- **Lead Delivery:** Email to affiliates@jettly.com
- **Tracking:** Custom referral code in email body
- **Referral Code:** KPJ-JETTLY-2025

### NuCo Jets

- **Commission:** Tiered based on volume
- **Lead Delivery:** Email or phone (855) 682-6538
- **Tracking:** Unique referral code per lead
- **Referral Code:** KPJ-NUCO-2025

## 📞 SUPPORT & MAINTENANCE

### Regular Tasks

**Daily:**
- Monitor lead submissions
- Check email delivery
- Review error logs (Sentry)
- Check rate limiting alerts

**Weekly:**
- Review analytics data
- Check form conversion rates
- Update empty leg deals (if applicable)
- Review affiliate performance metrics

**Monthly:**
- Review SEO performance
- Update blog content (if applicable)
- Backup database (automated via Supabase)
- Review and optimize ad campaigns
- Clean up old data per retention policy

### Common Issues & Solutions

**Issue:** Form not submitting
- Check network tab for API errors
- Verify environment variables
- Check Supabase connection
- Review Sentry for errors

**Issue:** Emails not sending
- Verify Resend API key
- Check email templates for errors
- Verify recipient email addresses
- Check Resend dashboard for bounces

**Issue:** Slow page load
- Check image sizes (should be < 200KB)
- Review bundle size
- Check for unused dependencies
- Review Vercel Analytics

**Issue:** Rate limiting too aggressive
- Adjust RATE_LIMIT_MAX_REQUESTS in .env
- Review IP whitelist for admin access

## 📚 ADDITIONAL RESOURCES

- [Next.js Documentation](https://nextjs.org/docs)
- [Shadcn/ui Components](https://ui.shadcn.com)
- [Supabase Documentation](https://supabase.com/docs)
- [Resend Email Docs](https://resend.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Sentry Next.js Integration](https://docs.sentry.io/platforms/javascript/guides/nextjs/)

## 🎯 SUCCESS CRITERIA

**Week 1 (Launch):**
- Website live and functional
- 0 critical bugs
- 5+ test leads submitted successfully
- All emails delivering correctly

**Month 1:**
- 50-100 organic visitors
- 10+ qualified leads (score 6+)
- 2-5% form conversion rate
- < 3s average page load

**Month 3:**
- 500+ monthly visitors
- 50+ qualified leads
- First paid bookings (via affiliates)
- 90+ Lighthouse score

**Month 6:**
- 2000+ monthly visitors
- 100+ qualified leads
- Top 10 rankings for target keywords
- Positive ROI on ad spend

## 📝 NOTES FOR DEVELOPERS

### Code Style

- Use TypeScript strict mode
- Prefer named exports over default exports
- Use async/await over promises
- Comment complex logic
- Keep functions small and focused
- Use meaningful variable names
- Follow ESLint rules strictly

### Git Workflow

```bash
# Feature branches
git checkout -b feature/new-feature
git commit -m "feat: add new feature"
git push origin feature/new-feature

# Commit message format (Conventional Commits)
feat: New feature
fix: Bug fix
docs: Documentation update
style: Code style change
refactor: Code refactoring
test: Add tests
chore: Maintenance tasks
```

### Performance Best Practices

- Use Next.js Image component for all images
- Implement lazy loading for below-fold content
- Minimize client-side JavaScript
- Use server components where possible
- Implement proper caching strategies
- Monitor bundle size
- Optimize fonts with next/font

### TypeScript Best Practices

- Enable strict mode
- Use Zod for runtime validation
- Generate types from Supabase schema
- Avoid `any` type
- Use proper type guards
- Document complex types

## 🏆 PROJECT GOALS

1. **Generate Quality Leads:** 100+ per month by month 3
2. **High Conversion Rate:** 3-5% form submission rate
3. **Fast Performance:** < 3s page load
4. **SEO Rankings:** Top 10 for target keywords by month 6
5. **User Experience:** Professional, trustworthy, easy to use
6. **Affiliate Satisfaction:** Fast response times, quality leads
7. **GDPR Compliance:** 100% compliant with EU regulations

---

**Built with ❤️ for luxury travel | KeyPrivateJet.com**

*Last Updated: October 28, 2025*

