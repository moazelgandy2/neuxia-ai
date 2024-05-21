"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { Zap } from "lucide-react";
import { useState } from "react";

export const SubscriptionButton = ({ isPro = false }: { isPro: boolean }) => {
  const [isLoading, setIsLoading] = useState(false);
  const onClick = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/stripe");

      window.location.href = res.data.url;
    } catch (e) {
      console.error("SETTINGS_PAGE_ERROR", e);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Button disabled={isLoading} variant={isPro ? "default" : "premium"} onClick={onClick}>
        {isPro ? "Manage Subscription" : "Upgrade"}
        {!isPro && <Zap className="ml-2 w-4 h-4 fill-white" />}
      </Button>
    </>
  );
};
