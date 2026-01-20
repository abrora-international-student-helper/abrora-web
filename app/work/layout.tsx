import SiteLayout from "@/app/components/SiteLayout";

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteLayout>{children}</SiteLayout>;
}
