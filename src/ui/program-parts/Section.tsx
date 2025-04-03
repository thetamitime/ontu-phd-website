import React from "react";
import { Title } from "@/ui/components/Title";
import { Program } from "@/lib/types/programs";

type SectionProps = {
  degree: string;
  programCharacteristics?: Program["programCharacteristics"];
  directions?: Program["directions"];
};

export const Section: React.FC<SectionProps> = ({
  degree,
  programCharacteristics,
  directions,
}) => {
  return (
    <section id="characteristics">
      {degree === "phd" && programCharacteristics ? (
        <PhdView characteristics={programCharacteristics} />
      ) : (
        <DocView directions={directions} />
      )}
    </section>
  );
};

const PhdView: React.FC<{
  characteristics: Program["programCharacteristics"];
}> = ({ characteristics }) => {
  return (
    <>
      <Title text="Характеристики програми" />
      <div className="flex flex-col gap-4">
        <div>
          <h4 className="title">Предметна область</h4>
          <p>Об&#39;єкт вивчення: {characteristics?.area.object}</p>
          <p>Цілі навчання: {characteristics?.area.aim}</p>
          <p>Теоретичний зміст: {characteristics?.area.theory}</p>
          <p>Методи, методики та технології {characteristics?.area.theory}</p>
          <p>Інструменти та обладнання: {characteristics?.area.theory}</p>
        </div>
        <div>
          <h4 className="title">Основний фокус програми</h4>
          <p>{characteristics?.focus}</p>
        </div>
        <div>
          <h4 className="title">Особливості програми</h4>
          {characteristics?.features?.map((feature, index) => (
            <p key={index}>{feature}</p>
          ))}
        </div>
      </div>
    </>
  );
};

const DocView: React.FC<{ directions?: Program["directions"] }> = ({
  directions,
}) => {
  return (
    <>
      <Title text="Напрямки досліджень" />
      {directions?.map((direction, index) => (
        <p key={index}>
          {index + 1}. {direction}
        </p>
      ))}
    </>
  );
};
