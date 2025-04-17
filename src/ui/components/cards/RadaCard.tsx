import React from "react";
import { Member } from "@/lib/types/defences";

type RadaCardProps = Member;

export const RadaCard = ({ position, members }: RadaCardProps) => {
  return (
    <div className="card card-border border-base-300 bg-base-100">
      <div className="card-body lg:grow-0">
        <p className="card-title text-base-content/50 text-base">{position}</p>
        {members.map((member, index) => (
          <div key={index}>
            <p className="w-fit text-lg">{member.nameSurname}</p>
            <div
              className="lg:tooltip lg:tooltip-info lg:tooltip-right w-fit"
              data-tip={member.toolTip}
            >
              <p className="text-base-content/30 underline hover:no-underline">
                {member.title ?? "Затичка"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
