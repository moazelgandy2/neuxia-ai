"use client";

import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { ArrowRight } from "lucide-react";
import useScrollbarColor from "@/hooks/useScrollbarColor";

import { tools } from "@/constants";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

function DashboardPage() {
  const router = useRouter();
  const [isPro, setIsPro] = useState(false);

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
              if (tool.isPro && !isPro) return;
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
            {tool.isPro ? (
              <Badge variant={"premium"} className="px-2">
                PRO
              </Badge>
            ) : (
              <ArrowRight className="w-5 h-5" />
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;
