// components/layout/Sidebar.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { 
  LayoutDashboard,
  FileText,
  BarChart3,
  Calendar,
  Target,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  User,
  Heart,
  Flame,
  Droplets,
  Moon,
  Apple,
  Home,
  TrendingUp,
  Activity,
  Shield
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface SidebarProps {
  userEmail?: string
  userName?: string
}

export default function Sidebar({ userEmail, userName }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  const navItems = [
    {
      category: 'overview',
      label: 'Overview',
      items: [
        {
          href: '/dashboard',
          label: 'Dashboard',
          icon: <LayoutDashboard className="w-5 h-5" />,
          badge: null
        },
        {
          href: '/dashboard/logs',
          label: 'Daily Logs',
          icon: <FileText className="w-5 h-5" />,
          badge: '5'
        },
        {
          href: '/dashboard/analytics',
          label: 'Analytics',
          icon: <BarChart3 className="w-5 h-5" />,
          badge: null
        },
        {
          href: '/dashboard/calendar',
          label: 'Calendar',
          icon: <Calendar className="w-5 h-5" />,
          badge: null
        }
      ]
    },
    {
      category: 'tracking',
      label: 'Health Tracking',
      items: [
        {
          href: '/dashboard/fitness',
          label: 'Fitness',
          icon: <Flame className="w-5 h-5" />,
          badge: null
        },
        {
          href: '/dashboard/nutrition',
          label: 'Nutrition',
          icon: <Apple className="w-5 h-5" />,
          badge: null
        },
        {
          href: '/dashboard/hydration',
          label: 'Hydration',
          icon: <Droplets className="w-5 h-5" />,
          badge: '3'
        },
        {
          href: '/dashboard/sleep',
          label: 'Sleep',
          icon: <Moon className="w-5 h-5" />,
          badge: null
        }
      ]
    },
    {
      category: 'goals',
      label: 'Goals & Progress',
      items: [
        {
          href: '/dashboard/goals',
          label: 'My Goals',
          icon: <Target className="w-5 h-5" />,
          badge: '3'
        },
        {
          href: '/dashboard/progress',
          label: 'Progress',
          icon: <TrendingUp className="w-5 h-5" />,
          badge: null
        }
      ]
    }
  ]

  const bottomItems = [
    {
      href: '/dashboard/settings',
      label: 'Settings',
      icon: <Settings className="w-5 h-5" />
    },
    {
      href: '/dashboard/help',
      label: 'Help & Support',
      icon: <HelpCircle className="w-5 h-5" />
    }
  ]

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard'
    }
    return pathname.startsWith(href)
  }

  // Safe user info
  const safeUserEmail = userEmail || 'user@example.com'
  const safeUserName = userName || safeUserEmail.split('@')[0]

  return (
    <aside className={cn(
      "flex flex-col h-screen border-r border-border bg-sidebar transition-all duration-300 ease-in-out sticky top-0",
      collapsed ? "w-20" : "w-64"
    )}>
      {/* Logo Section */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          {!collapsed ? (
            <Link href="/dashboard" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Heart className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <span className="text-lg font-bold text-sidebar-foreground block">HealthTrack</span>
                <span className="text-xs text-muted-foreground">Dashboard</span>
              </div>
            </Link>
          ) : (
            <div className="w-full flex justify-center">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg">
                <Heart className="w-6 h-6 text-primary-foreground" />
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6 px-4">
        {navItems.map((section) => (
          <div key={section.category} className="mb-8 last:mb-0">
            {!collapsed && (
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
                {section.label}
              </h3>
            )}
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group",
                      isActive(item.href)
                        ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:shadow-sm"
                    )}
                  >
                    <span className={cn(
                      "transition-colors",
                      isActive(item.href)
                        ? "text-sidebar-primary-foreground"
                        : "text-muted-foreground group-hover:text-sidebar-accent-foreground"
                    )}>
                      {item.icon}
                    </span>
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-sm font-medium">{item.label}</span>
                        {item.badge && (
                          <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary font-medium">
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Daily Progress */}
        {!collapsed && (
          <div className="mt-8 p-4 rounded-xl bg-sidebar-accent/30 border border-sidebar-border">
            <h4 className="text-sm font-medium text-sidebar-foreground mb-3">Today's Progress</h4>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                  <span>Steps</span>
                  <span>8,542 / 10,000</span>
                </div>
                <div className="h-1.5 w-full bg-sidebar-border rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-500"
                    style={{ width: '85.42%' }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                  <span>Water</span>
                  <span>1.8L / 2L</span>
                </div>
                <div className="h-1.5 w-full bg-sidebar-border rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                    style={{ width: '90%' }}
                  />
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full mt-4 text-xs"
              onClick={() => router.push('/dashboard/logs')}
            >
              <Activity className="w-3 h-3 mr-2" />
              Add Today's Log
            </Button>
          </div>
        )}
      </div>

      {/* Bottom Section */}
      <div className="border-t border-sidebar-border p-4 space-y-4">
        {/* Settings */}
        <ul className="space-y-1">
          {bottomItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-xl transition-colors",
                  isActive(item.href)
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                )}
              >
                <span className="text-muted-foreground">{item.icon}</span>
                {!collapsed && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* User Profile */}
        {!collapsed && (
          <div className="p-3 rounded-xl bg-sidebar-accent/30 border border-sidebar-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow">
                <User className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  {safeUserName}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {safeUserEmail}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1">
                <Shield className="w-3 h-3 text-green-500" />
                <span className="text-muted-foreground">Premium</span>
              </div>
              <span className="text-green-500 font-medium">Day 14</span>
            </div>
          </div>
        )}

        {/* Logout Button */}
        <Button
          variant="ghost"
          onClick={handleLogout}
          className={cn(
            "w-full text-sidebar-foreground hover:bg-destructive/10 hover:text-destructive transition-colors",
            collapsed && "justify-center"
          )}
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && (
            <span className="ml-2 text-sm font-medium">Logout</span>
          )}
        </Button>
      </div>
    </aside>
  )
}