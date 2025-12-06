// components/Header.tsx
'use client'

import { useState, useEffect } from 'react'
import { 
  Bell, 
  Search, 
  User, 
  ChevronDown,
  Sun,
  Moon,
  Calendar,
  TrendingUp,
  Menu
} from 'lucide-react'
import { useTheme } from './theme-provider'
import { format } from 'date-fns'
import { supabase } from '@/lib/supabase'

interface HeaderProps {
  user?: any
}

export default function Header({ user }: HeaderProps) {
  const { theme, toggleTheme } = useTheme()
  const [notifications, setNotifications] = useState(3)
  const [searchQuery, setSearchQuery] = useState('')
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [todayHealth, setTodayHealth] = useState({
    steps: 8542,
    water: 1.8,
    calories: 2150,
    sleep: 7.5
  })

  useEffect(() => {
    fetchUserProfile()
    // Simulate real-time updates
    const interval = setInterval(() => {
      setTodayHealth(prev => ({
        ...prev,
        steps: prev.steps + Math.floor(Math.random() * 10)
      }))
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const fetchUserProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
      setUserProfile(data)
    }
  }

  const notificationsList = [
    { id: 1, text: 'Water reminder: Time to hydrate!', time: '5 min ago', read: false },
    { id: 2, text: 'Weekly health report is ready', time: '1 hour ago', read: true },
    { id: 3, text: 'You\'ve reached 8,000 steps today!', time: '2 hours ago', read: true },
    { id: 4, text: 'New workout challenge available', time: '1 day ago', read: true },
  ]

  const userMenuItems = [
    { label: 'Profile Settings', href: '/dashboard/profile' },
    { label: 'Account Settings', href: '/dashboard/settings' },
    { label: 'Billing', href: '/dashboard/billing' },
    { label: 'Privacy & Security', href: '/dashboard/privacy' },
  ]

  const healthQuickStats = [
    {
      label: 'Steps',
      value: todayHealth.steps.toLocaleString(),
      icon: TrendingUp,
      color: 'text-blue-500',
      progress: 85,
      goal: 10000
    },
    {
      label: 'Water',
      value: `${todayHealth.water}L`,
      icon: TrendingUp,
      color: 'text-cyan-500',
      progress: 90,
      goal: 2
    },
    {
      label: 'Calories',
      value: todayHealth.calories.toLocaleString(),
      icon: TrendingUp,
      color: 'text-green-500',
      progress: 86,
      goal: 2500
    },
    {
      label: 'Sleep',
      value: `${todayHealth.sleep}h`,
      icon: TrendingUp,
      color: 'text-purple-500',
      progress: 94,
      goal: 8
    }
  ]

  const handleNotificationClick = (id: number) => {
    // Mark as read
    setNotifications(prev => Math.max(0, prev - 1))
    setShowNotifications(false)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality
    console.log('Searching for:', searchQuery)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section - Date & Quick Stats */}
          <div className="flex items-center gap-6">
            {/* Mobile Menu Button (Hidden on desktop) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-accent transition-colors"
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Date */}
            <div className="hidden md:flex items-center gap-2">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <div>
                <span className="text-sm font-medium text-foreground">
                  {format(new Date(), 'EEEE, MMMM d')}
                </span>
                <span className="text-xs text-muted-foreground ml-2">
                  Week 14
                </span>
              </div>
            </div>

            {/* Quick Stats (Desktop) */}
            <div className="hidden lg:flex items-center gap-6">
              {healthQuickStats.map((stat, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">{stat.label}</span>
                    <span className="text-lg font-bold text-foreground">{stat.value}</span>
                  </div>
                  <div className="w-16">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                      <span>{stat.progress}%</span>
                      <span>/ {stat.goal}</span>
                    </div>
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${stat.color.replace('text-', 'bg-')}`}
                        style={{ width: `${stat.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Section - Search, Notifications, User */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="hidden md:block relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="search"
                  placeholder="Search health logs, metrics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </form>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-accent transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-muted-foreground" />
              ) : (
                <Sun className="w-5 h-5 text-muted-foreground" />
              )}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-lg hover:bg-accent transition-colors relative"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5 text-muted-foreground" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <>
                  <div 
                    className="fixed inset-0 z-40"
                    onClick={() => setShowNotifications(false)}
                  />
                  <div className="absolute right-0 mt-2 w-80 bg-popover border border-border rounded-xl shadow-2xl z-50 overflow-hidden">
                    <div className="p-4 border-b border-border">
                      <h3 className="font-bold text-foreground">Notifications</h3>
                      <p className="text-sm text-muted-foreground">
                        {notifications} unread notifications
                      </p>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notificationsList.map((notification) => (
                        <div
                          key={notification.id}
                          onClick={() => handleNotificationClick(notification.id)}
                          className={`p-4 border-b border-border hover:bg-accent cursor-pointer transition-colors ${
                            !notification.read ? 'bg-accent/30' : ''
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <p className="text-sm text-foreground">{notification.text}</p>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-primary rounded-full ml-2 flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {notification.time}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 border-t border-border">
                      <button className="text-sm text-primary hover:text-primary/80 font-medium w-full text-center">
                        View all notifications
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-colors"
                aria-label="User menu"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  {userProfile?.avatar_url ? (
                    <img 
                      src={userProfile.avatar_url} 
                      alt="Profile" 
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-4 h-4 text-primary-foreground" />
                  )}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-foreground">
                    {userProfile?.full_name || user?.email?.split('@')[0] || 'User'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {userProfile?.health_goals?.[0] || 'Health Enthusiast'}
                  </p>
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground hidden md:block" />
              </button>

              {/* User Menu Dropdown */}
              {showUserMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-40"
                    onClick={() => setShowUserMenu(false)}
                  />
                  <div className="absolute right-0 mt-2 w-64 bg-popover border border-border rounded-xl shadow-2xl z-50 overflow-hidden">
                    <div className="p-4 border-b border-border">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                          {userProfile?.avatar_url ? (
                            <img 
                              src={userProfile.avatar_url} 
                              alt="Profile" 
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            <User className="w-5 h-5 text-primary-foreground" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            {userProfile?.full_name || user?.email?.split('@')[0]}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {user?.email}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Health Score</span>
                          <span className="font-medium text-foreground">87/100</span>
                        </div>
                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden mt-1">
                          <div 
                            className="h-full bg-primary rounded-full" 
                            style={{ width: '87%' }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="py-2">
                      {userMenuItems.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          className="flex items-center px-4 py-3 text-sm text-foreground hover:bg-accent transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                    <div className="p-4 border-t border-border">
                      <button
                        onClick={async () => {
                          await supabase.auth.signOut()
                          window.location.href = '/auth/login'
                        }}
                        className="w-full py-2 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Quick Stats (Visible on mobile) */}
        <div className="lg:hidden mt-4">
          <div className="grid grid-cols-4 gap-3">
            {healthQuickStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-lg font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Search (Visible on mobile when menu open) */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="search"
                placeholder="Search health logs, metrics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </form>
          </div>
        )}
      </div>
    </header>
  )
}