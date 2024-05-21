"use client";

import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SideBar from "@/components//side-bar";
import { useEffect, useState } from "react";

const MobileSideBar = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <Sheet>
        <SheetTrigger>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"} className="p-0 text-white border-0">
          <SideBar />
        </SheetContent>
      </Sheet>
    </>
  );
};
export default MobileSideBar;
