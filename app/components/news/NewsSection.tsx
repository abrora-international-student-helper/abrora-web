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
}

interface NewsResponse {
  status: string
  totalResults: number
  results: NewsArticle[]
}

const NEWS_API_KEY = "pub_82b2ddb76b26458ea60f4a86ee9d8fb1"

export default function NewsSection() {
  const [news, setNews] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true)
        // Fetch news relevant to international students, immigration, student visa
        const response = await fetch(
          `https://newsdata.io/api/1/news?apikey=${NEWS_API_KEY}&q=international%20student%20OR%20student%20visa%20OR%20F1%20visa%20OR%20immigration&country=us&language=en`
        )

        if (!response.ok) {
          throw new Error("Failed to fetch news")
        }

        const data: NewsResponse = await response.json()

        if (data.status === "success" && data.results) {
          setNews(data.results.slice(0, 6)) // Show top 6 articles
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load news")
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  // Get category badge color
  const getCategoryStyle = (categories: string[]) => {
    const category = categories?.[0]?.toLowerCase() || ""
    if (category.includes("politics") || category.includes("world")) {
      return "bg-blue-50 text-blue-700 ring-blue-100"
    }
    if (category.includes("business") || category.includes("economy")) {
      return "bg-green-50 text-green-700 ring-green-100"
    }
    if (category.includes("education")) {
      return "bg-purple-50 text-purple-700 ring-purple-100"
    }
    return "bg-gray-50 text-gray-700 ring-gray-100"
  }

  if (loading) {
    return (
      <section id="news" className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            Latest News for International Students
          </h2>
          <p className="mt-2 max-w-2xl text-gray-700">
            Stay updated on immigration policies, visa updates, and student-related news.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="animate-pulse rounded-3xl bg-white p-6 ring-1 ring-gray-200"
              >
                <div className="h-4 w-20 rounded bg-gray-200" />
                <div className="mt-4 h-6 w-full rounded bg-gray-200" />
                <div className="mt-2 h-4 w-3/4 rounded bg-gray-200" />
                <div className="mt-4 h-16 w-full rounded bg-gray-200" />
                <div className="mt-4 h-4 w-32 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="news" className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            Latest News for International Students
          </h2>
          <p className="mt-2 max-w-2xl text-gray-700">
            Stay updated on immigration policies, visa updates, and student-related news.
          </p>
          <div className="mt-10 rounded-3xl bg-white p-8 text-center ring-1 ring-gray-200">
            <div className="text-4xl">📰</div>
            <p className="mt-4 text-gray-600">Unable to load news at the moment.</p>
            <p className="text-sm text-gray-500">Please check back later.</p>
          </div>
        </div>
      </section>
    )
  }

  if (news.length === 0) {
    return (
      <section id="news" className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            Latest News for International Students
          </h2>
          <p className="mt-2 max-w-2xl text-gray-700">
            Stay updated on immigration policies, visa updates, and student-related news.
          </p>
          <div className="mt-10 rounded-3xl bg-white p-8 text-center ring-1 ring-gray-200">
            <div className="text-4xl">📰</div>
            <p className="mt-4 text-gray-600">No news articles available at the moment.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="news" className="bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              Latest News for International Students
            </h2>
            <p className="mt-2 max-w-2xl text-gray-700">
              Stay updated on immigration policies, visa updates, and student-related news.
            </p>
          </div>
          <Link
            href="#news"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-dark hover:text-primary"
          >
            View all news <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {news.map((article) => (
            <a
              key={article.article_id}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-200 transition-all hover:shadow-md hover:ring-gray-300"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-lighter to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                {/* Category Badge */}
                <div className="flex items-center justify-between">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${getCategoryStyle(
                      article.category
                    )}`}
                  >
                    {article.category?.[0] || "News"}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatDate(article.pubDate)}
                  </span>
                </div>

                {/* Title */}
                <h3 className="mt-4 line-clamp-2 text-lg font-bold leading-snug text-gray-900 group-hover:text-primary-dark">
                  {article.title}
                </h3>

                {/* Description */}
                {article.description && (
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-600">
                    {article.description}
                  </p>
                )}

                {/* Source */}
                <div className="mt-4 flex items-center gap-2">
                  {article.source_icon && (
                    <img
                      src={article.source_icon}
                      alt=""
                      className="h-4 w-4 rounded"
                    />
                  )}
                  <span className="text-xs font-medium text-gray-500">
                    {article.source_name || article.source_id}
                  </span>
                </div>

                {/* Read more */}
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-dark">
                  Read article <span aria-hidden>→</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
