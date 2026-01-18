'use client'

import { useState } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts'
import { TrendingUp, TrendingDown, Calendar, Target, Award, Clock } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

// Mock data for charts
const activityData = [
  { month: 'Jan', documents: 2, tasks: 5, logins: 12 },
  { month: 'Feb', documents: 3, tasks: 8, logins: 15 },
  { month: 'Mar', documents: 1, tasks: 6, logins: 10 },
  { month: 'Apr', documents: 4, tasks: 12, logins: 18 },
  { month: 'May', documents: 2, tasks: 9, logins: 14 },
  { month: 'Jun', documents: 5, tasks: 15, logins: 20 },
]

const documentBreakdown = [
  { name: 'Immigration', value: 4, color: '#3B82F6' },
  { name: 'Academic', value: 3, color: '#10B981' },
  { name: 'Financial', value: 2, color: '#F59E0B' },
  { name: 'Other', value: 1, color: '#6366F1' },
]

const taskCompletion = [
  { week: 'Week 1', completed: 5, pending: 2 },
  { week: 'Week 2', completed: 8, pending: 3 },
  { week: 'Week 3', completed: 6, pending: 4 },
  { week: 'Week 4', completed: 10, pending: 1 },
]

const milestones = [
  { title: 'Profile Setup', completed: true, date: 'Jan 5, 2024' },
  { title: 'Documents Uploaded', completed: true, date: 'Jan 10, 2024' },
  { title: 'I-20 Verified', completed: true, date: 'Jan 15, 2024' },
  { title: 'OPT Application', completed: false, date: 'Pending' },
  { title: 'EAD Card Received', completed: false, date: 'Upcoming' },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('6m')

  const stats = [
    {
      title: 'Total Documents',
      value: '10',
      change: '+2',
      trend: 'up',
      icon: Calendar,
      color: 'blue',
    },
    {
      title: 'Tasks Completed',
      value: '29',
      change: '+12',
      trend: 'up',
      icon: Target,
      color: 'green',
    },
    {
      title: 'Active Streak',
      value: '14 days',
      change: '+3',
      trend: 'up',
      icon: Award,
      color: 'purple',
    },
    {
      title: 'Avg. Response Time',
      value: '2.5 hrs',
      change: '-0.5',
      trend: 'down',
      icon: Clock,
      color: 'orange',
    },
  ]

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-500 mt-1">Track your progress and activity insights</p>
        </div>
        <Tabs value={timeRange} onValueChange={setTimeRange}>
          <TabsList>
            <TabsTrigger value="1m">1M</TabsTrigger>
            <TabsTrigger value="3m">3M</TabsTrigger>
            <TabsTrigger value="6m">6M</TabsTrigger>
            <TabsTrigger value="1y">1Y</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl bg-${stat.color}-50`}>
                  <stat.icon className={`h-5 w-5 text-${stat.color}-600`} />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-4 text-sm">
                {stat.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-green-500" />
                )}
                <span className="text-green-600 font-medium">{stat.change}</span>
                <span className="text-gray-500">vs last period</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Activity Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Activity Overview</CardTitle>
            <CardDescription>Your engagement over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityData}>
                  <defs>
                    <linearGradient id="colorDocuments" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} />
                  <YAxis stroke="#9CA3AF" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="tasks"
                    stroke="#10B981"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorTasks)"
                  />
                  <Area
                    type="monotone"
                    dataKey="documents"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorDocuments)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-sm text-gray-600">Documents</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-sm text-gray-600">Tasks</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Document Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Document Types</CardTitle>
            <CardDescription>Breakdown by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={documentBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {documentBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {documentBreakdown.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-gray-600">{item.name}</span>
                  <span className="text-sm font-medium text-gray-900 ml-auto">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mt-8">
        {/* Task Completion */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Task Completion</CardTitle>
            <CardDescription>Tasks completed vs pending</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={taskCompletion}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="week" stroke="#9CA3AF" fontSize={12} />
                  <YAxis stroke="#9CA3AF" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="completed" fill="#10B981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="pending" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-sm text-gray-600">Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="text-sm text-gray-600">Pending</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Milestones */}
        <Card>
          <CardHeader>
            <CardTitle>Journey Milestones</CardTitle>
            <CardDescription>Your progress checkpoints</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {milestones.map((milestone, index) => (
                <div key={milestone.title} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        milestone.completed
                          ? 'bg-green-100 text-green-600'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {milestone.completed ? (
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        <span className="text-xs font-medium">{index + 1}</span>
                      )}
                    </div>
                    {index < milestones.length - 1 && (
                      <div
                        className={`w-0.5 h-8 ${
                          milestone.completed ? 'bg-green-200' : 'bg-gray-200'
                        }`}
                      />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="flex items-center justify-between">
                      <p
                        className={`font-medium ${
                          milestone.completed ? 'text-gray-900' : 'text-gray-500'
                        }`}
                      >
                        {milestone.title}
                      </p>
                      <Badge
                        variant="secondary"
                        className={
                          milestone.completed
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-500'
                        }
                      >
                        {milestone.date}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
