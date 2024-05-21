"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@clerk/nextjs";
import { Montserrat } from "next/font/google";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const font = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

export const LandingNavBar = () => {
  const { isSignedIn } = useAuth();

  return (
    <>
      <nav className="p-4 bg-transparent relative flex items-center justify-between">
        <Link href={"/"} className="flex items-center ">
          <div className=" absolute -top-5 left-0 flex items-center">
            <div className=" relative h-28 w-28 mr-4">
              <Image fill alt="Logo" src={"/logo.svg"} />
            </div>
            <div className="relative -left-8">
              <h1 className={cn("text-2xl font-bold text-white", font.className)}>Neuxia</h1>
            </div>
          </div>
        </Link>
        <div className=" flex items-center gap-x-2">
          <Link href={isSignedIn ? "/dashboard" : "/sign-in"}>
            <Button variant={"outline"} className=" rounded-full">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>
    </>
  );
};
