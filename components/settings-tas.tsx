"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageGen, Voices } from "@prisma/client";
import { ImagesLibrary } from "./images-library";
import { VoicesLibrary } from "./voices-library";

interface GeneratedImagesProps {
  imgs: ImageGen[];
  voices: Voices[];
  isPro: boolean;
}

export function TabsDemo({ imgs, isPro, voices }: GeneratedImagesProps) {
  return (
    <div className="px-4 lg:px-8 w-full">
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Generated Images</TabsTrigger>
          <TabsTrigger value="password">Generated Voices</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <ImagesLibrary isPro={isPro} imgs={imgs} />
        </TabsContent>
        <TabsContent value="password">
          <VoicesLibrary isPro={isPro} voices={voices} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
