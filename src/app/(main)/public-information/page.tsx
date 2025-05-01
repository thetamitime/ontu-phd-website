import { getDocuments } from "@/lib/api/documents";
import { FileSymlink } from "lucide-react";
import Link from "next/link";
import { Title } from "@/ui/components";

export default async function PublicInformationPage() {
  const documents = await getDocuments("Normative");

  return (
    <div className="container">
      <h2 className="header">Публічна інформація</h2>
      <div className="section mb-5">
        <div className="mb-5">
          <Title text="Нормативні документи" />
          <div className="flex flex-col items-start gap-4">
            {documents.map((document) => (
              <Link
                href={document.link}
                target="_blank"
                key={document.id}
                className="btn btn-lg border-light-base-400 dark:border-base-400 h-fit gap-4 py-3 text-left text-base"
              >
                <p className="w-full">{document.name}</p>
                <FileSymlink size={24} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
