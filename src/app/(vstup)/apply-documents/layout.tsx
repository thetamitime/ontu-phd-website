import { Tabs } from "@/ui/components/Tabs";
import Link from "next/link";
import React from "react";
import { getDocuments } from "@/lib/api/documents";

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
      <Tabs />
      <div className="mt-6 lg:grid lg:grid-cols-[auto_auto] lg:gap-10">
        {children}
        <nav className="sticky top-0 col-start-2 self-start overflow-visible">
          <ul className="menu bg-base-200 rounded-box mt-0 hidden max-w-80 pt-0 text-base font-medium md:block [&_a]:px-4 [&_a]:py-3">
            <li className="menu-title pt-0">Матеріали</li>
            {documents.map((item) => (
              <li key={item.id}>
                <Link href={item.link} target="_blank">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="menu bg-base-200 rounded-box mt-0 hidden max-w-80 pt-0 text-base font-medium md:block [&_a]:px-4 [&_a]:py-3">
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
    </>
  );
}
