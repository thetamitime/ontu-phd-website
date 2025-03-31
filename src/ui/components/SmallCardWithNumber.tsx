export const SmallCardWithNumber: React.FC<{
  num: number;
  caption: string;
}> = ({ num, caption }) => {
  // make caption always take two lines
  const [firstHalfCaption, secondHalfCaption] = caption.split(" ", 2);

  // get correct form of "рік"
  const getYearLabel = (num: number) => {
    if (num === 1) return "рік";
    if (num >= 2 && num <= 4) return "роки";
    return <span>років</span>;
  };

  // check if caption is about duration
  const shouldShowYears = caption.toLowerCase().includes("тривалість");

  return (
    <div className="card card-sm card-border overflow-hidden">
      <div className="card-body bg-base-100 items-center px-8 pb-2">
        <p className="text-center text-sm">
          {firstHalfCaption} <br /> {secondHalfCaption}
        </p>
        <p className="card-title text-xl">
          {num} {shouldShowYears ? getYearLabel(num) : ""}
        </p>
      </div>
    </div>
  );
};
