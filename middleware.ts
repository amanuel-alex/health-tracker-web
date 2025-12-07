// middleware.ts - UPDATED VERSION
import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Create a response object
  const response = NextResponse.next()
  
  // Get the current pathname
  const pathname = request.nextUrl.pathname
  console.log('[Middleware] Path:', pathname)
  
  // Create Supabase client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  // Refresh session
  await supabase.auth.getSession()
  
  // Get current session
  const { data: { session } } = await supabase.auth.getSession()
  console.log('[Middleware] Session exists:', !!session)

  // Define route patterns
  const isAuthRoute = pathname === '/auth/login' || pathname === '/auth/signup'
  const isDashboardRoute = pathname.startsWith('/dashboard')
  
  console.log('[Middleware] isAuthRoute:', isAuthRoute)
  console.log('[Middleware] isDashboardRoute:', isDashboardRoute)

  // If trying to access dashboard without session
  if (isDashboardRoute && !session) {
    console.log('[Middleware] Redirecting to /auth/login')
    const loginUrl = new URL('/auth/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  // If logged in but trying to access auth pages
  if (isAuthRoute && session) {
    console.log('[Middleware] Redirecting to /dashboard')
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

export const config = {
  matcher: [
    // Match all routes except static files
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}