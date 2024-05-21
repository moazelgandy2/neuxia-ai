import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useProModal } from "@/hooks/use-pro-modal";
import { Badge } from "@/components/ui/badge";
import { tools } from "@/constants";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Check, Database, Loader, Zap } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export const ProModal = () => {
  const proModal = useProModal();
  const [isLoading, setIsLoading] = useState(false);

  const onSubscribe = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
              <div className=" flex items-center gap-x-2 font-bold py-1">
                Upgrade your plan to
                <Badge variant={"premium"} className="uppercase text-sm py-1">
                  Pro
                </Badge>
              </div>
            </DialogTitle>
            <DialogDescription className="text-center pt-2 space-y-1 text-zinc-500 font-medium">
              {tools.map((tool, i) => (
                <Card key={i} className="p-3 border-black/5 flex items-center justify-between">
                  <div className="flex items-center gap-x-4">
                    <div className={cn("p-2 w-fit rounded-md", tool.color)}>
                      <tool.icon className={cn("w-6 h-6", tool.color)} />
                    </div>
                    <div className="font-semibold text-sm">{tool.label}</div>
                  </div>
                  <Check className=" text-primary w-5 h-5" />
                </Card>
              ))}
              <Card className="p-3 border-black/5 w-full flex items-center justify-between">
                <div className="flex items-center gap-x-4">
                  <div className={cn("p-2 w-fit rounded-md")}>
                    <Database className={cn("w-6 h-6 text-violet-500")} />
                  </div>
                  <div className="font-semibold text-sm">Keep generations</div>
                </div>
                <Check className=" text-primary w-5 h-5" />
              </Card>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={onSubscribe}
              disabled={isLoading}
              size={"lg"}
              variant={"premium"}
              className="w-full"
            >
              Upgrade
              {isLoading ? (
                <>
                  <Loader className="w-4 h-4 ml-2 fill-white animate-spin" />
                </>
              ) : (
                <Zap className="w-4 h-4 ml-2 fill-white" />
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
