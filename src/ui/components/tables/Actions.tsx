import { Pencil, Trash2 } from "lucide-react";

interface ActionsProps {
  data: unknown;
  onEditAction?: (id: number) => void;
  onDeleteAction?: () => void;
}

export const Actions: React.FC<ActionsProps> = ({
  data,
  onEditAction,
  onDeleteAction,
}) => {
  return (
    <div className="flex items-center gap-2">
      <button
        className="btn btn-square"
        onClick={() => onEditAction?.(data.id)}
      >
        <Pencil size={16} />
      </button>
      <button
        className="btn btn-square pointer-events-auto"
        onClick={() => {
          onDeleteAction?.();
        }}
      >
        <Trash2 size={16} className="text-red-500" />
      </button>
    </div>
  );
};
