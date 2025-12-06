// app/dashboard/layout.tsx
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

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
        <Card className="w-full max-w-md border-none shadow-none bg-transparent">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
            <CardTitle>Loading Dashboard</CardTitle>
            <CardDescription>
              Preparing your personalized health insights...
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

  if (!user) return null

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar user={user} />
      <div className="flex-1 flex flex-col">
        <Header user={user} />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}