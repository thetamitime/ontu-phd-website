import React from "react";
import { ArrowUpRight, SquareMenu, X } from "lucide-react";
import Link from "next/link";
import { getProgramById } from "@/lib/api/programs";
import { MainSection, Section } from "@/ui/program-parts";
import { Breadcrumbs } from "@/ui/components";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const program = await getProgramById(id);

  console.log(program.linkFaculties);

  return (
    <>
      <Breadcrumbs
        degree={program.degree}
        forPath="/programs"
        title={program.name}
      />

      <div className="lg:grid lg:grid-cols-[0.8fr_0.2fr] lg:gap-10">
        {/* Mobile menu */}
        <nav className="fixed right-3 bottom-3 z-50">
          <input type="checkbox" id="menu-toggle" className="peer hidden" />
          <label
            htmlFor="menu-toggle"
            className="btn btn-square btn-active lg:hidden"
            aria-label="Toggle menu"
          >
            <SquareMenu />
          </label>
          <div className="bg-base-300 absolute -top-2 left-10 hidden w-[70svw] -translate-x-[100%] -translate-y-[100%] rounded-xl py-4 shadow-md peer-checked:block">
            <div className="flex items-center justify-between px-5 font-bold">
              <p>Меню</p>
              <label
                htmlFor="menu-toggle"
                className="btn btn-ghost btn-square size-auto md:hidden"
                aria-label="Toggle menu"
              >
                <X />
              </label>
            </div>
            <ul className="menu w-full py-0 text-base" role="menu">
              {program.linkFaculties.map((link) => (
                <li key={link.name}>
                  <Link href={link.link} target="_blank" role="button">
                    {link.name}
                    <ArrowUpRight />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/*Content*/}
        <article className="flex flex-col gap-12 pb-20 [&_p]:mb-2">
          {/*Main section*/}
          <MainSection
            name={program.name}
            degree={program.degree}
            fieldOfStudy={program.fieldOfStudy}
            form={program.form}
            speciality={program.speciality}
            accredited={program.accredited}
            {...(program.degree === "phd"
              ? {
                  purpose: program.purpose,
                  years: program.years,
                  credits: program.credits,
                }
              : {
                  description: program.descriptions,
                  objects: program.objects,
                  purpose: program.purpose,
                })}
          />

          {/*Program characteristics*/}
          <Section
            degree={program.degree}
            {...(program.degree === "phd"
              ? { programCharacteristics: program.programCharacteristics }
              : { directions: program.directions })}
          />
        </article>

        {/*Side menu*/}
        <nav className="sticky top-0 col-start-2 self-start overflow-visible">
          <ul className="menu bg-base-200 rounded-box hidden w-full text-base font-medium md:block [&_a]:px-4 [&_a]:py-2">
            {program.linkFaculties.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.link}
                  target="_blank"
                  role="button"
                  className="justify-between"
                >
                  <p className="w-full">{link.name}</p>
                  <ArrowUpRight />
                </Link>
              </li>
            ))}

            {/*
            //TODO: implement for files and map as array
            */}
            {/*<li>*/}
            {/*  <Link href={`${program.linkFile}`} target="_blank" role="button">*/}
            {/*    Документ програми*/}
            {/*    <FileDown size={22} />*/}
            {/*  </Link>*/}
            {/*</li>*/}
          </ul>
        </nav>
      </div>
    </>
  );
}
