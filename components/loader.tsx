import { cn } from "@/lib/utils";
import Image from "next/image";

interface LoaderProps {
  loaderImage: string;
  animation: string;
}

export const Loader = ({ loaderImage, animation }: LoaderProps) => {
  return (
    <>
      <div className=" h-full flex flex-col gap-y-4 items-center justify-center">
        <div className={cn("w-10 h-10 relative", animation)}>
          <Image fill alt={"Loader"} src={loaderImage} />
        </div>
        <p className="text-sm text-muted-foreground">Neuxia is generating your response...</p>
      </div>
    </>
  );
};
