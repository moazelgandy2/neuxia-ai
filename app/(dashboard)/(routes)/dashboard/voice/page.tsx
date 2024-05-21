"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/heading";
import { voices, formSchema } from "./constants";

import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { Download, Speech } from "lucide-react";
import useScrollbarColor from "@/lib/useScrollbarColor";

export default function ConversationPage() {
  useScrollbarColor();
  const router = useRouter();
  const [audio, setAudio] = useState<any>(undefined);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      voice: "21m00Tcm4TlvDq8ikWAM",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setAudio(undefined);

      const response = await axios.post("/api/voice", {
        prompt: values.prompt,
        voice: values.voice,
      });
      const formattedPath = response.data.file.replace("public", "");
      setAudio(formattedPath);
      form.reset();
      router.refresh();
    } catch (e: any) {
      console.error("[GEMINI_TEXT_ERROR_API]", e);
    }
  };

  return (
    <>
      <div>
        <Heading
          title="Text to speech"
          description="Generate a human-like voice from text using our most advanced AI model"
          icon={Speech}
          iconColor="text-green-600"
          bgColor="bg-green-600/10"
        />
        <div className="px-4 lg:px-8">
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
              >
                <FormField
                  name="prompt"
                  render={({ field }) => (
                    <FormItem className="col-span-12 lg:col-span-6">
                      <FormControl className="m-0 p-0">
                        <Input
                          className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                          disabled={isLoading}
                          placeholder="self-portrait of a woman, lightning in the background"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="voice"
                  render={({ field }) => (
                    <FormItem className="col-span-12 lg:col-span-4">
                      <Select
                        disabled={isLoading}
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue defaultValue={field.value} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {voices.map((option, i) => (
                            <SelectItem key={i} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
                  {isLoading ? "Loading...." : "Generate"}
                </Button>
              </form>
            </Form>
          </div>
          <div className="space-y-4 mt-4">
            <div className="flex flex-col-reverse gap-y-4">
              {isLoading && (
                <>
                  <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                    <Loader loaderImage={"/loader-voice.svg"} animation="animate-bounce" />
                  </div>
                </>
              )}
              {!audio && !isLoading && (
                <div className="h-[60vh]">
                  <Empty label="No audio generated yet" emptyImage="/voice.svg" />
                </div>
              )}
            </div>
            <div className="w-full h-full flex items-center justify-center">
              {audio && <audio className="w-full mt-8" controls src={`${audio}`} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
