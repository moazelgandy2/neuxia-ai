import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { tools } from "@/constants";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ImageIcon, Text } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { usePromptModal } from "@/hooks/use-prompt-modal";

export const PromptModal = () => {
  const proModal = usePromptModal();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
              <div className=" flex items-center gap-x-2 font-bold py-1">
                <Badge variant={"default"} className="uppercase text-sm py-1">
                  Prompt
                </Badge>
              </div>
            </DialogTitle>
            <DialogDescription className="text-center pt-2 space-y-2 text-zinc-500 font-medium">
              <Card className="p-3 border-black/5 flex items-center justify-between">
                <div className="flex items-center gap-x-4">
                  <div className={cn("p-2 w-fit rounded-md")}>
                    <Text className={cn("w-6 h-6")} />
                  </div>
                  <div className="font-semibold text-sm">
                    <p>{proModal.text}</p>
                  </div>
                </div>
              </Card>
              {proModal.resolution && (
                <Card className="p-3 border-black/5 flex items-center justify-between">
                  <div className="flex items-center gap-x-4">
                    <div className={cn("p-2 w-fit rounded-md")}>
                      <ImageIcon className={cn("w-6 h-6")} />
                    </div>
                    <div className="font-semibold text-sm">
                      <p>{proModal.resolution}</p>
                    </div>
                  </div>
                </Card>
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
