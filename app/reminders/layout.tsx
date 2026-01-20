import SiteLayout from "@/app/components/SiteLayout";

export default function RemindersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteLayout>{children}</SiteLayout>;
}
