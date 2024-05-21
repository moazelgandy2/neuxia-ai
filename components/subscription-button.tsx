"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { Settings, Zap } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export const SubscriptionButton = ({ isPro = false }: { isPro: boolean }) => {
  const [isLoading, setIsLoading] = useState(false);
  const onClick = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/stripe");

      window.location.href = res.data.url;
    } catch (e) {
      console.error("SETTINGS_PAGE_ERROR", e);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Button
        disabled={isLoading}
        variant={isPro ? "default" : "premium"}
        className="flex justify-center items-center"
        onClick={onClick}
      >
        Manage Subscription
        <Settings className="w-4 h-4 ml-2" />
      </Button>
    </>
  );
};
