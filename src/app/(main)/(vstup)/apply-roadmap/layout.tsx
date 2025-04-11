import { Tabs } from "@/ui/components/Tabs";

export default function RoadmapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <h2 className="header mb-4">Етапи вступу</h2>
      <div className="flex flex-col items-center justify-center">
        <Tabs />
        {children}
      </div>
    </>
  );
}
