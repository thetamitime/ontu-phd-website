export function TableSimple() {
  return (
    <div
      className="grid h-full md:grid-cols-[auto_repeat(4,1fr)] md:grid-rows-[auto_auto_1fr]"
      role="table"
      aria-labelledby="table-caption"
    >
      {/* Table caption for accessibility */}
      <div id="table-caption" className="sr-only">
        Financial Overview Table
      </div>

      {/* Header Section */}
      <div role="row" className="contents text-center font-semibold">
        <div
          className="bg-base-300 content-center p-4 md:row-span-2"
          role="columnheader"
        >
          Сума за весь період
        </div>
        <div className="bg-base-300 py-2 md:col-span-4" role="columnheader">
          Сума за рік
        </div>
      </div>

      {/* Year Headers */}
      <div role="row" className="contents text-center font-semibold">
        <div
          className="bg-base-300/30 row-start-4 py-2 md:row-auto"
          role="columnheader"
        >
          1 рік
        </div>
        <div
          className="bg-base-300/30 row-start-6 py-2 md:row-auto"
          role="columnheader"
        >
          2 рік
        </div>
        <div
          className="bg-base-300/30 row-start-8 py-2 md:row-auto"
          role="columnheader"
        >
          3 рік
        </div>
        <div
          className="bg-base-300/30 row-start-10 py-2 md:row-auto"
          role="columnheader"
        >
          4 рік
        </div>
      </div>

      {/* Data Row */}
      <div role="row" className="contents text-center text-xl font-bold">
        <div
          className="bg-base-100 row-start-2 content-center px-6 py-8 md:row-auto"
          role="cell"
        >
          146700 <span className="text-lg font-normal"> грн.</span>
        </div>
        <div
          className="bg-base-100 row-start-5 content-center px-6 py-8 md:row-auto"
          role="cell"
        >
          31700 <span className="text-lg font-normal">грн.</span>
        </div>
        <div
          className="bg-base-100 row-start-7 content-center px-6 py-8 md:row-auto"
          role="cell"
        >
          38200 <span className="text-lg font-normal">грн.</span>
        </div>
        <div
          className="bg-base-100 row-start-9 content-center px-6 py-8 md:row-auto"
          role="cell"
        >
          34800 <span className="text-lg font-normal">грн.</span>
        </div>
        <div
          className="bg-base-100 row-start-11 content-center px-6 py-8 md:row-auto"
          role="cell"
        >
          42000 <span className="text-lg font-normal">грн.</span>
        </div>
      </div>
    </div>
  );
}

export function TableLarge() {
  return (
    <table className="table overflow-x-auto text-center text-base">
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
        <tr>
          <td>ОК1</td>
          <td>Філософія пізнання</td>
          <td>3</td>
          <td>90</td>
          <td>диф. залік, екзамен</td>
        </tr>
        <tr>
          <td>ОК2</td>
          <td>Філософія пізнання</td>
          <td>3</td>
          <td>90</td>
          <td>диф. залік, екзамен</td>
        </tr>
        <tr>
          <td>ОК3</td>
          <td>Філософія пізнання</td>
          <td>3</td>
          <td>90</td>
          <td>диф. залік, екзамен</td>
        </tr>
        <tr>
          <td>ОК4</td>
          <td>Філософія пізнання</td>
          <td>3</td>
          <td>90</td>
          <td>диф. залік, екзамен</td>
        </tr>
        <tr>
          <td colSpan={2} className="text-start">
            Всього за цикл:
          </td>
          <td>16</td>
          <td>480</td>
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
        <tr>
          <td>ОК5</td>
          <td>Філософія пізнання</td>
          <td>3</td>
          <td>90</td>
          <td>диф. залік, екзамен</td>
        </tr>
        <tr>
          <td>ОК6</td>
          <td>Філософія пізнання</td>
          <td>3</td>
          <td>90</td>
          <td>диф. залік, екзамен</td>
        </tr>
        <tr>
          <td>ОК7</td>
          <td>Філософія пізнання</td>
          <td>3</td>
          <td>90</td>
          <td>диф. залік, екзамен</td>
        </tr>
        <tr>
          <td>ОК8</td>
          <td>Філософія пізнання</td>
          <td>3</td>
          <td>90</td>
          <td>диф. залік, екзамен</td>
        </tr>
        <tr>
          <td>ОК9</td>
          <td>Філософія пізнання</td>
          <td>3</td>
          <td>90</td>
          <td>диф. залік, екзамен</td>
        </tr>
        <tr>
          <td colSpan={2} className="text-start">
            Всього за цикл:
          </td>
          <td>16</td>
          <td>480</td>
          <td>-</td>
        </tr>
        <tr>
          <td></td>
          <td>Разом обов&#39;язкові компоненти</td>
          <td>33</td>
          <td>90</td>
          <td>-</td>
        </tr>
      </tbody>
      <thead className="bg-base-300 overflow-hidden [&_th]:font-semibold">
        <tr>
          <th colSpan={5}>Вибіркові освітні компонети з каталогу ОП*</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>ВК1</td>
          <td>Філософія пізнання</td>
          <td>3</td>
          <td>90</td>
          <td>диф. залік, екзамен</td>
        </tr>
        <tr>
          <td>ВК2</td>
          <td>Філософія пізнання</td>
          <td>3</td>
          <td>90</td>
          <td>диф. залік, екзамен</td>
        </tr>
        <tr>
          <td></td>
          <td>Разом вибіркові компоненти</td>
          <td>33</td>
          <td>90</td>
          <td>-</td>
        </tr>
      </tbody>
      <tfoot className="text-base">
        <tr>
          <td></td>
          <td>Разом за програму</td>
          <td>33</td>
          <td>90</td>
          <td>-</td>
        </tr>
      </tfoot>
    </table>
  );
}
