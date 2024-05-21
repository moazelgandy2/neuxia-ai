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
import { formSchema } from "./constants";

import { Code } from "lucide-react";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
import ReactMarkDown from "react-markdown";
import useScrollbarColor from "@/hooks/useScrollbarColor";
import { useProModal } from "@/hooks/use-pro-modal";

export default function ConversationPage() {
  useScrollbarColor();
  const proModal = useProModal();
  const router = useRouter();
  const [messages, setMessages] = useState<any>([]); // Manage conversation history state
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const newMessages = [...messages];
      setMessages(newMessages);

      const response = await axios.post("/api/code", {
        prompt: values.prompt,
      });

      setMessages((c: any) => [...c, ...response.data]);
      form.reset();
      router.refresh();
    } catch (e: any) {
      if (e?.response?.status === 403) {
        proModal.onOpen();
      }
      console.error("[CODE_GEN]", e);
    }
  };

  return (
    <>
      <div>
        <Heading
          title="Code Generation"
          description="Generate code snippets for your projects"
          icon={Code}
          iconColor="text-emerald-600"
          bgColor="bg-emerald-600/10"
        />
        <div className="px-4 lg:px-8 overflow-hidden">
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
              >
                <FormField
                  name="prompt"
                  render={({ field }) => (
                    <FormItem className="col-span-12 lg:col-span-10">
                      <FormControl className="m-0 p-0">
                        <Input
                          className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                          disabled={isLoading}
                          placeholder="How to print a string in Python?"
                          {...field}
                        />
                      </FormControl>
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
                    <Loader loaderImage={"/loader-code.svg"} animation="animate-pulse" />
                  </div>
                </>
              )}
              {messages.length === 0 && !isLoading && (
                <div className="h-[60vh]">
                  <Empty
                    label="No code generated yet. Start by typing a prompt in the input field above."
                    emptyImage="/code.svg"
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col-reverse gap-y-4">
              {messages.map((message: any, i: number) => (
                <div
                  key={i}
                  className={cn(
                    "p-8 w-full flex overflow-hidden items-start gap-x-8 rounded-lg",
                    message.role === "user" ? "bg-white border border-black/10" : "bg-muted"
                  )}
                >
                  {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                  <div
                    className={cn(
                      "text-sm",
                      message.role == "user" ? "" : "relative -left-8 top-2"
                    )}
                  >
                    <ReactMarkDown
                      components={{
                        pre: ({ node, ...props }) => (
                          <div className="overflow-auto w-full my-2 bg-black/10 rounded-lg p-2">
                            <pre {...props} />
                          </div>
                        ),
                      }}
                      className={"text-sm w-2/3 lg:w-full relative overflow-hidden leading-7"}
                    >
                      {message.text || ""}
                    </ReactMarkDown>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
