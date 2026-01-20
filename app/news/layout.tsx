import SiteLayout from "@/app/components/SiteLayout";

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteLayout>{children}</SiteLayout>;
}
