import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  Plane,
  Briefcase,
  Calendar,
  Shield,
  TrendingUp,
} from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'

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

  // Mock visa data (in real app, this would come from database)
  const visaData = {
    type: 'F-1',
    status: 'Active',
    programEndDate: new Date('2025-12-15'),
    i20ExpiryDate: new Date('2025-12-15'),
    visaStampExpiry: new Date('2028-06-15'),
    lastEntry: new Date('2024-01-10'),
    workHoursThisWeek: 12,
    maxWorkHours: 20,
  }

  // Calculate days remaining
  const today = new Date()
  const daysRemaining = Math.ceil((visaData.programEndDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  const workHoursPercent = (visaData.workHoursThisWeek / visaData.maxWorkHours) * 100

  // Quick actions
  const quickActions = [
    { title: 'Upload Document', href: '/dashboard/documents', description: 'Add I-20, passport, or visa', icon: FileText },
    { title: 'View Checklist', href: '/dashboard/checklist', description: 'Track arrival tasks', icon: CheckCircle2 },
    { title: 'Check Deadlines', href: '/dashboard/reminders', description: 'View upcoming dates', icon: Calendar },
    { title: 'Read News', href: '/dashboard/news', description: 'Immigration updates', icon: Shield },
  ]

  // Upcoming deadlines
  const upcomingDeadlines = [
    { title: 'Travel Signature Renewal', date: 'Feb 15, 2024', daysLeft: 28, priority: 'medium' },
    { title: 'I-20 Program End Date', date: 'Dec 15, 2025', daysLeft: daysRemaining, priority: 'low' },
    { title: 'Address Change Report', date: 'Jan 25, 2024', daysLeft: 7, priority: 'high' },
  ]

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
          Welcome back, {profile?.full_name || user.email?.split('@')[0]}
        </h1>
        <p className="text-gray-500 mt-1">
          Here&apos;s your immigration status overview
        </p>
      </div>

      {/* Visa Status Banner */}
      <Card className="mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
                <Plane className="h-8 w-8 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge className="bg-green-400 text-green-900 hover:bg-green-400">
                    {visaData.status}
                  </Badge>
                  <span className="text-blue-100 text-sm">F-1 Student Visa</span>
                </div>
                <h2 className="text-2xl font-bold">{daysRemaining} Days Remaining</h2>
                <p className="text-blue-100 text-sm">Program ends Dec 15, 2025</p>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-blue-100 text-xs uppercase tracking-wider">I-20 Expires</p>
                <p className="text-lg font-semibold mt-1">Dec 15, 2025</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-blue-100 text-xs uppercase tracking-wider">Visa Stamp</p>
                <p className="text-lg font-semibold mt-1">Jun 15, 2028</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4 col-span-2 lg:col-span-1">
                <p className="text-blue-100 text-xs uppercase tracking-wider">Last US Entry</p>
                <p className="text-lg font-semibold mt-1">Jan 10, 2024</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Work Hours & Status Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Work Hours Tracker */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Work Hours This Week</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">
                      {visaData.workHoursThisWeek}/{visaData.maxWorkHours}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-purple-50 text-purple-600">
                    <Briefcase className="h-5 w-5" />
                  </div>
                </div>
                <Progress value={workHoursPercent} className="h-2 mb-2" />
                <p className="text-xs text-gray-500">
                  {visaData.maxWorkHours - visaData.workHoursThisWeek} hours remaining (max 20hrs/week during school)
                </p>
              </CardContent>
            </Card>

            {/* Enrollment Status */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Enrollment Status</p>
                    <p className="text-3xl font-bold text-green-600 mt-1">Full-Time</p>
                  </div>
                  <div className="p-3 rounded-xl bg-green-50 text-green-600">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <p className="text-sm text-gray-600">12 credits enrolled (min 12 required)</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Deadlines */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Upcoming Deadlines</CardTitle>
                <Link href="/dashboard/reminders" className="text-sm text-blue-600 hover:text-blue-700">
                  View all
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingDeadlines.map((deadline, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-4 rounded-xl ${
                      deadline.priority === 'high' ? 'bg-red-50 border border-red-100' :
                      deadline.priority === 'medium' ? 'bg-yellow-50 border border-yellow-100' :
                      'bg-gray-50 border border-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        deadline.priority === 'high' ? 'bg-red-100' :
                        deadline.priority === 'medium' ? 'bg-yellow-100' : 'bg-gray-200'
                      }`}>
                        <Clock className={`h-5 w-5 ${
                          deadline.priority === 'high' ? 'text-red-600' :
                          deadline.priority === 'medium' ? 'text-yellow-600' : 'text-gray-600'
                        }`} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{deadline.title}</p>
                        <p className="text-sm text-gray-500">{deadline.date}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className={
                      deadline.priority === 'high' ? 'bg-red-100 text-red-700' :
                      deadline.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }>
                      {deadline.daysLeft} days
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Progress Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Your Progress</CardTitle>
              <CardDescription>Track your journey milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-gray-700">Checklist Completion</span>
                    <span className="text-gray-500">{progressPercent}%</span>
                  </div>
                  <Progress value={progressPercent} className="h-3" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-xl p-4">
                    <p className="text-sm font-medium text-blue-800">Documents</p>
                    <p className="text-2xl font-bold text-blue-900 mt-1">3/5</p>
                    <p className="text-xs text-blue-600 mt-1">60% uploaded</p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4">
                    <p className="text-sm font-medium text-green-800">Pre-Arrival</p>
                    <p className="text-2xl font-bold text-green-900 mt-1">8/9</p>
                    <p className="text-xs text-green-600 mt-1">89% complete</p>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4">
                    <p className="text-sm font-medium text-purple-800">First Week</p>
                    <p className="text-2xl font-bold text-purple-900 mt-1">2/8</p>
                    <p className="text-xs text-purple-600 mt-1">25% complete</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Quick Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action) => (
                <Link
                  key={action.title}
                  href={action.href}
                  className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-white border border-gray-200 group-hover:border-blue-200 group-hover:bg-blue-50 transition-colors">
                    <action.icon className="h-4 w-4 text-gray-600 group-hover:text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                      {action.title}
                    </p>
                    <p className="text-xs text-gray-500">{action.description}</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </Link>
              ))}
            </CardContent>
          </Card>

          {/* Status Health */}
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-100">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-green-900">Status: Healthy</p>
                  <p className="text-sm text-green-700">All requirements met</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-green-700">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Full-time enrollment verified</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-700">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Work hours within limit</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-700">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Documents up to date</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alert Card */}
          <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-100">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-amber-900">Action Needed</p>
                  <p className="text-sm text-amber-700 mt-1">
                    Report your address change to the international office within 10 days of moving.
                  </p>
                  <Link href="/dashboard/reminders" className="text-sm font-medium text-amber-700 hover:text-amber-900 mt-2 inline-block">
                    View reminder →
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
