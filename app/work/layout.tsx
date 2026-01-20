import AppLayout from '@/app/components/AppLayout'

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AppLayout>{children}</AppLayout>
}
