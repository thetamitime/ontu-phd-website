import { Pencil, Trash2 } from "lucide-react";
import { ProgramDegree } from "@/lib/types/programs";

interface ProgramActionsProps {
  program: ProgramDegree;
  onEditAction?: (id: number) => void;
  onDeleteAction?: (id: number) => void;
}

export const ProgramActions: React.FC<ProgramActionsProps> = ({
  program,
  onEditAction,
  onDeleteAction,
}) => (
  <div className="flex items-center gap-2">
    <button
      className="btn btn-square"
      onClick={() => onEditAction?.(program.id)}
    >
      <Pencil size={16} />
    </button>
    <button
      className="btn btn-square"
      onClick={() => onDeleteAction?.(program.id)}
    >
      <Trash2 size={16} className="text-red-500" />
    </button>
  </div>
);
