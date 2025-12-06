// components/Sidebar.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard,
  FileText,
  BarChart3,
  Calendar,
  Target,
  Bell,
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
  Apple
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { useTheme } from './theme-provider'

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [activeCategory, setActiveCategory] = useState('overview')
  const pathname = usePathname()
  const router = useRouter()
  const { theme } = useTheme()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/auth/login')
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
      category: 'health',
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
        },
        {
          href: '/dashboard/vitals',
          label: 'Vitals',
          icon: <Heart className="w-5 h-5" />,
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
          href: '/dashboard/challenges',
          label: 'Challenges',
          icon: <Target className="w-5 h-5" />,
          badge: 'New'
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

  return (
    <aside className={`${collapsed ? 'w-20' : 'w-64'} flex flex-col h-screen border-r border-border bg-sidebar transition-all duration-300 sticky top-0`}>
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Heart className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <span className="text-lg font-bold text-sidebar-foreground block">HealthTrack</span>
                <span className="text-xs text-muted-foreground">Dashboard</span>
              </div>
            </Link>
          )}
          {collapsed && (
            <div className="w-full flex justify-center">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Heart className="w-6 h-6 text-primary-foreground" />
              </div>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6 px-4">
        {navItems.map((section) => (
          <div key={section.category} className="mb-8">
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
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group ${
                      isActive(item.href)
                        ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                        : 'text-sidebar-foreground hover:bg-sidebar-accent'
                    }`}
                  >
                    <span className={`${isActive(item.href) ? 'text-sidebar-primary-foreground' : 'text-muted-foreground group-hover:text-sidebar-accent-foreground'}`}>
                      {item.icon}
                    </span>
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-sm font-medium">{item.label}</span>
                        {item.badge && (
                          <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
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

        {/* Quick Stats (Visible when expanded) */}
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
                    className="h-full bg-primary rounded-full" 
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
                    className="h-full bg-blue-500 rounded-full" 
                    style={{ width: '90%' }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Section */}
      <div className="border-t border-sidebar-border p-4">
        {/* Settings & Help */}
        <ul className="space-y-1 mb-4">
          {bottomItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                  isActive(item.href)
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent'
                }`}
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
        <div className={`flex items-center gap-3 p-3 rounded-lg hover:bg-sidebar-accent transition-colors cursor-pointer ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <User className="w-4 h-4 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                John Doe
              </p>
              <p className="text-xs text-muted-foreground truncate">
                Premium Member
              </p>
            </div>
          )}
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sidebar-foreground hover:bg-destructive/10 hover:text-destructive transition-colors ${collapsed ? 'justify-center' : ''}`}
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && (
            <span className="text-sm font-medium">Logout</span>
          )}
        </button>
      </div>
    </aside>
  )
}