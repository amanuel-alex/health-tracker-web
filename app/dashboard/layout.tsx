
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        router.push('/login')
        return
      }
      
      setUser(session.user)
      setLoading(false)
    }

    checkAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!session) {
          router.push('/login')
        } else {
          setUser(session.user)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <div className="text-center">
          <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-accent/20 mb-6">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Loading Dashboard
          </h2>
          <p className="text-muted-foreground">
            Preparing your personalized health insights...
          </p>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar 
        userEmail={user.email}
        userName={user.user_metadata?.full_name}
      />
      <div className="flex-1 flex flex-col">
        <Header 
          userEmail={user.email}
          userName={user.user_metadata?.full_name}
        />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
        
        {/* Footer */}
        <footer className="border-t border-border py-4 px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div>
              <span className="font-medium text-foreground">HealthTrack Pro</span> • 
              Your health companion • v1.0.0
            </div>
            <div className="flex items-center gap-6">
              <span>Last sync: Just now</span>
              <span className="hidden md:inline">•</span>
              <span className="text-green-500 font-medium">All systems operational</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}