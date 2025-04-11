import { Tabs } from "@/ui/components/Tabs";
import Link from "next/link";
import React from "react";
import { getDocuments } from "@/lib/api/documents";
import { FileSymlink } from "lucide-react";

const contacts: { name: string; caption: string }[] = [
  {
    name: "Військово-мобілізаційний підрозділ ОНТУ",
    caption: "Канатна, 112, каб. А-210, тел. 048-712-40-77",
  },
  {
    name: "Відділ аспірантури і докторантури",
    caption: "Канатна, 112, каб. А-215, тел. 048-712-41-56",
  },
];

export default async function ApplyDocumentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const documents = await getDocuments("Entry");

  return (
    <>
      <h2 className="header mb-4">Необхідні документи</h2>
      <div className="flex flex-col items-center justify-center">
        <Tabs />
        <div className="mt-6 lg:grid lg:grid-cols-[auto_auto] lg:gap-10">
          {children}
          <nav className="sticky top-0 mt-6 flex flex-col items-center self-start overflow-visible md:mt-0 md:flex-row md:items-start md:justify-around lg:col-start-2 lg:mb-0 lg:flex-col">
            <ul className="menu bg-base-200 rounded-box mt-0 max-w-80 pt-0 text-base font-medium [&_a]:px-4 [&_a]:py-3">
              <li className="menu-title pt-0">Матеріали</li>
              {documents.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.link}
                    target="_blank"
                    className="flex justify-between"
                  >
                    <p className="w-full">{item.name}</p>
                    <FileSymlink size={24} />
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="menu bg-base-200 rounded-box mt-0 max-w-80 pt-0 text-base font-medium [&_a]:px-4 [&_a]:py-3">
              <li className="menu-title pt-0">Контакти</li>
              {contacts.map((item, index) => (
                <div
                  key={index}
                  className="border-base-300 mb-4 rounded-lg border px-4 py-3"
                >
                  <p className="font-semibold">{item.name}</p>
                  <p className="w-[96%] font-normal">{item.caption}</p>
                </div>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
