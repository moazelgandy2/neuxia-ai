import NavBar from "@/components/nav-bar";
import SideBar from "@/components/side-bar";

import { getLimitCount } from "@/lib/a-limit";
import { checkSubscription } from "@/lib/subscription";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const limitCount = await getLimitCount();
  const isPro = await checkSubscription();
  return (
    <>
      <div className="h-full relative">
        <div className="hidden h-full md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-gray-900">
          <div>
            <SideBar isPro={isPro} limit={limitCount} />
          </div>
        </div>
        <main className="md:pl-64">
          <NavBar />
          {children}
        </main>
      </div>
    </>
  );
};
export default DashboardLayout;
