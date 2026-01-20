import AppLayout from '@/app/components/AppLayout'

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AppLayout>{children}</AppLayout>
}
