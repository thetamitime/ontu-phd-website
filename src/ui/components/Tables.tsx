export function TableSimple() {
  return (
    <table className="table h-full">
      <thead className="bg-base-300 overflow-hidden text-center [&_th]:font-semibold">
        <tr>
          <th rowSpan={2}>Сума за весь період</th>
          <th colSpan={4}>Сума за рік</th>
        </tr>
        <tr>
          <th>1 рік</th>
          <th>2 рік</th>
          <th>3 рік</th>
          <th>4 рік</th>
        </tr>
      </thead>
      <tbody className="text-center [&_span]:text-lg [&_span]:font-normal [&_td]:text-xl [&_td]:font-bold">
        <tr>
          <td>
            146700 <span>грн.</span>
          </td>
          <td>
            31700 <span>грн.</span>
          </td>
          <td>
            38200 <span>грн.</span>
          </td>
          <td>
            34800 <span>грн.</span>
          </td>
          <td>
            42000 <span>грн.</span>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export function TableLarge() {
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
      <tfoot>
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
