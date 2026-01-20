import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Plane,
  Briefcase,
  Calendar,
  TrendingUp,
} from 'lucide-react'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Get user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // Get checklist progress
  const { data: checklist } = await supabase
    .from('checklist_items')
    .select('*')
    .eq('user_id', user.id)

  const completedItems = checklist?.filter(item => item.is_completed).length ?? 0
  const totalItems = checklist?.length ?? 0
  const progressPercent = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0

  // Mock visa data
  const visaData = {
    type: 'F-1',
    status: 'Active',
    programEndDate: new Date('2025-12-15'),
    workHoursThisWeek: 12,
    maxWorkHours: 20,
  }

  const today = new Date()
  const daysRemaining = Math.ceil((visaData.programEndDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

  const quickActions = [
    { title: 'Upload Document', href: '/dashboard/documents', icon: FileText },
    { title: 'View Checklist', href: '/dashboard/checklist', icon: CheckCircle2 },
    { title: 'Check Deadlines', href: '/dashboard/reminders', icon: Calendar },
  ]

  const upcomingDeadlines = [
    { title: 'Address Change Report', date: 'Jan 25, 2025', daysLeft: 7, urgent: true },
    { title: 'Travel Signature Renewal', date: 'Feb 15, 2025', daysLeft: 28, urgent: false },
    { title: 'I-20 Program End Date', date: 'Dec 15, 2025', daysLeft: daysRemaining, urgent: false },
  ]

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl lg:text-2xl font-semibold text-gray-900">
          Welcome back, {profile?.full_name || user.email?.split('@')[0]}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Here&apos;s your immigration status overview
        </p>
      </div>

      {/* Status Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
              <Plane className="h-4 w-4 text-blue-600" />
            </div>
            <span className="text-xs font-medium text-gray-500">Visa Status</span>
          </div>
          <p className="text-lg font-semibold text-gray-900">F-1 Active</p>
          <p className="text-xs text-gray-500 mt-1">{daysRemaining} days remaining</p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            </div>
            <span className="text-xs font-medium text-gray-500">Enrollment</span>
          </div>
          <p className="text-lg font-semibold text-green-600">Full-Time</p>
          <p className="text-xs text-gray-500 mt-1">12 credits enrolled</p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
              <Briefcase className="h-4 w-4 text-purple-600" />
            </div>
            <span className="text-xs font-medium text-gray-500">Work Hours</span>
          </div>
          <p className="text-lg font-semibold text-gray-900">{visaData.workHoursThisWeek}/{visaData.maxWorkHours}</p>
          <p className="text-xs text-gray-500 mt-1">{visaData.maxWorkHours - visaData.workHoursThisWeek} hrs remaining</p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-orange-600" />
            </div>
            <span className="text-xs font-medium text-gray-500">Progress</span>
          </div>
          <p className="text-lg font-semibold text-gray-900">{progressPercent}%</p>
          <p className="text-xs text-gray-500 mt-1">{completedItems}/{totalItems} tasks done</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Deadlines */}
          <div className="bg-white rounded-xl border border-gray-100">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="font-medium text-gray-900">Upcoming Deadlines</h2>
              <Link href="/dashboard/reminders" className="text-xs text-gray-500 hover:text-gray-900">
                View all
              </Link>
            </div>
            <div className="divide-y divide-gray-50">
              {upcomingDeadlines.map((deadline, index) => (
                <div key={index} className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      deadline.urgent ? 'bg-red-50' : 'bg-gray-50'
                    }`}>
                      <Clock className={`h-4 w-4 ${deadline.urgent ? 'text-red-500' : 'text-gray-400'}`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{deadline.title}</p>
                      <p className="text-xs text-gray-500">{deadline.date}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    deadline.urgent
                      ? 'bg-red-50 text-red-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {deadline.daysLeft} days
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Section */}
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <h2 className="font-medium text-gray-900 mb-4">Your Progress</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Checklist Completion</span>
                  <span className="font-medium text-gray-900">{progressPercent}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gray-900 rounded-full transition-all"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Documents</p>
                  <p className="text-sm font-semibold text-gray-900 mt-1">3/5</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Pre-Arrival</p>
                  <p className="text-sm font-semibold text-gray-900 mt-1">8/9</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">First Week</p>
                  <p className="text-sm font-semibold text-gray-900 mt-1">2/8</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-100">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-medium text-gray-900">Quick Actions</h2>
            </div>
            <div className="p-2">
              {quickActions.map((action) => (
                <Link
                  key={action.title}
                  href={action.href}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                    <action.icon className="h-4 w-4 text-gray-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 flex-1">{action.title}</span>
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              ))}
            </div>
          </div>

          {/* Status Card */}
          <div className="bg-green-50 rounded-xl p-4 border border-green-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-green-900">All Good</p>
                <p className="text-xs text-green-700">Requirements met</p>
              </div>
            </div>
            <div className="space-y-2 text-xs text-green-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3 w-3" />
                <span>Full-time enrollment verified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3 w-3" />
                <span>Work hours within limit</span>
              </div>
            </div>
          </div>

          {/* Alert Card */}
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0" />
              <div>
                <p className="font-medium text-amber-900 text-sm">Action Needed</p>
                <p className="text-xs text-amber-700 mt-1">
                  Report address change within 10 days of moving.
                </p>
                <Link
                  href="/dashboard/reminders"
                  className="text-xs font-medium text-amber-700 hover:text-amber-900 mt-2 inline-block"
                >
                  View reminder →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
