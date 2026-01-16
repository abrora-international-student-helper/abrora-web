import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            YoursTruely
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Your companion for international student life in the U.S.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="text-3xl mb-3">📋</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Visa Tracking</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Never miss a deadline. Track your visa status and get reminders.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="text-3xl mb-3">📁</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Document Vault</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Securely store your passport, I-20, and important documents.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="text-3xl mb-3">✅</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Onboarding Checklist</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Step-by-step guide from arrival to settling in.
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/signup"
            className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors text-center"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-xl border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-center"
          >
            Sign In
          </Link>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-16">
          Built for international students, by international students.
        </p>
      </div>
    </div>
  )
}
