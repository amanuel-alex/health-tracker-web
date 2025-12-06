// components/layout/Header.tsx
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
  Menu,
  Sparkles,
  Target,
  Droplets,
  Flame
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
    { id: 4, text: 'New workout challenge available', time: '1 day ago', read: true },
  ]

  const healthStats = [
    { label: 'Steps', value: '8,542', icon: <Flame className="w-4 h-4" />, progress: 85, color: 'text-blue-500' },
    { label: 'Water', value: '1.8L', icon: <Droplets className="w-4 h-4" />, progress: 90, color: 'text-cyan-500' },
    { label: 'Goals', value: '3/5', icon: <Target className="w-4 h-4" />, progress: 60, color: 'text-green-500' },
  ]

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
    // In a real app, you'd use a theme provider
    document.documentElement.classList.toggle('dark')
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-6">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5" />
            </Button>

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

              {/* Notifications Dropdown */}
              {showNotifications && (
                <>
                  <div 
                    className="fixed inset-0 z-40"
                    onClick={() => setShowNotifications(false)}
                  />
                  <Card className="absolute right-0 mt-2 w-80 z-50 shadow-2xl border-border/50">
                    <div className="p-4 border-b">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-foreground">Notifications</h3>
                        <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                          {notifications} new
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Health updates and reminders
                      </p>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notificationsList.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b hover:bg-accent cursor-pointer transition-colors ${
                            !notification.read ? 'bg-accent/30' : ''
                          }`}
                          onClick={() => setShowNotifications(false)}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-lg ${!notification.read ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                              <Bell className="w-4 h-4" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-foreground">{notification.text}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {notification.time}
                              </p>
                            </div>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t">
                      <Button variant="ghost" className="w-full text-sm">
                        View all notifications
                      </Button>
                    </div>
                  </Card>
                </>
              )}
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

              {/* User Menu Dropdown */}
              {showUserMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-40"
                    onClick={() => setShowUserMenu(false)}
                  />
                  <Card className="absolute right-0 mt-2 w-64 z-50 shadow-2xl border-border/50">
                    <div className="p-4 border-b">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow">
                          <User className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            {safeUserName}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {safeUserEmail}
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
                            className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full" 
                            style={{ width: '87%' }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="py-2">
                      <Button variant="ghost" className="w-full justify-start">
                        Profile Settings
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        Account Settings
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        Subscription
                      </Button>
                    </div>
                    <div className="p-3 border-t">
                      <Button 
                        variant="outline" 
                        className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => {
                          // Add logout logic here
                          setShowUserMenu(false)
                        }}
                      >
                        Sign Out
                      </Button>
                    </div>
                  </Card>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Stats */}
        <div className="lg:hidden mt-4">
          <div className="grid grid-cols-3 gap-4">
            {healthStats.map((stat, index) => (
              <div key={index} className="text-center p-3 rounded-lg bg-accent/30">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <div className={`${stat.color}`}>
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