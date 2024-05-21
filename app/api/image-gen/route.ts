import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import Replicate from "replicate";
import { increaseLimit, checkLimit } from "@/lib/a-limit";
import { checkSubscription } from "@/lib/subscription";
const API = process.env.REPLICATE_API_KEY || "";

const replicate = new Replicate({
  auth: API,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
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

    const freeTrail = await checkLimit();
    const isPro = await checkSubscription();

    if (!freeTrail && !isPro) {
      return new NextResponse("You have reached the free trial limit", { status: 403 });
    }

    console.log("[GEMINI_TEXT_REQUEST]", { prompt, amount, resolution });

    const output = await replicate.run(
      "stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
      {
        input: {
          width: parseInt(resolution.split("x")[0], 10),
          height: parseInt(resolution.split("x")[1], 10),
          prompt: prompt,
          scheduler: "K_EULER_ANCESTRAL",
          num_outputs: parseInt(amount, 10),
          guidance_scale: 7.5,
          negative_prompt: "low quality",
          num_inference_steps: 50,
        },
      }
    );

    await increaseLimit();

    return NextResponse.json(output, { status: 200 });
  } catch (e) {
    console.error("[GEMINI_TEXT_ERROR_API]", e);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
