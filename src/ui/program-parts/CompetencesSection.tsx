import { Title } from "@/ui/components/Title";
import { ProgramCompetence } from "@/lib/types/programs";
import React from "react";

interface CompetencesSectionProps {
  programCompetences: ProgramCompetence;
}

export const CompetencesSection: React.FC<CompetencesSectionProps> = ({
  programCompetences,
}) => {
  return (
    <section id="competences">
      <Title text="Програмні компетентності" />
      <div className="flex flex-col gap-4">
        <div>
          <h4 className="title"> Інтегральна компетентність </h4>
          <p>{programCompetences.integralCompetence}</p>
        </div>
        <div>
          <h4 className="title"> Загальні компетентності </h4>
          {programCompetences.overallCompetence.map((competence, index) => (
            <p key={index}>
              ЗК{index + 1}. {competence}
            </p>
          ))}
        </div>
        <div>
          <h4 className="title"> Спеціальні (фахові) компетентності </h4>
          {programCompetences.specialCompetence.map((competence, index) => (
            <p key={index}>
              СК{index + 1}. {competence}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};
