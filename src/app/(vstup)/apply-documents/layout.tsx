import { Tabs } from "@/ui/components/Tabs";
import Link from "next/link";
import React from "react";

const documentLinks = [
  {
    href: "https://pk.ontu.edu.ua/_pravila.html",
    label: "Правила прийому до ОНТУ",
  },
  {
    href: "https://ontu.edu.ua/download/aspirant/Application_applicant.pdf",
    label: "Заява",
  },
  {
    href: "https://ontu.edu.ua/download/aspirant/Personal_card.pdf",
    label: "Особовий листок",
  },
  {
    href: "https://ontu.edu.ua/download/aspirant/zrazok_spisok_pratsi.pdf",
    label: "Приклад списку наукових праць",
  },
  {
    href: "https://ontu.edu.ua/download/aspirant/Interview_program_for_research_proposal.pdf",
    label: "Вказівки до дослідницької пропозиції",
  },
  {
    href: "https://ontu.edu.ua/download/aspirant/prog_ispyt_inoz_mova.pdf",
    label: "Програма співбесіди з англійської мови",
  },
];

export default function ApplyDocumentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <h2 className="header mb-4">Необхідні документи</h2>
      <Tabs />
      <div className="lg:grid lg:grid-cols-[auto_auto] lg:gap-10">
        {children}
        <nav className="sticky top-0 col-start-2 self-start overflow-visible">
          <ul className="menu bg-base-200 rounded-box hidden max-w-80 text-base font-medium md:block [&_a]:px-4 [&_a]:py-3">
            <li className="menu-title">Матеріали</li>
            {documentLinks.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} target="_blank">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
