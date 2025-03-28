export default function VstupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-base-200 px-6 md:px-10 lg:px-20">
      <div className="container xl:px-20">{children}</div>
    </main>
  );
}
