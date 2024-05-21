"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import ReactMarkDown from "react-markdown";
import { CodeBlock, CopyBlock, dracula } from "react-code-blocks";
import { cn } from "@/lib/utils";
import { Check, Cross, Database, Settings, X } from "lucide-react";
import { tools } from "@/constants";
import { AccordionDemo } from "./faq";

const testimonials = [
  {
    name: "John Adam",
    avatar: "J",
    title: "Software Engineer",
    description:
      "The best AI tool I have ever used. It is so easy to use and the results are amazing. I highly recommend it to everyone!",
  },
  {
    name: "Alice Paul",
    avatar: "A",
    title: "Product Manager",
    description:
      "This tool has helped me generate content for my projects in no time. It is really easy to use and the results are great.",
  },
  {
    name: "Bob Williams",
    avatar: "B",
    title: "Designer",
    description:
      "I have been using this tool for a while now and I am really impressed with the results. It has helped me save a lot of time and effort.",
  },
  {
    name: "Mary Lee",
    avatar: "J",
    title: "Content Creator",
    description:
      "This tool has made my life so much easier. It has helped me generate content for my projects in no time. I highly recommend it to everyone!",
  },
];

export const LandingContent = () => {
  return (
    <>
      <div className="h-full">
        <div className="px-4 lg:px-0 pb-32">
          <h2 className="text-center text-4xl text-white font-extrabold mb-10">
            With the best and latest AI models.
          </h2>
          <div className="relative grid bg-transparent grid-cols-1 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
            <Card className="rounded-lg over-flow-hidden bg-transparent border-0">
              <div className=" relative aspect-square bg-transparent">
                <Image
                  fill
                  alt="Image"
                  src={"/examples/6.png"}
                  className=" rounded-lg"
                  loading="lazy"
                />
              </div>
            </Card>
            <Card className="rounded-lg lg:block top-12 right-24 lg:relative over-flow-hidden bg-transparent border-0">
              <div className=" relative aspect-square bg-transparent">
                <Image
                  fill
                  alt="Image"
                  src={"/examples/15.png"}
                  className=" rounded-lg"
                  loading="lazy"
                />
              </div>
            </Card>
            <Card className="rounded-lg over-flow-hidden bg-transparent border-0">
              <div className=" relative aspect-square bg-transparent">
                <Image
                  fill
                  alt="Image"
                  src={"/examples/5.png"}
                  className=" rounded-lg"
                  loading="lazy"
                />
              </div>
            </Card>
            <Card className="rounded-lg lg:block top-12 right-24 lg:relative over-flow-hidden bg-transparent border-0">
              <div className=" relative aspect-square bg-transparent">
                <Image
                  fill
                  alt="Image"
                  src={"/examples/14.png"}
                  className=" rounded-lg"
                  loading="lazy"
                />
              </div>
            </Card>
            <Card className="rounded-lg over-flow-hidden bg-transparent border-0">
              <div className=" relative aspect-square bg-transparent">
                <Image
                  fill
                  alt="Image"
                  src={"/examples/10.png"}
                  className=" rounded-lg"
                  loading="lazy"
                />
              </div>
            </Card>
            <Card className="rounded-lg lg:block top-12 right-24 lg:relative over-flow-hidden bg-transparent border-0">
              <div className=" relative aspect-square bg-transparent">
                <Image
                  fill
                  alt="Image"
                  src={"/examples/11.png"}
                  className=" rounded-lg"
                  loading="lazy"
                />
              </div>
            </Card>
          </div>
        </div>
        <div className="px-4 lg:px-0 pb-32">
          <h2 className="text-center text-4xl text-white font-extrabold mb-10">
            The most advanced AI text to speech models.
          </h2>
          <div className="relative grid bg-transparent grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="rounded-lg over-flow-hidden bg-transparent border-0">
              <CardHeader>
                <CardTitle className="text-white text-center">
                  <Badge>Micheal</Badge>
                </CardTitle>
              </CardHeader>
              <audio controls className="w-full" src="/audio/0.6997424339020497.mp3" />
            </Card>
            <Card className="rounded-lg over-flow-hidden bg-transparent border-0">
              <CardHeader>
                <CardTitle className="text-white text-center">
                  <Badge>Rachel</Badge>
                </CardTitle>
              </CardHeader>
              <audio controls className="w-full" src="/audio/0.7184141260522008.mp3" />
            </Card>
            <Card className="rounded-lg over-flow-hidden bg-transparent border-0">
              <CardHeader>
                <CardTitle className="text-white text-center">
                  <Badge>Joseph</Badge>
                </CardTitle>
              </CardHeader>
              <audio controls className="w-full" src="/audio/0.6986726723011714.mp3" />
            </Card>
          </div>
        </div>
        <div className="px-2 lg:px-0 pb-32">
          <h2 className="text-center text-4xl text-white font-extrabold mb-10">
            Advanced AI coding models.
          </h2>
          <div className="w-full flex justify-center">
            <div className="w-full md:w-1/2 flex justify-center items-center">
              <div className="relative grid bg-transparent grid-cols-1 w-full justify-center items-center gap-4">
                <CopyBlock
                  theme={dracula}
                  codeBlock
                  text={`from datetime import datetime

def generate_greeting():
    now = datetime.now()
    hours = now.hour

    if hours < 12:
        greeting = "Good morning!"
    elif hours < 18:
        greeting = "Good afternoon!"
    else:
        greeting = "Good evening!"

    return greeting

# Example usage
if __name__ == "__main__":
    print(generate_greeting())
`}
                  language={"python"}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 lg:px-0 pb-32">
          <h2 className="text-center text-4xl text-white font-extrabold mb-10 flex justify-center">
            <Badge className=" text-3xl w-32 text-center flex justify-center">Plans</Badge>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center w-full gap-x-5 gap-y-5">
            <div className="flex justify-center items-center w-full p-5 rounded-lg flex-col space-y-2 bg-white">
              <Badge
                className="w-18 text-xl h-8 text-center flex justify-center"
                variant={"premium"}
              >
                FREE
              </Badge>
              {tools.map((tool, i) => (
                <Card
                  key={i}
                  className="p-3 border-black/5 w-full flex items-center justify-between"
                >
                  <div className="flex items-center gap-x-4">
                    <div className={cn("p-2 w-fit rounded-md", tool.color)}>
                      <tool.icon className={cn("w-6 h-6", tool.color)} />
                    </div>
                    <div className="font-semibold text-sm">{tool.label}</div>
                  </div>
                  {tool.isPro ? (
                    <X className=" text-red-500 w-5 h-5" />
                  ) : (
                    <Check className=" text-primary w-5 h-5" />
                  )}
                </Card>
              ))}
              <Card className="p-3 border-black/5 w-full flex items-center justify-between">
                <div className="flex items-center gap-x-4">
                  <div className={cn("p-2 w-fit rounded-md")}>
                    <Database className={cn("w-6 h-6 text-violet-500")} />
                  </div>
                  <div className="font-semibold text-sm">Keep generations</div>
                </div>
                <X className=" text-red-500 w-5 h-5" />
              </Card>
              <Badge className="my-2">5 credits</Badge>
            </div>
            <div className="flex justify-center items-center w-full p-5 rounded-lg flex-col space-y-2 bg-white">
              <Badge
                className="w-18 text-xl h-8 text-center flex justify-center"
                variant={"premium"}
              >
                PRO
              </Badge>
              {tools.map((tool, i) => (
                <Card
                  key={i}
                  className="p-3 border-black/5 w-full flex items-center justify-between"
                >
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
              <Badge className="my-2">Unlimited</Badge>
            </div>
          </div>
        </div>
        <div className=" px-10 pb-20">
          <h2 className="text-center text-4xl text-white font-extrabold mb-10">FAQs</h2>
          <div className="w-full flex justify-center">
            <AccordionDemo />
          </div>
        </div>
        <div className=" px-10 pb-20">
          <h2 className="text-center text-4xl text-white font-extrabold mb-10">Testimonials</h2>
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className=" bg-[#192339] border-none text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-x-2">
                    <div>
                      <p className="text-lg">{testimonial.name}</p>
                      <p className="text-zinc-500 text-sm">{testimonial.title}</p>
                    </div>
                  </CardTitle>
                  <CardContent className="pt-4 px-0">
                    <p className="text-sm">{testimonial.description}</p>
                  </CardContent>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
