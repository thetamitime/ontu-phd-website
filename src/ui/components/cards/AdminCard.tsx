import { Trash2 } from "lucide-react";
import React from "react";
import Image from "next/image";
import { useAuth } from "@/lib/utils/AuthProvider";
import { useMutation } from "@tanstack/react-query";
import { User } from "@/lib/types/dashboard";

export const AdminCard = ({ admins }: { admins: User[] }) => {
  const { deleteAdmin } = useAuth();
  const src = `${process.env.NEXT_PUBLIC_API_URL}/files/uploads/users/`;

  {
    /*TODO: fix delete admin*/
  }
  const mutation = useMutation({
    mutationFn: async (id: string) => deleteAdmin(id),
    onSuccess: () => alert("Адміністратора видалено!"),
    onError: (err: Error) => alert("Помилка: " + err.message),
  });

  return admins.map((admin, index: number) => (
    <div key={index} className="card">
      <div className="card-body flex-row items-center gap-4 p-0 text-base">
        <div className="avatar">
          <div className="w-12 rounded-full">
            <Image
              src={`${src}${admin.name}/${admin.image}`}
              alt={admin.name + "картинка профілю"}
              width={500}
              height={500}
            />
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
            onClick={() => mutation.mutate(index.toString())} //TODO: change to fit admin.id
          >
            <Trash2 size={16} className="text-red-500" />
          </button>
        </div>
      </div>
    </div>
  ));
};
