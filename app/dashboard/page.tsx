import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { FileText, Clock, CheckCircle2, AlertTriangle, ArrowUpRight, TrendingUp } from 'lucide-react'
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

  // Stats cards data
  const stats = [
    {
      title: 'Documents',
      value: '3',
      description: 'uploaded',
      icon: FileText,
      trend: '+1 this week',
      color: 'blue',
    },
    {
      title: 'Upcoming Deadlines',
      value: '2',
      description: 'next 30 days',
      icon: Clock,
      trend: 'I-20 renewal due',
      color: 'orange',
    },
    {
      title: 'Tasks Completed',
      value: `${completedItems}/${totalItems}`,
      description: 'checklist items',
      icon: CheckCircle2,
      trend: `${progressPercent}% complete`,
      color: 'green',
    },
    {
      title: 'Alerts',
      value: '1',
      description: 'action needed',
      icon: AlertTriangle,
      trend: 'Review required',
      color: 'red',
    },
  ]

  // Quick actions
  const quickActions = [
    { title: 'Upload Document', href: '/dashboard/documents', description: 'Add I-20, passport, or visa' },
    { title: 'Check Deadlines', href: '/dashboard/reminders', description: 'View upcoming dates' },
    { title: 'View Analytics', href: '/dashboard/analytics', description: 'Track your progress' },
  ]

  // Recent activity (mock data)
  const recentActivity = [
    { action: 'Document uploaded', item: 'I-20 Form', time: '2 hours ago', type: 'document' },
    { action: 'Reminder set', item: 'Visa Interview', time: '1 day ago', type: 'reminder' },
    { action: 'Profile updated', item: 'Contact info', time: '3 days ago', type: 'profile' },
  ]

  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    orange: 'bg-orange-50 text-orange-600',
    green: 'bg-green-50 text-green-600',
    red: 'bg-red-50 text-red-600',
  }

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
          Welcome back, {profile?.full_name || user.email?.split('@')[0]}
        </h1>
        <p className="text-gray-500 mt-1">
          Here&apos;s what&apos;s happening with your journey
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{stat.description}</p>
                </div>
                <div className={`p-3 rounded-xl ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-4 text-sm">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-gray-600">{stat.trend}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Progress Card */}
        <Card className="lg:col-span-2">
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
                  <p className="text-xs text-blue-600 mt-1">60% complete</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4">
                  <p className="text-sm font-medium text-green-800">Visa Status</p>
                  <p className="text-2xl font-bold text-green-900 mt-1">Active</p>
                  <p className="text-xs text-green-600 mt-1">Valid until Dec 2025</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-4">
                  <p className="text-sm font-medium text-purple-800">OPT Status</p>
                  <p className="text-2xl font-bold text-purple-900 mt-1">Pending</p>
                  <p className="text-xs text-purple-600 mt-1">Application in review</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
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
                className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group"
              >
                <div>
                  <p className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    {action.title}
                  </p>
                  <p className="text-sm text-gray-500">{action.description}</p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="mt-6 lg:mt-8">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest actions and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === 'document' ? 'bg-blue-100' :
                    activity.type === 'reminder' ? 'bg-orange-100' : 'bg-green-100'
                  }`}>
                    <FileText className={`h-4 w-4 ${
                      activity.type === 'document' ? 'text-blue-600' :
                      activity.type === 'reminder' ? 'text-orange-600' : 'text-green-600'
                    }`} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-500">{activity.item}</p>
                  </div>
                </div>
                <Badge variant="secondary" className="text-gray-500 font-normal">
                  {activity.time}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
