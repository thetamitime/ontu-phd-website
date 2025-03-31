import React from "react";
import { Component } from "@/lib/types/programs";

export const CostsTable: React.FC<{ sum: number; costs: number[] }> = ({
  sum,
  costs,
}) => {
  return (
    <div
      className="grid h-full grid-cols-1 grid-rows-[auto_auto_repeat(8,auto)] md:grid-cols-[auto_repeat(4,1fr)] md:grid-rows-[repeat(3,auto)]"
      role="table"
      aria-labelledby="table-caption"
    >
      {/* Table caption for accessibility */}
      <div id="table-caption" className="sr-only">
        Financial Overview Table
      </div>

      {/* Header Section */}
      <div className="contents text-center font-semibold">
        <div
          className="bg-base-300 content-center p-4 md:col-start-1 md:row-span-2 md:row-start-1"
          role="columnheader"
        >
          Сума за весь період
        </div>
        <div
          className="bg-base-300 row-start-3 py-2 md:col-span-4 md:col-start-2 md:row-start-1"
          role="columnheader"
        >
          Сума за рік
        </div>
      </div>

      {/* Total Amount */}
      <div className="contents text-center text-xl font-bold">
        <div
          className="bg-base-100 row-start-2 content-center px-6 py-8 md:col-start-1 md:row-span-2 md:row-start-3"
          role="cell"
        >
          {`${sum}`} <span className="text-lg font-normal"> грн.</span>
        </div>
      </div>

      {/* Year Headers and Data Rows */}
      {costs.map((cost, index) => (
        <div key={index} className="contents text-center">
          {/* Year Header */}
          <div
            className={`bg-base-300/30 content-center py-1 font-medium md:row-start-2 md:col-start-${index + 2}`}
            role="columnheader"
          >
            {`${index + 1} рік`}
          </div>

          {/* Corresponding Cost */}
          <div
            className={`bg-base-100 row-span-2 content-center px-6 py-8 md:row-start-3 md:col-start-${index + 2} text-xl font-bold`}
            role="cell"
          >
            {`${cost}`} <span className="text-lg font-normal"> грн.</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export const ComponentsTable: React.FC<{ components: Component[] }> = ({
  components,
}) => {
  //find optional components for correct indexing
  const optionalComponents = components.filter(
    (component) => component.componentType === "Optional",
  );

  // func for counting property of component
  const sumProperty = <K extends keyof Component>(
    type: "Universal" | "Practical" | "Optional",
    components: Component[],
    property: K,
  ): number =>
    components
      .filter(({ componentType }) => componentType === type)
      .reduce((acc, component) => acc + (component[property] as number), 0);

  // totals counted
  const totalUniversalCredits = sumProperty(
    "Universal",
    components,
    "componentCredits",
  );
  const totalUniversalHours = sumProperty(
    "Universal",
    components,
    "componentHours",
  );
  const totalPracticalCredits = sumProperty(
    "Practical",
    components,
    "componentCredits",
  );
  const totalPracticalHours = sumProperty(
    "Practical",
    components,
    "componentHours",
  );
  const totalOptionalCredits = sumProperty(
    "Optional",
    components,
    "componentCredits",
  );
  const totalOptionalHours = sumProperty(
    "Optional",
    components,
    "componentHours",
  );

  return (
    <table className="table text-center">
      <thead className="bg-base-300 overflow-hidden [&_th]:font-semibold">
        <tr>
          <th>Шифр</th>
          <th>Назва компоненти</th>
          <th>Кіл-ть кредитів</th>
          <th>Кіл-ть годин</th>
          <th>Форма контролю</th>
        </tr>
        <tr>
          <th colSpan={5}>Обов&#39;язкові освітні компонети</th>
        </tr>
        <tr>
          <th colSpan={5}>
            Цикли дисциплін, що формують загальнонауквові та універсальні
            навички дослідника
          </th>
        </tr>
      </thead>
      <tbody>
        {components.map(
          (component, index) =>
            component.componentType === "Universal" && (
              <tr key={index}>
                <td>ОК{index + 1}</td>
                <td>{component.componentName}</td>
                <td>{component.componentCredits}</td>
                <td>{component.componentHours}</td>
                <td>{component.controlForm.join(", ")}</td>
              </tr>
            ),
        )}

        <tr>
          <td colSpan={2} className="text-start">
            Всього за цикл:
          </td>
          <td>{totalUniversalCredits}</td>
          <td>{totalUniversalHours}</td>
          <td>-</td>
        </tr>
      </tbody>
      <thead className="bg-base-300 overflow-hidden [&_th]:font-semibold">
        <tr>
          <th colSpan={5}>
            Цикли практичної підготовки та дисциплін, що формують фахові
            компетентності
          </th>
        </tr>
      </thead>
      <tbody className="text-center">
        {components.map(
          (component, index) =>
            component.componentType === "Practical" && (
              <tr key={index}>
                <td>ОК{index + 1}</td>
                <td>{component.componentName}</td>
                <td>{component.componentCredits}</td>
                <td>{component.componentHours}</td>
                <td>{component.controlForm.join(", ")}</td>
              </tr>
            ),
        )}
        <tr>
          <td colSpan={2} className="text-start">
            Всього за цикл:
          </td>
          <td>{totalPracticalCredits}</td>
          <td>{totalPracticalHours}</td>
          <td>-</td>
        </tr>
        <tr>
          <td></td>
          <td>Разом обов&#39;язкові компоненти</td>
          <td>{totalUniversalCredits + totalPracticalCredits}</td>
          <td>{totalUniversalHours + totalPracticalHours}</td>
          <td>-</td>
        </tr>
      </tbody>
      <thead className="bg-base-300 overflow-hidden [&_th]:font-semibold">
        <tr>
          <th colSpan={5}>Вибіркові освітні компонети з каталогу ОП*</th>
        </tr>
      </thead>
      <tbody>
        {optionalComponents.map((component, index) => (
          <tr key={index}>
            <td>ВК{index + 1}</td>
            <td>{component.componentName}</td>
            <td>{component.componentCredits}</td>
            <td>{component.componentHours}</td>
            <td>{component.controlForm.join(", ")}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td></td>
          <td>Разом за програму</td>
          <td>
            {totalUniversalCredits +
              totalPracticalCredits +
              totalOptionalCredits}
          </td>
          <td>
            {totalUniversalHours + totalPracticalHours + totalOptionalHours}
          </td>
          <td>-</td>
        </tr>
      </tfoot>
    </table>
  );
};
