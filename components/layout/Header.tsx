// components/layout/Header.tsx - Remove mobile menu button (since it's now in Sidebar)
'use client'

import { useState } from 'react'
import { 
  Bell, 
  Search, 
  User, 
  ChevronDown,
  Sun,
  Moon,
  Calendar,
  Flame,
  Droplets,
  Target,
} from 'lucide-react'
import { format } from 'date-fns'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface HeaderProps {
  userEmail?: string
  userName?: string
}

export default function Header({ userEmail, userName }: HeaderProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [notifications] = useState(3)
  const [searchQuery, setSearchQuery] = useState('')
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  // Safe user info
  const safeUserEmail = userEmail || 'user@example.com'
  const safeUserName = userName || safeUserEmail.split('@')[0]

  const notificationsList = [
    { id: 1, text: 'Water reminder: Time to hydrate!', time: '5 min ago', read: false },
    { id: 2, text: 'Weekly health report is ready', time: '1 hour ago', read: true },
    { id: 3, text: "You've reached 8,000 steps today!", time: '2 hours ago', read: true },
  ]

  const healthStats = [
    { label: 'Steps', value: '8,542', icon: <Flame className="w-4 h-4" />, progress: 85, color: 'text-blue-500' },
    { label: 'Water', value: '1.8L', icon: <Droplets className="w-4 h-4" />, progress: 90, color: 'text-cyan-500' },
    { label: 'Goals', value: '3/5', icon: <Target className="w-4 h-4" />, progress: 60, color: 'text-green-500' },
  ]

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark')
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-6">
            {/* Date & Welcome */}
            <div className="hidden md:flex items-center gap-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <span className="text-sm font-medium text-foreground">
                  {format(new Date(), 'EEEE, MMMM d')}
                </span>
                <p className="text-xs text-muted-foreground">
                  Welcome back, {safeUserName}!
                </p>
              </div>
            </div>

            {/* Quick Stats (Desktop) */}
            <div className="hidden lg:flex items-center gap-6">
              {healthStats.map((stat, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${stat.color.replace('text-', 'bg-')}/10`}>
                    {stat.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">{stat.label}</span>
                    <span className="text-lg font-bold text-foreground">{stat.value}</span>
                  </div>
                  <div className="w-16">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>{stat.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${stat.color.replace('text-', 'bg-')} transition-all duration-500`}
                        style={{ width: `${stat.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="hidden md:block relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="search"
                placeholder="Search health logs, metrics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </Button>

            {/* Notifications */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowNotifications(!showNotifications)}
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center font-bold shadow">
                    {notifications}
                  </span>
                )}
              </Button>
            </div>

            {/* User Menu */}
            <div className="relative">
              <Button
                variant="ghost"
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-3 pl-2 pr-3"
                aria-label="User menu"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow">
                  <User className="w-4 h-4 text-primary-foreground" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-foreground">
                    {safeUserName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Premium Member
                  </p>
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground hidden md:block" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Stats */}
        <div className="lg:hidden mt-4">
          <div className="grid grid-cols-3 gap-4">
            {healthStats.map((stat, index) => (
              <div key={index} className="text-center p-3 rounded-lg bg-accent/30">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <div className={stat.color}>
                    {stat.icon}
                  </div>
                  <div className="text-lg font-bold text-foreground">
                    {stat.value}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="search"
              placeholder="Search health logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>
    </header>
  )
}