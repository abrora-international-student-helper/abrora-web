// TODO: Zustand auth state management
// - User authentication state
// - Login/logout actions
// - Token management
// - User profile data

import { create } from 'zustand'

interface AuthState {
  user: null | {
    id: string
    email: string
    name: string
  }
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  setUser: (user: AuthState['user']) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  login: async (email, password) => {
    // TODO: Implement login logic with Supabase
  },
  logout: () => {
    set({ user: null, isAuthenticated: false })
  },
  setUser: (user) => {
    set({ user, isAuthenticated: !!user })
  },
}))
