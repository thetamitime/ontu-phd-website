export const LogList = ({ className }: { className?: string }) => {
  return (
    <div className={`${className} card bg-base-100 border-base-300 border`}>
      <div className="card-body">
        <h2 className="card-title mb-3">Останні зміни</h2>
      </div>
    </div>
  );
};
