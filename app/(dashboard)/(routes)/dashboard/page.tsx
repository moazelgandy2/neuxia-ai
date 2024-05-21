"use client";

import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import {
  ArrowRight,
  Code,
  ImageIcon,
  MessageSquare,
  ScanSearch,
  SpeechIcon,
  VideoIcon,
} from "lucide-react";
import useScrollbarColor from "@/lib/useScrollbarColor";

const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    color: "text-violet-600",
    bgColor: "bg-violet-600/10",
    href: "/dashboard/conversation",
  },
  {
    label: "Text to Speech",
    icon: SpeechIcon,
    color: "text-green-600",
    bgColor: "bg-green-600/10",
    href: "/dashboard/voice",
  },
  {
    label: "Code Generation",
    icon: Code,
    color: "text-emerald-600",
    bgColor: "bg-emerald-600/10",
    href: "/dashboard/code",
  },
  {
    label: "Image to Text",
    icon: ScanSearch,
    color: "text-blue-600",
    bgColor: "bg-blue-600/10",
    href: "/dashboard/image",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-600",
    bgColor: "bg-pink-600/10",
    href: "/dashboard/image-gen",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    color: "text-red-600",
    bgColor: "bg-red-600/10",
    href: "/dashboard/video",
  },
];

function DashboardPage() {
  const router = useRouter();
  useScrollbarColor();
  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">Explore the power of the AI</h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Explore the power of the AI and see what it can do for you.
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4 pb-4">
        {tools.map((tool, i) => (
          <Card
            onClick={() => {
              router.push(tool.href);
            }}
            key={i}
            className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)} />
              </div>
              <div>
                <h3 className="font-semibold">{tool.label}</h3>
              </div>
            </div>
            <ArrowRight className="w-5 h-5" />
          </Card>
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;
