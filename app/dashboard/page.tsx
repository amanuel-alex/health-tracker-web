// app/dashboard/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { 
  Activity, 
  Apple, 
  Moon, 
  Heart, 
  TrendingUp,
  Droplets,
  Flame,
  Target,
  Calendar
} from 'lucide-react'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        router.push('/auth/login')
        return
      }
      
      setUser(session.user)
      setLoading(false)
    }

    checkAuth()
  }, [router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  const healthCards = [
    {
      title: 'Activity',
      icon: <Activity className="w-6 h-6" />,
      value: '8,542',
      unit: 'steps',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      trend: '+15%',
    },
    {
      title: 'Nutrition',
      icon: <Apple className="w-6 h-6" />,
      value: '2,150',
      unit: 'calories',
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      trend: 'On track',
    },
    {
      title: 'Sleep',
      icon: <Moon className="w-6 h-6" />,
      value: '7.5',
      unit: 'hours',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      trend: '✓ Goal met',
    },
    {
      title: 'Hydration',
      icon: <Droplets className="w-6 h-6" />,
      value: '1.8',
      unit: 'liters',
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-500/10',
      trend: '90%',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {user?.email?.split('@')[0]}! 👋
          </h1>
          <p className="text-muted-foreground mt-2">
            Here's your health summary for today
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/30 text-accent-foreground">
            <Calendar className="w-5 h-5" />
            <span className="font-medium">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
          </div>
        </div>
      </div>

      {/* Health Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {healthCards.map((card, index) => (
          <div 
            key={index} 
            className="glass-card p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${card.bgColor} ${card.color}`}>
                {card.icon}
              </div>
              <span className="text-sm font-medium text-green-500">
                {card.trend}
              </span>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              {card.title}
            </h3>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-foreground">
                {card.value}
              </span>
              <span className="text-sm text-muted-foreground">
                {card.unit}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Daily Goals</h3>
              <p className="text-sm text-muted-foreground">3 of 5 completed</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-foreground">10,000 steps</span>
                <span className="text-muted-foreground">85%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-foreground">2L water</span>
                <span className="text-muted-foreground">90%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-cyan-500 rounded-full" style={{ width: '90%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-green-500/10">
              <Flame className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Recent Activity</h3>
              <p className="text-sm text-muted-foreground">Today's workouts</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-foreground">Morning Run</span>
              <span className="text-sm text-muted-foreground">45 min</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-foreground">Weight Training</span>
              <span className="text-sm text-muted-foreground">30 min</span>
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-purple-500/10">
              <TrendingUp className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Weekly Progress</h3>
              <p className="text-sm text-muted-foreground">+12% vs last week</p>
            </div>
          </div>
          <div className="h-32 flex items-end gap-1">
            {[60, 75, 85, 90, 70, 95, 88].map((height, index) => (
              <div 
                key={index}
                className="flex-1 bg-gradient-to-t from-primary to-primary/60 rounded-t-lg transition-all hover:opacity-80"
                style={{ height: `${height}%` }}
                title={`Day ${index + 1}: ${height}%`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="glass-card p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/70 mb-4">
          <Heart className="w-8 h-8 text-primary-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-3">
          Welcome to HealthTrack Pro! 🎉
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Your health journey starts here. Track your fitness, monitor nutrition, 
          and achieve your wellness goals with our comprehensive health tracker.
        </p>
        <div className="mt-6 flex flex-wrap gap-4 justify-center">
          <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
            Add Health Log
          </button>
          <button className="px-6 py-2 border border-input text-foreground rounded-lg font-medium hover:bg-accent transition-colors">
            Set Goals
          </button>
        </div>
      </div>
    </div>
  )
}