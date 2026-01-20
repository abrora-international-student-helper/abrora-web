'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { User as SupabaseUser } from '@supabase/supabase-js'
import {
  LayoutDashboard,
  FileText,
  Bell,
  CreditCard,
  Car,
  BookOpen,
  Shield,
  Menu,
  LogOut,
  User,
  Settings,
  CheckSquare,
  Newspaper,
  X,
  ChevronRight,
  ChevronUp,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Documents', href: '/dashboard/documents', icon: FileText },
  { name: 'Checklist', href: '/dashboard/checklist', icon: CheckSquare },
  { name: 'Reminders', href: '/dashboard/reminders', icon: Bell },
  { name: 'News', href: '/dashboard/news', icon: Newspaper },
]

const resourceItems = [
  { name: 'Rookie Guide', href: '/rookie', icon: BookOpen },
  { name: 'Car Guide', href: '/car', icon: Car },
  { name: 'Credit Cards', href: '/credit-card', icon: CreditCard },
  { name: 'Scam Alerts', href: '/scam-alerts', icon: Shield },
]

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const profileRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const NavLink = ({ item }: { item: typeof navItems[0] }) => {
    const isActive = pathname === item.href ||
      (item.href !== '/dashboard' && pathname.startsWith(item.href))

    return (
      <Link
        href={item.href}
        onClick={() => setSidebarOpen(false)}
        className={cn(
          'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
          isActive
            ? 'bg-gray-900 text-white'
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        )}
      >
        <item.icon className="h-4 w-4" />
        <span>{item.name}</span>
      </Link>
    )
  }

  const ResourceLink = ({ item }: { item: typeof resourceItems[0] }) => {
    const isActive = pathname === item.href || pathname.startsWith(item.href + '/')

    return (
      <Link
        href={item.href}
        onClick={() => setSidebarOpen(false)}
        className={cn(
          'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
          isActive
            ? 'bg-gray-900 text-white'
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        )}
      >
        <item.icon className="h-4 w-4" />
        <span>{item.name}</span>
        {!isActive && <ChevronRight className="h-3 w-3 ml-auto text-gray-400" />}
      </Link>
    )
  }

  const Sidebar = () => (
    <div className="flex flex-col h-full bg-white">
      {/* Logo */}
      <div className="flex items-center justify-between h-14 px-4 border-b border-gray-100">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gray-900 flex items-center justify-center">
            <span className="text-white font-bold text-xs">A</span>
          </div>
          <span className="font-semibold text-gray-900">Abrora</span>
        </Link>
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden p-1 rounded hover:bg-gray-100"
        >
          <X className="h-4 w-4 text-gray-500" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
        <div className="space-y-1">
          <p className="px-3 text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Dashboard
          </p>
          {navItems.map((item) => (
            <NavLink key={item.href} item={item} />
          ))}
        </div>

        <div className="space-y-1">
          <p className="px-3 text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Resources
          </p>
          {resourceItems.map((item) => (
            <ResourceLink key={item.href} item={item} />
          ))}
        </div>
      </nav>

      {/* User Section */}
      <div className="p-3 border-t border-gray-100" ref={profileRef}>
        {user ? (
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors w-full"
            >
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">
                  {user.email?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.user_metadata?.full_name || user.email?.split('@')[0]}
                </p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
              <ChevronUp className={cn(
                "h-4 w-4 text-gray-400 transition-transform",
                profileOpen ? "rotate-0" : "rotate-180"
              )} />
            </button>

            {/* Dropdown Menu */}
            {profileOpen && (
              <div className="absolute bottom-full left-0 right-0 mb-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50">
                <Link
                  href="/dashboard/settings"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </Link>
                <button
                  onClick={() => {
                    setProfileOpen(false)
                    handleSignOut()
                  }}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors w-full border-t border-gray-100"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Log out</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            <User className="h-4 w-4" />
            <span>Sign In</span>
          </Link>
        )}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 z-40 flex items-center justify-between px-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 -ml-2 rounded-lg hover:bg-gray-100"
        >
          <Menu className="h-5 w-5 text-gray-600" />
        </button>

        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gray-900 flex items-center justify-center">
            <span className="text-white font-bold text-xs">A</span>
          </div>
        </Link>

        {user ? (
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">
              {user.email?.charAt(0).toUpperCase()}
            </span>
          </div>
        ) : (
          <Link
            href="/login"
            className="text-sm font-medium text-gray-900"
          >
            Sign In
          </Link>
        )}
      </header>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/20 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          'lg:hidden fixed inset-y-0 left-0 w-64 bg-white z-50 transform transition-transform duration-200',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <Sidebar />
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-56 lg:flex-col border-r border-gray-200">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main className="lg:pl-56">
        <div className="pt-14 lg:pt-0 min-h-screen">
          {children}
        </div>
      </main>
    </div>
  )
}
