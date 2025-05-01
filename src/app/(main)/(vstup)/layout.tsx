export default function VstupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="container h-fit">{children}</div>;
}
