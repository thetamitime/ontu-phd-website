import React from "react";
import { Title } from "@/ui/components/Title";
import { ProgramCharacteristics } from "@/lib/types/programs";

interface CharacteristicsSectionProps {
  programCharacteristics: ProgramCharacteristics;
}

export const CharacteristicsSection: React.FC<CharacteristicsSectionProps> = ({
  programCharacteristics,
}) => {
  return (
    <section id="characteristics">
      <Title text="Характеристики програми" />
      <div className="flex flex-col gap-4">
        <div>
          <h4 className="title"> Предметна область </h4>
          <p>Об&#39;єкт вивчення: {programCharacteristics.area.object}</p>
          <p>Цілі навчання: {programCharacteristics.area.aim}</p>
          <p>Теоретичний зміст: {programCharacteristics.area.theory}</p>
          <p>
            Методи, методики та технології {programCharacteristics.area.theory}
          </p>
          <p>Інструменти та обладнання: {programCharacteristics.area.theory}</p>
        </div>
        <div>
          <h4 className="title"> Основний фокус програми </h4>
          <p>{programCharacteristics.focus}</p>
        </div>
        <div>
          <h4 className="title"> Особливості програми </h4>
          {programCharacteristics.features.map((feature, index) => (
            <p key={index}>{feature}</p>
          ))}
        </div>
      </div>
    </section>
  );
};
