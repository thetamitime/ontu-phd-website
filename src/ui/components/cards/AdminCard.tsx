import { adminValue } from "@/lib/schemas/newAdminSchema";
import { Trash2 } from "lucide-react";
import React from "react";

export const AdminCard = ({ admins }: { admins: adminValue[] }) => {
  return admins.map((admin: adminValue, index: number) => (
    <div key={index} className="card">
      <div className="card-body flex-row items-center gap-4 p-0 text-base">
        <div className="avatar">
          <div className="w-12 rounded-full">
            {/*TODO: add image from files*/}
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <div className="grow-1">
          <p className="font-medium">{admin.name}</p>
          <p className="text-base-content/30 text-sm">{admin.email}</p>
        </div>
        <div>
          <button
            role="button"
            className="btn btn-square"
            onClick={() => console.log(admin)}
          >
            <Trash2 size={16} className="text-red-500" />
          </button>
        </div>
      </div>
    </div>
  ));
};
