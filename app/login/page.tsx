'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Loader2, Eye, EyeOff, ArrowLeft, Mail, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const supabase = createClient()

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      window.location.href = '/dashboard'
    }
  }

  const handleOAuthLogin = async (provider: 'google' | 'apple') => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F3F4F6] dark:bg-[#0a0a0a] p-4 md:p-8">
      {/* Main Container Card */}
      <div className="max-w-5xl w-full bg-white dark:bg-[#111] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        
        {/* Left Side: Scaled Down Visual */}
        <div className="w-full md:w-[42%] relative p-4">
          <div className="relative h-full w-full rounded-[2rem] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1745293661108-7704cd73ef32?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Abrora"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
            
            {/* Logo on Image */}
            <div className="absolute top-8 left-8 flex items-center gap-2 text-white font-bold text-xl tracking-tight">
              <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full" />
              </div>
              Abrora
            </div>
          </div>
        </div>

        {/* Right Side: Login Content */}
        <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-12">
          <div className="max-w-sm w-full mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Sign in</h1>
              <p className="text-sm text-gray-500">
                New to Abrora?{' '}
                <Link href="/signup" className="text-blue-600 font-semibold hover:underline">
                  Create an account
                </Link>
              </p>
            </div>

            {error && <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-600 text-xs border border-red-100">{error}</div>}

            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-400 uppercase ml-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900 text-sm focus:ring-2 focus:ring-black outline-none transition-all"
                  placeholder="name@example.com"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <label className="text-xs font-semibold text-gray-400 uppercase ml-1">Password</label>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900 text-sm focus:ring-2 focus:ring-black outline-none transition-all"
                    placeholder="••••••••"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black dark:bg-white dark:text-black text-white font-semibold py-3.5 rounded-xl hover:opacity-90 transition-all flex items-center justify-center mt-2 shadow-lg shadow-black/10"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign In'}
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100 dark:border-gray-800" /></div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-[0.2em] text-gray-400"><span className="px-4 bg-white dark:bg-[#111]">Social Login</span></div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleOAuthLogin('google')}
                className="flex-1 flex items-center justify-center py-3 rounded-xl border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all text-sm font-medium"
              >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/smartlock/google.svg" className="w-4 h-4 mr-2" alt="" />
                Google
              </button>
              <button
                onClick={() => handleOAuthLogin('apple')}
                className="flex-1 flex items-center justify-center py-3 rounded-xl border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all text-sm font-medium"
              >
                <svg className="w-4 h-4 mr-2 fill-current" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                Apple
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}