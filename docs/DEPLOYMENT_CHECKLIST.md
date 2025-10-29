# Deployment Checklist

## Pre-Deployment

### Code Quality
- [ ] All tests passing (`pnpm test:all`)
- [ ] TypeScript compilation successful (`pnpm typecheck`)
- [ ] No linter errors (`pnpm lint`)
- [ ] Code formatted (`pnpm format`)
- [ ] Build successful locally (`pnpm build`)

### Environment Variables
- [ ] All production env vars set in Vercel
- [ ] Supabase production database configured
- [ ] Resend API key configured
- [ ] Sentry DSN configured
- [ ] Analytics IDs configured (GA, GTM, FB Pixel)
- [ ] Affiliate partner emails verified

### Database
- [ ] Production database migrations run
- [ ] Database indexes created
- [ ] Row Level Security policies configured
- [ ] Backup strategy in place

### Content
- [ ] All images optimized (< 200KB)
- [ ] OG images generated for key pages
- [ ] Favicon and app icons in place
- [ ] robots.txt configured
- [ ] sitemap.xml generated

### SEO
- [ ] Meta tags on all pages
- [ ] Schema markup implemented
- [ ] Canonical URLs set
- [ ] 404 page created
- [ ] Redirects configured

### Security
- [ ] Security headers configured
- [ ] HTTPS enforced
- [ ] Rate limiting enabled
- [ ] GDPR compliance implemented
- [ ] Cookie consent banner ready

## Deployment Steps

### 1. Connect to Vercel
```bash
# Install Vercel CLI
pnpm add -g vercel

# Login to Vercel
vercel login

# Link project
vercel link
```

### 2. Set Environment Variables
```bash
# Set all production environment variables in Vercel dashboard
# Or use CLI:
vercel env add NEXT_PUBLIC_SITE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_URL production
# ... etc
```

### 3. Deploy to Preview
```bash
# Deploy to preview environment first
vercel

# Test preview deployment thoroughly
# Check all critical flows
```

### 4. Deploy to Production
```bash
# Deploy to production
vercel --prod

# Or push to main branch (if auto-deploy enabled)
git push origin main
```

## Post-Deployment

### Immediate Checks (Within 5 minutes)
- [ ] Homepage loads successfully
- [ ] Quote form submits successfully
- [ ] Email notifications working
- [ ] Database connections working
- [ ] No console errors
- [ ] Mobile responsive
- [ ] SSL certificate active

### Performance Checks (Within 30 minutes)
- [ ] Lighthouse score > 80
- [ ] Page load time < 3s
- [ ] Images loading properly
- [ ] Fonts loading correctly
- [ ] No 404 errors

### SEO Checks (Within 1 hour)
- [ ] sitemap.xml accessible
- [ ] robots.txt accessible
- [ ] Meta tags correct
- [ ] Schema markup valid (test with Google Rich Results)
- [ ] Open Graph tags working (test with Facebook Debugger)

### Analytics Setup (Within 24 hours)
- [ ] Google Analytics tracking
- [ ] Google Tag Manager configured
- [ ] Facebook Pixel firing
- [ ] Conversion tracking working
- [ ] Sentry error tracking active

### Domain Configuration (Within 24 hours)
- [ ] Custom domain configured
- [ ] DNS records updated
- [ ] SSL certificate issued
- [ ] WWW redirect working
- [ ] Email forwarding configured

### Monitoring Setup (Within 48 hours)
- [ ] Uptime monitoring (UptimeRobot or similar)
- [ ] Error alerts configured (Sentry)
- [ ] Performance monitoring (Vercel Analytics)
- [ ] Database monitoring (Supabase)
- [ ] Email delivery monitoring (Resend)

## Week 1 Post-Launch

### Daily Checks
- [ ] Check error logs (Sentry)
- [ ] Monitor form submissions
- [ ] Review email delivery
- [ ] Check analytics data
- [ ] Monitor page speed

### Weekly Tasks
- [ ] Review conversion rates
- [ ] Analyze traffic sources
- [ ] Check affiliate performance
- [ ] Review user feedback
- [ ] Update content as needed

## Rollback Plan

If critical issues arise:

```bash
# Rollback to previous deployment
vercel rollback

# Or redeploy specific version
vercel --prod --force
```

## Emergency Contacts

- **Vercel Support**: support@vercel.com
- **Supabase Support**: support@supabase.io
- **Resend Support**: support@resend.com
- **Domain Registrar**: [Your registrar support]

