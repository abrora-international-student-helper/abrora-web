import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')
  const errorDescription = searchParams.get('error_description')
  const next = searchParams.get('next') ?? '/dashboard'

  // If there's an error from OAuth provider
  if (error) {
    console.error('OAuth error:', error, errorDescription)
    return NextResponse.redirect(`${origin}/login?error=${error}&message=${encodeURIComponent(errorDescription || '')}`)
  }

  if (code) {
    const supabase = await createClient()
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

    if (!exchangeError) {
      return NextResponse.redirect(`${origin}${next}`)
    }

    console.error('Code exchange error:', exchangeError.message)
    return NextResponse.redirect(`${origin}/login?error=exchange_error&message=${encodeURIComponent(exchangeError.message)}`)
  }

  return NextResponse.redirect(`${origin}/login?error=no_code`)
}
