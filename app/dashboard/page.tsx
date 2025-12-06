// app/dashboard/page.tsx
'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Activity, Apple, Moon, Heart, TrendingUp, Droplets, Flame, Target, Calendar } from 'lucide-react'

export default function DashboardPage() {
  const [healthCards] = useState([
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
  ])

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Dashboard Overview
          </h1>
          <p className="text-muted-foreground mt-1">
            Track your health progress and insights
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/30 text-accent-foreground">
            <Calendar className="w-4 h-4" />
            <span className="font-medium">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </span>
          </div>
          <Button>
            <TrendingUp className="w-4 h-4 mr-2" />
            Add Log
          </Button>
        </div>
      </div>

      {/* Health Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {healthCards.map((card, index) => (
          <Card key={index} className="border-border/50 hover:border-primary/30 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${card.bgColor} ${card.color}`}>
                  {card.icon}
                </div>
                <span className={`text-sm font-medium ${card.trend.includes('+') ? 'text-green-500' : 'text-muted-foreground'}`}>
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
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Daily Goals
            </CardTitle>
            <CardDescription>3 of 5 goals completed today</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: '10,000 steps', progress: 85, color: 'bg-primary' },
              { label: '2L water', progress: 90, color: 'bg-cyan-500' },
              { label: '7+ hours sleep', progress: 94, color: 'bg-purple-500' },
            ].map((goal, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-foreground">{goal.label}</span>
                  <span className="text-muted-foreground">{goal.progress}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${goal.color} transition-all duration-500`}
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" />
              Recent Activity
            </CardTitle>
            <CardDescription>Today's workouts & exercises</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { activity: 'Morning Run', duration: '45 min', calories: '320' },
              { activity: 'Weight Training', duration: '30 min', calories: '280' },
              { activity: 'Yoga Session', duration: '20 min', calories: '150' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-accent/30">
                <div>
                  <p className="font-medium text-foreground">{item.activity}</p>
                  <p className="text-sm text-muted-foreground">{item.duration}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-foreground">{item.calories}</p>
                  <p className="text-sm text-muted-foreground">calories</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              Health Score
            </CardTitle>
            <CardDescription>Your overall wellness index</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-4">
              <div className="relative inline-flex">
                <div className="w-32 h-32 rounded-full border-8 border-muted"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-foreground">87</div>
                    <div className="text-sm text-muted-foreground">/100</div>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Excellent! Keep up the good work
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Manage your health data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <Apple className="w-6 h-6" />
              <span>Log Food</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <Activity className="w-6 h-6" />
              <span>Add Workout</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <Moon className="w-6 h-6" />
              <span>Sleep Log</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <Droplets className="w-6 h-6" />
              <span>Water Intake</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}