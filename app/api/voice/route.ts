import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { ElevenLabsClient } from "elevenlabs";
import { checkLimit, increaseLimit } from "@/lib/a-limit";
import { checkSubscription } from "@/lib/subscription";
import db from "@/lib/db";

import { storage } from "@/lib/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

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

    const freeTrial = await checkLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse("You have reached the free trial limit", { status: 403 });
    }

    const fileURL = await createAudioFileFromText(prompt, voice);
    await increaseLimit();

    await db.voices.create({
      data: {
        userId,
        voice: fileURL,
        prompt,
      },
    });
    console.log("Voice saved to database");
    return NextResponse.json({ fileURL }, { status: 200 });
  } catch (e) {
    console.error("[GEMINI_TEXT_ERROR_API]", e);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

async function createAudioFileFromText(text: string, voice: string): Promise<string> {
  return new Promise<string>(async (resolve, reject) => {
    try {
      const audio: any = await client.generate({
        voice: voice,
        model_id: "eleven_turbo_v2",
        text,
      });

      let audioData: Uint8Array[] = [];

      audio.on("data", (chunk: Uint8Array) => {
        audioData.push(chunk);
      });

      audio.on("end", async () => {
        // Concatenate audio data
        const concatenatedAudioData = Buffer.concat(audioData);

        // Encode audio data to base64
        const base64String = concatenatedAudioData.toString("base64");

        // Upload base64 string to Firebase Storage
        try {
          const fileRef = ref(storage, `${Math.random()}.mp3`);
          await uploadString(fileRef, base64String, "base64", {
            contentType: "audio/mpeg",
          });

          const downloadURL = await getDownloadURL(fileRef);
          console.log("Download URL: ", downloadURL);
          resolve(downloadURL);
        } catch (error) {
          reject(error);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}
