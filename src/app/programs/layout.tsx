import { Breadcrumbs } from "@/ui/components/Breadcrumbs";

export default function ProgramLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="bg-base-200 grid grid-rows-[auto_1fr] px-10 lg:px-20">
        <Breadcrumbs />
        {children}
      </main>
    </>
  );
}
