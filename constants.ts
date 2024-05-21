import { Code, ImageIcon, MessageSquare, ScanSearch, SpeechIcon, VideoIcon } from "lucide-react";

export const MAX_FREE_COUNT = 5;

export const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    color: "text-violet-600",
    bgColor: "bg-violet-600/10",
    href: "/dashboard/conversation",
    isPro: false,
  },
  {
    label: "Text to Speech",
    icon: SpeechIcon,
    color: "text-green-600",
    bgColor: "bg-green-600/10",
    href: "/dashboard/voice",
    isPro: false,
  },
  {
    label: "Code Generation",
    icon: Code,
    color: "text-emerald-600",
    bgColor: "bg-emerald-600/10",
    href: "/dashboard/code",
    isPro: false,
  },
  {
    label: "Image to Text",
    icon: ScanSearch,
    color: "text-blue-600",
    bgColor: "bg-blue-600/10",
    href: "/dashboard/image",
    isPro: false,
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-600",
    bgColor: "bg-pink-600/10",
    href: "/dashboard/image-gen",
    isPro: true,
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    color: "text-red-600",
    bgColor: "bg-red-600/10",
    href: "/dashboard/video",
    isPro: false,
  },
];
