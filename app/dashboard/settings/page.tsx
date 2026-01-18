'use client'

import { useState } from 'react'
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Mail,
  Smartphone,
  Key,
  Download,
  Trash2,
  ChevronRight,
  Moon,
  Sun,
  Check,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    deadlines: true,
    updates: false,
    marketing: false,
  })

  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light')

  const SettingRow = ({
    icon: Icon,
    title,
    description,
    action,
  }: {
    icon: React.ElementType
    title: string
    description: string
    action: React.ReactNode
  }) => (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-start gap-4">
        <div className="p-2 bg-gray-100 rounded-lg">
          <Icon className="h-5 w-5 text-gray-600" />
        </div>
        <div>
          <p className="font-medium text-gray-900">{title}</p>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      {action}
    </div>
  )

  const Toggle = ({
    enabled,
    onChange,
  }: {
    enabled: boolean
    onChange: (value: boolean) => void
  }) => (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative w-11 h-6 rounded-full transition-colors ${
        enabled ? 'bg-blue-600' : 'bg-gray-200'
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
          enabled ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  )

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your account preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full max-w-md">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Alerts</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="preferences">Prefs</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal details and public profile
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar */}
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">U</span>
                </div>
                <div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                    Change Photo
                  </button>
                  <p className="text-xs text-gray-500 mt-2">JPG, PNG up to 5MB</p>
                </div>
              </div>

              <Separator />

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    defaultValue="John Doe"
                    className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    defaultValue="john@university.edu"
                    className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">University</label>
                  <input
                    type="text"
                    defaultValue="State University"
                    className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Major</label>
                  <input
                    type="text"
                    defaultValue="Computer Science"
                    className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Visa Type</label>
                  <select className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>F-1 Student</option>
                    <option>J-1 Exchange</option>
                    <option>M-1 Vocational</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Expected Graduation
                  </label>
                  <input
                    type="month"
                    defaultValue="2025-05"
                    className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
                  Save Changes
                </button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose how and when you want to be notified
              </CardDescription>
            </CardHeader>
            <CardContent className="divide-y divide-gray-100">
              <SettingRow
                icon={Mail}
                title="Email Notifications"
                description="Receive updates via email"
                action={
                  <Toggle
                    enabled={notifications.email}
                    onChange={(v) =>
                      setNotifications((prev) => ({ ...prev, email: v }))
                    }
                  />
                }
              />
              <SettingRow
                icon={Smartphone}
                title="Push Notifications"
                description="Get notified on your device"
                action={
                  <Toggle
                    enabled={notifications.push}
                    onChange={(v) =>
                      setNotifications((prev) => ({ ...prev, push: v }))
                    }
                  />
                }
              />
              <SettingRow
                icon={Bell}
                title="Deadline Reminders"
                description="Alerts for important dates"
                action={
                  <Toggle
                    enabled={notifications.deadlines}
                    onChange={(v) =>
                      setNotifications((prev) => ({ ...prev, deadlines: v }))
                    }
                  />
                }
              />
              <SettingRow
                icon={Globe}
                title="Product Updates"
                description="New features and improvements"
                action={
                  <Toggle
                    enabled={notifications.updates}
                    onChange={(v) =>
                      setNotifications((prev) => ({ ...prev, updates: v }))
                    }
                  />
                }
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your account security and privacy
              </CardDescription>
            </CardHeader>
            <CardContent className="divide-y divide-gray-100">
              <SettingRow
                icon={Key}
                title="Change Password"
                description="Update your password regularly"
                action={
                  <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700">
                    Update
                  </button>
                }
              />
              <SettingRow
                icon={Shield}
                title="Two-Factor Authentication"
                description="Add an extra layer of security"
                action={
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    Enabled
                  </Badge>
                }
              />
              <SettingRow
                icon={Smartphone}
                title="Active Sessions"
                description="Manage devices logged into your account"
                action={
                  <button className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900">
                    View <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                }
              />
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-red-600">Danger Zone</CardTitle>
              <CardDescription>
                Irreversible actions for your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                <div>
                  <p className="font-medium text-gray-900">Export Data</p>
                  <p className="text-sm text-gray-500">
                    Download all your data in JSON format
                  </p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-50">
                  <Download className="h-4 w-4" />
                  Export
                </button>
              </div>
              <div className="flex items-center justify-between p-4 border border-red-200 rounded-xl bg-red-50">
                <div>
                  <p className="font-medium text-red-900">Delete Account</p>
                  <p className="text-sm text-red-600">
                    Permanently delete your account and all data
                  </p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-100">
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete Account</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. All your data will be
                        permanently deleted.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <p className="text-sm text-gray-600 mb-4">
                        Type <strong>DELETE</strong> to confirm:
                      </p>
                      <input
                        type="text"
                        placeholder="DELETE"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                      />
                    </div>
                    <div className="flex justify-end gap-3">
                      <button className="px-4 py-2 text-gray-600 hover:text-gray-900">
                        Cancel
                      </button>
                      <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                        Delete Account
                      </button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize how Abrora looks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { id: 'light', icon: Sun, label: 'Light' },
                  { id: 'dark', icon: Moon, label: 'Dark' },
                  { id: 'system', icon: Palette, label: 'System' },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setTheme(option.id as typeof theme)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      theme === option.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <option.icon
                      className={`h-6 w-6 mx-auto mb-2 ${
                        theme === option.id ? 'text-blue-600' : 'text-gray-400'
                      }`}
                    />
                    <p
                      className={`text-sm font-medium ${
                        theme === option.id ? 'text-blue-600' : 'text-gray-600'
                      }`}
                    >
                      {option.label}
                    </p>
                    {theme === option.id && (
                      <Check className="h-4 w-4 text-blue-600 mx-auto mt-2" />
                    )}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Language & Region</CardTitle>
              <CardDescription>Set your preferred language and timezone</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Language</label>
                <select className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>English (US)</option>
                  <option>Spanish</option>
                  <option>Chinese (Simplified)</option>
                  <option>Hindi</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Timezone</label>
                <select className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Eastern Time (ET)</option>
                  <option>Pacific Time (PT)</option>
                  <option>Central Time (CT)</option>
                  <option>Mountain Time (MT)</option>
                </select>
              </div>
              <div className="flex justify-end pt-4">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
                  Save Preferences
                </button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
