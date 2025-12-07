// proxy.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Export as "proxy" function (not "GET" or "middleware")
export async function proxy(request: NextRequest) {
  const response = NextResponse.next()
  const pathname = request.nextUrl.pathname
  
  console.log('[Proxy] Path:', pathname)
  
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
  console.log('[Proxy] Session exists:', !!session)

  // Handle /login redirect
  if (pathname === '/login') {
    console.log('[Proxy] Redirecting /login to /auth/login')
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // Handle /signup redirect
  if (pathname === '/signup') {
    console.log('[Proxy] Redirecting /signup to /auth/signup')
    return NextResponse.redirect(new URL('/auth/signup', request.url))
  }

  // Define route patterns
  const isAuthRoute = pathname.startsWith('/auth')
  const isDashboardRoute = pathname.startsWith('/dashboard')
  
  // If trying to access dashboard without session
  if (isDashboardRoute && !session) {
    console.log('[Proxy] Redirecting to /auth/login from dashboard')
    const loginUrl = new URL('/auth/login', request.url)
    loginUrl.searchParams.set('redirectedFrom', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // If logged in but trying to access auth pages
  if (isAuthRoute && session) {
    console.log('[Proxy] Redirecting to /dashboard from auth page')
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

// Optional: You can also use default export
// export default proxy;

export const config = {
  matcher: [
    // Match all routes except static files
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}