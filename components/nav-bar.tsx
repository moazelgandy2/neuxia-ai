import { UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import { getLimitCount, getMaxCount } from "@/lib/a-limit";

import MobileSideBar from "@/components/mobile-side-bar";
import { checkSubscription } from "@/lib/subscription";

const NavBar = async () => {
  const maxCount = await getMaxCount();
  const limit = await getLimitCount();
  const isPro = await checkSubscription();
  return (
    <>
      <div className="flex items-start p-4">
        <MobileSideBar isPro={isPro} limit={limit} maxCount={maxCount} />
        <div className="flex w-full justify-end">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </>
  );
};

export default NavBar;
