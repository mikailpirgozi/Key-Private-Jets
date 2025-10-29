# Monitoring & Alerting Setup

## Uptime Monitoring

### UptimeRobot (Free Tier)

1. Sign up at https://uptimerobot.com
2. Add HTTP(s) monitor:
   - URL: `https://keyprivatejet.com`
   - Monitoring Interval: 5 minutes
   - Monitor Type: HTTP(s)
   - Alert Contacts: Your email

3. Add Health Check monitor:
   - URL: `https://keyprivatejet.com/api/health`
   - Monitoring Interval: 5 minutes
   - Expected Status: 200

### Better Uptime (Alternative)

1. Sign up at https://betteruptime.com
2. Create monitor for homepage
3. Create monitor for health endpoint
4. Set up alert channels (email, Slack, SMS)

## Error Monitoring (Sentry)

### Setup
1. Create Sentry account at https://sentry.io
2. Create new project (Next.js)
3. Copy DSN to environment variables
4. Configure alerts:
   - Email on new issues
   - Slack integration (optional)
   - Weekly summary reports

### Alert Rules
- Critical errors: Immediate notification
- High volume errors: Threshold alert (> 10/min)
- Performance degradation: P95 > 3s

## Performance Monitoring

### Vercel Analytics
- Automatically enabled for Vercel deployments
- Monitor Core Web Vitals
- Track page load times
- Review in Vercel Dashboard

### Google PageSpeed Insights
- Weekly manual checks
- Monitor mobile/desktop scores
- Track Core Web Vitals trends

## Database Monitoring (Supabase)

### Metrics to Monitor
- Connection pool usage
- Query performance
- Storage usage
- API request volume

### Alerts
- Connection pool > 80%
- Storage > 80%
- Slow queries > 1s

## Email Monitoring (Resend)

### Metrics to Track
- Delivery rate
- Bounce rate
- Open rate (if tracking enabled)
- Failed sends

### Alerts
- Delivery rate < 95%
- Bounce rate > 5%
- Failed sends > 10/day

## Custom Metrics

### Business Metrics
- Lead submissions per day
- Conversion rate
- Average response time
- Affiliate performance

### Technical Metrics
- API response times
- Error rates by endpoint
- Rate limit hits
- Cache hit rates

## Alert Channels

### Email
- Critical issues: Immediate
- Daily summary: 9 AM
- Weekly report: Monday 9 AM

### Slack (Optional)
- Create #alerts channel
- Integrate Sentry
- Integrate UptimeRobot
- Integrate Vercel

### SMS (Optional)
- Only for critical downtime
- Use Twilio or similar service

## Incident Response

### Severity Levels

**P0 - Critical**
- Site completely down
- Database unavailable
- Response: Immediate (< 5 min)

**P1 - High**
- Major feature broken
- High error rate
- Response: < 30 min

**P2 - Medium**
- Minor feature broken
- Degraded performance
- Response: < 2 hours

**P3 - Low**
- Cosmetic issues
- Low-impact bugs
- Response: Next business day

### Incident Checklist

1. **Acknowledge**
   - Confirm issue
   - Assess severity
   - Notify team

2. **Investigate**
   - Check error logs (Sentry)
   - Review recent deployments
   - Check external services

3. **Resolve**
   - Apply fix
   - Deploy to production
   - Verify resolution

4. **Communicate**
   - Update status page (if applicable)
   - Notify affected users
   - Document incident

5. **Post-Mortem**
   - Root cause analysis
   - Prevention measures
   - Update runbooks

