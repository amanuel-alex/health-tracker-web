// middleware.ts - TEMPORARILY DISABLE
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // TEMPORARILY DISABLE ALL MIDDLEWARE LOGIC
  // This will be enabled once auth is working
  return NextResponse.next()
}

export const config = {
  matcher: [],
}