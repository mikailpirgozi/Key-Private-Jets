# Environment Variables Configuration

## Required Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxxx...

# Resend Email Service
RESEND_API_KEY=re_xxxxxxxxxxxx

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="KeyPrivateJet"
NODE_ENV=development

# Email Configuration
ADMIN_EMAIL=info@keyprivatejet.com
ADMIN_NAME="KeyPrivateJet Team"

# Affiliate Partner Emails
VILLIERS_EMAIL=leads@villiersjets.com
VILLIERS_REFERRAL_CODE=KPJ-VILLIERS-2025
JETTLY_EMAIL=affiliates@jettly.com
JETTLY_REFERRAL_CODE=KPJ-JETTLY-2025
NUCO_EMAIL=charter@nucojets.com
NUCO_REFERRAL_CODE=KPJ-NUCO-2025

# Phone Configuration
NEXT_PUBLIC_PHONE=+18555558888
NEXT_PUBLIC_PHONE_DISPLAY="(855) 555-8888"

# Analytics (Optional - leave empty for development)
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_GTM_ID=
NEXT_PUBLIC_FB_PIXEL_ID=

# Sentry Error Monitoring (Optional)
NEXT_PUBLIC_SENTRY_DSN=
SENTRY_AUTH_TOKEN=
SENTRY_ORG=
SENTRY_PROJECT=

# Rate Limiting
RATE_LIMIT_MAX_REQUESTS=10
RATE_LIMIT_WINDOW_MS=60000

# GDPR & Data Retention
DATA_RETENTION_DAYS=730
COOKIE_CONSENT_REQUIRED=true
```

## Variable Descriptions

### Supabase
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Public anon key for client-side
- `SUPABASE_SERVICE_ROLE_KEY`: Service role key for server-side operations

### Resend
- `RESEND_API_KEY`: API key from resend.com for sending emails

### Site Configuration
- `NEXT_PUBLIC_SITE_URL`: Full URL of your site (with https:// in production)
- `NEXT_PUBLIC_SITE_NAME`: Name of your site
- `NODE_ENV`: Environment (development/production)

### Email
- `ADMIN_EMAIL`: Email address to receive admin notifications
- `ADMIN_NAME`: Display name for admin emails

### Affiliate Partners
- `VILLIERS_EMAIL`: Email for Villiers Jets leads
- `VILLIERS_REFERRAL_CODE`: Referral code for Villiers
- `JETTLY_EMAIL`: Email for Jettly leads
- `JETTLY_REFERRAL_CODE`: Referral code for Jettly
- `NUCO_EMAIL`: Email for NuCo Jets leads
- `NUCO_REFERRAL_CODE`: Referral code for NuCo

### Phone
- `NEXT_PUBLIC_PHONE`: Phone number in E.164 format (+1...)
- `NEXT_PUBLIC_PHONE_DISPLAY`: Formatted phone for display

### Analytics (Optional)
- `NEXT_PUBLIC_GA_ID`: Google Analytics 4 measurement ID
- `NEXT_PUBLIC_GTM_ID`: Google Tag Manager container ID
- `NEXT_PUBLIC_FB_PIXEL_ID`: Facebook Pixel ID

### Sentry (Optional)
- `NEXT_PUBLIC_SENTRY_DSN`: Sentry DSN for error tracking
- `SENTRY_AUTH_TOKEN`: Auth token for Sentry CLI
- `SENTRY_ORG`: Sentry organization slug
- `SENTRY_PROJECT`: Sentry project slug

### Rate Limiting
- `RATE_LIMIT_MAX_REQUESTS`: Max requests per window (default: 10)
- `RATE_LIMIT_WINDOW_MS`: Time window in milliseconds (default: 60000 = 1 minute)

### GDPR
- `DATA_RETENTION_DAYS`: Days to retain user data (default: 730 = 2 years)
- `COOKIE_CONSENT_REQUIRED`: Whether to show cookie consent banner

## Setup Instructions

1. Copy this template to `.env.local`
2. Fill in all required values
3. Never commit `.env.local` to git
4. For production, set these in Vercel dashboard

