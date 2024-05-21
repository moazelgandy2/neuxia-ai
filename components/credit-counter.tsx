"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MAX_FREE_COUNT } from "@/constants";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { useProModal } from "@/hooks/use-pro-modal";

export const CreditCounter = ({ limit, isPro }: { limit: number; isPro: boolean }) => {
  const [mounted, setMounted] = useState(false);
  const proModal = useProModal();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (isPro) {
    return null;
  }

  return (
    <>
      <div className="px-3">
        <Card className="bg-white/10 border-0">
          <CardContent className="py-3">
            <div className="text-center text-sm text-white mb-2 space-y-2">
              <p>
                {limit} / {MAX_FREE_COUNT} Free generations
              </p>
              <Progress
                className="h-3"
                value={(limit / MAX_FREE_COUNT) * 100}
                max={MAX_FREE_COUNT}
              />
            </div>
            <Button
              onClick={() => {
                proModal.onOpen();
              }}
              variant={"premium"}
              className="w-full"
            >
              Upgrade <Zap className="h-4 w-4 ml-2 fill-white" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
