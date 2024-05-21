"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import TypewriterComponent from "typewriter-effect";

export const LandingHero = () => {
  const { isSignedIn } = useAuth();
  return (
    <>
      <div className="text-white font-bold py-36 text-center space-y-5">
        <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
          <h1>The best AI for</h1>
          <div className=" text-transparent bg-clip-text bg-gradient-to-tr from-purple-500 to-pink-600">
            <TypewriterComponent
              options={{
                strings: [
                  "ChatBot",
                  "Code Generation",
                  "Photo Generation",
                  "Text to Speech Generation",
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </div>
        </div>
        <div className="text-sm md:text-xl font-light text-zinc-400">
          Create content with AI in seconds.
        </div>
        <div>
          <Link href={isSignedIn ? "/dashboard" : "/sign-in"}>
            <Button
              variant={"premium"}
              className="md:text-lg p-4 md:p-6 rounded-full font-semibold"
            >
              Start Generating For Free
            </Button>
          </Link>
        </div>
        <div className="text-zinc-400 text-xs md:text-sm font-normal">No credit card required.</div>
      </div>
    </>
  );
};
