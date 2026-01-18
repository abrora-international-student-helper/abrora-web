"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"

interface NewsArticle {
  article_id: string
  title: string
  link: string
  description: string | null
  content: string | null
  pubDate: string
  source_id: string
  source_name: string
  source_icon: string | null
  image_url: string | null
  category: string[]
  keywords: string[] | null
}

type ImpactLevel = "critical" | "warning" | "info"

const impactStyles = {
  critical: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-800",
    icon: "🚨",
    label: "High Impact",
    description: "This news may significantly affect your visa status or legal standing. Take immediate action."
  },
  warning: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-800",
    icon: "⚠️",
    label: "Moderate Impact",
    description: "This news may affect your plans or require adjustments. Stay informed and plan ahead."
  },
  info: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-700",
    icon: "ℹ️",
    label: "Informational",
    description: "General news that may be of interest to international students."
  }
}

function getImpactLevel(article: NewsArticle): ImpactLevel {
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
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

// Generate "What this means for you" based on article content
function generateImpactExplanation(article: NewsArticle, impact: ImpactLevel): string[] {
  const text = `${article.title} ${article.description || ""}`.toLowerCase()
  const explanations: string[] = []

  // Check for visa-related keywords
  if (text.includes("f1") || text.includes("f-1") || text.includes("student visa")) {
    explanations.push("This may directly affect F-1 student visa holders.")
  }
  if (text.includes("h1b") || text.includes("h-1b") || text.includes("work visa")) {
    explanations.push("This relates to H-1B work visas, which may affect your OPT/CPT plans.")
  }
  if (text.includes("opt") || text.includes("cpt")) {
    explanations.push("This directly impacts Optional Practical Training (OPT) or Curricular Practical Training (CPT).")
  }
  if (text.includes("sevis") || text.includes("i-20")) {
    explanations.push("This may affect your SEVIS record or I-20 status. Contact your DSO.")
  }
  if (text.includes("uscis") || text.includes("immigration")) {
    explanations.push("USCIS policy changes may impact application processing times and requirements.")
  }
  if (text.includes("deadline")) {
    explanations.push("Pay attention to any new deadlines mentioned that may apply to you.")
  }
  if (text.includes("fee") || text.includes("cost")) {
    explanations.push("There may be changes to fees or costs associated with your visa status.")
  }

  // Default explanations based on impact level
  if (explanations.length === 0) {
    if (impact === "critical") {
      explanations.push("Review this news carefully and consider consulting with your International Student Office.")
    } else if (impact === "warning") {
      explanations.push("This may affect your future plans. Stay informed about any updates.")
    } else {
      explanations.push("Keep this information in mind as part of staying informed about immigration news.")
    }
  }

  return explanations
}

export default function NewsDetailPage() {
  const params = useParams()
  const [article, setArticle] = useState<NewsArticle | null>(null)
  const [loading, setLoading] = useState(true)
  const [relatedNews, setRelatedNews] = useState<NewsArticle[]>([])

  // Since we're using external API and articles open in new tab,
  // this page primarily serves as a redirect with context
  useEffect(() => {
    // In a real app, you might fetch article details from your backend
    // For now, we'll show a redirect page
    setLoading(false)
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Since articles are external, show a redirect/context page
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-4xl px-4 py-4">
          <Link href="/news" className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to News
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8">
        <div className="bg-white rounded-2xl p-8 ring-1 ring-gray-200 text-center">
          <div className="text-5xl mb-4">📰</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Opening External Article</h1>
          <p className="text-gray-600 mb-6">
            News articles are sourced from external publishers. You&apos;ll be redirected to read the full article.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/news"
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
            >
              Browse All News
            </Link>
          </div>
        </div>

        {/* Understanding Immigration News */}
        <div className="mt-8 bg-white rounded-2xl p-6 ring-1 ring-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Understanding Immigration News</h2>

          <div className="space-y-4">
            <div className="flex gap-4 p-4 bg-red-50 rounded-xl border border-red-100">
              <span className="text-2xl">🚨</span>
              <div>
                <h3 className="font-semibold text-red-800">Critical Alerts</h3>
                <p className="text-sm text-red-700">
                  News about deportations, visa bans, immediate policy changes, or emergency situations that require urgent attention.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 bg-amber-50 rounded-xl border border-amber-100">
              <span className="text-2xl">⚠️</span>
              <div>
                <h3 className="font-semibold text-amber-800">Important Updates</h3>
                <p className="text-sm text-amber-700">
                  Policy changes, new deadlines, rule updates, or warnings that may affect your visa status or plans.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
              <span className="text-2xl">ℹ️</span>
              <div>
                <h3 className="font-semibold text-blue-700">General Information</h3>
                <p className="text-sm text-blue-600">
                  News about international student life, achievements, educational opportunities, and general immigration updates.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* What To Do Section */}
        <div className="mt-8 bg-white rounded-2xl p-6 ring-1 ring-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-4">What Should You Do?</h2>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
              <div>
                <h3 className="font-medium text-gray-900">Verify with Official Sources</h3>
                <p className="text-sm text-gray-600">
                  Always cross-check important news with official government websites like USCIS, ICE/SEVP, or the State Department.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
              <div>
                <h3 className="font-medium text-gray-900">Consult Your DSO</h3>
                <p className="text-sm text-gray-600">
                  Your Designated School Official (DSO) at your school&apos;s International Student Office can provide personalized guidance.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
              <div>
                <h3 className="font-medium text-gray-900">Document Everything</h3>
                <p className="text-sm text-gray-600">
                  Keep records of any actions you take, communications with immigration officials, and important deadlines.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
              <div>
                <h3 className="font-medium text-gray-900">Seek Legal Advice if Needed</h3>
                <p className="text-sm text-gray-600">
                  For complex situations, consider consulting an immigration attorney for professional legal guidance.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8 bg-primary-lighter rounded-2xl p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Official Resources</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <a
              href="https://www.uscis.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-4 bg-white rounded-xl hover:shadow-md transition-shadow text-center"
            >
              <span className="text-2xl mb-2">🏛️</span>
              <span className="text-sm font-medium text-gray-900">USCIS</span>
              <span className="text-xs text-gray-500">Immigration Services</span>
            </a>

            <a
              href="https://www.ice.gov/sevis"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-4 bg-white rounded-xl hover:shadow-md transition-shadow text-center"
            >
              <span className="text-2xl mb-2">📋</span>
              <span className="text-sm font-medium text-gray-900">SEVP</span>
              <span className="text-xs text-gray-500">Student Exchange</span>
            </a>

            <a
              href="https://travel.state.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-4 bg-white rounded-xl hover:shadow-md transition-shadow text-center"
            >
              <span className="text-2xl mb-2">🌐</span>
              <span className="text-sm font-medium text-gray-900">State Dept</span>
              <span className="text-xs text-gray-500">Visa Information</span>
            </a>

            <a
              href="https://studyinthestates.dhs.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-4 bg-white rounded-xl hover:shadow-md transition-shadow text-center"
            >
              <span className="text-2xl mb-2">🎓</span>
              <span className="text-sm font-medium text-gray-900">Study in US</span>
              <span className="text-xs text-gray-500">DHS Resource</span>
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
