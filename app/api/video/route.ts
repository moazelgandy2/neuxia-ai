import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import Replicate from "replicate";

const API = process.env.REPLICATE_API_KEY || "";

const replicate = new Replicate({
  auth: API,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!API) {
      return new NextResponse("Replicate API key not configured", { status: 500 });
    }
    if (!prompt) {
      return new NextResponse("Invalid request. Prompt is required", { status: 400 });
    }

    const output = await replicate.run(
      "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
      {
        input: {
          fps: 24,
          model: "xl",
          width: 1024,
          height: 576,
          prompt: prompt,
          batch_size: 1,
          num_frames: 24,
          init_weight: 0.5,
          guidance_scale: 17.5,
          remove_watermark: true,
          num_inference_steps: 50,
        },
      }
    );
    console.log(output);

    return NextResponse.json(output, { status: 200 });
  } catch (e) {
    console.error("[GEMINI_TEXT_ERROR_API]", e);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
