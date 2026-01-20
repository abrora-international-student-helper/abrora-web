import SiteLayout from "@/app/components/SiteLayout";

export default function DocumentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteLayout>{children}</SiteLayout>;
}
