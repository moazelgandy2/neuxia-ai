import { Voices } from "@prisma/client";
import { Download, Eye, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { usePromptModal } from "@/hooks/use-prompt-modal";
import { useProModal } from "@/hooks/use-pro-modal";
interface GeneratedImagesProps {
  voices: Voices[];
  isPro: boolean;
}

export const VoicesLibrary = ({ voices, isPro }: GeneratedImagesProps) => {
  const promptModal = usePromptModal();
  const proModal = useProModal();

  return (
    <>
      <div className="space-y-4 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-8">
          {voices.length !== 0 &&
            isPro &&
            voices.map((voice: any, i: number) => (
              <Card key={i} className="w-full">
                <CardHeader>
                  <audio className="w-full" src={voice.voice} controls />
                </CardHeader>
                <CardFooter>
                  <div className="flex items-center justify-between w-full">
                    <Button
                      onClick={() => {
                        promptModal.onOpenWithText(voice.prompt);
                      }}
                      variant={"secondary"}
                      className="w-full"
                    >
                      <Eye className="w-4 h-4 fill-white" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
        </div>

        {voices.length === 0 && isPro && (
          <>
            <div className="w-full flex justify-center flex-col items-center text-center">
              <div className="text-muted-foreground text-sm">
                You have not generated any images yet. Start generating voices by clicking the
                button below.
              </div>
              <Link href="/dashboard/voice">
                <Button className="mt-4">Generate Voices</Button>
              </Link>
            </div>
          </>
        )}

        {!isPro && (
          <>
            <div className="flex justify-center w-full flex-col items-center">
              <div className="text-muted-foreground text-sm">
                You are not subscribed to the Pro plan. Subscribe to the Pro plan to start
                generating voices.
              </div>
              <Button variant={"premium"} className="mt-4" onClick={() => proModal.onOpen()}>
                Subscribe to Pro
                <Zap className="ml-2 w-4 h-4 fill-white" />
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
};
