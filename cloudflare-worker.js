// Cloudflare Worker to add security headers
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // Get the response from the origin
  const response = await fetch(request)
  
  // Clone the response so we can modify headers
  const newResponse = new Response(response.body, response)
  
  // Add security headers
  newResponse.headers.set('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; object-src 'none'; base-uri 'self'")
  newResponse.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
  newResponse.headers.set('X-Frame-Options', 'DENY')
  newResponse.headers.set('X-Content-Type-Options', 'nosniff')
  newResponse.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  newResponse.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  newResponse.headers.set('Cross-Origin-Resource-Policy', 'same-origin')
  newResponse.headers.set('X-XSS-Protection', '1; mode=block')
  
  return newResponse
} 