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
import { amountOptions, formSchema, resolutionOptions } from "./constants";

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
import { Download, ImageIcon } from "lucide-react";
import useScrollbarColor from "@/hooks/useScrollbarColor";
import { useProModal } from "@/hooks/use-pro-modal";

export default function ConversationPage() {
  useScrollbarColor();
  const proModal = useProModal();
  const router = useRouter();
  const [images, setImages] = useState<any>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512x512",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImages([]);

      const response = await axios.post("/api/image-gen", {
        prompt: values.prompt,
        amount: values.amount,
        resolution: values.resolution,
      });

      const urls = response.data;

      setImages(urls);

      form.reset();
      router.refresh();
    } catch (e: any) {
      if (e?.response?.status === 403) {
        proModal.onOpen();
      }
      console.error("[IMAGE_GEN_ERROR]", e);
    }
  };

  return (
    <>
      <div>
        <Heading
          title="Image generator"
          description="Generate images using our most advanced AI model"
          icon={ImageIcon}
          iconColor="text-pink-600"
          bgColor="bg-pink-600/10"
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
                  name="amount"
                  render={({ field }) => (
                    <FormItem className="col-span-12 lg:col-span-2">
                      <Select
                        disabled={isLoading}
                        onValueChange={field.onChange}
                        value={field.value.toString()}
                        defaultValue={field.value.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue defaultValue={field.value} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {amountOptions.map((option, i) => (
                            <SelectItem key={i} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="resolution"
                  render={({ field }) => (
                    <FormItem className="col-span-12 lg:col-span-2">
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
                          {resolutionOptions.map((option, i) => (
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
                  <div className="p-20">
                    <Loader loaderImage={"/loader-paint.svg"} animation="animate-bounce" />
                  </div>
                </>
              )}
              {images.length === 0 && !isLoading && (
                <div className="h-[60vh]">
                  <Empty
                    label="No image generated. Start by entering a prompt."
                    emptyImage="/logo-maker.svg"
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
              {images.map((image: any, i: number) => (
                <Card key={i} className="rounded-lg over-flow-hidden ">
                  <div className=" relative aspect-square">
                    <Image fill alt="Image" src={image} loading="lazy" />
                  </div>
                  <CardFooter className="p-2">
                    <Button
                      onClick={() => {
                        window.open(image);
                      }}
                      variant={"secondary"}
                      className="w-full"
                    >
                      <Download className="mr-2 w-4 h-4" />
                      Download
                      <span className=" sr-only">Download</span>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
