import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { ElevenLabsClient } from "elevenlabs";
import { createWriteStream, Dir } from "fs";
import { checkLimit, increaseLimit } from "@/lib/a-limit";
import { checkSubscription } from "@/lib/subscription";
import db from "@/lib/db";
const API = process.env.ELEVEN_LABS_API_KEY || "";

const client = new ElevenLabsClient({
  apiKey: API,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, voice } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!API) {
      return new NextResponse("Eleven Labs API key not configured", { status: 500 });
    }
    if (!prompt) {
      return new NextResponse("Invalid request. Prompt is required", { status: 400 });
    }
    if (!voice) {
      return new NextResponse("Invalid request. Voice is required", { status: 400 });
    }

    const freeTrail = await checkLimit();
    const isPro = await checkSubscription();

    if (!freeTrail && !isPro) {
      return new NextResponse("You have reached the free trial limit", { status: 403 });
    }

    const file = await createAudioFileFromText(prompt, voice);

    await increaseLimit();

    const formattedFile = file.replace("public", "");
    await db.voices.create({
      data: {
        userId,
        voice: formattedFile,
        prompt,
      },
    });

    return NextResponse.json({ file }, { status: 200 });
  } catch (e) {
    console.error("[GEMINI_TEXT_ERROR_API]", e);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export const createAudioFileFromText = async (text: string, voice: string): Promise<string> => {
  return new Promise<string>(async (resolve, reject) => {
    try {
      const audio = await client.generate({
        voice: voice,
        model_id: "eleven_turbo_v2",
        text,
      });
      const fileName = `public/audio/${Math.random()}.mp3`;
      const fileStream = createWriteStream(fileName);

      audio.pipe(fileStream);
      fileStream.on("finish", () => resolve(fileName)); // Resolve with the fileName
      fileStream.on("error", reject);
    } catch (error) {
      reject(error);
    }
  });
};
