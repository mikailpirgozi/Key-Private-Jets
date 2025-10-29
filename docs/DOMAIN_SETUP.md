# Domain Configuration Guide

## DNS Configuration

### Required DNS Records

#### A Records (if using custom nameservers)
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
```

#### CNAME Records
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

### Vercel Domain Setup

1. Go to Vercel Dashboard → Project → Settings → Domains
2. Add domain: `keyprivatejet.com`
3. Add domain: `www.keyprivatejet.com`
4. Configure redirect: `www.keyprivatejet.com` → `keyprivatejet.com` (or vice versa)

### SSL Certificate

Vercel automatically provisions SSL certificates via Let's Encrypt.
- Certificates auto-renew
- HTTPS enforced by default
- HTTP → HTTPS redirect automatic

## Email Configuration

### Email Forwarding (Optional)

If using domain email forwarding:

```
Type: MX
Name: @
Priority: 10
Value: [Your email provider MX record]
```

### SPF Record (For Resend)

```
Type: TXT
Name: @
Value: v=spf1 include:_spf.resend.com ~all
```

### DKIM Record (For Resend)

Resend will provide DKIM records after domain verification.

```
Type: TXT
Name: resend._domainkey
Value: [Provided by Resend]
```

### DMARC Record

```
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=quarantine; rua=mailto:dmarc@keyprivatejet.com
```

## Verification

### Test Domain Configuration

```bash
# Check DNS propagation
dig keyprivatejet.com
dig www.keyprivatejet.com

# Check SSL certificate
curl -I https://keyprivatejet.com

# Check redirects
curl -I http://keyprivatejet.com
curl -I https://www.keyprivatejet.com
```

### Verify Email Configuration

```bash
# Check MX records
dig MX keyprivatejet.com

# Check SPF
dig TXT keyprivatejet.com

# Check DKIM
dig TXT resend._domainkey.keyprivatejet.com
```

## Troubleshooting

### Domain not resolving
- Wait 24-48 hours for DNS propagation
- Check nameservers are correct
- Verify DNS records in registrar

### SSL certificate issues
- Ensure DNS is fully propagated
- Check Vercel domain settings
- Contact Vercel support if persists

### Email not sending
- Verify SPF/DKIM records
- Check Resend domain verification
- Test with Resend dashboard

