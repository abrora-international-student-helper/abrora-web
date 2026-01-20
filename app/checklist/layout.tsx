import AppLayout from '@/app/components/AppLayout'

export default function ChecklistLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AppLayout>{children}</AppLayout>
}
