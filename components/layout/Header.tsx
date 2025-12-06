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
  Menu
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { format } from 'date-fns'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface HeaderProps {
  userEmail?: string
  userName?: string
}

export default function Header({ userEmail, userName }: HeaderProps) {
  const { theme, setTheme } = useTheme()
  const [notifications] = useState(3)
  const [searchQuery, setSearchQuery] = useState('')
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const notificationsList = [
    { id: 1, text: 'Water reminder: Time to hydrate!', time: '5 min ago', read: false },
    { id: 2, text: 'Weekly health report is ready', time: '1 hour ago', read: true },
    { id: 3, text: "You've reached 8,000 steps today!", time: '2 hours ago', read: true },
  ]

  const healthQuickStats = [
    { label: 'Steps', value: '8,542', progress: 85, color: 'bg-blue-500' },
    { label: 'Water', value: '1.8L', progress: 90, color: 'bg-cyan-500' },
    { label: 'Calories', value: '2,150', progress: 86, color: 'bg-green-500' },
    { label: 'Sleep', value: '7.5h', progress: 94, color: 'bg-purple-500' }
  ]

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
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden"
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5" />
            </Button>

            {/* Date */}
            <div className="hidden md:flex items-center gap-2">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <div>
                <span className="text-sm font-medium text-foreground">
                  {format(new Date(), 'EEEE, MMMM d')}
                </span>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="hidden md:block relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="search"
                placeholder="Search health logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
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
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
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
                  <Card className="absolute right-0 mt-2 w-80 z-50">
                    <div className="p-4 border-b">
                      <h3 className="font-bold text-foreground">Notifications</h3>
                      <p className="text-sm text-muted-foreground">
                        {notifications} unread
                      </p>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notificationsList.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b hover:bg-accent cursor-pointer transition-colors ${
                            !notification.read ? 'bg-accent/30' : ''
                          }`}
                        >
                          <p className="text-sm text-foreground">{notification.text}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {notification.time}
                          </p>
                        </div>
                      ))}
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
                className="flex items-center gap-3"
                aria-label="User menu"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <User className="w-4 h-4 text-primary-foreground" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-foreground">
                    {userName || userEmail?.split('@')[0] || 'User'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Health Enthusiast
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
                  <Card className="absolute right-0 mt-2 w-64 z-50">
                    <div className="p-4 border-b">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                          <User className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            {userName || userEmail?.split('@')[0]}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {userEmail}
                          </p>
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
                        Billing
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
      </div>
    </header>
  )
}