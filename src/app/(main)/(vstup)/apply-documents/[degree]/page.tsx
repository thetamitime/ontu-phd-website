import React from "react";
import { getApplyDocuments } from "@/lib/api/applyDocuments";
import { RequiredDocument } from "@/ui/components/RequiredDocument";
import { Info } from "lucide-react";

export default async function DocumentsPage({
  params,
}: {
  params: Promise<{ degree: string }>;
}) {
  const { degree } = await params;
  const applyDocuments = await getApplyDocuments(degree);
  const document = applyDocuments[0];

  return (
    <article>
      <p>{document.description}</p>
      <p className="my-4">
        Особи, які вступають до аспірантури, подають особисто наступні
        документи:
      </p>
      <div className="gap flex flex-col gap-5">
        {document.requirements.map((item, index) => (
          <RequiredDocument
            key={index}
            number={index + 1}
            title={item.title}
            description={item.description}
            isLast={index === document.requirements.length - 1}
          />
        ))}
      </div>
      {degree === "phd" && (
        <div className="bg-warning text-warning-content my-7 flex flex-row items-center gap-5 rounded-xl px-5 py-4">
          <Info size={48} />
          <p>
            У разі подання документів на неакредитовані освітньо-наукові
            програми, вступники особисто підписують Повідомлення щодо
            поінформованості про відсутність акредитації та ознайомлення з
            частиною шостою статті 7 Закону України «Про вищу освіту».
          </p>
        </div>
      )}
      <p className="my-4">
        Під час подання заяви вступник особисто пред’являє оригінали:
      </p>
      <div className="gap flex flex-col gap-5">
        {document.originalsRequired.map((item, index) => (
          <RequiredDocument
            key={index}
            number={index + 1}
            title={item.title}
            description={item.description}
            isLast={index === document.originalsRequired.length - 1}
          />
        ))}
      </div>
    </article>
  );
}
