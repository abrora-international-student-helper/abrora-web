import SiteLayout from "@/app/components/SiteLayout";

export default function CarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteLayout>{children}</SiteLayout>;
}
