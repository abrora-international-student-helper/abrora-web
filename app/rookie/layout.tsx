import SiteLayout from "@/app/components/SiteLayout";

export default function RookieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteLayout>{children}</SiteLayout>;
}
