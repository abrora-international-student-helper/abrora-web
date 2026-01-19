'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { User as SupabaseUser } from '@supabase/supabase-js'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  Bell,
  CreditCard,
  Car,
  BookOpen,
  Shield,
  ChevronLeft,
  Menu,
  LogOut,
  User,
  Settings,
  CheckSquare,
  Newspaper,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const navItems = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Documents', href: '/dashboard/documents', icon: FileText, badge: '3' },
  { name: 'Checklist', href: '/dashboard/checklist', icon: CheckSquare },
  { name: 'Reminders', href: '/dashboard/reminders', icon: Bell, badge: '2' },
  { name: 'News', href: '/dashboard/news', icon: Newspaper, badge: '1' },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
]

const resourceItems = [
  { name: 'Rookie Guide', href: '/rookie', icon: BookOpen },
  { name: 'Car Guide', href: '/car', icon: Car },
  { name: 'Credit Cards', href: '/credit-card', icon: CreditCard },
  { name: 'Scam Alerts', href: '/scam-alerts', icon: Shield },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [collapsed, setCollapsed] = useState(false)
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }
    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  const NavLink = ({ item, showLabel = true }: { item: typeof navItems[0], showLabel?: boolean }) => {
    const isActive = pathname === item.href ||
      (item.href !== '/dashboard' && pathname.startsWith(item.href))

    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Link
            href={item.href}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group',
              isActive
                ? 'bg-blue-50 text-blue-700 font-medium'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            )}
          >
            <item.icon className={cn(
              'h-5 w-5 flex-shrink-0 transition-colors',
              isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
            )} />
            {showLabel && (
              <span className="flex-1 truncate">{item.name}</span>
            )}
            {showLabel && 'badge' in item && item.badge && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs px-1.5">
                {item.badge}
              </Badge>
            )}
          </Link>
        </TooltipTrigger>
        {!showLabel && (
          <TooltipContent side="right" className="font-medium">
            {item.name}
          </TooltipContent>
        )}
      </Tooltip>
    )
  }

  const SidebarContent = ({ showLabels = true }: { showLabels?: boolean }) => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={cn(
        "flex items-center h-16 px-4 border-b border-gray-100",
        showLabels ? "justify-between" : "justify-center"
      )}>
        {showLabels ? (
          <>
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="font-semibold text-gray-900">Abrora</span>
            </Link>
            <button
              onClick={() => setCollapsed(true)}
              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors hidden lg:flex"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          </>
        ) : (
          <button
            onClick={() => setCollapsed(false)}
            className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center"
          >
            <span className="text-white font-bold text-sm">A</span>
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="space-y-1">
          {showLabels && (
            <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Dashboard
            </p>
          )}
          {navItems.map((item) => (
            <NavLink key={item.href} item={item} showLabel={showLabels} />
          ))}
        </div>

        <div className="pt-6 space-y-1">
          {showLabels && (
            <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Resources
            </p>
          )}
          {resourceItems.map((item) => (
            <NavLink key={item.href} item={item} showLabel={showLabels} />
          ))}
        </div>
      </nav>

      {/* User */}
      <div className="p-3 border-t border-gray-100">
        {user ? (
          // Logged in state
          showLabels ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl hover:bg-gray-100 transition-colors">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.user_metadata?.avatar_url || ''} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white text-sm">
                      {user.email?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/edit-profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-red-600 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Link href="/dashboard/settings" className="flex justify-center">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.user_metadata?.avatar_url || ''} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white text-sm">
                      {user.email?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="font-medium">
                Account
              </TooltipContent>
            </Tooltip>
          )
        ) : (
          // Guest state - show sign in button
          showLabels ? (
            <Link
              href="/login"
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors text-blue-700"
            >
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="h-4 w-4 text-blue-600" />
              </div>
              <span className="text-sm font-medium">Sign In</span>
            </Link>
          ) : (
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Link href="/login" className="flex justify-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="font-medium">
                Sign In
              </TooltipContent>
            </Tooltip>
          )
        )}
      </div>
    </div>
  )

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Mobile Header */}
        <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50 flex items-center justify-between px-4">
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2 rounded-lg hover:bg-gray-100">
                <Menu className="h-5 w-5 text-gray-600" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <SidebarContent />
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="font-semibold text-gray-900">Abrora</span>
          </Link>

          {user ? (
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.user_metadata?.avatar_url || ''} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white text-sm">
                {user.email?.charAt(0).toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
          ) : (
            <Link
              href="/login"
              className="px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              Sign In
            </Link>
          )}
        </header>

        {/* Desktop Sidebar */}
        <aside className={cn(
          "hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:flex-col bg-white border-r border-gray-200 transition-all duration-300 z-40",
          collapsed ? "lg:w-[72px]" : "lg:w-64"
        )}>
          <SidebarContent showLabels={!collapsed} />
        </aside>

        {/* Main Content */}
        <main className={cn(
          "pt-16 lg:pt-0 transition-all duration-300",
          collapsed ? "lg:pl-[72px]" : "lg:pl-64"
        )}>
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="min-h-screen"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </TooltipProvider>
  )
}
