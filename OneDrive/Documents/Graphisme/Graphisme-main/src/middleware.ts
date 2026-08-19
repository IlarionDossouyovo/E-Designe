import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Middleware to protect admin and client routes
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  console.log('[Middleware] Checking path:', pathname)
  
  // Skip auth routes and public routes
  if (
    pathname.startsWith('/api/auth') ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/api/') ||
    pathname === '/' ||
    pathname.startsWith('/shop') ||
    pathname.startsWith('/portfolio') ||
    pathname.startsWith('/services') ||
    pathname.startsWith('/contact') ||
    pathname.startsWith('/about') ||
    pathname.startsWith('/ai-team') ||
    pathname.startsWith('/pricing') ||
    pathname.startsWith('/blog') ||
    pathname.startsWith('/demo') ||
    pathname.startsWith('/marketplace') ||
    pathname.startsWith('/cart') ||
    pathname.startsWith('/art-gallery') ||
    pathname.startsWith('/ai-studio') ||
    pathname.startsWith('/print-shop') ||
    pathname.startsWith('/affiliate') ||
    pathname.startsWith('/founder') ||
    pathname.startsWith('/maintenance') ||
    pathname.startsWith('/payments') ||
    pathname.startsWith('/announcements') ||
    pathname.startsWith('/quote') ||
    pathname.startsWith('/admin')
  ) {
    console.log('[Middleware] Public path, allowing')
    return NextResponse.next()
  }

  // Get auth token from cookie
  const authToken = request.cookies.get('auth-token')?.value
  console.log('[Middleware] Auth token present:', !!authToken)
  
  // If no token, redirect to login
  if (!authToken) {
    console.log('[Middleware] No token, redirecting to login')
    const loginUrl = new URL('/login/', request.url)
    return NextResponse.redirect(loginUrl)
  }

  // For now, just check if token exists - simplified auth for development
  // In production, add proper JWT verification
  console.log('[Middleware] Token found, allowing access')
  return NextResponse.next()
}

// Define which routes to protect
export const config = {
  matcher: [
    '/admin/:path*',
    '/client/:path*',
    '/founder-command/:path*',
  ],
}
