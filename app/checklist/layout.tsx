import SiteLayout from "@/app/components/SiteLayout";

export default function ChecklistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteLayout>{children}</SiteLayout>;
}
