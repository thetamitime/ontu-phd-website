import { Tabs } from "@/ui/components/Tabs";

export default function DefenceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-base-200 px-6 md:px-10 lg:px-20">
      <div className="container flex flex-col items-center xl:px-20">
        <h2 className="header mb-4">Захист дисертацій</h2>
        <Tabs />
        {children}
      </div>
    </main>
  );
}
