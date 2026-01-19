'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Newspaper,
  AlertTriangle,
  Info,
  ExternalLink,
  Filter,
  Bell,
  Globe,
  Shield,
  TrendingUp,
  Clock,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// Mock news data based on MVP plan
const newsArticles = [
  {
    id: '1',
    title: 'USCIS Announces New OPT Processing Times',
    summary: 'Processing times for OPT applications have been updated. Most applications are now being processed within 90 days.',
    impact: 'If you\'re planning to apply for OPT, submit your application at least 90 days before your intended start date.',
    source: 'USCIS',
    sourceUrl: 'https://www.uscis.gov',
    publishedAt: '2024-01-18',
    category: 'immigration',
    impactLevel: 'info',
    affectedVisaTypes: ['F-1'],
  },
  {
    id: '2',
    title: 'New Travel Signature Requirements for F-1 Students',
    summary: 'International offices are now requiring advance notice for travel signature requests. Plan your travel accordingly.',
    impact: 'Request your travel signature at least 2 weeks before your planned departure to avoid delays.',
    source: 'SEVP',
    sourceUrl: 'https://www.ice.gov/sevis',
    publishedAt: '2024-01-15',
    category: 'immigration',
    impactLevel: 'warning',
    affectedVisaTypes: ['F-1', 'J-1'],
  },
  {
    id: '3',
    title: 'H-1B Cap Registration Period Announced for 2025',
    summary: 'USCIS has announced the H-1B cap registration period will open in March. Students on OPT should start preparing.',
    impact: 'If you\'re on OPT and seeking H-1B sponsorship, work with your employer now to prepare for registration.',
    source: 'USCIS',
    sourceUrl: 'https://www.uscis.gov/h-1b',
    publishedAt: '2024-01-12',
    category: 'work',
    impactLevel: 'info',
    affectedVisaTypes: ['F-1', 'OPT'],
  },
  {
    id: '4',
    title: 'Warning: Increase in Immigration Scams Targeting Students',
    summary: 'DHS reports an increase in scam calls claiming to be from immigration authorities. Never share personal information over the phone.',
    impact: 'USCIS never calls to ask for payment over the phone. Report suspicious calls to the FTC.',
    source: 'DHS',
    sourceUrl: 'https://www.dhs.gov',
    publishedAt: '2024-01-10',
    category: 'scam',
    impactLevel: 'critical',
    affectedVisaTypes: ['F-1', 'J-1', 'M-1'],
  },
  {
    id: '5',
    title: 'STEM OPT Extension: Updated List of Qualifying Degrees',
    summary: 'The Department of Homeland Security has updated the list of STEM-designated degree programs eligible for the 24-month OPT extension.',
    impact: 'Check if your degree program qualifies for the STEM OPT extension. New programs have been added.',
    source: 'SEVP',
    sourceUrl: 'https://www.ice.gov/sevis/stemlist',
    publishedAt: '2024-01-08',
    category: 'work',
    impactLevel: 'info',
    affectedVisaTypes: ['F-1', 'OPT'],
  },
  {
    id: '6',
    title: 'Nepali Students: Embassy Interview Slots Now Available',
    summary: 'The US Embassy in Kathmandu has released new visa interview slots for March and April.',
    impact: 'If you need a visa renewal or are a new student, book your slot early as they fill up fast.',
    source: 'US Embassy Nepal',
    sourceUrl: 'https://np.usembassy.gov',
    publishedAt: '2024-01-05',
    category: 'immigration',
    impactLevel: 'info',
    affectedVisaTypes: ['F-1', 'J-1'],
  },
]

const categories = [
  { id: 'all', label: 'All Updates', icon: Newspaper },
  { id: 'immigration', label: 'Immigration', icon: Globe },
  { id: 'work', label: 'Work & OPT', icon: TrendingUp },
  { id: 'scam', label: 'Scam Alerts', icon: Shield },
]

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredNews = newsArticles.filter(
    (article) => activeCategory === 'all' || article.category === activeCategory
  )

  const impactStyles = {
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-700',
      icon: Info,
      badge: 'bg-blue-100 text-blue-700',
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-700',
      icon: AlertTriangle,
      badge: 'bg-yellow-100 text-yellow-700',
    },
    critical: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-700',
      icon: AlertTriangle,
      badge: 'bg-red-100 text-red-700',
    },
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">News & Alerts</h1>
          <p className="text-gray-500 mt-1">Stay updated on immigration policies and news</p>
        </div>
        <Badge variant="secondary" className="gap-1 w-fit">
          <Bell className="h-3 w-3" />
          Personalized for F-1 Students
        </Badge>
      </div>

      {/* Critical Alert Banner */}
      {newsArticles.some((a) => a.impactLevel === 'critical') && (
        <Card className="mb-6 bg-red-50 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-800">Important Alert</p>
                <p className="text-sm text-red-700">
                  There are critical updates that may affect your immigration status. Please review below.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Category Filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
              activeCategory === cat.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <cat.icon className="h-4 w-4" />
            {cat.label}
          </button>
        ))}
      </div>

      {/* News List */}
      <div className="space-y-4">
        {filteredNews.map((article, index) => {
          const styles = impactStyles[article.impactLevel as keyof typeof impactStyles]
          const ImpactIcon = styles.icon

          return (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className={`${styles.bg} ${styles.border} border`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${styles.badge}`}>
                      <ImpactIcon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="font-semibold text-gray-900">{article.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500 whitespace-nowrap">
                          <Clock className="h-4 w-4" />
                          {formatDate(article.publishedAt)}
                        </div>
                      </div>

                      <p className="text-gray-600 mb-3">{article.summary}</p>

                      {/* What this means for you */}
                      <div className={`p-3 rounded-lg ${article.impactLevel === 'critical' ? 'bg-red-100' : article.impactLevel === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'} mb-3`}>
                        <p className="text-sm font-medium text-gray-800">
                          <span className="font-semibold">What this means for you:</span> {article.impact}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <div className="flex gap-1">
                          {article.affectedVisaTypes.map((visa) => (
                            <Badge key={visa} variant="secondary" className="text-xs">
                              {visa}
                            </Badge>
                          ))}
                        </div>
                        <a
                          href={article.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                        >
                          Source: {article.source}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Subscribe Card */}
      <Card className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-lg mb-1">Get Instant Alerts</h3>
              <p className="text-blue-100 text-sm">
                Enable push notifications to receive critical updates immediately
              </p>
            </div>
            <button className="px-6 py-2.5 bg-white text-blue-600 rounded-xl font-medium hover:bg-blue-50 transition-colors">
              Enable Notifications
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
