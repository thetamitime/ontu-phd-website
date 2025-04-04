import React from "react";
import { Member } from "@/lib/types/defences";

type RadaCardProps = Member;

export const RadaCard = ({ position }: RadaCardProps) => {
  return (
    <div className="card card-border border-base-300 bg-base-100">
      <div className="card-body lg:grow-0">
        <p className="card-title text-base-content/50 text-base">{position}</p>
        <div
          className="lg:tooltip lg:tooltip-info lg:tooltip-right w-fit"
          data-tip="доктор економічних наук за спеціальністю 08.00.05 – Розвиток
            продуктивних сил і регіональна економіка, професор, завідувач
            кафедри маркетингу, підприємництва і торгівлі, Одеський національний
            технологічний університет."
        >
          <p className="w-fit text-lg">ПРІЗВИЩЕ Ім&#39;я</p>
        </div>
      </div>
    </div>
  );
};
