# Security Documentation

## Overview
This document outlines the security measures implemented in the project to maintain a high security score (A+ on Mozilla Observatory). The project uses a multi-layered approach to security, combining various mechanisms to protect against common web vulnerabilities.

## Security Score
- Mozilla Observatory Score: 120/100 (A+)
- Tests Passed: 10/10
- Last Scan: [Current Date]

## Implemented Security Measures

### 1. Content Security Policy (CSP)
The project implements a strict Content Security Policy through multiple layers:

#### HTML Meta Tags
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; object-src 'none'; base-uri 'self'">
```

#### Cloudflare Worker
Located in `cloudflare-worker.js`, implements CSP headers at the edge:
```javascript
'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; object-src 'none'; base-uri 'self'"
```

#### _headers File
Located in `public/_headers`, provides fallback headers:
```text
/*
  Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; object-src 'none'; base-uri 'self'
```

### 2. HTTP Strict Transport Security (HSTS)
Enforces HTTPS connections:
```text
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

### 3. X-Frame-Options
Prevents clickjacking attacks:
```text
X-Frame-Options: DENY
```

### 4. X-Content-Type-Options
Prevents MIME type sniffing:
```text
X-Content-Type-Options: nosniff
```

### 5. Referrer-Policy
Controls referrer information:
```text
Referrer-Policy: strict-origin-when-cross-origin
```

### 6. Permissions-Policy
Controls browser features:
```text
Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
```

### 7. Cross-Origin-Resource-Policy
Controls cross-origin resource sharing:
```text
Cross-Origin-Resource-Policy: same-origin
```

### 8. X-XSS-Protection
Enables browser's XSS filtering:
```text
X-XSS-Protection: 1; mode=block
```

## Implementation Details

### Build Process
The project includes a custom build process (`copy-headers.js`) that ensures security headers are properly copied to the build output:
```javascript
const fs = require('fs');
fs.copyFileSync('public/_headers', 'dist/_headers');
```

### Deployment
Security headers are implemented at multiple levels:
1. HTML meta tags (immediate protection)
2. Cloudflare Worker (edge protection)
3. _headers file (fallback protection)

## Future Development Guidelines

### Adding New Features
When adding new features that require external resources:
1. Update CSP directives to include necessary domains
2. Document any new security considerations
3. Test security score after implementation

### Modifying Security Headers
When modifying security headers:
1. Update all three locations (HTML meta tags, Cloudflare Worker, _headers file)
2. Test changes locally
3. Verify security score after deployment
4. Document changes in this file

### Testing Security
Regular security testing should be performed:
1. Run Mozilla Observatory scan after significant changes
2. Check browser console for CSP violations
3. Verify all security headers are present using browser dev tools

## Troubleshooting

### Common Issues
1. **CSP Violations**
   - Check browser console for specific violations
   - Update CSP directives as needed
   - Document any necessary exceptions

2. **Missing Headers**
   - Verify Cloudflare Worker is active
   - Check _headers file is in correct location
   - Ensure build process is copying headers

3. **Security Score Drops**
   - Review Mozilla Observatory report
   - Update security measures as needed
   - Document changes and rationale

## Contact
For security-related issues or questions, please contact the project maintainers. 