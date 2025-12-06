// app/dashboard/layout.tsx - Updated with debugging
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Sidebar from '../../components/layout/Sidebar'
import Header from '../../components/layout/Header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    console.log('🔍 DashboardLayout: Starting auth check...')
    
    const checkAuth = async () => {
      try {
        console.log('🔍 Getting session from Supabase...')
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        
        console.log('📋 Session data:', session)
        console.log('❌ Session error:', sessionError)
        
        if (sessionError) {
          console.error('Session error:', sessionError)
          setError('Failed to get session')
          throw sessionError
        }
        
        if (!session) {
          console.log('⚠️ No session found, redirecting to login')
          router.push('/login')
          return
        }
        
        console.log('✅ User object structure:', {
          email: session.user?.email,
          metadata: session.user?.user_metadata,
          raw: session.user
        })
        
        setUser(session.user)
        setError(null)
      } catch (error: any) {
        console.error('❌ Auth check failed:', error)
        setError(error.message)
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('🔄 Auth state changed:', event)
        console.log('📱 Session after change:', session)
        
        if (!session) {
          console.log('👋 User signed out, redirecting')
          router.push('/login')
        } else {
          console.log('👤 User authenticated:', session.user?.email)
          setUser(session.user)
          setError(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <Card className="w-full max-w-md border-none shadow-none bg-transparent">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
            <CardTitle>Loading Dashboard</CardTitle>
            <CardDescription>
              Verifying your authentication...
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="h-2 bg-muted rounded-full animate-pulse"></div>
              <div className="h-2 bg-muted rounded-full animate-pulse w-3/4"></div>
              <div className="h-2 bg-muted rounded-full animate-pulse w-1/2"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-destructive">Authentication Error</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Please try logging in again
            </p>
            <button
              onClick={() => router.push('/login')}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
            >
              Go to Login
            </button>
          </CardContent>
        </Card>
      </div>
    )
  }

  console.log('🎯 Rendering dashboard with user:', user)
  console.log('📧 User email:', user?.email)
  console.log('👤 User metadata:', user?.user_metadata)

  return (
    <div className="flex min-h-screen bg-background">
      {/* Debug overlay - remove in production */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 z-50 bg-black/80 text-white text-xs p-2 rounded">
          User: {user?.email || 'No email'}
        </div>
      )}
      
      <Sidebar 
        userEmail={user?.email || 'No email'}
        userName={user?.user_metadata?.full_name || 'User'}
      />
      <div className="flex-1 flex flex-col">
        <Header 
          userEmail={user?.email || 'No email'}
          userName={user?.user_metadata?.full_name || 'User'}
        />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}