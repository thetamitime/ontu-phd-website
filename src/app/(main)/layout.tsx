import { MainFooter } from "@/ui/footer/MainFooter";
import { MainNavigation } from "@/ui/navigation/MainNavigation";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Admin Bar + Navigation */}
      <MainNavigation />

      {children}

      {/* Footer */}
      <MainFooter />
    </>
  );
}
