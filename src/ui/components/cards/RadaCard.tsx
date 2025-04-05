import React from "react";
import { Member } from "@/lib/types/defences";

type RadaCardProps = Member;

export const RadaCard = ({ position, members }: RadaCardProps) => {
  return (
    <div className="card card-border border-base-300 bg-base-100">
      <div className="card-body lg:grow-0">
        <p className="card-title text-base-content/50 text-base">{position}</p>
        {members.map((member, index) => (
          <div
            key={index}
            className="lg:tooltip lg:tooltip-info lg:tooltip-right w-fit"
            data-tip={member.toolTip}
          >
            <p className="w-fit text-lg underline hover:no-underline">
              {member.nameSurname}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
