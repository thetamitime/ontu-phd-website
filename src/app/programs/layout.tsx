import { Breadcrumbs } from "@/ui/components/Breadcrumbs";

export default function ProgramLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main>
        <Breadcrumbs />
        {children}
      </main>
    </>
  );
}
