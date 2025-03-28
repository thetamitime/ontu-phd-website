"use client";

import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { Menu } from "lucide-react";

interface Page {
  title: string;
  path: string;
  subTitle?: Page[];
}

export const NavigationBar = () => {
  //dropdown closed on click
  const closeDropdown = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.currentTarget.blur();
  };

  const pages: Page[] = [
    {
      title: "Головна",
      path: "/",
    },
    {
      title: "Програми",
      path: "/programs",
      subTitle: [
        {
          title: "Аспірантура",
          path: "phd",
        },
        {
          title: "Докторантура",
          path: "doctorate",
        },
      ],
    },
    {
      title: "Вступ",
      path: "",
      subTitle: [
        {
          title: "Етапи вступу",
          path: "/apply-roadmap",
        },
        {
          title: "Необхідні документи",
          path: "/apply-documents",
        },
      ],
    },
    {
      title: "Нормативні документи",
      path: "/documents",
    },
    {
      title: "Новини",
      path: "/news",
    },
    {
      title: "Контакти",
      path: "/contacts",
    },
  ];

  //func for displaying one-level tab
  const navigationTab = (tab: Page) => {
    return (
      <li key={uuidv4()}>
        <Link href={tab.path} className="md:btn btn-ghost">
          {tab.title}
        </Link>
      </li>
    );
  };

  //func for displaying two-level tab
  const navigationDropdownTab = (tab: Page) => {
    return tab.subTitle?.map((sub) =>
      tab.path === "" ? (
        <li key={uuidv4()}>
          <Link
            href={{ pathname: sub.path, query: { type: "phd" } }}
            className="whitespace-nowrap"
            onClick={closeDropdown}
          >
            {sub.title}
          </Link>
        </li>
      ) : (
        <li key={uuidv4()}>
          <Link
            href={{ pathname: tab.path, query: { type: sub.path } }}
            className="whitespace-nowrap"
            onClick={closeDropdown}
          >
            {sub.title}
          </Link>
        </li>
      ),
    );
  };

  return (
    <nav className="navbar justify-start px-3 py-5 md:justify-between md:px-16 md:py-2">
      <div className="navbar-start gap-2">
        {/* mobile display dropdown menu */}
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-square md:hidden"
          >
            <Menu />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-md dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {pages.map((page) => {
              return !page.subTitle ? (
                navigationTab(page)
              ) : (
                <li key={uuidv4()}>
                  <a> {page.title}</a>
                  <ul>{navigationDropdownTab(page)}</ul>
                </li>
              );
            })}
          </ul>
        </div>

        {/* logo */}
        <h1 className="line text-2xl font-bold whitespace-nowrap">ONTU PHD</h1>
      </div>

      {/* menu */}
      <ul className="menu menu-md menu-horizontal hidden items-center justify-end uppercase md:flex">
        {pages.map((page) => {
          return !page.subTitle ? (
            navigationTab(page)
          ) : (
            <div
              className="dropdown dropdown-hover md:dropdown-end lg:dropdown-start"
              key={uuidv4()}
            >
              <div tabIndex={0} role="button" className="btn btn-ghost">
                {page.title}
              </div>
              <ul className="dropdown-content menu bg-base-200 rounded-box z-1 flex w-fit p-2 normal-case shadow-sm">
                {navigationDropdownTab(page)}
              </ul>
            </div>
          );
        })}
      </ul>
    </nav>
  );
};
