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
