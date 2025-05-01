"use client";

import AuthProvider from "@/lib/utils/AuthProvider";

export default function DashboardPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}
