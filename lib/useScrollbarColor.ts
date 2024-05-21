import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const useScrollbarColor = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    console.log("pathname", pathname);
    const setScrollbarColors = (thumbColor: string, hoverColor: string) => {
      document.documentElement.style.setProperty("--scrollbar-thumb-color", thumbColor);
      document.documentElement.style.setProperty("--scrollbar-thumb-hover-color", hoverColor);
    };

    switch (pathname) {
      case "/dashboard":
        console.log("dashboard");
        setScrollbarColors("##29303D", "##29303D"); // red color for dashboard
        break;
      case "/dashboard/conversation":
        setScrollbarColors("#8B5CF6", "#7352C9"); // green color for image
        break;
      case "/dashboard/code":
        setScrollbarColors("#13AC7B", "#059669 "); // green color for image
        break;
      case "/dashboard/image-gen":
        setScrollbarColors("#EC4899", "#DB2777"); // green color for image
        break;
      case "/dashboard/video":
        setScrollbarColors("#DC2626", "#f90e0e"); // green color for image
        break;
      default:
        setScrollbarColors("#8b5cf6", "#8455f0"); // default color
    }
  }, [pathname]);
};

export default useScrollbarColor;
