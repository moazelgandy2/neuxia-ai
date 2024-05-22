import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import Replicate from "replicate";
import { increaseLimit, checkLimit } from "@/lib/a-limit";
import { checkSubscription } from "@/lib/subscription";
import db from "@/lib/db";

const API = process.env.REPLICATE_API_KEY || "";

const replicate = new Replicate({
  auth: API,
});

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const body = await req.json();
    const { prompt, amount = 1, resolution = "512x512" } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!API) {
      return new NextResponse("Replicate API key not configured", { status: 500 });
    }
    if (!prompt) {
      return new NextResponse("Invalid request. Prompt is required", { status: 400 });
    }
    if (!amount) {
      return new NextResponse("Invalid request. Amount is required", { status: 400 });
    }
    if (!resolution) {
      return new NextResponse("Invalid request. Resolution is required", { status: 400 });
    }

    const isPro = await checkSubscription();

    if (!isPro) {
      return new NextResponse("You have reached the free trial limit", { status: 403 });
    }

    console.log("[GEMINI_TEXT_REQUEST]", { prompt, amount, resolution });
    console.log("[API]", API);

    const output = await replicate.run(
      "bytedance/sdxl-lightning-4step:5f24084160c9089501c1b3545d9be3c27883ae2239b6f412990e82d4a6210f8f",
      {
        input: {
          width: parseInt(resolution.split("x")[0], 10),
          height: parseInt(resolution.split("x")[1], 10),
          prompt: prompt,
          scheduler: "K_EULER",
          num_outputs: parseInt(amount, 10),
          guidance_scale: 0,
          negative_prompt: "worst quality, low quality",
          num_inference_steps: 4,
        },
      }
    );

    await increaseLimit();

    // width: parseInt(resolution.split("x")[0], 10),

    const imgs = Array.from(Object.values(output));

    imgs.forEach(async (img) => {
      await db.imageGen.create({
        data: {
          userId: userId,
          image: img,
          prompt: prompt,
          resolution: resolution,
        },
      });
    });

    return NextResponse.json(output, { status: 200 });
  } catch (e) {
    console.error("[GEMINI_TEXT_ERROR_API]", e);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
