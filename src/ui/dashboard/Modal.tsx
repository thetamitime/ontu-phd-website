import { X } from "lucide-react";
import { ReactNode } from "react";

export const Modal = ({
  children,
  label,
  onClose,
}: {
  children: ReactNode;
  label: string;
  onClose?: () => void;
}) => {
  return (
    <dialog open className="modal">
      <div className="modal-box bg-base-200 max-h-[80dvh] w-fit max-w-3xl">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">{label}</h3>
          {onClose && (
            <form method="dialog" onSubmit={(e) => e.preventDefault()}>
              <button
                className="btn btn-sm btn-circle btn-ghost"
                onClick={onClose} // Call onClose when the button is clicked
              >
                <X />
              </button>
            </form>
          )}
        </div>
        {children}
      </div>
    </dialog>
  );
};
