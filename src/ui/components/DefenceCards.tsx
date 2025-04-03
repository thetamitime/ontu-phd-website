import React from "react";
import Link from "next/link";
import { FileSymlink, SquareArrowOutUpRight } from "lucide-react";

export const DefenceCardPhd = () => {
  return (
    <div className="mt-10 w-full">
      <h4 className="text-base-content/50">Фамилия Имя</h4>
      <h3 className="sub-header my-2">{`Название диссертации`}</h3>
      <div className="flex flex-wrap gap-2 pt-2 pb-6">
        <div className="badge badge-lg badge-primary badge-soft h-fit">
          {`${`КОД`} ${"Галузь знань"}`}
        </div>
        <div className="badge badge-lg badge-primary badge-soft h-fit">
          {`${"КОД1"} ${"Назва спеціальності"}`}
        </div>
        <div className="badge badge-lg badge-primary badge-soft h-fit">
          {`${"Назва ОНП"}`}
        </div>
      </div>
      <p>
        Наукові керівники: Морозюк Лариса Іванівна, кандидат технічних наук,
        доцент
      </p>
      <p>Дата захисту: 26 грудня 2024 о 11:00</p>
      <p>
        Адреса: Одеський національний технологічний університет, Одеська
        область, м. Одеса, вул. Канатна, 112, А-234
      </p>
      <p className="mt-4 mb-2">
        Разова спеціалізована вчена рада з правом прийняття до розгляду та
        проведення разового захисту дисертаційної роботи Молодан Марини
        Михайлівни на здобуття ступеня доктора філософії в галузі знань 05
        «Соціальні та поведінкові науки» за спеціальністю 051 «Економіка» (ОНП
        «Економіка»).
      </p>
      <p className="mb-4 text-lg font-semibold">Склад спеціалізованої ради:</p>
      <div className="flex flex-col gap-4 lg:flex-row">
        <RadaCard />
      </div>
      <Link
        className="btn btn-outline border-light-base-400 dark:border-base-400 mt-4 h-fit gap-4 py-2 text-base"
        href={
          "https://ontu.edu.ua/download/dissertation/phd/order-125_03-06_03_2025.pdf"
        }
        target="_blank"
      >
        <p className="w-full">
          Наказ про утворення разової спеціалізованої вченої ради
        </p>
        <FileSymlink size={24} />
      </Link>
      <p className="my-4 text-lg font-semibold">Посилання</p>
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="card">
          <div className="card-title text-base-content/50 mb-4 text-base">
            Файли та трансляції
          </div>
          <div className="card-body px-0 py-0 lg:grow-0">
            <Link
              className="btn btn-outline border-light-base-400 dark:border-base-400 h-fit gap-4 py-2 text-base"
              href={"https://youtube.com/live/MO8zTH6grME?feature=share"}
              target="_blank"
            >
              <p className="w-full">Онлайн-трансляція захисту дисертації</p>
              <SquareArrowOutUpRight size={24} />
            </Link>
            <Link
              className="btn btn-outline border-light-base-400 dark:border-base-400 h-fit gap-4 py-2 text-base lg:w-fit"
              href={
                "https://ontu.edu.ua/download/dissertation/phd/Disser/2025/Disser-PhD-Hutak_ASA.pdf"
              }
              target="_blank"
            >
              <p className="w-full">Дисертація</p>
              <SquareArrowOutUpRight size={24} />
            </Link>
          </div>
        </div>
        <div className="card">
          <div className="card-title text-base-content/50 mb-4 text-base">
            Електронний підпис
          </div>
          <div className="card-body px-0 py-0 lg:grow-0">
            <Link
              className="btn btn-outline border-light-base-400 dark:border-base-400 h-fit gap-4 py-2 text-base lg:w-fit"
              href={"https://youtube.com/live/MO8zTH6grME?feature=share"}
              target="_blank"
            >
              <p className="w-full">Дисертація підписана КЕП</p>
              <SquareArrowOutUpRight size={24} />
            </Link>
            <Link
              className="btn btn-outline border-light-base-400 dark:border-base-400 h-fit gap-4 py-2 text-base lg:w-fit"
              href={
                "https://ontu.edu.ua/download/dissertation/phd/Disser/2025/Disser-PhD-Hutak_ASA.pdf"
              }
              target="_blank"
            >
              <p className="w-full">
                Рецензія д.е.н. Т.В. Савченко підписаний КЕП
              </p>
              <SquareArrowOutUpRight size={24} />
            </Link>
            <Link
              className="btn btn-outline border-light-base-400 dark:border-base-400 h-fit gap-4 py-2 text-base lg:w-fit"
              href={
                "https://ontu.edu.ua/download/dissertation/phd/Disser/2025/Disser-PhD-Hutak_ASA.pdf"
              }
              target="_blank"
            >
              <p className="w-full">
                Рецензія д.е.н. Н.Й. Басюркіної підписаний КЕП
              </p>
              <SquareArrowOutUpRight size={24} />
            </Link>
          </div>
        </div>
      </div>
      <p className="text-base-content/30 mt-6 text-sm lg:text-right">
        Дата розміщення оголошення – 24 лютого 2025 p.
      </p>
      <div className="divider after:bg-base-300 before:bg-base-300 mt-2 mb-10"></div>
    </div>
  );
};

const RadaCard = () => {
  return (
    <>
      <div className="card card-border border-base-300 bg-base-100">
        <div className="card-body lg:grow-0">
          <p className="card-title text-base-content/50 text-base">
            Частина складу
          </p>
          <div
            className="lg:tooltip lg:tooltip-info lg:tooltip-right w-fit"
            data-tip="доктор економічних наук за спеціальністю 08.00.05 – Розвиток
            продуктивних сил і регіональна економіка, професор, завідувач
            кафедри маркетингу, підприємництва і торгівлі, Одеський національний
            технологічний університет."
          >
            <p className="w-fit text-lg">ПРІЗВИЩЕ Ім&#39;я</p>
          </div>
          {/*
          <p className="text-lg">ПРІЗВИЩЕ Ім&#39;я</p>
          <p className="text-base-content/50 text-sm">
            доктор економічних наук за спеціальністю 08.00.05 – Розвиток
            продуктивних сил і регіональна економіка, професор, завідувач
            кафедри маркетингу, підприємництва і торгівлі, Одеський національний
            технологічний університет.
          </p>
          */}
        </div>
      </div>
      <div className="card card-border border-base-300 bg-base-100">
        <div className="card-body">
          <p className="card-title text-base-content/50 text-base">
            Частина складу
          </p>
          <div
            className="lg:tooltip lg:tooltip-info lg:tooltip-right w-fit"
            data-tip="доктор економічних наук за спеціальністю 08.00.05 – Розвиток
            продуктивних сил і регіональна економіка, професор, завідувач
            кафедри маркетингу, підприємництва і торгівлі, Одеський національний
            технологічний університет."
          >
            <p className="w-fit text-lg">ПРІЗВИЩЕ Ім&#39;я</p>
          </div>
          {/*
          <p className="text-lg">ПРІЗВИЩЕ Ім&#39;я</p>
          <p className="text-base-content/50 text-sm">
            доктор економічних наук за спеціальністю 08.00.05 – Розвиток
            продуктивних сил і регіональна економіка, професор, завідувач
            кафедри маркетингу, підприємництва і торгівлі, Одеський національний
            технологічний університет.
          </p>
          */}
          <div
            className="lg:tooltip lg:tooltip-info lg:tooltip-right w-fit"
            data-tip="доктор економічних наук за спеціальністю 08.00.05 – Розвиток
            продуктивних сил і регіональна економіка, професор, завідувач
            кафедри маркетингу, підприємництва і торгівлі, Одеський національний
            технологічний університет."
          >
            <p className="w-fit text-lg">ПРІЗВИЩЕ Ім&#39;я</p>
          </div>
          {/*
          <p className="text-lg">ПРІЗВИЩЕ Ім&#39;я</p>
          <p className="text-base-content/50 text-sm">
            доктор економічних наук за спеціальністю 08.00.05 – Розвиток
            продуктивних сил і регіональна економіка, професор, завідувач
            кафедри маркетингу, підприємництва і торгівлі, Одеський національний
            технологічний університет.
          </p>
          */}
        </div>
      </div>
      <div className="card card-border border-base-300 bg-base-100">
        <div className="card-body">
          <div className="card-title text-base-content/50 text-base">
            Частина складу
          </div>
          <div
            className="lg:tooltip lg:tooltip-info lg:tooltip-right w-fit"
            data-tip="доктор економічних наук за спеціальністю 08.00.05 – Розвиток
            продуктивних сил і регіональна економіка, професор, завідувач
            кафедри маркетингу, підприємництва і торгівлі, Одеський національний
            технологічний університет."
          >
            <p className="w-fit text-lg">ПРІЗВИЩЕ Ім&#39;я</p>
          </div>
          {/*
          <p className="text-lg">ПРІЗВИЩЕ Ім&#39;я</p>
          <p className="text-base-content/50 text-sm">
            доктор економічних наук за спеціальністю 08.00.05 – Розвиток
            продуктивних сил і регіональна економіка, професор, завідувач
            кафедри маркетингу, підприємництва і торгівлі, Одеський національний
            технологічний університет.
          </p>
          */}
          <div
            className="lg:tooltip lg:tooltip-info lg:tooltip-right w-fit"
            data-tip="доктор економічних наук за спеціальністю 08.00.05 – Розвиток
            продуктивних сил і регіональна економіка, професор, завідувач
            кафедри маркетингу, підприємництва і торгівлі, Одеський національний
            технологічний університет."
          >
            <p className="w-fit text-lg">ПРІЗВИЩЕ Ім&#39;я</p>
          </div>
          {/*
          <p className="text-lg">ПРІЗВИЩЕ Ім&#39;я</p>
          <p className="text-base-content/50 text-sm">
            доктор економічних наук за спеціальністю 08.00.05 – Розвиток
            продуктивних сил і регіональна економіка, професор, завідувач
            кафедри маркетингу, підприємництва і торгівлі, Одеський національний
            технологічний університет.
          </p>
          */}
        </div>
      </div>
    </>
  );
};
