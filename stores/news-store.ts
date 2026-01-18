// TODO: News state management
// - News articles list
// - Filtering
// - Read/unread tracking

import { create } from 'zustand'

interface NewsArticle {
  id: string
  title: string
  summary: string
  content: string
  source: string
  sourceUrl: string
  publishedAt: Date
  impactLevel: 'info' | 'warning' | 'critical'
  affectedVisaTypes: string[]
  affectedCountries: string[]
  isRead: boolean
}

interface NewsState {
  articles: NewsArticle[]
  isLoading: boolean
  filter: {
    visaType?: string
    country?: string
    impactLevel?: string
  }
  setArticles: (articles: NewsArticle[]) => void
  markAsRead: (id: string) => void
  setFilter: (filter: NewsState['filter']) => void
}

export const useNewsStore = create<NewsState>((set) => ({
  articles: [],
  isLoading: false,
  filter: {},
  setArticles: (articles) => set({ articles }),
  markAsRead: (id) => set((state) => ({
    articles: state.articles.map(a => a.id === id ? { ...a, isRead: true } : a)
  })),
  setFilter: (filter) => set({ filter }),
}))
