import { MainFooter } from "@/ui/footer/MainFooter";
import { MainNavigation } from "@/ui/navigation/MainNavigation";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Admin bar + Navigation */}
      <MainNavigation />

      {/* Page contents */}
      <main className="bg-base-200 flex grow-1 flex-col">{children}</main>

      {/* Footer */}
      <MainFooter />
    </>
  );
}
