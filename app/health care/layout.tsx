import SiteLayout from "@/app/components/SiteLayout";

export default function HealthCareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteLayout>{children}</SiteLayout>;
}
