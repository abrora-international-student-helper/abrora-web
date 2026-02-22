import SiteLayout from "@/app/components/SiteLayout";

export default function ShoppingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteLayout>{children}</SiteLayout>;
}
