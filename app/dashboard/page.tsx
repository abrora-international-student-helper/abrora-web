import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import LogoutButton from './logout-button'

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                YoursTruely
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {user.email}
              </span>
              <LogoutButton />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Welcome, {profile?.full_name || user.email?.split('@')[0]}!
          </h2>

          {/* Auth Success Card */}
          <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
              Authentication Working!
            </h3>
            <p className="text-green-600 dark:text-green-400 mt-1">
              You successfully signed in. Your user was created in Supabase.
            </p>
          </div>

          {/* User Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                User Info
              </h3>
              <dl className="space-y-2">
                <div>
                  <dt className="text-sm text-gray-500 dark:text-gray-400">User ID</dt>
                  <dd className="text-sm font-mono text-gray-900 dark:text-white">{user.id}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500 dark:text-gray-400">Email</dt>
                  <dd className="text-sm text-gray-900 dark:text-white">{user.email}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500 dark:text-gray-400">Provider</dt>
                  <dd className="text-sm text-gray-900 dark:text-white">
                    {user.app_metadata?.provider ?? 'email'}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Checklist Progress
              </h3>
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                  <span>Progress</span>
                  <span>{completedItems} / {totalItems}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${totalItems > 0 ? (completedItems / totalItems) * 100 : 0}%` }}
                  />
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {totalItems > 0
                  ? `${totalItems} checklist items were auto-created for you!`
                  : 'No checklist items found. Check your database triggers.'
                }
              </p>
            </div>
          </div>

          {/* Profile Data */}
          <div className="mt-6 bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Profile Data (from profiles table)
            </h3>
            <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-auto text-sm">
              {JSON.stringify(profile, null, 2)}
            </pre>
          </div>
        </div>
      </main>
    </div>
  )
}
