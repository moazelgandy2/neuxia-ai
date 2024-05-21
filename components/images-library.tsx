import { ImageGen } from "@prisma/client";
import { Download, Eye, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { usePromptModal } from "@/hooks/use-prompt-modal";
import { useProModal } from "@/hooks/use-pro-modal";
interface GeneratedImagesProps {
  imgs: ImageGen[];
  isPro: boolean;
}

export const ImagesLibrary = ({ imgs, isPro }: GeneratedImagesProps) => {
  const promptModal = usePromptModal();
  const proModal = useProModal();

  return (
    <>
      <div className="space-y-4 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
          {imgs.length !== 0 &&
            isPro &&
            imgs.map((img: any, i: number) => (
              <Card key={i} className="rounded-lg over-flow-hidden ">
                <div className=" relative aspect-square">
                  <Image fill alt="Image" src={img.image} loading="lazy" />
                </div>
                <CardFooter className="p-2 grid grid-cols-12 gap-x-2 space-y-2 lg:space-y-0">
                  <Button
                    onClick={() => {
                      window.open(img.image);
                    }}
                    variant={"secondary"}
                    className="w-full p-0 col-span-12 lg:col-span-6"
                  >
                    <Download className="mr-2 w-4 h-4" />
                    Download
                    <span className=" sr-only">Download</span>
                  </Button>
                  <Button
                    onClick={() => {
                      promptModal.onOpenWithText(img.prompt, img.resolution);
                    }}
                    variant={"secondary"}
                    className="w-full col-span-12 lg:col-span-6"
                  >
                    <Eye className="mr-2 w-4 h-4" />
                    Prompt
                    <span className=" sr-only">View Prompt</span>
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </div>
        {imgs.length === 0 ||
          (!isPro && (
            <div className="w-full flex flex-col items-center justify-center ">
              {isPro && (
                <>
                  <div className="text-muted-foreground text-sm">
                    You have not generated any images yet. Start generating images by clicking the
                    button below.
                  </div>
                  <Link href="/dashboard/image-gen">
                    <Button className="mt-4">Generate Images</Button>
                  </Link>
                </>
              )}
              {!isPro && (
                <>
                  <div className="text-muted-foreground text-sm">
                    You are not subscribed to the Pro plan. Subscribe to the Pro plan to start
                    generating images.
                  </div>
                  <Button variant={"premium"} className="mt-4" onClick={() => proModal.onOpen()}>
                    Subscribe to Pro
                    <Zap className="ml-2 w-4 h-4 fill-white" />
                  </Button>
                </>
              )}
            </div>
          ))}
      </div>
    </>
  );
};
