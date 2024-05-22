"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

import {
  Code,
  FileStackIcon,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  ScanSearch,
  Settings,
  SpeechIcon,
  VideoIcon,
} from "lucide-react";
import { Montserrat } from "next/font/google";
import { CreditCounter } from "./credit-counter";
import { useProModal } from "@/hooks/use-pro-modal";
import { Button } from "./ui/button";
import { SubscriptionButton } from "./subscription-button";

const montserrat = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
    disabled: false,
    isPro: false,
  },
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/dashboard/conversation",
    color: "text-violet-500",
    disabled: false,
    isPro: false,
  },
  {
    label: "Text to Speech",
    icon: SpeechIcon,
    href: "/dashboard/voice",
    color: "text-green-500",
    disabled: false,
    isPro: false,
  },
  {
    label: "Code Generation",
    icon: Code,
    href: "/dashboard/code",
    color: "text-emerald-500",
    disabled: false,
    isPro: false,
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/dashboard/image-gen",
    color: "text-pink-500",
    disabled: false,
    isPro: true,
  },
  {
    label: "Image to Text",
    icon: ScanSearch,
    href: "/dashboard/image",
    color: "text-blue-500",
    disabled: true,
    isPro: false,
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/dashboard/video",
    color: "text-red-500",
    disabled: true,
    isPro: false,
  },
  {
    label: "Library",
    icon: FileStackIcon,
    href: "/dashboard/library",
    disabled: false,
    isPro: false,
  },
];

const SideBar = ({
  limit = 0,
  isPro = false,
  maxCount,
}: {
  limit: number;
  isPro: boolean;
  maxCount: number;
}) => {
  const pathName = usePathname();
  const proModal = useProModal();

  return (
    <div className="space-y-4 py-4 flex flex-col justify-between h-screen bg-[#111827] text-white">
      <div className="px-3 flex-1">
        <Link href={"/dashboard"} className="flex justify-center items-center pl-3 mb-2">
          <div className="flex w-full items-center relative -top-8 justify-start">
            <div className="relative  w-20 h-20 mr-4">
              <Image fill alt="Logo" src="/logo.svg" />
            </div>
            <h1 className={cn("text-2xl font-bold relative right-8", montserrat.className)}>
              Neuxia
            </h1>
          </div>
        </Link>
        <div className="space-y-1">
          {routes.map((route, i) =>
            route.isPro && !isPro ? (
              <Button
                key={i}
                onClick={proModal.onOpen}
                variant={"ghost"}
                className={cn(
                  "text-sm group flex p-3 relative w-full items-center justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 transition rounded-lg",
                  pathName === route.href ? "text-white bg-white/10" : "text-zinc-400"
                )}
              >
                <div className="flex items-center flex-1">
                  <route.icon className={cn("w-5 h-5 mr-3", route.color)} />
                  {route.label}
                </div>
                {route.isPro && !isPro && (
                  <div className="bg-gradient-to-r h-6 w-12 flex items-center justify-center from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg absolute right-2 p-1 text-sm">
                    <p>PRO</p>
                  </div>
                )}
              </Button>
            ) : (
              <Link
                key={i}
                href={route.href}
                className={cn(
                  "text-sm group flex p-3 relative w-full items-center justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 transition rounded-lg",
                  pathName === route.href ? "text-white bg-white/10" : "text-zinc-400"
                )}
              >
                <div className="flex items-center flex-1">
                  <route.icon className={cn("w-5 h-5 mr-3", route.color)} />
                  {route.label}
                </div>
                {route.disabled && (
                  <div className="bg-gradient-to-r h-6 flex items-center justify-center w-12 from-blue-300 to-indigo-400 text-white rounded-lg absolute right-2 text-sm">
                    <p>Soon</p>
                  </div>
                )}
              </Link>
            )
          )}
        </div>
      </div>
      <CreditCounter limit={limit} isPro={isPro} maxCount={maxCount} />
      {isPro && (
        <div className="flex justify-center">
          <SubscriptionButton isPro={isPro} />
        </div>
      )}
    </div>
  );
};
export default SideBar;
