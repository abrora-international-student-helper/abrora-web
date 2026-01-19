import { describe, it, expect, beforeEach } from 'vitest'
import { useAuthStore } from '@/stores/auth-store'

describe('Auth Store', () => {
  beforeEach(() => {
    // Reset store state before each test
    useAuthStore.setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    })
  })

  describe('initial state', () => {
    it('should have null user initially', () => {
      const { user } = useAuthStore.getState()
      expect(user).toBeNull()
    })

    it('should not be authenticated initially', () => {
      const { isAuthenticated } = useAuthStore.getState()
      expect(isAuthenticated).toBe(false)
    })

    it('should not be loading initially', () => {
      const { isLoading } = useAuthStore.getState()
      expect(isLoading).toBe(false)
    })
  })

  describe('setUser', () => {
    it('should set user and mark as authenticated', () => {
      const mockUser = {
        id: 'user-123',
        email: 'test@example.com',
        name: 'Test User',
      }

      useAuthStore.getState().setUser(mockUser)

      const { user, isAuthenticated } = useAuthStore.getState()
      expect(user).toEqual(mockUser)
      expect(isAuthenticated).toBe(true)
    })

    it('should handle null user and mark as not authenticated', () => {
      // First set a user
      useAuthStore.getState().setUser({
        id: 'user-123',
        email: 'test@example.com',
        name: 'Test User',
      })

      // Then clear it
      useAuthStore.getState().setUser(null)

      const { user, isAuthenticated } = useAuthStore.getState()
      expect(user).toBeNull()
      expect(isAuthenticated).toBe(false)
    })
  })

  describe('logout', () => {
    it('should clear user and set authenticated to false', () => {
      // First set a user
      useAuthStore.getState().setUser({
        id: 'user-123',
        email: 'test@example.com',
        name: 'Test User',
      })

      // Then logout
      useAuthStore.getState().logout()

      const { user, isAuthenticated } = useAuthStore.getState()
      expect(user).toBeNull()
      expect(isAuthenticated).toBe(false)
    })
  })
})
