import { UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";

import MobileSideBar from "@/components/mobile-side-bar";

const NavBar = () => {
  return (
    <>
      <div className="flex items-start p-4">
        <MobileSideBar />
        <div className="flex w-full justify-end">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </>
  );
};

export default NavBar;
