import React from "react";
import { phd, doc } from "../../../../lib/json/applyDocuments.json";

export default async function DocumentsPage({
  params,
}: {
  params: Promise<{ degree: string }>;
}) {
  const { degree } = await params;

  return (
    <article className="">
      это уже {degree}
      <div>{degree === "phd" ? JSON.stringify(phd) : JSON.stringify(doc)}</div>
    </article>
  );
}
