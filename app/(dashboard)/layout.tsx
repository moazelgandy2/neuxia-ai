import NavBar from "@/components/nav-bar";
import SideBar from "@/components/side-bar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="h-full relative">
        <div className="hidden h-full md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
          <div>
            <SideBar />
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
