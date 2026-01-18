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

type UrgencyLevel = "critical" | "warning" | "info"

interface NewsCardProps {
  article: NewsArticle
  variant?: "default" | "compact" | "featured"
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

function getUrgencyLevel(article: NewsArticle): UrgencyLevel {
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

function formatDate(dateString: string): string {
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

export default function NewsCard({ article, variant = "default" }: NewsCardProps) {
  const urgency = getUrgencyLevel(article)
  const style = urgencyStyles[urgency]

  if (variant === "compact") {
    return (
      <a
        href={article.link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <span className={`mt-0.5 text-xs ${style.badge} px-1.5 py-0.5 rounded`}>
          {style.icon}
        </span>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-gray-900 line-clamp-2">{article.title}</h4>
          <p className="text-xs text-gray-500 mt-1">{formatDate(article.pubDate)}</p>
        </div>
      </a>
    )
  }

  if (variant === "featured") {
    return (
      <a
        href={article.link}
        target="_blank"
        rel="noopener noreferrer"
        className={`group block bg-white rounded-2xl overflow-hidden ring-1 ring-gray-200 hover:ring-gray-300 hover:shadow-lg transition-all border-l-4 ${style.border}`}
      >
        {article.image_url && (
          <div className="aspect-video bg-gray-100 overflow-hidden">
            <img
              src={article.image_url}
              alt=""
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ring-1 ${style.badge}`}>
              {style.icon} {style.label}
            </span>
            <span className="text-xs text-gray-500">{formatDate(article.pubDate)}</span>
          </div>

          <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-primary-dark transition-colors">
            {article.title}
          </h3>

          {article.description && (
            <p className="mt-3 text-gray-600 line-clamp-3">{article.description}</p>
          )}

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {article.source_icon && (
                <img src={article.source_icon} alt="" className="w-5 h-5 rounded" />
              )}
              <span className="text-sm font-medium text-gray-500">
                {article.source_name || article.source_id}
              </span>
            </div>
            <span className="text-sm font-semibold text-primary-dark group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
              Read article →
            </span>
          </div>
        </div>
      </a>
    )
  }

  // Default variant
  return (
    <a
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

      {/* What this means teaser */}
      {urgency !== "info" && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-500 italic">
            💡 Click to learn how this may affect your visa status
          </p>
        </div>
      )}
    </a>
  )
}

// Export helper functions for use in other components
export { getUrgencyLevel, formatDate, urgencyStyles }
export type { NewsArticle, UrgencyLevel }
