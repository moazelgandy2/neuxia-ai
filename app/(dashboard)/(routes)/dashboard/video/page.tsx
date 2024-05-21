"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import useScrollbarColor from "@/hooks/useScrollbarColor";

import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./constants";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/heading";
import { Empty } from "@/components/empty";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
import { Loader } from "@/components/loader";

import { VideoIcon } from "lucide-react";
import Image from "next/image";

export default function ConversationPage() {
  useScrollbarColor();

  const router = useRouter();
  const [voice, setVoice] = useState<any>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setVoice(undefined);

      const response = await axios.post("/api/video", {
        prompt: values.prompt,
      });

      setVoice(response.data);
      form.reset();
      router.refresh();
    } catch (e: any) {
      console.error("[GEMINI_TEXT_ERROR_API]", e);
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <div>
          <Heading
            title="Video Generation"
            description="Generate video from text using AI."
            icon={VideoIcon}
            iconColor="text-red-600"
            bgColor="bg-red-600/10"
          />
        </div>
        <div className="p-4 flex items-center justify-center flex-col gap-12 lg:px-8">
          <div className="w-1/2">
            <Image alt={"soon"} src={"/soon.svg"} width={"500"} height={"500"} />
          </div>
          <div>
            <h2 className="bg-gradient-to-r from-orange-500 via-pink-500 bg-purple-500 text-transparent bg-clip-text text-2xl">
              Video generation is currently under development.
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}
