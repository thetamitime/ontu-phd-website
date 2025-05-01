export const Title: React.FC<{ text: string }> = ({ text }) => {
  return (
    <>
      <h3 className="sub-header">{text}</h3>
      <div className="divider mt-1"></div>
    </>
  );
};
