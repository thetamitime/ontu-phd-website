import { Tabs } from "@/ui/components/Tabs";

export default function DefenceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container">
      <h2 className="header mb-4">Захист дисертацій</h2>
      <div className="flex flex-col items-center justify-center">
        <Tabs />
        {children}
      </div>
    </div>
  );
}
