import { ArrowRightFromLine, Menu } from "lucide-react";
import Image from "next/image";
import { ThemeToggle } from "@/ui/components/misc/ThemeToggle";
import { useAuth } from "@/lib/utils/AuthProvider";
import { useQuery } from "@tanstack/react-query";

interface NavbarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function Navbar({ isSidebarOpen, toggleSidebar }: NavbarProps) {
  const { isAuthenticated, getUser } = useAuth();

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => await getUser(),
    enabled: isAuthenticated,
  });

  return (
    <div className={`navbar bg-base-300 px-4 ${!isSidebarOpen && "w-screen"}`}>
      <div className="flex-1">
        <label className="btn btn-ghost swap p-2">
          <input type="checkbox" onClick={toggleSidebar} />
          <Menu className="swap-off" />
          <ArrowRightFromLine className="swap-on" />
        </label>
      </div>
      <div className="flex flex-none flex-row items-center gap-4">
        <div className="swap">
          <ThemeToggle />
        </div>
        <div className="divider divider-horizontal mx-0"></div>
        <p className="font-semibold">{user ? user.name : null}</p>
        <div className="avatar">
          <div className="avatar w-10 rounded-full">
            <Image
              alt="User Profile"
              src={
                user
                  ? `${process.env.NEXT_PUBLIC_API_URL}/files/uploads/users/${user.id}/${user.image}`
                  : `${process.env.NEXT_PUBLIC_API_URL}/files/uploads/users/0`
              }
              width={1000}
              height={1000}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
