"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

interface NewsArticle {
  article_id: string
  title: string
  link: string
  description: string | null
  pubDate: string
  source_id: string
  source_name: string
  source_icon: string | null
  image_url: string | null
  category: string[]
  keywords: string[] | null
}

interface NewsResponse {
  status: string
  totalResults: number
  results: NewsArticle[]
  nextPage?: string
}

const NEWS_API_KEY = "pub_82b2ddb76b26458ea60f4a86ee9d8fb1"

// News categories relevant to international students
const NEWS_CATEGORIES = [
  { id: "all", label: "All News", icon: "📰" },
  { id: "immigration", label: "Immigration", icon: "🛂", query: "immigration policy OR USCIS" },
  { id: "visa", label: "Visa Updates", icon: "📋", query: "F1 visa OR student visa OR H1B" },
  { id: "safety", label: "Safety Alerts", icon: "⚠️", query: "international student safety OR deportation" },
  { id: "education", label: "Education", icon: "🎓", query: "international student university OR college" },
  { id: "work", label: "Work & OPT", icon: "💼", query: "OPT CPT work authorization student" },
]

// Urgency levels based on content keywords
const getUrgencyLevel = (article: NewsArticle): "critical" | "warning" | "info" => {
  const text = `${article.title} ${article.description || ""}`.toLowerCase()

  if (text.includes("deportation") || text.includes("ban") || text.includes("emergency") ||
      text.includes("suspended") || text.includes("revoked") || text.includes("immediate")) {
    return "critical"
  }
  if (text.includes("deadline") || text.includes("change") || text.includes("update") ||
      text.includes("warning") || text.includes("alert") || text.includes("new rule")) {
    return "warning"
  }
  return "info"
}

const urgencyStyles = {
  critical: {
    badge: "bg-red-100 text-red-800 ring-red-200",
    border: "border-l-red-500",
    icon: "🚨",
    label: "Critical"
  },
  warning: {
    badge: "bg-amber-100 text-amber-800 ring-amber-200",
    border: "border-l-amber-500",
    icon: "⚠️",
    label: "Important"
  },
  info: {
    badge: "bg-blue-100 text-blue-700 ring-blue-200",
    border: "border-l-blue-500",
    icon: "ℹ️",
    label: "Info"
  }
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsArticle[]>([])
  const [filteredNews, setFilteredNews] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetchNews()
  }, [activeCategory])

  useEffect(() => {
    // Filter news based on search query
    if (searchQuery.trim() === "") {
      setFilteredNews(news)
    } else {
      const query = searchQuery.toLowerCase()
      setFilteredNews(
        news.filter(
          (article) =>
            article.title.toLowerCase().includes(query) ||
            article.description?.toLowerCase().includes(query) ||
            article.source_name?.toLowerCase().includes(query)
        )
      )
    }
  }, [searchQuery, news])

  async function fetchNews() {
    try {
      setLoading(true)
      setError(null)

      const category = NEWS_CATEGORIES.find((c) => c.id === activeCategory)
      const baseQuery = "international student"
      const categoryQuery = category?.query ? ` OR ${category.query}` : ""
      const fullQuery = encodeURIComponent(`${baseQuery}${categoryQuery}`)

      const response = await fetch(
        `https://newsdata.io/api/1/news?apikey=${NEWS_API_KEY}&q=${fullQuery}&country=us&language=en`
      )

      if (!response.ok) {
        throw new Error("Failed to fetch news")
      }

      const data: NewsResponse = await response.json()

      if (data.status === "success" && data.results) {
        setNews(data.results)
        setFilteredNews(data.results)
      } else {
        setNews([])
        setFilteredNews([])
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load news")
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 48) return "Yesterday"

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  // Group critical news at the top
  const sortedNews = [...filteredNews].sort((a, b) => {
    const urgencyOrder = { critical: 0, warning: 1, info: 2 }
    return urgencyOrder[getUrgencyLevel(a)] - urgencyOrder[getUrgencyLevel(b)]
  })

  const criticalNews = sortedNews.filter((n) => getUrgencyLevel(n) === "critical")
  const regularNews = sortedNews.filter((n) => getUrgencyLevel(n) !== "critical")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </Link>
            <h1 className="text-xl font-bold text-gray-900">News & Updates</h1>
            <div className="w-16" />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        {/* Page Title & Description */}
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
            Stay Informed
          </h2>
          <p className="mt-2 text-gray-600 max-w-2xl">
            Immigration updates, policy changes, and important news that affects international students in the US.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex gap-2 min-w-max">
            {NEWS_CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  activeCategory === category.id
                    ? "bg-primary text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-100 ring-1 ring-gray-200"
                }`}
              >
                <span>{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Links to Official Sources */}
        <div className="mb-8 p-4 bg-primary-lighter rounded-xl">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Official Sources</h3>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://www.uscis.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg text-sm text-gray-700 hover:bg-gray-50 ring-1 ring-gray-200"
            >
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              USCIS
            </a>
            <a
              href="https://www.ice.gov/sevis"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg text-sm text-gray-700 hover:bg-gray-50 ring-1 ring-gray-200"
            >
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              SEVP/ICE
            </a>
            <a
              href="https://travel.state.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg text-sm text-gray-700 hover:bg-gray-50 ring-1 ring-gray-200"
            >
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              State Dept
            </a>
            <a
              href="https://www.dhs.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg text-sm text-gray-700 hover:bg-gray-50 ring-1 ring-gray-200"
            >
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              DHS
            </a>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse bg-white rounded-xl p-5 ring-1 ring-gray-200">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-5 w-16 rounded-full bg-gray-200" />
                  <div className="h-4 w-20 rounded bg-gray-200" />
                </div>
                <div className="h-6 w-full rounded bg-gray-200 mb-2" />
                <div className="h-4 w-3/4 rounded bg-gray-200 mb-4" />
                <div className="h-16 w-full rounded bg-gray-200" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-white rounded-xl p-8 text-center ring-1 ring-gray-200">
            <div className="text-4xl mb-4">📰</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Unable to load news</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={fetchNews}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* No Results */}
        {!loading && !error && filteredNews.length === 0 && (
          <div className="bg-white rounded-xl p-8 text-center ring-1 ring-gray-200">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No news found</h3>
            <p className="text-gray-600">
              {searchQuery
                ? "Try a different search term"
                : "No articles available for this category at the moment"}
            </p>
          </div>
        )}

        {/* Critical Alerts Banner */}
        {!loading && !error && criticalNews.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-bold text-red-800 mb-3 flex items-center gap-2">
              <span>🚨</span> Critical Alerts
            </h3>
            <div className="space-y-3">
              {criticalNews.map((article) => (
                <a
                  key={article.article_id}
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-red-50 border-l-4 border-red-500 rounded-r-xl p-4 hover:bg-red-100 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-800 bg-red-100 px-2 py-0.5 rounded-full mb-2">
                        🚨 CRITICAL
                      </span>
                      <h4 className="font-bold text-gray-900 line-clamp-2">{article.title}</h4>
                      {article.description && (
                        <p className="mt-1 text-sm text-gray-600 line-clamp-2">{article.description}</p>
                      )}
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap">{formatDate(article.pubDate)}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Regular News Grid */}
        {!loading && !error && regularNews.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Latest Updates</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {regularNews.map((article) => {
                const urgency = getUrgencyLevel(article)
                const style = urgencyStyles[urgency]

                return (
                  <a
                    key={article.article_id}
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group bg-white rounded-xl p-5 ring-1 ring-gray-200 hover:ring-gray-300 hover:shadow-md transition-all border-l-4 ${style.border}`}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3">
                      <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ring-1 ${style.badge}`}>
                        {style.icon} {style.label}
                      </span>
                      <span className="text-xs text-gray-500">{formatDate(article.pubDate)}</span>
                    </div>

                    {/* Title */}
                    <h4 className="font-bold text-gray-900 line-clamp-2 group-hover:text-primary-dark transition-colors">
                      {article.title}
                    </h4>

                    {/* Description */}
                    {article.description && (
                      <p className="mt-2 text-sm text-gray-600 line-clamp-3">{article.description}</p>
                    )}

                    {/* Footer */}
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {article.source_icon && (
                          <img src={article.source_icon} alt="" className="w-4 h-4 rounded" />
                        )}
                        <span className="text-xs font-medium text-gray-500">
                          {article.source_name || article.source_id}
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-primary-dark group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        Read more →
                      </span>
                    </div>

                    {/* What this means for you - teaser */}
                    {urgency !== "info" && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <p className="text-xs text-gray-500 italic">
                          💡 Click to learn how this may affect your visa status
                        </p>
                      </div>
                    )}
                  </a>
                )
              })}
            </div>
          </div>
        )}

        {/* Info Box */}
        <div className="mt-10 bg-white rounded-xl p-6 ring-1 ring-gray-200">
          <h3 className="font-bold text-gray-900 mb-2">Stay Compliant</h3>
          <p className="text-sm text-gray-600 mb-4">
            As an international student, staying informed about policy changes is crucial for maintaining your visa status.
            We aggregate news from reliable sources, but always verify important information with your school&apos;s
            International Student Office (ISO) or official government websites.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
              🏫 Contact your ISO for guidance
            </span>
            <span className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
              📧 Set up USCIS case alerts
            </span>
            <span className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
              📅 Track important deadlines
            </span>
          </div>
        </div>
      </main>
    </div>
  )
}
